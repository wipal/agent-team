"""
Embedding Service for SimpleMem

Provides semantic embeddings using:
- Qwen3-Embedding (via sentence-transformers) - default, offline
- OpenAI embeddings (fallback, requires API key)
"""

from typing import Optional


class EmbeddingService:
    """Embedding service using sentence-transformers"""

    def __init__(
        self,
        model_name: str = "Qwen/Qwen3-Embedding-0.6B",
        dimension: int = 1024
    ):
        self.model_name = model_name
        self.dimension = dimension
        self._model = None

    def _get_model(self):
        """Lazy load the embedding model"""
        if self._model is None:
            from sentence_transformers import SentenceTransformer
            print(f"Loading embedding model: {self.model_name}")
            self._model = SentenceTransformer(self.model_name)
        return self._model

    async def embed(self, text: str) -> list[float]:
        """Generate embedding for a single text"""
        model = self._get_model()
        embedding = model.encode(text, convert_to_numpy=True)
        return embedding.tolist()

    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings for multiple texts"""
        model = self._get_model()
        embeddings = model.encode(texts, convert_to_numpy=True)
        return [e.tolist() for e in embeddings]

    def get_dimension(self) -> int:
        """Get embedding dimension"""
        return self.dimension


class OpenAIEmbeddingService:
    """Fallback embedding service using OpenAI API"""

    def __init__(
        self,
        model: str = "text-embedding-3-small",
        api_key: Optional[str] = None,
        base_url: Optional[str] = None
    ):
        self.model = model
        self.api_key = api_key
        self.base_url = base_url
        self._client = None

    def _get_client(self):
        """Lazy load OpenAI client"""
        if self._client is None:
            from openai import OpenAI
            kwargs = {}
            if self.api_key:
                kwargs["api_key"] = self.api_key
            if self.base_url:
                kwargs["base_url"] = self.base_url
            self._client = OpenAI(**kwargs)
        return self._client

    async def embed(self, text: str) -> list[float]:
        """Generate embedding for a single text"""
        client = self._get_client()
        response = client.embeddings.create(
            model=self.model,
            input=text
        )
        return response.data[0].embedding

    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings for multiple texts"""
        client = self._get_client()
        response = client.embeddings.create(
            model=self.model,
            input=texts
        )
        return [d.embedding for d in response.data]

    def get_dimension(self) -> int:
        """Get embedding dimension"""
        if "small" in self.model:
            return 1536
        elif "large" in self.model:
            return 3072
        return 1536  # Default
