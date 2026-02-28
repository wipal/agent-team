# ADR Template

This is the standard template for Architecture Decision Records.

---

# ADR-XXX: [Title]

## Meta
- **Status**: [Proposed | Accepted | Deprecated | Superseded]
- **Date**: YYYY-MM-DD
- **Decision Makers**: @username1, @username2
- **Consulted**: @username3, @username4
- **Informed**: @team-name

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-YYY]

If Superseded, link to the new ADR.

## Context

### Problem Statement
[What is the issue that we're seeing? What problem needs to be solved?]

### Business Context
[Why is this important? What business need drives this?]

### Technical Context
[What is the current technical situation?]
[What constraints exist?]

### Requirements
- Requirement 1
- Requirement 2
- Requirement 3

### Constraints
- Constraint 1 (e.g., budget, timeline, team expertise)
- Constraint 2
- Constraint 3

## Decision

### Summary
[One sentence summary of the decision]

### Details
[Detailed description of the decision. Be specific and concrete.]

### Implementation
[How will this be implemented? What are the steps?]

### Timeline
[When will this be implemented?]

## Consequences

### Positive
1. [Benefit 1]
2. [Benefit 2]
3. [Benefit 3]

### Negative
1. [Drawback 1]
2. [Drawback 2]
3. [Drawback 3]

### Neutral
1. [Side effect 1 - neither good nor bad]
2. [Side effect 2]

### Risks and Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Risk 1 | High/Medium/Low | High/Medium/Low | How to mitigate |
| Risk 2 | ... | ... | ... |

## Alternatives Considered

### Option 1: [Name]
**Description**: [Brief description]

**Pros**:
- Pro 1
- Pro 2

**Cons**:
- Con 1
- Con 2

**Why not chosen**: [Reason]

### Option 2: [Name]
**Description**: [Brief description]

**Pros**:
- Pro 1
- Pro 2

**Cons**:
- Con 1
- Con 2

**Why not chosen**: [Reason]

### Option 3: [Name]
[Same structure]

## Decision Criteria
| Criteria | Weight | Option 1 | Option 2 | Option 3 |
|----------|--------|----------|----------|----------|
| [Criterion 1] | 25% | 5/5 | 3/5 | 4/5 |
| [Criterion 2] | 25% | 4/5 | 5/5 | 3/5 |
| [Criterion 3] | 25% | 3/5 | 4/5 | 5/5 |
| [Criterion 4] | 25% | 4/5 | 3/5 | 4/5 |
| **Total** | 100% | **4.0** | **3.75** | **4.0** |

## Related Decisions
- ADR-XXX: [Title] - [Relationship description]
- ADR-YYY: [Title] - [Relationship description]

## References
- [Link to relevant documentation]
- [Link to RFC or proposal]
- [Link to meeting notes]
- [Link to external articles]

## Notes
[Any additional notes or context]

## Review History
| Date | Reviewer | Action | Notes |
|------|----------|--------|-------|
| YYYY-MM-DD | @username | Reviewed | [Feedback] |
| YYYY-MM-DD | @username | Approved | [Comments] |

---

## Quick Template (Minimal)

```markdown
# ADR-XXX: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-YYY]

## Context
[Why are we making this decision?]

## Decision
[What is the change?]

## Consequences
- [What becomes easier/harder?]

## Alternatives Considered
- Option A: [Why not chosen]
- Option B: [Why not chosen]
```
