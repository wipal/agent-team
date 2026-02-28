---
name: frontend-design
description: |
  Create distinctive, production-grade frontend interfaces. Use when building
  UI components, pages, websites, dashboards, React/Vue components, HTML/CSS
  layouts, or when styling/beautifying any web UI. Use when user mentions
  "design", "UI", "component", "page", "style", "dashboard", "landing page".
  Make designs UNFORGETTABLE - avoid generic AI aesthetics.
version: 1.0.0
category: frontend
tags:
  - ui
  - ux
  - design
  - components
depends_on:
  - code-review
recommends:
  - accessibility
  - state-management
used_by:
  - accessibility
---

# Skill: Frontend Design

## Core Principle
**Design with intention.** Bold minimalism and refined maximalism both work - mediocrity never does. Every choice should be deliberate.

## Hard Rules

1. **NEVER use Inter, Roboto, Arial, system fonts** - Choose distinctive, characterful fonts
2. **NEVER use purple gradients on white** - Most AI-generated aesthetic
3. **NEVER use Space Grotesk repeatedly** - Vary font choices
4. **ALWAYS commit to an aesthetic** - Timid design is bad design
5. **ALWAYS consider motion** - Animations create delight
6. **ALWAYS test responsive** - Mobile is not optional

## Design Decision Framework

### Before Coding
1. **Purpose**: What problem does this solve? Who uses it?
2. **Tone**: Pick extreme - brutalist, maximalist, organic, luxury, playful, editorial...
3. **Differentiation**: What makes this UNFORGETTABLE?

### Typography
- Choose fonts with character
- Pair distinctive display + refined body
- Avoid generic defaults

### Color
- Commit to cohesive palette
- Dominant colors with sharp accents
- Avoid evenly-distributed "safe" palettes

### Motion
- One well-orchestrated page load > scattered micro-interactions
- Use `animation-delay` for staggered reveals
- Hover states should surprise

### Layout
- Unexpected layouts, asymmetry, grid-breaking
- Generous negative space OR controlled density
- Not predictable 3-column layouts

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|------------|--------|
| Inter/Roboto font | Characterful fonts like Instrument Serif |
| Purple gradient on white | Bold single color or unexpected palette |
| Predictable 3-column | Asymmetry, overlap, diagonal flow |
| No animation | CSS transitions, staggered reveals |
| Safe, even spacing | Generous space OR controlled density |
| Same design every time | Vary between light/dark, different aesthetics |

## Quick Patterns

```css
/* Distinctive typography */
font-family: 'Instrument Serif', serif;
font-family: 'DM Sans', sans-serif;

/* Commit to color */
--primary: #1a1a1a;
--accent: #ff3366;

/* Motion */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Break the grid */
transform: translateY(-20px);
mix-blend-mode: difference;
```

## Component Patterns

### Atomic Structure
```text
components/
├── atoms/       # Button, Input, Label
├── molecules/   # SearchBar, FormField
├── organisms/   # Header, Sidebar
├── templates/   # PageLayouts
└── pages/       # Complete pages
```

### Compound Components
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Action</Card.Footer>
</Card>
```

## Accessibility (Non-negotiable)

```tsx
// Icon button needs label
<button aria-label="Close">
  <XIcon />
</button>

// Form field with hint
<label htmlFor="email">Email</label>
<input id="email" aria-describedby="email-hint" />
<span id="email-hint">We'll never share</span>
```

## Output Checklist

- [ ] Typography: Distinctive, not generic
- [ ] Color: Cohesive, committed
- [ ] Layout: Intentional, not default
- [ ] Motion: Purposeful
- [ ] Responsive: Works at 375px
- [ ] Accessible: ARIA labels, focus states
