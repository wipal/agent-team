"""
Online Synthesis - Stage 2 of SimpleMem Pipeline

Real-time synthesis as memories are added:
- Pattern detection
- Theme extraction
- Memory linking
"""

from typing import Optional


class OnlineSynthesizer:
    """Stage 2: Real-time synthesis of memories"""

    def __init__(
        self,
        vector_store,
        metadata_store,
        base_url: str = "http://localhost:11434/v1",
        api_key: str = "ollama",
        model: str = "qwen2.5:7b"
    ):
        self.vector_store = vector_store
        self.metadata_store = metadata_store
        self.base_url = base_url
        self.api_key = api_key
        self.model = model
        self._client = None

    def _get_client(self):
        """Lazy load OpenAI client"""
        if self._client is None:
            from openai import OpenAI
            self._client = OpenAI(
                base_url=self.base_url,
                api_key=self.api_key,
            )
        return self._client

    async def synthesize(self, tenant_id: str, new_entry: dict) -> dict:
        """
        Synthesize new entry with existing memories.

        Returns detected patterns and related memories.
        """
        # Get recent memories for context
        recent = await self.metadata_store.get_all(tenant_id, limit=10)

        if len(recent) < 2:
            return {"patterns": [], "related": []}

        # Build synthesis prompt
        memories_text = "\n".join([
            f"- {m['content']}" for m in recent[-5:]
        ])
        new_content = new_entry.get("content", "")

        prompt = f"""Analyze the following memories and detect patterns.

Recent memories:
{memories_text}

New memory:
{new_content}

Return a JSON object with:
- patterns: list of detected patterns or themes
- connections: list of connections between memories
- summary: brief synthesis of the memories

JSON:"""

        try:
            client = self._get_client()
            response = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=500,
                temperature=0.3,
            )
            import json
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"Synthesis error: {e}")
            return {"patterns": [], "connections": [], "summary": ""}

    async def detect_patterns(self, tenant_id: str) -> list[dict]:
        """Detect patterns across all memories"""
        memories = await self.metadata_store.get_all(tenant_id, limit=100)

        if len(memories) < 5:
            return []

        memories_text = "\n".join([
            f"{i+1}. {m['content']}" for i, m in enumerate(memories)
        ])

        prompt = f"""Analyze the following memories and detect recurring patterns.

Memories:
{memories_text}

Return a JSON array of patterns, each with:
- pattern: description of the pattern
- frequency: how often it appears
- examples: list of memory indices showing this pattern

JSON:"""

        try:
            client = self._get_client()
            response = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=800,
                temperature=0.3,
            )
            import json
            return json.loads(response.choices[0].message.content)
        except Exception:
            return []
