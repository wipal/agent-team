---
name: technical-decision
description: |
  Technical decision-making framework for architects and Tech Leads. Use when:
  making architectural decisions, evaluating technologies, or when user mentions
  "decision", "choose", "evaluate", "ADR", "trade-off".
version: 1.0.0
category: leadership
tags:
  - decision-making
  - architecture
  - trade-offs
  - adr
depends_on:
  - adr-writing
recommends:
  - tech-selection
used_by: []
---

# Skill: Technical Decision

## Core Principle
**Every decision is a trade-off.** Document the why, not just the what.

## Decision Framework

```
1. Define the problem clearly
2. Identify constraints
3. Generate options
4. Evaluate trade-offs
5. Make decision
6. Document rationale
7. Set review date
```

## Hard Rules

1. **NEVER decide alone** - Involve stakeholders
2. **NEVER decide without data** - Evidence over opinion
3. **ALWAYS consider reversibility** - Type 1 vs Type 2 decisions
4. **ALWAYS set a review date** - Decisions age

## Decision Types

| Type | Reversibility | Approach |
|------|---------------|----------|
| **Type 1** | Irreversible | Deliberate, careful |
| **Type 2** | Reversible | Quick, iterate |

## Decision Matrix

```markdown
# Decision: Choose Database for User Service

## Options Evaluated
| Criteria | PostgreSQL | MongoDB | DynamoDB |
|----------|------------|---------|----------|
| ACID compliance | ✅ Strong | ❌ Weak | ❌ Limited |
| Scalability | ⚠️ Manual | ✅ Built-in | ✅ Built-in |
| Query flexibility | ✅ High | ✅ High | ❌ Limited |
| Team expertise | ✅ High | ⚠️ Medium | ❌ Low |
| Cost (our scale) | ✅ Low | ⚠️ Medium | ⚠️ Medium |

## Decision
PostgreSQL

## Rationale
- Team has deep expertise
- ACID compliance required for financial data
- Scale fits single-node for 2+ years
- Cost effective for our usage

## Trade-offs Accepted
- Manual scaling required
- Sharding complexity if we 10x

## Review Date
Q4 2024 - Re-evaluate if users exceed 1M
```

## Evaluation Criteria

### Technical
- Performance
- Scalability
- Security
- Reliability
- Maintainability

### Business
- Cost
- Time to market
- Team expertise
- Vendor lock-in
- Community support

### Risk
- Complexity
- Maturity
- Adoption
- Support availability

## ADR Template

```markdown
# ADR-001: Use PostgreSQL for User Service

## Status
Accepted

## Context
User service needs to store and query user data with ACID guarantees.

## Decision
Use PostgreSQL as the primary database.

## Consequences

### Positive
- Strong ACID compliance
- Team expertise available
- Mature tooling
- Cost effective

### Negative
- Manual scaling required
- Sharding complexity at scale

### Risks
- May need migration if we exceed 10M users

## Alternatives Considered
1. MongoDB - Rejected due to weak ACID
2. DynamoDB - Rejected due to team inexperience
3. CockroachDB - Rejected due to cost

## Review Date
2024-Q4
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Deciding alone | Involve stakeholders |
| No alternatives | Always evaluate 2-3 options |
| No documentation | Write ADR |
| No review date | Set calendar reminder |
| Ignoring trade-offs | Document what you're giving up |

## Checklist

- [ ] Problem clearly defined
- [ ] Alternatives evaluated
- [ ] Trade-offs documented
- [ ] Stakeholders consulted
- [ ] Decision recorded in ADR
- [ ] Review date set
