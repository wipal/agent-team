---
name: security
description: |
  Security best practices for backend development. Use when implementing
  authentication, authorization, input validation, or when user mentions
  "security", "auth", "JWT", "password", "encryption", "XSS", "SQL injection",
  "OWASP", "vulnerability". Security is NOT optional - always apply these rules.
version: 1.0.0
category: backend
tags:
  - security
  - authentication
  - authorization
  - owasp
depends_on:
  - api-design
recommends:
  - database-design
used_by:
  - security-architecture
---

# Skill: Security

## Core Principle
**Security first. Never trust user input.** Every input is an attack vector.

## Hard Rules

1. **NEVER trust user input** - Validate everything
2. **NEVER store secrets in code** - Use environment variables
3. **NEVER use MD5/SHA1 for passwords** - Use bcrypt/argon2
4. **ALWAYS use parameterized queries** - Prevent SQL injection
5. **ALWAYS use HTTPS** - No exceptions in production
6. **ALWAYS log security events** - Auth failures, access denied

## OWASP Top 10 (Quick)

| # | Issue | Prevention |
|---|-------|------------|
| 1 | Broken Access Control | Check permissions |
| 2 | Crypto Failures | HTTPS, encrypt secrets |
| 3 | Injection | Parameterized queries |
| 4 | Insecure Design | Threat modeling |
| 5 | Misconfiguration | Harden defaults |
| 6 | Vulnerable Components | Update deps |
| 7 | Auth Failures | Strong auth |
| 8 | Data Integrity | Validate inputs |
| 9 | Logging Failures | Log security events |
| 10 | SSRF | Validate URLs |

## Authentication

### Password Handling
```typescript
import bcrypt from 'bcrypt';

// Hash password
const hash = await bcrypt.hash(password, 12);

// Verify password
const valid = await bcrypt.compare(password, hash);
```

### JWT Config
```typescript
const JWT_CONFIG = {
  algorithm: 'RS256',
  expiresIn: '15m',  // Short access token
};
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| `SELECT * FROM users WHERE id = ${id}` | Parameterized query |
| Storing passwords in plain text | bcrypt/argon2 |
| Hardcoded secrets | Environment variables |
| No rate limiting | Add rate limiter |
| Exposing internal errors | Generic error messages |

## SQL Injection Prevention

```typescript
// ❌ Bad: SQL injection vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Good: Parameterized (Prisma)
const user = await prisma.user.findUnique({
  where: { id: userId }
});

// ✅ Good: Parameterized (raw)
const result = await pool.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);
```

## Input Validation

```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (e) {
    res.status(400).json({ error: 'Validation failed' });
  }
};
```

## Security Headers

```typescript
import helmet from 'helmet';

app.use(helmet());
```

## Quick Checklist

- [ ] Input validated
- [ ] Parameterized queries
- [ ] Passwords hashed
- [ ] HTTPS enabled
- [ ] Rate limiting
- [ ] Secrets in env vars
- [ ] Security headers
- [ ] Auth events logged
