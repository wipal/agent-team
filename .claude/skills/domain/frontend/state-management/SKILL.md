---
name: state-management
description: |
  Frontend state management patterns with Zustand, TanStack Query, React Context.
  Use when: managing application state, server state, URL state, or when user
  mentions "state", "Zustand", "React Query", "TanStack Query", "context", "store".
  Choose the right tool for each type of state.
version: 1.0.0
category: frontend
tags:
  - state
  - zustand
  - tanstack-query
  - react-query
depends_on:
  - frontend-design
recommends: []
used_by: []
---

# Skill: State Management

## Core Principle
**Different state types need different solutions.** Don't use a hammer for everything.

## State Types

| Type | Tool | Examples |
|------|------|----------|
| **Server State** | TanStack Query | API data, cached responses |
| **Client State** | Zustand | UI state, preferences |
| **URL State** | URL params | Filters, pagination |
| **Form State** | React Hook Form | Form inputs, validation |
| **Local State** | useState | Component-only state |

## Server State (TanStack Query)

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutations
function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
    },
  });
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useUser(userId);
  const update = useUpdateUser();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={() => update.mutate({ id: userId, name: 'New' })}>
        Update
      </button>
    </div>
  );
}
```

## Client State (Zustand)

```tsx
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Store definition
interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        sidebarOpen: false,
        toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
        toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      }),
      { name: 'app-store' }
    )
  )
);

// Usage
function ThemeToggle() {
  const { theme, toggleTheme } = useStore();
  return <button onClick={toggleTheme}>{theme}</button>;
}

// Selectors for performance
const theme = useStore((s) => s.theme); // Only re-renders when theme changes
```

## URL State

```tsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL
  const page = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || 'all';

  // Update URL
  const setPage = (p: number) => {
    setSearchParams({ page: String(p), category });
  };

  return (
    <div>
      <Pagination current={page} onChange={setPage} />
    </div>
  );
}
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Storing API data in Zustand | Use TanStack Query |
| useState for global state | Use Zustand |
| useEffect for derived state | Compute during render |
| Prop drilling | Context or Zustand |
| Not persisting preferences | Add persist middleware |

## Derived State

```tsx
// ❌ Bad: useEffect for derived state
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(items.reduce((sum, item) => sum + item.price, 0));
}, [items]);

// ✅ Good: Compute during render
const total = items.reduce((sum, item) => sum + item.price, 0);
```

## When to Use What

```
API data → TanStack Query
         ↓
    Is it cached? Server state
         ↓
    Is it shared? Zustand
         ↓
    Is it form? React Hook Form
         ↓
    Is it URL? Search params
         ↓
    Local only? useState
```

## Quick Checklist

- [ ] Server state uses TanStack Query
- [ ] Client state uses Zustand
- [ ] No useEffect for derived state
- [ ] Form state uses React Hook Form
- [ ] URL state for shareable state
