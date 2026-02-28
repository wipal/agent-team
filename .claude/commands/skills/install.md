# Install Skill from skills.sh

Install a skill from skills.sh with automatic security validation.

## Usage

```
/install-skill <owner/repo> [options]
```

## Arguments

- `<owner/repo>` - GitHub repository (e.g., `vercel-labs/agent-skills`)

## Options

- `--skill <name>` - Specific skill from multi-skill repos
- `--validate` - Run security validation (default: true)
- `--no-validate` - Skip validation (not recommended)
- `--dry-run` - Download and validate without installing
- `--customize` - Open for customization after install

## Examples

```bash
# Install specific skill from multi-skill repo
/install-skill vercel-labs/agent-skills --skill react-best-practices

# Install from official source
/install-skill anthropics/skills --skill pdf

# Dry run to check before installing
/install-skill community/skill --dry-run

# Install with customization
/install-skill vercel-labs/agent-skills --skill frontend-design --customize
```

## Installation Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SKILL INSTALLATION WORKFLOW                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. FETCH                                                                    │
│     ├── npx skills add <owner/repo> --dry-run                               │
│     └── Download to ~/.skills/                                              │
│                                                                              │
│  2. VALIDATE (unless --no-validate)                                         │
│     ├── Check source type (official/community)                              │
│     ├── Run security-validator skill                                        │
│     └── Generate security report                                            │
│                                                                              │
│  3. REPORT FINDINGS                                                          │
│     ├── Official: Auto-approve with logging                                 │
│     ├── Community: Present issues for user review                           │
│     └── If issues: Wait for user decision                                   │
│                                                                              │
│  4. INSTALL                                                                  │
│     ├── Determine target directory:                                         │
│     │   ├── Official → .claude/skills/domain/<category>/                    │
│     │   └── Community → .claude/skills/community/                           │
│     ├── Copy skill files                                                    │
│     └── Preserve structure (SKILL.md, references/)                          │
│                                                                              │
│  5. REGISTER                                                                 │
│     ├── Add to skills-registry.yaml                                         │
│     ├── Save security report to security-reports/                           │
│     └── Update SKILL-INDEX.md if needed                                     │
│                                                                              │
│  6. CUSTOMIZE (if --customize)                                              │
│     ├── Open SKILL.md for editing                                           │
│     └── Adjust for project needs                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Source Type Detection

| Source | Installation Path | Validation |
|--------|-------------------|------------|
| Official (anthropics, vercel-labs, etc.) | `.claude/skills/domain/<category>/` | Auto-approve |
| Community | `.claude/skills/community/` | Review required |
| Local existing | Skip (already installed) | N/A |

## Security Validation

### Official Sources (Auto-approve)

```
✅ Source: vercel-labs (Official)
✅ Security: Auto-validated
✅ Installing to: .claude/skills/domain/frontend/react-best-practices/

[Proceeding with installation...]
```

### Community Sources (Review Required)

```
⚠️ Source: community-dev (Community)
⚠️ Security review required

Running security validation...

📋 Security Report:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Check          │ Status │ Issues                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ Code Review    │ PASS   │ 0                                               │
│ Command Scan   │ WARN   │ 1 (eval() on line 42)                          │
│ URL Check      │ PASS   │ 0                                               │
│ Dependency     │ PASS   │ 0                                               │
│ Data Exfil     │ PASS   │ 0                                               │
│ File Access    │ PASS   │ 0                                               │
└─────────────────────────────────────────────────────────────────────────────┘

🟡 1 MEDIUM issue found:
   - eval() usage at SKILL.md:42
   - Recommendation: Use JSON.parse() instead

Decision required:
[1] APPROVE - Install anyway (acknowledge risk)
[2] APPROVE WITH FIX - Fix issue then install
[3] REJECT - Do not install

Your choice: _
```

## Output

### Successful Installation

```
✅ Skill Installed Successfully

┌─────────────────────────────────────────────────────────────────────────────┐
│ Skill:           react-best-practices                                       │
│ Source:          vercel-labs/agent-skills                                   │
│ Installed to:    .claude/skills/domain/frontend/react-best-practices/      │
│ Security:        ✅ Passed (Official source)                               │
│ Registered:      skills-registry.yaml                                       │
└─────────────────────────────────────────────────────────────────────────────┘

Files:
├── SKILL.md
└── references/
    └── performance-rules.md

Next steps:
- Review skill content: cat .claude/skills/domain/frontend/react-best-practices/SKILL.md
- Use in agent creation: /agent-creation
- Link to existing agent: ln -s ../../skills/domain/frontend/react-best-practices .claude/agents/<agent>/skills/
```

### Dry Run Output

```
🔍 Dry Run: Skill Analysis

┌─────────────────────────────────────────────────────────────────────────────┐
│ Skill:           example-skill                                              │
│ Source:          community/example-repo                                     │
│ Would install to: .claude/skills/community/example-skill/                  │
└─────────────────────────────────────────────────────────────────────────────┘

Security Analysis:
├── Code Review: PASS
├── Command Scan: PASS
├── URL Check: WARN (1 unknown domain)
├── Dependency: PASS
├── Data Exfil: PASS
└── File Access: PASS

⚠️ Would require user approval before installation.

Run without --dry-run to install.
```

## Common Issues

### Skill Already Installed

```
⚠️ Skill already installed: react-best-practices
   Location: .claude/skills/domain/frontend/react-best-practices/

Options:
--force    Reinstall and overwrite
--update   Update to latest version
```

### Skill Not Found

```
❌ Skill not found: <owner/repo>

Suggestions:
- Check the repository exists on GitHub
- Verify the skill name with --skill option
- Search first: /discover <keyword>
```

### Validation Failed (Critical)

```
🔴 Critical security issues found!

Issues:
1. CRITICAL: Malicious code pattern detected
2. CRITICAL: External IP URL found

Recommendation: DO NOT INSTALL

This skill appears unsafe. If you still want to proceed,
use --no-validate at your own risk.
```

## Integration

- **After discovery**: Use `/discover <keyword>` first to find skills
- **Before agent creation**: Skills are installed during `/agent-creation`
- **For updates**: Re-run with same command to update
- **Security reports**: Saved to `.claude/skills/security-reports/<skill-name>.md`
