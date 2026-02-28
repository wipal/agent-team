# Quick Reference

> **Phiên bản:** 1.0
> **Cập nhật:** 2025-02-25
> **Related:** [All Documentation](README.md)

---

## 📋 Mục Lục

1. [Core Commands](#-core-commands)
2. [Model Strategy Quick Reference](#-model-strategy-quick-reference)
3. [General Rules Quick Reference](#-general-rules-quick-reference)
4. [Variant Categories](#-variant-categories)
5. [Skills Sources](#-skills-sources)
6. [Directory Structure](#-directory-structure)
7. [Troubleshooting](#-troubleshooting)
8. [FAQ](#-faq)

---

## ⌨️ Core Commands

### Unified Script `./agent.sh`

```bash
./agent.sh <command> [options]

Commands:
  setup     Create new agent with variants
  update    Update existing agent
  review    Review project & detect tech stack
  learn     Analyze project & update knowledge
  check     Verify all skills installed
  list      List all agents
  switch    Switch to agent
  sync      Share knowledge between agents
  remove    Remove an agent
```

### Setup Examples

```bash
# Simple FE agent
./agent.sh setup my-fe dev-fe --framework react --styling tailwind

# Full stack FE
./agent.sh setup payment-fe dev-fe \
  --framework react \
  --styling tailwind \
  --state zustand \
  --testing vitest

# Backend NestJS
./agent.sh setup auth-api dev-be \
  --framework nestjs \
  --database postgresql \
  --orm prisma

# Using preset
./agent.sh setup admin-fe dev-fe --preset react-full-stack

# From config file
./agent.sh setup payment-fe dev-fe --config ./configs/payment.yaml
```

### Agent Management

```bash
# List all agents
./agent.sh list

# Switch agent
./agent.sh switch payment-fe

# Update agent
./agent.sh update payment-fe --add graphql
./agent.sh update payment-fe --remove i18n
./agent.sh update payment-fe --replace zustand=jotai

# Check skills
./agent.sh check payment-fe --fix

# Remove agent
./agent.sh remove payment-fe
```

### Learning & Sync

```bash
# Learn from project
./agent.sh learn

# Sync knowledge
./agent.sh sync payment-fe admin-fe
./agent.sh sync payment-fe --to-role dev-fe

# Retrospect
/retrospect-work
```

### Slash Commands

| Command | Description |
|---------|-------------|
| `/switch <agent>` | Switch to agent |
| `/retrospect` | Run self-learning |
| `/knowledge-review` | Review knowledge base |
| `/learn` | Capture learning |

---

## 🧠 Model Strategy Quick Reference

### Task → Model Mapping

| Task | Model | Thinking |
|------|-------|----------|
| Planning / Architecture | Opus 4 | ✅ |
| Code Review | Opus 4 | ✅ |
| Debugging (Complex) | Opus 4 | ✅ |
| Learning / Retrospect | Opus 4 | ✅ |
| Implementation | Sonnet 4 | ❌ |
| Bug Fixing (Simple) | Sonnet 4 | ❌ |
| Writing Tests | Sonnet 4 | ❌ |
| Documentation | Sonnet 4 | ❌ |
| Formatting | Haiku | ❌ |
| Simple Query | Haiku | ❌ |

### Quick Decision

```
Is it THINKING or DOING?

THINKING (Analysis, Planning, Review)
  → Opus 4 + Thinking Mode

DOING (Implementation, Testing, Docs)
  → Sonnet 4

SIMPLE (Formatting, Queries)
  → Haiku
```

### Model Override

```bash
# Force Opus
./agent.sh switch payment-fe --model opus --thinking

# Force Sonnet
./agent.sh switch payment-fe --model sonnet
```

---

## 📜 General Rules Quick Reference

### Workflow Orchestration

| Rule | Description |
|------|-------------|
| **Plan Mode Default** | Enter plan mode for 3+ step tasks |
| **Subagent Strategy** | Use subagents for research/exploration |
| **Self-Improvement Loop** | Update lessons.md after corrections |
| **Verification Before Done** | Never complete without proving it works |
| **Autonomous Bug Fixing** | Just fix bugs, don't ask for hand-holding |

### Task Management

1. **Plan First** → Write to `tasks/todo.md`
2. **Verify Plan** → Get confirmation
3. **Track Progress** → Mark items complete
4. **Explain Changes** → High-level summary
5. **Document Results** → Add review section
6. **Capture Lessons** → Update `lessons.md`

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Simplicity First** | Make every change as simple as possible |
| **No Laziness** | Find root causes, no temporary fixes |
| **Minimal Impact** | Only touch what's necessary |
| **Senior Standards** | Staff engineer quality |

### Verification Protocol

```
RED FLAGS - STOP:
- Using "should"/"probably"/"seems to"
- Expressing satisfaction before verification
- Committing without verification

REQUIRED:
1. IDENTIFY verification command
2. RUN full command
3. READ actual output
4. VERIFY confirms claim
5. THEN make claim
```

---

## 🎨 Variant Categories

### Frontend Variants

| Category | Options |
|----------|---------|
| **Framework** | `react`, `vue`, `angular`, `svelte`, `vanilla` |
| **Meta-Framework** | `nextjs`, `nuxt`, `remix`, `astro` |
| **Styling** | `tailwind`, `css-modules`, `styled-components`, `scss` |
| **State** | `zustand`, `redux`, `recoil`, `jotai`, `mobx` |
| **Data** | `tanstack-query`, `swr`, `apollo`, `urql` |
| **Testing** | `vitest`, `jest`, `testing-library`, `cypress` |
| **i18n** | `react-i18next`, `formatjs`, `next-intl` |
| **Form** | `react-hook-form`, `formik`, `zod` |
| **UI Lib** | `shadcn`, `mui`, `ant-design`, `chakra` |

### Backend Variants

| Category | Options |
|----------|---------|
| **Framework** | `nestjs`, `express`, `fastapi`, `go-gin` |
| **Database** | `postgresql`, `mysql`, `mongodb`, `redis` |
| **ORM** | `prisma`, `typeorm`, `sequelize`, `mongoose` |
| **Testing** | `jest`, `vitest`, `pytest` |
| **Validation** | `zod`, `class-validator`, `joi` |
| **Auth** | `passport-jwt`, `auth0`, `cognito` |

### Category Selection Rules

```
Framework:    CHỌN 1 (required)
Styling:      CHỌN 1 (optional)
State:        CHỌN 1 (optional)
Data:         CHỌN 1 (optional)
Testing:      CHỌN 1 (optional)
UI Lib:       CHỌN 1 (optional)
```

---

## 📦 Skills Sources

### Official (Install/Reference OK)

| Source | URL | Notable Skills |
|--------|-----|----------------|
| **Anthropic** | github.com/anthropics/skills | docx, pdf, frontend-design, webapp-testing |
| **Vercel Labs** | github.com/vercel-labs/agent-skills | react-best-practices, web-design-guidelines |
| **Microsoft** | github.com/microsoft/skills | azure-ai-agents, typescript-patterns |
| **Google** | github.com/google/gemini-skills | gemini-skills, ai-multimodal |
| **Stripe** | github.com/stripe/agent-skills | stripe-best-practices |
| **Expo** | github.com/expo/expo-skills | expo-app-design |

### Community (MUST COPY)

| Source | URL | Notable Skills |
|--------|-----|----------------|
| **ClaudeKit** | github.com/mrgoonie/claudekit-skills | debugging, problem-solving, code-review |
| **VoltAgent** | github.com/VoltAgent/awesome-agent-skills | 380+ curated skills |

### Strategy Quick Reference

| Source Type | Strategy | Reason |
|-------------|----------|--------|
| Official | REFERENCE | Always latest |
| Base skills | SYMLINK | Shared, consistent |
| Variant skills | COPY | Customizable |
| Community | COPY | Independent, offline |

---

## 📁 Directory Structure

### Template Structure

```
agent-team-template/
├── .claude/
│   ├── commands/          # Slash commands
│   ├── skills/            # Skills (base/roles/variants)
│   ├── rules/             # Rules (common/role-rules/lessons)
│   └── settings.json      # MCP configurations
├── roles/
│   ├── base/              # Base role templates
│   └── variants/          # Variant additions
├── scripts/
│   └── agent.sh           # UNIFIED script
├── presets/               # Quick setup presets
└── docs/                  # Documentation
```

### Project Instance Structure

```
my-project/
├── .claude/
│   ├── CLAUDE.md          # Project context
│   ├── agents/            # Multiple agent instances
│   │   └── {agent-name}/
│   │       ├── CLAUDE.md
│   │       ├── knowledge.md
│   │       └── skills/
│   ├── shared-skills/     # Shared skills (symlinks)
│   ├── rules/             # Rules (copy from template)
│   └── settings.json
└── docs/
```

### Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Agent/Project configuration |
| `knowledge.md` | Learned patterns and decisions |
| `variants.json` | Track installed variants |
| `SKILL.md` | Skill definition |
| `lessons.md` | Lessons learned from corrections |

---

## 🔧 Troubleshooting

### Common Issues

#### Skills Not Found

```bash
# Issue
./agent.sh check payment-fe
# ❌ zustand-patterns (MISSING)

# Solution
./agent.sh check payment-fe --fix
```

#### Context7 Not Connected

```bash
# Check configuration
cat .claude/settings.json | grep context7

# Expected:
# "context7": {
#   "command": "npx",
#   "args": ["-y", "@context7/mcp-server"]
# }
```

#### Invalid Config

```bash
# Issue
# ❌ Config validation failed: Unknown variant

# Solution
./agent.sh setup --list-variants
# Check valid variant names
```

#### Duplicate Agent Name

```bash
# Issue
# ❌ Agent 'payment-fe' already exists

# Solution
./agent.sh setup payment-fe-v2 dev-fe --framework react
# or
./agent.sh update payment-fe --add graphql
```

#### Model Not Switching

```bash
# Check current status
./agent.sh status

# Force switch
./agent.sh switch payment-fe --model opus --thinking
```

### Error Messages

| Error | Solution |
|-------|----------|
| `Skill not found` | Run `./agent.sh check --fix` |
| `MCP not connected` | Check `settings.json` |
| `Invalid variant` | Run `--list-variants` |
| `Agent exists` | Use different name or update existing |
| `Config validation failed` | Check YAML syntax |

---

## ❓ FAQ

### General

**Q: What's the difference between role and variant?**
```
Role = Job function (dev-fe, dev-be, qa)
Variant = Tech stack choice (react, vue, nestjs)

Agent = Role + Variants
Example: payment-fe = dev-fe + react + tailwind + zustand
```

**Q: Can I have multiple agents with same role?**
```
Yes! Each agent is independent.

./agent.sh setup payment-fe dev-fe --framework react
./agent.sh setup admin-fe dev-fe --framework vue

Both are dev-fe but different variants.
```

**Q: When should I use Opus vs Sonnet?**
```
Opus: Planning, Architecture, Code Review, Debugging
Sonnet: Implementation, Testing, Documentation

Rule of thumb:
- THINKING tasks → Opus + Thinking
- DOING tasks → Sonnet
```

### Setup

**Q: How do I add a new variant to existing agent?**
```bash
./agent.sh update payment-fe --add graphql
```

**Q: How do I switch tech stack?**
```bash
# Replace variant
./agent.sh update payment-fe --replace zustand=jotai

# Or switch entire framework
./agent.sh update payment-fe --switch-framework vue
```

**Q: How do I copy skills from community?**
```bash
# Skills are auto-copied when using COPY strategy
# Or manually:
cp -r .claude/skills/community/debugging .claude/agents/payment-fe/skills/
```

### Workflows

**Q: How often should I run retrospect?**
```
- After completing a feature
- After receiving user correction
- End of day/week
- After bug fixes
```

**Q: How do I share knowledge between agents?**
```bash
# Between two agents
./agent.sh sync payment-fe admin-fe

# To all agents of same role
./agent.sh sync payment-fe --to-role dev-fe
```

### Skills

**Q: When to COPY vs SYMLINK vs REFERENCE?**
```
COPY:      Community skills, customization needed
SYMLINK:   Shared base skills, want consistency
REFERENCE: Official skills, always want latest
```

**Q: How do I create a custom skill?**
```
1. Create directory: .claude/skills/{category}/{skill-name}/
2. Create SKILL.md with skill definition
3. Add references/ if needed
4. Test with /skill-name
```

### Rules

**Q: How do I add rules for my agent?**
```
1. General rules: .claude/rules/common/
2. Role rules: .claude/rules/role-rules/{role}-rules.md
3. Language rules: .claude/rules/languages/{lang}/

Update lessons.md when learning from mistakes.
```

**Q: How does self-improvement work?**
```
1. Work on task
2. Receive correction/feedback
3. Run /retrospect-work
4. Extract pattern
5. Update knowledge.md and lessons.md
6. Rule prevents same mistake
```

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Overview |
| [01-architecture.md](01-architecture.md) | System architecture |
| [02-setup-guide.md](02-setup-guide.md) | Setup instructions |
| [03-skills-guide.md](03-skills-guide.md) | Managing skills |
| [04-workflows.md](04-workflows.md) | Workflow orchestration |
| [05-model-strategy.md](05-model-strategy.md) | Model selection |
| [06-extend-guide.md](06-extend-guide.md) | Creating new components |
| [07-quick-reference.md](07-quick-reference.md) | This cheat sheet |

---

## 🔗 Quick Links

### Commands

```bash
# Setup
./agent.sh setup <name> <role> [variants]

# Manage
./agent.sh list
./agent.sh switch <name>
./agent.sh update <name> [options]
./agent.sh remove <name>

# Verify
./agent.sh check [--fix]
./agent.sh review
./agent.sh learn

# Share
./agent.sh sync <from> <to>
```

### File Locations

```bash
# Configuration
.claude/agents/{name}/CLAUDE.md
.claude/settings.json

# Knowledge
.claude/agents/{name}/knowledge.md
.claude/rules/lessons/lessons.md

# Skills
.claude/skills/base/
.claude/skills/roles/
.claude/skills/variants/

# Workflows
workflows/*.yaml
```

### Presets

```bash
./agent.sh setup <name> dev-fe --preset react-full-stack
./agent.sh setup <name> dev-fe --preset vue-minimal
./agent.sh setup <name> dev-be --preset nestjs-api
./agent.sh setup <name> dev-be --preset express-api
```
