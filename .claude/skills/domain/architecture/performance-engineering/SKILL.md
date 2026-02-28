---
name: performance-engineering
description: |
  Use when optimizing system performance, designing caching strategies,
  or planning for scalability. Covers caching, optimization techniques,
  and performance testing.
version: 1.0.0
category: performance
tags:
  - performance
  - caching
  - optimization
  - benchmarking
dependencies:
  - system-design
references:
  - references/caching-strategies.md
  - references/optimization.md
  - references/benchmarking.md
---

# Performance Engineering

## Core Principle
**Measure first, optimize what matters, trade-off consciously.**

## When to Use This Skill

### Trigger Conditions
- System performance issues
- Capacity planning
- Caching strategy design
- Performance optimization
- Load testing

### Keywords
- "performance"
- "optimization"
- "caching"
- "latency"
- "throughput"
- "load testing"

## Performance Metrics

### Key Metrics (USE/RED)
```
USE Method (Resources):
- Utilization: % busy
- Saturation: Queue length
- Errors: Error count

RED Method (Services):
- Rate: Requests/second
- Errors: Failed requests/second
- Duration: Latency distribution (p50, p95, p99)
```

### Latency Percentiles
```
p50 (median): 50% of requests faster than this
p95: 95% of requests faster than this
p99: 99% of requests faster than this

Example:
p50: 100ms - Most users see this
p95: 250ms - 5% see slower
p99: 500ms - 1% see slower (often problematic queries)

Target: Focus on p95/p99 for user experience
```

## Caching Strategies

### Cache Locations
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Browser │────▶│   CDN   │────▶│  Load   │────▶│   App   │
│  Cache  │     │  Cache  │     │Balancer │     │  Cache  │
└─────────┘     └─────────┘     └─────────┘     └────┬────┘
                                                     │
                                                ┌────┴────┐
                                                │Database │
                                                │  Cache  │
                                                └─────────┘
```

### Caching Patterns
```
1. Cache-Aside (Lazy Load)
   - Check cache first
   - On miss, load from DB
   - Populate cache
   - Return data

2. Write-Through
   - Write to cache AND DB
   - Always consistent
   - Higher write latency

3. Write-Behind
   - Write to cache
   - Async write to DB
   - Risk of data loss

4. Refresh-Ahead
   - Pre-refresh before expiry
   - Good for predictable access
```

## Optimization Techniques

### Application Level
```
1. Database Queries
   - Use indexes effectively
   - Avoid N+1 queries
   - Use connection pooling
   - Query optimization

2. Code Optimization
   - Algorithm efficiency
   - Memory management
   - Avoid premature optimization
   - Profile before optimizing

3. Concurrency
   - Async/await patterns
   - Thread pools
   - Non-blocking I/O
```

### Infrastructure Level
```
1. Horizontal Scaling
   - Add more instances
   - Load balance

2. Vertical Scaling
   - More CPU/RAM
   - Faster storage

3. CDN
   - Static assets
   - Edge caching
   - Geographic distribution
```

## Performance Testing

### Types of Tests
```
1. Load Testing
   - Expected load
   - Normal conditions

2. Stress Testing
   - Beyond capacity
   - Find breaking point

3. Spike Testing
   - Sudden traffic increase
   - Auto-scaling validation

4. Soak Testing
   - Extended period
   - Memory leaks, resource exhaustion
```

### Testing Tools
```
- k6: Modern load testing
- JMeter: Feature-rich, Java-based
- Locust: Python-based
- Artillery: Node.js based
- Gatling: Scala-based, high performance
```

## Performance Checklist

### Frontend
- [ ] Minimize HTTP requests
- [ ] Enable compression (gzip/brotli)
- [ ] Optimize images
- [ ] Use CDN
- [ ] Minify CSS/JS
- [ ] Lazy loading
- [ ] Code splitting

### Backend
- [ ] Database indexing
- [ ] Query optimization
- [ ] Connection pooling
- [ ] Caching implemented
- [ ] Async processing
- [ ] Rate limiting

### Infrastructure
- [ ] Load balancing
- [ ] Auto-scaling
- [ ] Monitoring & alerting
- [ ] CDN configuration
- [ ] SSL termination

## Output

When optimizing performance:
1. **Performance Report** - Current metrics, bottlenecks
2. **Optimization Plan** - Prioritized improvements
3. **Before/After Metrics** - Measured impact
4. **ADR** - Significant performance decisions

## Rules

### DO
- ✅ Measure before optimizing
- ✅ Focus on bottlenecks
- ✅ Set performance targets
- ✅ Monitor continuously
- ✅ Test at production scale

### DON'T
- ❌ Premature optimization
- ❌ Optimize without profiling
- ❌ Ignore trade-offs
- ❌ Skip load testing
- ❌ Trust benchmarks blindly
