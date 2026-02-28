---
name: performance-fe
description: |
  React/frontend performance optimization patterns. Use when: optimizing render
  performance, reducing bundle size, improving Core Web Vitals, or when user
  mentions "performance", "slow", "optimize", "bundle size", "Lighthouse", "LCP".
  Fast apps = happy users.
version: 1.0.0
category: frontend
tags:
  - performance
  - optimization
  - core-web-vitals
  - bundle-size
depends_on:
  - frontend-design
recommends: []
used_by: []
---

# Skill: Performance FE

## Core Principle
**Measure before optimizing.** Premature optimization is waste. Fix real bottlenecks.

## Core Web Vitals

| Metric | Target | What |
|--------|--------|------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |

## Hard Rules

1. **NEVER optimize without measuring** - Profile first
2. **NEVER use useEffect for derived state** - Compute in render
3. **ALWAYS lazy load below fold** - Code splitting
4. **ALWAYS memoize expensive computes** - useMemo, useCallback
5. **ALWAYS optimize images** - WebP, lazy load, srcset

## React Performance Patterns

### Memoization

```tsx
import { memo, useMemo, useCallback } from 'react';

// Memo component to prevent re-renders
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{/* expensive render */}</div>;
});

// Memo expensive computation
function Dashboard({ items }) {
  const sortedItems = useMemo(
    () => items.sort((a, b) => b.value - a.value),
    [items]
  );
}

// Memo callback passed to children
function Parent() {
  const handleClick = useCallback((id) => {
    console.log(id);
  }, []);

  return <Child onClick={handleClick} />;
}
```

### List Virtualization

```tsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

## Code Splitting

```tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyChart />
    </Suspense>
  );
}

// Route-based splitting
const routes = {
  '/settings': lazy(() => import('./Settings')),
  '/analytics': lazy(() => import('./Analytics')),
};
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Inline objects in render | useMemo, move outside |
| Inline functions in render | useCallback |
| useEffect for derived state | Compute in render |
| Large initial bundle | Code splitting |
| Unoptimized images | WebP, lazy load, srcset |
| No virtualization | react-window |

## Image Optimization

```tsx
// Responsive images
<picture>
  <source srcSet="/image.avif" type="image/avif" />
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" loading="lazy" alt="Description" />
</picture>

// Next.js Image
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // For above fold
/>
```

## Bundle Analysis

```bash
# Analyze bundle size
npx vite-bundle-visualizer

# Check what's in your bundle
npx source-map-explorer dist/assets/*.js
```

## Performance Checklist

### JavaScript
- [ ] Code splitting implemented
- [ ] Tree shaking working
- [ ] No unnecessary dependencies
- [ ] Lazy loading for routes

### React
- [ ] No useEffect for derived state
- [ ] Lists virtualized
- [ ] Expensive computes memoized
- [ ] Props stable (useCallback)

### Assets
- [ ] Images optimized (WebP/AVIF)
- [ ] Lazy loading for below fold
- [ ] Fonts preloaded
- [ ] Critical CSS inlined

### Metrics
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

## Profiling

```bash
# Lighthouse
npx lighthouse https://yoursite.com --view

# React DevTools Profiler
# 1. Open DevTools
# 2. Go to Profiler tab
# 3. Click record
# 4. Interact with app
# 5. Analyze flame graph
```
