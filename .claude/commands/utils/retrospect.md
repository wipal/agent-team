---
name: retrospect
description: Run self-learning retrospect on current session
---

# Retrospect Command

## Usage
```
/retrospect [options]
```

## Options
- `--deep` - Deep analysis of all changes
- `--agent <name>` - Retrospect for specific agent
- `--all` - Run for all agents

## What It Does

1. **Analyzes** changes made in session
2. **Extracts** patterns and learnings
3. **Updates** knowledge.md
4. **Updates** lessons.md
5. **Suggests** rule updates

## Output

```
═══════════════════════════════════════════════════════════════
🧠 RETROSPECT: Session Analysis
═══════════════════════════════════════════════════════════════

📊 Session Summary:
- Files changed: 5
- Lines added: 234
- Lines removed: 45

✅ Patterns Found:
1. Repository Pattern used correctly
2. DTO validation with Zod
3. Error handling with custom exceptions

⚠️ Anti-patterns Detected:
1. N+1 query in getOrders() - Fixed
2. Missing loading state - Added

📝 Knowledge Updates:
- Added: Repository Pattern example
- Added: Error handling pattern
- Updated: Testing approach

📄 Files Updated:
- knowledge.md (2 additions)
- lessons.md (1 lesson)

Approve changes? [y/n]:
```

## Integration
- Works with `retrospect-work` skill
- Updates agent's knowledge base
- Can sync to related agents
