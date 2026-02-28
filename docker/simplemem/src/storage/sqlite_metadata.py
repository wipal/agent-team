"""
SQLite Metadata Store for SimpleMem

Provides cross-session metadata storage and querying.
"""

import json
import sqlite3
from pathlib import Path
from typing import Any, Optional


class SQLiteMetadata:
    """Metadata store using SQLite for cross-session persistence"""

    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.db_path = data_dir / "metadata.db"
        self._conn: Optional[sqlite3.Connection] = None

    def _get_conn(self) -> sqlite3.Connection:
        """Get database connection"""
        if self._conn is None:
            self._conn = sqlite3.connect(str(self.db_path))
            self._conn.row_factory = sqlite3.Row
        return self._conn

    async def ensure_table(self, tenant_id: str):
        """Ensure table exists for tenant"""
        conn = self._get_conn()
        # Sanitize table name
        safe_name = tenant_id.replace("-", "_").replace(".", "_")
        table_name = f"memories_{safe_name}"

        conn.execute(f"""
            CREATE TABLE IF NOT EXISTS {table_name} (
                entry_id TEXT PRIMARY KEY,
                tenant_id TEXT NOT NULL,
                content TEXT NOT NULL,
                metadata TEXT,
                timestamp TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Create indexes
        conn.execute(f"""
            CREATE INDEX IF NOT EXISTS idx_{safe_name}_timestamp
            ON {table_name}(timestamp)
        """)
        conn.execute(f"""
            CREATE INDEX IF NOT EXISTS idx_{safe_name}_created
            ON {table_name}(created_at)
        """)

        conn.commit()

    async def add(self, tenant_id: str, entry: Any):
        """Add a memory entry"""
        conn = self._get_conn()
        safe_name = tenant_id.replace("-", "_").replace(".", "_")
        table_name = f"memories_{safe_name}"

        conn.execute(f"""
            INSERT OR REPLACE INTO {table_name}
            (entry_id, tenant_id, content, metadata, timestamp)
            VALUES (?, ?, ?, ?, ?)
        """, (
            entry.entry_id,
            entry.tenant_id,
            entry.content,
            json.dumps(entry.metadata),
            entry.timestamp,
        ))
        conn.commit()

    async def get(self, tenant_id: str, entry_id: str) -> Optional[dict]:
        """Get a specific memory entry"""
        conn = self._get_conn()
        safe_name = tenant_id.replace("-", "_").replace(".", "_")
        table_name = f"memories_{safe_name}"

        cursor = conn.execute(f"""
            SELECT * FROM {table_name} WHERE entry_id = ?
        """, (entry_id,))

        row = cursor.fetchone()
        if row:
            return {
                "entry_id": row["entry_id"],
                "tenant_id": row["tenant_id"],
                "content": row["content"],
                "metadata": json.loads(row["metadata"]) if row["metadata"] else {},
                "timestamp": row["timestamp"],
                "created_at": row["created_at"],
            }
        return None

    async def get_all(self, tenant_id: str, limit: int = 100) -> list[dict]:
        """Get all memories for a tenant"""
        conn = self._get_conn()
        safe_name = tenant_id.replace("-", "_").replace(".", "_")
        table_name = f"memories_{safe_name}"

        cursor = conn.execute(f"""
            SELECT * FROM {table_name}
            ORDER BY created_at DESC
            LIMIT ?
        """, (limit,))

        results = []
        for row in cursor.fetchall():
            results.append({
                "entry_id": row["entry_id"],
                "tenant_id": row["tenant_id"],
                "content": row["content"],
                "metadata": json.loads(row["metadata"]) if row["metadata"] else {},
                "timestamp": row["timestamp"],
                "created_at": row["created_at"],
            })

        return results

    async def delete(self, tenant_id: str, entry_id: str):
        """Delete a memory entry"""
        conn = self._get_conn()
        safe_name = tenant_id.replace("-", "_").replace(".", "_")
        table_name = f"memories_{safe_name}"

        conn.execute(f"""
            DELETE FROM {table_name} WHERE entry_id = ?
        """, (entry_id,))
        conn.commit()

    async def list_tenants(self) -> list[str]:
        """List all tenants with memory tables"""
        conn = self._get_conn()
        cursor = conn.execute("""
            SELECT name FROM sqlite_master
            WHERE type='table' AND name LIKE 'memories_%'
        """)

        tenants = []
        for row in cursor.fetchall():
            # Extract tenant_id from table name
            table_name = row[0]
            if table_name.startswith("memories_"):
                # Reverse sanitization (best effort)
                tenant_id = table_name[9:]  # Remove "memories_" prefix
                tenants.append(tenant_id)

        return tenants

    async def search_by_metadata(
        self,
        tenant_id: str,
        key: str,
        value: Any,
        limit: int = 10
    ) -> list[dict]:
        """Search memories by metadata field"""
        conn = self._get_conn()
        safe_name = tenant_id.replace("-", "_").replace(".", "_")
        table_name = f"memories_{safe_name}"

        # JSON search in SQLite
        cursor = conn.execute(f"""
            SELECT * FROM {table_name}
            WHERE json_extract(metadata, '$.{key}') = ?
            ORDER BY created_at DESC
            LIMIT ?
        """, (json.dumps(value) if not isinstance(value, str) else value, limit))

        results = []
        for row in cursor.fetchall():
            results.append({
                "entry_id": row["entry_id"],
                "tenant_id": row["tenant_id"],
                "content": row["content"],
                "metadata": json.loads(row["metadata"]) if row["metadata"] else {},
                "timestamp": row["timestamp"],
                "created_at": row["created_at"],
            })

        return results

    def close(self):
        """Close database connection"""
        if self._conn:
            self._conn.close()
            self._conn = None
