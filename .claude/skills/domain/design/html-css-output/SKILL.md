---
name: html-css-output
description: |
  Converting designs to semantic HTML and CSS properties for developers.
  Use when creating design handoff documentation or converting designs to code specs.
  Triggers: html, css, design-to-code, handoff, markup, styles
version: 1.0.0
category: design
tags:
  - html
  - css
  - design-to-code
  - handoff
depends_on: [ui-design, design-system]
recommends: []
used_by: []
---

# HTML/CSS Output Format

Standard format for design handoff to developers.

## Output Structure

Every design should include:
1. HTML structure
2. CSS properties
3. Design tokens used
4. Responsive notes

## Component Documentation Template

```markdown
## Component: [Name]

### Description
[Brief description of the component]

### Variants
- Default
- [Variant 1]
- [Variant 2]

### States
- Default
- Hover
- Focus
- Active
- Disabled

### HTML Structure
```html
<!-- Component code here -->
```

### CSS Properties
```css
/* Component styles here */
```

### Design Tokens
- --color-[name]: [value]
- --space-[name]: [value]
- --font-[name]: [value]

### Responsive Notes
- Mobile: [behavior]
- Tablet: [behavior]
- Desktop: [behavior]

### Accessibility
- [A11y considerations]
```

## Example Output

### Component: Button

```html
<!-- Button Component -->
<!-- Variant: Primary -->
<!-- Size: Medium -->
<button class="btn btn-primary btn-md" type="button">
  <span class="btn__icon" aria-hidden="true">
    <!-- Icon SVG here -->
  </span>
  <span class="btn__text">Button Label</span>
</button>
```

```css
/* Design Tokens */
--btn-primary-bg: #3B82F6;
--btn-primary-hover: #2563EB;
--btn-primary-active: #1D4ED8;
--btn-primary-text: #FFFFFF;
--btn-radius: 8px;
--btn-padding-x: 16px;
--btn-padding-y: 10px;

/* Base Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  border-radius: var(--btn-radius);
  cursor: pointer;
  transition: all 150ms ease;
}

/* Size: Medium */
.btn-md {
  padding: var(--btn-padding-y) var(--btn-padding-x);
  font-size: 14px;
  line-height: 1.25;
}

/* Variant: Primary */
.btn-primary {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: none;
}

.btn-primary:hover {
  background-color: var(--btn-primary-hover);
}

.btn-primary:active {
  background-color: var(--btn-primary-active);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--btn-primary-bg);
  outline-offset: 2px;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Spacing Output

Always use spacing tokens:

```css
/* Correct */
.element {
  padding: var(--space-4);
  margin-bottom: var(--space-2);
  gap: var(--space-3);
}

/* Avoid magic numbers */
.element {
  padding: 15px;  /* Use token instead */
}
```

## Typography Output

```css
.text-heading {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
}
```

## Layout Output

```css
/* Flexbox */
.layout-horizontal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

/* Grid */
.layout-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
```

## Color Output Format

```css
/* Background */
background-color: var(--color-surface-primary);

/* Text */
color: var(--color-text-primary);

/* Border */
border-color: var(--color-border-default);

/* Shadow (use token) */
box-shadow: var(--shadow-md);
```

## Accessibility Annotations

Include these in your output:

```html
<!-- Accessible button with icon -->
<button
  class="btn btn-icon"
  type="button"
  aria-label="Close dialog"
>
  <svg aria-hidden="true" focusable="false">
    <!-- Icon -->
  </svg>
</button>

<!-- Form input with label -->
<div class="form-field">
  <label for="email" class="form-label">
    Email address
  </label>
  <input
    id="email"
    type="email"
    class="form-input"
    aria-describedby="email-hint"
  />
  <span id="email-hint" class="form-hint">
    We'll never share your email.
  </span>
</div>
```

## Checklist Before Handoff

- [ ] All spacing uses tokens
- [ ] All colors use tokens
- [ ] Typography uses tokens
- [ ] Responsive breakpoints documented
- [ ] States defined (hover, focus, disabled)
- [ ] Accessibility attributes included
- [ ] Component variants documented
