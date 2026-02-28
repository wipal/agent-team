---
name: architecture-patterns
description: |
  Use when choosing or implementing architecture patterns like microservices,
  monolith, event-driven, or serverless. Covers patterns, trade-offs,
  and when to use each approach.
version: 1.0.0
category: architecture
tags:
  - microservices
  - monolith
  - event-driven
  - serverless
  - patterns
dependencies:
  - system-design
references:
  - references/microservices.md
  - references/monolith.md
  - references/event-driven.md
  - references/serverless.md
---

# Architecture Patterns

## Core Principle
**Choose the architecture that fits your problem, team, and scale - not what's trendy.**

## When to Use This Skill

### Trigger Conditions
- Starting a new project
- Evaluating current architecture
- Planning a migration
- Scaling challenges
- Team structure changes

### Keywords
- "microservices"
- "monolith"
- "serverless"
- "event-driven"
- "architecture pattern"
- "service decomposition"

## Pattern Comparison

| Pattern | Complexity | Scale | Team Size | Best For |
|---------|------------|-------|-----------|----------|
| **Monolith** | Low | Medium | Small-Medium | Early stage, simple domains |
| **Microservices** | High | High | Large | Complex domains, independent scaling |
| **Event-Driven** | Medium-High | High | Medium-Large | Async workflows, real-time |
| **Serverless** | Medium | Auto | Any | Variable load, quick prototypes |
| **Modular Monolith** | Medium | Medium | Medium | Growing products, bounded contexts |

## Architecture Styles Overview

### 1. Monolithic Architecture
```
┌─────────────────────────────────────────┐
│            Monolith Application         │
├─────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │  Users  │ │ Orders  │ │Products │  │
│  │ Module  │ │ Module  │ │ Module  │  │
│  └─────────┘ └─────────┘ └─────────┘  │
│  ┌─────────────────────────────────┐   │
│  │         Shared Database         │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘

Pros:
- Simple to develop and deploy
- Easy to debug and test
- Low operational overhead
- Strong consistency

Cons:
- Can become complex over time
- Scaling requires full deployment
- Technology lock-in
- Single point of failure
```

### 2. Microservices Architecture
```
┌───────────┐ ┌───────────┐ ┌───────────┐
│  User     │ │  Order    │ │ Product   │
│ Service   │ │ Service   │ │ Service   │
└─────┬─────┘ └─────┬─────┘ └─────┬─────┘
      │             │             │
      ▼             ▼             ▼
 ┌─────────┐  ┌─────────┐  ┌─────────┐
 │ User DB │  │Order DB │  │ Prod DB │
 └─────────┘  └─────────┘  └─────────┘

Pros:
- Independent deployment and scaling
- Technology flexibility
- Team autonomy
- Fault isolation

Cons:
- Distributed system complexity
- Operational overhead
- Data consistency challenges
- Network latency
```

### 3. Event-Driven Architecture
```
                    ┌─────────────┐
                    │   Event     │
                    │   Broker    │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
 ┌───────────┐      ┌───────────┐      ┌───────────┐
 │  Service  │      │  Service  │      │  Service  │
 │    A      │      │    B      │      │    C      │
 └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
       │                  │                  │
       └──────────────────┴──────────────────┘
                     produces events

Pros:
- Loose coupling
- Async processing
- Easy to add consumers
- Scalable

Cons:
- Eventual consistency
- Debugging complexity
- Event schema evolution
- Message ordering
```

### 4. Serverless Architecture
```
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│ API     │────▶│  Lambda/    │────▶│   Managed   │
│ Gateway │     │  Function   │     │   Services  │
└─────────┘     └─────────────┘     └─────────────┘
                      │
                      ▼
               ┌─────────────┐
               │  DynamoDB/  │
               │  S3/SQS     │
               └─────────────┘

Pros:
- No server management
- Auto-scaling
- Pay per use
- Fast time to market

Cons:
- Vendor lock-in
- Cold starts
- Debugging challenges
- Limited execution time
```

## Decision Framework

### When to Choose Monolith
```
✅ Early-stage startup
✅ Small team (< 10 developers)
✅ Simple domain
✅ Quick time to market needed
✅ Limited operational expertise
✅ Tight budget
```

### When to Choose Microservices
```
✅ Large team (> 20 developers)
✅ Complex domain with bounded contexts
✅ Need independent scaling
✅ Different technology requirements
✅ Need fault isolation
✅ Multiple deployment cadences needed
```

### When to Choose Event-Driven
```
✅ Async workflows
✅ Real-time processing needs
✅ High throughput
✅ Loose coupling required
✅ Event sourcing requirements
✅ CQRS pattern needed
```

### When to Choose Serverless
```
✅ Unpredictable/variable traffic
✅ Event-based triggers
✅ Quick prototyping
✅ Small, stateless functions
✅ Limited ops team
✅ Cost optimization for low traffic
```

## Migration Paths

### Monolith to Microservices
```
Phase 1: Modularize
- Identify bounded contexts
- Create clear module boundaries
- Establish interfaces between modules

Phase 2: Extract
- Start with least coupled service
- Strangler fig pattern
- One service at a time

Phase 3: Independent
- Separate databases
- Independent deployment
- Own infrastructure
```

### Strangler Fig Pattern
```
Original:                    After:
┌─────────────────┐         ┌─────────────────┐
│    Monolith     │         │    Monolith     │
│                 │         │   (remaining)   │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │                           │
         │              ┌────────────┼────────────┐
         │              │            │            │
         ▼              ▼            ▼            ▼
    ┌─────────┐    ┌─────────┐  ┌─────────┐  ┌─────────┐
    │ Service │    │ Service │  │ Service │  │ Service │
    │    A    │    │    B    │  │    C    │  │    D    │
    └─────────┘    └─────────┘  └─────────┘  └─────────┘

Route new features to new services.
Gradually migrate existing functionality.
```

## Common Patterns by Domain

### E-commerce
```
Services:
- Product Catalog
- Shopping Cart
- Order Management
- Payment Processing
- Inventory
- User Management
- Search
- Recommendations

Events:
- ProductViewed
- CartUpdated
- OrderPlaced
- PaymentProcessed
- InventoryUpdated
```

### Social Media
```
Services:
- User Service
- Post Service
- Feed Service
- Notification Service
- Media Service
- Search Service

Events:
- UserFollowed
- PostCreated
- PostLiked
- CommentAdded
```

## Rules

### DO
- ✅ Start with monolith unless you have clear reasons
- ✅ Design for decomposition from the start
- ✅ Use bounded contexts to define service boundaries
- ✅ Keep services loosely coupled
- ✅ Have strong monitoring and observability

### DON'T
- ❌ Start with microservices for a new product
- ❌ Create distributed monolith (services tightly coupled)
- ❌ Share databases between services
- ❌ Make synchronous calls everywhere
- ❌ Ignore operational complexity

## Output

When using this skill, produce:
1. **Architecture Decision Record** - Why this pattern was chosen
2. **Service Map** - If microservices, define boundaries
3. **Communication Patterns** - How services interact
4. **Migration Plan** - If changing architecture

## Related Skills
- `system-design` - Core distributed systems concepts
- `adr-writing` - Document architecture decisions
- `api-design` - Service interfaces
