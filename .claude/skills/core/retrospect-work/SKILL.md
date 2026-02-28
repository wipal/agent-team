---
name: retrospect-work
description: |
  Extract patterns and lessons from work sessions for continuous self-improvement.
  Use this skill when: ending a work session, after receiving user corrections,
  after completing a feature, after fixing a bug, at end of day/week, or when
  user says "retrospect", "what did we learn", "update knowledge".
  This skill MUST run before ending any significant work session.
version: 1.0.0
category: core
tags:
  - self-improvement
  - learning
  - knowledge-extraction
depends_on: []
recommends: []
used_by:
  - code-review
---

# Skill: Retrospect Work

## Core Principle
**Learn from every session. If you don't extract lessons, you'll repeat mistakes.**

The difference between a junior and senior developer isn't just years of experience—it's how much they learn from each experience.

## When to Use

| Trigger | Example |
|---------|---------|
| End of work session | "That's all for today" |
| User correction | "No, use X instead" |
| Feature complete | "Done with the login page" |
| Bug fixed | "Fixed the null pointer issue" |
| User request | "/retrospect" or "what did we learn?" |

## Hard Rules

1. **NEVER auto-commit changes** - Always get user confirmation
2. **NEVER skip after corrections** - User corrections are gold, extract lessons immediately
3. **ALWAYS propose specific changes** - Show exactly what to add/update
4. **ALWAYS explain WHY** - Not just what, but why it matters

## Steps

### Step 1: Analyze Session (30 seconds)
Quick scan of what happened:
- What tasks were completed?
- What approaches were used?
- What challenges arose?
- Any user corrections?

### Step 2: Identify Patterns
Look for these pattern types:

| Pattern Type | Signal | Action |
|--------------|--------|--------|
| **Success** | Worked well, felt smooth | Add to best practices |
| **Pitfall** | Caused issues, wasted time | Add to anti-patterns |
| **Correction** | User said "no, do X" | Extract as rule |
| **Discovery** | Learned something new | Add to knowledge |

### Step 3: Extract Lessons
For each significant finding:

```markdown
### YYYY-MM-DD: [Lesson Title]
**What happened:** [1-2 sentences]
**Context:** [When/where]
**Lesson:** [What to remember]
**Rule:** [If applicable, rule to add]
**Code:** (if applicable)
```

### Step 4: Propose Updates
Show specific changes:

```
📁 Proposed Updates:

knowledge.md:
+ ## Pattern: [Name]
+ [Description]

lessons.md:
+ ### [Date]: [Title]
+ [Lesson content]

Apply? [y/n/edit]:
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Vague lessons ("be careful") | Specific rules ("always check null") |
| Auto-committing | Always ask for confirmation |
| Skipping after easy session | Even easy sessions have learnings |
| Too many lessons at once | Focus on top 2-3 most impactful |
| Only capturing failures | Capture successes too |

## Output Format

```
═══════════════════════════════════════════════════════════════
🧠 RETROSPECT: [Session Topic]
═══════════════════════════════════════════════════════════════

📋 Completed:
- [Task 1]
- [Task 2]

✅ Patterns That Worked:
1. [Pattern] → [Why it worked]

⚠️ Issues & Corrections:
1. [Issue] → [Resolution]

📝 Lessons to Capture:
1. [Lesson] → [Rule to add]

📁 Proposed Updates:
- knowledge.md: +[pattern name]
- lessons.md: +[lesson title]

Apply these changes? [y/n]:
═══════════════════════════════════════════════════════════════
```

## Pattern Promotion Lifecycle

```
Lesson (new finding)
    ↓ Used 3+ times
Pattern (reusable approach)
    ↓ High confidence, 5+ uses
Skill (codified process)
    ↓ Proven reliable, 10+ uses
Rule (hard requirement)
```

## Example

**Session:** Implementing payment form

```
🧠 RETROSPECT: payment-form implementation

✅ Patterns That Worked:
1. Zod + react-hook-form → Type-safe, great DX

⚠️ Issues & Corrections:
1. User corrected: "Add loading state"
   → Added isSubmitting state

📝 Lessons to Capture:
1. Always add loading state BEFORE async calls
   Rule: "Loading state is not optional"

📁 Proposed Updates:
- knowledge.md: +Zod validation pattern
- lessons.md: +Loading state lesson

Apply? [y/n]:
```

## Integration

- After **code-review**: Extract review patterns
- After **debugging**: Document debugging approach
- After **git-automation**: Commit learning updates
