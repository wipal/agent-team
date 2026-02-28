# Discover Skills from skills.sh

Search and discover skills from the skills.sh directory.

## Usage

```
/discover <search-query> [options]
```

## Arguments

- `<search-query>` - Keywords to search for (e.g., "react", "api design", "testing")

## Options

- `--role <role>` - Filter by agent role (dev-fe, dev-be, sa, devops, tech-lead, pm, qa)
- `--category <cat>` - Filter by category (frontend, backend, architecture, devops, product, quality)
- `--official` - Only show official sources (Anthropic, Vercel, Microsoft, etc.)
- `--community` - Only show community sources
- `--limit <n>` - Limit results (default: 10)

## Examples

```bash
# Search for React skills
/discover react

# Search for frontend skills
/discover frontend --category frontend

# Search for dev-fe specific skills
/discover components --role dev-fe

# Search official sources only
/discover testing --official

# Search for backend API skills
/discover api rest --category backend
```

## What This Command Does

1. **Searches skills.sh** - Uses web search to query the skills.sh directory
2. **Filters results** - Based on provided options (role, category, source type)
3. **Presents findings** - Shows:
   - Skill name and description
   - Source (official/community)
   - Install count
   - Security status indicator

## Output Format

```
🔍 Skills Discovery Results: "<search-query>"

┌─────────────────────────────────────────────────────────────────────────────┐
│ OFFICIAL SOURCES (✅ Auto-validated)                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. react-best-practices                                                     │
│    Source: vercel-labs/agent-skills                                        │
│    Installs: 169K                                                          │
│    Description: 40+ rules for React performance and best practices         │
│                                                                             │
│ 2. frontend-design                                                          │
│    Source: anthropics/skills                                                │
│    Installs: 100K                                                          │
│    Description: Production-grade UI components with React/Tailwind         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMUNITY SOURCES (⚠️ Security review required)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. tailwind-design-system                                                   │
│    Source: wshobson/agents                                                 │
│    Installs: 11K                                                           │
│    Description: Tailwind CSS design system patterns                        │
│                                                                             │
│ 4. vue-best-practices                                                       │
│    Source: antfu/skills                                                    │
│    Installs: 7K                                                            │
│    Description: Vue.js best practices and patterns                         │
└─────────────────────────────────────────────────────────────────────────────┘

📋 To install: /install-skill <owner/repo> --skill <skill-name>
📋 Example: /install-skill vercel-labs/agent-skills --skill react-best-practices
```

## Search Tips

### By Technology

| Search Query | Expected Results |
|--------------|------------------|
| `react` | React patterns, hooks, best practices |
| `vue` | Vue.js patterns, composition API |
| `nestjs` | NestJS backend patterns |
| `fastapi` | FastAPI Python patterns |
| `tailwind` | Tailwind CSS patterns |
| `docker` | Docker, containerization |
| `kubernetes` | K8s patterns |

### By Role

| Role | Suggested Queries |
|------|-------------------|
| dev-fe | `react`, `vue`, `frontend`, `components`, `styling` |
| dev-be | `api`, `database`, `nestjs`, `fastapi`, `prisma` |
| sa | `architecture`, `microservices`, `design`, `patterns` |
| devops | `docker`, `kubernetes`, `ci-cd`, `terraform` |
| tech-lead | `code-review`, `mentoring`, `decision` |
| pm | `requirements`, `user-stories`, `sprint` |
| qa | `testing`, `e2e`, `playwright`, `cypress` |

## How Search Works

1. Uses web search with `site:skills.sh` filter
2. Queries: `site:skills.sh <search-query> <category-filter>`
3. Parses results for skill metadata
4. Cross-references with skills-registry.yaml for installed status

## Notes

- Results may vary based on skills.sh availability
- Install counts are from skills.sh leaderboard
- Official sources are from recognized tech companies
- Community sources require security validation before install
