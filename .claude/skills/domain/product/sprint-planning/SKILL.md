---
name: sprint-planning
description: |
  Sprint planning and estimation techniques for agile teams. Use when: planning
  sprints, estimating stories, setting sprint goals, or when user mentions
  "sprint", "planning", "estimate", "velocity", "story points".
version: 1.0.0
category: product
tags:
  - sprint
  - planning
  - estimation
  - velocity
depends_on:
  - user-stories
recommends: []
used_by: []
---

# Skill: Sprint Planning

## Core Principle
**Plan with confidence, adapt with humility.** Sprints are predictions, not promises.

## Sprint Planning Steps

```
1. Review backlog (before meeting)
2. Set sprint goal
3. Select stories
4. Break down stories
5. Estimate tasks
6. Confirm commitment
```

## Hard Rules

1. **NEVER overcommit** - Leave buffer for unknowns
2. **NEVER add stories mid-sprint** - Protect scope
3. **ALWAYS have a sprint goal** - Unifying purpose
4. **ALWAYS involve the whole team** - Collective commitment

## Estimation Techniques

### Story Points (Fibonacci)
```
1  - Trivial, < 1 hour
2  - Simple, 1-2 hours
3  - Straightforward, half day
5  - Moderate, 1-2 days
8  - Complex, 2-4 days
13 - Very complex, consider splitting
21 - Epic, must split
```

### Planning Poker
```
1. Read story aloud
2. Team discusses briefly
3. Everyone reveals card simultaneously
4. Discuss outliers
5. Reach consensus
```

### T-Shirt Sizing
```
XS - < 2 hours
S  - Half day
M  - 1-2 days
L  - 3-5 days
XL - > 1 week (split it!)
```

## Velocity Calculation

```
Sprint 1: 32 points completed
Sprint 2: 28 points completed
Sprint 3: 35 points completed
Sprint 4: 30 points completed

Average Velocity = (32 + 28 + 35 + 30) / 4 = 31.25 points

Recommended commitment: 28-30 points (85-95% of velocity)
```

## Sprint Goal Template

```markdown
# Sprint [Number] Goal

## Theme
Enable users to securely access their accounts

## Key Deliverables
1. User authentication (login/logout)
2. Password reset flow
3. Session management

## Success Metrics
- All stories completed
- Zero critical bugs
- Demo-ready by sprint end

## Risks
- Email service integration might be delayed
- OAuth provider approval pending
```

## Sprint Backlog Template

```markdown
# Sprint [Number] Backlog

| Story | Points | Owner | Status |
|-------|--------|-------|--------|
| AUTH-101 User login | 5 | @alice | In Progress |
| AUTH-102 Password reset | 8 | @bob | Todo |
| AUTH-103 Session timeout | 3 | @charlie | Done |

**Total Points:** 16
**Velocity Target:** 30
**Remaining Capacity:** 14
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Overcommitting | Leave 15% buffer |
| No sprint goal | Define unifying theme |
| Ignoring velocity | Use historical data |
| Adding scope mid-sprint | Move to next sprint |
| No task breakdown | Break into subtasks |

## Daily Standup Format

```
1. What I completed yesterday
2. What I'm working on today
3. Any blockers
```

## Checklist

- [ ] Sprint goal defined
- [ ] Stories selected
- [ ] Stories estimated
- [ ] Team committed
- [ ] Capacity considered
- [ ] Risks identified
