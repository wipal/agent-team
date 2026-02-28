# Architecture Overview

> **Phiên bản:** 2.1
> **Cập nhật:** 2025-02-27
> **Related:** [Setup Guide](02-setup-guide.md) | [Skills Guide](03-skills-guide.md)

---

## 🆕 What's New in v2.1

Patterns từ **OpenFang** (Agent Operating System):

1. **Tool Profiles** - Predefined tool sets per role (minimal, coding, research, orchestration, full)
2. **Capability-Based Security** - Fine-grained permissions for files, shell, network
3. **Orchestrator Pattern** - Tech-lead delegation and coordination methodology
4. **Operational Phases** - Multi-phase workflow (ANALYZE → PLAN → IMPLEMENT → VERIFY → DOCUMENT)
5. **Knowledge Graph Skill** - Entity-relation storage for cross-agent knowledge

---

## 📋 Mục Lục

1. [Tổng Quan](#-tổng-quan)
2. [Base Role + Variants System](#-base-role--variants-system)
3. [Multi-Agent Setup](#-multi-agent-setup)
4. [Directory Structure](#-directory-structure)
5. [Rules System](#-rules-system)
6. [Skill Categories](#-skill-categories)
7. [Key Design Decisions](#-key-design-decisions)

---

## 🎯 Tổng Quan

**Agent Team Template** là hệ thống để:
- Tạo team với nhiều AI agents chuyên môn
- Mỗi agent có skills, knowledge base riêng
- Tự học và cải thiện qua thời gian
- Setup nhanh cho mỗi dự án

### Core Concepts

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AGENT TEAM ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │                    TEMPLATE (agent-team-template/)              │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │     │
│  │  │   Roles      │  │   Skills     │  │   Rules      │        │     │
│  │  │  (variants)  │  │  (categorized)│  │  (general +  │        │     │
│  │  │              │  │              │  │   per-role)  │        │     │
│  │  └──────────────┘  └──────────────┘  └──────────────┘        │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                              │                                           │
│                              │ Setup Script                              │
│                              ▼                                           │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │                    PROJECT INSTANCE (my-project/)               │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │     │
│  │  │  Agent 1     │  │  Agent 2     │  │  Agent N     │        │     │
│  │  │  payment-fe  │  │  auth-be     │  │  ...         │        │     │
│  │  │  (React)     │  │  (NestJS)    │  │              │        │     │
│  │  └──────────────┘  └──────────────┘  └──────────────┘        │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Base Role + Variants System

### Concept: Base Role + Variants

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ROLE STRUCTURE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    BASE ROLE (dev-fe)                         │   │
│  │  ┌─────────────────────────────────────────────────────────┐ │   │
│  │  │ Common Skills: frontend-design, web-design-guidelines   │ │   │
│  │  │ Common MCPs: Context7, GitHub                           │ │   │
│  │  │ Common Workflows: code-review, testing                  │ │   │
│  │  │ Common Knowledge: UI patterns, accessibility            │ │   │
│  │  └─────────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                    │                                                 │
│          ┌────────┼────────┬────────────┐                           │
│          ▼        ▼        ▼            ▼                           │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐          │
│  │  REACT    │ │   VUE     │ │  ANGULAR  │ │  VANILLA  │          │
│  │  VARIANT  │ │  VARIANT  │ │  VARIANT  │ │  VARIANT  │          │
│  ├───────────┤ ├───────────┤ ├───────────┤ ├───────────┤          │
│  │ react-    │ │ vue-      │ │ angular-  │ │ js-       │          │
│  │ best-     │ │ patterns  │ │ cli       │ │ native    │          │
│  │ practices │ │ vuex      │ │ ngrx      │ │ webpack   │          │
│  │ nextjs    │ │ nuxt      │ │ nx        │ │ vite      │          │
│  │ vite      │ │ vite      │ │           │ │           │          │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘          │
└─────────────────────────────────────────────────────────────────────┘
```

### Multi-Variant Composition

**Concept:** 1 Role có thể combine NHIỀU variants từ different categories.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MULTI-VARIANT COMPOSITION                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Agent: payment-fe (dev-fe base)                                            │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    COMBINED VARIANTS                                 │    │
│  │                                                                      │    │
│  │  [framework]     [styling]      [state]     [testing]    [i18n]    │    │
│  │  ┌─────────┐    ┌──────────┐   ┌────────┐   ┌────────┐   ┌──────┐  │    │
│  │  │  REACT  │ +  │ TAILWIND │ + │ ZUSTAND│ + │ VITEST │ + │ I18N │  │    │
│  │  └─────────┘    └──────────┘   └────────┘   └────────┘   └──────┘  │    │
│  │       │              │             │            │           │       │    │
│  │       ▼              ▼             ▼            ▼           ▼       │    │
│  │  react-best-    tailwind-      zustand-     vitest-      react-   │    │
│  │  practices      patterns       patterns     testing      i18next  │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Result: 1 agent với ALL skills from ALL selected variants                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Variant Categories

| Category | Description | Options |
|----------|-------------|---------|
| `framework` | UI framework (CHỌN 1) | `react`, `vue`, `angular`, `vanilla`, `svelte` |
| `meta-framework` | Meta framework | `nextjs`, `nuxt`, `remix`, `astro` |
| `styling` | CSS solution | `tailwind`, `css-modules`, `styled-components`, `scss` |
| `state` | State management | `zustand`, `redux`, `recoil`, `jotai`, `mobx` |
| `data` | Data fetching | `tanstack-query`, `swr`, `apollo`, `urql` |
| `testing` | Test framework | `vitest`, `jest`, `testing-library`, `cypress`, `playwright` |
| `i18n` | Internationalization | `react-i18next`, `formatjs`, `next-intl` |
| `form` | Form handling | `react-hook-form`, `formik`, `zod` |
| `ui-lib` | UI component library | `shadcn`, `mui`, `ant-design`, `chakra` |

---

## 👥 Multi-Agent Setup

### Multiple Agents trong 1 Project

```bash
# Ví dụ: Team với nhiều FE dev khác tech stack
./agent.sh setup payment-fe dev-fe \
  --framework react --styling tailwind --state zustand

./agent.sh setup admin-fe dev-fe \
  --framework vue --styling tailwind --state pinia

./agent.sh setup auth-be dev-be \
  --framework nestjs --database postgresql --orm prisma
```

### Project Instance Structure

```text
my-project/
├── .claude/
│   ├── CLAUDE.md                      # Project context
│   │
│   ├── agents/                        # Multiple agent instances
│   │   ├── payment-fe/                # Agent instance
│   │   │   ├── CLAUDE.md              # Agent config
│   │   │   ├── knowledge.md           # Knowledge base
│   │   │   └── skills/                # Skills (copied/symlinked)
│   │   │       ├── frontend-design/   # From base (symlink)
│   │   │       └── react-best-practices/  # From variant (copy)
│   │   │
│   │   ├── admin-fe/
│   │   │   ├── CLAUDE.md
│   │   │   ├── knowledge.md
│   │   │   └── skills/
│   │   │       ├── frontend-design/   # Shared base skill (symlink)
│   │   │       ├── vue-patterns/
│   │   │       └── testing-vue/
│   │   │
│   │   └── auth-be/
│   │       ├── CLAUDE.md
│   │       ├── knowledge.md
│   │       └── skills/
│   │           ├── api-design/
│   │           ├── nestjs-patterns/
│   │           └── security/
│   │
│   ├── shared-skills/                 # Shared skills (symlinks)
│   │   ├── frontend-design/           # → template/skills/roles/dev-fe/
│   │   └── git-automation/            # → template/skills/base/
│   │
│   ├── rules/                         # Rules (copy from template)
│   │   ├── general-rules.md
│   │   ├── dev-fe-rules.md
│   │   └── lessons.md
│   │
│   └── settings.json
│
└── docs/
    ├── architecture.md
    └── patterns.md
```

---

## 📁 Directory Structure

### Template Structure

```text
agent-team-template/
├── .claude/
│   ├── commands/                      # Slash commands
│   │   ├── roles/                     # Role switch commands
│   │   │   ├── pm.md
│   │   │   ├── dev-fe.md
│   │   │   └── dev-be.md
│   │   ├── utils/                     # Utility commands
│   │   │   ├── learn.md
│   │   │   ├── retrospect.md
│   │   │   ├── sync.md
│   │   │   └── switch.md
│   │   └── workflows/                 # Workflow commands
│   │       └── retrospective.md
│   │
│   ├── skills/                        # Skills (NEW STRUCTURE v2.0)
│   │   ├── SKILL-INDEX.md             # Central hub with dependency graph
│   │   │
│   │   ├── core/                      # Universal skills (3)
│   │   │   ├── code-review/
│   │   │   ├── git-automation/
│   │   │   └── retrospect-work/
│   │   │
│   │   ├── domain/                    # Domain-specific (31 skills)
│   │   │   ├── frontend/              # 5 skills
│   │   │   │   ├── frontend-design/
│   │   │   │   ├── accessibility/
│   │   │   │   ├── state-management/
│   │   │   │   ├── testing-fe/
│   │   │   │   └── performance-fe/
│   │   │   │
│   │   │   ├── backend/               # 5 skills
│   │   │   │   ├── api-design/
│   │   │   │   ├── database-design/
│   │   │   │   ├── security/
│   │   │   │   ├── testing-be/
│   │   │   │   └── performance-be/
│   │   │   │
│   │   │   ├── architecture/          # 6 skills
│   │   │   │   ├── system-design/
│   │   │   │   ├── architecture-patterns/
│   │   │   │   ├── adr-writing/
│   │   │   │   ├── tech-selection/
│   │   │   │   ├── performance-engineering/
│   │   │   │   └── security-architecture/
│   │   │   │
│   │   │   ├── devops/                # 5 skills (NEW)
│   │   │   │   ├── ci-cd/
│   │   │   │   ├── containerization/
│   │   │   │   ├── infrastructure-as-code/
│   │   │   │   ├── monitoring/
│   │   │   │   └── deployment/
│   │   │   │
│   │   │   ├── product/               # 5 skills (NEW)
│   │   │   │   ├── requirements-gathering/
│   │   │   │   ├── user-stories/
│   │   │   │   ├── sprint-planning/
│   │   │   │   ├── roadmap-planning/
│   │   │   │   └── stakeholder-communication/
│   │   │   │
│   │   │   └── quality/               # 4 skills (NEW)
│   │   │       ├── test-planning/
│   │   │       ├── bug-reporting/
│   │   │       ├── test-automation/
│   │   │       └── regression-testing/
│   │   │
│   │   ├── leadership/                # Tech Lead skills (4 - NEW)
│   │   │   ├── code-review-advanced/
│   │   │   ├── technical-decision/
│   │   │   ├── mentoring/
│   │   │   └── technical-debt/
│   │   │
│   │   └── community/                 # Community contributions
│   │
│   ├── rules/                         # Rules System
│   │   ├── common/                    # Universal rules
│   │   │   └── general-rules.md
│   │   ├── role-rules/                # Per-role rules
│   │   │   ├── dev-fe-rules.md
│   │   │   ├── dev-be-rules.md
│   │   │   ├── sa-rules.md
│   │   │   └── tech-lead-rules.md
│   │   └── lessons/
│   │       └── lessons.md             # Lessons learned
│   │
│   └── settings.json                  # MCP configurations
│
├── roles/                             # Role definitions
│   ├── base/                          # Base role templates
│   │   ├── dev-fe/CLAUDE.md.tmpl
│   │   ├── dev-be/CLAUDE.md.tmpl
│   │   ├── sa/CLAUDE.md.tmpl
│   │   └── tech-lead/CLAUDE.md.tmpl
│   └── variants/                      # Variant additions
│       ├── dev-fe/react/CLAUDE.md.tmpl
│       └── dev-be/nestjs/CLAUDE.md.tmpl
│
├── scripts/                           # Setup scripts
│   ├── agent.sh                       # UNIFIED script
│   ├── check-skills.sh                # Skill verification
│   └── copy-skills.sh                 # Skill copying
│
├── presets/                           # Quick setup presets
│   ├── react-full-stack.yaml
│   └── nestjs-api.yaml
│
└── docs/                              # Documentation
    └── (7 files)
```

---

## 📜 Rules System

### Nguồn tham khảo
- Boris Cherny (Anthropic engineer - người tạo Claude Code) internal workflows
- everything-claude-code research

### Cấu trúc Rules

```text
rules/
├── common/                       # Universal principles (always install)
│   ├── coding-style.md           # Coding conventions
│   ├── git-workflow.md           # Git conventions
│   ├── testing.md                # Testing standards
│   ├── performance.md            # Performance guidelines
│   ├── patterns.md               # Design patterns
│   ├── hooks.md                  # Claude Code hooks
│   ├── agents.md                 # Agent patterns
│   └── security.md               # Security guidelines
├── role-rules/                   # Role-specific rules
│   ├── dev-fe-rules.md
│   ├── dev-be-rules.md
│   ├── qa-rules.md
│   └── tech-lead-rules.md
├── language-rules/               # Language-specific (NEW)
│   ├── typescript/
│   ├── python/
│   └── golang/
├── lessons/
│   └── lessons.md                # Lessons learned
├── rules_10k.md                  # <10k chars version
└── rules_4k.md                   # <4k chars (Copilot limit)
```

### General Rules (Áp dụng cho TẤT CẢ agents)

```markdown
# General Rules - Áp dụng cho TẤT CẢ agents

## Workflow Orchestration

1. **Plan Mode Default**
   - Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
   - If something goes sideways, STOP and re-plan immediately
   - Use plan mode for verification steps, not just building
   - Write detailed specs upfront to reduce ambiguity

2. **Subagent Strategy**
   - Use subagents liberally to keep main context window clean
   - Offload research, exploration, and parallel analysis to subagents
   - For complex problems, throw more compute via subagents
   - One task per subagent for focused execution

3. **Self-Improvement Loop**
   - After ANY correction from user: update `lessons.md` with the pattern
   - Write rules for yourself that prevent the same mistake
   - Ruthlessly iterate on these lessons until mistake rate drops
   - Review lessons at session start for relevant project

4. **Verification Before Done**
   - Never mark task complete without proving it works
   - Diff behavior between main and your changes when relevant
   - Ask yourself: "Would a staff engineer approve this?"
   - Run tests, check logs, demonstrate correctness

5. **Autonomous Bug Fixing**
   - When given a bug report: just fix it. Don't ask for hand-holding
   - Point at logs, errors, failing tests – then resolve them
   - Zero context switching required from user

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible
- **No Laziness**: Find root causes. No temporary fixes. Senior standards.
- **Minimal Impact**: Changes should only touch what's necessary
```

### Per-Role Rules Example (dev-fe-rules.md)

```markdown
# dev-fe Rules - Rules riêng cho Frontend Developers

## FE-Specific Rules

1. **Context7 Mandatory**
   - ALWAYS use Context7 to lookup React/Vite docs BEFORE coding
   - Never assume API behavior without verification

2. **Component Structure**
   - Tách UI thành src/components/ và src/features/
   - Always use function components + hooks
   - Write TypeScript rõ ràng, avoid any

3. **Testing Requirements**
   - Every component must have corresponding test file
   - Use Vitest + Testing Library
   - Test user interactions, not implementation details

4. **Performance Checks**
   - Check for unnecessary re-renders
   - Use React DevTools Profiler
   - Lazy load components when appropriate

5. **Accessibility**
   - All interactive elements must be keyboard accessible
   - Use semantic HTML
   - Add ARIA labels where needed

## Anti-Patterns to Avoid

- ❌ Using useEffect for derived state
- ❌ Storing props in state
- ❌ Inline functions in render (use useCallback)
- ❌ Importing entire libraries (use tree-shaking)
```

---

## 🎯 Skill Categories

### New Categorization System (v2.0)

```
skills/
├── core/                        # Universal skills (5 skills)
│   ├── code-review/
│   ├── git-automation/
│   ├── retrospect-work/
│   ├── agent-creation/
│   └── sequential-thinking/
│
├── domain/                      # Domain-specific (39 skills)
│   ├── frontend/                # 6 skills
│   │   ├── frontend-design/
│   │   ├── accessibility/
│   │   ├── state-management/
│   │   ├── testing-fe/
│   │   ├── performance-fe/
│   │   └── ui-ux-pro-max/
│   │
│   ├── backend/                 # 5 skills
│   │   ├── api-design/
│   │   ├── database-design/
│   │   ├── security/
│   │   ├── testing-be/
│   │   └── performance-be/
│   │
│   ├── architecture/            # 8 skills
│   │   ├── system-design/
│   │   ├── architecture-patterns/
│   │   ├── adr-writing/
│   │   ├── tech-selection/
│   │   ├── performance-engineering/
│   │   ├── security-architecture/
│   │   ├── c4-architecture/
│   │   └── mermaid-diagrams/
│   │
│   ├── devops/                  # 5 skills
│   │   ├── ci-cd/
│   │   ├── containerization/
│   │   ├── infrastructure-as-code/
│   │   ├── monitoring/
│   │   └── deployment/
│   │
│   ├── product/                 # 6 skills
│   │   ├── requirements-gathering/
│   │   ├── user-stories/
│   │   ├── sprint-planning/
│   │   ├── roadmap-planning/
│   │   ├── stakeholder-communication/
│   │   └── requirements-clarity/
│   │
│   ├── quality/                 # 4 skills
│   │   ├── test-planning/
│   │   ├── bug-reporting/
│   │   ├── test-automation/
│   │   └── regression-testing/
│   │
│   └── design/                  # 5 skills (NEW)
│       ├── ui-design/
│       ├── design-system/
│       ├── responsive-design/
│       ├── html-css-output/
│       └── mockup-creation/
│
├── leadership/                  # Tech Lead skills (4 skills)
│   ├── code-review-advanced/
│   ├── technical-decision/
│   ├── mentoring/
│   └── technical-debt/
│
├── community/                   # Community contributions (1 skill)
│   └── security-validator/
│
└── SKILL-INDEX.md               # Central hub with dependency graph
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

# Dependency mechanism - "Skill dùng Skill"
depends_on: []           # Hard dependencies (must load)
recommends: []           # Soft dependencies (suggest in context)
used_by: []              # Reverse reference (for discovery)
---
```

### Total: 50 Skills

| Category | Count | Description |
|----------|-------|-------------|
| Core | 6 | Universal skills for all roles (includes knowledge-graph) |
| Frontend | 6 | React/Vue/UI development |
| Backend | 5 | API/Database/Security |
| Architecture | 8 | System design, ADRs, C4, Mermaid |
| DevOps | 5 | CI/CD, Docker, Terraform |
| Product | 6 | Requirements, Sprints, Clarity |
| Quality | 4 | Testing, QA |
| Design | 5 | UI design, Design systems, Mockups |
| Leadership | 4 | Tech Lead skills |
| **Total** | **50** | All skills complete |

### Skill Sources Policy

| Type | Source | Installation Strategy |
|------|--------|----------------------|
| **Official** | Anthropic, Vercel, Microsoft | INSTALL/REFERENCE |
| **Community** | ClaudeKit, VoltAgent | COPY to source |
| **Custom** | Project-specific | COPY to source |

**Why COPY for Community?**
1. ✅ Độc lập - Không cần internet để dùng
2. ✅ Version control - Skills được track trong git
3. ✅ Customizable - Có thể sửa theo project needs
4. ✅ Stable - Không bị break khi external repo update

---

## 🔑 Key Design Decisions

### 0. Tool Profiles & Capability Security (v2.1 - từ OpenFang)

**Decision:** Predefined tool sets with fine-grained permissions

```yaml
# config/roles.yaml
tool_profiles:
  minimal:
    tools: [read, write, edit]
    mcp_servers: []

  coding:
    tools: [read, write, edit, bash, grep, glob]
    mcp_servers: [filesystem, github]

  research:
    tools: [read, web_search, web_fetch]
    mcp_servers: [context7, docs-seeker]

  orchestration:
    tools: [read, write, edit, bash, grep, glob, task]
    mcp_servers: [filesystem, github, context7]

  full:
    tools: all
    mcp_servers: all
```

**Role Mapping:**

| Role | Tool Profile |
|------|--------------|
| dev-fe, dev-be, devops, qa | coding |
| pm, ba | research |
| tech-lead | orchestration |
| sa | full |
| designer | minimal |

**Capability-Based Security (in role rules):**

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

**Rationale:** Fine-grained control, deny-by-default security, scoped access

### 1. Base + Variants Architecture

**Decision:** Use composition over inheritance
- Base role provides common skills/MCPs
- Variants add tech-specific capabilities
- Agents can combine multiple variants

**Rationale:** Flexibility to support any tech stack combination

### 2. Skill Categorization (v2.0)

**Decision:** Four-level categorization (core/domain/leadership/community)
- `core/` - Universal skills (code-review, git-automation, retrospect-work)
- `domain/` - Domain-specific (frontend, backend, architecture, devops, product, quality)
- `leadership/` - Tech Lead skills (code-review-advanced, technical-decision, mentoring, technical-debt)
- `community/` - Community contributions

**Rationale:**

1. Clear domain boundaries
2. Skill dependency mechanism (depends_on, recommends, used_by)
3. Progressive disclosure (metadata → instructions → resources)
4. Central hub (SKILL-INDEX.md) for navigation

### 3. Rules System

**Decision:** Multi-level rules with lessons learned
- General rules for all agents
- Role-specific rules
- Lessons learned from corrections

**Rationale:** Self-improvement mechanism built into the system

### 4. Directory Independence

**Decision:** Template separate from project instances
- Template is the source of truth
- Projects copy/symlink what they need
- No dependency on external repos

**Rationale:** Reliability, offline capability, version control

---

## 📚 Related Documentation

- [Setup Guide](02-setup-guide.md) - How to setup agents
- [Skills Guide](03-skills-guide.md) - Managing skills
- [Workflows](04-workflows.md) - Workflow orchestration
- [Model Strategy](05-model-strategy.md) - Model selection by task
- [Extend Guide](06-extend-guide.md) - Creating new agents/skills
- [Quick Reference](07-quick-reference.md) - Cheat sheet
