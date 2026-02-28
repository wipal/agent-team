---
name: switch
description: Switch to a different agent role
---

# Switch Agent Command

## Usage
```
/switch <agent-name>
```

## What It Does

Switches the current conversation to use a different agent configuration.

1. **Reads** the target agent's CLAUDE.md
2. **Loads** the agent's knowledge base
3. **Applies** role-specific rules
4. **Prepares** context for the new role

## Examples

### Switch to frontend developer
```
/switch fe-payment
```

Output:
```
✅ Switched to agent: fe-payment
Role: Frontend Developer
Variants: react, tailwind, zustand

Available skills:
- frontend-design
- react-patterns
- git-automation
- code-review

Ready to work on frontend tasks!
```

### Switch to backend developer
```
/switch auth-api
```

Output:
```
✅ Switched to agent: auth-api
Role: Backend Developer
Variants: nestjs, prisma, postgresql

Available skills:
- api-design
- nestjs-patterns
- database-design
- security

Ready to work on backend tasks!
```

### Switch to tech lead
```
/switch lead
```

Output:
```
✅ Switched to agent: lead
Role: Technical Lead
Model: Claude Opus 4 (with thinking mode)

Responsibilities:
- Architecture decisions
- Code review
- Technical strategy

Ready to review and guide!
```

## Listing Available Agents

If you don't know the agent name:
```
/switch
```

Output:
```
Available agents:

┌─────────────────┬─────────┬──────────────────────────────┐
│ Agent           │ Role    │ Variants                     │
├─────────────────┼─────────┼──────────────────────────────┤
│ fe-payment      │ dev-fe  │ react, tailwind, zustand     │
│ fe-admin        │ dev-fe  │ vue, tailwind, pinia         │
│ auth-api        │ dev-be  │ nestjs, prisma               │
│ lead            │ tech-lead│ -                           │
│ tester          │ qa      │ playwright                   │
└─────────────────┴─────────┴──────────────────────────────┘

Usage: /switch <agent-name>
```

## After Switching

The agent will:
- Load role-specific knowledge
- Apply relevant rules
- Be ready for tasks in that domain
- Remember previous context when switching back
