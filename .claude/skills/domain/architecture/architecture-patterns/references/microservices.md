# Microservices Architecture

## Overview
Microservices architecture structures an application as a collection of loosely coupled, independently deployable services.

## Core Principles

### 1. Single Responsibility
Each service does one thing well:
```
❌ Bad: UserOrderPaymentService
✅ Good: UserService, OrderService, PaymentService
```

### 2. Independence
Services can be:
- Developed independently
- Deployed independently
- Scaled independently
- Replaced independently

### 3. Decentralization
- Each team owns their service
- No central coordination needed
- Polyglot persistence possible
- Technology flexibility

## Service Decomposition

### By Business Capability
```
Organization:
- Catalog Team → Catalog Service
- Order Team → Order Service
- Shipping Team → Shipping Service

Benefits:
- Aligned with business
- Stable boundaries
- Clear ownership
```

### By Subdomain (DDD)
```
Domain: E-commerce

Core Domain:
- Catalog
- Pricing
- Inventory

Supporting:
- Shipping
- Payment
- Notification

Generic:
- Authentication
- Reporting
```

### Decomposition Patterns

#### 1. Decompose by Verb (Use Case)
```
Services organized by actions:
- ShipOrderService
- ProcessPaymentService
- SendNotificationService

Good for: Utility services, operations
```

#### 2. Decompose by Noun (Resource)
```
Services organized by resources:
- OrderService
- CustomerService
- ProductService

Good for: CRUD-heavy domains
```

## Communication Patterns

### Synchronous (Request-Response)
```
┌─────────┐  HTTP/gRPC  ┌─────────┐
│ Service │────────────▶│ Service │
│    A    │◀────────────│    B    │
└─────────┘   Response  └─────────┘

Protocols:
- REST (HTTP/JSON)
- gRPC (Protocol Buffers)
- GraphQL

Pros: Simple, immediate feedback
Cons: Coupling, latency, cascading failures
```

### Asynchronous (Message-Based)
```
┌─────────┐            ┌─────────┐
│ Service │            │ Service │
│    A    │            │    B    │
└────┬────┘            └────┬────┘
     │                      │
     │   ┌─────────────┐    │
     └──▶│Message Queue│◀───┘
         └─────────────┘

Protocols:
- AMQP (RabbitMQ)
- Kafka
- SQS/SNS
- EventBridge

Pros: Decoupling, resilience, scaling
Cons: Complexity, eventual consistency
```

## Data Management

### Database per Service
```
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Service │     │ Service │     │ Service │
│    A    │     │    B    │     │    C    │
└────┬────┘     └────┬────┘     └────┬────┘
     │               │               │
     ▼               ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│  DB-A   │     │  DB-B   │     │  DB-C   │
│PostgreSQL│    │ MongoDB │     │  Redis  │
└─────────┘     └─────────┘     └─────────┘

Benefits:
- Independent scaling
- Technology fit
- Fault isolation
- Team autonomy
```

### Shared Data Patterns

#### API Composition
```
Query: Get order with customer and product details

┌──────────┐
│ API      │──────▶ Order Service (primary)
│ Gateway  │──────▶ Customer Service
└──────────┘──────▶ Product Service
         │
         ▼
    Join results in memory
```

#### CQRS (Command Query Responsibility Segregation)
```
Writes:                    Reads:
┌─────────┐               ┌─────────┐
│ Command │──▶ Write DB   │  Query  │──▶ Read DB
│  Side   │               │  Side   │    (Replica)
└─────────┘               └─────────┘
     │                         ▲
     │      Event Stream       │
     └─────────────────────────┘

Benefits:
- Optimized read/write models
- Scalable reads
- Complex queries without affecting writes
```

#### Saga Pattern
```
Distributed transaction:

Order Service → Payment Service → Inventory Service
     │                │                  │
     │ Create Order   │                  │
     ├───────────────▶│                  │
     │                │ Process Payment  │
     │                ├─────────────────▶│
     │                │                  │ Reserve Stock
     │◀───────────────┴──────────────────┤
     │            Success                │

If Payment fails:
     │◀───────────────┤ Cancel Order
```

## Service Discovery

### Client-Side Discovery
```
Client queries service registry:

┌─────────┐     ┌────────────────┐     ┌─────────┐
│ Client  │────▶│    Service     │────▶│ Service │
│         │     │    Registry    │     │ Instance│
└─────────┘     └────────────────┘     └─────────┘
     │                                      ▲
     └──────────────────────────────────────┘

Examples: Netflix Eureka, Consul
```

### Server-Side Discovery
```
Client goes through load balancer:

┌─────────┐     ┌────────────┐     ┌─────────┐
│ Client  │────▶│   Load     │────▶│ Service │
│         │     │  Balancer  │     │ Instance│
└─────────┘     └────────────┘     └─────────┘

Examples: AWS ALB, Kubernetes Service, Nginx
```

## Deployment Patterns

### Blue-Green Deployment
```
Blue (Current):          Green (New):
┌─────────────┐          ┌─────────────┐
│   Version   │          │   Version   │
│     1.0     │          │     2.0     │
└─────────────┘          └─────────────┘
      ▲
      │
   Router
      │
      ▼ (switch when ready)
                    ┌─────────────┐
                    │   Version   │
                    │     2.0     │
                    └─────────────┘

Zero downtime, instant rollback
```

### Canary Deployment
```
         ┌──────────────┐
         │   Router     │
         └──────┬───────┘
                │
       ┌────────┴────────┐
       │                 │
       ▼                 ▼
┌─────────────┐   ┌─────────────┐
│  90% traffic│   │  10% traffic│
│  Version 1.0│   │  Version 2.0│
└─────────────┘   └─────────────┘

Gradual rollout with monitoring
```

## Challenges & Solutions

### Challenge 1: Distributed Transactions
```
Solution: Saga Pattern
- Orchestration: Central coordinator
- Choreography: Events trigger actions
```

### Challenge 2: Data Consistency
```
Solution: Eventual Consistency + Compensating Actions
- Accept eventual consistency
- Design for idempotency
- Handle conflicts gracefully
```

### Challenge 3: Testing
```
Solution: Testing Strategy
- Unit tests (within service)
- Contract tests (between services)
- Integration tests (end-to-end)
- Chaos testing (resilience)
```

### Challenge 4: Operational Complexity
```
Solution: DevOps Practices
- CI/CD pipelines
- Infrastructure as Code
- Centralized logging
- Distributed tracing
- Service mesh (Istio, Linkerd)
```

## When to Avoid Microservices

```
❌ Small team (< 10 developers)
❌ Simple domain
❌ Early-stage startup
❌ Limited operational expertise
❌ Tight deadlines
❌ Monolithic database required
❌ Strong transactional requirements
```

## Further Reading

- "Building Microservices" - Sam Newman
- "Microservices Patterns" - Chris Richardson
- "Domain-Driven Design" - Eric Evans
- martinfowler.com/articles/microservices.html
