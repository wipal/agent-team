---
name: design-system
description: |
  Design system creation with tokens, components, and patterns.
  Use when building or maintaining design systems, creating component libraries.
  Triggers: design-system, tokens, components, design tokens, component library
version: 1.0.0
category: design
tags:
  - design-system
  - design-tokens
  - components
  - patterns
depends_on: [ui-design]
recommends: []
used_by: []
---

# Design System Guide

Framework for creating consistent, scalable design systems.

## Design Tokens

Design tokens are the visual design atoms of the design system.

### Color Tokens

```css
/* Primitive Colors */
--color-blue-500: #3B82F6;
--color-green-500: #10B981;
--color-red-500: #EF4444;

/* Semantic Tokens */
--color-primary: var(--color-blue-500);
--color-success: var(--color-green-500);
--color-error: var(--color-red-500);

/* Component Tokens */
--button-primary-bg: var(--color-primary);
--button-primary-hover: var(--color-blue-600);
```

### Spacing Tokens

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### Typography Tokens

```css
/* Font Families */
--font-sans: system-ui, -apple-system, sans-serif;
--font-mono: ui-monospace, monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Shadow Tokens

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
```

### Border Radius Tokens

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

## Component Structure

### Anatomy

Every component should have:
1. **Base styles**: Default appearance
2. **Variants**: Size, color, style variations
3. **States**: Hover, focus, active, disabled
4. **Slots**: Areas for content injection

### Naming Convention

```
[component]-[variant]-[state]-[part]

Examples:
- button-primary-hover
- input-lg-error
- card-outlined-header
```

## Pattern Library

### Layout Patterns

| Pattern | Use Case |
| ------- | -------- |
| Stack | Vertical spacing between children |
| Cluster | Horizontal grouping with wrap |
| Sidebar | Main content + side panel |
| Split | Two equal columns |
| Center | Centered content with max-width |

### Component Patterns

| Pattern | Description |
| ------- | ----------- |
| Compound | Multiple components work together |
| Render Props | Flexible content rendering |
| Slots | Named content areas |
| Variants | Style variations |

## Documentation Standards

Each component needs:

1. **Description**: What it does
2. **Usage**: When to use it
3. **Props/API**: Configuration options
4. **Examples**: Code snippets
5. **Accessibility**: A11y considerations

## Maintenance

### Version Control
- Document all changes
- Use semantic versioning
- Provide migration guides

### Deprecation Process
1. Mark as deprecated
2. Provide alternative
3. Set removal date
4. Remove in major version
