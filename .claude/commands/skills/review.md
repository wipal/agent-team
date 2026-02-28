# Review Existing Skills

Review existing skills and find better alternatives from skills.sh.

## Usage

```
/review-skills [options]
```

## Options

- `--all` - Review all 37 existing skills
- `--category <name>` - Review specific category (frontend, backend, architecture, devops, product, quality, leadership)
- `--skill <name>` - Review specific skill
- `--suggest` - Suggest better alternatives from skills.sh
- `--report` - Generate detailed report file

## Examples

```bash
# Review all skills
/review-skills --all

# Review frontend skills only
/review-skills --category frontend

# Review specific skill
/review-skills --skill code-review

# Review and suggest alternatives
/review-skills --category frontend --suggest

# Generate report file
/review-skills --all --report
```

## Review Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SKILL REVIEW WORKFLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. LIST EXISTING SKILLS                                                     │
│     ├── Read skills-registry.yaml                                           │
│     └── Filter by category if specified                                     │
│                                                                              │
│  2. FOR EACH SKILL                                                           │
│     ├── Search skills.sh for similar skills                                 │
│     ├── Compare:                                                            │
│     │   ├── Content depth                                                   │
│     │   ├── Examples quality                                                │
│     │   ├── Last update                                                     │
│     │   ├── Install count (if from skills.sh)                               │
│     │   └── Source authority                                                │
│     └── Calculate recommendation                                            │
│                                                                              │
│  3. GENERATE RECOMMENDATIONS                                                 │
│     ├── KEEP: Current skill is good enough                                  │
│     ├── UPDATE: Merge improvements from skills.sh                           │
│     ├── REPLACE: Better alternative exists on skills.sh                     │
│     └── NEW: Missing skill, should add                                      │
│                                                                              │
│  4. PRESENT REPORT                                                           │
│     ├── Summary statistics                                                  │
│     ├── Detailed recommendations                                            │
│     └── Action items                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Comparison Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Content Depth | 30% | How comprehensive is the skill? |
| Examples | 20% | Quality and quantity of code examples |
| Maintenance | 20% | Last update, activity |
| Authority | 15% | Official vs community source |
| Install Count | 15% | Popularity on skills.sh |

## Output Format

### Summary Report

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                         SKILLS REVIEW REPORT                                  ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ Date: 2025-02-26                                                             ║
║ Skills Reviewed: 37                                                          ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  RECOMMENDATIONS SUMMARY                                                      ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                                                               ║
║  ✅ KEEP:     25 skills (68%)                                                ║
║  📝 UPDATE:   8 skills (22%)                                                 ║
║  🔄 REPLACE:  2 skills (5%)                                                  ║
║  ➕ NEW:      5 skills recommended                                           ║
║                                                                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### Detailed Recommendations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✅ KEEP (25 skills)                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ These skills are well-written and project-specific:                         │
│                                                                              │
│ • code-review - Custom to project workflow, better than generic             │
│ • git-automation - Integrated with project hooks                            │
│ • system-design - Comprehensive with local examples                         │
│ • adr-writing - Matches project ADR template                                │
│ ... (21 more)                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📝 UPDATE (8 skills)                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ Can be improved with patterns from skills.sh:                               │
│                                                                              │
│ 1. frontend-design                                                           │
│    Current: Basic React patterns                                            │
│    Improvement: Add performance rules from vercel-labs/react-best-practices │
│    Action: Merge 40+ rules from official source                             │
│                                                                              │
│ 2. api-design                                                                │
│    Current: REST basics                                                      │
│    Improvement: Add OpenAPI examples from anthropics/api-patterns           │
│    Action: Add reference files with OpenAPI templates                       │
│ ... (6 more)                                                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔄 REPLACE (2 skills)                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ Better alternatives exist on skills.sh:                                      │
│                                                                              │
│ 1. testing-fe → vitest (antfu/skills)                                       │
│    Reason: More comprehensive, 6K+ installs, actively maintained            │
│    Migration: Low effort (similar structure)                                │
│                                                                              │
│ 2. performance-fe → react-performance (vercel-labs)                         │
│    Reason: Official source, 58K installs, React-specific                    │
│    Migration: Medium effort (need to adapt examples)                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ ➕ NEW RECOMMENDED (5 skills)                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ Missing skills that should be added:                                         │
│                                                                              │
│ 1. error-handling (obra/superpowers)                                        │
│    Reason: Better error patterns, defense-in-depth                          │
│    Category: core                                                            │
│                                                                              │
│ 2. mcp-builder (anthropics/skills)                                          │
│    Reason: MCP server creation capability                                   │
│    Category: domain/backend                                                  │
│                                                                              │
│ 3. react-native (callstackincubator/agent-skills)                           │
│    Reason: Mobile development support                                        │
│    Category: domain/frontend                                                 │
│                                                                              │
│ 4. seo-audit (coreyhaines31/marketingskills)                                │
│    Reason: SEO optimization for web projects                                 │
│    Category: domain/product                                                  │
│                                                                              │
│ 5. debugging (obra/superpowers)                                             │
│    Reason: Systematic debugging methodology                                  │
│    Category: core                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Action Items

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📋 ACTION ITEMS                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ Priority 1 (Immediate):                                                      │
│ ├── [ ] Install mcp-builder from anthropics/skills                          │
│ └── [ ] Merge react-best-practices into frontend-design                     │
│                                                                              │
│ Priority 2 (This Sprint):                                                    │
│ ├── [ ] Replace testing-fe with vitest from antfu/skills                    │
│ ├── [ ] Add error-handling from obra/superpowers                            │
│ └── [ ] Update api-design with OpenAPI patterns                             │
│                                                                              │
│ Priority 3 (Next Sprint):                                                    │
│ ├── [ ] Install react-native skills for mobile support                      │
│ ├── [ ] Add seo-audit for web optimization                                  │
│ └── [ ] Review and install debugging skill                                  │
│                                                                              │
│ Commands to execute:                                                         │
│ /install-skill anthropics/skills --skill mcp-builder                        │
│ /install-skill antfu/skills --skill vitest                                  │
│ /install-skill obra/superpowers --skill error-handling                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Report File

When using `--report`, a markdown file is generated:

```
.claude/skills/reports/skills-review-2025-02-26.md
```

## Category Breakdown

| Category | Skills | KEEP | UPDATE | REPLACE | NEW |
|----------|--------|------|--------|---------|-----|
| Core | 4 | 3 | 1 | 0 | 2 |
| Frontend | 5 | 2 | 2 | 1 | 1 |
| Backend | 5 | 4 | 1 | 0 | 0 |
| Architecture | 6 | 5 | 1 | 0 | 0 |
| DevOps | 5 | 4 | 1 | 0 | 0 |
| Product | 5 | 3 | 1 | 1 | 1 |
| Quality | 4 | 2 | 1 | 0 | 0 |
| Leadership | 4 | 3 | 0 | 0 | 0 |

## Integration

- **Before adding skills**: Run review to avoid duplicates
- **Monthly audit**: Run `--all` monthly to stay updated
- **After skills.sh updates**: Re-review for new alternatives
- **Documentation**: Report files are version-controlled
