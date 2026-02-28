# Monolithic Architecture

## Overview
A monolithic architecture builds the entire application as a single unit - one codebase, one deployment, one database.

## Types of Monoliths

### 1. Single-Layer Monolith
```
┌─────────────────────────────────────────┐
│            Application                  │
│  ┌─────────────────────────────────┐   │
│  │    UI + Business Logic + Data   │   │
│  │         (Everything mixed)      │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘

Simple but hard to maintain as it grows.
```

### 2. Layered Monolith (N-Tier)
```
┌─────────────────────────────────────────┐
│            Presentation Layer           │
│           (Controllers, Views)          │
├─────────────────────────────────────────┤
│            Business Layer               │
│           (Services, Domain)            │
├─────────────────────────────────────────┤
│            Data Access Layer            │
│           (Repositories, DAOs)          │
├─────────────────────────────────────────┤
│            Database                     │
└─────────────────────────────────────────┘

Classic separation of concerns.
```

### 3. Modular Monolith
```
┌─────────────────────────────────────────────────┐
│                   Application                    │
├─────────────┬─────────────┬─────────────────────┤
│   Users     │   Orders    │     Products        │
│  Module     │  Module     │     Module          │
│ ┌─────────┐ │ ┌─────────┐ │ ┌─────────────────┐ │
│ │ Service │ │ │ Service │ │ │    Service      │ │
│ │  Layer  │ │ │  Layer  │ │ │     Layer       │ │
│ ├─────────┤ │ ├─────────┤ │ ├─────────────────┤ │
│ │  Data   │ │ │  Data   │ │ │      Data       │ │
│ │ Access  │ │ │ Access  │ │ │     Access      │ │
│ └─────────┘ │ └─────────┘ │ └─────────────────┘ │
├─────────────┴─────────────┴─────────────────────┤
│              Shared Infrastructure              │
└─────────────────────────────────────────────────┘

Best of both worlds: module boundaries + single deployment.
```

## Benefits of Monolith

### 1. Simplicity
```
Development:
- Single codebase
- Single build process
- Single deployment artifact
- Easy IDE support

Testing:
- Simple unit tests
- No service mocking
- Fast integration tests
- Easier end-to-end testing
```

### 2. Performance
```
In-process communication:
- No network overhead
- No serialization
- Fast method calls
- Shared memory access

vs Microservices:
┌─────────┐  Network  ┌─────────┐
│ Service │ ─────────▶│ Service │  ~10-100ms
│    A    │           │    B    │
└─────────┘           └─────────┘

┌─────────────────────────┐
│  Method call in-process │  ~0.001ms
└─────────────────────────┘
```

### 3. Transaction Management
```
ACID transactions are easy:
BEGIN TRANSACTION
  UPDATE accounts SET balance = balance - 100 WHERE id = 1
  UPDATE accounts SET balance = balance + 100 WHERE id = 2
COMMIT

vs Distributed transactions:
- Complex coordination
- Performance overhead
- Failure scenarios
```

### 4. Operational Simplicity
```
Single artifact:
- One deployment pipeline
- One set of logs
- One monitoring dashboard
- One troubleshooting session

Infrastructure:
- Single server (or few)
- Simple load balancing
- Single database
- Easy backups
```

## Drawbacks of Monolith

### 1. Scaling Limitations
```
To scale one feature, scale entire app:

Need: More order processing capacity
Result: Scale entire monolith (including unused features)

        ┌─────────────┐
        │  Monolith   │
        │ ┌─────────┐ │
        │ │ Orders  │ │◀── Need to scale
        │ ├─────────┤ │
        │ │ Users   │ │◀── Scaled unnecessarily
        │ ├─────────┤ │
        │ │Products │ │◀── Scaled unnecessarily
        │ └─────────┘ │
        └─────────────┘
```

### 2. Technology Lock-in
```
Monolith is locked to:
- One language
- One framework
- One database type
- One version of everything

Migrating:
- Rewrite entire application
- High risk, high effort
```

### 3. Team Coordination
```
Large team on single codebase:
- Merge conflicts
- Regression bugs
- Deployment coordination
- Testing bottlenecks

┌─────────────────────────────────────────┐
│          Development Team               │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │Dev 1│ │Dev 2│ │Dev 3│ │Dev 4│      │
│  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘      │
│     │       │       │       │          │
│     └───────┴───────┴───────┘          │
│                 │                       │
│                 ▼                       │
│     ┌─────────────────────┐            │
│     │   Single Codebase   │            │
│     │  (Many conflicts!)  │            │
│     └─────────────────────┘            │
└─────────────────────────────────────────┘
```

### 4. Deployment Risk
```
Any change = full deployment:

Change: Fix typo in about page
Result:
- Rebuild entire application
- Redeploy entire application
- Risk of breaking anything
- Longer deployment cycles
```

## Modular Monolith Best Practices

### 1. Clear Module Boundaries
```
Structure:
src/
├── modules/
│   ├── users/
│   │   ├── domain/         # Entities, value objects
│   │   ├── application/    # Use cases, services
│   │   ├── infrastructure/ # Repositories, external
│   │   └── interface/      # Controllers, DTOs
│   ├── orders/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── interface/
│   └── products/
│       └── ...
├── shared/                 # Truly shared code
└── main.py                 # Application entry

Rules:
- Modules don't depend on other modules' internals
- Communication through well-defined interfaces
- Shared code is minimal
```

### 2. Enforce Boundaries
```
Static Analysis:
- Check module dependencies
- Fail build on boundary violations
- Use package visibility

┌────────────────────────────────────────────┐
│            Dependency Check                │
├────────────────────────────────────────────┤
│ users → orders.domain ❌ NOT ALLOWED       │
│ users → orders.interface ✅ ALLOWED        │
└────────────────────────────────────────────┘
```

### 3. Separate Schemas (Logical)
```
Same database, separate schemas:

Database: myapp
├── Schema: users
│   ├── users
│   └── sessions
├── Schema: orders
│   ├── orders
│   └── order_items
└── Schema: products
    ├── products
    └── categories

Benefits:
- Clear data ownership
- Easy to split later
- No cross-schema joins (enforce)
```

## When to Choose Monolith

### ✅ Good Candidates
```
- Early-stage startup
- Small team (< 10 developers)
- Simple to medium domain
- Need fast time to market
- Limited operational resources
- Strong consistency requirements
- Learning/new project
```

### ❌ Poor Candidates
```
- Large team (> 50 developers)
- Complex domain with independent parts
- Need independent scaling
- Different technology requirements
- Multiple deployment frequencies
- Need fault isolation
```

## Migration Path to Microservices

### Phase 1: Modularize
```
Before:
┌─────────────────────────────────────────┐
│           Spaghetti Monolith            │
│   (everything connected to everything)  │
└─────────────────────────────────────────┘

After:
┌─────────────────────────────────────────┐
│           Modular Monolith              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Module A│ │ Module B│ │ Module C│   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

### Phase 2: Extract Services
```
Use Strangler Fig Pattern:

1. Choose least coupled module
2. Extract as service
3. Route traffic to new service
4. Repeat for other modules

┌─────────────────┐     ┌─────────┐
│    Monolith     │     │ Extracted│
│   (remaining)   │     │ Service │
└─────────────────┘     └─────────┘
```

## Further Reading

- "Patterns of Enterprise Application Architecture" - Martin Fowler
- "Clean Architecture" - Robert C. Martin
- "Domain-Driven Design" - Eric Evans
- Kamil Grzybek's Modular Monolith articles
