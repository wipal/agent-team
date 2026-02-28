---
name: learn
description: Quickly capture a learning or pattern
---

# Learn Command

## Usage
```
/learn <type> <content>
```

## Types

| Type | Description | Example |
|------|-------------|---------|
| `pattern` | A reusable pattern to remember | `/learn pattern Always use useCallback for handlers passed to children` |
| `pitfall` | Something to avoid | `/learn pitfall Don't use useEffect for derived state` |
| `rule` | A rule to follow | `/learn rule Always check Context7 before using new APIs` |
| `tip` | A helpful tip | `/learn tip Use React DevTools Profiler for performance issues` |
| `correction` | Something you were corrected on | `/learn correction User said to always handle loading states` |

## Examples

### Capture a pattern
```
/learn pattern Repository pattern with Prisma
```

Output:
```
✅ Pattern captured

**Pattern:** Repository pattern with Prisma
**Added to:** knowledge.md

Would you like to add a code example? [y/n]
```

### Capture a pitfall
```
/learn pitfall N+1 queries in OrderService.getOrders
```

Output:
```
✅ Pitfall captured

**Pitfall:** N+1 queries in OrderService.getOrders
**Added to:** knowledge.md
**Lesson:** Use Prisma include for relations instead of separate queries

Example fix:
```typescript
// ❌ Bad
for (const order of orders) {
  order.items = await this.getItems(order.id);
}

// ✅ Good
const orders = await this.prisma.order.findMany({
  include: { items: true }
});
```
```

### Capture a correction
```
/learn correction User corrected: Always add loading state for async operations
```

Output:
```
✅ Correction captured

**Correction:** Always add loading state for async operations
**Added to:** lessons.md
**Rule generated:** "Add loading state before any async operation"

This rule will be applied in future tasks.
```

## Quick Capture

For quick capture without type:
```
/learn Always validate user input on the server side
```

Output:
```
What type is this?
1. Pattern
2. Pitfall
3. Rule
4. Tip

Select [1-4]:
```

## Reviewing Learnings

To see all captured learnings:
```
/learn --review
```

Output:
```
📚 Learnings for: current-agent

## Patterns (5)
1. Repository pattern with Prisma
2. Form validation with Zod + react-hook-form
3. Error handling with custom exceptions
...

## Pitfalls (3)
1. N+1 queries
2. Missing loading states
...

## Rules (4)
1. Always check Context7 first
2. Handle loading/error states
...

## Recent Corrections (2)
1. 2025-02-25: Add loading state for async
2. 2025-02-24: Use proper TypeScript types

---
Total: 14 learnings
```

## Integration

Learnings are:
- Stored in `knowledge.md`
- Synced via `/sync` command
- Reviewed at session start
- Promoted to skills over time
