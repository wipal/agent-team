# Skills Discovery Guide

> **Phiên bản:** 1.0
> **Cập nhật:** 2025-02-26
> **Related:** [Extend Guide](06-extend-guide.md) | [Skills Guide](03-skills-guide.md)

---

## 📋 Mục Lục

1. [Overview](#-overview)
2. [skills.sh Directory](#-skillssh-directory)
3. [Available Commands](#-available-commands)
4. [Official vs Community Sources](#-official-vs-community-sources)
5. [Security Validation](#-security-validation)
6. [Best Practices](#-best-practices)
7. [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

**skills.sh** là Agent Skills Directory với hơn 75,000 skills từ các sources:
- Official: Anthropic, Vercel, Microsoft, Google, Expo, Supabase, etc.
- Community: Individual developers, open source contributors

### Tại sao dùng skills.sh?

| Lợi ích | Mô tả |
|---------|-------|
| Tiết kiệm thời gian | Không cần viết skill từ đầu |
| Chất lượng cao | Skills từ official sources đã được test |
| Cộng đồng lớn | 75K+ skills, 169K+ installs cho popular skills |
| Cập nhật | Skills được maintain và update liên tục |

---

## 📚 skills.sh Directory

### Top Official Skills

| Skill | Source | Installs | Description |
|-------|--------|----------|-------------|
| find-skills | vercel-labs/skills | 329K | Find relevant skills |
| react-best-practices | vercel-labs/agent-skills | 169K | React patterns |
| web-design-guidelines | vercel-labs/agent-skills | 129K | Web design rules |
| frontend-design | anthropics/skills | 100K | UI components |
| azure-* | microsoft/github-copilot-for-azure | 62K | Azure skills |
| pdf | anthropics/skills | 22K | PDF manipulation |
| next-best-practices | vercel-labs/next-skills | 21K | Next.js patterns |

### Top Community Skills

| Skill | Source | Installs | Description |
|-------|--------|----------|-------------|
| brainstorming | obra/superpowers | 31K | Problem solving |
| audit-website | squirrelscan/skills | 27K | Website auditing |
| seo-audit | coreyhaines31/marketingskills | 27K | SEO optimization |
| systematic-debugging | obra/superpowers | 17K | Debug methodology |
| webapp-testing | anthropics/skills | 14K | Playwright testing |
| mcp-builder | anthropics/skills | 13K | MCP server creation |

### Categories

| Category | Examples |
|----------|----------|
| **Frontend** | react, vue, angular, tailwind, styling |
| **Backend** | api, database, nestjs, fastapi, prisma |
| **DevOps** | docker, kubernetes, ci-cd, terraform |
| **Architecture** | microservices, system-design, adr |
| **Product** | requirements, user-stories, sprint |
| **Quality** | testing, e2e, playwright, cypress |
| **Marketing** | seo, content, analytics |

---

## 🛠️ Available Commands

### /discover - Search Skills

```bash
# Basic search
/discover react

# Search with category filter
/discover api --category backend

# Search with role filter
/discover components --role dev-fe

# Official sources only
/discover testing --official

# Community sources only
/discover vue --community
```

### /install-skill - Install Skills

```bash
# Install specific skill
/install-skill vercel-labs/agent-skills --skill react-best-practices

# Install from Anthropic
/install-skill anthropics/skills --skill pdf

# Dry run (validate without installing)
/install-skill community/skill --dry-run

# Skip validation (not recommended)
/install-skill official/skill --no-validate

# Install with customization
/install-skill vercel-labs/agent-skills --skill frontend-design --customize
```

### /review-skills - Review Existing Skills

```bash
# Review all skills
/review-skills --all

# Review specific category
/review-skills --category frontend

# Review specific skill
/review-skills --skill code-review

# Suggest alternatives
/review-skills --all --suggest

# Generate report file
/review-skills --all --report
```

---

## ✅ Official vs Community Sources

### Official Sources (Auto-validated)

```yaml
official_sources:
  - owner: anthropics
    trust_level: full
    auto_approve: true

  - owner: vercel-labs
    trust_level: full
    auto_approve: true

  - owner: microsoft
    trust_level: full
    auto_approve: true

  - owner: expo
    trust_level: full
    auto_approve: true

  - owner: supabase
    trust_level: full
    auto_approve: true
```

### Community Sources (Review Required)

```yaml
community_sources:
  - owner: mrgoonie      # ClaudeKit
    requires_review: true

  - owner: obra          # Superpowers
    requires_review: true

  - owner: antfu         # Vue/Vite
    requires_review: true

  - owner: wshobson      # Architecture
    requires_review: true
```

### Installation Path

| Source Type | Installation Path |
|-------------|-------------------|
| Official | `.claude/skills/domain/<category>/` |
| Community | `.claude/skills/community/` |
| Core (local) | `.claude/skills/core/` |

---

## 🔒 Security Validation

### Validation Checks

| Check | Description | Severity Levels |
|-------|-------------|-----------------|
| Code Review | Scan for malicious patterns | CRITICAL, HIGH |
| Command Scan | Detect dangerous commands | CRITICAL, HIGH |
| URL Check | Validate external URLs | HIGH, MEDIUM |
| Dependency Audit | Check vulnerable packages | HIGH, MEDIUM |
| Data Exfiltration | Detect data leaks | CRITICAL, HIGH |
| File Access | Check file operations | HIGH, MEDIUM |

### Security Report

Khi tìm thấy issues, một security report được generate:

```markdown
⚠️ Security Review Required: <skill-name>

| Check | Status | Issues |
|-------|--------|--------|
| Code Review | PASS | 0 |
| Command Scan | WARN | 1 |
| URL Check | PASS | 0 |
| Dependency Audit | PASS | 0 |
| Data Exfiltration | PASS | 0 |
| File Access | PASS | 0 |

🟡 1 MEDIUM issue found:
- eval() usage at SKILL.md:42
- Recommendation: Use JSON.parse() instead

Decision required:
[ ] APPROVE - Install anyway
[ ] FIX FIRST - Fix then install
[ ] REJECT - Do not install
```

### Key Principle

> **NEVER auto-reject.** Always report issues and let user decide.

---

## 💡 Best Practices

### DO ✅

1. **Always search first** - Before creating any skill
2. **Use official sources** - When available
3. **Validate community skills** - Always run security check
4. **Copy, don't symlink** - For customization flexibility
5. **Review periodically** - Run `/review-skills` monthly

### DON'T ❌

1. **Skip skills.sh search** - Never create without checking
2. **Ignore security warnings** - Always review issues
3. **Auto-reject skills** - Let user make decisions
4. **Symlink community skills** - Copy for customization
5. **Install without registry** - Always update skills-registry.yaml

### Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                  RECOMMENDED WORKFLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. /discover <keyword>                                         │
│     └── Search skills.sh for relevant skills                    │
│                                                                  │
│  2. Review results                                               │
│     ├── Check source (official/community)                       │
│     ├── Check install count                                     │
│     └── Check description                                       │
│                                                                  │
│  3. /install-skill <owner/repo> --skill <name>                  │
│     └── Install with validation                                 │
│                                                                  │
│  4. Review security report (if community)                       │
│     └── Make decision: APPROVE / FIX / REJECT                   │
│                                                                  │
│  5. Customize if needed                                          │
│     └── Edit SKILL.md for project specifics                     │
│                                                                  │
│  6. Register in skills-registry.yaml                             │
│     └── Automatic with /install-skill                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### Skill Not Found

```
❌ Skill not found: <owner/repo>
```

**Solutions:**
- Check repository exists on GitHub
- Verify skill name with `--skill` option
- Search first: `/discover <keyword>`

### Validation Failed

```
🔴 Critical security issues found!
```

**Solutions:**
- Review the security report
- Fix issues if possible
- Use `--no-validate` at your own risk
- Find alternative skill

### Already Installed

```
⚠️ Skill already installed: <skill-name>
```

**Solutions:**
- Use `--force` to reinstall
- Use `--update` to update version
- Check `.claude/skills/skills-registry.yaml`

### Network Issues

```
❌ Failed to fetch skill from skills.sh
```

**Solutions:**
- Check internet connection
- Try again later
- Use cached version if available

---

## 📚 Related Documentation

- [Extend Guide](06-extend-guide.md) - Creating new skills
- [Skills Guide](03-skills-guide.md) - Managing skills
- [Architecture](01-architecture.md) - System overview
- [skills.sh](https://skills.sh) - Online directory
- [agentskills.io](https://agentskills.io) - Specification
