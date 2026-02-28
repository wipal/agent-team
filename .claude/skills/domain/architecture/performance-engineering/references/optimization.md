# Optimization Techniques

## Optimization Process

### 1. Measure First
```
"Premature optimization is the root of all evil" - Donald Knuth

Steps:
1. Establish baseline metrics
2. Identify bottlenecks
3. Profile to find root causes
4. Optimize
5. Measure improvement
6. Document
```

### 2. Identify Bottlenecks
```
Common Bottlenecks (in order):
1. Database (most common)
2. Network I/O
3. Disk I/O
4. CPU
5. Memory

Tools:
- APM: DataDog, New Relic, Dynatrace
- Profilers: pprof, py-spy, JProfiler
- Database: EXPLAIN, slow query log
```

## Database Optimization

### Query Optimization
```
1. Use EXPLAIN
   EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123;

   Look for:
   - Sequential scans (should use index)
   - High row estimates
   - Nested loops with many iterations

2. Index Strategy
   - Index columns in WHERE clauses
   - Composite indexes for multiple conditions
   - Covering indexes to avoid table access
   - Don't over-index (write performance)

3. Avoid N+1 Queries
   # Bad
   users = db.query("SELECT * FROM users")
   for user in users:
       orders = db.query("SELECT * FROM orders WHERE user_id = ?", user.id)

   # Good
   users = db.query("""
       SELECT u.*, o.id as order_id
       FROM users u
       LEFT JOIN orders o ON u.id = o.user_id
   """)

4. Pagination
   # Bad (offset gets slower with large offset)
   SELECT * FROM posts ORDER BY created_at LIMIT 10 OFFSET 10000

   # Good (keyset pagination)
   SELECT * FROM posts
   WHERE created_at < '2024-01-01'
   ORDER BY created_at DESC
   LIMIT 10
```

### Connection Pooling
```
Problem: Opening DB connections is expensive

Solution: Connection Pool

┌─────────────────────────────────────────────┐
│            Connection Pool                   │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│  │ C │ │ C │ │ C │ │ C │ │ C │ │ C │      │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘      │
└─────────────────────────────────────────────┘
        │
        ▼
   ┌─────────┐
   │Database │
   └─────────┘

Configuration:
pool_size = cpu_cores * 2 + disk_spindles
max_overflow = pool_size
pool_timeout = 30
```

## Application Optimization

### Algorithmic Optimization
```
Time Complexity Matters:

O(n²) for n=10,000 = 100,000,000 operations
O(n log n) for n=10,000 = 133,000 operations

Common Improvements:
- Nested loop → Hash map lookup
- Linear search → Binary search
- Repeated calculation → Memoization
```

### Memory Optimization
```
1. Object Pooling
   # Bad: Create new object each time
   def process():
       buffer = bytearray(1024*1024)  # 1MB allocation
       ...

   # Good: Reuse buffer
   buffer_pool = Pool(bytearray, args=(1024*1024,), maxsize=10)

   def process():
       buffer = buffer_pool.get()
       try:
           ...
       finally:
           buffer_pool.put(buffer)

2. Streaming
   # Bad: Load entire file
   data = file.read()  # OOM for large files

   # Good: Stream processing
   for line in file:
       process(line)

3. Lazy Loading
   class User:
       @property
       def orders(self):
           if not hasattr(self, '_orders'):
               self._orders = Order.query.filter_by(user_id=self.id)
           return self._orders
```

### Concurrency Optimization
```
1. Async I/O
   # Sync (blocking)
   result1 = api.call1()  # Wait 100ms
   result2 = api.call2()  # Wait 100ms
   # Total: 200ms

   # Async (concurrent)
   result1, result2 = await asyncio.gather(
       api.call1(),
       api.call2()
   )
   # Total: 100ms

2. Thread Pools
   with ThreadPoolExecutor(max_workers=10) as executor:
       futures = [executor.submit(process, item) for item in items]
       results = [f.result() for f in futures]

3. Connection Reuse
   # Bad: New connection per request
   def call_api():
       conn = http.client.HTTPSConnection("api.example.com")
       conn.request("GET", "/data")
       ...

   # Good: Connection pool
   session = requests.Session()  # Reuse connections
   def call_api():
       return session.get("https://api.example.com/data")
```

## Network Optimization

### HTTP Optimization
```
1. Keep-Alive
   Connection: keep-alive
   Reuse TCP connections

2. Compression
   Accept-Encoding: gzip, br
   Brotli > Gzip for compression ratio

3. HTTP/2
   - Multiplexing (multiple requests per connection)
   - Header compression
   - Server push

4. HTTP/3 (QUIC)
   - UDP-based
   - Faster connection establishment
   - Better on unreliable networks
```

### API Optimization
```
1. Batching
   # Bad: Multiple requests
   GET /users/1
   GET /users/2
   GET /users/3

   # Good: Batch request
   GET /users?ids=1,2,3

2. Field Selection
   # Bad: Return all fields
   GET /users/1
   {id, name, email, address, phone, created_at, updated_at, ...}

   # Good: Request needed fields
   GET /users/1?fields=id,name

3. Pagination
   GET /posts?page=1&limit=20
   Headers: X-Total-Count: 1000
            Link: <...page=2>; rel="next"

4. GraphQL (for complex needs)
   query {
     user(id: 1) {
       name
       email
       posts(first: 10) {
         title
       }
     }
   }
```

## Frontend Optimization

### Critical Rendering Path
```
1. Eliminate render-blocking resources
   - Async/defer scripts
   - Inline critical CSS

2. Minimize main thread work
   - Code splitting
   - Tree shaking

3. Optimize images
   - WebP/AVIF formats
   - Responsive images
   - Lazy loading
```

### Bundle Optimization
```
1. Code Splitting
   const LazyComponent = React.lazy(() => import('./Heavy'))

2. Tree Shaking
   // Bad
   import _ from 'lodash'
   // Good
   import debounce from 'lodash/debounce'

3. Minification
   - Terser for JS
   - cssnano for CSS
   - ImageOptim for images
```

## Cost-Benefit Analysis

### Optimization ROI
```
Before optimizing, consider:
1. How much time will this save?
2. How many users affected?
3. What's the development cost?
4. What's the maintenance cost?

Formula:
ROI = (Time_saved × Users × Value_per_second) / Development_cost

Example:
- Optimization saves 100ms
- 1M requests/day
- $0.001 per second of user time
- 2 days development

ROI = (0.1s × 1M × $0.001) / (16h × $100/h)
    = $100/day / $1600
    = 16 days to break even
```
