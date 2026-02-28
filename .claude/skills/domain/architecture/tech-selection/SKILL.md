---
name: tech-selection
description: |
  Use when evaluating and selecting technologies for a project.
  Provides frameworks for objective comparison and decision making.
version: 1.0.0
category: architecture
tags:
  - technology
  - evaluation
  - selection
  - decision-framework
dependencies:
  - adr-writing
references:
  - references/evaluation-framework.md
  - references/build-vs-buy.md
  - references/tech-radar.md
---

# Technology Selection

## Core Principle
**Choose technology based on requirements, not trends. Fit the tool to the problem.**

## When to Use This Skill

### Trigger Conditions
- Starting a new project
- Evaluating alternatives for existing system
- Replacing deprecated technology
- Team wants to adopt new technology

### Keywords
- "choose technology"
- "evaluate options"
- "technology selection"
- "which framework"
- "build vs buy"

## Evaluation Framework

### Step 1: Define Requirements
```
Functional Requirements:
- What must the technology do?
- What features are required?
- What integrations needed?

Non-Functional Requirements:
- Performance requirements
- Scalability needs
- Security requirements
- Compliance requirements

Constraints:
- Budget constraints
- Timeline constraints
- Team expertise
- Infrastructure constraints
```

### Step 2: Create Evaluation Matrix
```
| Criteria       | Weight | Tech A | Tech B | Tech C |
|----------------|--------|--------|--------|--------|
| Performance    | 20%    | 4/5    | 5/5    | 3/5    |
| Scalability    | 15%    | 5/5    | 4/5    | 4/5    |
| Developer XP   | 15%    | 4/5    | 3/5    | 5/5    |
| Documentation  | 10%    | 5/5    | 4/5    | 4/5    |
| Community      | 15%    | 4/5    | 5/5    | 3/5    |
| Cost           | 15%    | 3/5    | 4/5    | 5/5    |
| Risk           | 10%    | 4/5    | 4/5    | 3/5    |
|----------------|--------|--------|--------|--------|
| Weighted Score | 100%   | 4.05   | 4.10   | 3.85   |
```

### Step 3: Evaluate Options
```
For each technology, assess:
1. Maturity - How long has it existed?
2. Adoption - Who else uses it?
3. Support - Commercial/community support?
4. Documentation - Quality and completeness?
5. Learning curve - Time to proficiency?
6. Ecosystem - Plugins, integrations?
7. Future outlook - Active development?
```

### Step 4: Prototype/POC
```
If uncertain:
1. Build small prototype
2. Test critical requirements
3. Involve team members
4. Document findings
5. Time-box the evaluation
```

### Step 5: Document Decision
```
Write ADR with:
- Evaluated options
- Scoring rationale
- Final decision
- Consequences
```

## Decision Criteria

### Technology Fit Criteria
```
1. Problem Fit
   - Does it solve our problem?
   - Is it over/under-engineered?

2. Team Fit
   - Does team have expertise?
   - Can team learn it quickly?
   - Is talent available to hire?

3. Organization Fit
   - Does it align with tech strategy?
   - Does it fit existing infrastructure?
   - Does it meet compliance needs?

4. Ecosystem Fit
   - Integration with existing tools?
   - Community support?
   - Long-term viability?
```

## Build vs Buy Decision

### When to Build
```
✅ Core competitive advantage
✅ Unique requirements
✅ Full control needed
✅ No suitable solution exists
✅ Long-term strategic value
✅ Team has expertise and time
```

### When to Buy
```
✅ Commodity functionality
✅ Faster time to market needed
✅ Team lacks expertise
✅ Maintenance burden too high
✅ Solution exists and is mature
✅ Not core to business
```

## Common Evaluation Pitfalls

### Avoid
```
❌ Resume-driven development
❌ Hype-driven decisions
❌ Not involving team
❌ Skipping POC for critical choices
❌ Ignoring operational concerns
❌ Underestimating learning curve
❌ Ignoring vendor lock-in
❌ Not considering total cost
```

## Output

When using this skill:
1. **Evaluation Matrix** - Scored comparison
2. **ADR** - Documented decision
3. **POC Report** - If prototype was built
4. **Migration Plan** - If replacing existing tech

## Rules

### DO
- ✅ Start with requirements, not solutions
- ✅ Evaluate at least 2-3 options
- ✅ Include team in evaluation
- ✅ Consider total cost of ownership
- ✅ Build POC for risky choices
- ✅ Document decision with ADR

### DON'T
- ❌ Choose based on trends/hype
- ❌ Make decision alone
- ❌ Ignore existing expertise
- ❌ Forget operational costs
- ❌ Skip documentation
