---
name: user-stories
description: |
  User story writing and refinement following agile best practices. Use when:
  writing user stories, breaking down features, defining acceptance criteria,
  or when user mentions "user story", "story", "acceptance criteria", "INVEST".
version: 1.0.0
category: product
tags:
  - user-stories
  - agile
  - acceptance-criteria
  - backlog
depends_on:
  - requirements-gathering
recommends: []
used_by:
  - sprint-planning
---

# Skill: User Stories

## Core Principle
**User stories describe value, not tasks.** Focus on who needs what and why, not how.

## User Story Format

```
As a [type of user],
I want [goal/desire],
So that [benefit/value].
```

## INVEST Criteria

| Letter | Meaning | Check |
|--------|---------|-------|
| **I** | Independent | Can be developed alone |
| **N** | Negotiable | Details can be discussed |
| **V** | Valuable | Provides user value |
| **E** | Estimable | Team can estimate effort |
| **S** | Small | Fits in one sprint |
| **T** | Testable | Has clear acceptance criteria |

## Hard Rules

1. **NEVER write tasks as stories** - Stories deliver value
2. **NEVER skip acceptance criteria** - How do we know it's done?
3. **ALWAYS include the "why"** - So that...
4. **ALWAYS keep stories small** - Split large stories

## Good vs Bad Stories

```markdown
❌ Bad: As a user, I want a login page
✅ Good: As a returning user, I want to log in quickly so I can access my account

❌ Bad: Implement password reset
✅ Good: As a forgetful user, I want to reset my password so I can regain access to my account

❌ Bad: As an admin, I want to manage users
✅ Good: As an admin, I want to deactivate user accounts so I can revoke access for terminated employees
```

## Acceptance Criteria

```markdown
## Story: User can reset password

### Acceptance Criteria
- [ ] Given I'm on the login page, when I click "Forgot password", then I see the reset form
- [ ] Given I enter a valid email, when I submit, then I receive a reset link within 5 minutes
- [ ] Given I click the reset link, when I enter a new password, then my password is updated
- [ ] Given I use an expired link, when I try to reset, then I see an error message
- [ ] Given I enter an unregistered email, when I submit, then I see a generic success message (security)
```

## Story Breakdown

```
Large Story:
"As a user, I want to manage my profile"

Break down into:
1. "As a user, I want to view my profile information"
2. "As a user, I want to update my name and email"
3. "As a user, I want to change my password"
4. "As a user, I want to upload a profile picture"
5. "As a user, I want to delete my account"
```

## Story Template

```markdown
# [Story ID] [Title]

## User Story
As a [role],
I want [feature],
So that [benefit].

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Notes
- API endpoint: POST /api/users/reset-password
- Email template: password-reset.html

## Dependencies
- Email service must be configured

## Estimate
Story Points: 5

## Definition of Done
- [ ] Code complete
- [ ] Unit tests passing
- [ ] Code review approved
- [ ] QA tested
- [ ] Documentation updated
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Missing "so that" | Add the why |
| Too technical | Focus on user value |
| Too large | Break into smaller stories |
| Vague acceptance criteria | Use Given/When/Then |
| No estimate | Add story points |

## Checklist

- [ ] Follows INVEST criteria
- [ ] Has clear acceptance criteria
- [ ] Includes user benefit
- [ ] Estimated by team
- [ ] Dependencies identified
