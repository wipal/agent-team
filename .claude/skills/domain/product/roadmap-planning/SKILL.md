---
name: roadmap-planning
description: |
  Product roadmap creation and strategic planning. Use when: creating roadmaps,
  planning quarters, aligning stakeholders, or when user mentions "roadmap",
  "strategy", "quarterly plan", "product direction".
version: 1.0.0
category: product
tags:
  - roadmap
  - strategy
  - planning
  - quarterly
depends_on:
  - sprint-planning
recommends: []
used_by: []
---

# Skill: Roadmap Planning

## Core Principle
**Roadmaps are direction, not destination.** They guide decisions, not dictate them.

## Roadmap Horizons

| Horizon | Timeline | Focus |
|---------|----------|-------|
| **Now** | 0-3 months | Committed, detailed |
| **Next** | 3-6 months | Planned, flexible |
| **Later** | 6-12 months | Visionary, tentative |

## Hard Rules

1. **NEVER overpromise** - Roadmaps change
2. **NEVER set dates for "Later"** - Use quarters/themes
3. **ALWAYS tie to business goals** - Why are we doing this?
4. **ALWAYS review regularly** - Monthly updates

## Roadmap Template

```markdown
# Product Roadmap 2024

## Vision
Become the #1 platform for [domain] by [metric]

## Strategic Themes
1. **User Growth** - 3x registered users
2. **Revenue** - $10M ARR
3. **Retention** - 90% monthly retention

## Q1 2024 (Jan-Mar)

### Theme: Foundation
| Initiative | Status | Owner |
|------------|--------|-------|
| User authentication | Committed | Team A |
| Core feature X | Committed | Team B |
| Infrastructure setup | Committed | DevOps |

**Key Results:**
- 1000 users onboarded
- < 500ms response time
- 99.9% uptime

## Q2 2024 (Apr-Jun)

### Theme: Growth
| Initiative | Status | Owner |
|------------|--------|-------|
| Payment integration | Planned | Team A |
| Mobile app MVP | Planned | Team B |
| Analytics dashboard | Planned | Team C |

## Q3-Q4 2024 (Jul-Dec)

### Theme: Scale
- International expansion
- Enterprise features
- AI/ML capabilities
```

## Prioritization Framework

### RICE Score
```
RICE = (Reach × Impact × Confidence) / Effort

Reach: How many users affected? (per quarter)
Impact: How much will it move the metric? (0.25-3)
Confidence: How sure are we? (0.5-1.0)
Effort: Person-months required

Example:
Reach: 10,000 users
Impact: 1 (medium)
Confidence: 0.8 (high)
Effort: 2 person-months

RICE = (10000 × 1 × 0.8) / 2 = 4000
```

### Value vs Effort Matrix
```
        High Value
            │
   Quick    │   Big Bets
   Wins     │
────────────┼────────────
   Fill-ins │   Money Pits
            │
        Low Value

   Low Effort    High Effort
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Date-driven | Outcome-driven |
| Too detailed far out | Themes for later |
| No business alignment | Tie to OKRs |
| Set in stone | Review monthly |
| Missing dependencies | Cross-team planning |

## OKR Alignment

```markdown
## Objective: Grow user base significantly

### Key Results:
1. KR1: 10,000 new users by Q2
2. KR2: 40% activation rate
3. KR3: NPS score > 50

### Initiatives:
- Referral program (KR1)
- Onboarding optimization (KR2)
- Customer support improvements (KR3)
```

## Communication

### Executive Summary
```
1. What we're building (1 sentence)
2. Why it matters (business value)
3. When it's coming (quarter)
4. What we need (resources)
```

### Stakeholder Update
```
Since last update:
- Shipped: [features]
- Progress: [initiatives]
- Blocked: [blockers]
- Next: [upcoming]
```

## Checklist

- [ ] Tied to business goals
- [ ] Prioritized with framework
- [ ] reviewed monthly
- [ ] Communicated to stakeholders
- [ ] Flexible to change
