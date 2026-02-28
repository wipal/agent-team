---
name: ci-cd
description: |
  CI/CD pipeline design and implementation for GitHub Actions, GitLab CI.
  Use when: setting up pipelines, automating builds, running tests automatically,
  deploying code, or when user mentions "CI", "CD", "pipeline", "GitHub Actions",
  "GitLab CI", "build", "deploy", "automation". Ensures reliable, fast pipelines.
version: 1.0.0
category: devops
tags:
  - ci-cd
  - github-actions
  - gitlab-ci
  - automation
  - pipeline
depends_on:
  - git-automation
recommends:
  - containerization
  - deployment
used_by:
  - deployment
---

# Skill: CI/CD

## Core Principle
**Fast, reliable, automated pipelines.** Every commit should be tested. Every merge should be deployable.

## Hard Rules

1. **NEVER skip tests in CI** - Tests are mandatory
2. **NEVER store secrets in code** - Use secrets management
3. **ALWAYS fail fast** - Run fastest tests first
4. **ALWAYS cache dependencies** - Speed matters
5. **ALWAYS use specific action versions** - Not `@main` or `@latest`

## Pipeline Stages

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  Lint   │──▶│  Build  │──▶│  Test   │──▶│ Deploy  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
   (1 min)      (3 min)       (5 min)      (2 min)
```

## GitHub Actions Template

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
```

## GitLab CI Template

```yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - build
  - deploy

variables:
  NODE_VERSION: '20'

.node_template:
  image: node:${NODE_VERSION}
  cache:
    paths:
      - node_modules/

lint:
  extends: .node_template
  stage: lint
  script:
    - npm ci
    - npm run lint

test:
  extends: .node_template
  stage: test
  script:
    - npm ci
    - npm run test:coverage
  coverage: '/Lines\s*:\s*(\d+.\d+)%/'

build:
  extends: .node_template
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Using `@main` for actions | Pin to version: `@v4.0.0` |
| No caching | Add `cache: 'npm'` |
| Running all tests at once | Parallelize, matrix strategy |
| Secrets in code | Use GitHub/GitLab secrets |
| Long pipelines | Fail fast, cache, parallelize |

## Performance Optimization

```yaml
# Matrix strategy for parallel tests
strategy:
  matrix:
    shard: [1/4, 2/4, 3/4, 4/4]
steps:
  - run: npm run test -- --shard=${{ matrix.shard }}
```

## Security Best Practices

- Use `SECRETS` for sensitive data
- Limit `GITHUB_TOKEN` permissions
- Pin action versions
- Scan for vulnerabilities
- Use OIDC for cloud auth

## Quick Checklist

- [ ] Tests run on every PR
- [ ] Dependencies cached
- [ ] Actions pinned to versions
- [ ] Secrets properly managed
- [ ] Pipeline fails fast
- [ ] Build artifacts uploaded
- [ ] Coverage reported
