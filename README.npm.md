# @wipal/agent-team

> **Template for creating AI agent teams with specialized roles, skills, and workflows**

---

## Overview

Agent Team Template is a system for:
- Creating teams with multiple specialized AI agents
- Each agent has its own skills and knowledge base
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
| `switch <name>` | Show switch instructions |
| `remove <name>` | Remove agent |
| `projects` | Manage registered projects |
| `setup-hooks` | Configure Claude Code hooks |
| `ui` | Start web dashboard |

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

| Role | Description | Skills Count |
|------|-------------|--------------|
| **dev-fe** | Frontend Developer | 8 |
| **dev-be** | Backend Developer | 8 |
| **sa** | Solution Architect | 9 |
| **tech-lead** | Tech Lead (inherits dev-fe + dev-be) | 17 |
| **devops** | DevOps Engineer | 8 |
| **pm** | Product Manager | 8 |
| **qa** | QA Engineer | 7 |

## Skills Overview

### Total: 37 Skills across 8 categories

| Category | Count | Description |
|----------|-------|-------------|
| **Core** | 3 | Universal skills (code-review, git-automation, retrospect) |
| **Frontend** | 5 | React/Vue/UI development |
| **Backend** | 5 | API/Database/Security |
| **Architecture** | 6 | System design, ADRs |
| **DevOps** | 5 | CI/CD, Docker, Terraform |
| **Product** | 5 | Requirements, Sprints |
| **Quality** | 4 | Testing, QA |
| **Leadership** | 4 | Tech Lead skills |

### Skills Structure

```
.claude/skills/
├── SKILL-INDEX.md              # Central hub with dependency graph
│
├── core/                       # Universal skills (3)
│   ├── code-review/
│   ├── git-automation/
│   └── retrospect-work/
│
├── domain/                     # Domain-specific (31)
│   ├── frontend/               # 5 skills
│   ├── backend/                # 5 skills
│   ├── architecture/           # 6 skills
│   ├── devops/                 # 5 skills
│   ├── product/                # 5 skills
│   └── quality/                # 4 skills
│
├── leadership/                 # Tech Lead skills (4)
│   ├── code-review-advanced/
│   ├── technical-decision/
│   ├── mentoring/
│   └── technical-debt/
│
└── community/                  # Community contributions
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

# Dependency mechanism - "Skill using Skill"
depends_on: []           # Hard dependencies (must load)
recommends: []           # Soft dependencies (suggest in context)
used_by: []              # Reverse reference (for discovery)
---
```

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

### 6. Project Management

- Global registry tracks all initialized projects
- `projects --list` to see all projects
- `projects --prune` to clean up invalid entries

### 7. Hooks Integration

- Interactive setup for Claude Code hooks
- pre_tool_use, post_tool_use, notification, stop hooks
- Configurable via `setup-hooks` command

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

## License

MIT
