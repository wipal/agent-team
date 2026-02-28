---
name: bug-reporting
description: |
  Bug report templates and best practices for effective issue tracking. Use when:
  reporting bugs, creating issue tickets, documenting defects, or when user
  mentions "bug", "issue", "defect", "bug report", "ticket".
version: 1.0.0
category: quality
tags:
  - bug
  - issue
  - defect
  - ticket
depends_on: []
recommends: []
used_by: []
---

# Skill: Bug Reporting

## Core Principle
**A bug report should enable reproduction.** If developers can't reproduce it, they can't fix it.

## Severity Levels

| Level | Definition | Example |
|-------|------------|---------|
| **Critical** | System down, data loss | Database corruption |
| **High** | Major feature broken | Can't complete checkout |
| **Medium** | Feature partially broken | Filter not working |
| **Low** | Minor issue, workaround exists | Typo, UI glitch |

## Hard Rules

1. **NEVER report without reproduction steps** - One step, one action
2. **NEVER assume developer context** - Include all details
3. **ALWAYS include expected vs actual** - Clear comparison
4. **ALWAYS search for duplicates first** - Don't create duplicates

## Bug Report Template

```markdown
# 🐛 [Short Description]

## Summary
[One sentence describing the bug]

## Severity
- [ ] Critical
- [ ] High
- [x] Medium
- [ ] Low

## Environment
- **OS:** macOS 14.0
- **Browser:** Chrome 120
- **Version:** v2.1.0
- **Device:** Desktop

## Steps to Reproduce
1. Log in as standard user
2. Navigate to Settings > Profile
3. Click "Change Password"
4. Enter current password
5. Enter new password (8 characters)
6. Click "Save"

## Expected Behavior
Password should be updated successfully with confirmation message.

## Actual Behavior
Error message appears: "Invalid current password" even though password is correct.

## Evidence

### Screenshot
[Attach screenshot]

### Logs
```
[2024-01-15 10:30:45] ERROR: Password validation failed
[2024-01-15 10:30:45] Stack trace: ...
```

### Network Request
```
POST /api/user/password
Request: { "currentPassword": "***", "newPassword": "***" }
Response: { "error": "Invalid current password" }
```

## Impact
- Users cannot change passwords
- Affects ~15% of users based on support tickets
- Workaround: Reset password via email

## Additional Context
- First reported: 2024-01-15
- Related tickets: #123, #456
- Only affects users with special characters in password

## Possible Root Cause
Password encoding issue - special characters not properly escaped
```

## Quick Bug Report

```markdown
**What:** [Bug description in one line]
**Where:** [Page/URL/Feature]
**When:** [What action triggers it]
**Severity:** [Critical/High/Medium/Low]

**Steps:**
1. [First step]
2. [Second step]
3. [Third step]

**Expected:** [What should happen]
**Actual:** [What actually happened]
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Vague description | Specific, detailed |
| No reproduction steps | Number each step |
| Missing environment | OS, browser, version |
| No evidence | Screenshots, logs |
| Duplicate tickets | Search first |

## Bug Lifecycle

```
New → Triaged → In Progress → Fixed → Verified → Closed
                    ↓
                Won't Fix
                    ↓
               Cannot Reproduce
```

## Checklist

- [ ] Searched for duplicates
- [ ] Reproduction steps included
- [ ] Expected vs actual stated
- [ ] Evidence attached
- [ ] Environment specified
- [ ] Severity assigned
