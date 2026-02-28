---
name: adr-writing
description: |
  Use when documenting architecture decisions. Architecture Decision Records (ADRs)
  capture the context, decision, and consequences of important technical choices.
version: 1.0.0
category: documentation
tags:
  - adr
  - architecture-decisions
  - documentation
dependencies: []
references:
  - references/adr-template.md
  - references/adr-examples.md
  - references/adr-best-practices.md
---

# ADR Writing

## Core Principle
**Document decisions, not just code. Every significant choice deserves a record.**

## When to Use This Skill

### Trigger Conditions
- Making a significant architectural decision
- Choosing between technologies
- Changing an existing decision
- Evaluating trade-offs
- Need to justify a decision to stakeholders

### Keywords
- "we decided to"
- "architecture decision"
- "why did we choose"
- "document this decision"
- "ADR"

## What is an ADR?

An Architecture Decision Record is a short document that captures:
1. **Context** - Why are we making this decision?
2. **Decision** - What is the change?
3. **Consequences** - What happens as a result?

```
ADR-001: Use PostgreSQL for Primary Database

Status: Accepted

Context:
We need a relational database that supports ACID transactions...

Decision:
We will use PostgreSQL as our primary database...

Consequences:
- Team needs PostgreSQL expertise
- We get strong consistency guarantees
- Limited horizontal scaling compared to NoSQL...
```

## ADR Template

```markdown
# ADR-XXX: [Short Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-YYY]

## Context
[What is the issue that we're seeing?]
[What is the business context?]
[What are the constraints?]
[What options were considered?]

## Decision
[What is the change that we're proposing/have made?]
[Be specific and concrete.]

## Consequences

### Positive
- [What becomes easier?]
- [What benefits do we get?]

### Negative
- [What becomes harder?]
- [What trade-offs are we making?]

### Risks
- [What could go wrong?]
- [What mitigations exist?]

## Alternatives Considered
1. **Option A**: [Description]
   - Pros: ...
   - Cons: ...
   - Why not chosen: ...

2. **Option B**: [Description]
   - Pros: ...
   - Cons: ...
   - Why not chosen: ...

## Related Decisions
- ADR-XXX: [Related decision]
- ADR-YYY: [Depends on]

## References
- [Link to relevant documentation]
- [Link to discussion]
```

## Decision Categories

### When to Write an ADR
```
✅ Architecture decisions
   - System structure
   - Service boundaries
   - Data flow patterns

✅ Technology choices
   - Frameworks
   - Databases
   - Cloud services

✅ Security decisions
   - Authentication approach
   - Encryption strategy
   - Access control model

✅ Performance decisions
   - Caching strategy
   - Scaling approach
   - Database sharding

✅ Process decisions
   - Deployment strategy
   - Testing approach
   - Code organization
```

### When NOT to Write an ADR
```
❌ Trivial decisions (variable naming)
❌ Reversible decisions (temporary workaround)
❌ Team-specific conventions (coding style)
❌ Decisions already documented elsewhere
```

## ADR Lifecycle

```
┌──────────────────────────────────────────────────────┐
│                  ADR Lifecycle                        │
├──────────────────────────────────────────────────────┤
│                                                       │
│   ┌──────────┐                                       │
│   │ Proposed │ ─── Write initial ADR                 │
│   └────┬─────┘                                       │
│        │                                             │
│        │ Team review, discussion                     │
│        ▼                                             │
│   ┌──────────┐                                       │
│   │ Accepted │ ─── Decision is active                │
│   └────┬─────┘                                       │
│        │                                             │
│        │ Context changes, better option found        │
│        ▼                                             │
│   ┌───────────┐                                      │
│   │Deprecated │ ─── No longer recommended            │
│   └─────┬─────┘     but still in use                 │
│         │                                            │
│         │ Replacement decision made                  │
│         ▼                                            │
│   ┌────────────┐                                     │
│   │ Superseded │ ─── Replaced by new ADR             │
│   │ by ADR-YYY │     Reference new ADR               │
│   └────────────┘                                     │
│                                                       │
└──────────────────────────────────────────────────────┘
```

## Best Practices

### Writing Style
```
DO:
✅ Be concise (1-2 pages max)
✅ Use active voice
✅ Include concrete examples
✅ Document alternatives considered
✅ Update status over time
✅ Link related ADRs
✅ Include date and author

DON'T:
❌ Write lengthy documents
❌ Use vague language
❌ Skip alternatives
❌ Ignore negative consequences
❌ Leave status as "Proposed" forever
❌ Create orphan ADRs
```

### Organization
```
Recommended structure:

docs/
└── architecture/
    └── adr/
        ├── README.md           # Index of all ADRs
        ├── ADR-001-database.md
        ├── ADR-002-auth.md
        ├── ADR-003-api-design.md
        ├── template.md
        └── images/
            └── ADR-001-diagram.png
```

## Rules

### DO
- ✅ Write ADR before major implementation
- ✅ Get peer review before accepting
- ✅ Include both pros and cons
- ✅ Keep ADRs in version control
- ✅ Review ADRs periodically
- ✅ Link to supporting documentation

### DON'T
- ❌ Write ADR after the fact (unless retroactive)
- ❌ Hide negative consequences
- ❌ Make ADRs too long
- ❌ Forget to update status
- ❌ Delete old ADRs (supersede instead)

## Output

When writing an ADR:
1. Create file: `docs/architecture/adr/ADR-XXX-title.md`
2. Update ADR index
3. Link from relevant documentation
4. Share with team for review
5. Update status after acceptance

## Related Skills
- `tech-selection` - Making technology choices
- `system-design` - System design decisions
- `architecture-patterns` - Pattern selection decisions
