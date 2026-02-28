"""
Semantic Compression - Stage 1 of SimpleMem Pipeline

Compresses verbose content into semantic kernels with:
- Coreference resolution
- Absolute timestamp conversion
- Key entity extraction
"""

from typing import Optional


class SemanticCompressor:
    """Stage 1: Compress verbose content into semantic kernels"""

    def __init__(
        self,
        base_url: str = "http://localhost:11434/v1",
        api_key: str = "ollama",
        model: str = "qwen2.5:7b"
    ):
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

    async def compress(self, content: str) -> Optional[str]:
        """
        Compress content into a semantic kernel.

        Returns a self-contained, lossless restatement of the content.
        """
        if len(content) < 100:
            # Short content doesn't need compression
            return content

        prompt = f"""Compress the following content into a semantic kernel.

Rules:
1. Preserve ALL important information - lossless compression
2. Resolve any coreferences (replace pronouns with actual names)
3. Convert relative times to absolute if mentioned
4. Extract key entities and decisions
5. Keep it concise but complete

Content:
{content}

Compressed:"""

        try:
            client = self._get_client()
            response = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=500,
                temperature=0.3,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            # On error, return original content
            print(f"Compression error: {e}")
            return content

    async def extract_entities(self, content: str) -> dict:
        """Extract key entities from content"""
        prompt = f"""Extract key entities from the following content.

Return a JSON object with:
- persons: list of people mentioned
- entities: list of organizations, products, etc.
- topics: list of main topics
- decisions: list of decisions made (if any)

Content:
{content}

JSON:"""

        try:
            client = self._get_client()
            response = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=300,
                temperature=0.1,
            )
            import json
            return json.loads(response.choices[0].message.content)
        except Exception:
            return {
                "persons": [],
                "entities": [],
                "topics": [],
                "decisions": []
            }
