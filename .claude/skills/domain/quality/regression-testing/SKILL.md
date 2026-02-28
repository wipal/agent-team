---
name: regression-testing
description: |
  Regression test strategies and execution. Use when: running regression tests,
  ensuring existing functionality works, or when user mentions "regression",
  "regression test", "smoke test", "sanity test".
version: 1.0.0
category: quality
tags:
  - regression
  - smoke-test
  - sanity-test
  - qa
depends_on:
  - test-automation
recommends: []
used_by: []
---

# Skill: Regression Testing

## Core Principle
**Protect what works.** New features shouldn't break existing functionality.

## Test Types

| Type | Scope | When | Duration |
|------|-------|------|----------|
| **Smoke** | Critical paths | Every build | 5-15 min |
| **Sanity** | Specific feature | After fix | 15-30 min |
| **Regression** | Full suite | Before release | 1-4 hours |

## Hard Rules

1. **NEVER skip smoke tests** - They catch major issues early
2. **NEVER release without regression** - Protect existing users
3. **ALWAYS run automated tests first** - Fast feedback
4. **ALWAYS investigate failures** - Flaky tests hide real bugs

## Smoke Test Suite

```markdown
# Smoke Test Checklist

## Critical Paths (Must Pass)
- [ ] User can log in
- [ ] User can view dashboard
- [ ] User can create new item
- [ ] User can edit item
- [ ] User can delete item
- [ ] User can log out

## API Health
- [ ] GET /health returns 200
- [ ] Database connection works
- [ ] Cache connection works
- [ ] External APIs reachable

## Performance
- [ ] Page load < 3 seconds
- [ ] API response < 500ms
```

## Automated Smoke Test

```typescript
// tests/smoke.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('health check', async ({ request }) => {
    const response = await request.get('/health');
    expect(response.ok()).toBeTruthy();
  });

  test('user can login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', process.env.TEST_USER_EMAIL!);
    await page.fill('[name="password"]', process.env.TEST_USER_PASSWORD!);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
  });

  test('dashboard loads', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });
});
```

## Regression Test Matrix

```markdown
| Area | Smoke | Sanity | Full Regression |
|------|-------|--------|-----------------|
| Authentication | ✅ | ✅ | ✅ |
| User Management | ✅ | - | ✅ |
| Orders | - | ✅ | ✅ |
| Payments | - | - | ✅ |
| Reports | - | - | ✅ |
| Settings | - | - | ✅ |
```

## Regression Checklist

```markdown
# Pre-Release Regression

## Automation Status
- [ ] All smoke tests passing
- [ ] Feature tests passing
- [ ] No flaky test failures
- [ ] Coverage report generated

## Manual Testing
- [ ] Critical paths verified
- [ ] New features tested
- [ ] Edge cases checked
- [ ] Cross-browser tested
- [ ] Mobile tested

## Performance
- [ ] Load tests passed
- [ ] No memory leaks
- [ ] Response times acceptable

## Compatibility
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Mobile Safari
- [ ] Mobile Chrome
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Running all tests always | Risk-based selection |
| Ignoring flaky tests | Fix or quarantine |
| No test prioritization | Run critical first |
| Manual-only regression | Automate what makes sense |

## CI Integration

```yaml
# .github/workflows/regression.yml
name: Regression Tests

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Nightly

jobs:
  smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test --grep "@smoke"

  regression:
    needs: smoke
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test
```

## Checklist

- [ ] Smoke suite defined
- [ ] Automation running in CI
- [ ] Test matrix created
- [ ] Failure process defined
- [ ] Regular suite maintenance
