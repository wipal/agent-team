---
name: testing-be
description: |
  Backend testing from developer perspective: Unit Tests, Integration Tests,
  Functional Tests, API Tests. Use when writing tests for your own code.
  NOT for E2E/QA testing (that's QA domain). Test behavior, not implementation.
version: 1.1.0
category: backend
tags:
  - testing
  - unit-test
  - integration-test
  - functional-test
  - api-test
depends_on:
  - code-review
  - api-design
recommends: []
used_by:
  - dev-be
---

# Skill: Testing BE (Developer Perspective)

## Core Principle
**Test behavior, not implementation.** As a developer, you test YOUR code to ensure it works correctly. E2E testing is QA's responsibility.

## Testing Pyramid (Developer Focus)

```
        ▲
       /API\          Some, medium speed (Integration)
      /─────\
     /Functional\     Many, fast
    /────────────\
   /    Unit      \   Many, very fast
  /────────────────\
```

**Note:** E2E testing is NOT included - that's QA/Tester domain, not developer responsibility.

## Hard Rules

1. **NEVER test implementation** - Test behavior/output
2. **NEVER share state between tests** - Each test is isolated
3. **ALWAYS clean up resources** - Close connections, delete data
4. **ALWAYS use descriptive names** - `should_..._when_...`
5. **ALWAYS mock external services** - No real API calls
6. **NO E2E tests** - That's QA domain, not dev responsibility

## Unit Tests

Test individual functions and classes in isolation.

```typescript
// userService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from './userService';
import { UserRepository } from './userRepository';

describe('UserService', () => {
  let service: UserService;
  let mockRepo: UserRepository;

  beforeEach(() => {
    mockRepo = {
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    };
    service = new UserService(mockRepo);
  });

  describe('getUser', () => {
    it('should return user when found', async () => {
      const mockUser = { id: '1', name: 'John' };
      vi.mocked(mockRepo.findById).mockResolvedValue(mockUser);

      const result = await service.getUser('1');

      expect(result).toEqual(mockUser);
      expect(mockRepo.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError when user not found', async () => {
      vi.mocked(mockRepo.findById).mockResolvedValue(null);

      await expect(service.getUser('999')).rejects.toThrow(NotFoundError);
    });
  });
});
```

## Integration Tests

Test how multiple components work together.

```typescript
// api.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from './app';
import { prisma } from './db';

describe('User API Integration', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('GET /users/:id', () => {
    it('should return user', async () => {
      const user = await prisma.user.create({
        data: { name: 'Test User', email: 'test@example.com' },
      });

      const response = await app.inject({
        method: 'GET',
        url: `/users/${user.id}`,
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        id: user.id,
        name: 'Test User',
      });
    });
  });
});
```

## Functional Tests

Test complete features and business logic.

```typescript
// orderService.functional.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { OrderService } from './orderService';
import { InventoryService } from './inventoryService';
import { PaymentService } from './paymentService';

describe('OrderService Functional Tests', () => {
  let orderService: OrderService;
  let inventoryService: InventoryService;
  let paymentService: PaymentService;

  beforeEach(() => {
    inventoryService = new InventoryService();
    paymentService = new PaymentService();
    orderService = new OrderService(inventoryService, paymentService);
  });

  it('should create order when inventory available', async () => {
    const orderData = {
      productId: 'prod-1',
      quantity: 2,
      userId: 'user-1',
    };

    const result = await orderService.createOrder(orderData);

    expect(result.status).toBe('confirmed');
    expect(result.quantity).toBe(2);
  });

  it('should fail when insufficient inventory', async () => {
    const orderData = {
      productId: 'prod-out-of-stock',
      quantity: 100,
      userId: 'user-1',
    };

    await expect(orderService.createOrder(orderData)).rejects.toThrow('Insufficient inventory');
  });

  it('should handle payment failure gracefully', async () => {
    const orderData = {
      productId: 'prod-1',
      quantity: 1,
      userId: 'user-payment-fail',
    };

    await expect(orderService.createOrder(orderData)).rejects.toThrow('Payment failed');
  });
});
```

## API Tests

Test HTTP endpoints directly.

```typescript
// auth.api.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './app';

describe('Auth API', () => {
  it('POST /auth/login should return token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('POST /auth/login should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'wrong' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('GET /protected should require auth', async () => {
    const response = await request(app).get('/protected');

    expect(response.status).toBe(401);
  });
});
```

## Test Database

```typescript
// test/setup.ts
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Use test database
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

  // Run migrations
  execSync('npx prisma migrate deploy');
});

afterEach(async () => {
  // Clean up between tests
  const tables = ['User', 'Order', 'Product'];
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Testing private methods | Test public interface |
| Shared mutable state | Isolated test data |
| Real external APIs | Mock them |
| Slow tests | Use in-memory DB |
| Flaky tests | Fix or delete |
| Writing E2E tests | That's QA domain |

## Mocking Patterns

```typescript
// Mock module
vi.mock('./emailService', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock environment
vi.stubEnv('NODE_ENV', 'test');

// Mock time
vi.useFakeTimers();
vi.setSystemTime(new Date('2024-01-01'));
```

## Test Naming

```typescript
// Pattern: should_[expected]_when_[condition]
it('should_return_empty_list_when_no_users_exist')
it('should_throw_ValidationError_when_email_invalid')
it('should_create_order_when_valid_request')
```

## Quick Checklist

- [ ] Each test is isolated
- [ ] External services mocked
- [ ] Database cleaned between tests
- [ ] Descriptive test names
- [ ] Fast test execution
- [ ] CI integration
- [ ] NO E2E tests (that's QA domain)
