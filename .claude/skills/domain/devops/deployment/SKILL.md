---
name: deployment
description: |
  Deployment strategies and patterns for production releases. Use when: deploying
  to production, implementing blue/green or canary deployments, rolling updates,
  or when user mentions "deploy", "release", "blue-green", "canary", "rollback".
  Ensures safe, reliable production deployments.
version: 1.0.0
category: devops
tags:
  - deployment
  - release
  - blue-green
  - canary
  - rollback
depends_on:
  - ci-cd
recommends:
  - containerization
  - monitoring
used_by: []
---

# Skill: Deployment

## Core Principle
**Deploy safely, rollback quickly.** Every deployment should be reversible in seconds.

## Hard Rules

1. **NEVER deploy on Friday** - Unless you enjoy weekend debugging
2. **NEVER skip rollback plan** - Know how to undo before you do
3. **ALWAYS test in staging** - Production is not a testing ground
4. **ALWAYS monitor after deploy** - Watch metrics for 15 minutes
5. **ALWAYS have feature flags** - Decouple deploy from release

## Deployment Strategies

### 1. Rolling Update (Default)
```
┌───────┐     ┌───────┐     ┌───────┐
│ v1    │ ──▶ │ v1/v2 │ ──▶ │ v2    │
│ ─ ─ ─ │     │ ─ ─ ─ │     │ ─ ─ ─ │
│ v1    │     │ v1    │     │ v2    │
│ ─ ─ ─ │     │ ─ ─ ─ │     │ ─ ─ ─ │
│ v1    │     │ v2    │     │ v2    │
└───────┘     └───────┘     └───────┘
   0%           50%           100%
```

### 2. Blue-Green
```
         ┌─────────────┐
         │   Router    │
         └──────┬──────┘
          ┌─────┴─────┐
          ▼           ▼
    ┌──────────┐ ┌──────────┐
    │  Blue    │ │  Green   │
    │  (v1)    │ │  (v2)    │
    │  LIVE    │ │  IDLE    │
    └──────────┘ └──────────┘

Switch traffic: Blue → Green
Rollback: Green → Blue
```

### 3. Canary
```
┌───────────────────────────────────┐
│           Load Balancer           │
└───────────────┬───────────────────┘
        ┌───────┴───────┐
        ▼               ▼
   ┌─────────┐    ┌──────────┐
   │ Stable  │    │ Canary   │
   │  v1     │    │  v2      │
   │  95%    │    │  5%      │
   └─────────┘    └──────────┘
```

## Kubernetes Rolling Update

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # Max pods over desired count
      maxUnavailable: 0    # Max unavailable during update
  template:
    spec:
      containers:
        - name: app
          image: myapp:v2
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
```

## Blue-Green with Kubernetes

```yaml
# blue-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-blue
spec:
  selector:
    app: myapp
    version: blue
---
# green-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-green
spec:
  selector:
    app: myapp
    version: green
---
# Switch by updating the active service selector
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Deploy without rollback plan | Document rollback steps first |
| Deploy all at once | Gradual rollout (10% → 50% → 100%) |
| No health checks | Add readiness/liveness probes |
| Deploy on Friday | Deploy Tue-Thu |
| No monitoring | Watch metrics for 15 min post-deploy |
| Big bang deploys | Small, frequent deploys |

## Deployment Checklist

### Before
- [ ] Rollback plan documented
- [ ] Staging tested
- [ ] Database migrations run
- [ ] Feature flags ready
- [ ] Team notified

### During
- [ ] Monitor error rates
- [ ] Check latency metrics
- [ ] Verify health checks pass
- [ ] Monitor logs for errors

### After
- [ ] Verify all pods healthy
- [ ] Check business metrics
- [ ] Monitor for 15 minutes
- [ ] Update changelog

## Rollback Commands

```bash
# Kubernetes
kubectl rollout undo deployment/myapp
kubectl rollout undo deployment/myapp --to-revision=2

# Check history
kubectl rollout history deployment/myapp

# ECS
aws ecs update-service --cluster prod --service myapp --task-definition myapp:1
```

## Feature Flags

```typescript
// Decouple deploy from release
if (featureFlags.isEnabled('new-checkout', user)) {
  return <NewCheckout />;
}
return <LegacyCheckout />;
```

## Quick Checklist

- [ ] Rollback plan exists
- [ ] Gradual rollout enabled
- [ ] Health checks configured
- [ ] Monitoring active
- [ ] Feature flags ready
- [ ] Team notified
