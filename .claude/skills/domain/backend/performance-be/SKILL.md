---
name: performance-be
description: |
  Backend performance optimization patterns. Use when: optimizing database queries,
  improving API response times, handling high load, or when user mentions "slow",
  "performance", "optimize", "N+1", "caching", "latency". Fast backends = happy users.
version: 1.0.0
category: backend
tags:
  - performance
  - optimization
  - caching
  - database
depends_on:
  - database-design
  - api-design
recommends: []
used_by: []
---

# Skill: Performance BE

## Core Principle
**Measure before optimizing.** Profile, identify bottlenecks, then fix. Premature optimization is waste.

## Performance Metrics

| Metric | Target | What |
|--------|--------|------|
| **Response Time** | < 200ms | P95 latency |
| **Throughput** | 1000+ RPS | Requests per second |
| **Error Rate** | < 0.1% | Failed requests |
| **DB Query Time** | < 50ms | P95 query time |

## Hard Rules

1. **NEVER use SELECT \*** - Specify columns
2. **NEVER N+1 queries** - Use JOINs or includes
3. **ALWAYS index foreign keys** - Critical for joins
4. **ALWAYS paginate lists** - No unbounded queries
5. **ALWAYS cache expensive operations** - Within reason

## N+1 Query Fix

```typescript
// ❌ Bad: N+1 queries
async function getOrdersWithItems() {
  const orders = await prisma.order.findMany();

  for (const order of orders) {
    order.items = await prisma.orderItem.findMany({
      where: { orderId: order.id }
    });
  }

  return orders;
}

// ✅ Good: Single query with include
async function getOrdersWithItems() {
  return prisma.order.findMany({
    include: { items: true }
  });
}
```

## Database Optimization

### Indexing

```sql
-- Index foreign keys
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Composite index for common queries
CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC);

-- Partial index for active records
CREATE INDEX idx_users_active ON users(email) WHERE is_active = true;
```

### Query Optimization

```typescript
// ❌ Bad: Unbounded query
const orders = await prisma.order.findMany();

// ✅ Good: Paginated
const orders = await prisma.order.findMany({
  take: 20,
  skip: (page - 1) * 20,
  orderBy: { createdAt: 'desc' },
});

// ✅ Good: Select only needed fields
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true },
});
```

## Caching Strategies

### Redis Patterns

```typescript
import { Redis } from 'ioredis';

const redis = new Redis();

// Cache-aside pattern
async function getUser(id: string) {
  // 1. Check cache
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);

  // 2. Fetch from DB
  const user = await prisma.user.findUnique({ where: { id } });

  // 3. Cache result
  if (user) {
    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  }

  return user;
}

// Invalidate on update
async function updateUser(id: string, data: UpdateData) {
  const user = await prisma.user.update({ where: { id }, data });
  await redis.del(`user:${id}`);
  return user;
}
```

### Cache Headers

```typescript
// Static assets
app.get('/static/*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
});

// API responses
app.get('/api/products', (req, res) => {
  res.setHeader('Cache-Control', 'private, max-age=60, stale-while-revalidate=300');
});
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| SELECT * | Specify columns |
| N+1 queries | Use JOIN/include |
| No pagination | Add limit/offset |
| Missing indexes | Index FKs, WHERE columns |
| No caching | Add Redis cache |
| Sync operations | Use async |

## Connection Pooling

```typescript
// Prisma connection pool
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Connection pool settings
  __internal: {
    engine: {
      connectionLimit: 10,
    },
  },
});
```

## Performance Checklist

### Database
- [ ] Foreign keys indexed
- [ ] N+1 queries eliminated
- [ ] Queries use indexes (EXPLAIN ANALYZE)
- [ ] Pagination implemented
- [ ] Connection pooling configured

### API
- [ ] Response times < 200ms P95
- [ ] Caching implemented
- [ ] Compression enabled
- [ ] Rate limiting configured

### Monitoring
- [ ] P95/P99 latency tracked
- [ ] Slow query logging
- [ ] Error rate monitored

## Profiling

```sql
-- PostgreSQL query analysis
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = '123';

-- Find slow queries
SELECT query, mean_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```
