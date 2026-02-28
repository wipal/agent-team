---
name: ui-design
description: |
  UI design principles for creating professional, accessible interfaces.
  Use when designing user interfaces, creating design systems, or reviewing UI.
  Triggers: design, ui, interface, visual, user interface
version: 1.0.0
category: design
tags:
  - ui-design
  - accessibility
  - visual-design
  - user-interface
depends_on: []
recommends: []
used_by: [design-system]
---

# UI Design Principles

Core principles for creating professional, accessible user interfaces.

## Visual Hierarchy

- **Size**: Larger elements draw more attention
- **Color**: Bright/warm colors advance, cool/dark colors recede
- **Contrast**: High contrast creates focal points
- **Spacing**: White space guides the eye
- **Typography**: Weight and size differentiate importance

## Layout Principles

### Grid Systems
- Use consistent grid (12-column common)
- Maintain alignment across elements
- Create rhythm through repetition

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Visual Balance
- Distribute visual weight evenly
- Use symmetry for stability, asymmetry for interest
- Avoid orphan elements

## Color Application

### Primary Actions
- One primary color for main CTAs
- High contrast with background
- Consistent across all screens

### Semantic Colors
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Info**: Blue (#3B82F6)

### Accessibility
- Minimum 4.5:1 contrast ratio for text
- 3:1 for large text (18px+ or 14px+ bold)
- Never rely on color alone for meaning

## Typography

### Font Pairing
- Maximum 2 font families
- Pair contrasting styles (serif + sans-serif)
- Ensure readability at all sizes

### Type Scale
```
xs: 12px
sm: 14px
base: 16px
lg: 18px
xl: 20px
2xl: 24px
3xl: 30px
4xl: 36px
5xl: 48px
```

### Line Height
- Body text: 1.5 - 1.75
- Headings: 1.2 - 1.4
- Captions: 1.4

## Interactive Elements

### Buttons
- Minimum 44x44px touch target
- Clear hover/focus states
- Disabled state visually distinct
- Loading state when async

### Form Inputs
- Visible labels (not placeholder-only)
- Clear error states
- Helper text for complex inputs
- Consistent input heights

### Links
- Underline or clear visual distinction
- Different visited state optional
- Hover state feedback

## Accessibility Checklist

- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Focus states visible
- [ ] Touch targets minimum 44x44px
- [ ] Form inputs have labels
- [ ] Error messages clear and specific
- [ ] Interactive elements keyboard accessible
- [ ] Images have alt text
- [ ] Heading hierarchy logical
