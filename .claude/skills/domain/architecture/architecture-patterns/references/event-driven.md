# Event-Driven Architecture

## Overview
Event-Driven Architecture (EDA) is a software design pattern in which decoupled services communicate via events - state changes that services publish and consume asynchronously.

## Core Concepts

### What is an Event?
```
An event is a record of something that happened:
- Immutable fact
- Past tense (OrderPlaced, not PlaceOrder)
- Contains relevant data
- Timestamped

Example Event:
{
  "type": "OrderPlaced",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "orderId": "12345",
    "customerId": "67890",
    "items": [...],
    "total": 99.99
  },
  "metadata": {
    "source": "order-service",
    "version": "1.0",
    "correlationId": "abc-123"
  }
}
```

### Event vs Command vs Query
```
Command (Imperative):
- "PlaceOrder" - Tells system to do something
- Expect specific handler
- Can be rejected
- Synchronous usually

Event (Declarative):
- "OrderPlaced" - Announces something happened
- No expectation of handler
- Cannot be rejected (already happened)
- Asynchronous

Query (Interrogative):
- "GetOrder" - Asks for data
- Expect response
- Does not change state
- Synchronous usually
```

## Architecture Patterns

### 1. Event Notification
```
Publisher only notifies that something happened:

Order Service                Inventory Service
     │                             │
     ├──▶ Event: OrderPlaced ─────▶│
     │                             ├──▶ Update inventory
     │                             │
     └──▶ (doesn't wait)           └──▶ (independent)

Characteristics:
- Simple notification
- Consumer decides what to do
- Very loosely coupled
- Publisher doesn't know consumers exist
```

### 2. Event-Carried State Transfer
```
Event contains full state needed:

Order Service                Reporting Service
     │                             │
     ├──▶ Event: OrderPlaced ─────▶│
     │    {full order data}        ├──▶ Store in read model
     │                             │
     └──▶ Consumer has all data    └──▶ No need to call back

Characteristics:
- Event contains all needed data
- Consumer doesn't need to query source
- Good for read models, analytics
- Larger event payloads
```

### 3. Event Sourcing
```
Store all state changes as events:

Traditional:                    Event Sourcing:
┌───────────────────┐          ┌───────────────────┐
│ Current State     │          │ Event Log         │
│ Order: #123       │          │ OrderCreated      │
│ Status: Shipped   │          │ ItemAdded         │
│ Total: $99        │          │ ItemAdded         │
└───────────────────┘          │ PaymentReceived   │
                               │ OrderShipped      │
                               └───────────────────┘

Current State = Replay all events

Benefits:
- Complete audit trail
- Time travel (state at any point)
- Easy debugging
- Append-only (no conflicts)

Challenges:
- Event schema evolution
- Replay complexity
- Storage growth
```

### 4. CQRS (Command Query Responsibility Segregation)
```
Separate read and write models:

                ┌───────────────────┐
   Commands ───▶│     Write Side    │
                │   (Optimized for  │
                │    writes)        │
                └─────────┬─────────┘
                          │
                          │ Events
                          ▼
                ┌───────────────────┐
   Queries ────▶│     Read Side     │
                │   (Optimized for  │◀── Events update
                │    queries)       │    read model
                └───────────────────┘

Benefits:
- Optimized read/write models
- Scale reads independently
- Complex queries without affecting writes
- Different data models for different views
```

## Event Patterns

### Event Producer Patterns

```
1. Event-First Design:
   - Design events before APIs
   - Events are the contract
   - Services react to events

2. Event Storming:
   - Domain experts + developers
   - Discover events together
   - Post-it notes on wall
   - Creates ubiquitous language

3. Domain Events:
   - Express business facts
   - Meaningful to domain experts
   - "OrderPlaced", "PaymentFailed"
```

### Event Consumer Patterns

```
1. Competing Consumers:
   ┌─────────────────────────────────────┐
   │           Event Stream              │
   └─────────────────┬───────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │Consumer1│ │Consumer2│ │Consumer3│
   │(same    │ │(same    │ │(same    │
   │ group)  │ │ group)  │ │ group)  │
   └─────────┘ └─────────┘ └─────────┘

   Only one consumer processes each event.
   Enables horizontal scaling.

2. Fan-out:
   ┌─────────────────────────────────────┐
   │           Event Stream              │
   └─────────────────┬───────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │ Email   │ │ SMS     │ │ Analytics│
   │ Service │ │ Service │ │ Service │
   └─────────┘ └─────────┘ └─────────┘

   Each consumer gets every event.
   Independent processing.
```

## Message Brokers

### Comparison
```
┌──────────────┬───────────────┬───────────────┬───────────────┐
│   Feature    │    Kafka      │   RabbitMQ    │     SQS       │
├──────────────┼───────────────┼───────────────┼───────────────┤
│ Throughput   │ Very High     │ Medium        │ High          │
│ Latency      │ Low           │ Very Low      │ Medium        │
│ Ordering     │ Per partition │ Not guaranteed│ FIFO queues   │
│ Replay       │ Yes           │ No            │ Limited       │
│ Retention    │ Configurable  │ Until consumed│ Configurable  │
│ Use Case     │ Event streaming│ Message queue │ Simple queue │
└──────────────┴───────────────┴───────────────┴───────────────┘
```

### Kafka Architecture
```
┌─────────────────────────────────────────────────────┐
│                    Kafka Cluster                    │
│  ┌─────────────────────────────────────────────┐   │
│  │                  Topic: orders              │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │
│  │  │Partition0│ │Partition1│ │Partition2│   │   │
│  │  │          │ │          │ │          │   │   │
│  │  │  msgs... │ │  msgs... │ │  msgs... │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘   │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         ▲                           │
         │ Produce                    │ Consume
         │                           │
┌────────┴────────┐          ┌────────┴────────┐
│    Producer     │          │    Consumer     │
│   (Order Svc)   │          │ (Email Service) │
└─────────────────┘          └─────────────────┘

Key Features:
- Partitioned for scalability
- Offset-based consumption
- Long retention (days/weeks)
- Replay capability
```

## Event Schema Design

### Schema Evolution
```
Backward Compatible Changes:
✅ Add optional field
✅ Add new event type
✅ Rename field (with alias)

Breaking Changes:
❌ Remove required field
❌ Change field type
❌ Rename field (without alias)

Best Practices:
- Use schema registry
- Version your schemas
- Plan for evolution
- Document changes
```

### Event Envelope
```
Standard event structure:

{
  "metadata": {
    "eventId": "uuid",
    "eventType": "OrderPlaced",
    "eventVersion": "1.0",
    "timestamp": "2024-01-15T10:30:00Z",
    "source": "order-service",
    "correlationId": "trace-123",
    "causationId": "command-456"
  },
  "data": {
    // Event-specific payload
  }
}

Metadata enables:
- Tracing
- Replay
- Debugging
- Routing
```

## Idempotency

### Why Idempotency Matters
```
At-least-once delivery means duplicates can occur:

Producer ──▶ Event1 ──▶ Consumer
              │
              └──▶ Event1 (retry) ──▶ Consumer

Consumer might receive same event twice!

Solution: Make processing idempotent
```

### Idempotency Patterns
```
1. Natural Idempotency:
   - Update SET status = 'shipped' WHERE id = 123
   - Running twice = same result

2. Idempotency Key:
   - Check if event processed before
   - Store processed event IDs
   - Skip if already processed

3. Deduplication Table:
   ┌────────────────────────────┐
   │ processed_events           │
   ├────────────────────────────┤
   │ event_id | processed_at    │
   └────────────────────────────┘

   Before processing:
   IF NOT EXISTS (SELECT 1 FROM processed_events WHERE event_id = ?)
   THEN process and insert
```

## Challenges & Solutions

### 1. Event Ordering
```
Problem: Events arrive out of order

Solutions:
- Partition by aggregate ID (Kafka)
- Sequence numbers + reordering
- Accept eventual consistency
```

### 2. Error Handling
```
Problem: What if consumer fails?

Strategies:
- Dead Letter Queue (DLQ)
- Retry with backoff
- Skip and log
- Poison pill handling
```

### 3. Monitoring
```
What to monitor:
- Event lag (messages behind)
- Processing latency
- Error rates
- Consumer group status
- Queue depths
```

## Use Cases

### Best for EDA
```
✅ Async workflows (order processing)
✅ Real-time notifications
✅ Event sourcing
✅ Analytics pipelines
✅ IoT data ingestion
✅ Audit logging
✅ Eventual consistency acceptable
```

### Not Ideal for EDA
```
❌ Real-time collaboration (use WebSockets)
❌ Strong consistency required
❌ Simple request-response
❌ Low latency requirements
❌ Small scale, simple domain
```

## Further Reading

- "Enterprise Integration Patterns" - Gregor Hohpe
- "Event Streams in Action" - Adam Bellemare
- "Building Event-Driven Microservices" - Adam Bellemare
- Event Storming - Alberto Brandolini
- martinfowler.com/articles/201701-event-driven.html
