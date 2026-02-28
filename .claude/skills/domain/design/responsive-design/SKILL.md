---
name: responsive-design
description: |
  Mobile-first responsive design with breakpoints and adaptive layouts.
  Use when creating responsive layouts, mobile designs, or adapting for different screens.
  Triggers: responsive, mobile-first, breakpoints, adaptive, mobile, tablet, desktop
version: 1.0.0
category: design
tags:
  - responsive
  - mobile-first
  - breakpoints
  - adaptive
depends_on: [ui-design]
recommends: []
used_by: []
---

# Responsive Design Guide

Mobile-first approach to creating adaptive layouts.

## Mobile-First Philosophy

Start with mobile styles, then add complexity for larger screens.

**Why Mobile-First:**
- Forces prioritization of content
- Simpler base styles
- Progressive enhancement
- Better performance on mobile

## Breakpoint System

### Standard Breakpoints

```css
/* Mobile First (min-width) */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Tailwind-style Usage

```css
/* Base: Mobile styles */
.container {
  padding: 1rem;
}

/* sm: 640px+ */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
  }
}

/* md: 768px+ */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

## Layout Patterns

### Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

### Responsive Grid

```css
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Stack on Mobile

```css
/* Mobile: Stack */
.flex-mobile-stack {
  flex-direction: column;
  gap: 1rem;
}

/* Desktop: Row */
@media (min-width: 768px) {
  .flex-mobile-stack {
    flex-direction: row;
    gap: 2rem;
  }
}
```

## Typography Scaling

### Fluid Typography

```css
/* Clamps between min and max based on viewport */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

### Responsive Type Scale

| Size | Mobile | Desktop |
| ---- | ------ | ------- |
| h1 | 2rem | 3rem |
| h2 | 1.5rem | 2.25rem |
| h3 | 1.25rem | 1.5rem |
| h4 | 1.125rem | 1.25rem |
| body | 1rem | 1rem |
| small | 0.875rem | 0.875rem |

## Image Handling

### Responsive Images

```html
<img
  src="image.jpg"
  srcset="image-320w.jpg 320w, image-640w.jpg 640w, image-1280w.jpg 1280w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Description"
/>
```

### Aspect Ratio

```css
.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}
```

## Touch Considerations

### Touch Targets

```css
/* Minimum 44x44px for touch */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1rem;
}
```

### Touch vs Mouse Interactions

| Touch | Mouse |
| ----- | ----- |
| Tap | Click |
| Long press | Right click |
| Swipe | Scroll |
| Pinch | Scroll zoom |

## Testing Checklist

- [ ] Test at 320px, 375px, 768px, 1024px, 1440px
- [ ] Touch targets at least 44x44px
- [ ] Text readable without zoom on mobile
- [ ] No horizontal scroll on mobile
- [ ] Images scale appropriately
- [ ] Forms usable on touch devices
