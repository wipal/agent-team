---
name: system-design
description: |
  Use when designing distributed systems, understanding scalability patterns,
  or making architecture decisions that involve multiple components.
  Covers CAP theorem, consistency patterns, scalability strategies, and resilience patterns.
version: 1.0.0
category: architecture
tags:
  - distributed-systems
  - scalability
  - resilience
  - system-design
depends_on: []
recommends:
  - architecture-patterns
  - adr-writing
used_by:
  - tech-selection
  - architecture-patterns
  - performance-engineering
  - security-architecture
references:
  - references/distributed-systems.md
  - references/scalability.md
  - references/resilience.md
---

# System Design

## Core Principle
**Design for failure, scale horizontally, and keep things simple until you need complexity.**

## When to Use This Skill

### Trigger Conditions
- Designing a new system or service
- Evaluating architecture for scalability
- Planning for high availability
- Reviewing system resilience
- Making technology decisions for infrastructure

### Keywords
- "design a system"
- "architecture for"
- "scalability"
- "high availability"
- "distributed system"
- "fault tolerance"
- "disaster recovery"

## Core Concepts

### 1. CAP Theorem
In distributed systems, you can only guarantee 2 of 3:
- **Consistency** - All nodes see same data at same time
- **Availability** - System always responds (may be stale data)
- **Partition Tolerance** - System continues despite network failures

```
         CAP Theorem
              │
      ┌───────┴───────┐
      │               │
   ┌──┴──┐         ┌──┴──┐
   │  C  │         │  A  │
   └──┬──┘         └──┬──┘
      │    ┌───┐      │
      └────┤ P ├──────┘
           └───┘

C + P = CP Systems (MongoDB, Redis, HBase)
A + P = AP Systems (Cassandra, DynamoDB, CouchDB)
C + A = CA Systems (RDBMS - not truly distributed)
```

### 2. Scalability Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Horizontal** | Add more machines | Web servers, stateless services |
| **Vertical** | Bigger machines | Databases (until sharding) |
| **Sharding** | Partition data | Large datasets, high write volume |
| **Read Replicas** | Copy for reads | Read-heavy workloads |

### 3. Consistency Patterns

| Pattern | Description | Trade-off |
|---------|-------------|-----------|
| **Strong** | Immediate consistency | Higher latency |
| **Eventual** | Converge over time | Stale reads possible |
| **Causal** | Preserve causality | Complex implementation |

### 4. Availability Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Active-Active** | All nodes serve traffic | Maximum availability |
| **Active-Passive** | Failover to standby | Simpler, lower cost |
| **Multi-Region** | Geographic distribution | Disaster recovery |

## Design Process

### Step 1: Requirements Gathering
```
Functional Requirements:
- What does the system do?
- Who are the users?
- What are the use cases?

Non-Functional Requirements:
- Scale: How many users/requests?
- Performance: What latency?
- Availability: What uptime SLA?
- Consistency: Strong vs eventual?
```

### Step 2: Capacity Estimation
```
Traffic Estimation:
- Daily Active Users (DAU)
- Requests per second (RPS)
- Read vs Write ratio

Storage Estimation:
- Data size per entity
- Growth rate
- Retention period

Bandwidth Estimation:
- Request/response sizes
- Peak vs average traffic
```

### Step 3: High-Level Design
```
1. Define system interfaces (API)
2. Create component diagram
3. Identify data flow
4. Choose data stores
5. Define communication patterns
```

### Step 4: Deep Dive
```
For each component:
- Algorithm choice
- Data model
- Scaling strategy
- Failure handling
- Monitoring needs
```

## Common System Design Templates

### 1. Web Application
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Client  │───▶│   LB    │───▶│  API    │───▶│   DB    │
│ (Web)   │    │         │    │ Server  │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                    │
                    ▼
               ┌─────────┐
               │ Cache   │
               │ (Redis) │
               └─────────┘
```

### 2. Real-time System
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Client  │◀──▶│WebSocket│───▶│ Message │───▶│ Workers │
│         │    │ Server  │    │  Queue  │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                   │
                                   ▼
                              ┌─────────┐
                              │   DB    │
                              └─────────┘
```

### 3. Microservices
```
┌─────────┐    ┌─────────────────────────────────────┐
│ Gateway │───▶│           Service Mesh              │
└─────────┘    │  ┌───────┐ ┌───────┐ ┌───────┐    │
               │  │ Svc A │ │ Svc B │ │ Svc C │    │
               │  └───┬───┘ └───┬───┘ └───┬───┘    │
               └──────┼─────────┼─────────┼────────┘
                      │         │         │
                      ▼         ▼         ▼
                   ┌─────┐ ┌─────┐ ┌─────┐
                   │ DB1 │ │ DB2 │ │ DB3 │
                   └─────┘ └─────┘ └─────┘
```

## Rules

### DO
- ✅ Start simple, add complexity as needed
- ✅ Design for failure (circuit breakers, retries)
- ✅ Use caching strategically
- ✅ Plan for horizontal scaling
- ✅ Monitor everything
- ✅ Document decisions

### DON'T
- ❌ Over-engineer for scale you don't have
- ❌ Ignore operational concerns
- ❌ Skip capacity planning
- ❌ Forget about security
- ❌ Make everything distributed

## Output

When using this skill, produce:
1. **System Design Document** - High-level architecture
2. **Component Diagram** - Visual representation
3. **Data Flow Diagram** - How data moves
4. **Capacity Estimates** - Resource requirements
5. **ADR** - Key decisions documented

## Related Skills
- `architecture-patterns` - Specific architecture styles
- `tech-selection` - Technology choices
- `performance-engineering` - Optimization strategies
