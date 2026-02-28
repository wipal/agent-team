# Agent Team Tutorial

## What's New in v2.1

Features from **OpenFang** patterns:

- **Tool Profiles**: Each role has predefined tool access (coding, research, orchestration, full)
- **Capability Security**: Fine-grained permissions for files, shell commands, network
- **Operational Phases**: Consistent workflow (ANALYZE → PLAN → IMPLEMENT → VERIFY → DOCUMENT)
- **Orchestrator Pattern**: Tech-lead can delegate to specialist agents
- **Knowledge Graph**: Track component relationships across agents

## Step-by-Step Guide

### Step 1: Install

```bash
# Via npx (no installation needed)
npx @wipal/agent-team init

# Or install globally
npm install -g @wipal/agent-team
agent-team init
```

### Step 2: Initialize Project

```bash
cd your-existing-project

# Initialize .claude/ structure
npx @wipal/agent-team init
```

This creates:
```
.claude/
├── CLAUDE.md              # Project context
├── agents/                # Agent instances
├── rules/                 # Rules & lessons
└── settings.json          # MCP configs
```

### Step 3: Add Your First Agent

#### Option A: CLI

```bash
# Frontend agent
npx @wipal/agent-team add my-fe dev-fe --framework react --styling tailwind

# Backend agent
npx @wipal/agent-team add my-api dev-be --framework nestjs --orm prisma

# Tech Lead (inherits FE + BE skills)
npx @wipal/agent-team add lead tech-lead
```

#### Option B: Interactive Mode

```bash
npx @wipal/agent-team add
```

Then follow the prompts:
1. Enter agent name
2. Select role
3. Choose variants
4. Confirm creation

#### Option C: Web UI

```bash
npx @wipal/agent-team ui
# Opens http://localhost:3456
```

### Step 4: Use Agent in Claude Code

After adding an agent:

```bash
# See switch instructions
npx @wipal/agent-team switch my-fe
```

The agent's `CLAUDE.md` is at:
```
.claude/agents/my-fe/CLAUDE.md
```

Claude Code will automatically read this when you work in the project.

### Step 5: Manage Agents

```bash
# List all agents
npx @wipal/agent-team list

# Remove an agent
npx @wipal/agent-team remove my-fe
```

## Common Scenarios

### Scenario 1: React + Tailwind Project

```bash
npx @wipal/agent-team init
npx @wipal/agent-team add fe dev-fe --framework react --styling tailwind --testing vitest
```

Agent gets:
- Core skills: code-review, git-automation, retrospect-work
- Frontend skills: frontend-design, accessibility, state-management, testing-fe, performance-fe
- Total: 8 skills

### Scenario 2: Full-Stack Team

```bash
# Frontend
npx @wipal/agent-team add fe dev-fe --framework react --styling tailwind

# Backend
npx @wipal/agent-team add api dev-be --framework nestjs --orm prisma

# Tech Lead (can review both)
npx @wipal/agent-team add lead tech-lead
```

Tech Lead gets:
- Leadership skills: code-review-advanced, technical-decision, mentoring, technical-debt
- Frontend skills (inherited): frontend-design, accessibility, etc.
- Backend skills (inherited): api-design, database-design, etc.
- Total: 17 skills

### Scenario 3: DevOps Team

```bash
npx @wipal/agent-team add infra devops
npx @wipal/agent-team add ci devops --cicd github-actions --infra docker
```

## Customizing Roles

### Per-Project Override

Create `.claude/roles.yaml`:

```yaml
roles:
  tech-lead:
    skills:
      inherit: [dev-fe, dev-be, devops]  # Add devops skills
```

### Adding Custom Skills

1. Create skill folder:
```bash
mkdir -p .claude/skills/custom/my-skill
```

2. Create `SKILL.md`:
```markdown
---
name: my-skill
version: 1.0.0
description: My custom skill
category: custom
tags: [custom]
depends_on: []
---

# My Skill

## When to use
...

## Instructions
...
```

3. Reference in agent or role config

## Tips

### 1. Naming Convention

Use descriptive names:
- `payment-fe` for payment frontend
- `auth-api` for auth backend
- `lead` for tech lead

### 2. Knowledge Base

Each agent has `knowledge.md` - use it to:
- Store project-specific patterns
- Learn from corrections
- Share knowledge across sessions

### 3. Retrospect

Run `/retrospect-work` at end of sessions to:
- Capture lessons learned
- Update knowledge base
- Improve over time

### 4. Skills are Minimal

Only skills you need are copied, not all 50. This keeps agents lightweight.

### 5. Tool Profiles (v2.1)

Each role has a predefined tool profile:

| Role | Profile | Tools |
|------|---------|-------|
| dev-fe, dev-be, devops, qa | coding | read, write, edit, bash, grep, glob + filesystem, github |
| pm, ba | research | read, web_search, web_fetch + context7, docs-seeker |
| tech-lead | orchestration | coding tools + task + context7 |
| sa | full | all tools + all MCP servers |
| designer | minimal | read, write, edit |

### 6. Operational Phases (v2.1)

All agents follow consistent workflow:

1. **ANALYZE** - Read context, understand requirements
2. **PLAN** - Design approach, consider alternatives
3. **IMPLEMENT** - Write clean code, follow conventions
4. **VERIFY** - Run tests, validate output
5. **DOCUMENT** - Update docs, capture lessons

## Troubleshooting

### "Project not initialized"

Run `npx @wipal/agent-team init` first.

### "Agent already exists"

Use a different name or remove existing:
```bash
npx @wipal/agent-team remove <name>
```

### Skills not found

Check if `.claude/skills/` exists. Run `init` if missing.

## Next Steps

- Read [docs/01-architecture.md](docs/01-architecture.md) for architecture details
- See [docs/03-skills-guide.md](docs/03-skills-guide.md) for skills management
- Check [docs/07-quick-reference.md](docs/07-quick-reference.md) for cheat sheet
