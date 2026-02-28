---
name: git-automation
description: |
  Git workflow automation for commits, branches, and PRs using conventional commits.
  Use when: creating commits, making branches, creating PRs, merging code,
  or when user mentions "commit", "branch", "PR", "push", "merge", "git".
  Automatically suggest conventional commit format for all commits.
version: 1.0.0
category: core
tags:
  - git
  - automation
  - workflow
depends_on: []
recommends: []
used_by:
  - ci-cd
---

# Skill: Git Automation

## Core Principle
**Clean git history through consistent conventions.**
Every commit should tell a story.

## Hard Rules

1. **ALWAYS use conventional commits** - `type(scope): description`
2. **NEVER commit directly to main** - Use feature branches
3. **NEVER force push to shared branches** - Use rebase carefully
4. **ALWAYS write meaningful descriptions** - Not just "fix bug"

## Conventional Commits

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore, perf, ci
```

**Examples:**
- `feat(auth): add JWT token refresh`
- `fix(api): handle null response from user service`
- `refactor(db): optimize user query performance`

## Branch Naming

```
<type>/<ticket>-<description>

Types: feature, fix, refactor, docs, test, chore
Examples: feature/AUTH-123-add-login, fix/AUTH-456-token-expiry
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| "fix bug" | `fix(auth): handle expired tokens` |
| Commit to main | Create feature branch first |
| Force push shared | Rebase locally, push normally |
| Huge commits | Break into logical chunks |

## Quick Commands

```bash
# Create branch
git checkout -b feature/TICKET-123-description

# Stage & commit
git add src/features/auth/
git commit -m "feat(auth): add login validation"

# Push & PR
git push -u origin feature/TICKET-123-description
gh pr create --title "feat(auth): add login validation"
```

## PR Template

```markdown
## What
[Brief description]

## Why
[Context]

## Testing
- [ ] Tests added
- [ ] Manual testing done

Closes #TICKET
```
