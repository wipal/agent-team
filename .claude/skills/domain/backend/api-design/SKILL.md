---
name: api-design
description: |
  RESTful API design patterns and best practices. Use when designing APIs,
  creating endpoints, implementing authentication, versioning APIs, writing
  API documentation, or when user mentions "API", "endpoint", "REST", "route",
  "controller". Ensures consistent, intuitive, well-documented APIs.
version: 1.0.0
category: backend
tags:
  - api
  - rest
  - http
  - backend
depends_on:
  - code-review
recommends:
  - security
  - database-design
used_by:
  - security
  - security-architecture
---

# Skill: API Design

## Core Principle
**APIs should be intuitive, consistent, and well-documented.** Developers should understand your API without reading docs.

## Hard Rules

1. **NEVER use verbs in URLs** - `/getUsers` → `/users`
2. **NEVER return HTML errors** - Always JSON
3. **ALWAYS use plural nouns** - `/users` not `/user`
4. **ALWAYS return consistent error format** - Same structure everywhere
5. **ALWAYS version APIs** - `/api/v1/...`

## HTTP Methods

| Method | Purpose | Idempotent |
|--------|---------|------------|
| GET | Retrieve | Yes |
| POST | Create | No |
| PUT | Replace | Yes |
| PATCH | Update | No |
| DELETE | Remove | Yes |

## Resource Naming

```text
✅ GOOD:
GET    /users
GET    /users/{id}
POST   /users
GET    /users/{id}/orders

❌ BAD:
GET    /getUsers
POST   /createUser
GET    /user-order/{id}
```

## Status Codes

| Code | When |
|------|------|
| 200 | Success |
| 201 | Created |
| 204 | Deleted (no content) |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 422 | Validation error |
| 500 | Server error |

## Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid email" }
    ]
  }
}
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| `/getUsers` | `/users` with GET |
| No versioning | `/api/v1/users` |
| HTML errors | JSON error format |
| No pagination | `?page=1&limit=20` |
| Inconsistent naming | Stick to conventions |

## Pagination

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

## Quick Checklist

- [ ] Uses nouns, not verbs
- [ ] Plural resource names
- [ ] Consistent error format
- [ ] API versioned
- [ ] Pagination for lists
- [ ] Proper status codes
