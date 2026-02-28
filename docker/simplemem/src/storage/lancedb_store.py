"""
LanceDB Vector Store for SimpleMem

Provides semantic search capabilities via vector embeddings.
"""

import json
from pathlib import Path
from typing import Any, Optional

import lancedb
import pyarrow as pa


class LanceDBStore:
    """Vector store using LanceDB for semantic search"""

    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.db = lancedb.connect(str(data_dir / "vectors"))
        self._tables: dict[str, Any] = {}

    def _get_table_name(self, tenant_id: str) -> str:
        """Get table name for tenant (sanitize for LanceDB)"""
        # Replace problematic characters
        safe_name = tenant_id.replace("-", "_").replace(".", "_")
        return f"memories_{safe_name}"

    async def ensure_table(self, tenant_id: str):
        """Ensure table exists for tenant"""
        table_name = self._get_table_name(tenant_id)

        if table_name in self._tables:
            return

        if table_name not in self.db.table_names():
            # Create table with schema
            schema = pa.schema([
                pa.field("entry_id", pa.string()),
                pa.field("tenant_id", pa.string()),
                pa.field("content", pa.string()),
                pa.field("embedding", pa.list_(pa.float32(), list_size=1024)),
                pa.field("metadata", pa.string()),  # JSON string
                pa.field("timestamp", pa.string()),
            ])
            self.db.create_table(table_name, schema=schema)

        self._tables[table_name] = self.db.open_table(table_name)

    async def add(self, tenant_id: str, entry: Any):
        """Add a memory entry to vector store"""
        table_name = self._get_table_name(tenant_id)
        await self.ensure_table(tenant_id)
        table = self._tables[table_name]

        # Prepare data
        data = [{
            "entry_id": entry.entry_id,
            "tenant_id": entry.tenant_id,
            "content": entry.content,
            "embedding": entry.embedding,
            "metadata": json.dumps(entry.metadata),
            "timestamp": entry.timestamp or "",
        }]

        table.add(data)

    async def search(
        self,
        tenant_id: str,
        query_embedding: list[float],
        k: int = 10
    ) -> list[dict]:
        """Search for similar memories"""
        table_name = self._get_table_name(tenant_id)

        if table_name not in self._tables:
            return []

        table = self._tables[table_name]

        # Vector search
        results = table.search(query_embedding).limit(k).to_list()

        # Format results
        formatted = []
        for r in results:
            formatted.append({
                "entry_id": r["entry_id"],
                "content": r["content"],
                "metadata": json.loads(r["metadata"]) if r["metadata"] else {},
                "timestamp": r["timestamp"],
                "score": r.get("_distance", 0),
            })

        return formatted

    async def delete(self, tenant_id: str, entry_id: str):
        """Delete a memory entry"""
        table_name = self._get_table_name(tenant_id)

        if table_name not in self._tables:
            return

        table = self._tables[table_name]
        table.delete(f"entry_id = '{entry_id}'")

    async def get_all(self, tenant_id: str, limit: int = 100) -> list[dict]:
        """Get all memories for a tenant"""
        table_name = self._get_table_name(tenant_id)

        if table_name not in self._tables:
            return []

        table = self._tables[table_name]
        results = table.to_arrow().to_pylist()[:limit]

        formatted = []
        for r in results:
            formatted.append({
                "entry_id": r["entry_id"],
                "content": r["content"],
                "metadata": json.loads(r["metadata"]) if r["metadata"] else {},
                "timestamp": r["timestamp"],
            })

        return formatted
