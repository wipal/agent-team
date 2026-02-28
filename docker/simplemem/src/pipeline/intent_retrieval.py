"""
Intent-Aware Retrieval - Stage 3 of SimpleMem Pipeline

Retrieves memories based on task intent:
- Query planning
- Multi-view retrieval
- Adaptive depth
"""

from typing import Optional


class IntentAwareRetriever:
    """Stage 3: Intent-aware memory retrieval"""

    def __init__(
        self,
        vector_store,
        embedding_service,
        base_url: str = "http://localhost:11434/v1",
        api_key: str = "ollama",
        model: str = "qwen2.5:7b"
    ):
        self.vector_store = vector_store
        self.embedding_service = embedding_service
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

    async def retrieve(
        self,
        tenant_id: str,
        intent: Optional[str] = None,
        limit: int = 50
    ) -> dict:
        """
        Retrieve memories relevant to the given intent.

        If no intent provided, returns recent important memories.
        """
        if intent:
            # Generate queries based on intent
            queries = await self._plan_queries(intent)

            # Search with each query
            all_results = []
            for query in queries:
                embedding = await self.embedding_service.embed(query)
                results = await self.vector_store.search(
                    tenant_id,
                    embedding,
                    k=limit // len(queries) + 5
                )
                all_results.extend(results)

            # Deduplicate and rank
            unique_results = self._deduplicate(all_results)
            ranked = self._rank_by_relevance(unique_results, intent)

            return {
                "intent": intent,
                "memories": ranked[:limit],
                "total_found": len(unique_results)
            }
        else:
            # No intent - get recent memories
            # Use a generic "recent activity" embedding
            generic_query = "recent activity decisions patterns"
            embedding = await self.embedding_service.embed(generic_query)
            results = await self.vector_store.search(
                tenant_id,
                embedding,
                k=limit
            )

            return {
                "intent": None,
                "memories": results,
                "total_found": len(results)
            }

    async def _plan_queries(self, intent: str) -> list[str]:
        """Generate multiple search queries from intent"""
        prompt = f"""Given the following task intent, generate 2-3 search queries
that would help find relevant memories.

Intent: {intent}

Return a JSON array of search query strings.

JSON:"""

        try:
            client = self._get_client()
            response = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=200,
                temperature=0.3,
            )
            import json
            queries = json.loads(response.choices[0].message.content)
            # Always include original intent as a query
            if intent not in queries:
                queries.insert(0, intent)
            return queries
        except Exception:
            return [intent]

    def _deduplicate(self, results: list[dict]) -> list[dict]:
        """Remove duplicate results based on entry_id"""
        seen = set()
        unique = []
        for r in results:
            if r["entry_id"] not in seen:
                seen.add(r["entry_id"])
                unique.append(r)
        return unique

    def _rank_by_relevance(
        self,
        results: list[dict],
        intent: str
    ) -> list[dict]:
        """Rank results by relevance to intent"""
        # Simple ranking based on score and metadata importance
        def sort_key(r):
            score = r.get("score", 0)
            metadata = r.get("metadata", {})
            importance = metadata.get("importance", 5)
            # Lower score = better match in vector search
            # Higher importance = more important memory
            return score - (importance * 0.1)

        return sorted(results, key=sort_key)

    async def check_answer_adequacy(
        self,
        query: str,
        memories: list[dict]
    ) -> str:
        """
        Check if retrieved memories are adequate to answer the query.

        Returns: "sufficient", "insufficient", or "no_results"
        """
        if not memories:
            return "no_results"

        memories_text = "\n".join([
            f"- {m['content']}" for m in memories[:5]
        ])

        prompt = f"""Given the following query and retrieved memories,
determine if the memories contain enough information.

Query: {query}

Memories:
{memories_text}

Return only one of: "sufficient", "insufficient"

Answer:"""

        try:
            client = self._get_client()
            response = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=20,
                temperature=0.1,
            )
            answer = response.choices[0].message.content.strip().lower()
            if answer in ["sufficient", "insufficient"]:
                return answer
            return "insufficient"
        except Exception:
            return "insufficient"
