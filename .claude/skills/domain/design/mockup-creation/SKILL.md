---
name: mockup-creation
description: |
  Creating wireframes and mockups using DrawIO MCP for BA and Designer workflows.
  Use when creating wireframes, mockups, or low-fidelity designs for UI/UX.
  Triggers: mockup, wireframe, drawio, diagram, prototype, sketch
version: 1.0.0
category: design
tags:
  - mockup
  - wireframe
  - drawio
  - diagram
depends_on: [ui-design]
recommends: []
used_by: []
---

# Mockup Creation with DrawIO

Guide for creating wireframes and mockups using DrawIO MCP.

## When to Use DrawIO vs Mermaid

| Use DrawIO | Use Mermaid |
| ---------- | ----------- |
| Wireframes | Flowcharts |
| UI mockups | Sequence diagrams |
| Low-fidelity designs | Class diagrams |
| Complex layouts | Simple diagrams |
| Editable outputs | Quick documentation |

## DrawIO MCP Tools

### Available Tools

1. **open_drawio_mermaid**: Create diagram from Mermaid syntax
2. **open_drawio_xml**: Create diagram from DrawIO XML
3. **open_drawio_csv**: Create diagram from CSV data

## Workflow

### Step 1: Plan Your Mockup

Before using DrawIO:
1. List the components needed
2. Sketch layout structure
3. Identify sections and their relationships

### Step 2: Create Wireframe

Use DrawIO MCP to create the wireframe:

```
Use DrawIO MCP to create a wireframe with:
- Header section with logo and navigation
- Hero section with headline and CTA
- Features grid (3 columns)
- Footer with links
```

### Step 3: Save Locally

DrawIO opens in browser. Save the file:
1. File -> Save As
2. Choose location in project folder
3. Use naming convention: `[page]-wireframe-[date].drawio`

## Wireframe Components

### Common Elements

```markdown
## Page Structure

- Header
  - Logo
  - Navigation
  - Actions (login, signup)
- Main Content
  - Hero
  - Features
  - Content blocks
- Footer
  - Links
  - Social
  - Copyright

## UI Components

- Buttons (primary, secondary, ghost)
- Form inputs (text, select, checkbox)
- Cards (image, title, description)
- Lists (bullet, numbered, cards)
- Navigation (tabs, breadcrumbs, pagination)
```

## Naming Convention

```
[project]-[page]-[type]-[version].drawio

Examples:
- myapp-home-wireframe-v1.drawio
- myapp-dashboard-mockup-v2.drawio
- myapp-checkout-flow-v1.drawio
```

## Wireframe to Design Handoff

After wireframe approval:

1. **Document the structure**
   ```markdown
   ## Home Page Wireframe

   ### Sections
   1. Header (fixed)
   2. Hero (full-width)
   3. Features (3-column grid)
   4. Testimonials (carousel)
   5. CTA (centered)
   6. Footer

   ### Components Used
   - Button (primary, secondary)
   - Card (feature)
   - Testimonial card
   - Navigation
   ```

2. **Export for reference**
   - PNG for quick reference
   - Keep .drawio for edits

3. **Add annotations**
   - Component names
   - Interaction notes
   - Responsive behavior

## BA Workflow Integration

### For Requirements Gathering

1. Create low-fidelity wireframe
2. Review with stakeholders
3. Iterate based on feedback
4. Document decisions
5. Handoff to Designer

### Documentation

```markdown
## [Feature Name] Wireframe

**File**: `docs/wireframes/[name].drawio`

### Purpose
[Brief description]

### User Flow
1. User lands on page
2. User sees [content]
3. User interacts with [element]
4. System responds with [action]

### Requirements
- [ ] Requirement 1
- [ ] Requirement 2

### Notes
- Design notes here
```

## Designer Workflow Integration

### From Wireframe to Design

1. Review BA wireframe
2. Create high-fidelity version
3. Apply design system
4. Document HTML/CSS properties
5. Handoff to Developer

### File Organization

```
project/
├── docs/
│   └── wireframes/
│       ├── home-wireframe-v1.drawio
│       └── dashboard-wireframe-v1.drawio
├── designs/
│   └── mockups/
│       ├── home-mockup-v1.fig
│       └── dashboard-mockup-v1.fig
└── design-system/
    └── tokens.css
```

## Best Practices

1. **Start simple**: Low-fidelity first
2. **Get feedback early**: Don't over-polish
3. **Document decisions**: Why choices were made
4. **Version control**: Keep previous versions
5. **Consistent naming**: Follow convention
6. **Single source of truth**: One file per page

## Common Patterns

### Landing Page
- Hero (headline, CTA)
- Features (benefits)
- Social proof (testimonials)
- Pricing (if applicable)
- CTA (final conversion)

### Dashboard
- Sidebar navigation
- Header with search/user
- Metrics cards
- Data tables/charts
- Quick actions

### Form Page
- Progress indicator (multi-step)
- Clear labels
- Validation feedback
- Submit/Cancel actions
