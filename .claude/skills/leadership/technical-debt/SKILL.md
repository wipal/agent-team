---
name: technical-debt
description: |
  Technical debt management and prioritization strategies. Use when: managing
  technical debt, prioritizing refactoring, or when user mentions "tech debt",
  "refactor", "legacy", "cleanup", "improvement".
version: 1.0.0
category: leadership
tags:
  - technical-debt
  - refactoring
  - maintenance
  - prioritization
depends_on:
  - code-review-advanced
recommends: []
used_by: []
---

# Skill: Technical Debt

## Core Principle
**Not all debt is bad.** Some debt is an investment. Manage it deliberately.

## Types of Technical Debt

| Type | Cause | Example |
|------|-------|---------|
| **Deliberate** | Strategic shortcut | MVP with hardcoded config |
| **Accidental** | Lack of knowledge | Wrong abstraction |
| **Bit rot** | Time/environment | Outdated dependencies |
| **Design debt** | Evolving requirements | Architectural mismatch |

## Debt Assessment

### Impact vs Effort Matrix
```
        High Impact
            │
   Quick    │   Strategic
   Wins     │   Refactors
────────────┼────────────
   Ignore   │   Consider
   (For now)│   Carefully
            │
        Low Impact

   Low Effort    High Effort
```

## Hard Rules

1. **NEVER ignore debt** - Document it
2. **NEVER refactor without value** - What problem are we solving?
3. **ALWAYS quantify the cost** - Time lost, bugs caused, velocity impact
4. **ALWAYS allocate time** - 10-20% of sprint capacity

## Debt Tracking

### Debt Register
```markdown
# Technical Debt Register

| ID | Description | Impact | Effort | Priority | Status |
|----|-------------|--------|--------|----------|--------|
| TD-001 | Legacy auth module | High | 5 days | P1 | Planned |
| TD-002 | Missing tests for payments | High | 3 days | P1 | In Progress |
| TD-003 | Outdated React version | Medium | 2 days | P2 | Backlog |
| TD-004 | Hardcoded feature flags | Low | 1 day | P3 | Backlog |
```

### Debt Cost Calculator
```markdown
# Debt Cost: Legacy Auth Module

## Symptoms
- 2 hours/week debugging auth issues
- 3 security patches in last quarter
- Can't add new OAuth providers

## Quantified Cost
- Engineering time: 2 hrs/week × $100/hr × 52 weeks = $10,400/year
- Security risk: Medium (estimated $50K if exploited)
- Opportunity cost: 2 features delayed

## Fix Cost
- Refactor: 5 days × $800/day = $4,000
- Testing: 2 days × $800/day = $1,600
- Total: $5,600

## ROI
- Payback: ~6 months
- Year 1 savings: $4,800
- Risk reduction: Significant

## Recommendation
Fix in Q2 - High priority
```

## Prioritization Framework

### SQALE Method
```
S - Severity: How bad is it?
Q - Quality: What does it affect?
U - Urgency: When must it be fixed?
A - Area: Where in the codebase?
L - Level: What skill needed?
E - Effort: How long to fix?
```

## Refactoring Strategies

### Strangler Fig Pattern
```typescript
// 1. Create new implementation
const newUserService = new UserServiceV2();

// 2. Route new features to new code
if (featureFlags.useNewUserService) {
  return newUserService.getUser(id);
}

// 3. Gradually migrate existing calls
const userService = isNewFeature ? newUserService : legacyUserService;

// 4. Remove old code when complete
```

### Incremental Refactoring
```
Week 1: Add tests to legacy code
Week 2: Extract first module
Week 3: Extract second module
Week 4: Remove legacy code
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| "Rewrite everything" | Incremental improvement |
| No debt tracking | Maintain debt register |
| Zero debt goal | Accept some debt |
| Ignoring until crisis | Regular debt review |
| Refactoring without tests | Test first |

## Debt Review Meeting

```markdown
## Agenda (30 min)

1. Review new debt items (5 min)
2. Update existing debt status (5 min)
3. Prioritize for next sprint (10 min)
4. Assign owners (5 min)
5. Action items (5 min)
```

## Checklist

- [ ] Debt register maintained
- [ ] Costs quantified
- [ ] Sprint capacity allocated
- [ ] Regular reviews scheduled
- [ ] Fixes tested before removing debt
