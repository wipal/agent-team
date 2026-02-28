---
name: accessibility
description: |
  WCAG compliance and accessibility best practices. Use when: building UI
  components, ensuring keyboard navigation, screen reader support, or when
  user mentions "accessibility", "a11y", "WCAG", "ARIA", "keyboard", "screen reader".
  Accessibility is not optional - build for everyone.
version: 1.0.0
category: frontend
tags:
  - accessibility
  - a11y
  - wcag
  - aria
depends_on:
  - frontend-design
recommends: []
used_by: []
---

# Skill: Accessibility

## Core Principle
**Build for everyone.** 15% of users have disabilities. Accessible code is better code.

## WCAG Principles (POUR)

| Principle | Description | Examples |
|-----------|-------------|----------|
| **Perceivable** | Users can see/hear content | Alt text, captions |
| **Operable** | Users can navigate | Keyboard, focus |
| **Understandable** | Users can understand | Clear language, labels |
| **Robust** | Works with assistive tech | ARIA, semantic HTML |

## Hard Rules

1. **NEVER rely on color alone** - Always have text/icons
2. **NEVER skip heading levels** - h1 → h2 → h3
3. **ALWAYS have alt text** - For meaningful images
4. **ALWAYS support keyboard** - All interactions
5. **ALWAYS use semantic HTML** - Not just divs

## Semantic HTML

```tsx
// ❌ Bad: Non-semantic
<div onClick={handleClick}>Submit</div>

// ✅ Good: Semantic
<button onClick={handleClick}>Submit</button>
```

## ARIA Patterns

### Labels

```tsx
// Icon button needs label
<button aria-label="Close menu">
  <XIcon />
</button>

// Input with label
<label htmlFor="email">Email address</label>
<input id="email" type="email" aria-describedby="email-hint" />
<span id="email-hint">We'll never share your email</span>
```

### Live Regions

```tsx
// Announce changes
<div role="status" aria-live="polite">
  {message}
</div>

// Alert important info
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### Dialogs

```tsx
<dialog
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Confirm Delete</h2>
  {/* Trap focus, handle Escape */}
</dialog>
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| `<div onClick>` | `<button onClick>` |
| Color only indication | Add icon + text |
| Missing alt text | `alt="description"` |
| Skip heading levels | h1 → h2 → h3 |
| No focus indicator | `:focus-visible` |
| Mouse-only interactions | Keyboard support |

## Focus Management

```css
/* Visible focus indicator */
:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
}
.skip-link:focus {
  top: 0;
}
```

```tsx
// Focus trap for modals
import { FocusTrap } from '@react-aria/focus';

<FocusTrap>
  <Modal>{children}</Modal>
</FocusTrap>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Next focusable |
| Shift+Tab | Previous focusable |
| Enter/Space | Activate button |
| Escape | Close modal |
| Arrow keys | Navigate lists |

## Form Accessibility

```tsx
<fieldset>
  <legend>Shipping Method</legend>
  <label>
    <input type="radio" name="shipping" value="standard" />
    Standard (5-7 days)
  </label>
  <label>
    <input type="radio" name="shipping" value="express" />
    Express (2-3 days)
  </label>
</fieldset>
```

## Testing Checklist

- [ ] Keyboard navigation works
- [ ] Focus visible on all interactive
- [ ] Screen reader announces content
- [ ] Color contrast 4.5:1 (WCAG AA)
- [ ] Form labels present
- [ ] Error messages announced
- [ ] No autoplay media

## Quick Audit

```bash
# Run accessibility audit
npx axe-cli https://yoursite.com

# Lighthouse accessibility
npx lighthouse https://yoursite.com --only-categories=accessibility
```
