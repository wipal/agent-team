# Skills Guide

> **Phiên bản:** 1.0
> **Cập nhật:** 2025-02-25
> **Related:** [Architecture](01-architecture.md) | [Setup Guide](02-setup-guide.md) | [Extend Guide](06-extend-guide.md)

---

## 📋 Mục Lục

1. [Skills Overview](#-skills-overview)
2. [Skill Sources Policy](#-skill-sources-policy)
3. [Official Sources](#-official-sources)
4. [Community Sources](#-community-sources)
5. [Installation Strategies](#-installation-strategies)
6. [Skill Categories](#-skill-categories)
7. [Skill Format](#-skill-format)
8. [Skill Verification](#-skill-verification)
9. [Best Practices](#-best-practices)

---

## 🎯 Skills Overview

Skills là reusable instruction templates và slash commands mà agent có thể sử dụng.

### Categorization System

```
skills/
├── base/                    # Shared across ALL roles
│   ├── code-review/
│   ├── git-automation/
│   └── retrospect-work/
│
├── roles/                   # Role-specific
│   ├── dev-fe/
│   │   ├── frontend-design/
│   │   └── accessibility/
│   ├── dev-be/
│   │   ├── api-design/
│   │   └── database-design/
│   └── qa/
│       └── test-planning/
│
└── variants/                # Tech-specific
    ├── frameworks/
    │   ├── react/
    │   └── vue/
    ├── styling/
    │   └── tailwind/
    └── testing/
        ├── vitest/
        └── playwright/
```

---

## 📜 Skill Sources Policy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SKILL SOURCES POLICY                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    OFFICIAL SOURCES (INSTALL OK)                     │    │
│  │                      Có thể install/reference                         │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  ✅ Anthropic     → github.com/anthropics/skills                     │    │
│  │  ✅ Vercel Labs   → github.com/vercel-labs/agent-skills              │    │
│  │  ✅ Microsoft     → github.com/microsoft/skills                      │    │
│  │  ✅ Google        → github.com/google/gemini-skills                  │    │
│  │  ✅ Meta/Facebook → github.com/facebook/llama-recipes                │    │
│  │  ✅ Cloudflare    → github.com/cloudflare/agents-sdk                 │    │
│  │  ✅ Stripe        → github.com/stripe/agent-skills                   │    │
│  │  ✅ Expo          → github.com/expo/expo-skills                      │    │
│  │  ✅ Sentry        → github.com/getsentry/agent-skills                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    COMMUNITY SOURCES (MUST COPY)                      │    │
│  │                  PHẢI COPY vào source code                            │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  ⚠️ ClaudeKit       → github.com/mrgoonie/claudekit-skills          │    │
│  │  ⚠️ VoltAgent       → github.com/VoltAgent/awesome-agent-skills     │    │
│  │  ⚠️ Individual devs → muratcankoylan, obra, ibelick, etc.           │    │
│  │  ⚠️ Any other repo  → NOT from official tech companies              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Why COPY for Community?

| Reason | Description |
|--------|-------------|
| ✅ **Độc lập** | Không cần internet để dùng |
| ✅ **Version control** | Skills được track trong git |
| ✅ **Customizable** | Có thể sửa theo project needs |
| ✅ **Stable** | Không bị break khi external repo update |
| ✅ **Reviewable** | PR review cho skill changes |
| ✅ **Offline** | Hoạt động khi không có mạng |

---

## ✅ Official Sources

### Anthropic Skills

**Source:** https://github.com/anthropics/skills

| Skill | Description | Roles |
|-------|-------------|-------|
| `docx` | Word docs với formatting, comments | BA, PM, All |
| `pdf` | Extract text/tables, merge, split PDFs | BA, PM, QA |
| `pptx` | PowerPoint presentations | PM, Designer |
| `xlsx` | Excel với formulas, charts, data | BA, PM, QA |
| `frontend-design` | Production-grade UI components | Dev FE, Designer |
| `web-artifacts-builder` | React/Tailwind multi-component | Dev FE |
| `canvas-design` | Visual art, posters (PNG/PDF) | Designer |
| `brand-guidelines` | Apply brand colors & typography | Designer |
| `internal-comms` | Status updates, team communication | PM, All |
| `skill-creator` | Guide to create new skills | All |
| `git-automation` | Commit, PR, merge automation | All Devs |
| `webapp-testing` | Playwright browser automation | QA, QA Automation |

### Vercel Labs Skills

**Source:** https://github.com/vercel-labs/agent-skills

| Skill | Description | Roles |
|-------|-------------|-------|
| `react-best-practices` | 40+ rules, 8 categories - performance | Dev FE |
| `web-design-guidelines` | 100+ rules - accessibility, UX audit | Dev FE, QA |
| `react-native-guidelines` | 16 rules - mobile performance | Dev Mobile |
| `composition-patterns` | Compound components, state lifting | Dev FE |
| `vercel-deploy-claimable` | Deploy to Vercel instantly | DevOps |

### Microsoft Skills

**Source:** https://github.com/microsoft/skills

| Skill | Description | Roles |
|-------|-------------|-------|
| `azure-ai-agents` | Azure cloud integration | Dev BE, DevOps |
| `azure-identity` | Azure authentication | Dev BE |
| `fastapi-router` | FastAPI routing patterns | Dev BE |
| `pydantic-models` | Pydantic model patterns | Dev BE |
| `typescript-patterns` | TypeScript best practices | Dev FE/BE |

### Other Official Sources

| Source | URL | Notable Skills |
|--------|-----|----------------|
| **Google** | github.com/google/gemini-skills | gemini-skills, ai-multimodal |
| **Meta/Facebook** | github.com/facebookresearch/llama-recipes | llama-recipes |
| **Cloudflare** | github.com/cloudflare/agents-sdk | agents-sdk, building-mcp-server |
| **Stripe** | github.com/stripe/agent-skills | stripe-best-practices |
| **Expo** | github.com/expo/expo-skills | expo-app-design |
| **Sentry** | github.com/getsentry/agent-skills | code-review, find-bugs |

---

## 👥 Community Sources

### ClaudeKit Skills

**Source:** https://github.com/mrgoonie/claudekit-skills

**Key Patterns Learned:**
- Plugin Marketplace System
- Reference Files for detailed content
- Subagent Pattern for complex tasks
- Verification Gates before completion

| Category | Skills |
|----------|--------|
| **Debugging** | `defense-in-depth`, `root-cause-tracing`, `systematic-debugging`, `verification-before-completion` |
| **Problem Solving** | `collision-zone-thinking`, `inversion-exercise`, `meta-pattern-recognition`, `scale-game`, `simplification-cascades`, `when-stuck` |
| **AI/ML** | `ai-multimodal`, `context-engineering` |
| **MCP** | `mcp-management`, `mcp-builder` |
| **Code Review** | `code-review` |

### VoltAgent Skills (380+ Curated)

**Source:** https://github.com/VoltAgent/awesome-agent-skills

Curated list of 380+ skills from 25+ official teams.

**Notable Categories:**

| Category | Skills | Source |
|----------|--------|--------|
| **Context Engineering** | context-fundamentals, context-optimization | muratcankoylan |
| **Development** | test-driven-development, subagent-driven-development | obra |
| **UI/UX** | ui-skills, apple-hig-skills, taste-skill | ibelick |
| **Marketing** | marketingskills (23+ skills) | coreyhaines31 |
| **Specialized** | swiftui-expert-skill, threejs-skills | AvdLee, CloudAI-X |

### Other Community Sources

| Source | URL | Skills to Copy |
|--------|-----|----------------|
| **frontend-slides** | github.com/zarazhangrui/frontend-slides | Presentation generation |
| **Trail of Bits** | github.com/trailofbits | Security skills, static-analysis |
| **Individual Devs** | Various | context-engineering, ui-skills |

---

## 🔧 Installation Strategies

### Strategy Overview

| Strategy | Use For | Pros | Cons |
|----------|---------|------|------|
| **COPY** | Community, Custom | Independent, customizable | No auto-updates |
| **SYMLINK** | Shared base skills | Consistent, auto-update | Can't customize per-agent |
| **REFERENCE** | Official sources | Always latest | Requires internet |

### COPY Strategy (Recommended for Community)

```bash
# Copy skill to agent
cp -r .claude/skills/community/debugging .claude/agents/payment-fe/skills/

# Or use script
./agent.sh copy-skill payment-fe debugging --source community
```

**When to use:**
- Community skills (ClaudeKit, VoltAgent)
- Custom skills for specific project
- Skills that need modification

### SYMLINK Strategy (Recommended for Shared)

```bash
# Create symlink to shared skill
ln -s ../../shared-skills/frontend-design .claude/agents/payment-fe/skills/

# Or use script
./agent.sh link-skill payment-fe frontend-design
```

**When to use:**
- Base skills shared by all agents
- Skills that should be consistent across agents
- Want updates to propagate automatically

### REFERENCE Strategy (For Official)

```bash
# Install from official source
npx ai-agent-skills install anthropics/skills \
  --target .claude/skills/official/anthropic

# Reference in agent config
# CLAUDE.md:
# skills:
#   external:
#     - anthropics/skills/docx
#     - anthropics/skills/pdf
```

**When to use:**
- Official skills from trusted sources
- Want always latest version
- Accept internet dependency

### Auto Strategy Selection

Setup script tự động chọn strategy:

```bash
# Script logic:
if skill in official_sources:
    strategy = "REFERENCE"  # or INSTALL
elif skill in base_skills:
    strategy = "SYMLINK"
else:  # community or variant
    strategy = "COPY"
```

---

## 📁 Skill Categories

### Base Skills (Shared)

```text
.claude/skills/base/
├── code-review/           # Code review checklist
├── git-automation/        # Git workflow automation
└── retrospect-work/       # Self-learning mechanism
```

### Role-Specific Skills

```text
.claude/skills/roles/
├── dev-fe/
│   ├── frontend-design/   # UI component design
│   └── accessibility/     # A11y guidelines
├── dev-be/
│   ├── api-design/        # RESTful API patterns
│   ├── database-design/   # Schema design
│   └── security/          # Security best practices
├── qa/
│   ├── test-planning/     # Test case creation
│   └── bug-reporting/     # Bug report template
└── pm/
    └── sprint-planning/   # Sprint planning workflow
```

### Variant Skills

```text
.claude/skills/variants/
├── frameworks/
│   ├── react/
│   │   ├── react-best-practices/
│   │   └── scaffold-react-page/
│   └── vue/
│       └── vue-patterns/
├── styling/
│   └── tailwind/
│       └── tailwind-patterns/
└── testing/
    ├── vitest/
    └── playwright/
```

---

## 📝 Skill Format

### Standard Skill Structure

```markdown
---
name: skill-name
description: |
  Detailed description of when to use this skill.
  Multiple lines for clarity.
dependencies:
  - required-skill-1
references:
  - references/detailed-guide.md
---

# Skill Title

Brief overview of the skill's purpose.

## Core Principle
**One sentence that captures the essence.**

## When to Use This Skill
### Trigger Condition 1
- Situation A
- Situation B

## Steps
### Step 1: Identify
Description of identification step.

### Step 2: Validate
Description of validation step.

### Step 3: Execute
Description of execution step.

## Rules
- ❌ What NOT to do
- ✅ What TO do

## Output
- Output 1
- Output 2
```

### Skill with Reference Files

```
.claude/skills/debugging/
├── SKILL.md                      # Main skill (short)
└── references/
    ├── defense-in-depth.md       # Detailed guide
    ├── systematic-debugging.md   # Detailed guide
    └── verification-protocol.md  # Detailed guide
```

### Complete Skill Example

```markdown
---
name: scaffold-react-page
description: |
  Tạo React page với routing, state management, và API integration.
  Tự động scaffold file structure theo conventions.
version: 1.0.0
category: development
tags:
  - react
  - scaffolding
  - frontend
variant: react
strategy: copy
depends_on:
  - frontend-design
  - react-best-practices
---

# Skill: Scaffold React Page

## Trigger
- Slash command: `/scaffold-react-page <page-name>`
- Hoặc: `/scaffold page <page-name> --variant react`

## Prerequisites
- Context7 MCP connected
- Project has React setup

## Inputs
- `page-name`: Tên page (e.g., "UserProfile")
- `--with-api`: Include API integration (default: true)
- `--with-state`: Include state management (default: zustand)
- `--with-test`: Include test file (default: true)

## Steps

### 1. Validate Context
Check if React is set up.

### 2. Lookup Best Practices (via Context7)
Fetch React Router, TanStack Query, Zustand patterns.

### 3. Create File Structure
```
src/pages/{PageName}/
├── index.tsx
├── {PageName}.tsx
├── {PageName}.module.css
├── hooks/
│   └── use{PageName}.ts
├── components/
└── types.ts
```

### 4. Generate Code
- Generate page component with routing
- Add state management
- Create API hooks
- Generate test file

## Output
```
✅ Created page: {PageName}
   📄 src/pages/{PageName}/index.tsx
   📄 src/pages/{PageName}/{PageName}.tsx
   ✏️  Updated: src/router/index.tsx
```
```

---

## ✅ Skill Verification

### Check Script

```bash
#!/bin/bash
# scripts/check-skills.sh

# Check all agents
./agent.sh check --all

# Check specific agent
./agent.sh check payment-fe

# Check and auto-fix
./agent.sh check payment-fe --fix
```

### Verification Output

```
═══════════════════════════════════════════════════════════════
🔍 SKILL CHECK - payment-fe
═══════════════════════════════════════════════════════════════

📁 Agent: payment-fe (dev-fe + react + tailwind + zustand)
├── ✅ frontend-design (shared-skill, symlinked)
├── ✅ react-best-practices (copied)
├── ✅ tailwind-patterns (copied)
├── ❌ zustand-patterns (MISSING)
├── ✅ vitest-testing (copied)
└── ✅ git-automation (shared-skill, symlinked)

═══════════════════════════════════════════════════════════════
📊 SUMMARY
═══════════════════════════════════════════════════════════════
Total skills required: 6
✅ Available: 5
❌ Missing: 1

═══════════════════════════════════════════════════════════════
🔧 AUTO-INSTALL (--fix mode)
═══════════════════════════════════════════════════════════════

Installing missing skills...

[1/1] zustand-patterns
  ├── Source: skills/variants/state/zustand/
  ├── Type: COPY (variant-specific)
  └── ✅ Copied to: .claude/agents/payment-fe/skills/

═══════════════════════════════════════════════════════════════
✅ ALL SKILLS INSTALLED SUCCESSFULLY
═══════════════════════════════════════════════════════════════
```

### variants.json Tracking

```json
{
  "agent_name": "payment-fe",
  "base_role": "dev-fe",

  "installed_variants": {
    "framework": {
      "name": "react",
      "skills": ["react-best-practices", "react-patterns"],
      "strategy": "copy"
    },
    "styling": {
      "name": "tailwind",
      "skills": ["tailwind-patterns"],
      "strategy": "copy"
    },
    "state": {
      "name": "zustand",
      "skills": ["zustand-patterns"],
      "strategy": "copy"
    }
  },

  "shared_skills": [
    {
      "name": "frontend-design",
      "strategy": "symlink"
    }
  ]
}
```

---

## 💡 Best Practices

### 1. Skill Organization

```text
✅ DO:
- Keep skills focused on single responsibility
- Use reference files for detailed content
- Document dependencies clearly
- Version skills when making changes

❌ DON'T:
- Create monolithic skills
- Duplicate content across skills
- Skip documentation
- Mix concerns in one skill
```

### 2. Installation Choices

```text
✅ DO:
- COPY community skills for independence
- SYMLINK shared base skills
- REFERENCE official skills when internet is OK

❌ DON'T:
- SYMLINK variant-specific skills
- COPY official skills (wastes space)
- REFERENCE community skills (unreliable)
```

### 3. Skill Verification

```text
✅ DO:
- Run check after setup
- Use --fix to auto-install missing
- Review variants.json regularly

❌ DON'T:
- Assume skills are installed
- Skip verification step
- Ignore missing skill warnings
```

### 4. Skill Updates

```text
✅ DO:
- Track skill versions
- Test after updates
- Document changes in changelog

❌ DON'T:
- Update skills mid-sprint
- Update without testing
- Mix skill versions
```

---

## 📚 Related Documentation

- [Architecture](01-architecture.md) - System architecture
- [Setup Guide](02-setup-guide.md) - Setup instructions
- [Workflows](04-workflows.md) - Using skills in workflows
- [Extend Guide](06-extend-guide.md) - Creating new skills
- [Quick Reference](07-quick-reference.md) - Cheat sheet
