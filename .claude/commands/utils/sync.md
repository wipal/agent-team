---
name: sync
description: Sync knowledge between agents
---

# Sync Command

## Usage
```
/sync <from-agent> <to-agent>
/sync <from-agent> --to-role <role>
/sync --all
```

## Options

| Option | Description |
|--------|-------------|
| `<from-agent>` | Source agent to sync from |
| `<to-agent>` | Target agent to sync to |
| `--to-role <role>` | Sync to all agents of the same role |
| `--all` | Sync across all agents |
| `--patterns` | Only sync patterns |
| `--pitfalls` | Only sync pitfalls |
| `--rules` | Only sync rules |

## Examples

### Sync between two agents
```
/sync payment-fe admin-fe
```

Output:
```
═══════════════════════════════════════════════════════════════
🔄 SYNCING KNOWLEDGE
═══════════════════════════════════════════════════════════════

From: payment-fe (dev-fe + react)
To: admin-fe (dev-fe + vue)

📚 Patterns to sync:
1. Form validation with Zod
2. Error handling pattern
3. API response format

⚠️ Pitfalls to sync:
1. N+1 queries in user list

📝 Syncing...
✅ Added 3 patterns to admin-fe
✅ Added 1 pitfall to admin-fe

Sync complete? [y/n]:
═══════════════════════════════════════════════════════════════
```

### Sync to all agents of same role
```
/sync payment-fe --to-role dev-fe
```

Output:
```
═══════════════════════════════════════════════════════════════
🔄 SYNCING KNOWLEDGE TO ROLE: dev-fe
═══════════════════════════════════════════════════════════════

From: payment-fe

Target agents:
├── admin-fe (will receive 3 patterns)
├── dashboard-fe (will receive 3 patterns)
└── settings-fe (will receive 3 patterns)

Patterns to sync:
1. Form validation with Zod
2. Error handling pattern
3. API response format

Sync to all 3 agents? [y/n]:
```

### Sync only patterns
```
/sync payment-fe admin-fe --patterns
```

### Sync across all agents
```
/sync --all
```

Output:
```
═══════════════════════════════════════════════════════════════
🔄 SYNCING ACROSS ALL AGENTS
═══════════════════════════════════════════════════════════════

Analyzing knowledge bases...

📚 Universal Patterns (apply to all):
1. Always handle loading states
2. Always handle error states
3. Use Context7 before implementing

🔧 Role-Specific Patterns (sync within roles):
- dev-fe: 5 patterns shared
- dev-be: 4 patterns shared

Sync universal patterns to all agents? [y/n]:
```

## What Gets Synced

### Patterns
Reusable code patterns and approaches
```markdown
## Pattern: Form Validation with Zod
Use Zod schemas for type-safe validation...

**Code:**
\`\`\`typescript
const schema = z.object({...});
\`\`\`
```

### Pitfalls
Common mistakes to avoid
```markdown
## Pitfall: N+1 Queries
Avoid fetching related data in loops...
```

### Rules
Learned rules from corrections
```markdown
## Rule: Always Check Context7
Before using any API, check Context7 for latest docs...
```

## What Doesn't Get Synced

- Project-specific context
- Sensitive information
- Temporary notes
- User corrections (only lessons extracted)

## Sync Strategy

### When to Sync
- After completing a feature with reusable patterns
- After fixing a bug that could affect other agents
- After learning a new best practice
- At end of day/week

### What to Sync
| Type | Sync Across Roles | Sync Within Role |
|------|-------------------|------------------|
| Patterns | Universal only | All |
| Pitfalls | Universal only | All |
| Rules | All | All |
| Context | Never | Never |

## Integration

Sync works with:
- `/retrospect` - Extract patterns before syncing
- `/learn` - Add new patterns to sync
- `./agent.sh sync` - CLI version

## CLI Equivalent
```bash
# Sync between agents
./agent.sh sync payment-fe admin-fe

# Sync to role
./agent.sh sync payment-fe --to-role dev-fe

# Sync all
./agent.sh sync --all
```
