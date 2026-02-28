# UI/UX Pro Max Skill

Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

## Version Update

To update this skill to the latest version:

```bash
cd /tmp
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git
cd ui-ux-pro-max-skill

# Update skill files
cp .claude/skills/ui-ux-pro-max/SKILL.md /path/to/project/.claude/skills/domain/frontend/ui-ux-pro-max/
cp src/ui-ux-pro-max/scripts/*.py /path/to/project/.claude/skills/domain/frontend/ui-ux-pro-max/scripts/
cp src/ui-ux-pro-max/data/*.csv /path/to/project/.claude/skills/domain/frontend/ui-ux-pro-max/data/
cp -r src/ui-ux-pro-max/data/stacks/* /path/to/project/.claude/skills/domain/frontend/ui-ux-pro-max/data/stacks/
```

## Requirements

- Python 3.x (for search script)

## Usage

The skill activates automatically when working on UI/UX tasks. It provides:

- 67 UI styles (Glassmorphism, Claymorphism, Minimalism, etc.)
- 96 color palettes
- 57 font pairings
- 99 UX guidelines
- 25 chart types
- 100 industry-specific reasoning rules
- 13 tech stack guidelines (React, Next.js, Vue, Svelte, SwiftUI, etc.)

## Search Script

```bash
# Generate design system
python3 .claude/skills/domain/frontend/ui-ux-pro-max/scripts/search.py "fintech" --design-system

# Search by domain
python3 .claude/skills/domain/frontend/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
```
