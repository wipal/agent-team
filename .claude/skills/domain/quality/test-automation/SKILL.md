---
name: test-automation
description: |
  Test automation frameworks and strategies. Use when: setting up automation,
  writing automated tests, choosing frameworks, or when user mentions "automation",
  "automated tests", "Playwright", "Cypress", "Selenium".
version: 1.0.0
category: quality
tags:
  - automation
  - playwright
  - cypress
  - e2e
depends_on:
  - test-planning
recommends: []
used_by:
  - regression-testing
---

# Skill: Test Automation

## Core Principle
**Automate what matters.** Tests should be fast, reliable, and maintainable.

## What to Automate

| Automate | Don't Automate |
|----------|----------------|
| Regression tests | One-time tests |
| Repetitive tasks | Exploratory testing |
| Critical paths | UI polish testing |
| Data-driven tests | Subjective testing |

## Hard Rules

1. **NEVER automate flaky tests** - Fix the root cause first
2. **NEVER use fixed delays** - Wait for conditions
3. **ALWAYS use Page Object Model** - Maintainable tests
4. **ALWAYS run in CI** - Automation without CI is manual

## Framework Comparison

| Feature | Playwright | Cypress | Selenium |
|---------|------------|---------|----------|
| Speed | Fast | Fast | Slow |
| Reliability | High | High | Medium |
| Multi-browser | Yes | Limited | Yes |
| Parallel | Built-in | Paid | Yes |
| Learning curve | Medium | Easy | Hard |

## Playwright Setup

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
```

## Page Object Model

```typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

## Test Example

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully', async ({ page }) => {
    await loginPage.login('test@example.com', 'password123');

    // Wait for navigation
    await expect(page).toHaveURL('/dashboard');

    // Verify user is logged in
    await expect(page.locator('[data-testid="user-name"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await loginPage.login('test@example.com', 'wrongpassword');

    // Verify error message
    await expect(page.locator('.error-message')).toContainText('Invalid credentials');
  });
});
```

## Best Practices

### Wait Strategies
```typescript
// ❌ Bad: Fixed wait
await page.waitForTimeout(1000);

// ✅ Good: Wait for condition
await page.waitForSelector('.loaded');
await expect(page.locator('.status')).toBeVisible();
await page.waitForResponse('**/api/data');
```

### Test Data
```typescript
// Use test fixtures for data
test('should create order', async ({ page, request }) => {
  // Setup: Create test user via API
  const user = await request.post('/api/test/users', {
    data: { email: 'test@example.com' }
  });

  // Test...
});
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Fixed waits | Wait for conditions |
| No Page Objects | Use POM pattern |
| Flaky tests | Fix or delete |
| No parallelization | Configure workers |
| Not in CI | Add to pipeline |

## Checklist

- [ ] Framework selected
- [ ] Page Objects implemented
- [ ] Tests run in CI
- [ ] Parallel execution configured
- [ ] Proper wait strategies
- [ ] Test data management
