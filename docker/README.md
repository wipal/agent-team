# SimpleMem MCP Server

Long-term memory system for AI agents with semantic search capabilities.

## Quick Start

### 1. Build and Start

```bash
cd docker
docker compose up -d
```

### 2. Verify

```bash
docker ps | grep simplemem-mcp
docker logs simplemem-mcp
```

### 3. Use in Project

```bash
npx agent-team init --memory
```

## Architecture

```
┌─────────────────────────────────────────┐
│         Claude Code Session              │
│  ┌─────────────────────────────────┐    │
│  │  MCP Client                      │    │
│  │  - memory_add                    │    │
│  │  - memory_search                 │    │
│  │  - memory_get_context            │    │
│  │  - memory_consolidate            │    │
│  └──────────────┬──────────────────┘    │
└─────────────────┼───────────────────────┘
                  │ MCP/stdio
                  ▼
┌─────────────────────────────────────────┐
│       SimpleMem MCP Server (Docker)      │
│  ┌─────────────────────────────────┐    │
│  │  Three-Stage Pipeline            │    │
│  │  1. Semantic Compression         │    │
│  │  2. Online Synthesis             │    │
│  │  3. Intent-Aware Retrieval       │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  Storage                         │    │
│  │  - LanceDB (vectors)             │    │
│  │  - SQLite (metadata)             │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `memory_add` | Store new memory with semantic indexing |
| `memory_search` | Semantic search across memories |
| `memory_get_context` | Get context relevant to task intent |
| `memory_consolidate` | Synthesize patterns from memories |
| `memory_list_tenants` | List all agents with memory |
| `memory_delete` | Delete a specific memory |
| `memory_export` | Export memories to markdown/JSON |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `LLM_BASE_URL` | `http://host.docker.internal:11434/v1` | OpenAI-compatible endpoint |
| `LLM_API_KEY` | `ollama` | API key (if required) |
| `LLM_MODEL` | `qwen2.5:7b` | Model for pipeline stages |
| `EMBEDDING_MODEL` | `Qwen/Qwen3-Embedding-0.6B` | Embedding model |
| `SIMPLEMEM_DATA_DIR` | `/app/data` | Data storage path |

## Skills

| Skill | Purpose |
|-------|---------|
| `/remember` | Store important information |
| `/recall` | Search memories |
| `/reflect` | Consolidate patterns |
| `/memory-status` | Check system health |

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs simplemem-mcp

# Rebuild
docker compose build --no-cache
docker compose up -d
```

### Model download issues

The embedding model (~600MB) is pre-downloaded in the image. If you need to download manually:

```bash
docker exec -it simplemem-mcp python -c "
from sentence_transformers import SentenceTransformer
SentenceTransformer('Qwen/Qwen3-Embedding-0.6B')
"
```

### Permission issues

```bash
# Fix data directory permissions
docker exec -it simplemem-mcp chmod -R 755 /app/data
```

## Development

### Local Development

```bash
# Build image
cd docker/simplemem
docker build -t simplemem-mcp:dev .

# Run with volume mount for code changes
docker run -it --rm \
  -v $(pwd)/src:/app/src \
  -v simplemem-data:/app/data \
  -e LLM_BASE_URL=http://host.docker.internal:11434/v1 \
  simplemem-mcp:dev
```

### Testing

```bash
# Run MCP server locally (for testing)
cd docker/simplemem
pip install -e .
python -m simplemem_mcp.server --project test

# Test tools
# Use Claude Code or MCP Inspector
```
