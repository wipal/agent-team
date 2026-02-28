---
name: recall
description: Search and retrieve memories from long-term storage using semantic search
invocable: true
---

# Recall Skill

Search and retrieve memories from SimpleMem long-term memory system.

## When to Use

Use this skill when:
- Starting a new task - check relevant history first
- Encountering a bug - check similar past issues
- Making a decision - review past decisions
- Implementing a feature - look for existing patterns
- User asks about project history or decisions
- You need context on why something was done a certain way

## How to Use

### Option 1: Basic Search

Call the `memory_search` MCP tool:

```
memory_search(
  tenant_id="<agent-name>",
  query="<what to search for>",
  k=10
)
```

### Option 2: Get Context by Intent

Call the `memory_get_context` MCP tool:

```
memory_get_context(
  tenant_id="<agent-name>",
  intent="<current task or intent>",
  limit=20
)
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `tenant_id` | Yes | Your agent name (for memory isolation) |
| `query` | Yes (search) | Natural language search query |
| `intent` | Yes (context) | Current task intent for relevant context |
| `k` / `limit` | No | Number of results (default: 10) |

## Examples

### Searching for Decisions

```
memory_search(
  tenant_id="dev-fe",
  query="why did we choose react query over swr",
  k=5
)
```

### Searching for Bug Fixes

```
memory_search(
  tenant_id="dev-be",
  query="websocket memory leak fix",
  k=5
)
```

### Getting Context for a Task

```
memory_get_context(
  tenant_id="dev-fe",
  intent="implementing user authentication with JWT",
  limit=10
)
```

### Searching for Patterns

```
memory_search(
  tenant_id="dev-fe",
  query="form validation pattern",
  k=5
)
```

## Search Tips

1. **Use Natural Language**: The search is semantic, so describe what you're looking for naturally
2. **Include Context**: "why did we..." or "how to..." works well
3. **Use Multiple Terms**: "authentication JWT token refresh" finds more specific results
4. **Try Different Phrasings**: If no results, rephrase the query

## Interpreting Results

Results are returned as JSON:

```json
{
  "success": true,
  "results": [
    {
      "entry_id": "uuid",
      "content": "The stored memory content...",
      "metadata": {
        "type": "decision",
        "importance": 8,
        "tags": ["react", "data-fetching"]
      },
      "timestamp": "2025-01-15T10:30:00",
      "score": 0.85  // Similarity score (higher = better match)
    }
  ]
}
```

- **score**: Similarity score (0-1, higher = better match)
- **content**: The stored information
- **metadata**: Type, importance, tags
- **timestamp**: When it was stored

## Workflow Integration

### Before Starting a Task

```
1. Call memory_get_context with your task intent
2. Review relevant past decisions and patterns
3. Check for any related bug fixes or learnings
4. Proceed with context-aware implementation
```

### When Encountering an Issue

```
1. Call memory_search with the error or issue description
2. Look for similar past problems and solutions
3. Apply learnings or escalate if new issue
4. Store the new fix with /remember
```

### When Making Decisions

```
1. Search for related past decisions
2. Review rationale and trade-offs
3. Make new decision with historical context
4. Store new decision with /remember
```
