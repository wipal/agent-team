# Workflows Guide

> **Phiên bản:** 1.0
> **Cập nhật:** 2025-02-25
> **Related:** [Architecture](01-architecture.md) | [Setup Guide](02-setup-guide.md) | [Skills Guide](03-skills-guide.md)

---

## 📋 Mục Lục

1. [Workflow Orchestration](#-workflow-orchestration)
2. [Task Management Process](#-task-management-process)
3. [Feature Development Workflow](#-feature-development-workflow)
4. [Bug Fix Workflow](#-bug-fix-workflow)
5. [Review Project Workflow](#-review-project-workflow)
6. [Learn Workflow](#-learn-workflow)
7. [Self-Improvement Loop](#-self-improvement-loop)
8. [Daily Workflows](#-daily-workflows)
9. [Code Review Workflow](#-code-review-workflow)

---

## 🎯 Workflow Orchestration

### Core Principles (From Boris Cherny - Anthropic Engineer)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW ORCHESTRATION PRINCIPLES                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. PLAN MODE DEFAULT                                                       │
│     ├── Enter plan mode for ANY non-trivial task (3+ steps)                │
│     ├── If something goes sideways → STOP and re-plan immediately          │
│     ├── Use plan mode for verification steps, not just building            │
│     └── Write detailed specs upfront to reduce ambiguity                    │
│                                                                              │
│  2. SUBAGENT STRATEGY                                                       │
│     ├── Use subagents liberally to keep main context clean                 │
│     ├── Offload research, exploration, parallel analysis to subagents      │
│     ├── For complex problems → throw more compute via subagents            │
│     └── One task per subagent for focused execution                         │
│                                                                              │
│  3. SELF-IMPROVEMENT LOOP                                                   │
│     ├── After ANY correction → update lessons.md with the pattern          │
│     ├── Write rules that prevent the same mistake                           │
│     ├── Ruthlessly iterate until mistake rate drops                         │
│     └── Review lessons at session start                                      │
│                                                                              │
│  4. VERIFICATION BEFORE DONE                                                │
│     ├── Never mark task complete without proving it works                   │
│     ├── Diff behavior between main and your changes                         │
│     ├── Ask: "Would a staff engineer approve this?"                         │
│     └── Run tests, check logs, demonstrate correctness                      │
│                                                                              │
│  5. AUTONOMOUS BUG FIXING                                                   │
│     ├── When given a bug report → just fix it                               │
│     ├── Point at logs, errors, failing tests – then resolve them           │
│     ├── Zero context switching required from user                           │
│     └── Go fix failing CI tests without being told how                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Workflow Decision Tree

```
TASK RECEIVED?
│
├─ Is it trivial (1-2 steps)?
│   └─ YES → Execute directly
│
├─ Is it non-trivial (3+ steps)?
│   └─ YES → Enter Plan Mode
│       │
│       ├─ Write plan to tasks/todo.md
│       ├─ Get user confirmation
│       └─ Execute with progress tracking
│
├─ Something goes sideways?
│   └─ YES → STOP and re-plan
│
└─ Task complete?
    └─ Verify → Update lessons → Mark done
```

---

## 📋 Task Management Process

### Standard Task Flow

```yaml
task_management:
  steps:
    - name: "Plan First"
      action: "Write plan to tasks/todo.md with checkable items"

    - name: "Verify Plan"
      action: "Check in with user before starting implementation"

    - name: "Track Progress"
      action: "Mark items complete as you go"

    - name: "Explain Changes"
      action: "High-level summary at each step"

    - name: "Document Results"
      action: "Add review section to tasks/todo.md"

    - name: "Capture Lessons"
      action: "Update lessons.md after corrections"
```

### tasks/todo.md Format

```markdown
# Task: [Task Name]

## Status: [ ] Planning | [ ] In Progress | [ ] Review | [ ] Done

## Plan
- [ ] Step 1: Description
- [ ] Step 2: Description
- [ ] Step 3: Description
- [ ] Step 4: Description

## Progress Log
- [2025-02-25 10:00] Started planning
- [2025-02-25 10:15] Plan approved, starting implementation
- [2025-02-25 10:30] Completed Step 1
- [2025-02-25 10:45] Completed Step 2

## Review
### What was done
- Summary of changes

### Files modified
- file1.ts - Description
- file2.ts - Description

### Tests run
- [x] Unit tests passed
- [x] Integration tests passed

### Lessons learned
- Pattern discovered
- Pitfall avoided
```

---

## 🚀 Feature Development Workflow

### Workflow Definition

```yaml
name: Feature Development
description: Quy trình phát triển tính năng mới
trigger: Manual hoặc khi nhận task mới

phases:
  - name: Planning
    role: tech-lead
    steps:
      - Analyze requirements
      - Design architecture
      - Create task breakdown
      - Write to tasks/todo.md
    output: tasks/todo.md

  - name: Design
    roles: [designer, tech-lead]
    parallel: true
    steps:
      - designer: Create UI mockups
      - tech-lead: Design API & database
    output: design.md, api-spec.md

  - name: Implementation
    roles: [dev-fe, dev-be]
    parallel: true
    steps:
      - dev-be: Implement API
      - dev-fe: Implement UI
    skills: [frontend-design, api-design]

  - name: Testing
    role: qa
    steps:
      - Write test cases
      - Execute tests
      - Report bugs
    skills: [test-planning, webapp-testing]

  - name: Review
    role: tech-lead
    steps:
      - Code review
      - Architecture review
      - Approve/Request changes
    skills: [code-review]

  - name: Deploy
    role: devops
    steps:
      - CI/CD pipeline
      - Deploy to staging
      - Production deployment
```

### Feature Development Steps

```bash
# ============================================
# BƯỚC 1: SETUP & PLANNING
# ============================================

# Switch to tech-lead for planning
./agent.sh switch lead

# Create feature branch
git checkout -b feature/payment-integration

# Plan the feature
# Agent sẽ:
# 1. Analyze requirements
# 2. Design architecture
# 3. Create tasks/todo.md

# ============================================
# BƯỚC 2: IMPLEMENTATION
# ============================================

# Switch to BE for API
./agent.sh switch auth-be
# Implement API endpoints...

# Switch to FE for UI
./agent.sh switch payment-fe
# Implement UI components...

# ============================================
# BƯỚC 3: TESTING
# ============================================

# Switch to QA
./agent.sh switch tester
# Write and run tests...

# ============================================
# BƯỚC 4: REVIEW & LEARN
# ============================================

# Review code
./agent.sh switch lead
# Review PR...

# Learn from this feature
/retrospect-work
# Extract patterns, update knowledge
```

---

## 🐛 Bug Fix Workflow

### Workflow Definition

```yaml
name: Bug Fix
description: Quy trình sửa lỗi
trigger: Bug report hoặc failing tests

phases:
  - name: Triage
    roles: [qa, pm]
    steps:
      - Verify bug exists
      - Assess severity
      - Assign priority
      - Assign to developer

  - name: Investigation
    role: tech-lead
    steps:
      - Analyze root cause
      - Identify affected components
      - Document findings
    skills: [systematic-debugging, root-cause-tracing]

  - name: Fix
    roles: [dev-fe, dev-be]
    steps:
      - Implement fix
      - Write unit tests
      - Verify fix locally

  - name: Verification
    role: qa
    steps:
      - Verify fix
      - Regression testing
      - Sign off

  - name: Deploy
    role: devops
    steps:
      - Deploy hotfix
      - Monitor for issues
```

### Bug Fix Steps (Autonomous)

```bash
# ============================================
# BUG FIX - AUTONOMOUS MODE
# ============================================

# Agent tự động:
# 1. Đọc bug report
# 2. Tìm root cause (logs, tests)
# 3. Implement fix
# 4. Verify fix
# 5. Update lessons.md

# User chỉ cần:
./agent.sh switch payment-fe
> "Fix bug: Payment form doesn't validate card number"

# Agent sẽ:
# ✅ Identified root cause: Missing validation in CardInput component
# ✅ Implemented fix: Added Zod schema validation
# ✅ Added unit test for validation
# ✅ Verified fix locally
# ✅ Updated lessons.md with pattern
#
# Ready for review. Create PR? [y/n]:
```

### Systematic Debugging Process

```markdown
## Debugging Protocol (From ClaudeKit)

### Phase 1: Stabilize
- Identify the failure mode
- Gather error messages, logs, stack traces
- Create minimal reproduction

### Phase 2: Isolate
- Binary search to find problematic code
- Check recent changes (git diff)
- Identify the exact component/function

### Phase 3: Fix
- Understand WHY it's failing
- Implement minimal fix
- Add tests to prevent regression

### Phase 4: Verify
- Run full test suite
- Check related functionality
- Monitor in production

## Verification Before Completion

RED FLAGS - STOP if:
- Using "should"/"probably"/"seems to"
- Expressing satisfaction before verification
- Committing without verification

REQUIRED:
1. IDENTIFY command to verify
2. RUN full command (not partial)
3. READ actual output
4. VERIFY output confirms claim
5. THEN make claim
```

---

## 🔍 Review Project Workflow

### Usage

```bash
# Review toàn bộ project
./agent.sh review

# Review specific agent's area
./agent.sh review payment-fe
```

### Review Output

```
═══════════════════════════════════════════════════════════════
🔍 PROJECT REVIEW - ecommerce-api
═══════════════════════════════════════════════════════════════

📁 Project Structure Analysis:
├── src/
│   ├── modules/           (NestJS modules)
│   ├── common/            (Shared utilities)
│   └── config/            (Configuration)

🛠️ Detected Tech Stack:
├── Framework:    NestJS (detected from nest-cli.json)
├── Database:     PostgreSQL (detected from docker-compose)
├── ORM:          Prisma (detected from prisma/schema.prisma)
├── Testing:      Jest (detected from jest.config.js)
├── Validation:   Zod (detected from imports)
└── Auth:         JWT (detected from auth module)

📊 Code Quality:
├── Test coverage:   72% ✅
├── Linting:         0 errors ✅
├── TypeScript:      3 warnings ⚠️
└── Security:        1 issue 🔴 (see details)

🎯 Suggestions:
1. Add rate limiting to auth endpoints
2. Consider using Redis for caching
3. Add API versioning

💡 Recommended Agent Config:
./agent.sh setup main-api dev-be \
  --framework nestjs \
  --database postgresql \
  --orm prisma \
  --testing jest \
  --validation zod

Apply recommended config? [y/n]:
```

### Review Workflow Definition

```yaml
name: Project Review
description: Phân tích project và đề xuất cấu hình
trigger: Manual hoặc khi join project mới

steps:
  - name: "Analyze Structure"
    action: "Scan project files"
    output: "structure-report.md"

  - name: "Detect Tech Stack"
    action: "Identify frameworks, tools"
    output: "tech-stack.md"

  - name: "Code Quality Check"
    action: "Run linters, test coverage"
    output: "quality-report.md"

  - name: "Generate Suggestions"
    action: "Recommend improvements"
    output: "suggestions.md"

  - name: "Create Agent Config"
    action: "Generate agent.sh setup command"
    output: "recommended-config.yaml"
```

---

## 🧠 Learn Workflow

### Usage

```bash
# Phân tích và học từ project hiện tại
./agent.sh learn

# Hoặc sau khi hoàn thành feature
/retrospect-work
```

### Learn Output

```
═══════════════════════════════════════════════════════════════
🧠 LEARNING FROM PROJECT - ecommerce-api
═══════════════════════════════════════════════════════════════

📖 Analyzing code patterns...

✅ Found Patterns:
├── Repository Pattern (used in 5 modules)
├── DTO Validation (using class-validator + zod)
├── Error Handling (custom exception filters)
├── Logging (winston with custom format)
└── Caching (redis with decorator pattern)

⚠️ Found Anti-patterns:
├── God Class (UserModule has 500+ lines)
├── N+1 Query (in OrderService.getOrders)
└── Hardcoded Values (API keys in config)

📝 Extracted Knowledge:

## Pattern: Repository with Prisma
```typescript
// Pattern found in 5 modules
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
```

## Anti-pattern: N+1 Query
```typescript
// Found in OrderService.getOrders
// BAD: Query in loop
for (const order of orders) {
  order.items = await this.getItems(order.id);
}

// GOOD: Use include
const orders = await this.prisma.order.findMany({
  include: { items: true }
});
```

📁 Updating Knowledge Base:
✅ Added to: .claude/agents/main-api/knowledge.md
   - Pattern: Repository with Prisma
   - Anti-pattern: N+1 Query
   - Pitfall: Hardcoded API keys
```

### Learn Workflow Definition

```yaml
name: Learn
description: Phân tích và extract knowledge từ project/session
trigger: Manual hoặc sau khi hoàn thành feature

steps:
  - name: "Analyze Code"
    action: "Scan for patterns"
    skills: [pattern-detection]

  - name: "Find Anti-patterns"
    action: "Identify code smells"
    output: "anti-patterns.md"

  - name: "Extract Learnings"
    action: "Create knowledge entries"
    output: "learnings.md"

  - name: "Update Knowledge Base"
    action: "Add to knowledge.md"
    script: "./agent.sh learn --update"

  - name: "Share Knowledge"
    action: "Sync to related agents"
    script: "./agent.sh sync --to-role dev-be"
```

---

## 🔄 Self-Improvement Loop

### Loop Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    SELF-IMPROVEMENT LOOP                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  WORK    │    │ CAPTURE  │    │ PROCESS  │    │  UPDATE  │  │
│  │ SESSION  │───▶│ LEARNING │───▶│ & ANALYZE│───▶│KNOWLEDGE │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │                                               │         │
│       │              ┌──────────┐                     │         │
│       └──────────────│ FEEDBACK │◀────────────────────┘         │
│                      │  LOOP    │                               │
│                      └──────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

### Self-Improvement Rules

```markdown
## Self-Improvement Protocol

### After ANY correction from user:
1. Update `lessons.md` with the pattern
2. Write rules that prevent the same mistake
3. Ruthlessly iterate until mistake rate drops

### At session start:
1. Review lessons.md for relevant project
2. Check knowledge.md for patterns
3. Load relevant skills

### After task completion:
1. Run /retrospect-work
2. Extract patterns used
3. Update knowledge base
4. Share to related agents

### Pattern Promotion:
- Low confidence + 3 successful uses → Medium confidence
- Medium confidence + 5 successful uses → High confidence
- High confidence + 10 successful uses → Best Practice
```

### Instinct-Based Learning

```yaml
# Instincts are learned behaviors with confidence scores
# They evolve into skills over time

instinct_system:
  commands:
    - /instinct-status        # Show learned instincts
    - /instinct-import <file> # Import from others
    - /instinct-export        # Export for sharing
    - /evolve                 # Cluster instincts into skills

  evolution_path:
    - stage: "Instinct"
      condition: "confidence < 0.7"
      description: "Individual learned behavior"

    - stage: "Pattern"
      condition: "confidence 0.7-0.9"
      description: "Reusable pattern"

    - stage: "Skill"
      condition: "confidence > 0.9"
      description: "Codified into SKILL.md"
```

---

## 📅 Daily Workflows

### Morning Start

```bash
# 1. Switch to PM/Tech Lead
./agent.sh switch lead

# 2. Check project status
./agent.sh review

# 3. Get today's tasks
# Query Jira/GitHub for tasks

# 4. Switch to working agent
./agent.sh switch payment-fe

# 5. Start work
# Agent loads relevant skills and knowledge
```

### End of Day

```bash
# 1. Run self-learning
/retrospect-work

# 2. Review learnings
# Check proposed updates to knowledge.md

# 3. Sync to related agents
./agent.sh sync payment-fe --to-role dev-fe

# 4. Create WIP commit if needed
/git-commit --wip
```

### Weekly Retrospective

```bash
# Run comprehensive learning
./agent.sh learn --deep

# Review knowledge base health
/knowledge-review --stats

# Update skills based on learnings
/knowledge-upgrade skills

# Share across all agents
/sync-all
```

---

## 👀 Code Review Workflow

### Review Protocol (From ClaudeKit)

```markdown
## Code Review Principles

### Core Principle
Technical correctness over social comfort.

❌ NO performative agreement:
- "You're absolutely right!"
- "Great point!"

✅ DO:
- Restate requirement
- Ask questions
- Push back with technical reasoning
- If unclear: STOP and ask for clarification first

### Three Practices

1. **Receiving Feedback**
   - Technical evaluation over performative agreement
   - Understand → Verify → Implement

2. **Requesting Reviews**
   - Systematic review via code-reviewer subagent
   - Clear description of changes
   - Link to requirements

3. **Verification Gates**
   - Evidence before any completion claims
   - No "should"/"probably"/"seems to"

### Review Checklist

- [ ] Does it meet requirements?
- [ ] Are there tests?
- [ ] Is it performant?
- [ ] Is it secure?
- [ ] Is it maintainable?
- [ ] Are there any code smells?
```

### Review Steps

```bash
# 1. Switch to tech-lead
./agent.sh switch lead

# 2. Review PR
/review-pr 42

# Output:
# ═══════════════════════════════════════════════════════════════
# 🔍 CODE REVIEW - PR #42: Add payment form
# ═══════════════════════════════════════════════════════════════
#
# 📁 Files changed: 5
# ➕ Additions: 234
# ➖ Deletions: 12
#
# ✅ Strengths:
# - Good component structure
# - Proper TypeScript types
# - Tests included
#
# ⚠️ Suggestions:
# - Consider extracting validation to separate file
# - Add error boundary
# - Missing loading state
#
# 🔴 Issues:
# - Potential XSS in user input (line 45)
#
# 💡 Recommendation: Request changes

# 3. Submit review
/review-pr 42 --request-changes --comment "See feedback above"
```

---

## 📚 Related Documentation

- [Architecture](01-architecture.md) - System architecture
- [Setup Guide](02-setup-guide.md) - Setup instructions
- [Skills Guide](03-skills-guide.md) - Managing skills
- [Model Strategy](05-model-strategy.md) - Model selection
- [Extend Guide](06-extend-guide.md) - Creating workflows
- [Quick Reference](07-quick-reference.md) - Cheat sheet
