# dev-fe Rules - Rules riêng cho Frontend Developers

---

## FE-Specific Rules

### 1. Context7 Mandatory
- ALWAYS use Context7 to lookup React/Vite docs BEFORE coding
- Never assume API behavior without verification
- Check for breaking changes in new versions

### 2. Component Structure
- Tách UI thành `src/components/` và `src/features/`
- Always use function components + hooks
- Write TypeScript rõ ràng, avoid `any`
- One component per file

### 3. State Management
- Use local state for UI-only concerns
- Use Zustand for client state
- Use TanStack Query for server state
- URL state for filters/pagination

### 4. Testing Requirements
- Every component should have corresponding test file
- Use Vitest + Testing Library
- Test user interactions, not implementation details
- Mock external dependencies

### 5. Performance Checks
- Check for unnecessary re-renders
- Use React DevTools Profiler
- Lazy load components when appropriate
- Virtualize long lists

### 6. Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML
- Add ARIA labels where needed
- Test with screen reader

---

## Tool Access Control (Capability-Based)

> Pattern từ OpenFang: Fine-grained permissions thay vì all-or-nothing

### File Operations

| Action | Allowed Paths | Denied Paths |
|--------|---------------|--------------|
| READ | `src/**`, `public/**`, `*.config.*`, `package.json` | `.env*`, `secrets/**`, `credentials/**` |
| WRITE | `src/**`, `public/**` | `.env*`, `secrets/**`, `*.lock`, `dist/**` |
| DELETE | `src/**/*.test.ts` (with confirmation) | Production files, config files |

### Shell Commands

| Category | ALLOW | DENY |
|----------|-------|------|
| Package | `npm run *`, `npm install`, `yarn *` | `npm publish`, `yarn publish` |
| Git | `git status`, `git diff`, `git log`, `git branch` | `git push --force`, `git reset --hard` |
| Build | `npm run build`, `npm run dev` | `sudo *` |
| System | `node *` | `rm -rf`, `chmod 777`, `curl * | bash` |

### Network Access

| ALLOW | DENY |
|-------|------|
| `localhost:*` | Production databases |
| `*.internal.company.com` | External secrets managers |
| `api.staging.*` | Production APIs (without explicit approval) |

### Memory Scope

| Scope | Access |
|-------|--------|
| `self.*` | Full read/write |
| `shared.frontend.*` | Full read/write |
| `shared.project.*` | Read only |
| `shared.backend.*` | No access |

---

## Operational Phases

> Multi-phase methodology từ OpenFang

### Phase 1: ANALYZE
- Read existing code and context
- Identify relevant patterns and conventions
- Understand requirements fully
- Check Context7 for latest API docs

### Phase 2: PLAN
- Design approach for non-trivial changes
- Consider alternatives and trade-offs
- Get approval before implementation
- Break down into subtasks if complex

### Phase 3: IMPLEMENT
- Write clean, production-quality code
- Follow existing conventions
- Handle errors explicitly
- Add appropriate logging

### Phase 4: VERIFY
- Run tests and check coverage
- Validate output meets requirements
- Self-review changes
- Check for console errors/warnings

### Phase 5: DOCUMENT
- Update relevant documentation
- Capture lessons learned
- Update MEMORY.md if significant
- Share knowledge with team

---

## Component Checklist

Before submitting component:
- [ ] TypeScript types defined
- [ ] Props documented
- [ ] Loading state handled
- [ ] Error state handled
- [ ] Responsive design
- [ ] Keyboard accessible
- [ ] Tests written
- [ ] No console errors

---

## Anti-Patterns to Avoid

### State Management
- ❌ Using `useEffect` for derived state
- ❌ Storing props in state
- ❌ Prop drilling (use context/store)
- ❌ Not memoizing expensive computations

### Performance
- ❌ Inline functions in render (use `useCallback`)
- ❌ Inline objects in render
- ❌ Importing entire libraries (use tree-shaking)
- ❌ Not code-splitting large bundles

### Code Quality
- ❌ Components > 300 lines
- ❌ Multiple responsibilities in one component
- ❌ Not handling loading/error states
- ❌ Magic numbers/strings

---

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `Button.tsx` |
| Hook | camelCase with use prefix | `useAuth.ts` |
| Utility | camelCase | `formatDate.ts` |
| Type | PascalCase | `UserTypes.ts` |
| Test | Same as file + .test | `Button.test.tsx` |

---

## Import Order

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. External packages
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

// 3. Internal absolute imports
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

// 4. Relative imports
import { LocalComponent } from './LocalComponent';

// 5. Types
import type { User } from './types';
```

---

## Common Patterns

### Loading State
```typescript
// ✅ Good
const { data, isLoading, error } = useQuery(...);

if (isLoading) return <Loading />;
if (error) return <Error message={error.message} />;
return <Content data={data} />;
```

### Form Handling
```typescript
// ✅ Good - React Hook Form + Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

### Error Boundary
```typescript
// ✅ Good - Wrap risky components
<ErrorBoundary fallback={<ErrorFallback />}>
  <RiskyComponent />
</ErrorBoundary>
```
