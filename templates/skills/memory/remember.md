---
name: remember
description: Store important information to long-term memory for later retrieval
invocable: true
---

# Remember Skill

Store important information to SimpleMem long-term memory system.

## When to Use

Use this skill when:
- User makes an important decision
- You complete a significant task or feature
- You learn a new pattern or best practice
- You fix a bug and want to remember the solution
- User shares project-specific knowledge
- You establish conventions or architecture decisions

## How to Use

Call the `memory_add` MCP tool:

```
memory_add(
  tenant_id="<agent-name>",
  content="<what to remember>",
  metadata={
    "type": "decision|pattern|bugfix|learning|convention|architecture",
    "importance": 1-10,
    "tags": ["relevant", "tags"]
  }
)
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `tenant_id` | Yes | Your agent name (for memory isolation) |
| `content` | Yes | The information to remember (be specific and detailed) |
| `metadata.type` | No | Category: decision, pattern, bugfix, learning, convention, architecture |
| `metadata.importance` | No | Priority 1-10 (default: 5) |
| `metadata.tags` | No | Array of relevant tags for filtering |

## Examples

### Storing a Decision

```
memory_add(
  tenant_id="dev-fe",
  content="Decided to use React Query instead of SWR for data fetching. Rationale: Better caching control, more comprehensive documentation, wider community support. Date: 2025-01-15. Discussed with: tech-lead",
  metadata={
    "type": "decision",
    "importance": 8,
    "tags": ["react", "data-fetching", "architecture"]
  }
)
```

### Storing a Bug Fix

```
memory_add(
  tenant_id="dev-be",
  content="Fixed memory leak in WebSocket connection handler. Root cause: Event listeners not cleaned up on disconnect. Solution: Added cleanup in useEffect return and component unmount. File: src/services/websocket.ts",
  metadata={
    "type": "bugfix",
    "importance": 7,
    "tags": ["websocket", "memory-leak", "bugfix"]
  }
)
```

### Storing a Pattern

```
memory_add(
  tenant_id="dev-fe",
  content="Pattern: For form handling, use react-hook-form with Zod schema validation. Structure: Define schema → infer type → use useForm with zodResolver. Example: schemas/user.ts has UserSchema, components/UserForm.tsx uses it.",
  metadata={
    "type": "pattern",
    "importance": 6,
    "tags": ["forms", "react-hook-form", "zod", "validation"]
  }
)
```

## Best Practices

1. **Be Specific**: Include file paths, function names, dates, and rationale
2. **Use Tags**: Add relevant tags for easier retrieval
3. **Rate Importance**: Higher importance (8-10) for critical decisions
4. **Include Context**: Why was this decision made? Who was involved?
5. **Link to Code**: Mention specific files or functions when relevant

## Tips for Good Memory Entries

- Start with WHAT, then WHY, then HOW
- Include the date or reference to when it happened
- Name the people/agents involved in decisions
- Reference related decisions or patterns
- Note any trade-offs considered
