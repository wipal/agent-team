# Agent Team Template - Documentation

> **Phiên bản:** 1.0
> **Cập nhật:** 2025-02-25
> **Mục đích:** Template để tạo team AI agents trong Claude Code

---

## 📋 Tổng Quan

**Agent Team Template** là hệ thống để:
- Tạo team với nhiều AI agents chuyên môn
- Mỗi agent có skills, knowledge base riêng
- Tự học và cải thiện qua thời gian
- Setup nhanh cho mỗi dự án

### Key Features

| Feature | Mô tả |
|---------|-------|
| **Multi-Variant Composition** | 1 agent = 1 base role + N variants |
| **Skill Management** | Official (install) + Community (copy) |
| **Model Strategy** | Sonnet (implement) + Opus (think) |
| **Self-Learning** | Retrospect & knowledge extraction |
| **Unified Script** | 1 script `./agent.sh` làm tất cả |

---

## 📚 Documentation Structure

```
docs/
├── README.md              # Tổng quan (bạn đang đọc)
├── 01-architecture.md     # Kiến trúc hệ thống
├── 02-setup-guide.md      # Hướng dẫn setup
├── 03-skills-guide.md     # Quản lý skills
├── 04-workflows.md        # Các workflow
├── 05-model-strategy.md   # Chiến lược model
├── 06-extend-guide.md     # Hướng dẫn mở rộng
└── 07-quick-reference.md  # Cheat sheet
```

---

## 🚀 Quick Start

### 1. Setup Project
```bash
# Clone template
git clone [agent-team-template] my-project/.agent-team
cd my-project

# Run setup
./.agent-team/scripts/agent.sh setup payment-fe dev-fe \
  --framework react \
  --styling tailwind \
  --state zustand \
  --testing vitest
```

### 2. Switch Agent
```bash
./agent.sh switch payment-fe
# Hoặc dùng slash command
/switch payment-fe
```

### 3. Work & Learn
```bash
# End of day - learn from session
./agent.sh learn
```

---

## 📖 Tài Liệu Chi Tiết

| Document | Nội dung |
|----------|----------|
| [01-architecture.md](01-architecture.md) | Base Role + Variants, Multi-Agent, Directory Structure |
| [02-setup-guide.md](02-setup-guide.md) | Setup script, Config files, Presets |
| [03-skills-guide.md](03-skills-guide.md) | Official vs Community, COPY vs INSTALL |
| [04-workflows.md](04-workflows.md) | Review project, Learn, Self-improvement |
| [05-model-strategy.md](05-model-strategy.md) | Sonnet vs Opus, When to use what |
| [06-extend-guide.md](06-extend-guide.md) | Tạo agent mới, workflow mới, skill mới |
| [07-quick-reference.md](07-quick-reference.md) | Commands, Patterns, Troubleshooting |

---

## 🛠️ Core Commands

```bash
# ONE script để làm tất cả
./agent.sh <command> [options]

Commands:
  setup     Create new agent with variants
  update    Update existing agent
  review    Review project & detect tech stack
  learn     Analyze project & update knowledge
  check     Verify all skills installed
  list      List all agents
  switch    Switch to agent
  sync      Share knowledge between agents
```

---

## 🎯 Philosophy

1. **Đơn giản** - 1 script, ít commands
2. **Độc lập** - Skills trong source, không phụ thuộc external
3. **Tự học** - Agent tự cải thiện qua retrospect
4. **Flexible** - Multi-variant composition cho mọi tech stack

---

## 📊 Sources Learned From

| Source | Patterns Learned |
|--------|------------------|
| **BMAD-METHOD** | Scale-Adaptive, Adversarial Review, Fresh Chats |
| **ClaudeKit** | Verification Gates, Systematic Debugging |
| **System Prompts** | Tool Selection, Context Compression |
| **VoltAgent** | 380+ skill patterns |
| **Antigravity Kit** | Auto-detection, Party Mode |

---

## ⚡ Need Help?

- **Quick reference:** [07-quick-reference.md](07-quick-reference.md)
- **Create new agent:** [06-extend-guide.md](06-extend-guide.md)
- **Troubleshooting:** [07-quick-reference.md#troubleshooting](07-quick-reference.md#troubleshooting)
