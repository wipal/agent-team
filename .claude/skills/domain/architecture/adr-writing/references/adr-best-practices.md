# ADR Best Practices

## Writing ADRs

### 1. Start with Context
```
Good context explains:
- What is the problem?
- Why does it matter?
- What constraints exist?
- Who is affected?

❌ Bad:
"We decided to use Kubernetes."

✅ Good:
"Our deployment process takes 4 hours and requires 3 people.
We deploy 5 times per week, spending 60 person-hours on deployments.
The business needs faster time-to-market for features."
```

### 2. Be Specific in Decisions
```
❌ Bad:
"We'll use microservices."

✅ Good:
"We will split the application into 5 services:
1. User Service (authentication, profiles)
2. Order Service (order lifecycle)
3. Catalog Service (products, categories)
4. Inventory Service (stock management)
5. Notification Service (emails, SMS)

Communication: REST over HTTP
Data: Each service owns its database"
```

### 3. Be Honest About Consequences
```
❌ Bad (hiding negatives):
"Consequences: Faster development, better scalability."

✅ Good (honest):
"Consequences:
Positive:
- Independent deployment
- Team autonomy

Negative:
- Operational complexity increases
- Debugging becomes harder
- Need for service mesh

Risks:
- Data consistency across services
- Network latency"
```

### 4. Document Alternatives
```
Always explain why alternatives were rejected:

Option 1: Build in-house
- Pros: Full control, no licensing
- Cons: 6 months development, ongoing maintenance
- Why not: Time to market critical, team bandwidth limited

Option 2: Buy existing solution
- Pros: Immediate availability, support
- Cons: $50k/year, customization limits
- Why not: Cost exceeds budget, overkill for needs
```

## ADR Numbering

### Sequential Numbering
```
ADR-001: Database Selection
ADR-002: API Gateway Choice
ADR-003: Authentication Strategy
...

Simple and widely used.
```

### Category Prefixes (Alternative)
```
ADR-DB-001: Database Selection
ADR-API-001: API Gateway
ADR-SEC-001: Authentication
...

Good for large projects with many ADRs.
```

## ADR Review Process

### Proposal Stage
```
1. Author writes ADR with "Proposed" status
2. Share with relevant stakeholders
3. Schedule review meeting (30 min)
4. Gather feedback
5. Iterate on ADR
```

### Acceptance
```
1. Decision makers approve
2. Update status to "Accepted"
3. Record decision date
4. Communicate to broader team
5. Begin implementation
```

### Rejection
```
If ADR is rejected:
1. Update status to "Rejected"
2. Document why rejected
3. Keep ADR for historical record
4. Don't delete - others may propose same thing
```

## Common Mistakes

### 1. Too Long
```
❌ Bad: 10-page ADR with implementation details
✅ Good: 1-2 pages, implementation in separate docs

Keep ADRs focused on the decision.
Details go in design docs.
```

### 2. Missing Context
```
❌ Bad: "We chose Kafka."
       (Why? What problem?)

✅ Good: "Our event pipeline needs to process 100k events/sec.
       RabbitMQ maxes out at 50k. Kafka handles 1M+."
```

### 3. No Alternatives
```
❌ Bad: Decision without alternatives
✅ Good: At least 2-3 alternatives considered

If you didn't consider alternatives, you didn't make a decision.
```

### 4. Outdated Status
```
❌ Bad: ADR-001 shows "Proposed" from 2 years ago
✅ Good: Status kept current throughout lifecycle
```

### 5. Orphaned ADRs
```
❌ Bad: ADRs in random locations, no index
✅ Good: Centralized location with index/README
```

## ADR Index Template

```markdown
# Architecture Decision Records

## Active Decisions

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-015](ADR-015-jwt-auth.md) | JWT Authentication | Accepted | 2024-06-15 |
| [ADR-014](ADR-014-graphql.md) | GraphQL API | Accepted | 2024-05-20 |
| [ADR-016](ADR-016-observability.md) | Observability Stack | Proposed | 2024-06-20 |

## Superseded/Deprecated

| ADR | Title | Superseded By | Date |
|-----|-------|---------------|------|
| [ADR-003](ADR-003-redis-sessions.md) | Redis Sessions | ADR-015 | 2024-06-15 |
| [ADR-001](ADR-001-mysql.md) | MySQL Database | ADR-010 | 2024-03-01 |

## By Category

### Data
- ADR-010: PostgreSQL Migration
- ADR-011: Data Retention Policy

### API
- ADR-005: GraphQL for Public API
- ADR-006: API Versioning Strategy

### Security
- ADR-015: JWT Authentication
- ADR-008: Encryption Standards
```

## Retrospective ADRs

Sometimes you need to document decisions made earlier:

```markdown
# ADR-001: Use React for Frontend

## Status
Accepted (Retrospective)

## Context
This ADR documents a decision made in January 2023,
before we started the ADR process.

## Decision
[Document what was decided]

## Consequences
[Document the actual consequences observed]
```

## Tools

### ADR Tools
```
- adr-tools (CLI): GitHub.com/npryce/adr-tools
- log4brains (Web): GitHub.com/thomvaill/log4brains
- ADR Manager (VS Code extension)
- Notion/Confluence templates
```

### Integration with Development
```
1. Keep ADRs in git (same repo as code)
2. Link ADRs from code comments
3. Reference ADRs in PRs
4. Include ADR number in commit messages

Example:
git commit -m "feat(orders): implement saga pattern

Implements compensating transactions as described
in ADR-010.

Refs: ADR-010"
```

## Metrics

### Track ADR Health
```
- Total ADRs
- Proposed but not reviewed (> 2 weeks)
- Accepted without implementation (> 1 month)
- Deprecated without migration plan
- Average time from proposed to accepted
```
