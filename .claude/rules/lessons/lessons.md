# Lessons Learned

> **Purpose:** Track patterns and corrections to continuously improve
> **Update:** After receiving user corrections or discovering new patterns

---

## Format

### YYYY-MM-DD: [Lesson Title]
**What happened:** [Description of the situation]
**Context:** [When/where this occurred]
**Lesson:** [What we learned]
**Rule added:** [Rule to prevent same mistake]
**Code example:** (if applicable)

```typescript
// ✅ Good
good_code_here();

// ❌ Bad
bad_code_here();
```

---

## Pattern Promotion

| Stage | Condition | Location |
|-------|-----------|----------|
| **Lesson** | New finding | lessons.md |
| **Pattern** | Used 3+ times successfully | knowledge.md |
| **Skill** | High confidence, reusable | SKILL.md |
| **Rule** | Proven reliable | rules/ |

---

## Recent Lessons

### 2025-02-25: Always verify before claiming done
**What happened:** Claimed task was complete without running verification
**Context:** Implementing a feature
**Lesson:** Never mark task complete without proving it works
**Rule added:** "Run verification command before claiming success"

### 2025-02-25: Check Context7 before using APIs
**What happened:** Used outdated API that had changed
**Context:** Implementing with external library
**Lesson:** Always check Context7 for latest documentation
**Rule added:** "Use Context7 before any API implementation"

---

## Common Pitfalls to Avoid

### Frontend
- ❌ Using `useEffect` for derived state
- ❌ Storing props in state
- ❌ Missing loading/error states
- ❌ Prop drilling instead of context

### Backend
- ❌ N+1 queries
- ❌ Missing error handling
- ❌ Hardcoded configuration
- ❌ SQL injection (use parameterized queries)

### General
- ❌ Committing without verification
- ❌ Over-engineering simple solutions
- ❌ Not handling edge cases
- ❌ Ignoring user corrections

---

## Corrections Received

### [Date]: [Correction Description]
**From:** User/Reviewer
**What was wrong:** [Description]
**What I did:** [How I fixed it]
**Pattern identified:** [The underlying pattern]

---

## Statistics

- Total lessons: 2
- This week: 2
- This month: 2
- Most common category: Verification
