---
name: testing-fe
description: |
  Frontend testing from developer perspective: Unit Tests, Integration Tests,
  Functional Tests, Component/UI Tests. Use when writing tests for your own
  code. NOT for E2E/QA testing (that's QA domain). Test behavior, not implementation.
version: 1.1.0
category: frontend
tags:
  - testing
  - unit-test
  - integration-test
  - functional-test
  - component-test
  - vitest
  - testing-library
depends_on:
  - code-review
recommends: []
used_by:
  - dev-fe
---

# Skill: Testing FE (Developer Perspective)

## Core Principle
**Test behavior, not implementation.** As a developer, you test YOUR code to ensure it works correctly. E2E testing is QA's responsibility.

## Testing Pyramid (Developer Focus)

```
        ▲
       /API\          Some, medium speed (Integration)
      /─────\
     /Component\      Many, fast (Component/UI)
    /───────────\
   /    Unit     \    Many, very fast
  /───────────────\
```

**Note:** E2E testing is NOT included - that's QA/Tester domain, not developer responsibility.

## Hard Rules

1. **NEVER test implementation** - Test user behavior
2. **NEVER use container.querySelector** - Use getBy* queries
3. **ALWAYS use userEvent** - Not fireEvent
4. **ALWAYS wait for async** - findBy*, waitFor
5. **ALWAYS clean up** - No state leakage
6. **NO E2E tests** - That's QA domain, not dev responsibility

## Unit Testing

Test individual functions, hooks, and utilities in isolation.

```tsx
// useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

## Component/UI Testing (Vitest + Testing Library)

Test how components render and respond to user interaction.

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
```

## Integration Testing

Test how multiple components work together.

```tsx
// LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm Integration', () => {
  it('submits form with valid credentials', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('shows validation errors', async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
```

## Functional Testing

Test complete features from user perspective (without browser).

```tsx
// ShoppingCart.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ShoppingCart } from './ShoppingCart';

describe('ShoppingCart Functional Tests', () => {
  it('adds item and updates total', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart />);

    // Add first item
    await user.click(screen.getByRole('button', { name: /add product a/i }));

    expect(screen.getByText(/total: \$10.00/i)).toBeInTheDocument();
    expect(screen.getByText(/1 item/i)).toBeInTheDocument();

    // Add second item
    await user.click(screen.getByRole('button', { name: /add product b/i }));

    expect(screen.getByText(/total: \$25.00/i)).toBeInTheDocument();
    expect(screen.getByText(/2 items/i)).toBeInTheDocument();
  });

  it('removes item and updates total', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart />);

    await user.click(screen.getByRole('button', { name: /add product a/i }));
    await user.click(screen.getByRole('button', { name: /remove product a/i }));

    expect(screen.getByText(/total: \$0.00/i)).toBeInTheDocument();
    expect(screen.getByText(/0 items/i)).toBeInTheDocument();
  });
});
```

## Async Testing

```tsx
import { render, screen, waitFor } from '@testing-library/react';

it('shows user after loading', async () => {
  render(<UserProfile userId="1" />);

  // Wait for element to appear
  expect(await screen.findByText('John Doe')).toBeInTheDocument();

  // Or use waitFor for complex conditions
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
```

## Mocking

```tsx
import { vi } from 'vitest';

// Mock module
vi.mock('../api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: '1', name: 'John' }),
}));

// Mock hooks
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Spy on console
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Testing props/state | Test rendered output |
| Using fireEvent | Use userEvent |
| Not waiting for async | findBy*, waitFor |
| Testing implementation | Test user behavior |
| Brittle selectors | Use accessible queries |
| Writing E2E tests | That's QA domain |

## Query Priority

```tsx
// 1. Accessible queries (best)
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByPlaceholderText(/search/i);
screen.getByText(/welcome/i);

// 2. Semantic queries
screen.getByAltText(/profile/i);
screen.getByTitle(/close/i);

// 3. Test ID (last resort)
screen.getByTestId('submit-button');
```

## Vitest Config

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

## Quick Checklist

- [ ] Tests user behavior, not implementation
- [ ] Uses accessible queries (getByRole)
- [ ] Uses userEvent, not fireEvent
- [ ] Waits for async with findBy/waitFor
- [ ] Mocks external dependencies
- [ ] Coverage reports generated
- [ ] NO E2E tests (that's QA domain)
