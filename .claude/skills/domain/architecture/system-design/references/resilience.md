# Resilience Patterns

## What is Resilience?
The ability of a system to provide and maintain an acceptable level of service in the face of faults and challenges to normal operation.

## Failure Types

### Hardware Failures
```
- Disk failure (1-5% annual failure rate)
- Memory errors (ECC can correct single-bit)
- Network failures (cables, switches)
- Power failures

Mitigation:
- Redundancy (RAID, multiple NICs)
- ECC memory
- UPS/generators
- Multi-AZ/multi-region
```

### Software Failures
```
- Bugs in application code
- Memory leaks
- Deadlocks
- Configuration errors
- Dependency failures

Mitigation:
- Testing (unit, integration, chaos)
- Monitoring and alerting
- Graceful degradation
- Circuit breakers
```

### Network Failures
```
- Packet loss
- Latency spikes
- Network partitions
- DNS failures

Mitigation:
- Retries with backoff
- Timeouts
- Circuit breakers
- Multiple endpoints
```

## Core Patterns

### 1. Circuit Breaker
```
States:
┌───────────┐
│  CLOSED   │ ← Normal operation, requests pass through
└─────┬─────┘
      │ failures exceed threshold
      ▼
┌───────────┐
│   OPEN    │ ← Requests fail fast, no downstream calls
└─────┬─────┘
      │ timeout expires
      ▼
┌───────────┐
│HALF-OPEN  │ ← Limited requests to test recovery
└───────────┘
      │
      ├─ success → CLOSE
      └─ failure → OPEN

Implementation:
```python
class CircuitBreaker:
    def __init__(self, threshold=5, timeout=60):
        self.failures = 0
        self.threshold = threshold
        self.timeout = timeout
        self.state = "CLOSED"
        self.last_failure = None

    def call(self, func):
        if self.state == "OPEN":
            if time.now() - self.last_failure > self.timeout:
                self.state = "HALF-OPEN"
            else:
                raise CircuitOpenError()

        try:
            result = func()
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise
```
```

### 2. Retry with Exponential Backoff
```
Pattern:
Attempt 1: ──────▶ Fail
          wait 1s
Attempt 2: ──────▶ Fail
          wait 2s
Attempt 3: ──────▶ Fail
          wait 4s
Attempt 4: ──────▶ Success!

Jitter:
Add randomness to prevent thundering herd:
wait_time = base_delay * (2 ^ attempt) + random_jitter
```

### 3. Timeout
```
Types:
1. Connection timeout - Time to establish connection
2. Read timeout - Time waiting for response
3. Write timeout - Time to send request

Guidelines:
- Set aggressive timeouts (fail fast)
- Different timeouts for different operations
- Monitor actual latencies to tune
- Consider SLAs when setting
```

### 4. Bulkhead
```
Isolate failures to prevent cascade:

┌─────────────────────────────────────┐
│           Application               │
├───────────┬───────────┬─────────────┤
│ Bulkhead 1│ Bulkhead 2│ Bulkhead 3  │
│ (Users)   │ (Orders)  │ (Payments)  │
│ ┌───────┐ │ ┌───────┐ │ ┌───────┐   │
│ │Pool:10│ │ │Pool:10│ │ │Pool:5 │   │
│ └───────┘ │ └───────┘ │ └───────┘   │
└───────────┴───────────┴─────────────┘

If Payments fails, Users and Orders still work.
```

### 5. Fallback
```
When primary fails, provide alternative:

1. Cache Fallback:
   try:
       data = api.get_data()
   except:
       data = cache.get("data_key")  # Stale but better than nothing

2. Default Value:
   try:
       recommendations = ml_service.get_recommendations()
   except:
       recommendations = get_popular_items()  # Simpler fallback

3. Graceful Degradation:
   try:
       full_page = render_with_recommendations()
   except:
       full_page = render_basic_page()  # Simpler version
```

### 6. Rate Limiting
```
Algorithms:

1. Token Bucket:
   - Bucket has N tokens
   - Each request consumes 1 token
   - Refills at rate R/second
   - Reject if empty

2. Sliding Window:
   - Track requests in time window
   - Count requests in last N seconds
   - Reject if over limit

3. Leaky Bucket:
   - Queue with constant processing rate
   - Requests queue up
   - Reject if queue full

Implementation locations:
- API Gateway (global)
- Load balancer (per-service)
- Application (per-user)
```

## Chaos Engineering

### Principles
```
1. Build a hypothesis around steady state
2. Vary real-world events
3. Run experiments in production
4. Automate experiments to run continuously
5. Minimize blast radius
```

### Common Experiments
```
1. Terminate instances
2. Add latency to network
3. Fail dependencies
4. Exhaust resources (CPU, memory, disk)
5. Corrupt messages
6. Manipulate clocks
```

### Tools
```
- Chaos Monkey (Netflix) - Random instance termination
- Gremlin - Comprehensive chaos platform
- Chaos Mesh - Kubernetes chaos
- Litmus - Cloud-native chaos engineering
- AWS FIS - Fault Injection Simulator
```

## Health Checks

### Liveness vs Readiness
```
Liveness Probe:
- "Is this process alive?"
- If fails, restart container
- Should be lightweight

Readiness Probe:
- "Is this service ready for traffic?"
- If fails, remove from load balancer
- Can check dependencies

Example:
/health/live  → {"status": "ok"}
/health/ready → {"status": "ok", "checks": {"db": "ok", "cache": "ok"}}
```

### Health Check Endpoints
```
Shallow Health Check:
- Only checks if process is running
- Fast, simple

Deep Health Check:
- Checks all dependencies
- Database connectivity
- Cache availability
- External service reachability
- Can be slow

Best Practice:
- Have both
- Use shallow for liveness
- Use deep for readiness/monitoring
```

## Monitoring & Observability

### Three Pillars
```
1. Metrics (Numbers)
   - Request rate, error rate, latency
   - CPU, memory, disk usage
   - Business metrics

2. Logs (Events)
   - Structured logging
   - Correlation IDs
   - Error context

3. Traces (Journeys)
   - Request flow across services
   - Latency breakdown
   - Dependency mapping
```

### RED Method (for services)
```
- Rate: Requests per second
- Errors: Failed requests per second
- Duration: Distribution of latencies (p50, p95, p99)
```

### USE Method (for resources)
```
- Utilization: % time resource busy
- Saturation: Queue length, waiting
- Errors: Error events count
```

## Incident Response

### Incident Lifecycle
```
1. Detection → 2. Triage → 3. Investigation
                                    ↓
6. Postmortem ← 5. Resolution ← 4. Mitigation
```

### Runbooks
```
For each alert, document:
1. What the alert means
2. Impact assessment
3. Investigation steps
4. Mitigation actions
5. Escalation path
6. Communication templates
```

### Postmortem Template
```
# Incident: [Title]

## Summary
- What happened?
- Impact (users affected, duration)

## Timeline
- [Time] Alert triggered
- [Time] Investigation started
- [Time] Root cause identified
- [Time] Fix deployed

## Root Cause
- Technical cause
- Process cause

## Action Items
- [ ] Prevent recurrence
- [ ] Improve detection
- [ ] Update runbooks

## Lessons Learned
- What went well
- What could be improved
```
