---
name: containerization
description: |
  Docker containerization patterns and best practices. Use when: creating
  Dockerfiles, building images, optimizing container size, multi-stage builds,
  or when user mentions "Docker", "container", "image", "Dockerfile", "Compose".
  Ensures efficient, secure, production-ready containers.
version: 1.0.0
category: devops
tags:
  - docker
  - containers
  - containerization
  - images
depends_on: []
recommends:
  - ci-cd
  - deployment
used_by:
  - deployment
  - ci-cd
---

# Skill: Containerization

## Core Principle
**Small, secure, immutable containers.** Every byte matters. Every layer counts.

## Hard Rules

1. **NEVER run as root** - Use non-root user
2. **NEVER store secrets in images** - Use environment variables
3. **ALWAYS use multi-stage builds** - Separate build from runtime
4. **ALWAYS pin base image versions** - Not `:latest`
5. **ALWAYS minimize layers** - Combine RUN commands

## Multi-Stage Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Runtime stage
FROM node:20-alpine AS runtime

# Security: non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copy only production dependencies
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
```

## Docker Compose Template

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: runtime
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - db
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 3s

volumes:
  postgres_data:
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| `FROM node:latest` | `FROM node:20-alpine` |
| Running as root | Add non-root user |
| No health check | Add HEALTHCHECK |
| Large images | Multi-stage builds |
| Secrets in ENV | Use Docker secrets |
| Single layer | Combine RUN commands |

## Image Size Optimization

```dockerfile
# ❌ Bad: Multiple layers, large image
RUN npm install
RUN npm run build
RUN npm prune

# ✅ Good: Single layer, smaller image
RUN npm ci --only=production && \
    npm cache clean --force
```

## Security Checklist

```dockerfile
# 1. Non-root user
USER appuser

# 2. Read-only filesystem
COPY --chown=appuser:appgroup . .

# 3. No secrets
# Use docker secrets or environment

# 4. Minimal base image
FROM alpine:3.19

# 5. Health check
HEALTHCHECK CMD curl -f http://localhost/health || exit 1
```

## Quick Commands

```bash
# Build
docker build -t myapp:v1.0.0 .

# Run
docker run -d -p 3000:3000 --env-file .env myapp:v1.0.0

# Debug
docker exec -it <container> sh

# Clean up
docker system prune -af
```

## Quick Checklist

- [ ] Multi-stage build used
- [ ] Base image pinned to version
- [ ] Non-root user configured
- [ ] Health check added
- [ ] Secrets not in image
- [ ] Layers minimized
- [ ] .dockerignore present
