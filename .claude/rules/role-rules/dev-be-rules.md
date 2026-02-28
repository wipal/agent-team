# dev-be Rules - Rules riêng cho Backend Developers

---

## BE-Specific Rules

### 1. API Documentation First
- Luôn document API trước khi implement (OpenAPI/Swagger)
- Define request/response schemas rõ ràng
- Include error responses trong docs
- Version APIs properly (`/api/v1/...`)

### 2. Database Best Practices
- Luôn dùng parameterized queries (tránh SQL injection)
- Add proper indexes cho frequently queried columns
- Use transactions cho operations liên quan đến nhiều tables
- Implement soft delete cho important data
- Never store plaintext passwords

### 3. Error Handling
- Never expose internal errors to clients
- Use consistent error response format
- Log errors với đủ context
- Implement proper HTTP status codes
- Include request ID for debugging

### 4. Security Hardening
- Validate ALL user input
- Implement rate limiting
- Use HTTPS everywhere
- Sanitize data before logging
- Implement proper authentication/authorization

### 5. Performance
- Avoid N+1 queries (use joins, batch loading)
- Implement caching where appropriate
- Use connection pooling
- Monitor query performance
- Paginate list endpoints

### 6. Testing Requirements
- Unit tests cho business logic
- Integration tests cho API endpoints
- Test edge cases và error paths
- Mock external dependencies
- Aim for >80% coverage cho critical paths

---

## Tool Access Control (Capability-Based)

> Pattern từ OpenFang: Fine-grained permissions thay vì all-or-nothing

### File Operations

| Action | Allowed Paths | Denied Paths |
|--------|---------------|--------------|
| READ | `src/**`, `prisma/**`, `*.config.*`, `package.json`, `docker-compose.*` | `.env*`, `secrets/**`, `credentials/**` |
| WRITE | `src/**`, `prisma/**`, `tests/**` | `.env*`, `secrets/**`, `*.lock`, `dist/**` |
| DELETE | `src/**/*.test.ts` (with confirmation) | Production files, migrations (applied) |

### Shell Commands

| Category | ALLOW | DENY |
|----------|-------|------|
| Package | `npm run *`, `npm install`, `yarn *` | `npm publish`, `yarn publish` |
| Database | `npx prisma *`, `npm run db:*` | Direct DB mutations on prod |
| Git | `git status`, `git diff`, `git log`, `git branch` | `git push --force`, `git reset --hard` |
| Docker | `docker compose up`, `docker compose down` | `docker system prune` |
| System | `node *` | `sudo *`, `rm -rf`, `chmod 777` |

### Network Access

| ALLOW | DENY |
|-------|------|
| `localhost:*` | Production databases (without approval) |
| `*.internal.company.com` | External services with secrets |
| `api.staging.*` | Production APIs (without approval) |
| Database: dev/staging instances | Database: production instances |

### Memory Scope

| Scope | Access |
|-------|--------|
| `self.*` | Full read/write |
| `shared.backend.*` | Full read/write |
| `shared.project.*` | Read only |
| `shared.frontend.*` | Read only (for API contracts) |

---

## Operational Phases

> Multi-phase methodology từ OpenFang

### Phase 1: ANALYZE

- Read existing code and understand architecture
- Review database schema and relationships
- Understand API contracts and dependencies
- Check for existing solutions/patterns

### Phase 2: PLAN

- Design API endpoints và data models
- Consider scalability và performance implications
- Identify security considerations
- Get approval for non-trivial changes
- Plan database migrations if needed

### Phase 3: IMPLEMENT

- Write clean, maintainable code
- Follow existing conventions và patterns
- Implement proper error handling
- Add input validation
- Write self-documenting code

### Phase 4: VERIFY

- Run unit tests và integration tests
- Test error scenarios
- Verify API documentation is updated
- Check performance với realistic data
- Security review cho sensitive endpoints

### Phase 5: DOCUMENT

- Update API documentation
- Document new environment variables
- Update README nếu cần
- Add migration notes nếu có
- Share knowledge với team

---

## API Response Standards

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  },
  "requestId": "req_abc123"
}
```

---

## Code Quality Checklist

Before submitting:

- [ ] Input validation implemented
- [ ] Error handling complete
- [ ] Tests written (unit + integration)
- [ ] API documentation updated
- [ ] No hardcoded values
- [ ] Proper logging added
- [ ] SQL queries use parameters
- [ ] Sensitive data not logged

---

## Anti-Patterns to Avoid

### Database

- ❌ N+1 queries (use joins/batching)
- ❌ Missing indexes on foreign keys
- ❌ Storing JSON blobs when normalized tables work
- ❌ Hardcoding connection strings

### Security

- ❌ Trusting user input
- ❌ Exposing internal errors
- ❌ Storing passwords in plaintext
- ❌ Missing authentication checks
- ❌ SQL string concatenation

### Performance

- ❌ Fetching unnecessary columns
- ❌ No pagination on list endpoints
- ❌ Missing cache headers
- ❌ Synchronous operations cho long tasks

### Code Quality

- [ ] Files > 500 lines (split into modules)
- [ ] Functions > 50 lines (extract helpers)
- [ ] Missing error handling
- [ ] Magic numbers/strings

---

## Environment Variables Template

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
JWT_SECRET=""
JWT_EXPIRES_IN="7d"

# External Services
REDIS_URL=""
S3_BUCKET=""

# Logging
LOG_LEVEL="info"
```

---

## Related Documentation

- [General Rules](../common/general-rules.md)
- [SA Rules](./sa-rules.md)
- [API Design Skill](../../skills/domain/backend/api-design/SKILL.md)
