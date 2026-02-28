"""
SimpleMem MCP Server

Long-term memory system for AI agents with:
- Semantic search via LanceDB
- Cross-session persistence via SQLite
- Three-stage pipeline (Compression, Synthesis, Retrieval)
"""

__version__ = "0.1.0"

from .server import SimpleMemServer, main

__all__ = ["SimpleMemServer", "main"]
