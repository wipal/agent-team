---
name: test-planning
description: |
  Test strategy and planning for comprehensive quality assurance. Use when:
  creating test plans, defining test strategy, planning test coverage, or when
  user mentions "test plan", "test strategy", "QA plan", "coverage".
version: 1.0.0
category: quality
tags:
  - test-planning
  - qa
  - strategy
  - coverage
depends_on: []
recommends:
  - test-automation
used_by:
  - regression-testing
---

# Skill: Test Planning

## Core Principle
**Test early, test often, test smart.** Quality is built in, not tested in.

## Testing Pyramid

```
         ▲
        /E2E\         10% - Slow, expensive
       /─────\
      /  API  \       20% - Integration
     /─────────\
    /   Unit    \     70% - Fast, cheap
   /─────────────\
```

## Hard Rules

1. **NEVER test everything manually** - Automate what makes sense
2. **NEVER skip edge cases** - That's where bugs hide
3. **ALWAYS define acceptance criteria first** - Know what "done" means
4. **ALWAYS prioritize by risk** - High-risk areas need more testing

## Test Plan Template

```markdown
# Test Plan: [Feature/Release Name]

## 1. Overview
- **Feature:** User authentication
- **Release:** v2.0
- **QA Lead:** @name
- **Timeline:** Sprint 5-6

## 2. Scope

### In Scope
- Login/logout functionality
- Password reset
- Session management
- OAuth integration

### Out of Scope
- Biometric auth (Phase 2)
- Multi-factor auth (Phase 3)

## 3. Test Strategy

### Unit Tests
- Service layer business logic
- Input validation
- Error handling

### Integration Tests
- API endpoints
- Database operations
- External service mocks

### E2E Tests
- Critical user flows
- Happy paths only

## 4. Test Cases

| ID | Type | Priority | Description |
|----|------|----------|-------------|
| AUTH-001 | Unit | High | Validate email format |
| AUTH-002 | API | High | Login with valid credentials |
| AUTH-003 | API | High | Login with invalid credentials |
| AUTH-004 | E2E | Critical | Complete login flow |

## 5. Entry Criteria
- [ ] Feature development complete
- [ ] Unit tests passing
- [ ] Code review approved
- [ ] Test environment ready

## 6. Exit Criteria
- [ ] All test cases executed
- [ ] No critical bugs open
- [ ] Coverage > 80%
- [ ] Performance tests passed

## 7. Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| OAuth delay | Medium | Test with mock first |

## 8. Resources
- QA: 2 engineers
- Duration: 5 days
- Environment: Staging
```

## Test Case Template

```markdown
# TC-AUTH-001: Login with valid credentials

## Metadata
- **Priority:** Critical
- **Type:** Functional
- **Automation:** Yes

## Pre-conditions
- User account exists
- User is not logged in

## Test Steps
1. Navigate to login page
2. Enter valid email
3. Enter valid password
4. Click "Login" button

## Expected Result
- User is redirected to dashboard
- Session token is set
- User name displayed in header

## Test Data
- Email: test@example.com
- Password: ValidPass123!

## Post-conditions
- User session created
- Login timestamp updated
```

## Coverage Matrix

```markdown
| Requirement | Unit | Integration | E2E | Manual |
|-------------|------|-------------|-----|--------|
| Login       | ✅   | ✅          | ✅  | -      |
| Password    | ✅   | ✅          | -   | ✅     |
| OAuth       | ✅   | ✅          | ✅  | ✅     |
| Session     | ✅   | ✅          | -   | -      |
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Testing only happy path | Include edge cases |
| No prioritization | Risk-based testing |
| No entry/exit criteria | Define clearly |
| Manual-only testing | Automate wisely |

## Checklist

- [ ] Scope defined
- [ ] Strategy documented
- [ ] Test cases written
- [ ] Entry criteria met
- [ ] Exit criteria defined
- [ ] Risks identified
