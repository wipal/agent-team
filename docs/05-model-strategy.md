# Model Strategy Guide

> **Phiên bản:** 1.0
> **Cập nhật:** 2025-02-25
> **Related:** [Architecture](01-architecture.md) | [Workflows](04-workflows.md)

---

## 📋 Mục Lục

1. [Overview](#-overview)
2. [Task-Based Model Selection](#-task-based-model-selection)
3. [Decision Flow](#-decision-flow)
4. [Per-Role Defaults](#-per-role-defaults)
5. [Dynamic Model Switching](#-dynamic-model-switching)
6. [Cost Optimization](#-cost-optimization)
7. [Token Management](#-token-management)
8. [Best Practices](#-best-practices)

---

## 🎯 Overview

### Key Principle

> **Model selection theo TASK TYPE, KHÔNG phải theo ROLE.**

Một agent có thể dùng nhiều models khác nhau tùy vào loại task đang làm.

### Models Available

| Model | Best For | Characteristics |
|-------|----------|-----------------|
| **Claude Opus 4** | Planning, Architecture, Complex Analysis | Deep thinking, best reasoning |
| **Claude Sonnet 4** | Implementation, Bug Fixes, Documentation | Fast, efficient, good enough |
| **Claude Haiku** | Simple queries, Formatting, Quick lookups | Fastest, lowest cost |

### Thinking Mode

Extended thinking mode cho phép model suy nghĩ kỹ hơn trước khi trả lời.

```yaml
thinking_mode:
  enabled: true
  model: claude-opus-4
  max_tokens: 10000
  use_for:
    - "architecture-design"
    - "code-review"
    - "debugging"
    - "learning"
```

---

## 📊 Task-Based Model Selection

### Task Type → Model Mapping

| Task Type | Model | Thinking | Reason |
|-----------|-------|----------|--------|
| **Planning / Architecture** | Opus 4 | ✅ Yes | Deep analysis, complex decisions |
| **Code Review Analysis** | Opus 4 | ✅ Yes | Critical thinking, pattern detection |
| **Debugging Complex Issues** | Opus 4 | ✅ Yes | Root cause analysis |
| **Learning / Retrospect** | Opus 4 | ✅ Yes | Pattern extraction |
| **Implementation** | Sonnet 4 | ❌ No | Fast, efficient, good enough |
| **Bug Fixing (Simple)** | Sonnet 4 | ❌ No | Quick fixes |
| **Writing Tests** | Sonnet 4 | ❌ No | Standard implementation |
| **Documentation** | Sonnet 4 | ❌ No | Clear writing |
| **Formatting / Linting** | Haiku / Sonnet | ❌ No | Quick, simple |
| **Simple Queries** | Haiku / Sonnet | ❌ No | Fast response |
| **Quick Lookups** | Haiku / Sonnet | ❌ No | Low complexity |

### Task Categories

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TASK CATEGORIES & MODEL ASSIGNMENT                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  THINKING TASKS → OPUS 4 + THINKING MODE                            │    │
│  │                                                                      │    │
│  │  🧠 Planning        → Architecture design, sprint planning          │    │
│  │  🔍 Code Review     → Critical analysis, security review            │    │
│  │  🐛 Debugging       → Root cause analysis, complex bug tracing      │    │
│  │  📚 Learning        → Pattern extraction, knowledge update          │    │
│  │  🎯 Decisions       → Technical choices, risk assessment            │    │
│  │                                                                      │    │
│  │  Characteristics: Deep analysis, extended thinking, best reasoning  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  IMPLEMENTATION TASKS → SONNET 4                                    │    │
│  │                                                                      │    │
│  │  💻 Coding          → Feature implementation, bug fixes             │    │
│  │  🧪 Testing         → Write unit tests, integration tests           │    │
│  │  📝 Documentation   → Write docs, README, comments                  │    │
│  │  🔄 Refactoring     → Code cleanup, optimization                    │    │
│  │                                                                      │    │
│  │  Characteristics: Fast, efficient, good quality, cost-effective     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  LIGHT TASKS → HAIKU / SONNET                                       │    │
│  │                                                                      │    │
│  │  ⚡ Formatting      → Code formatting, lint fixes                   │    │
│  │  ❓ Queries         → Simple questions, status checks               │    │
│  │  🔎 Lookups         → Quick searches, documentation lookup          │    │
│  │  📊 Reports         → Generate simple reports                       │    │
│  │                                                                      │    │
│  │  Characteristics: Fastest response, lowest cost, simple tasks       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔀 Decision Flow

### Task Type Decision Tree

```
TASK RECEIVED?
│
├─ What type of task?
│   │
│   ├─ Planning / Architecture ─────────────────→ OPUS + THINKING
│   │
│   ├─ Code Review / Analysis ──────────────────→ OPUS + THINKING
│   │
│   ├─ Debugging (Complex) ─────────────────────→ OPUS + THINKING
│   │
│   ├─ Learning / Retrospect ───────────────────→ OPUS + THINKING
│   │
│   ├─ Implementation / Coding ─────────────────→ SONNET
│   │
│   ├─ Bug Fixing (Simple) ─────────────────────→ SONNET
│   │
│   ├─ Writing Tests ───────────────────────────→ SONNET
│   │
│   ├─ Documentation ───────────────────────────→ SONNET
│   │
│   └─ Formatting / Simple Query ───────────────→ HAIKU / SONNET
│
└─ Is complexity higher than expected?
    │
    ├─ YES → UPGRADE to OPUS + THINKING
    │
    └─ NO  → Continue with current model
```

### Complexity Detection

```yaml
# Triggers to upgrade from Sonnet to Opus
upgrade_triggers:
  - "User asks 'why' or 'explain'"
  - "Debugging failing tests"
  - "Code review requested"
  - "Architecture question"
  - "Security concern raised"
  - "Multiple components affected"
  - "Performance issue"
  - "Cross-service integration"

# Triggers to stay on Sonnet
stay_triggers:
  - "User says 'implement' or 'code'"
  - "Following existing plan"
  - "Simple bug fix"
  - "Adding tests"
  - "Documentation update"
  - "Single component change"
```

---

## 👥 Per-Role Defaults

### Role → Default Model

| Role | Default Model | Thinking | Reason |
|------|---------------|----------|--------|
| **Tech Lead** | Opus 4 | ✅ Yes | Architecture decisions, code review |
| **PM** | Sonnet 4 | ❌ No | Planning, communication, reporting |
| **Dev FE** | Sonnet 4 | ❌ No | UI implementation, components |
| **Dev BE** | Sonnet 4 | ❌ No | API implementation, database |
| **QA** | Sonnet 4 | ❌ No | Test writing, bug reporting |
| **QA Automation** | Sonnet 4 | ❌ No | E2E test implementation |
| **DevOps** | Sonnet 4 | ❌ No | CI/CD, deployment |
| **Designer** | Sonnet 4 | ❌ No | UI design, mockups |

### Role Configuration Example

```yaml
# roles/base/tech-lead/config.yaml
role: tech-lead
model:
  default: claude-opus-4
  thinking_mode: true
  max_thinking_tokens: 10000

tasks:
  thinking:
    - architecture-design
    - code-review
    - technical-decisions
    - risk-assessment
```

```yaml
# roles/base/dev-fe/config.yaml
role: dev-fe
model:
  default: claude-sonnet-4
  thinking_mode: false

tasks:
  implementation:
    - ui-implementation
    - component-creation
    - api-integration
```

---

## 🔄 Dynamic Model Switching

### Auto-Switch Rules

```yaml
# Dynamic model switching based on task detection
auto_switch:
  # Upgrade to Opus when complexity detected
  upgrade_to_opus:
    triggers:
      - "User asks 'why' or 'explain'"
      - "Debugging failing tests"
      - "Code review requested"
      - "Architecture question"
      - "Security concern raised"
      - "Multiple files affected > 5"
      - "Cross-service integration"
    action:
      model: claude-opus-4
      thinking_mode: true
    message: "🔄 Switching to Opus + Thinking for complex analysis..."

  # Stay on Sonnet for implementation
  stay_on_sonnet:
    triggers:
      - "User says 'implement' or 'code'"
      - "Following existing plan"
      - "Simple bug fix"
      - "Adding tests"
      - "Single file change"
    action:
      model: claude-sonnet-4
      thinking_mode: false

  # Downgrade to Haiku for simple tasks
  downgrade_to_haiku:
    triggers:
      - "Format code"
      - "Simple query"
      - "Quick lookup"
      - "Status check"
    action:
      model: claude-3-5-haiku
      thinking_mode: false
```

### Manual Model Override

```bash
# Force use Opus for current task
./agent.sh switch payment-fe --model opus --thinking

# Force use Sonnet for current task
./agent.sh switch payment-fe --model sonnet

# Check current model
./agent.sh status
# Agent: payment-fe
# Model: claude-sonnet-4
# Thinking: disabled
```

---

## 💰 Cost Optimization

### Cost Comparison

| Model | Relative Cost | Use For |
|-------|---------------|---------|
| **Opus 4** | 3x | Thinking tasks only |
| **Sonnet 4** | 1x (baseline) | Most implementation |
| **Haiku** | 0.1x | Simple tasks |

### Optimization Strategy

```yaml
cost_optimization:
  # Target distribution
  model_distribution:
    opus: 15%   # Only for thinking tasks
    sonnet: 75% # Most implementation work
    haiku: 10%  # Simple queries

  # Rules
  rules:
    - "Use Sonnet for 80% of work"
    - "Use Opus only when triggered by complexity"
    - "Use Haiku for formatting and simple queries"
    - "Review model usage weekly"

  # Alerts
  alerts:
    opus_overuse:
      threshold: "25% of tasks"
      action: "Review if Opus is being used for implementation"

    haiku_underuse:
      threshold: "5% of tasks"
      action: "Check if simple tasks are using Sonnet"
```

### Cost Tracking

```bash
# View model usage statistics
./agent.sh stats --model-usage

# Output:
# ═══════════════════════════════════════════════════════════════
# 📊 MODEL USAGE STATISTICS (Last 7 days)
# ═══════════════════════════════════════════════════════════════
#
# Opus 4:   12% ████████████
# Sonnet 4: 78% ████████████████████████████████████████
# Haiku:    10% ██████████
#
# Cost Savings vs All-Opus: 62%
# Cost Savings vs All-Sonnet: 5%
```

---

## 🪙 Token Management

### Token Limits

```yaml
# Token configuration
token_settings:
  # Thinking mode limits
  max_thinking_tokens: 10000

  # Context compaction threshold
  compact_threshold_pct: 50

  # Subagent model (for parallel tasks)
  subagent_model: haiku
```

### Strategic Compaction

```markdown
## Context Compaction Strategy

### When to Compact
- At logical breakpoints (NOT mid-implementation)
- After research/exploration phase
- Before implementation phase
- After completing a milestone
- After debugging, before continuing feature work

### When NOT to Compact
- During active implementation
- When debugging in progress
- When context is needed for current task

### Compaction Rules
- Keep recent messages
- Keep task-related context
- Summarize old context
- Preserve critical decisions
```

### Context Window Management

```yaml
# Best practices for context management
context_management:
  rules:
    - "Keep under 10 MCPs enabled per project"
    - "Keep under 80 tools active"
    - "Use subagents to offload research"
    - "Compact at logical breakpoints"

  # Disable unused MCPs
  disabledMcpServers:
    - unused-mcp-1
    - unused-mcp-2
```

---

## 💡 Best Practices

### 1. Task Type First

```
✅ DO:
- Identify task type before selecting model
- Use Opus + Thinking for planning/review
- Use Sonnet for implementation

❌ DON'T:
- Select model based on role
- Use Opus for simple implementation
- Skip thinking mode for complex analysis
```

### 2. Let Complexity Guide

```
✅ DO:
- Let complexity detection auto-switch
- Override only when necessary
- Monitor model usage

❌ DON'T:
- Force model for every task
- Ignore complexity indicators
- Use same model for all tasks
```

### 3. Cost Awareness

```
✅ DO:
- Use Haiku for simple tasks
- Use Sonnet for most work
- Reserve Opus for thinking tasks

❌ DON'T:
- Use Opus for everything
- Ignore cost implications
- Skip model optimization
```

### 4. Thinking Mode Usage

```
✅ DO:
- Enable thinking for architecture
- Enable thinking for debugging
- Enable thinking for code review

❌ DON'T:
- Enable thinking for implementation
- Enable thinking for simple queries
- Skip thinking for complex decisions
```

### Quick Reference Card

```markdown
## Quick Model Selection

| I'm doing... | Use | Thinking |
|--------------|-----|----------|
| Planning architecture | Opus | ✅ |
| Code review | Opus | ✅ |
| Debugging complex bug | Opus | ✅ |
| Learning from session | Opus | ✅ |
| Implementing feature | Sonnet | ❌ |
| Writing tests | Sonnet | ❌ |
| Fixing simple bug | Sonnet | ❌ |
| Writing docs | Sonnet | ❌ |
| Formatting code | Haiku | ❌ |
| Quick query | Haiku | ❌ |
```

---

## 📚 Related Documentation

- [Architecture](01-architecture.md) - System architecture
- [Workflows](04-workflows.md) - Using models in workflows
- [Quick Reference](07-quick-reference.md) - Cheat sheet

---

## 📖 Appendix: Model Capabilities

### Claude Opus 4

```yaml
model: claude-opus-4
strengths:
  - Deep analysis
  - Complex reasoning
  - Architecture design
  - Code review
  - Pattern recognition
best_for:
  - Planning
  - Critical thinking
  - Debugging
  - Learning
cost_factor: 3x
```

### Claude Sonnet 4

```yaml
model: claude-sonnet-4
strengths:
  - Fast implementation
  - Good quality code
  - Efficient execution
  - Clear communication
best_for:
  - Feature implementation
  - Bug fixing
  - Test writing
  - Documentation
cost_factor: 1x (baseline)
```

### Claude Haiku

```yaml
model: claude-3-5-haiku
strengths:
  - Fastest response
  - Lowest cost
  - Simple tasks
best_for:
  - Formatting
  - Simple queries
  - Quick lookups
  - Status checks
cost_factor: 0.1x
```
