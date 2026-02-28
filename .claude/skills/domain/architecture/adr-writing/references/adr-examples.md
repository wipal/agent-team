# ADR Examples

Real-world examples of Architecture Decision Records.

---

## Example 1: Database Selection

# ADR-001: Use PostgreSQL for Primary Database

## Status
Accepted

## Context
Our e-commerce application requires a relational database for:
- User accounts and authentication
- Product catalog with complex relationships
- Order management with ACID transactions
- Inventory tracking with strong consistency

Current situation:
- MySQL 5.7 running on single EC2 instance
- Approaching capacity limits (500GB)
- No high availability
- Manual backups

Requirements:
- ACID compliance
- JSON support for flexible product attributes
- Full-text search capability
- High availability
- Managed service preferred

## Decision
We will use Amazon RDS for PostgreSQL as our primary database.

Configuration:
- Instance: db.r6g.xlarge (4 vCPU, 32GB RAM)
- Multi-AZ deployment for HA
- 1TB gp3 storage with auto-scaling
- PostgreSQL 15.x

## Consequences

### Positive
- Strong ACID compliance for financial transactions
- Native JSON support eliminates need for separate document store
- Built-in full-text search reduces infrastructure
- Managed service reduces operational burden
- Point-in-time recovery for backups
- Better query optimizer than MySQL for complex joins

### Negative
- Team needs to learn PostgreSQL (MySQL experience currently)
- Migration effort estimated at 3 weeks
- Higher cost than self-managed ($800/month vs $400/month)
- Some MySQL-specific queries need rewriting

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Migration data loss | Low | High | Test migration 3x, use CDC |
| Performance regression | Medium | Medium | Load test with production data |
| Team learning curve | High | Low | Training budget allocated |

## Alternatives Considered

### Option 1: Continue with MySQL (upgraded)
- **Pros**: No migration, team expertise
- **Cons**: Limited JSON support, no native full-text, more ops
- **Why not**: Doesn't meet requirements for JSON and search

### Option 2: Amazon Aurora MySQL
- **Pros**: MySQL compatible, managed, better performance
- **Cons**: More expensive, still MySQL limitations
- **Why not**: JSON and full-text still limited

### Option 3: MongoDB + PostgreSQL
- **Pros**: Best of both worlds
- **Cons**: Operational complexity, data sync issues
- **Why not**: Over-engineering for current needs

## Related Decisions
- ADR-002: Database Migration Strategy
- ADR-005: Backup and Disaster Recovery

## References
- [PostgreSQL vs MySQL comparison](link)
- [Migration plan document](link)
- [Cost analysis spreadsheet](link)

---

## Example 2: API Style

# ADR-005: Use GraphQL for Public API

## Status
Accepted

## Context
Our mobile application makes 15+ API calls to render the home screen.
This results in:
- Slow load times (3+ seconds)
- High bandwidth usage
- Poor user experience
- N+1 query problems

Current REST API:
- `/api/users/{id}`
- `/api/users/{id}/orders`
- `/api/orders/{id}/items`
- `/api/products/{id}`
- etc.

Mobile team reports frustration with over/under-fetching.

## Decision
We will implement GraphQL for our public-facing APIs.

Implementation:
- Apollo Server on Node.js
- Schema-first design
- DataLoader for N+1 prevention
- Persisted queries for production
- Keep REST for internal services

## Consequences

### Positive
- Single request for complex data
- Clients fetch exactly what they need
- Self-documenting API
- Strong typing with schema
- Better mobile performance

### Negative
- Learning curve for team
- New caching strategy needed
- Query complexity analysis required
- Different error handling
- File uploads more complex

## Alternatives Considered

### Option 1: REST with include parameters
```
GET /api/users/1?include=orders.items.product
```
- **Why not**: Non-standard, limited flexibility

### Option 2: Custom endpoints per screen
- **Why not**: Maintenance burden, tight coupling

### Option 3: gRPC
- **Why not**: Not browser-friendly, overkill for JSON

## Related Decisions
- ADR-006: GraphQL Security Guidelines
- ADR-007: API Rate Limiting Strategy

---

## Example 3: Microservices Decision

# ADR-010: Split Order Service from Monolith

## Status
Accepted

## Context
The Order module in our monolith has:
- Different scaling requirements (high traffic during sales)
- Different reliability requirements (critical path)
- Dedicated team of 6 developers
- Clear bounded context (DDD)

Current pain points:
- Full application deployment for order changes
- Order bugs affect entire system
- Team blocked by other teams' changes

## Decision
Extract Order Service as a separate microservice.

Boundaries:
- Order creation and management
- Payment processing
- Order status tracking

NOT included:
- Inventory (stays in monolith for now)
- User management (stays in monolith)
- Product catalog (stays in monolith)

## Consequences

### Positive
- Independent deployment and scaling
- Team autonomy
- Technology choice freedom
- Fault isolation
- Clearer ownership

### Negative
- Distributed system complexity
- Need for API versioning
- Monitoring complexity increases
- Data consistency across boundaries

## Implementation Timeline
1. Week 1-2: Define API contract
2. Week 3-4: Implement service
3. Week 5-6: Strangler migration
4. Week 7: Cut over and monitor

## Related Decisions
- ADR-011: Service Communication Pattern
- ADR-012: Order Service Database Design

---

## Example 4: Deprecating a Decision

# ADR-003: Use Redis for Session Storage

## Status
**Deprecated** - See ADR-015

## Context
[Historical context preserved]

## Decision
We used Redis for session storage.

## Consequences
[Historical consequences preserved]

## Deprecation Note
**Date**: 2024-06-15
**Reason**: Moving to JWT-based stateless authentication
**Migration**: See ADR-015 for migration plan
**Timeline**: Full migration by 2024-08-01

## Related Decisions
- **Superseded by**: ADR-015: JWT Authentication
