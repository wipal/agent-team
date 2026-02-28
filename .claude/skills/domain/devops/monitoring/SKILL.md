---
name: monitoring
description: |
  Application and infrastructure monitoring with Prometheus, Grafana, Datadog.
  Use when: setting up observability, creating dashboards, configuring alerts,
  or when user mentions "monitoring", "metrics", "observability", "Prometheus",
  "Grafana", "alerts", "dashboard". Ensures visibility into system health.
version: 1.0.0
category: devops
tags:
  - monitoring
  - observability
  - prometheus
  - grafana
  - alerts
depends_on: []
recommends:
  - deployment
used_by: []
---

# Skill: Monitoring

## Core Principle
**You can't fix what you can't see.** Observability is not optional—it's essential.

## The Three Pillars

| Pillar | Tool | Purpose |
|--------|------|---------|
| **Metrics** | Prometheus | Numbers over time |
| **Logs** | Loki/ELK | What happened |
| **Traces** | Jaeger | Where time spent |

## RED Method (Services)

- **Rate** - Requests per second
- **Errors** - Error rate
- **Duration** - Latency distribution

## USE Method (Resources)

- **Utilization** - % time busy
- **Saturation** - Queue length
- **Errors** - Error count

## Prometheus Metrics

```typescript
// Application instrumentation
import { Counter, Histogram, Gauge } from 'prom-client';

// Counter: Things that increase
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status'],
});

// Histogram: Distributions (latency)
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'path'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
});

// Gauge: Current state
const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Active connections',
});
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Too many metrics | Focus on RED/USE |
| No alerts | Alert on symptoms |
| Alert fatigue | Reduce noise, severity |
| No dashboards | Pre-built dashboards |
| Missing context | Add labels |

## Alerting Rules

```yaml
# Prometheus alerting rules
groups:
  - name: application
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{ $labels.service }}"
          description: "Error rate is {{ $value }} requests/s"

      - alert: HighLatency
        expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
```

## Grafana Dashboard

```json
{
  "title": "Application Overview",
  "panels": [
    {
      "title": "Request Rate",
      "type": "graph",
      "targets": [
        {
          "expr": "rate(http_requests_total[5m])",
          "legendFormat": "{{method}} {{path}}"
        }
      ]
    },
    {
      "title": "Error Rate",
      "type": "stat",
      "targets": [
        {
          "expr": "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m]) * 100"
        }
      ]
    },
    {
      "title": "P99 Latency",
      "type": "graph",
      "targets": [
        {
          "expr": "histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))"
        }
      ]
    }
  ]
}
```

## SLO/SLI/SLA Framework

```
SLA = Agreement (99.9% uptime)
  ↓
SLO = Objective (99.9% uptime this month)
  ↓
SLI = Indicator (successful requests / total requests)
```

## Quick Checklist

- [ ] RED metrics instrumented
- [ ] Alerts configured
- [ ] Dashboards created
- [ ] Runbooks linked to alerts
- [ ] Log aggregation setup
- [ ] Distributed tracing enabled
