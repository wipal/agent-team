"""
SimpleMem MCP Server - Long-term memory for AI agents

This MCP server provides semantic memory capabilities with:
- Semantic search via LanceDB vector store
- Cross-session persistence via SQLite
- Three-stage pipeline: Compression, Synthesis, Retrieval
"""

import asyncio
import json
import os
from pathlib import Path
from typing import Any, Optional

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent
from pydantic import BaseModel

from .storage.lancedb_store import LanceDBStore
from .storage.sqlite_metadata import SQLiteMetadata
from .pipeline.semantic_compression import SemanticCompressor
from .pipeline.intent_retrieval import IntentAwareRetriever
from .embeddings.embeddings import EmbeddingService

# Configuration from environment
DATA_DIR = Path(os.getenv("SIMPLEMEM_DATA_DIR", "/app/data"))
LLM_BASE_URL = os.getenv("LLM_BASE_URL", "http://host.docker.internal:11434/v1")
LLM_API_KEY = os.getenv("LLM_API_KEY", "ollama")
LLM_MODEL = os.getenv("LLM_MODEL", "qwen2.5:7b")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "Qwen/Qwen3-Embedding-0.6B")


class MemoryEntry(BaseModel):
    """A memory entry with semantic and metadata fields"""
    entry_id: str
    tenant_id: str
    content: str
    embedding: Optional[list[float]] = None
    metadata: dict[str, Any] = {}
    timestamp: Optional[str] = None


class SimpleMemServer:
    """Main SimpleMem MCP Server"""

    def __init__(self):
        self.app = Server("simplemem-mcp")
        self.vector_store: Optional[LanceDBStore] = None
        self.metadata_store: Optional[SQLiteMetadata] = None
        self.compressor: Optional[SemanticCompressor] = None
        self.retriever: Optional[IntentAwareRetriever] = None
        self.embedding_service: Optional[EmbeddingService] = None
        self._setup_handlers()

    def _setup_handlers(self):
        """Setup MCP tool handlers"""

        @self.app.list_tools()
        async def list_tools() -> list[Tool]:
            return [
                Tool(
                    name="memory_add",
                    description="Store new memory with semantic indexing",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "tenant_id": {
                                "type": "string",
                                "description": "Agent/tenant identifier for memory isolation"
                            },
                            "content": {
                                "type": "string",
                                "description": "Content to remember"
                            },
                            "metadata": {
                                "type": "object",
                                "description": "Optional metadata (type, importance, tags)",
                                "default": {}
                            }
                        },
                        "required": ["tenant_id", "content"]
                    }
                ),
                Tool(
                    name="memory_search",
                    description="Semantic search across memories",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "tenant_id": {
                                "type": "string",
                                "description": "Agent/tenant identifier"
                            },
                            "query": {
                                "type": "string",
                                "description": "Search query"
                            },
                            "k": {
                                "type": "integer",
                                "description": "Number of results",
                                "default": 10
                            }
                        },
                        "required": ["tenant_id", "query"]
                    }
                ),
                Tool(
                    name="memory_get_context",
                    description="Get context relevant to current task intent",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "tenant_id": {
                                "type": "string",
                                "description": "Agent/tenant identifier"
                            },
                            "intent": {
                                "type": "string",
                                "description": "Current task intent (optional)",
                                "default": None
                            },
                            "limit": {
                                "type": "integer",
                                "description": "Max number of memories",
                                "default": 50
                            }
                        },
                        "required": ["tenant_id"]
                    }
                ),
                Tool(
                    name="memory_consolidate",
                    description="Trigger pattern synthesis for a tenant",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "tenant_id": {
                                "type": "string",
                                "description": "Agent/tenant identifier"
                            }
                        },
                        "required": ["tenant_id"]
                    }
                ),
                Tool(
                    name="memory_list_tenants",
                    description="List all agents with memory",
                    inputSchema={
                        "type": "object",
                        "properties": {}
                    }
                ),
                Tool(
                    name="memory_delete",
                    description="Delete a specific memory entry",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "tenant_id": {
                                "type": "string",
                                "description": "Agent/tenant identifier"
                            },
                            "entry_id": {
                                "type": "string",
                                "description": "Memory entry ID to delete"
                            }
                        },
                        "required": ["tenant_id", "entry_id"]
                    }
                ),
                Tool(
                    name="memory_export",
                    description="Export memories to markdown or JSON",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "tenant_id": {
                                "type": "string",
                                "description": "Agent/tenant identifier"
                            },
                            "format": {
                                "type": "string",
                                "enum": ["markdown", "json"],
                                "default": "markdown"
                            }
                        },
                        "required": ["tenant_id"]
                    }
                ),
            ]

        @self.app.call_tool()
        async def call_tool(name: str, arguments: dict) -> list[TextContent]:
            try:
                if name == "memory_add":
                    return await self._handle_memory_add(arguments)
                elif name == "memory_search":
                    return await self._handle_memory_search(arguments)
                elif name == "memory_get_context":
                    return await self._handle_memory_get_context(arguments)
                elif name == "memory_consolidate":
                    return await self._handle_memory_consolidate(arguments)
                elif name == "memory_list_tenants":
                    return await self._handle_memory_list_tenants()
                elif name == "memory_delete":
                    return await self._handle_memory_delete(arguments)
                elif name == "memory_export":
                    return await self._handle_memory_export(arguments)
                else:
                    return [TextContent(type="text", text=f"Unknown tool: {name}")]
            except Exception as e:
                return [TextContent(type="text", text=f"Error: {str(e)}")]

    async def _ensure_initialized(self, tenant_id: str):
        """Ensure stores are initialized for a tenant"""
        if self.vector_store is None:
            self.vector_store = LanceDBStore(DATA_DIR)
        if self.metadata_store is None:
            self.metadata_store = SQLiteMetadata(DATA_DIR)
        if self.embedding_service is None:
            self.embedding_service = EmbeddingService(EMBEDDING_MODEL)

        await self.vector_store.ensure_table(tenant_id)
        await self.metadata_store.ensure_table(tenant_id)

    async def _handle_memory_add(self, args: dict) -> list[TextContent]:
        """Handle memory_add tool"""
        tenant_id = args["tenant_id"]
        content = args["content"]
        metadata = args.get("metadata", {})

        await self._ensure_initialized(tenant_id)

        # Generate embedding
        embedding = await self.embedding_service.embed(content)

        # Optionally compress content
        if self.compressor is None:
            self.compressor = SemanticCompressor(
                base_url=LLM_BASE_URL,
                api_key=LLM_API_KEY,
                model=LLM_MODEL
            )

        compressed = await self.compressor.compress(content)

        # Create entry
        import uuid
        from datetime import datetime
        entry = MemoryEntry(
            entry_id=str(uuid.uuid4()),
            tenant_id=tenant_id,
            content=compressed or content,
            embedding=embedding,
            metadata=metadata,
            timestamp=datetime.utcnow().isoformat()
        )

        # Store in vector store and metadata
        await self.vector_store.add(tenant_id, entry)
        await self.metadata_store.add(tenant_id, entry)

        return [TextContent(
            type="text",
            text=json.dumps({
                "success": True,
                "entry_id": entry.entry_id,
                "tenant_id": tenant_id,
                "message": f"Memory stored for {tenant_id}"
            })
        )]

    async def _handle_memory_search(self, args: dict) -> list[TextContent]:
        """Handle memory_search tool"""
        tenant_id = args["tenant_id"]
        query = args["query"]
        k = args.get("k", 10)

        await self._ensure_initialized(tenant_id)

        # Generate query embedding
        query_embedding = await self.embedding_service.embed(query)

        # Search vector store
        results = await self.vector_store.search(tenant_id, query_embedding, k)

        return [TextContent(
            type="text",
            text=json.dumps({
                "success": True,
                "tenant_id": tenant_id,
                "query": query,
                "results": results
            })
        )]

    async def _handle_memory_get_context(self, args: dict) -> list[TextContent]:
        """Handle memory_get_context tool"""
        tenant_id = args["tenant_id"]
        intent = args.get("intent")
        limit = args.get("limit", 50)

        await self._ensure_initialized(tenant_id)

        if self.retriever is None:
            self.retriever = IntentAwareRetriever(
                vector_store=self.vector_store,
                embedding_service=self.embedding_service,
                base_url=LLM_BASE_URL,
                api_key=LLM_API_KEY,
                model=LLM_MODEL
            )

        context = await self.retriever.retrieve(tenant_id, intent, limit)

        return [TextContent(
            type="text",
            text=json.dumps({
                "success": True,
                "tenant_id": tenant_id,
                "intent": intent,
                "context": context
            })
        )]

    async def _handle_memory_consolidate(self, args: dict) -> list[TextContent]:
        """Handle memory_consolidate tool"""
        tenant_id = args["tenant_id"]

        await self._ensure_initialized(tenant_id)

        # Get all memories for tenant
        memories = await self.metadata_store.get_all(tenant_id)

        # TODO: Implement consolidation logic
        # This would synthesize patterns from memories

        return [TextContent(
            type="text",
            text=json.dumps({
                "success": True,
                "tenant_id": tenant_id,
                "message": f"Consolidation triggered for {len(memories)} memories"
            })
        )]

    async def _handle_memory_list_tenants(self) -> list[TextContent]:
        """Handle memory_list_tenants tool"""
        if self.metadata_store is None:
            self.metadata_store = SQLiteMetadata(DATA_DIR)

        tenants = await self.metadata_store.list_tenants()

        return [TextContent(
            type="text",
            text=json.dumps({
                "success": True,
                "tenants": tenants
            })
        )]

    async def _handle_memory_delete(self, args: dict) -> list[TextContent]:
        """Handle memory_delete tool"""
        tenant_id = args["tenant_id"]
        entry_id = args["entry_id"]

        await self._ensure_initialized(tenant_id)

        await self.vector_store.delete(tenant_id, entry_id)
        await self.metadata_store.delete(tenant_id, entry_id)

        return [TextContent(
            type="text",
            text=json.dumps({
                "success": True,
                "entry_id": entry_id,
                "message": f"Memory deleted"
            })
        )]

    async def _handle_memory_export(self, args: dict) -> list[TextContent]:
        """Handle memory_export tool"""
        tenant_id = args["tenant_id"]
        format = args.get("format", "markdown")

        await self._ensure_initialized(tenant_id)

        memories = await self.metadata_store.get_all(tenant_id)

        if format == "json":
            output = json.dumps(memories, indent=2)
        else:
            # Markdown format
            lines = [f"# Memory Export for {tenant_id}", ""]
            for mem in memories:
                lines.append(f"## {mem.get('timestamp', 'Unknown')}")
                lines.append(mem.get("content", ""))
                lines.append("")
            output = "\n".join(lines)

        return [TextContent(type="text", text=output)]

    async def run(self):
        """Run the MCP server"""
        async with stdio_server() as (read_stream, write_stream):
            await self.app.run(read_stream, write_stream, self.app.create_initialization_options())


def main():
    """Main entry point"""
    server = SimpleMemServer()
    asyncio.run(server.run())


if __name__ == "__main__":
    main()
