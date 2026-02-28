---
name: requirements-gathering
description: |
  User requirements collection and analysis techniques. Use when: starting a new
  project, gathering stakeholder needs, defining scope, or when user mentions
  "requirements", "gather", "collect", "stakeholder", "needs", "scope".
version: 1.0.0
category: product
tags:
  - requirements
  - discovery
  - stakeholder
  - scope
depends_on: []
recommends:
  - user-stories
used_by:
  - user-stories
  - sprint-planning
---

# Skill: Requirements Gathering

## Core Principle
**Understand before building.** The cost of misunderstanding grows exponentially over time.

## Hard Rules

1. **NEVER assume** - Always verify with stakeholders
2. **NEVER skip documentation** - If it's not written, it doesn't exist
3. **ALWAYS prioritize** - Not everything is "must have"
4. **ALWAYS validate understanding** - Repeat back to stakeholders

## Requirements Types

| Type | Description | Example |
|------|-------------|---------|
| **Functional** | What the system does | "User can reset password" |
| **Non-Functional** | How the system performs | "Page loads in < 2s" |
| **Business** | Business goals | "Increase conversion by 10%" |
| **Technical** | Tech constraints | "Must use PostgreSQL" |

## Gathering Techniques

### 1. Interviews
```
Questions to ask:
- What problem are you trying to solve?
- Who will use this feature?
- What happens if this doesn't exist?
- What would success look like?
- What are the risks?
```

### 2. Workshops
```
Agenda:
1. Problem statement (15 min)
2. Current state analysis (30 min)
3. Future state vision (30 min)
4. Requirements brainstorming (45 min)
5. Prioritization (30 min)
```

### 3. Observation
```
Watch users:
- How they currently work
- Pain points they experience
- Workarounds they've created
```

## MoSCoW Prioritization

| Priority | Meaning | Action |
|----------|---------|--------|
| **Must** | Critical for launch | Do first |
| **Should** | Important but not critical | Do if time |
| **Could** | Nice to have | Do if extra time |
| **Won't** | Not this release | Backlog |

## Requirements Document

```markdown
# Feature: User Authentication

## Background
Users need to securely access their accounts.

## Business Goal
Reduce support tickets related to password issues by 50%.

## User Stories
1. As a user, I want to log in with email/password
2. As a user, I want to reset my password
3. As a user, I want to use social login

## Acceptance Criteria
- [ ] Login works with email/password
- [ ] Password reset sends email within 1 minute
- [ ] Google/Facebook login available
- [ ] All auth actions logged

## Non-Functional Requirements
- Login response time < 500ms
- Support 1000 concurrent logins
- 99.9% availability

## Out of Scope
- Biometric authentication
- Multi-factor auth (Phase 2)

## Dependencies
- Email service
- OAuth providers
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Vague requirements | Specific, measurable |
| No prioritization | Use MoSCoW |
| Missing edge cases | Ask "what if?" |
| No acceptance criteria | Define done |
| Scope creep | Strict change control |

## Checklist

- [ ] All stakeholders identified
- [ ] Requirements documented
- [ ] Priorities assigned
- [ ] Acceptance criteria defined
- [ ] Dependencies identified
- [ ] Risks documented
- [ ] Stakeholder sign-off
