---
name: stakeholder-communication
description: |
  Stakeholder management and communication strategies. Use when: managing
  expectations, reporting progress, handling conflicts, or when user mentions
  "stakeholder", "communication", "status report", "expectations".
version: 1.0.0
category: product
tags:
  - stakeholder
  - communication
  - management
  - reporting
depends_on: []
recommends: []
used_by: []
---

# Skill: Stakeholder Communication

## Core Principle
**No surprises.** Stakeholders should hear news from you first, whether good or bad.

## Stakeholder Types

| Type | Interest | Influence | Strategy |
|------|----------|-----------|----------|
| **Sponsor** | High | High | Engage closely |
| **Champion** | High | Low | Keep informed |
| **Blocker** | Low | High | Manage carefully |
| **Observer** | Low | Low | Keep aware |

## Hard Rules

1. **NEVER surprise stakeholders** - Communicate early
2. **NEVER overpromise** - Under-promise, over-deliver
3. **ALWAYS be transparent** - Especially about problems
4. **ALWAYS tailor the message** - Technical vs business

## Communication Plan

```markdown
# Stakeholder Communication Plan

## Weekly
- Team standup summary
- Blockers and risks
- Key metrics

## Bi-weekly
- Sprint review outcomes
- Demo of completed work
- Next sprint preview

## Monthly
- Roadmap progress
- Budget status
- Risk assessment

## As Needed
- Critical issues
- Scope changes
- Major milestones
```

## Status Report Template

```markdown
# [Project Name] Status - Week of [Date]

## Executive Summary
🟢 On Track / 🟡 At Risk / 🔴 Off Track

## This Week
- ✅ Completed: [items]
- 🔄 In Progress: [items]
- ⏳ Blocked: [items + blockers]

## Next Week
- [ ] [Planned items]

## Key Metrics
| Metric | Target | Actual | Trend |
|--------|--------|--------|-------|
| Velocity | 30 | 28 | ↓ |
| Bugs | <5 | 3 | ✅ |
| Coverage | >80% | 85% | ✅ |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| API delay | Medium | High | Started mock service |

## Decisions Needed
- [Decision 1] - Need approval by [date]

## Ask
- [Any resources or support needed]
```

## Handling Bad News

### Framework: SBI
```
1. Situation: What happened (facts only)
2. Behavior: What was done / not done
3. Impact: What this means for the project
```

### Example
```
"I need to share some concerning news.

Situation: The payment provider integration is delayed by 2 weeks.
Behavior: They're waiting for compliance approval.
Impact: We won't be able to accept payments until [date].

Here's what we're doing about it:
- Exploring alternative providers
- Adjusting the launch timeline
- Adding a manual payment option

I wanted you to know now so we can plan accordingly."
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Only reporting good news | Be transparent |
| Too technical | Tailor audience |
| Infrequent updates | Regular cadence |
| No clear ask | Be specific |
| Ignoring concerns | Address head-on |

## Meeting Types

### Sprint Review
```
1. Sprint goal review (5 min)
2. Demo completed work (20 min)
3. Metrics review (10 min)
4. Q&A and feedback (15 min)
5. Next sprint preview (10 min)
```

### Executive Update
```
1. Headline status (1 min)
2. Key achievements (2 min)
3. Risks and mitigations (3 min)
4. Decisions needed (2 min)
5. Q&A (7 min)
```

## Checklist

- [ ] Stakeholders identified
- [ ] Communication plan created
- [ ] Regular cadence established
- [ ] Bad news delivered early
- [ ] Feedback incorporated
