# Caching Strategies

## Cache Types

### 1. Browser Cache
```
HTTP Headers:
Cache-Control: max-age=31536000  // 1 year for static
Cache-Control: no-cache           // Revalidate
Cache-Control: private            // Browser only

ETag: "abc123"                    // Validation
Last-Modified: Wed, 21 Oct 2015   // Validation

Use for: Static assets, immutable content
```

### 2. CDN Cache
```
┌──────────┐     ┌──────────────────────────────┐
│  Origin  │     │            CDN               │
│  Server  │────▶│  ┌─────┐ ┌─────┐ ┌─────┐   │
│          │     │  │Edge1│ │Edge2│ │Edge3│   │
└──────────┘     │  └─────┘ └─────┘ └─────┘   │
                 └──────────────────────────────┘

CDN Features:
- Geographic distribution
- DDoS protection
- SSL termination
- Compression

Providers: Cloudflare, AWS CloudFront, Fastly, Akamai
```

### 3. Application Cache
```
In-Memory Cache (Redis, Memcached):

┌─────────┐     ┌─────────┐     ┌─────────┐
│   App   │────▶│  Redis  │     │   DB    │
│ Server  │     │ Cluster │     │         │
└─────────┘     └─────────┘     └─────────┘

Use for:
- Session data
- API response caching
- Rate limiting counters
- Leaderboards
- Real-time analytics
```

### 4. Database Cache
```
Query Cache:
- Cache query results
- Invalidate on write

Buffer Pool (InnoDB):
- Cache table data
- Cache indexes

Read Replicas:
- Offload read traffic
- Geographic distribution
```

## Caching Patterns

### Cache-Aside (Lazy Loading)
```
def get_user(user_id):
    # 1. Check cache
    cached = cache.get(f"user:{user_id}")
    if cached:
        return cached

    # 2. Load from DB
    user = db.query("SELECT * FROM users WHERE id = ?", user_id)

    # 3. Populate cache
    cache.set(f"user:{user_id}", user, ttl=3600)

    return user

Pros:
- Only caches what's requested
- Cache failure doesn't break app

Cons:
- Cache miss penalty
- Stale data possible
```

### Write-Through
```
def update_user(user_id, data):
    # 1. Update cache
    cache.set(f"user:{user_id}", data, ttl=3600)

    # 2. Update database
    db.query("UPDATE users SET ... WHERE id = ?", user_id)

    return data

Pros:
- Cache always fresh
- Read performance optimal

Cons:
- Write latency higher
- May cache unused data
```

### Write-Behind (Write-Back)
```
Write Queue: [update1, update2, update3]

def update_user(user_id, data):
    # 1. Update cache immediately
    cache.set(f"user:{user_id}", data)

    # 2. Queue for async DB write
    write_queue.push({user_id, data})

    return data

# Background worker:
def write_worker():
    while True:
        batch = write_queue.pop_batch(100)
        db.batch_update(batch)

Pros:
- Very fast writes
- Batch DB operations

Cons:
- Risk of data loss
- Complexity
```

### Refresh-Ahead
```
def get_user(user_id):
    cached = cache.get(f"user:{user_id}")

    # Check if nearing expiry
    ttl = cache.ttl(f"user:{user_id}")
    if ttl < 300:  # Less than 5 min
        # Async refresh
        refresh_queue.push(user_id)

    return cached or load_from_db(user_id)

# Background refresh
def refresh_worker():
    while True:
        user_id = refresh_queue.pop()
        user = db.query("SELECT * FROM users WHERE id = ?", user_id)
        cache.set(f"user:{user_id}", user, ttl=3600)

Pros:
- No cache misses
- Optimal read performance

Cons:
- May refresh unused data
- Complexity
```

## Cache Invalidation

### Strategies
```
1. Time-Based (TTL)
   cache.set(key, value, ttl=3600)
   Simple but may serve stale data

2. Event-Based
   On data change: cache.delete(key)
   Fresh but requires tracking

3. Version-Based
   key = f"user:{user_id}:v{version}"
   Increment version on change

4. Tag-Based
   cache.set(key, value, tags=["user:123", "posts"])
   Invalidate by tag
```

### Cache Stampede Prevention
```
Problem: Multiple requests miss cache simultaneously
Result: All hit database at once

Solutions:
1. Locking
   if cache.get(key) is None:
       if lock.acquire(key, timeout=5):
           value = db.query(...)
           cache.set(key, value)
           lock.release(key)
       else:
           time.sleep(0.1)
           return get_with_cache(key)

2. Probabilistic Early Refresh
   if random() < (current_time - expiry) / ttl:
       async_refresh(key)

3. Request Coalescing
   pending_requests[key].add(request_id)
   # Single DB query, respond to all waiters
```

## Cache Configuration

### Redis Best Practices
```
Memory Management:
maxmemory 4gb
maxmemory-policy allkeys-lru

Persistence (choose based on needs):
appendonly yes          # AOF for durability
save 900 1              # RDB snapshots

Replication:
replicaof master-host 6379

Keys Design:
- Use consistent prefixes
- Include TTL in key when relevant
- Keep keys short but meaningful

Examples:
user:123:profile        # User profile cache
session:abc123          # Session data
ratelimit:api:456       # Rate limit counter
cache:products:page:1   # Paginated cache
```

### Cache Warming
```
def warm_cache():
    """Pre-populate cache on startup"""

    # Popular products
    popular = db.query("SELECT * FROM products ORDER BY views DESC LIMIT 100")
    for product in popular:
        cache.set(f"product:{product.id}", product, ttl=3600)

    # User sessions
    active_sessions = db.query("SELECT * FROM sessions WHERE active = true")
    for session in active_sessions:
        cache.set(f"session:{session.id}", session, ttl=86400)

# Run on:
- Application startup
- Scheduled (hourly)
- After cache clear
```

## Monitoring

### Key Metrics
```
- Hit rate: cache_hits / (cache_hits + cache_misses)
- Latency: p50, p95, p99
- Memory usage: used_memory / maxmemory
- Evictions: keys evicted due to memory pressure
- Connections: current connections vs max
```

### Alerts
```
- Hit rate < 80%
- Memory usage > 90%
- Latency p99 > 10ms
- Evictions increasing
- Connection pool exhausted
```
