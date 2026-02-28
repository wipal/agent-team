# @wipal/agent-team

> **Template for creating AI agent teams with specialized roles, skills, and workflows**

---

## Overview

Agent Team Template is a system for:
- Creating teams with multiple specialized AI agents
- Each agent has their own skills and knowledge base
- Self-learning and improvement over time
- Quick setup for each project

## Quick Start

```bash
# Via npx (recommended)
npx @wipal/agent-team init
npx @wipal/agent-team add payment-fe dev-fe --framework react --styling tailwind

# Or use UI dashboard
npx @wipal/agent-team ui
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `init` | Initialize .claude/ structure |
| `add <name> <role>` | Add new agent |
| `list` | List all agents |
| `remove <name>` | Remove agent |
| `ui` | Start web dashboard |

> **Note:** Use Claude Code's built-in `/agents` command to switch between agents.

### Add Command Options

```bash
npx @wipal/agent-team add <name> <role> [options]

# Frontend options
--framework <name>      # react, vue, angular, svelte
--styling <name>        # tailwind, css-modules, styled-components
--state <name>          # zustand, redux, recoil

# Backend options
--database <name>       # postgresql, mysql, mongodb
--orm <name>            # prisma, typeorm, sequelize

# Common options
--testing <name>        # vitest, jest, cypress
-i, --interactive       # Interactive mode
```

### Examples

```bash
# Frontend agent with React + Tailwind
npx @wipal/agent-team add payment-fe dev-fe --framework react --styling tailwind

# Backend agent with NestJS + Prisma
npx @wipal/agent-team add auth-api dev-be --framework nestjs --orm prisma

# Designer agent
npx @wipal/agent-team add ui-designer designer

# Tech Lead (inherits dev-fe + dev-be skills)
npx @wipal/agent-team add lead tech-lead

# Interactive mode
npx @wipal/agent-team add
```

## Web Dashboard

```bash
npx @wipal/agent-team ui

# Opens at http://localhost:3456
```

Features:
- Agent management (CRUD)
- Role configuration (YAML editor)
- Skill browser
- Variant picker
- Dashboard stats

## Available Roles

| Role | Description | Tool Profile | Skills Count |
|------|-------------|--------------|--------------|
| **dev-fe** | Frontend Developer | coding | 11 |
| **dev-be** | Backend Developer | coding | 10 |
| **designer** | UI/UX Designer (web/mobile) | minimal | 10 |
| **sa** | Solution Architect | full | 13 |
| **tech-lead** | Tech Lead (inherits dev-fe + dev-be) | orchestration | 20 |
| **devops** | DevOps Engineer | coding | 10 |
| **pm** | Product Manager | research | 11 |
| **ba** | Business Analyst | research | 11 |
| **qa** | QA Engineer | coding | 9 |

## Skills Overview

### Total: 50 Skills across 9 categories

| Category | Count | Description |
|----------|-------|-------------|
| **Core** | 5 | Universal skills (code-review, git-automation, retrospect, agent-creation, sequential-thinking) |
| **Frontend** | 6 | React/Vue/UI development, ui-ux-pro-max |
| **Backend** | 5 | API/Database/Security |
| **Design** | 5 | UI design, design systems, mockups, responsive, HTML/CSS output |
| **Architecture** | 8 | System design, ADRs, C4, Mermaid diagrams |
| **DevOps** | 5 | CI/CD, Docker, Terraform |
| **Product** | 6 | Requirements, Sprints, Requirements clarity |
| **Quality** | 4 | Testing, QA |
| **Leadership** | 4 | Tech Lead skills |

### Skills Structure

```
.claude/skills/
├── SKILL-INDEX.md              # Central hub with dependency graph
│
├── core/                       # Universal skills (5)
│   ├── code-review/
│   ├── git-automation/
│   ├── retrospect-work/
│   ├── agent-creation/
│   └── sequential-thinking/
│
├── domain/                     # Domain-specific (39)
│   ├── frontend/               # 6 skills
│   ├── backend/                # 5 skills
│   ├── design/                 # 5 skills
│   ├── architecture/           # 8 skills
│   ├── devops/                 # 5 skills
│   ├── product/                # 6 skills
│   └── quality/                # 4 skills
│
├── leadership/                 # Tech Lead skills (4)
│
└── community/                  # Community contributions (1)
```

### Skill Dependency Mechanism

Each skill has a YAML frontmatter with dependencies:

```yaml
---
name: skill-name
version: 1.0.0
description: What and WHEN to use this skill
category: domain-name
tags: [tag1, tag2]

# Dependency mechanism
depends_on: []           # Hard dependencies (must load)
recommends: []           # Soft dependencies (suggest in context)
used_by: []              # Reverse reference (for discovery)
---
```

## Memory System

Each agent has a memory system for cross-session learning. This is **complementary** to Claude Code's built-in auto-memory.

### Two Memory Systems

| System | Location | Purpose |
|--------|----------|---------|
| Claude Code Auto-Memory | `~/.claude/projects/<project>/memory/` | Project-wide context (automatic) |
| Agent Memory | `.claude/agent-memory/<name>/` | Per-agent specialized context |

### Agent Memory Files

| File | Purpose | Auto-loaded |
|------|---------|-------------|
| `MEMORY.md` | Session memory (what was discussed/done) | Yes (first 200 lines) |
| `knowledge.md` | Long-term knowledge (skills, patterns, case studies) | No (manual reference) |

Update memory via:
- `/learn` skill - Capture patterns quickly
- `/retrospect-work` skill - Session retrospectives

## Documentation

| Doc | Description |
|-----|-------------|
| [TUTORIAL.md](TUTORIAL.md) | Step-by-step guide |
| [Architecture](docs/01-architecture.md) | System design and structure |
| [Setup Guide](docs/02-setup-guide.md) | How to setup agents |
| [Skills Guide](docs/03-skills-guide.md) | Managing skills |
| [Workflows](docs/04-workflows.md) | Workflow orchestration |
| [Model Strategy](docs/05-model-strategy.md) | Model selection by task |
| [Extend Guide](docs/06-extend-guide.md) | Creating new agents/skills |
| [Quick Reference](docs/07-quick-reference.md) | Cheat sheet |

## Key Features

### 1. Base + Variants Architecture
- Base role provides common skills/MCPs
- Variants add tech-specific capabilities
- Agents can combine multiple variants

### 2. Skill Dependency System
- Skills can depend on other skills
- Progressive disclosure (metadata → instructions → resources)
- Central hub for navigation

### 3. Role Inheritance (v2)
- Tech Lead inherits dev-fe + dev-be skills
- Configurable via `config/roles.yaml`
- Per-project override in `.claude/roles.yaml`

### 4. Rules System
- General rules for all agents
- Role-specific rules
- Lessons learned from corrections

### 5. Self-Improvement
- Capture lessons from corrections
- Pattern promotion (Lesson → Pattern → Skill → Rule)
- Cross-session memory

### 6. MCP Integration
- **Context7**: Documentation lookup
- **GitHub**: Repository operations
- **Sequential Thinking**: Complex problem solving
- **DrawIO**: Diagram and mockup creation

### 7. Tool Profiles (v2.1)

Predefined tool sets for different role types (inspired by OpenFang):

| Profile | Tools | Used By |
|---------|-------|---------|
| **minimal** | read, write, edit | designer |
| **coding** | read, write, edit, bash, grep, glob + filesystem, github | dev-fe, dev-be, devops, qa |
| **research** | read, web_search, web_fetch + context7, docs-seeker | pm, ba |
| **orchestration** | coding tools + task + context7 | tech-lead |
| **full** | all tools + all MCP servers | sa |

### 8. Capability-Based Security (v2.1)

Fine-grained permissions in role rules:

```markdown
## Tool Access Control

### File Operations
- READ: src/**, public/**
- WRITE: src/**
- DENY: .env*, secrets/**

### Shell Commands
- ALLOW: npm run *, git *
- DENY: rm -rf, sudo *
```

### 9. Operational Phases (v2.1)

Multi-phase methodology for consistent workflows:

1. **ANALYZE** - Read context, understand requirements
2. **PLAN** - Design approach, consider alternatives
3. **IMPLEMENT** - Write clean code, follow conventions
4. **VERIFY** - Run tests, validate output
5. **DOCUMENT** - Update docs, capture lessons

## Configuration

### Per-Project Role Override

Create `.claude/roles.yaml`:

```yaml
roles:
  tech-lead:
    skills:
      inherit: [dev-fe, dev-be, devops]  # Add devops to tech-lead

  sa:
    skills:
      inherit: [dev-fe, dev-be]  # SA also knows code
      include:
        - category: architecture
```

## Research Sources

Skills and architecture are built based on research from:

1. **Agent-Skills-for-Context-Engineering** - Context engineering patterns
2. **AI-Research-SKILLs** - 85 skills, 21 categories structure
3. **everything-claude-code** - Hooks, commands, instinct system
4. **BMAD-METHOD** - Agent YAML format, sharded workflows
5. **spec-kit** - Extension system, multi-agent support
6. **OpenFang** - Tool profiles, capability-based security, orchestrator patterns (v2.1)

## License

MIT
