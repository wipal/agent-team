# Scalability Strategies

## What is Scalability?
The ability of a system to handle growing amounts of work by adding resources.

## Types of Scaling

### Vertical Scaling (Scale Up)
```
Before:                    After:
┌──────────┐              ┌──────────────────┐
│  4 CPU   │              │     64 CPU       │
│  16 GB   │     ──▶      │     256 GB       │
│  1 TB    │              │     16 TB        │
└──────────┘              └──────────────────┘

Pros:
- Simple (no code changes)
- Strong consistency (single node)
- Lower latency (no network)

Cons:
- Hardware limits
- Expensive at scale
- Single point of failure
- Downtime for upgrades
```

### Horizontal Scaling (Scale Out)
```
Before:                    After:
┌──────────┐              ┌──────────┐
│  Server  │              │ Server 1 │
│          │     ──▶      ├──────────┤
└──────────┘              │ Server 2 │
                          ├──────────┤
                          │ Server 3 │
                          └──────────┘

Pros:
- Nearly unlimited scale
- Commodity hardware
- No single point of failure
- Incremental growth

Cons:
- Complexity (distributed)
- Network latency
- Data consistency challenges
- Load balancing needed
```

## Load Balancing

### Algorithms
```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │ Server1 │  │ Server2 │  │ Server3 │  │ Server4 │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘

Strategies:
1. Round Robin - Rotate through servers
2. Weighted Round Robin - More weight to stronger servers
3. Least Connections - Route to least busy
4. IP Hash - Same IP to same server (session affinity)
5. Least Response Time - Route to fastest responding
6. Random - Distribute randomly
```

### Health Checks
```
Active Health Checks:
- LB periodically checks endpoint
- Remove unhealthy servers from pool
- Add back when healthy

Passive Health Checks:
- Monitor real requests
- Track failure rates
- Circuit breaker pattern
```

## Database Scaling

### Read Replicas
```
                ┌─────────────┐
                │   Primary   │
                │  (Writes)   │
                └──────┬──────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │ Replica1 │ │ Replica2 │ │ Replica3 │
   │ (Reads)  │ │ (Reads)  │ │ (Reads)  │
   └──────────┘ └──────────┘ └──────────┘

Considerations:
- Replication lag
- Read-after-write consistency
- Connection routing
```

### Sharding (Horizontal Partitioning)
```
Sharding Strategies:

1. Range-based:
   Shard 1: Users 1-1,000,000
   Shard 2: Users 1,000,001-2,000,000
   Shard 3: Users 2,000,001-3,000,000

   Pros: Range queries efficient
   Cons: Hot spots, uneven distribution

2. Hash-based:
   Shard = hash(user_id) % num_shards

   Pros: Even distribution
   Cons: Range queries inefficient, resharding complex

3. Directory-based:
   Lookup table: user_id → shard

   Pros: Flexible, easy resharding
   Cons: Lookup overhead, single point of failure

4. Geographic:
   Shard by location (US, EU, Asia)

   Pros: Compliance, latency
   Cons: Uneven distribution possible
```

### Vertical Partitioning
```
Split by functionality:

┌─────────────────┐     ┌─────────────────┐
│   Users DB      │     │   Orders DB     │
├─────────────────┤     ├─────────────────┤
│ id              │     │ id              │
│ email           │     │ user_id         │
│ password_hash   │     │ total           │
│ created_at      │     │ status          │
└─────────────────┘     │ created_at      │
                        └─────────────────┘

Benefits:
- Smaller tables, better cache
- Isolated scaling
- Security (sensitive data separate)
```

## Caching Strategies

### Cache Patterns
```
1. Cache-aside (Lazy Loading)
   ┌───────┐     ┌───────┐     ┌───────┐
   │Client │────▶│Cache  │────▶│  DB   │
   └───────┘     └───────┘     └───────┘
                     │
                     │ miss
                     ▼
   Application code manages cache
   On read: Check cache → if miss, read DB → populate cache
   On write: Update DB → invalidate cache

2. Write-through
   ┌───────┐     ┌───────┐     ┌───────┐
   │Client │────▶│Cache  │────▶│  DB   │
   └───────┘     └───────┘     └───────┘
                     │
                     │ always write both
                     ▼
   Write to cache AND DB synchronously
   Data always consistent

3. Write-behind (Write-back)
   ┌───────┐     ┌───────┐     ┌───────┐
   │Client │────▶│Cache  │────▶│  DB   │
   └───────┘     └───────┘     └───────┘
                     │
                     │ async write to DB
                     ▼
   Write to cache, async write to DB
   Higher throughput, risk of data loss

4. Refresh-ahead
   Proactively refresh before expiration
   Good for predictable access patterns
```

### Cache Eviction Policies
```
LRU (Least Recently Used):
- Evict item not accessed longest
- Good for temporal locality

LFU (Least Frequently Used):
- Evict item accessed least often
- Good for popularity-based access

FIFO (First In First Out):
- Simple queue-based eviction
- Less optimal but simple

TTL (Time To Live):
- Expire after time period
- Good for stale data prevention
```

## Queue-Based Scaling

### Message Queue Pattern
```
┌─────────┐     ┌─────────────┐     ┌─────────┐
│Producer │────▶│   Queue     │────▶│Consumer │
└─────────┘     │             │     └─────────┘
                │ ┌─┬─┬─┬─┬─┐ │
                │ └─┴─┴─┴─┴─┘ │
                └─────────────┘

Benefits:
- Decouple producers from consumers
- Handle traffic spikes (queue absorbs)
- Scale consumers independently
- Asynchronous processing

Examples:
- RabbitMQ, Kafka, SQS, Redis Streams
```

### Backpressure
```
When consumers can't keep up:

1. Drop (oldest/newest/random)
2. Block producer
3. Shed load (reject new requests)
4. Scale consumers
5. Buffer (temporary solution)
```

## Autoscaling

### Metrics for Scaling
```
Scale Out Triggers:
- CPU > 70% for 5 minutes
- Memory > 80% for 5 minutes
- Request queue depth > 100
- Response time > 500ms
- Custom business metrics

Scale In Triggers:
- CPU < 30% for 15 minutes
- Memory < 40% for 15 minutes
- Queue depth < 10
```

### Scaling Strategies
```
Reactive:
- Respond to current metrics
- May be too slow for spikes

Predictive:
- Use ML to predict load
- Scale before traffic arrives
- Requires historical data

Scheduled:
- Scale at known times
- Black Friday, end of month
- Simple and predictable
```

## Best Practices

### Design for Scale
1. **Stateless services** - No server affinity
2. **Idempotent operations** - Safe to retry
3. **Async where possible** - Don't block
4. **Partition data** - Enable horizontal scaling
5. **Cache aggressively** - Reduce DB load
6. **Use CDNs** - Offload static content

### Avoid
1. **Distributed transactions** - Use sagas
2. **Joins across shards** - Denormalize
3. **Synchronous dependencies** - Add queues
4. **Locks on hot data** - Use optimistic locking
5. **Single points of failure** - Replicate everything
