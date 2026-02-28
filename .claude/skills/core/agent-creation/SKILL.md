---
name: agent-creation
description: |
  Guide for creating new agents with skills.sh integration.
  Use when user asks to create new agent, setup agent, or add agent to project.
  ALWAYS search skills.sh before creating new skills.
  Triggers: "tạo agent", "setup agent", "create agent", "add agent", "new agent"
version: 1.0.0
category: core
tags:
  - agent
  - setup
  - skills
  - skills.sh
depends_on: []
recommends:
  - security-validator
used_by: []
---

# Skill: Agent Creation with skills.sh Integration

## Core Principle
**Always search skills.sh first, then copy and customize.**
Never create a skill from scratch without checking if a better version exists.

## When to Use This Skill

### Trigger Conditions
- User says: "tạo agent", "setup agent", "create new agent"
- User provides role + variants: "dev-fe với React + Tailwind"
- User asks to add agent to project
- User mentions "skills.sh" or "find skills"

## Prerequisites
- Access to web search (for skills.sh)
- Project has .claude/ directory structure

## Agent Creation Workflow

### STEP 1: Parse Requirements

Extract from user request:

```
Agent Name: ____________
Base Role: ____________ (dev-fe, dev-be, sa, devops, tech-lead, pm, qa, ba)
Variants:
  - framework: ____________ (react, vue, angular, nestjs, fastapi...)
  - styling: ____________ (tailwind, css-modules, styled-components...)
  - state: ____________ (zustand, redux, pinia...)
  - database: ____________ (postgresql, mongodb, mysql...)
  - orm: ____________ (prisma, typeorm, sequelize...)
```

### STEP 2: Search skills.sh for Relevant Skills

**MANDATORY:** Before creating any skill, search skills.sh.

Use web search with these patterns:

```
site:skills.sh <keyword> <category>
site:skills.sh react frontend
site:skills.sh tailwind styling
site:skills.sh nestjs backend
site:skills.sh devops ci-cd
```

**Search Query Examples:**

| Role/Variant | Search Queries |
|--------------|----------------|
| dev-fe + react | `site:skills.sh react`, `site:skills.sh frontend react` |
| dev-fe + vue | `site:skills.sh vue`, `site:skills.sh frontend vue` |
| dev-be + nestjs | `site:skills.sh nestjs`, `site:skills.sh backend typescript` |
| dev-be + fastapi | `site:skills.sh fastapi`, `site:skills.sh python backend` |
| devops | `site:skills.sh docker`, `site:skills.sh ci-cd`, `site:skills.sh kubernetes` |

### STEP 3: Present Found Skills to User

Format the results:

```
🔍 Found skills from skills.sh:

Official Sources (✅ Auto-validated):
┌─────────────────────────────────────────────────────────────────┐
│ Skill                          │ Source           │ Installs   │
├─────────────────────────────────────────────────────────────────┤
│ react-best-practices           │ vercel-labs      │ 169K       │
│ frontend-design                │ anthropics       │ 100K       │
│ next-best-practices            │ vercel-labs      │ 21K        │
└─────────────────────────────────────────────────────────────────┘

Community Sources (⚠️ Needs Review):
┌─────────────────────────────────────────────────────────────────┐
│ Skill                          │ Source           │ Installs   │
├─────────────────────────────────────────────────────────────────┤
│ tailwind-design-system         │ wshobson         │ 11K        │
│ vue-best-practices             │ antfu            │ 7K         │
└─────────────────────────────────────────────────────────────────┘

[✅ = Official source, auto-validated | ⚠️ = Community, security review required]
```

### STEP 4: Select Skills

**Auto-suggest based on role:**

| Role | Suggested Skills from skills.sh |
|------|--------------------------------|
| dev-fe | react-best-practices, frontend-design, webapp-testing |
| dev-be | api-design-patterns, database-design, security |
| sa | architecture-patterns, adr-writing, tech-selection |
| devops | ci-cd, containerization, infrastructure-as-code |
| tech-lead | code-review-advanced, technical-decision, mentoring |
| pm | requirements-gathering, user-stories, sprint-planning |
| qa | test-planning, test-automation, bug-reporting |

Ask user to confirm or modify selection.

### STEP 5: Security Validation

For **Official Sources** (anthropics, vercel-labs, microsoft, google, expo):
- Auto-validate with logging
- Proceed to installation

For **Community Sources**:
- Run security validation (use security-validator skill)
- Check for dangerous patterns
- Generate security report
- If issues found: Present to user for decision

**Security Report Format:**

```markdown
⚠️ Security Review Required: <skill-name>

| Check | Status | Notes |
|-------|--------|-------|
| Code Review | PASS | No malicious patterns |
| Command Scan | WARN | eval() found on line 42 |
| URL Check | PASS | All URLs from safe domains |
| Dependency Audit | PASS | No known vulnerabilities |

Recommendation: REVIEW REQUIRED
User Decision: [ ] APPROVE  [ ] FIX FIRST  [ ] REJECT
```

### STEP 6: Copy & Customize

**Installation Strategy:**

| Source Type | Strategy | Reason |
|-------------|----------|--------|
| Official | COPY | Version control, offline access |
| Community | COPY | Customize for project, security |
| Base (core) | SYMLINK | Shared across agents |

**Customization Checklist:**

- [ ] Review skill content
- [ ] Adjust examples for project context
- [ ] Add project-specific rules
- [ ] Update dependencies in frontmatter
- [ ] Add to SKILL-INDEX.md if domain skill

**Copy Command:**

```bash
# Fetch from skills.sh
npx skills add <owner/repo> --dry-run

# Copy to project
cp -r ~/.skills/<skill> .claude/skills/domain/<category>/<skill>/

# Or for community
cp -r ~/.skills/<skill> .claude/skills/community/<skill>/
```

### STEP 7: Create Agent Structure

**Directory Structure:**

```
.claude/agents/<agent-name>/
├── CLAUDE.md           # Agent configuration
├── knowledge.md        # Knowledge base (empty initially)
└── skills/             # Skills (symlinks or copies)
    ├── frontend-design -> ../../skills/domain/frontend/frontend-design
    └── react-best-practices/  # Copied
```

**CLAUDE.md Template:**

```markdown
# Agent: <agent-name>

## Role
- Base Role: <role>
- Variants: <variants>

## Tech Stack
<extracted from variants>

## Skills
- <skill-1> (source: <owner/repo>)
- <skill-2> (source: local)

## MCP Integration
- Context7: REQUIRED for documentation lookup
- <other-mcp>: <purpose>

## Knowledge Base
- Read from: .claude/agents/<agent-name>/knowledge.md
- Update via: /retrospect

## How to Work
1. Always use Context7 for latest documentation
2. Follow skill guidelines
3. Run tests before completion
4. Update knowledge.md with learnings
```

### STEP 8: Verify & Report

**Verification Commands:**

```bash
# Check agent structure
ls -la .claude/agents/<agent-name>/

# Verify skills
ls -la .claude/agents/<agent-name>/skills/

# Test agent (if agent.sh exists)
./scripts/agent.sh check <agent-name>
```

**Creation Report:**

```markdown
✅ Agent Created: <agent-name>

## Summary
- Role: <role>
- Variants: <variants>
- Skills installed: <count>

## Skills
| Skill | Source | Category | Status |
|-------|--------|----------|--------|
| react-best-practices | vercel-labs | frontend | ✅ Installed |
| frontend-design | local | frontend | ✅ Linked |
| tailwind-patterns | community | styling | ⚠️ Needs review |

## Next Steps
1. Review community skills with security concerns
2. Test agent with sample task
3. Update knowledge.md after first use

## Files Created
- .claude/agents/<agent-name>/CLAUDE.md
- .claude/agents/<agent-name>/knowledge.md
- .claude/agents/<agent-name>/skills/ (directory)
```

## Rules

### MUST Do
- ✅ ALWAYS search skills.sh before creating new skill
- ✅ ALWAYS validate community skills for security
- ✅ ALWAYS present options to user before installation
- ✅ ALWAYS copy skills (not symlink) for customization
- ✅ ALWAYS register installed skills in skills-registry.yaml
- ✅ ALWAYS generate creation report

### MUST NOT Do
- ❌ NEVER skip skills.sh search
- ❌ NEVER auto-reject skills with security issues (let user decide)
- ❌ NEVER create skill from scratch without checking skills.sh first
- ❌ NEVER install skills without security validation

## Example Usage

### Example 1: Simple Agent

```
User: "Tạo agent payment-fe dev-fe với React"

Claude:
1. Parse: name=payment-fe, role=dev-fe, variant=react
2. Search skills.sh: "react frontend"
3. Found: react-best-practices, frontend-design
4. Present options to user
5. User confirms: Install both
6. Validate: Both official sources, auto-approved
7. Copy to .claude/skills/domain/frontend/
8. Create agent structure
9. Generate report

✅ Agent payment-fe created with 2 skills
```

### Example 2: Complex Agent with Community Skills

```
User: "Tạo agent admin-fe dev-fe với Vue + Tailwind + Pinia"

Claude:
1. Parse: name=admin-fe, role=dev-fe, variants=vue,tailwind,pinia
2. Search skills.sh: "vue", "tailwind styling", "pinia"
3. Found:
   - vue-best-practices (antfu - community)
   - tailwind-design-system (wshobson - community)
   - No pinia skill found
4. Present options with security warnings
5. User confirms: Install vue and tailwind, create pinia
6. Validate community skills:
   - vue-best-practices: PASS
   - tailwind-design-system: WARN (external URL)
7. Present security report for tailwind
8. User approves
9. Copy and customize
10. Create pinia skill from scratch (no existing skill)
11. Create agent structure
12. Generate report

✅ Agent admin-fe created with 3 skills (2 installed, 1 created)
```

## Integration

- **Before**: Use `/discover <keyword>` to search skills.sh
- **During**: Use `/install-skill <owner/repo>` to install
- **After**: Use `/review-skills` to audit installed skills
- **Security**: Use `/install-skill --validate` for security check
