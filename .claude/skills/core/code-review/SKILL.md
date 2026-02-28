---
name: code-review
description: |
  Systematic code review with technical rigor. Use when reviewing PRs,
  before commits, after implementing features, doing security audits,
  or when user mentions "review", "check code", "look at this code",
  "PR review", "code quality check". Automatically trigger after
  completing significant code changes.
version: 1.0.0
category: core
tags:
  - review
  - quality
  - best-practices
depends_on: []
recommends: []
used_by:
  - frontend-design
  - api-design
  - database-design
  - code-review-advanced
---

# Skill: Code Review

## Core Principle
**Technical correctness over social comfort.**
Be honest, thorough, and helpful. A good review prevents bugs in production.

## Hard Rules

1. **NEVER approve without thorough review** - Read all changed files
2. **NEVER use vague comments** - "LGTM" without specifics is useless
3. **ALWAYS explain WHY** - Not just what's wrong, but why it matters
4. **ALWAYS check security** - Every review includes security check
5. **ALWAYS verify tests exist** - Code without tests is incomplete

## Review Checklist (Fast Track)

### Must Check (60 seconds)
- [ ] Logic correct?
- [ ] Edge cases handled?
- [ ] Errors handled?
- [ ] No security issues?
- [ ] Tests exist?

### Should Check (2 minutes)
- [ ] Readable code?
- [ ] No unnecessary complexity?
- [ ] Names are meaningful?
- [ ] Performance acceptable?

### Nice to Check (5 minutes)
- [ ] Well-documented?
- [ ] Follows project conventions?
- [ ] Maintainable long-term?

## Feedback Format

### Blocking Issue
```markdown
🔴 **Issue:** [Clear description]

**Why:** [Why this is a problem]

**Fix:** [Specific suggestion with code example]

**File:** `path/to/file.ts:42`
```

### Suggestion (Non-blocking)
```markdown
⚠️ **Suggestion:** [Description]

**Why:** [Optional context]

**Consider:** [Alternative approach]
```

### Positive Feedback
```markdown
✅ **Good:** [What's good and why]
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| "LGTM" without reading | Read ALL changed files |
| Vague: "looks weird" | Specific: "N+1 query on line 42" |
| Style nitpicks | Use linter, focus on logic |
| Only finding problems | Acknowledge good patterns |
| Blocking without fix | Always suggest solution |
| Personal tone | Focus on code, not person |

## Output Format

```markdown
## Code Review: [PR/File Name]

### Summary
[1-2 sentences on overall assessment]

### 🔴 Must Fix
1. [Issue 1] → `file:line`
2. [Issue 2] → `file:line`

### ⚠️ Suggestions
1. [Suggestion 1]
2. [Suggestion 2]

### ✅ Good Patterns
1. [What was done well]

**Verdict:** Approve / Request Changes
```

## Example Review

```markdown
## Code Review: Add user authentication

### Summary
Clean implementation of JWT auth. A few security improvements needed.

### 🔴 Must Fix

1. **Missing rate limiting on login endpoint**
   Why: Vulnerable to brute force attacks
   Fix: Add rate limiter middleware
   File: `src/routes/auth.ts:23`

2. **Password in logs**
   Why: Security leak
   Fix: Remove console.log or sanitize
   File: `src/services/auth.ts:45`

### ⚠️ Suggestions

1. Consider extracting token validation to middleware
2. Add refresh token rotation

### ✅ Good Patterns
1. Zod validation on all inputs
2. Proper error handling with custom errors

**Verdict:** Request Changes (2 issues)
```

## Integration

- After **review**: Run `/retrospect-work` to extract patterns
- Before **git-commit**: Quick review of staged changes
- During **debugging**: Review related code for issues
