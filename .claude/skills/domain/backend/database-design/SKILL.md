---
name: database-design
description: |
  Database schema design patterns and best practices. Use when designing
  schemas, creating migrations, optimizing queries, adding indexes, or when
  user mentions "database", "schema", "table", "migration", "index", "SQL",
  "Prisma", "TypeORM". Ensures performant, maintainable data models.
version: 1.0.0
category: backend
tags:
  - database
  - sql
  - schema
  - optimization
depends_on:
  - code-review
recommends:
  - security
  - performance-engineering
used_by:
  - api-design
  - security-architecture
---

# Skill: Database Design

## Core Principle
**Design for performance, maintainability, and data integrity.** A bad schema haunts you forever.

## Hard Rules

1. **NEVER use SELECT \*** - Specify columns explicitly
2. **NEVER store secrets unencrypted** - Encrypt PII
3. **ALWAYS use migrations** - No manual schema changes
4. **ALWAYS index foreign keys** - Join performance
5. **ALWAYS use appropriate data types** - Don't store numbers as strings

## Naming Conventions

```sql
-- Tables: snake_case, plural
users, orders, order_items

-- Columns: snake_case
user_id, created_at, is_active

-- Primary keys
id SERIAL PRIMARY KEY
-- or
user_id UUID PRIMARY KEY

-- Foreign keys: {table}_id
user_id REFERENCES users(id)

-- Indexes: idx_{table}_{columns}
CREATE INDEX idx_users_email ON users(email);
```

## Index Strategy

### When to Index
- Primary keys (automatic)
- Foreign keys (always)
- WHERE clause columns
- ORDER BY columns
- JOIN conditions

### Index Types

| Type | Use Case |
|------|----------|
| B-tree | Default, equality/range |
| Unique | Email, username |
| Partial | `WHERE is_active = true` |
| Composite | Multi-column queries |
| GIN | JSONB, arrays, full-text |

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| SELECT * | Specify columns |
| No migrations | Use migration tool |
| Missing FK indexes | `CREATE INDEX ON orders(user_id)` |
| N+1 queries | Use JOIN or include |
| Storing arrays as strings | Use proper array/JSONB |

## N+1 Query Fix

```typescript
// ❌ Bad: N+1 queries
for (const order of orders) {
  order.items = await prisma.orderItem.findMany({
    where: { orderId: order.id }
  });
}

// ✅ Good: Use include
const orders = await prisma.order.findMany({
  include: { items: true }
});
```

## Migration Template

```sql
-- Up: 20250226_create_users.sql
BEGIN;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

COMMIT;

-- Down: 20250226_create_users_down.sql
BEGIN;
DROP TABLE IF EXISTS users;
COMMIT;
```

## Prisma Schema Example

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  orders    Order[]
  createdAt DateTime @default(now()) @map("created_at")

  @@map("users")
}

model Order {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id])
  items     OrderItem[]

  @@index([userId])
  @@map("orders")
}
```

## Quick Checklist

- [ ] Uses migrations
- [ ] Foreign keys indexed
- [ ] Appropriate data types
- [ ] No SELECT *
- [ ] N+1 queries avoided
- [ ] Secrets encrypted
