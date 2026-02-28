# Setup Guide

> **Phiên bản:** 1.0
> **Cập nhật:** 2025-02-25
> **Related:** [Architecture](01-architecture.md) | [Skills Guide](03-skills-guide.md)

---

## 📋 Mục Lục

1. [Quick Start](#-quick-start)
2. [Unified Script](#-unified-script-agentsh)
3. [Setup Examples](#-setup-examples)
4. [Config File Format](#-config-file-format-yaml)
5. [Presets](#-presets)
6. [Agent Management](#-agent-management)
7. [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### 3 Steps to Get Started

```bash
# ============================================
# BƯỚC 1: CLONE TEMPLATE
# ============================================
git clone [agent-team-template] my-project/.agent-team
cd my-project

# ============================================
# BƯỚC 2: CHẠY SETUP SCRIPT
# ============================================
./.agent-team/scripts/agent.sh setup payment-fe dev-fe \
  --framework react \
  --styling tailwind \
  --state zustand

# ============================================
# BƯỚC 3: SWITCH AGENT VÀ BẮT ĐẦU LÀM VIỆC
# ============================================
./agent.sh switch payment-fe
# Hoặc dùng slash command: /switch payment-fe
```

### Setup Output Example

```
═══════════════════════════════════════════════════════════════
🚀 SETTING UP AGENT: payment-fe
═══════════════════════════════════════════════════════════════

✅ Base Role: dev-fe
   → Common skills: frontend-design, web-design-guidelines

📦 Installing variants...
✅ framework=react
   → Skills: react-best-practices, react-patterns, react-hooks
✅ styling=tailwind
   → Skills: tailwind-patterns, tailwind-components
✅ state=zustand
   → Skills: zustand-patterns, zustand-persist

📁 Created: .claude/agents/payment-fe/
   ├── CLAUDE.md          (merged config)
   ├── variants.json      (track installed variants)
   ├── knowledge.md       (empty, for self-learning)
   └── skills/            (all skills from all variants)

═══════════════════════════════════════════════════════════════
✅ AGENT READY: payment-fe
═══════════════════════════════════════════════════════════════
```

---

## 🛠️ Unified Script: `./agent.sh`

ONE script để làm tất cả - không cần nhiều files phức tạp.

### Commands Overview

```bash
./agent.sh <command> [options]

Commands:
  setup     Create new agent with variants
  update    Update existing agent (add/remove variants)
  review    Review project & detect tech stack
  learn     Analyze project & update knowledge
  check     Verify all skills installed
  list      List all agents
  switch    Switch to agent
  sync      Share knowledge between agents
```

### Command Details

#### `setup` - Tạo Agent Mới

```bash
# Basic syntax
./agent.sh setup <agent-name> <base-role> [options]

# Options:
--framework <name>      UI framework (react, vue, angular, svelte)
--styling <name>        CSS solution (tailwind, css-modules, styled-components)
--state <name>          State management (zustand, redux, recoil, jotai)
--data <name>           Data fetching (tanstack-query, swr, apollo)
--testing <name>        Test framework (vitest, jest, playwright)
--form <name>           Form handling (react-hook-form, formik)
--ui-lib <name>         UI library (shadcn, mui, ant-design)
--i18n <name>           Internationalization (react-i18next, next-intl)
--preset <name>         Use preset configuration
--config <file.yaml>    Load from config file
```

#### `update` - Cập Nhật Agent

```bash
# Add variant
./agent.sh update payment-fe --add graphql

# Remove variant
./agent.sh update payment-fe --remove i18n

# Replace variant
./agent.sh update payment-fe --replace zustand=jotai

# Sync with config file
./agent.sh update payment-fe --sync ./configs/payment.yaml
```

#### `review` - Review Project

```bash
# Review toàn bộ project
./agent.sh review

# Output:
# 🔍 PROJECT REVIEW - ecommerce-api
# 🛠️ Detected Tech Stack:
# ├── Framework:    NestJS
# ├── Database:     PostgreSQL
# ├── ORM:          Prisma
# ├── Testing:      Jest
# └── Validation:   Zod
#
# 💡 Recommended Agent Config:
# ./agent.sh setup main-api dev-be --framework nestjs ...
```

#### `learn` - Tự Học

```bash
# Phân tích project và update knowledge
./agent.sh learn

# Output:
# 🧠 LEARNING FROM PROJECT
# ✅ Found Patterns:
# ├── Repository Pattern (used in 5 modules)
# ├── DTO Validation (using class-validator + zod)
# └── Error Handling (custom exception filters)
```

#### `check` - Verify Skills

```bash
# Check all agents
./agent.sh check --fix

# Check specific agent
./agent.sh check payment-fe --fix
```

#### `list` - Liệt Kê Agents

```bash
./agent.sh list

# Output:
# 📋 AGENTS IN PROJECT: ecommerce
# ┌─────────────────┬─────────┬──────────────────────────────┬───────┐
# │ Agent           │ Role    │ Variants                     │ Model │
# ├─────────────────┼─────────┼──────────────────────────────┼───────┤
# │ payment-fe      │ dev-fe  │ react, tailwind, zustand     │ sonnet│
# │ admin-fe        │ dev-fe  │ vue, tailwind, pinia         │ sonnet│
# │ main-api        │ dev-be  │ nestjs, prisma, jest         │ sonnet│
# │ lead            │ tech-lead│ -                           │ opus  │
# └─────────────────┴─────────┴──────────────────────────────┴───────┘
```

#### `switch` - Đổi Agent

```bash
./agent.sh switch payment-fe
# ✅ Switched to agent 'payment-fe' (dev-fe + react)
```

#### `sync` - Share Knowledge

```bash
# Sync between two agents
./agent.sh sync payment-fe admin-fe

# Sync to all agents of same role
./agent.sh sync payment-fe --to-role dev-fe
```

---

## 📝 Setup Examples

### Example 1: Simple Setup (2 variants)

```bash
./agent.sh setup simple-fe dev-fe \
  --framework react \
  --styling tailwind
```

### Example 2: Full Stack FE (8 variants)

```bash
./agent.sh setup payment-fe dev-fe \
  --framework react \
  --styling tailwind \
  --state zustand \
  --data tanstack-query \
  --testing vitest \
  --form react-hook-form \
  --ui-lib shadcn \
  --i18n react-i18next
```

### Example 3: Backend NestJS

```bash
./agent.sh setup auth-api dev-be \
  --framework nestjs \
  --database postgresql \
  --orm prisma \
  --testing jest \
  --validation zod \
  --auth passport-jwt
```

### Example 4: Using Preset

```bash
./agent.sh setup admin-fe dev-fe --preset react-full-stack
./agent.sh setup api-v2 dev-be --preset nestjs-api
```

### Example 5: From Config File

```bash
./agent.sh setup payment-fe dev-fe --config ./configs/payment.yaml
```

### Example 6: Multiple Agents

```bash
# Team với nhiều agents khác nhau
./agent.sh setup payment-fe dev-fe \
  --framework react --styling tailwind --state zustand

./agent.sh setup admin-fe dev-fe \
  --framework vue --styling tailwind --state pinia

./agent.sh setup auth-be dev-be \
  --framework nestjs --database postgresql --orm prisma
```

---

## 📄 Config File Format (YAML)

### Full Config Example

```yaml
# configs/payment-fe.yaml
agent:
  name: payment-fe
  role: dev-fe
  description: "Payment frontend developer agent"

# ============================================
# MULTI-VARIANT CONFIGURATION
# ============================================
variants:
  # FRAMEWORK (required for dev-fe/dev-be)
  framework: react

  # STYLING (optional)
  styling: tailwind

  # STATE MANAGEMENT (optional)
  state: zustand

  # DATA FETCHING (optional)
  data: tanstack-query

  # TESTING (optional)
  testing: vitest

  # FORM HANDLING (optional)
  form: react-hook-form

  # UI LIBRARY (optional)
  ui-lib: shadcn

  # I18N (optional)
  i18n: react-i18next

  # META-FRAMEWORK (optional - for SSR/SSG)
  # meta-framework: nextjs

# ============================================
# MODEL CONFIGURATION (per agent)
# ============================================
model:
  default: claude-sonnet-4
  thinking_tasks:
    - "architecture-design"
    - "code-review"
  thinking_model: claude-opus-4

# ============================================
# OPTIONAL OVERRIDES
# ============================================
overrides:
  # Custom skills for this specific agent
  skills:
    - name: custom-payment-component
      path: ./custom-skills/payment-component/

  # Extra MCPs for this agent
  mcp:
    - context7
    - github
    - figma  # extra MCP for UI work

# ============================================
# KNOWLEDGE SEEDING
# ============================================
knowledge:
  import_from: ./knowledge-base/payment-module.md
```

### Minimal Config Example

```yaml
# configs/simple-fe.yaml
agent:
  name: simple-fe
  role: dev-fe

variants:
  framework: react
  styling: tailwind
```

### Backend Config Example

```yaml
# configs/auth-api.yaml
agent:
  name: auth-api
  role: dev-be

variants:
  framework: nestjs
  database: postgresql
  orm: prisma
  testing: jest
  validation: zod
  auth: passport-jwt

model:
  default: claude-sonnet-4
```

---

## 🎯 Presets

Presets là pre-configured combinations để setup nhanh.

### Available Presets

| Preset | Description | Variants Included |
|--------|-------------|-------------------|
| `react-full-stack` | Full React stack | react, tailwind, zustand, tanstack-query, vitest, react-hook-form, shadcn |
| `vue-minimal` | Minimal Vue setup | vue, tailwind, vitest |
| `nestjs-api` | NestJS API backend | nestjs, postgresql, prisma, jest, zod, passport-jwt |
| `nextjs-full` | Full Next.js | react, nextjs, tailwind, zustand, tanstack-query, vitest, shadcn, next-intl |
| `express-api` | Express.js API | express, mongodb, mongoose, jest |
| `fastapi-service` | FastAPI Python | fastapi, postgresql, sqlalchemy, pytest |

### Preset Files

#### `react-full-stack.yaml`

```yaml
name: react-full-stack
description: "Full React stack with everything"
variants:
  framework: react
  styling: tailwind
  state: zustand
  data: tanstack-query
  testing: vitest
  form: react-hook-form
  ui-lib: shadcn
```

#### `vue-minimal.yaml`

```yaml
name: vue-minimal
description: "Minimal Vue setup"
variants:
  framework: vue
  styling: tailwind
  testing: vitest
```

#### `nestjs-api.yaml`

```yaml
name: nestjs-api
description: "NestJS API backend"
variants:
  framework: nestjs
  database: postgresql
  orm: prisma
  testing: jest
  validation: zod
  auth: passport-jwt
```

#### `nextjs-full.yaml`

```yaml
name: nextjs-full
description: "Full Next.js with everything"
variants:
  framework: react
  meta-framework: nextjs
  styling: tailwind
  state: zustand
  data: tanstack-query
  testing: vitest
  form: react-hook-form
  ui-lib: shadcn
  i18n: next-intl
```

### Using Presets

```bash
# List available presets
./agent.sh setup --list-presets

# Use preset
./agent.sh setup admin-fe dev-fe --preset react-full-stack
./agent.sh setup api auth-api dev-be --preset nestjs-api
```

---

## 👥 Agent Management

### Adding Agents

```bash
# Add new agent to existing project
./agent.sh setup mobile-fe dev-fe \
  --framework react-native \
  --state zustand \
  --testing vitest

# Clone from existing agent
./agent.sh setup new-payment-fe dev-fe --clone-from payment-fe
```

### Updating Agents

```bash
# Add variant to existing agent
./agent.sh update payment-fe --add graphql

# Remove variant
./agent.sh update payment-fe --remove i18n

# Replace variant
./agent.sh update payment-fe --replace zustand=jotai
```

### Removing Agents

```bash
# Remove agent
./agent.sh remove payment-fe

# Output:
# ⚠️ This will remove agent 'payment-fe' and all its data
# Continue? [y/n]: y
# ✅ Removed agent 'payment-fe'
```

### Switching Tech Stack

```bash
# Switch from React to Vue (replaces variant skills)
./agent.sh update payment-fe --switch-framework vue

# Output:
# ⚠️ This will replace React skills with Vue skills
# Current skills to be removed:
#   - react-best-practices
#   - scaffold-react-page
#   - testing-react
# New skills to be added:
#   - vue-patterns
#   - scaffold-vue-page
#   - testing-vue
# Continue? [y/n]: y
# ✅ Switched payment-fe from react to vue
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Skills Not Found

```bash
# Issue: Missing skills
./agent.sh check payment-fe
# ❌ zustand-patterns (MISSING)

# Solution: Auto-fix
./agent.sh check payment-fe --fix
# ✅ Installed: zustand-patterns
```

#### 2. Context7 Not Connected

```bash
# Issue: MCP not available
# ⚠️ Context7 MCP: Not connected

# Solution: Check settings.json
cat .claude/settings.json | grep context7

# Verify MCP is configured:
# {
#   "mcpServers": {
#     "context7": {
#       "command": "npx",
#       "args": ["-y", "@context7/mcp-server"]
#     }
#   }
# }
```

#### 3. Agent Config Errors

```bash
# Issue: Invalid config
./agent.sh setup payment-fe dev-fe --config ./invalid.yaml
# ❌ Config validation failed: Unknown variant 'unknown-framework'

# Solution: Check variant categories
./agent.sh setup --list-variants
# Available variants:
# Frameworks:   react, vue, angular, svelte, vanilla
# Styling:      tailwind, css-modules, styled-components, scss
# ...
```

#### 4. Duplicate Agent Name

```bash
# Issue: Agent already exists
./agent.sh setup payment-fe dev-fe --framework react
# ❌ Agent 'payment-fe' already exists

# Solution: Use different name or update existing
./agent.sh setup payment-fe-v2 dev-fe --framework react
# or
./agent.sh update payment-fe --add graphql
```

### Verify Setup

```bash
# Check entire project setup
./agent.sh check --all

# Output:
# ═══════════════════════════════════════════════════════════════
# 🔍 SCANNING SKILLS FOR ALL AGENTS
# ═══════════════════════════════════════════════════════════════
#
# 📁 Agent: payment-fe (dev-fe + react + tailwind + zustand)
# ├── ✅ frontend-design (shared-skill, symlinked)
# ├── ✅ react-best-practices (copied)
# ├── ✅ tailwind-patterns (copied)
# ├── ✅ zustand-patterns (copied)
# ├── ✅ vitest-testing (copied)
# └── ✅ git-automation (shared-skill, symlinked)
#
# ═══════════════════════════════════════════════════════════════
# ✅ ALL SKILLS VERIFIED
# ═══════════════════════════════════════════════════════════════
```

---

## 📚 Related Documentation

- [Architecture](01-architecture.md) - System architecture overview
- [Skills Guide](03-skills-guide.md) - Managing skills
- [Workflows](04-workflows.md) - Workflow orchestration
- [Model Strategy](05-model-strategy.md) - Model selection by task
- [Extend Guide](06-extend-guide.md) - Creating new agents/skills
- [Quick Reference](07-quick-reference.md) - Cheat sheet
