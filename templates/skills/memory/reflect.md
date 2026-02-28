---
name: reflect
description: Consolidate memories, detect patterns, and synthesize learnings from recent work
invocable: true
---

# Reflect Skill

Consolidate memories, detect patterns, and synthesize learnings from your recent work.

## When to Use

Use this skill when:
- End of a significant work session
- After completing a feature or task
- Weekly/monthly reflection
- Before starting a major new phase
- When you feel you've accumulated learnings to consolidate
- User asks for a summary of recent work

## How to Use

### Option 1: Full Consolidation

Call the `memory_consolidate` MCP tool:

```
memory_consolidate(
  tenant_id="<agent-name>"
)
```

This will:
1. Analyze recent memories
2. Detect patterns and themes
3. Create synthesized summary entries
4. Link related memories
5. Archive redundant entries

### Option 2: Get Summary

Call `memory_get_context` with reflection intent:

```
memory_get_context(
  tenant_id="<agent-name>",
  intent="reflection summary patterns recent work",
  limit=30
)
```

## What Consolidation Does

### Pattern Detection

Identifies recurring themes across memories:
- Frequently used patterns
- Repeated decisions or choices
- Common bug types or issues
- Emerging conventions

### Theme Synthesis

Creates high-level summaries:
- "Authentication patterns used: JWT with refresh tokens, stored in httpOnly cookies"
- "Testing approach: Vitest for unit, Playwright for E2E, MSW for API mocking"
- "State management preference: Zustand for global, React Query for server state"

### Memory Linking

Connects related entries:
- Bug fix → Root cause entry
- Decision → Implementation entry
- Pattern → Usage examples

### Cleanup

Archives redundant or obsolete entries:
- Superseded decisions
- Duplicate entries
- Temporary notes that are no longer relevant

## Example Workflow

### End of Session Reflection

```
1. Store any final memories with /remember
2. Call memory_consolidate to synthesize
3. Review the consolidated patterns
4. Update knowledge.md if significant new patterns
```

### Weekly Review

```
1. Recall recent work: /recall "past week work summary"
2. Reflect and consolidate: /reflect
3. Identify patterns and learnings
4. Update project documentation
```

## Output Format

Consolidation returns:

```json
{
  "success": true,
  "summary": {
    "memories_analyzed": 45,
    "patterns_detected": [
      {
        "pattern": "Prefer composition over inheritance for React components",
        "frequency": 8,
        "examples": ["Button variants", "Form fields", "Card layouts"]
      }
    ],
    "themes": [
      "Performance optimization focus",
      "Accessibility improvements",
      "Test coverage expansion"
    ],
    "recommendations": [
      "Consider extracting common component patterns to shared library",
      "Document performance optimization checklist"
    ]
  }
}
```

## Best Practices

1. **Regular Reflection**: Consolidate at end of each work session
2. **Review Before Big Changes**: Check patterns before major refactors
3. **Update Documentation**: Move consolidated patterns to knowledge.md
4. **Share with Team**: Important patterns should be shared with other agents

## Integration with knowledge.md

After consolidation:

1. **High-Value Patterns** → Add to knowledge.md
2. **Conventions** → Update project rules
3. **Decisions** → Update ADR (Architecture Decision Records)
4. **Learnings** → Add to lessons.md

## Example Consolidation Session

```
# End of session

/remember "Implemented lazy loading for images using IntersectionObserver"

/remember "Added error boundary wrapper for all route components"

/remember "Fixed layout shift issue by reserving space with aspect-ratio"

# Now consolidate
/reflect

# Output:
# - Pattern detected: Performance optimization focus
# - Theme: Core Web Vitals improvements
# - Recommendation: Create performance checklist

# Update knowledge.md with new patterns
```
