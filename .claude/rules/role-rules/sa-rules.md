# SA Rules - Rules riêng cho Solution Architects

> **Nguồn tham khảo:** Software Architecture patterns, AWS Architecture Well-Architected Framework, Google Cloud Architecture Framework, Microsoft Azure Architecture Center

---

## Architecture Design Rules

### 1. Document Before Implement
- ALWAYS write ADR before major architecture decisions
- Get stakeholder review before implementation begins
- Revisit and update decisions when context changes
- Keep ADRs in version control alongside code

### 2. Think in Trade-offs
- No solution is perfect - every choice has pros and cons
- Always document both positive and negative consequences
- Consider build vs buy for every component
- Evaluate at least 2-3 options before deciding

### 3. Start Simple, Evolve
- YAGNI (You Aren't Gonna Need It) - don't over-engineer
- Design for current scale + 10x, not 1000x
- Avoid premature optimization
- Make reversible decisions when possible
- Build for change, not for perfection

### 4. Design for Failure
- Assume every component will fail at some point
- Implement circuit breakers, retries with exponential backoff
- Have rollback plans for every change
- Design graceful degradation, not just fail-stop
- Test failure scenarios regularly

### 5. Security by Design
- Threat model every design decision
- Apply least privilege principle everywhere
- Defense in depth - multiple security layers
- Never trust user input
- Encrypt data at rest and in transit
- Plan for security incidents

---

## Technology Selection Rules

### 1. Use Decision Framework
- Create evaluation matrix with weighted criteria
- Score options objectively with evidence
- Get team input and buy-in
- Document the decision process

### 2. Consider Total Cost of Ownership
- Not just licensing/subscription costs
- Training and learning curve
- Hiring and retention (can you find talent?)
- Maintenance and operational burden
- Migration and integration costs
- Opportunity cost

### 3. Prefer Proven Technology
- Avoid 1.0 syndrome for critical systems
- Community size and activity matters
- Enterprise support availability
- Documentation quality
- Real-world production usage

### 4. POC When Uncertain
- Build small prototype to test assumptions
- Focus on risky or unknown aspects
- Time-box exploration (don't gold-plate)
- Document findings and share with team
- Kill failed experiments quickly

---

## Documentation Rules

### 1. ADR for All Major Decisions
- Use consistent template across all ADRs
- Include context, decision, consequences
- Document alternatives considered
- Update status over time (Proposed → Accepted → Deprecated)
- Link related ADRs together

### 2. Diagram Standards
- Use C4 model for system context
- Mermaid for version-controlled diagrams
- Keep diagrams updated with code changes
- Include both high-level and detailed views
- Annotate with decision references

### 3. Decision Reversibility
- Mark decisions as reversible or irreversible
- Plan rollback paths for reversible decisions
- Document dependencies between decisions
- Review irreversible decisions more carefully

---

## Communication Rules

### 1. Stakeholder Alignment
- Present options, not just decisions
- Explain trade-offs in business terms
- Get sign-off before major implementation
- Keep stakeholders informed of changes

### 2. Team Collaboration
- Involve Tech Lead in implementation planning
- Consult Dev-FE/BE on technical feasibility
- Work with DevOps on deployment strategy
- Include Security early in design process

### 3. Knowledge Sharing
- Present architecture decisions to team
- Create onboarding documentation
- Conduct architecture review sessions
- Mentor developers on architectural thinking

---

## Anti-Patterns to Avoid

### Architecture Anti-Patterns

| Anti-Pattern | Description | Better Approach |
|--------------|-------------|-----------------|
| **Big Design Up Front (BDUF)** | Too much planning upfront | Iterative design, evolve as you learn |
| **Resume-driven development** | Choosing tech for CV | Evaluate based on project needs |
| **Golden hammer** | One solution for everything | Match solution to problem |
| **Not invented here** | Always build vs buy | Evaluate build vs buy honestly |
| **Copy-paste architecture** | Copying without understanding | Understand before adopting |
| **Over-engineering** | Premature optimization | Start simple, measure, optimize |
| **Under-engineering** | Ignoring NFRs | Consider all quality attributes |
| **Architecture by implication** | Assumptions not documented | Document all decisions explicitly |

### Process Anti-Patterns

| Anti-Pattern | Description | Better Approach |
|--------------|-------------|-----------------|
| **Designing in isolation** | No stakeholder input | Collaborate early and often |
| **Ignoring operations** | Deployability as afterthought | Design for operations |
| **Security as afterthought** | Add security later | Security by design |
| **Skipping POC** | Untested assumptions | Validate risky choices |
| **No documentation** | Decisions without context | Write ADRs |
| **Analysis paralysis** | Endless evaluation | Time-box decisions |
| **HiPPO effect** | Highest Paid Person's Opinion | Data-driven decisions |

---

## Quality Attributes Checklist

When designing systems, always consider:

### Performance
- [ ] Response time requirements defined
- [ ] Throughput requirements defined
- [ ] Caching strategy defined
- [ ] Database query optimization plan

### Scalability
- [ ] Horizontal scaling capability
- [ ] Vertical scaling limits understood
- [ ] Auto-scaling strategy
- [ ] Data partitioning strategy

### Availability
- [ ] Uptime requirements defined (99.9%?)
- [ ] Failover strategy
- [ ] Disaster recovery plan
- [ ] Backup and restore procedures

### Security
- [ ] Authentication mechanism
- [ ] Authorization model
- [ ] Data encryption strategy
- [ ] Threat model completed

### Maintainability
- [ ] Code organization clear
- [ ] Documentation adequate
- [ ] Monitoring and alerting planned
- [ ] Debugging capability

### Cost
- [ ] Infrastructure cost estimated
- [ ] Cost optimization strategy
- [ ] Cost monitoring planned

---

## Review Checklist

Before finalizing any architecture:

### Functional
- [ ] All requirements addressed
- [ ] Edge cases considered
- [ ] Integration points identified

### Non-Functional
- [ ] Performance requirements met
- [ ] Scalability requirements met
- [ ] Availability requirements met
- [ ] Security requirements met

### Operational
- [ ] Deployment strategy defined
- [ ] Monitoring strategy defined
- [ ] Incident response plan exists
- [ ] Rollback plan exists

### Documentation
- [ ] ADRs written and reviewed
- [ ] Diagrams created and updated
- [ ] Runbooks created
- [ ] Team trained

---

## Related Documentation

- [General Rules](../common/general-rules.md)
- [Tech Lead Rules](./tech-lead-rules.md)
- [DevOps Rules](./devops-rules.md)
