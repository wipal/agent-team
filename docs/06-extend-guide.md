# Extend Guide

> **Phiên bản:** 1.1
> **Cập nhật:** 2025-02-26
> **Related:** [Architecture](01-architecture.md) | [Skills Guide](03-skills-guide.md) | [Skills Discovery](08-skills-discovery.md)

---

## 📋 Mục Lục

1. [Overview](#-overview)
2. [🔍 How to Find & Install Skills from skills.sh](#-how-to-find--install-skills-from-skillssh) **(MANDATORY)**
3. [How to Create New Agent](#-how-to-create-new-agent)
4. [How to Create New Variant](#-how-to-create-new-variant)
5. [How to Create New Skill](#-how-to-create-new-skill)
6. [How to Create New Workflow](#-how-to-create-new-workflow)
7. [How to Add New Rules](#-how-to-add-new-rules)
8. [Format Standards & Templates](#-format-standards--templates)
9. [Common Mistakes to Avoid](#-common-mistakes-to-avoid)

---

## 🎯 Overview

Guide này giúp bạn mở rộng Agent Team Template với:
- **New Agents**: Tạo agent mới với roles và variants
- **New Variants**: Thêm tech stack mới
- **New Skills**: Tạo skills mới
- **New Workflows**: Định nghĩa workflows mới
- **New Rules**: Thêm rules cho agents

### Extension Points

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       EXTENSION POINTS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  roles/base/         → Create new base roles                               │
│  roles/variants/     → Add tech variants                                    │
│  .claude/skills/     → Add new skills                                       │
│  .claude/commands/   → Add slash commands                                   │
│  .claude/rules/      → Add rules                                            │
│  workflows/          → Add workflow definitions                             │
│  presets/            → Add setup presets                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 How to Find & Install Skills from skills.sh

> **⚠️ QUAN TRỌNG:** Đây là bước BẮT BUỘC trước khi tạo bất kỳ skill nào.

### Step 0: Search skills.sh BEFORE Creating New Skill

**QUY TẮC:** Trước khi tạo skill mới, LUÔN:
1. **Search skills.sh** để xem skill đã tồn tại chưa
2. **Nếu tồn tại** → Copy về và customize (nếu cần)
3. **Nếu không tồn tại** → Mới tạo mới

### Using /discover Command

```bash
# Search for React skills
/discover react

# Search for API design skills
/discover api design

# Search for frontend skills
/discover frontend --category frontend

# Search official sources only
/discover testing --official
```

### Manual Search on skills.sh

1. Visit [https://skills.sh](https://skills.sh)
2. Search for relevant keywords
3. Check install count and source
4. Note the `owner/repo` for installation

### Installing Skills

```bash
# Install specific skill from multi-skill repo
/install-skill vercel-labs/agent-skills --skill react-best-practices

# Install from official source
/install-skill anthropics/skills --skill pdf

# Dry run to check before installing
/install-skill community/skill --dry-run
```

### Security Validation

**Official Sources** (Auto-validated):
- anthropics, vercel-labs, microsoft, google, expo, supabase

**Community Sources** (Require Review):
- All other sources require security validation
- Issues are reported for user decision
- NEVER auto-reject, let user decide

### Decision Flow

```
┌────────────────────────────────────────────────────────────────┐
│              SKILL DISCOVERY DECISION FLOW                      │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Need a skill?                                                  │
│       │                                                         │
│       ▼                                                         │
│  /discover <keyword> ──► Found?                                 │
│       │                    │                                    │
│       │               ┌────┴────┐                               │
│       │               │         │                               │
│       NO             YES       YES (community)                  │
│       │               │         │                               │
│       ▼               ▼         ▼                               │
│  Create new      Install &   Security                          │
│  skill           customize    validation                       │
│                               │                                 │
│                               ▼                                 │
│                          Issues?                                │
│                          ┌──┴──┐                                │
│                         NO    YES                               │
│                          │     │                                │
│                      Install  Report &                         │
│                               User decides                     │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Review Existing Skills

```bash
# Review all existing skills
/review-skills --all

# Review specific category
/review-skills --category frontend

# Review and suggest alternatives
/review-skills --all --suggest
```

---

## 👤 How to Create New Agent

### Step 1: Define Agent Purpose

Trước khi tạo agent, trả lời các câu hỏi:
- Mục đích của agent này là gì?
- Agent này thuộc role nào (base role)?
- Agent cần skills gì?
- Agent cần MCPs gì?

### Step 2: Choose Creation Method

#### Method A: Using Setup Script (Recommended)

```bash
# Create agent with existing role + variants
./agent.sh setup my-agent dev-fe \
  --framework react \
  --styling tailwind \
  --state zustand
```

#### Method B: Create Custom Role

If you need a completely new role type, follow these steps:

### Step 3: Create Base Role Template

```bash
# Create directory
mkdir -p roles/base/data-engineer

# Create CLAUDE.md template
cat > roles/base/data-engineer/CLAUDE.md.tmpl << 'EOF'
# Project: {{PROJECT_NAME}} - Data Engineer

## Role
- Bạn là Data Engineer chuyên sâu về:
  - ETL/ELT pipelines
  - Data warehouse design
  - Data quality & governance
  - Streaming data processing

## Tech Stack & Conventions
- Languages: Python, SQL
- Tools: Airflow, dbt, Spark
- Cloud: AWS/GCP data services

### Code Style
- Follow PEP 8 for Python
- Use type hints
- Document data schemas

## How to Work
### Khi nhận task:
1. Analyze data requirements
2. Design pipeline architecture
3. Implement with tests
4. Document data lineage

## MCP Integration
- Context7: Dùng để tra cứu documentation (BẮT BUỘC)
- PostgreSQL: Database operations
- AWS/GCP: Cloud services

## Knowledge Base
- Đọc từ: `.claude/agents/{{AGENT_NAME}}/knowledge.md`
- Cập nhật qua: `/retrospect-work` skill
EOF
```

### Step 4: Create Role Skills

```bash
# Create skill directory
mkdir -p .claude/skills/roles/data-engineer/etl-design

# Create skill file
cat > .claude/skills/roles/data-engineer/etl-design/SKILL.md << 'EOF'
---
name: etl-design
description: Design and implement ETL pipelines
category: data
---

# Skill: ETL Design

## Core Principle
Design reliable, maintainable data pipelines.

## When to Use
- Creating new data pipeline
- Modifying existing ETL
- Data migration tasks

## Steps
1. Analyze source data
2. Design transformations
3. Implement pipeline
4. Add monitoring

## Output
- Pipeline code
- Documentation
- Tests
EOF
```

### Step 5: Create Agent with New Role

```bash
./agent.sh setup data-pipeline data-engineer
```

### Agent Template Format

```markdown
# CLAUDE.md.tmpl Template

# Project: {{PROJECT_NAME}} - {{ROLE_NAME}}

## Role
- Bạn là {{ROLE_NAME}} chuyên sâu về:
  - {{SKILL_1}}
  - {{SKILL_2}}
  - {{SKILL_3}}

## Tech Stack & Conventions
- {{TECH_STACK_DETAILS}}

### Code Style
- {{CONVENTION_1}}
- {{CONVENTION_2}}

## How to Work
### Khi nhận task:
1. {{STEP_1}}
2. {{STEP_2}}
3. {{STEP_3}}

## MCP Integration
- Context7: Dùng để tra cứu documentation (BẮT BUỘC)
- {{MCP_1}}: {{PURPOSE_1}}
- {{MCP_2}}: {{PURPOSE_2}}

## Knowledge Base
- Đọc từ: `.claude/agents/{{AGENT_NAME}}/knowledge.md`
- Cập nhật qua: `/retrospect-work` skill
```

---

## 🎨 How to Create New Variant

### Step 1: Identify Variant Category

| Category | Description | Examples |
|----------|-------------|----------|
| `framework` | UI/Backend framework | react, vue, nestjs, fastapi |
| `styling` | CSS solution | tailwind, css-modules, styled-components |
| `state` | State management | zustand, redux, pinia |
| `data` | Data fetching | tanstack-query, swr, apollo |
| `testing` | Test framework | vitest, jest, playwright |
| `database` | Database type | postgresql, mongodb, mysql |
| `orm` | ORM tool | prisma, typeorm, sequelize |

### Step 2: Create Variant Directory

```bash
# For framework variant
mkdir -p roles/variants/dev-fe/svelte

# For styling variant
mkdir -p roles/variants/styling/css-modules

# For backend variant
mkdir -p roles/variants/dev-be/fastapi
```

### Step 3: Create Variant CLAUDE.md

```bash
cat > roles/variants/dev-fe/svelte/CLAUDE.md.tmpl << 'EOF'
# Svelte Variant Additions

## Additional Tech Stack
- Framework: Svelte/SvelteKit
- Build: Vite
- State: Svelte stores

## Svelte-Specific Patterns

### Component Structure
```
src/lib/components/
├── ComponentName.svelte
├── ComponentName.test.ts
└── index.ts
```

### Best Practices
1. Use SvelteKit for full-stack apps
2. Leverage Svelte stores for state
3. Use Svelte actions for DOM behavior
4. Optimize with compiler directives

## Skills to Install
- svelte-patterns
- sveltekit-routing
- testing-svelte
EOF
```

### Step 4: Create Variant Skills

```bash
# Create skill directory
mkdir -p .claude/skills/variants/frameworks/svelte/svelte-patterns

# Create skill
cat > .claude/skills/variants/frameworks/svelte/svelte-patterns/SKILL.md << 'EOF'
---
name: svelte-patterns
description: Svelte best practices and patterns
variant: svelte
---

# Skill: Svelte Patterns

## Core Principle
Leverage Svelte's reactivity and compiler.

## When to Use
- Building Svelte components
- State management with stores
- SvelteKit routing

## Patterns

### Reactive Declarations
```svelte
<script>
  let count = 0;
  $: doubled = count * 2;
</script>
```

### Stores
```javascript
import { writable } from 'svelte/store';
export const count = writable(0);
```

### Actions
```javascript
function clickOutside(node, callback) {
  const handleClick = (event) => {
    if (!node.contains(event.target)) callback();
  };
  document.addEventListener('click', handleClick);
  return { destroy: () => document.removeEventListener('click', handleClick) };
}
```
EOF
```

### Step 5: Update Variant Categories

```bash
# Edit the variant categories configuration
# In scripts/setup/setup-agent.sh or config file

VARIANT_CATEGORIES["framework"]="react vue angular svelte vanilla"
```

### Step 6: Test the Variant

```bash
# Create agent with new variant
./agent.sh setup test-svelte dev-fe --framework svelte

# Verify
./agent.sh check test-svelte --fix
```

---

## 🛠️ How to Create New Skill

### Step 1: Identify Skill Type

| Type | Directory | Purpose |
|------|-----------|---------|
| Base | `.claude/skills/base/` | Shared across all agents |
| Role | `.claude/skills/roles/{role}/` | Role-specific |
| Variant | `.claude/skills/variants/{category}/` | Tech-specific |
| Community | `.claude/skills/community/` | Copied from community |

### Step 2: Create Skill Directory

```bash
# Base skill (shared)
mkdir -p .claude/skills/base/api-documentation

# Role skill
mkdir -p .claude/skills/roles/dev-be/performance-optimization

# Variant skill
mkdir -p .claude/skills/variants/testing/cypress
```

### Step 3: Create SKILL.md

```bash
cat > .claude/skills/base/api-documentation/SKILL.md << 'EOF'
---
name: api-documentation
description: |
  Generate comprehensive API documentation from code.
  Creates OpenAPI/Swagger specs and markdown docs.
version: 1.0.0
category: documentation
tags:
  - api
  - documentation
  - openapi
depends_on: []
---

# Skill: API Documentation

## Core Principle
Documentation should be generated from code, not written separately.

## When to Use This Skill

### Trigger Conditions
- New API endpoint created
- API contract changed
- Documentation update needed
- Onboarding new team members

## Prerequisites
- Code has proper type annotations
- Route handlers are well-structured

## Inputs
- `--format`: Output format (openapi, markdown, both)
- `--output`: Output directory (default: docs/api)

## Steps

### Step 1: Scan API Endpoints
Scan route files to identify endpoints.
- Extract route paths
- Extract HTTP methods
- Extract parameters

### Step 2: Extract Type Information
Extract types from:
- Request bodies
- Response schemas
- Path/query parameters

### Step 3: Generate OpenAPI Spec
Create OpenAPI 3.0 specification.
- Define paths
- Define schemas
- Add descriptions

### Step 4: Generate Markdown Docs
Create human-readable documentation.
- Endpoint descriptions
- Request/response examples
- Authentication requirements

### Step 5: Validate
Validate generated documentation.
- OpenAPI spec is valid
- All endpoints documented
- Examples are correct

## Output
```
docs/api/
├── openapi.yaml
├── endpoints.md
└── schemas/
    └── *.md
```

## Rules
- ✅ Document all public endpoints
- ✅ Include request/response examples
- ✅ Document error responses
- ❌ Don't document internal endpoints
- ❌ Don't skip authentication docs

## Example Usage
```
/api-documentation --format both --output docs/api
```
EOF
```

### Step 4: Add Reference Files (Optional)

```bash
mkdir -p .claude/skills/base/api-documentation/references

cat > .claude/skills/base/api-documentation/references/openapi-template.md << 'EOF'
# OpenAPI Template

## Basic Structure
```yaml
openapi: 3.0.0
info:
  title: API Title
  version: 1.0.0
paths:
  /endpoint:
    get:
      summary: Description
      responses:
        '200':
          description: Success
```

## Common Patterns
- Authentication: Bearer token
- Pagination: cursor-based
- Errors: RFC 7807 Problem Details
EOF
```

### Step 5: Test the Skill

```bash
# Test by invoking the skill
/api-documentation --format markdown --output test-docs

# Verify output
ls test-docs/
```

### Skill Template Format

```markdown
---
name: skill-name
description: |
  Multi-line description of what the skill does.
  Include when to use it.
version: 1.0.0
category: category-name
tags:
  - tag1
  - tag2
depends_on:
  - prerequisite-skill
---

# Skill: Skill Name

## Core Principle
**One sentence that captures the essence.**

## When to Use This Skill

### Trigger Condition 1
- Situation A
- Situation B

### Trigger Condition 2
- Situation C

## Prerequisites
- Prerequisite 1
- Prerequisite 2

## Inputs
- `input1`: Description (default: value)
- `input2`: Description (default: value)

## Steps

### Step 1: Step Name
Description of what to do.

### Step 2: Step Name
Description of what to do.

## Output
- Output 1
- Output 2

## Rules
- ✅ What TO do
- ❌ What NOT to do

## Example Usage
```
/command --option value
```
```

---

## 🔄 How to Create New Workflow

### Step 1: Define Workflow Purpose

- Workflow name và description
- Trigger conditions
- Roles involved
- Expected outputs

### Step 2: Create Workflow File

```bash
mkdir -p workflows

cat > workflows/database-migration.yaml << 'EOF'
name: Database Migration
description: Quy trình migrate database với safety checks
trigger: Manual hoặc khi có schema change

roles:
  - dev-be
  - tech-lead
  - devops

phases:
  - name: Planning
    role: tech-lead
    steps:
      - name: analyze_changes
        action: Phân tích schema changes
        skills: [database-design]
        output: migration-plan.md

      - name: review_impact
        action: Đánh giá impact
        output: impact-analysis.md

  - name: Implementation
    role: dev-be
    steps:
      - name: create_migration
        action: Tạo migration file
        skills: [database-design]
        output: migrations/*.sql

      - name: write_rollback
        action: Viết rollback script
        output: rollbacks/*.sql

      - name: write_tests
        action: Viết migration tests
        skills: [backend-testing]
        output: tests/migration.test.ts

  - name: Review
    role: tech-lead
    steps:
      - name: review_migration
        action: Review migration code
        skills: [code-review]

      - name: approve
        action: Approve migration
        requires_approval: true

  - name: Execution
    role: devops
    steps:
      - name: backup_database
        action: Backup database
        output: backup-{timestamp}.sql

      - name: run_staging
        action: Run on staging
        mcp: [postgresql]

      - name: verify_staging
        action: Verify staging
        skills: [database-design]

      - name: run_production
        action: Run on production
        requires_approval: true
        mcp: [postgresql]

      - name: verify_production
        action: Verify production

  - name: Cleanup
    role: devops
    steps:
      - name: update_docs
        action: Update documentation
        output: docs/database-schema.md

      - name: notify_team
        action: Notify team
        skills: [internal-comms]
EOF
```

### Step 3: Create Workflow Command (Optional)

```bash
mkdir -p .claude/commands/workflows

cat > .claude/commands/workflows/db-migrate.md << 'EOF'
---
name: db-migrate
description: Run database migration workflow
---

# Database Migration Workflow

## Usage
/db-migrate [options]

## Options
- `--dry-run`: Show plan without executing
- `--staging-only`: Run on staging only
- `--skip-backup`: Skip backup (not recommended)

## Steps
1. Load workflow from workflows/database-migration.yaml
2. Execute phases in order
3. Request approvals where needed
4. Report results
EOF
```

### Step 4: Test the Workflow

```bash
# Dry run
./agent.sh run-workflow database-migration --dry-run

# Execute
./agent.sh run-workflow database-migration
```

### Workflow Template Format

```yaml
name: Workflow Name
description: Description of what this workflow does
trigger: Manual | Automatic condition

roles:
  - role1
  - role2

phases:
  - name: Phase Name
    role: responsible-role
    parallel: false  # Set true for parallel execution
    steps:
      - name: step_name
        action: Description of action
        skills: [skill1, skill2]
        mcp: [mcp1]
        output: output-file.md
        requires_approval: false

      - name: another_step
        action: Another action
        output: another-output.md

  - name: Next Phase
    role: another-role
    steps:
      - name: step
        action: Action
```

---

## 📜 How to Add New Rules

### Step 1: Choose Rule Type

| Type | File | Applies To |
|------|------|------------|
| General | `.claude/rules/common/` | All agents |
| Role-specific | `.claude/rules/role-rules/` | Specific role |
| Language | `.claude/rules/languages/` | Specific language |

### Step 2: Create General Rules

```bash
mkdir -p .claude/rules/common

cat > .claude/rules/common/error-handling.md << 'EOF'
# Error Handling Rules

## Applies To
- All agents
- All code types

## Rules

### 1. Always Handle Errors Explicitly
```typescript
// ✅ Good
try {
  await processData(data);
} catch (error) {
  logger.error('Failed to process data', { error, data });
  throw new ProcessingError('Data processing failed', { cause: error });
}

// ❌ Bad
try {
  await processData(data);
} catch (e) {
  // silent fail
}
```

### 2. Use Custom Error Types
```typescript
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### 3. Log Meaningful Context
Always include:
- What operation failed
- Input that caused failure
- Error message
- Stack trace (in development)

### 4. Provide Recovery Options
- Retry mechanism for transient errors
- Fallback for non-critical errors
- User-friendly error messages
EOF
```

### Step 3: Create Role-Specific Rules

```bash
mkdir -p .claude/rules/role-rules

cat > .claude/rules/role-rules/dev-be-rules.md << 'EOF'
# dev-be Rules - Rules riêng cho Backend Developers

## BE-Specific Rules

### 1. API Design
- RESTful conventions
- Proper HTTP status codes
- Consistent error response format
- API versioning

### 2. Database
- Use migrations for schema changes
- Index frequently queried fields
- Never use SELECT *
- Use connection pooling

### 3. Security
- Validate all inputs
- Use parameterized queries
- Never log sensitive data
- Implement rate limiting

### 4. Performance
- Implement caching strategy
- Use async operations
- Monitor query performance
- Set appropriate timeouts

## Anti-Patterns to Avoid
- ❌ N+1 queries
- ❌ God services
- ❌ Hardcoded configuration
- ❌ Missing error handling
EOF
```

### Step 4: Create Language-Specific Rules

```bash
mkdir -p .claude/rules/languages/typescript

cat > .claude/rules/languages/typescript/rules.md << 'EOF'
# TypeScript Rules

## Type System
- Enable strict mode
- No `any` types in production code
- Use type inference where obvious
- Explicit types for public APIs

## Naming Conventions
- PascalCase: types, interfaces, classes, enums
- camelCase: variables, functions, methods
- UPPER_SNAKE_CASE: constants

## Code Organization
```
src/
├── types/          # Shared types
├── utils/          # Utility functions
├── services/       # Business logic
└── __tests__/      # Test files
```

## Import Order
1. Node built-ins
2. External packages
3. Internal modules
4. Relative imports
EOF
```

### Step 5: Update lessons.md

```bash
cat > .claude/rules/lessons/lessons.md << 'EOF'
# Lessons Learned

## Recent Lessons

### 2025-02-25: Always verify Context7 docs
**What happened:** Implemented feature using outdated API
**Lesson:** Always use Context7 to fetch latest docs before implementing
**Rule added:** "Use Context7 before any API implementation"

### 2025-02-24: N+1 Query in OrderService
**What happened:** Performance issue due to N+1 queries
**Lesson:** Use Prisma include for relations instead of separate queries
**Code:**
```typescript
// Bad
for (const order of orders) {
  order.items = await this.getItems(order.id);
}

// Good
const orders = await this.prisma.order.findMany({
  include: { items: true }
});
```

## Pattern Categories

### Performance Patterns
- Use database indexing
- Implement caching
- Batch operations

### Security Patterns
- Input validation
- Parameterized queries
- Rate limiting

### Code Quality Patterns
- Small functions
- Single responsibility
- Meaningful names
EOF
```

### Rules Template Format

```markdown
# [Category] Rules

## Applies To
- Agent types
- Code types
- Scenarios

## Rules

### 1. Rule Name
Description of the rule.

```language
// ✅ Good example
good_code_here();

// ❌ Bad example
bad_code_here();
```

### 2. Another Rule
Description.

## Anti-Patterns to Avoid
- ❌ Anti-pattern 1
- ❌ Anti-pattern 2
```

---

## 📐 Format Standards & Templates

### File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Role template | `CLAUDE.md.tmpl` | `roles/base/dev-fe/CLAUDE.md.tmpl` |
| Skill | `SKILL.md` | `skills/base/code-review/SKILL.md` |
| Workflow | `*.yaml` | `workflows/feature-development.yaml` |
| Rules | `*.md` | `rules/common/coding-style.md` |
| Config | `*.yaml` | `configs/agent.yaml` |

### Directory Structure Standards

```
agent-team-template/
├── roles/
│   ├── base/{role}/
│   │   └── CLAUDE.md.tmpl
│   └── variants/{role}/{variant}/
│       └── CLAUDE.md.tmpl
│
├── .claude/
│   ├── skills/
│   │   ├── {type}/{category}/{skill}/
│   │   │   ├── SKILL.md
│   │   │   └── references/
│   │   └── ...
│   └── rules/
│       ├── common/
│       ├── role-rules/
│       ├── languages/
│       └── lessons/
│
├── workflows/
│   └── {workflow-name}.yaml
│
└── presets/
    └── {preset-name}.yaml
```

### YAML Configuration Standards

```yaml
# Standard config structure
agent:
  name: string
  role: string
  description: string (optional)

variants:
  category: value

model:
  default: string
  thinking_mode: boolean
  thinking_tasks: array (optional)

skills:
  - name: string
    path: string (optional)
    strategy: copy|link|reference (optional)

mcp:
  - string

knowledge:
  import_from: string (optional)
```

---

## ⚠️ Common Mistakes to Avoid

### 1. Creating Skills Without Clear Purpose

```
❌ Bad: Creating a skill that's too broad
"frontend-skill" - Does everything

✅ Good: Focused, single responsibility
"form-validation" - Only handles form validation
"scaffold-react-page" - Only scaffolds pages
```

### 2. Duplicating Existing Skills

```
❌ Bad: Creating "my-react-patterns" when "react-best-practices" exists

✅ Good: Extend or reference existing skills
- Reference: Use existing skill
- Extend: Create focused addition
```

### 3. Missing Dependencies

```markdown
❌ Bad:
depends_on: []

✅ Good:
depends_on:
  - frontend-design
  - react-best-practices
```

### 4. Not Testing New Components

```
❌ Bad: Creating and immediately using

✅ Good:
1. Create component
2. Test in isolation
3. Verify with ./agent.sh check
4. Use in production
```

### 5. Over-Engineering Workflows

```yaml
❌ Bad: Workflow with 20 phases and 50 steps

✅ Good: Focused workflow with clear phases
phases:
  - name: Plan
  - name: Implement
  - name: Review
```

### 6. Missing Documentation

```
❌ Bad: Skill without description or examples

✅ Good:
- Clear description
- When to use
- Examples
- Rules
```

### 7. Ignoring Rules System

```
❌ Bad: Hardcoding patterns in skills

✅ Good:
- Extract patterns to rules
- Reference rules in skills
- Update lessons.md with learnings
```

---

## 📚 Related Documentation

- [Architecture](01-architecture.md) - System architecture
- [Setup Guide](02-setup-guide.md) - Setup instructions
- [Skills Guide](03-skills-guide.md) - Managing skills
- [Workflows](04-workflows.md) - Workflow orchestration
- [Quick Reference](07-quick-reference.md) - Cheat sheet
