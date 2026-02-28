---
name: code-review-advanced
description: |
  Advanced code review practices for Tech Leads and senior engineers. Use when:
  reviewing architecture changes, mentoring through review, or when user mentions
  "advanced review", "architecture review", "lead review", "senior review".
version: 1.0.0
category: leadership
tags:
  - code-review
  - leadership
  - mentorship
  - architecture
depends_on:
  - code-review
recommends:
  - technical-debt
used_by: []
---

# Skill: Code Review Advanced

## Core Principle
**Elevate the team through review.** Every review is a mentoring opportunity.

## Beyond Basic Review

| Level | Focus |
|-------|-------|
| **Junior** | Correctness, style |
| **Mid** | Patterns, edge cases |
| **Senior** | Architecture, maintainability |
| **Lead** | Team growth, system health |

## Hard Rules

1. **NEVER block without teaching** - Explain the "why"
2. **NEVER nitpick style** - Automate with linters
3. **ALWAYS consider alternatives** - Is there a better approach?
4. **ALWAYS think about future readers** - Code is read 10x more than written

## Review Dimensions

### 1. Correctness
```
- Does it work as intended?
- Are edge cases handled?
- Are errors handled properly?
- Is the logic sound?
```

### 2. Architecture
```
- Does it fit the system design?
- Is the abstraction appropriate?
- Are dependencies correct?
- Will it scale?
```

### 3. Maintainability
```
- Is it readable?
- Is it testable?
- Is it documented where needed?
- Will it be easy to change?
```

### 4. Performance
```
- Are there obvious bottlenecks?
- Is the algorithm efficient?
- Are resources managed properly?
- Is caching used appropriately?
```

### 5. Security
```
- Is input validated?
- Is output sanitized?
- Are secrets protected?
- Is access controlled?
```

## Feedback Framework

### SBI Model
```
Situation: "In the handleOrder function..."
Behavior: "You're querying the database inside a loop..."
Impact: "This will cause N+1 queries under load..."
```

### Teaching Through Review
```markdown
// ❌ Blocking comment
"This is wrong, use a Map instead."

// ✅ Teaching comment
"Consider using a Map here instead of an object.
Why: Maps have O(1) lookups and preserve insertion order.
Example:
```typescript
const orderMap = new Map<string, Order>();
for (const order of orders) {
  orderMap.set(order.id, order);
}
```
What do you think?"
```

## Architecture Review Checklist

```markdown
## Design Review

### High-Level
- [ ] Solution addresses the problem
- [ ] Alternatives considered
- [ ] Trade-offs documented
- [ ] Scalability considered
- [ ] Security reviewed

### Implementation
- [ ] Follows existing patterns
- [ ] Appropriate abstraction level
- [ ] Testable design
- [ ] Error handling complete
- [ ] Logging/monitoring added

### Integration
- [ ] API contracts clear
- [ ] Backwards compatible
- [ ] Migration plan if needed
- [ ] Documentation updated
```

## Review Metrics

```markdown
## Team Health Indicators

| Metric | Target | Current |
|--------|--------|---------|
| Review turnaround | < 4 hours | 2.5 hours |
| Comments per PR | 3-8 | 5 |
| PR size | < 400 lines | 280 |
| Rework rate | < 20% | 15% |
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Only finding problems | Acknowledge good patterns |
| Vague comments | Be specific with examples |
| Personal tone | Focus on code, not person |
| Blocking without alternative | Suggest solutions |
| Reviewing too quickly | Take time to understand |

## Checklist

- [ ] Logic verified
- [ ] Architecture reviewed
- [ ] Performance considered
- [ ] Security checked
- [ ] Mentoring opportunities used
- [ ] Team patterns followed
