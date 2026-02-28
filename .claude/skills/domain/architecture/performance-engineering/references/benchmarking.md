# Benchmarking & Load Testing

## Load Testing Types

### 1. Load Testing
```
Purpose: Verify system handles expected load

Configuration:
- Expected concurrent users
- Expected request rate
- Typical usage patterns

Success Criteria:
- Response time within SLA
- Error rate below threshold
- Resource utilization acceptable
```

### 2. Stress Testing
```
Purpose: Find system breaking point

Configuration:
- Gradually increase load beyond capacity
- Monitor for degradation
- Identify failure mode

Success Criteria:
- Understand system limits
- Identify bottleneck
- Graceful degradation behavior
```

### 3. Spike Testing
```
Purpose: Test sudden traffic increase

Configuration:
- Baseline load
- Sudden spike (10x traffic)
- Return to baseline

Success Criteria:
- Auto-scaling triggers
- No cascade failures
- Recovery to normal
```

### 4. Soak Testing
```
Purpose: Find issues over time

Configuration:
- Sustained load (hours/days)
- Monitor for degradation
- Look for memory leaks

Success Criteria:
- Stable performance over time
- No memory growth
- No resource exhaustion
```

## Load Testing Tools

### k6 (Recommended)
```javascript
// script.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp up
    { duration: '1m', target: 20 },    // Stay
    { duration: '30s', target: 100 },  // Spike
    { duration: '1m', target: 100 },   // Stay
    { duration: '30s', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% under 500ms
    http_req_failed: ['rate<0.01'],   // <1% errors
  },
};

export default function () {
  const res = http.get('https://api.example.com/users');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 500,
  });

  sleep(1);
}

// Run: k6 run script.js
```

### Locust (Python)
```python
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_users(self):
        self.client.get("/users")

    @task(3)  # 3x more frequent
    def get_products(self):
        self.client.get("/products")

# Run: locust -f locustfile.py
```

### Artillery (Node.js)
```yaml
config:
  target: 'https://api.example.com'
  phases:
    - duration: 60
      arrivalRate: 10
      name: Warm up
    - duration: 120
      arrivalRate: 50
      name: Sustained load

scenarios:
  - flow:
      - get:
          url: "/users"
      - think: 2
      - get:
          url: "/products"

# Run: artillery run config.yml
```

## Performance Metrics

### Key Metrics to Track
```
1. Throughput
   - Requests per second (RPS)
   - Transactions per second (TPS)
   - Messages per second

2. Latency
   - p50 (median)
   - p90
   - p95
   - p99
   - p99.9

3. Error Rate
   - HTTP 4xx errors
   - HTTP 5xx errors
   - Timeouts
   - Connection errors

4. Resource Utilization
   - CPU usage
   - Memory usage
   - Disk I/O
   - Network I/O
   - Database connections
```

### Interpreting Results
```
Good Results:
- Flat latency as load increases (until saturation)
- Linear throughput increase with load
- Error rate < 0.1%
- Resource utilization < 80%

Warning Signs:
- Latency increases exponentially
- Throughput plateaus while latency increases
- Error rate spikes
- Resource exhaustion

Bottleneck Indicators:
- High CPU, low throughput → Algorithm optimization
- High memory → Memory leak, inefficient data structures
- High I/O wait → Disk bottleneck, database queries
- High network → Bandwidth limitation
```

## Test Environment

### Production-Like Environment
```
Requirements:
- Same hardware specifications
- Same software versions
- Same configuration
- Same data volume (or representative subset)
- Same network conditions

Database:
- Use production-like data distribution
- Same indexes
- Same query patterns
```

### Test Data
```
Options:
1. Production data (anonymized)
2. Synthetic data (realistic distribution)
3. Subset of production

Considerations:
- Data volume affects performance
- Data distribution affects query plans
- Sensitive data handling
```

## Benchmarking Best Practices

### Before Testing
```
1. Define clear objectives
   - What are you testing?
   - What's the success criteria?

2. Establish baseline
   - Run tests on known-good configuration
   - Document baseline metrics

3. Prepare environment
   - Clean state
   - No other load
   - Monitoring ready
```

### During Testing
```
1. Monitor all layers
   - Application logs
   - Database metrics
   - Infrastructure metrics
   - Network metrics

2. Capture data
   - Response times
   - Error logs
   - Resource utilization
   - GC pauses (if applicable)

3. Note observations
   - When did degradation start?
   - What failed first?
   - Error patterns?
```

### After Testing
```
1. Analyze results
   - Compare to baseline
   - Identify bottlenecks
   - Document findings

2. Report
   - Executive summary
   - Key metrics
   - Recommendations

3. Action items
   - Prioritize fixes
   - Estimate effort
   - Plan retest
```

## Continuous Performance Testing

### CI/CD Integration
```yaml
# .github/workflows/performance.yml
name: Performance Tests

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2am
  workflow_dispatch:

jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run k6
        uses: grafana/k6-action@v0.3.0
        with:
          filename: tests/load/basic.js
        env:
          K6_CLOUD_TOKEN: ${{ secrets.K6_TOKEN }}

      - name: Check thresholds
        run: |
          # Fail if p95 > 500ms
          if [ $(cat results.json | jq '.metrics.http_req_duration.values["p(95)"]') -gt 500 ]; then
            echo "Performance regression detected"
            exit 1
          fi
```

### Performance Budgets
```
Define and enforce budgets:

Frontend:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

API:
- p95 latency: < 200ms
- p99 latency: < 500ms
- Error rate: < 0.1%

Database:
- Query time p95: < 50ms
- Connection pool usage: < 80%

Enforcement:
- Build fails if budget exceeded
- PR checks for performance
- Automated alerts
```
