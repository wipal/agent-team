---
name: memory-status
description: Check the health and statistics of the SimpleMem memory system
invocable: true
---

# Memory Status Skill

Check the health and statistics of your SimpleMem long-term memory system.

## When to Use

- Checking if memory system is working
- Debugging memory issues
- Getting overview of stored memories
- Verifying Docker container status
- Checking memory usage statistics

## How to Use

Call the `memory_list_tenants` MCP tool:

```
memory_list_tenants()
```

## Response Format

```json
{
  "success": true,
  "tenants": [
    "dev-fe",
    "dev-be",
    "sa"
  ],
  "stats": {
    "total_memories": 150,
    "storage_size_mb": 12.5,
    "oldest_memory": "2025-01-01",
    "newest_memory": "2025-01-27"
  }
}
```

## Troubleshooting

### Container Not Running

If you get connection errors:

```bash
# Check container status
docker ps | grep simplemem-mcp

# Start container
cd <agent-team>/docker
docker compose up -d

# Check logs
docker logs simplemem-mcp
```

### Memory Tools Not Available

If MCP tools are not showing:

1. Check `settings.json` has `mcpServers.simplemem`
2. Restart Claude Code
3. Verify container is running

### No Memories Found

If searches return empty:

1. Add some memories with `/remember`
2. Check tenant_id matches your agent name
3. Verify storage directory exists
