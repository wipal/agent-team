# General Rules - Áp dụng cho TẤT CẢ agents

> **Nguồn tham khảo:** Boris Cherny (Anthropic engineer), everything-claude-code

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from user: update `lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from user
- Go fix failing CI tests without being told how

---

## Task Management

### Standard Process
1. **Plan First** - Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan** - Check in before starting implementation
3. **Track Progress** - Mark items complete as you go
4. **Explain Changes** - High-level summary at each step
5. **Document Results** - Add review section to `tasks/todo.md`
6. **Capture Lessons** - Update `lessons.md` after corrections

---

## Core Principles

### Simplicity First
- Make every change as simple as possible
- Avoid over-engineering
- Choose the simplest solution that works

### No Laziness
- Find root causes. No temporary fixes.
- Senior engineer standards.
- Do it right or don't do it.

### Minimal Impact
- Changes should only touch what's necessary
- Don't refactor unrelated code
- Keep PRs focused

### Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

---

## Verification Protocol

### RED FLAGS - STOP
- Using "should"/"probably"/"seems to"
- Expressing satisfaction before verification
- Committing without verification
- Trusting agent reports without evidence

### REQUIRED Before Completion
1. IDENTIFY command to verify
2. RUN full command (not partial)
3. READ actual output
4. VERIFY output confirms claim
5. THEN make claim

---

## Context Management

### Strategic Compaction
- Compact at logical breakpoints, NOT mid-implementation
- After research/exploration, before implementation
- After completing a milestone, before starting next
- After debugging, before continuing feature work

### MCP Limits
- Keep under 10 MCPs enabled per project
- Keep under 80 tools active
- Use `disabledMcpServers` for unused servers

---

## Code Quality

### Before Writing Code
1. Check Context7 for latest documentation
2. Review existing patterns in codebase
3. Understand the requirement fully
4. Plan the approach

### While Writing Code
1. Follow existing conventions
2. Write self-documenting code
3. Handle errors explicitly
4. Add appropriate logging

### After Writing Code
1. Self-review the changes
2. Run relevant tests
3. Check for edge cases
4. Update documentation if needed

---

## Communication

### Status Updates
- Be clear about what's done
- Be honest about blockers
- Estimate only when confident

### Asking Questions
- Ask when truly unclear
- Provide context with questions
- Suggest options when possible

### Reporting Issues
- Describe the problem clearly
- Include relevant logs/errors
- Suggest potential solutions
