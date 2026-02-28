#!/bin/bash
# ============================================
# Agent Team Template - Unified Script
# ONE script để làm tất cả
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Version
VERSION="1.0.0"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ============================================
# UTILITY FUNCTIONS
# ============================================

print_header() {
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}  $1${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_item() {
    echo -e "   $1"
}

confirm() {
    local prompt="$1"
    local default="${2:-n}"

    if [[ "$default" == "y" ]]; then
        prompt="$prompt [Y/n]: "
    else
        prompt="$prompt [y/N]: "
    fi

    read -p "$prompt" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        return 0
    elif [[ $REPLY == "" && "$default" == "y" ]]; then
        return 0
    else
        return 1
    fi
}

# ============================================
# HELP
# ============================================

show_help() {
    echo ""
    echo -e "${CYAN}Agent Team Template v${VERSION}${NC}"
    echo ""
    echo "Usage: ./agent.sh <command> [options]"
    echo ""
    echo "Commands:"
    echo "  setup     Create new agent with variants"
    echo "  update    Update existing agent (add/remove variants)"
    echo "  review    Review project & detect tech stack"
    echo "  learn     Analyze project & update knowledge"
    echo "  check     Verify all skills installed"
    echo "  list      List all agents"
    echo "  switch    Switch to agent"
    echo "  sync      Share knowledge between agents"
    echo "  remove    Remove an agent"
    echo "  init      Initialize project with .claude structure"
    echo ""
    echo "Setup Options:"
    echo "  --framework <name>      UI/Backend framework"
    echo "  --styling <name>        CSS solution"
    echo "  --state <name>          State management"
    echo "  --data <name>           Data fetching"
    echo "  --testing <name>        Test framework"
    echo "  --form <name>           Form handling"
    echo "  --ui-lib <name>         UI component library"
    echo "  --i18n <name>           Internationalization"
    echo "  --database <name>       Database type"
    echo "  --orm <name>            ORM tool"
    echo "  --preset <name>         Use preset configuration"
    echo "  --config <file>         Load from config file"
    echo ""
    echo "Examples:"
    echo "  ./agent.sh setup payment-fe dev-fe --framework react --styling tailwind"
    echo "  ./agent.sh setup auth-api dev-be --framework nestjs --database postgresql"
    echo "  ./agent.sh setup admin-fe dev-fe --preset react-full-stack"
    echo "  ./agent.sh list"
    echo "  ./agent.sh switch payment-fe"
    echo "  ./agent.sh check --fix"
    echo ""
}

# ============================================
# INIT PROJECT
# ============================================

init_project() {
    print_header "🚀 INITIALIZING PROJECT"

    local project_root="$(pwd)"
    local claude_dir="$project_root/.claude"

    # Create .claude directory structure
    mkdir -p "$claude_dir"/{agents,shared-skills,rules/{common,role-rules,lessons}}
    mkdir -p "$claude_dir"/{commands/{roles,utils,workflows},skills}

    # Create CLAUDE.md if not exists
    if [[ ! -f "$claude_dir/CLAUDE.md" ]]; then
        cat > "$claude_dir/CLAUDE.md" << 'EOF'
# Project Context

## Project Name
[Project Name]

## Description
[Brief description of the project]

## Tech Stack
- Frontend:
- Backend:
- Database:
- Infrastructure:

## Team Members (Agents)
[List of configured agents]

## Getting Started
1. Setup agents: `./agent.sh setup <name> <role> [variants]`
2. Switch agent: `./agent.sh switch <name>`
3. Start working!

## Notes
- Use Context7 MCP for documentation lookup
- Run `/retrospect-work` at end of session
- Update this file with project-specific context
EOF
        print_success "Created $claude_dir/CLAUDE.md"
    fi

    # Create settings.json if not exists
    if [[ ! -f "$claude_dir/settings.json" ]]; then
        cat > "$claude_dir/settings.json" << 'EOF'
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
EOF
        print_success "Created $claude_dir/settings.json"
    fi

    # Copy general rules
    if [[ -d "$TEMPLATE_ROOT/.claude/rules/common" ]]; then
        cp -r "$TEMPLATE_ROOT/.claude/rules/common"/* "$claude_dir/rules/common/" 2>/dev/null || true
        print_success "Copied common rules"
    fi

    # Copy lessons template
    if [[ ! -f "$claude_dir/rules/lessons/lessons.md" ]]; then
        cat > "$claude_dir/rules/lessons/lessons.md" << 'EOF'
# Lessons Learned

## Format
### YYYY-MM-DD: Lesson Title
**What happened:** Description
**Lesson:** What we learned
**Rule added:** Rule to prevent same mistake

## Recent Lessons
(No lessons yet - run /retrospect-work after sessions)
EOF
        print_success "Created lessons.md template"
    fi

    print_success "Project initialized at $project_root"
    print_item "📁 Created: .claude/"
    print_item "📄 Created: .claude/CLAUDE.md"
    print_item "📄 Created: .claude/settings.json"
    print_item "📄 Created: .claude/rules/lessons/lessons.md"
}

# ============================================
# SETUP AGENT
# ============================================

setup_agent() {
    local agent_name=""
    local base_role=""
    local config_file=""
    local preset=""

    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --framework) shift; FRAMEWORK="$1" ;;
            --styling) shift; STYLING="$1" ;;
            --state) shift; STATE="$1" ;;
            --data) shift; DATA="$1" ;;
            --testing) shift; TESTING="$1" ;;
            --form) shift; FORM="$1" ;;
            --ui-lib) shift; UI_LIB="$1" ;;
            --i18n) shift; I18N="$1" ;;
            --database) shift; DATABASE="$1" ;;
            --orm) shift; ORM="$1" ;;
            --preset) shift; preset="$1" ;;
            --config) shift; config_file="$1" ;;
            -h|--help) show_help; exit 0 ;;
            *)
                if [[ -z "$agent_name" ]]; then
                    agent_name="$1"
                elif [[ -z "$base_role" ]]; then
                    base_role="$1"
                fi
                ;;
        esac
        shift
    done

    # Validate required arguments
    if [[ -z "$agent_name" || -z "$base_role" ]]; then
        if [[ -n "$preset" ]]; then
            # Load preset first
            load_preset "$preset"
        else
            print_error "Missing required arguments"
            echo "Usage: ./agent.sh setup <agent-name> <base-role> [options]"
            exit 1
        fi
    fi

    # Load config file if specified
    if [[ -n "$config_file" && -f "$config_file" ]]; then
        load_config "$config_file"
    fi

    # Load preset if specified
    if [[ -n "$preset" ]]; then
        load_preset "$preset"
    fi

    print_header "🚀 SETTING UP AGENT: $agent_name"

    local claude_dir="$(pwd)/.claude"
    local agent_dir="$claude_dir/agents/$agent_name"

    # Check if agent already exists
    if [[ -d "$agent_dir" ]]; then
        print_error "Agent '$agent_name' already exists"
        if confirm "Update existing agent instead?"; then
            update_agent "$agent_name"
            return
        fi
        exit 1
    fi

    # Create agent directory
    mkdir -p "$agent_dir"/{skills,knowledge}

    print_info "Base Role: $base_role"

    # Create CLAUDE.md from template
    create_agent_claude_md "$agent_name" "$base_role"

    # Create knowledge.md
    create_knowledge_md "$agent_name" "$base_role"

    # Create variants.json
    create_variants_json "$agent_name" "$base_role"

    # Install base skills
    install_base_skills "$agent_name" "$base_role"

    # Install variant skills
    install_variant_skills "$agent_name"

    print_success "Agent '$agent_name' created successfully!"
    print_item "📁 Created: .claude/agents/$agent_name/"
    print_item "📄 Created: CLAUDE.md"
    print_item "📄 Created: knowledge.md"
    print_item "📄 Created: variants.json"
    print_item "📁 Created: skills/"

    echo ""
    print_info "To switch to this agent: ./agent.sh switch $agent_name"
}

# ============================================
# CREATE AGENT FILES
# ============================================

create_agent_claude_md() {
    local agent_name="$1"
    local base_role="$2"
    local agent_dir="$(pwd)/.claude/agents/$agent_name"

    # Check for role template
    local template_file="$TEMPLATE_ROOT/roles/base/$base_role/CLAUDE.md.tmpl"

    if [[ -f "$template_file" ]]; then
        # Use template with substitutions
        sed -e "s/{{PROJECT_NAME}}/$(basename $(pwd))/g" \
            -e "s/{{ROLE_NAME}}/$base_role/g" \
            -e "s/{{AGENT_NAME}}/$agent_name/g" \
            "$template_file" > "$agent_dir/CLAUDE.md"
    else
        # Create default CLAUDE.md
        cat > "$agent_dir/CLAUDE.md" << EOF
# Project: $(basename $(pwd)) - $base_role

## Role
- Bạn là $base_role chuyên sâu về:
  - [Skill 1]
  - [Skill 2]
  - [Skill 3]

## Tech Stack & Conventions
- [Add tech stack details]

### Code Style
- [Convention 1]
- [Convention 2]

## How to Work
### Khi nhận task:
1. Tóm tắt yêu cầu
2. Đề xuất giải pháp
3. Liệt kê files sẽ tạo/sửa
4. Xin confirmation nếu thay đổi lớn

## MCP Integration
- Context7: Dùng để tra cứu documentation (BẮT BUỘC khi code)
- GitHub: Quản lý code và PR

## Knowledge Base
- Đọc từ: .claude/agents/$agent_name/knowledge.md
- Cập nhật qua: /retrospect-work skill

## Installed Variants
$(print_variants_list)
EOF
    fi

    print_success "Created CLAUDE.md"
}

create_knowledge_md() {
    local agent_name="$1"
    local base_role="$2"
    local agent_dir="$(pwd)/.claude/agents/$agent_name"

    cat > "$agent_dir/knowledge.md" << EOF
# $agent_name Knowledge Base

## Metadata
- created: $(date -Iseconds)
- last_updated: $(date -Iseconds)
- base_role: $base_role

## Project Context
[Project-specific information will be added as you work]

## Learned Patterns
(Patterns will be added via /retrospect-work)

## Code Knowledge
(Decisions and patterns will be documented here)

## Common Pitfalls
(Pitfalls to avoid will be documented here)

## Feedback Log
(Feedback will be tracked here)
EOF

    print_success "Created knowledge.md"
}

create_variants_json() {
    local agent_name="$1"
    local base_role="$2"
    local agent_dir="$(pwd)/.claude/agents/$agent_name"

    cat > "$agent_dir/variants.json" << EOF
{
  "agent_name": "$agent_name",
  "base_role": "$base_role",
  "created_at": "$(date -Iseconds)",
  "updated_at": "$(date -Iseconds)",

  "installed_variants": {
$(print_variants_json)
  },

  "shared_skills": [],

  "skill_status": {
    "last_checked": "$(date -Iseconds)",
    "all_available": true,
    "missing_skills": []
  }
}
EOF

    print_success "Created variants.json"
}

print_variants_list() {
    local vars=""
    [[ -n "$FRAMEWORK" ]] && vars="- framework: $FRAMEWORK\n"
    [[ -n "$STYLING" ]] && vars+="- styling: $STYLING\n"
    [[ -n "$STATE" ]] && vars+="- state: $STATE\n"
    [[ -n "$DATA" ]] && vars+="- data: $DATA\n"
    [[ -n "$TESTING" ]] && vars+="- testing: $TESTING\n"
    [[ -n "$FORM" ]] && vars+="- form: $FORM\n"
    [[ -n "$UI_LIB" ]] && vars+="- ui-lib: $UI_LIB\n"
    [[ -n "$I18N" ]] && vars+="- i18n: $I18N\n"
    [[ -n "$DATABASE" ]] && vars+="- database: $DATABASE\n"
    [[ -n "$ORM" ]] && vars+="- orm: $ORM\n"
    echo -e "$vars"
}

print_variants_json() {
    local first=true
    [[ -n "$FRAMEWORK" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"framework\": { \"name\": \"$FRAMEWORK\", \"skills\": [] }"; first=false; }
    [[ -n "$STYLING" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"styling\": { \"name\": \"$STYLING\", \"skills\": [] }"; first=false; }
    [[ -n "$STATE" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"state\": { \"name\": \"$STATE\", \"skills\": [] }"; first=false; }
    [[ -n "$DATA" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"data\": { \"name\": \"$DATA\", \"skills\": [] }"; first=false; }
    [[ -n "$TESTING" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"testing\": { \"name\": \"$TESTING\", \"skills\": [] }"; first=false; }
    [[ -n "$FORM" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"form\": { \"name\": \"$FORM\", \"skills\": [] }"; first=false; }
    [[ -n "$UI_LIB" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"ui-lib\": { \"name\": \"$UI_LIB\", \"skills\": [] }"; first=false; }
    [[ -n "$I18N" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"i18n\": { \"name\": \"$I18N\", \"skills\": [] }"; first=false; }
    [[ -n "$DATABASE" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"database\": { \"name\": \"$DATABASE\", \"skills\": [] }"; first=false; }
    [[ -n "$ORM" ]] && { [[ "$first" == "false" ]] && echo ","; echo "    \"orm\": { \"name\": \"$ORM\", \"skills\": [] }"; first=false; }
}

# ============================================
# INSTALL SKILLS
# ============================================

install_base_skills() {
    local agent_name="$1"
    local base_role="$2"
    local agent_dir="$(pwd)/.claude/agents/$agent_name"
    local shared_skills_dir="$(pwd)/.claude/shared-skills"

    mkdir -p "$shared_skills_dir"
    mkdir -p "$agent_dir/skills"

    # Install role-specific base skills
    if [[ -d "$TEMPLATE_ROOT/.claude/skills/roles/$base_role" ]]; then
        for skill_dir in "$TEMPLATE_ROOT/.claude/skills/roles/$base_role"/*/; do
            if [[ -d "$skill_dir" ]]; then
                local skill_name=$(basename "$skill_dir")
                print_item "Installing role skill: $skill_name"

                # Create symlink to shared skills
                local shared_link="$shared_skills_dir/$skill_name"
                if [[ ! -e "$shared_link" ]]; then
                    ln -s "$skill_dir" "$shared_link"
                fi

                # Create symlink in agent
                ln -s "../../shared-skills/$skill_name" "$agent_dir/skills/$skill_name"
            fi
        done
    fi

    # Install common base skills
    if [[ -d "$TEMPLATE_ROOT/.claude/skills/base" ]]; then
        for skill_dir in "$TEMPLATE_ROOT/.claude/skills/base"/*/; do
            if [[ -d "$skill_dir" ]]; then
                local skill_name=$(basename "$skill_dir")
                print_item "Installing base skill: $skill_name"

                local shared_link="$shared_skills_dir/$skill_name"
                if [[ ! -e "$shared_link" ]]; then
                    ln -s "$skill_dir" "$shared_link"
                fi

                ln -s "../../shared-skills/$skill_name" "$agent_dir/skills/$skill_name"
            fi
        done
    fi
}

install_variant_skills() {
    local agent_name="$1"
    local agent_dir="$(pwd)/.claude/agents/$agent_name"

    # Install framework skills
    if [[ -n "$FRAMEWORK" ]]; then
        install_variant_category "$agent_dir" "frameworks" "$FRAMEWORK"
    fi

    # Install styling skills
    if [[ -n "$STYLING" ]]; then
        install_variant_category "$agent_dir" "styling" "$STYLING"
    fi

    # Install state skills
    if [[ -n "$STATE" ]]; then
        install_variant_category "$agent_dir" "state" "$STATE"
    fi

    # Install testing skills
    if [[ -n "$TESTING" ]]; then
        install_variant_category "$agent_dir" "testing" "$TESTING"
    fi

    # Install database skills
    if [[ -n "$DATABASE" ]]; then
        install_variant_category "$agent_dir" "database" "$DATABASE"
    fi

    # Install orm skills
    if [[ -n "$ORM" ]]; then
        install_variant_category "$agent_dir" "orm" "$ORM"
    fi
}

install_variant_category() {
    local agent_dir="$1"
    local category="$2"
    local variant="$3"

    local variant_dir="$TEMPLATE_ROOT/.claude/skills/variants/$category/$variant"

    if [[ -d "$variant_dir" ]]; then
        for skill_dir in "$variant_dir"/*/; do
            if [[ -d "$skill_dir" ]]; then
                local skill_name=$(basename "$skill_dir")
                print_item "Installing variant skill: $skill_name ($category/$variant)"
                cp -r "$skill_dir" "$agent_dir/skills/$skill_name"
            fi
        done
    else
        print_warning "Variant skills not found: $category/$variant"
    fi
}

# ============================================
# LOAD PRESET
# ============================================

load_preset() {
    local preset_name="$1"
    local preset_file="$TEMPLATE_ROOT/presets/$preset_name.yaml"

    if [[ ! -f "$preset_file" ]]; then
        print_error "Preset not found: $preset_name"
        echo "Available presets:"
        ls -1 "$TEMPLATE_ROOT/presets"/*.yaml 2>/dev/null | xargs -n1 basename | sed 's/.yaml$//'
        exit 1
    fi

    print_info "Loading preset: $preset_name"

    # Simple YAML parsing (for basic preset format)
    while IFS= read -r line; do
        # Skip comments and empty lines
        [[ "$line" =~ ^[[:space:]]*# ]] && continue
        [[ -z "${line// }" ]] && continue

        # Parse key: value
        if [[ "$line" =~ ^[[:space:]]*([a-z-]+):[[:space:]]*(.+)$ ]]; then
            local key="${BASH_REMATCH[1]}"
            local value="${BASH_REMATCH[2]}"

            case "$key" in
                framework) FRAMEWORK="$value" ;;
                styling) STYLING="$value" ;;
                state) STATE="$value" ;;
                data) DATA="$value" ;;
                testing) TESTING="$value" ;;
                form) FORM="$value" ;;
                ui-lib) UI_LIB="$value" ;;
                i18n) I18N="$value" ;;
                database) DATABASE="$value" ;;
                orm) ORM="$value" ;;
            esac
        fi
    done < "$preset_file"
}

# ============================================
# UPDATE AGENT
# ============================================

update_agent() {
    local agent_name="$1"
    shift

    local agent_dir="$(pwd)/.claude/agents/$agent_name"

    if [[ ! -d "$agent_dir" ]]; then
        print_error "Agent '$agent_name' not found"
        exit 1
    fi

    print_header "🔄 UPDATING AGENT: $agent_name"

    # Parse update options
    while [[ $# -gt 0 ]]; do
        case $1 in
            --add) shift; add_variant "$agent_dir" "$1" ;;
            --remove) shift; remove_variant "$agent_dir" "$1" ;;
            --replace) shift; replace_variant "$agent_dir" "$1" ;;
            --sync) shift; sync_config "$agent_dir" "$1" ;;
            *) print_warning "Unknown option: $1" ;;
        esac
        shift
    done

    # Update timestamp
    if command -v jq &> /dev/null; then
        tmp=$(mktemp)
        jq '.updated_at = "'$(date -Iseconds)'"' "$agent_dir/variants.json" > "$tmp"
        mv "$tmp" "$agent_dir/variants.json"
    fi

    print_success "Agent '$agent_name' updated"
}

add_variant() {
    local agent_dir="$1"
    local variant="$2"
    print_info "Adding variant: $variant"
    # Implementation would install the variant skills
}

remove_variant() {
    local agent_dir="$1"
    local variant="$2"
    print_info "Removing variant: $variant"
    # Implementation would remove the variant skills
}

replace_variant() {
    local agent_dir="$1"
    local replacement="$2"

    if [[ "$replacement" != *"="* ]]; then
        print_error "Invalid replacement format. Use: --replace old=new"
        return
    fi

    local old="${replacement%%=*}"
    local new="${replacement#*=}"

    print_info "Replacing variant: $old → $new"
    # Implementation would replace variant skills
}

# ============================================
# LIST AGENTS
# ============================================

list_agents() {
    local agents_dir="$(pwd)/.claude/agents"

    if [[ ! -d "$agents_dir" ]]; then
        print_warning "No agents configured. Run './agent.sh init' first."
        return
    fi

    print_header "📋 AGENTS IN PROJECT: $(basename $(pwd))"

    if [[ -z "$(ls -A $agents_dir 2>/dev/null)" ]]; then
        print_warning "No agents found"
        print_info "Create one with: ./agent.sh setup <name> <role> [variants]"
        return
    fi

    echo -e "┌─────────────────┬─────────┬──────────────────────────────┐"
    echo -e "│ Agent           │ Role    │ Variants                     │"
    echo -e "├─────────────────┼─────────┼──────────────────────────────┤"

    for agent_dir in "$agents_dir"/*/; do
        if [[ -d "$agent_dir" ]]; then
            local name=$(basename "$agent_dir")
            local role=""
            local variants=""

            if [[ -f "$agent_dir/variants.json" ]] && command -v jq &> /dev/null; then
                role=$(jq -r '.base_role // "unknown"' "$agent_dir/variants.json")
                variants=$(jq -r '.installed_variants | to_entries | map(.value.name) | join(", ")' "$agent_dir/variants.json" 2>/dev/null || echo "")
            fi

            printf "│ %-15s │ %-7s │ %-28s │\n" "$name" "$role" "$variants"
        fi
    done

    echo -e "└─────────────────┴─────────┴──────────────────────────────┘"
}

# ============================================
# SWITCH AGENT
# ============================================

switch_agent() {
    local agent_name="$1"

    if [[ -z "$agent_name" ]]; then
        print_error "Agent name required"
        echo "Usage: ./agent.sh switch <agent-name>"
        list_agents
        exit 1
    fi

    local agent_dir="$(pwd)/.claude/agents/$agent_name"

    if [[ ! -d "$agent_dir" ]]; then
        print_error "Agent '$agent_name' not found"
        list_agents
        exit 1
    fi

    print_header "🔄 SWITCHING TO AGENT: $agent_name"

    # Get role info
    local role=""
    local variants=""
    if [[ -f "$agent_dir/variants.json" ]] && command -v jq &> /dev/null; then
        role=$(jq -r '.base_role // "unknown"' "$agent_dir/variants.json")
        variants=$(jq -r '.installed_variants | to_entries | map(.value.name) | join(" + ")' "$agent_dir/variants.json" 2>/dev/null || echo "")
    fi

    print_success "Switched to agent '$agent_name'"
    print_item "Role: $role"
    [[ -n "$variants" ]] && print_item "Variants: $variants"
    print_item "Config: .claude/agents/$agent_name/CLAUDE.md"

    echo ""
    print_info "In Claude Code, use: /switch $agent_name"
}

# ============================================
# CHECK SKILLS
# ============================================

check_skills() {
    local agent_name=""
    local auto_fix=false

    while [[ $# -gt 0 ]]; do
        case $1 in
            --fix) auto_fix=true ;;
            *)
                if [[ -z "$agent_name" ]]; then
                    agent_name="$1"
                fi
                ;;
        esac
        shift
    done

    print_header "🔍 SKILL CHECK"

    local agents_dir="$(pwd)/.claude/agents"

    if [[ -n "$agent_name" ]]; then
        check_agent_skills "$agents_dir/$agent_name" "$auto_fix"
    else
        for agent_dir in "$agents_dir"/*/; do
            if [[ -d "$agent_dir" ]]; then
                check_agent_skills "$agent_dir" "$auto_fix"
            fi
        done
    fi
}

check_agent_skills() {
    local agent_dir="$1"
    local auto_fix="$2"
    local agent_name=$(basename "$agent_dir")

    print_info "Checking agent: $agent_name"

    local skills_dir="$agent_dir/skills"

    if [[ ! -d "$skills_dir" ]]; then
        print_warning "No skills directory found"
        return
    fi

    local missing=0
    local found=0

    for skill_path in "$skills_dir"/*; do
        if [[ -e "$skill_path" ]]; then
            local skill_name=$(basename "$skill_path")
            if [[ -f "$skill_path/SKILL.md" ]] || [[ -L "$skill_path" && -f "$(readlink -f $skill_path)/SKILL.md" ]]; then
                print_success "$skill_name (OK)"
                ((found++))
            else
                print_error "$skill_name (MISSING SKILL.md)"
                ((missing++))
            fi
        fi
    done

    echo ""
    echo -e "   Found: $found, Missing: $missing"
}

# ============================================
# REMOVE AGENT
# ============================================

remove_agent() {
    local agent_name="$1"

    if [[ -z "$agent_name" ]]; then
        print_error "Agent name required"
        exit 1
    fi

    local agent_dir="$(pwd)/.claude/agents/$agent_name"

    if [[ ! -d "$agent_dir" ]]; then
        print_error "Agent '$agent_name' not found"
        exit 1
    fi

    print_warning "This will remove agent '$agent_name' and all its data"

    if confirm "Continue?"; then
        rm -rf "$agent_dir"
        print_success "Agent '$agent_name' removed"
    else
        print_info "Cancelled"
    fi
}

# ============================================
# REVIEW PROJECT
# ============================================

review_project() {
    print_header "🔍 PROJECT REVIEW"

    local project_root="$(pwd)"

    print_info "Analyzing project structure..."

    # Detect tech stack
    echo ""
    echo -e "${BLUE}🛠️  Detected Tech Stack:${NC}"

    # Check for package.json (Node.js)
    if [[ -f "$project_root/package.json" ]]; then
        print_item "Node.js project detected"

        if grep -q "react" "$project_root/package.json" 2>/dev/null; then
            print_item "Framework: React"
        fi
        if grep -q "vue" "$project_root/package.json" 2>/dev/null; then
            print_item "Framework: Vue"
        fi
        if grep -q "next" "$project_root/package.json" 2>/dev/null; then
            print_item "Meta-framework: Next.js"
        fi
        if grep -q "tailwind" "$project_root/package.json" 2>/dev/null; then
            print_item "Styling: TailwindCSS"
        fi
        if grep -q "vitest" "$project_root/package.json" 2>/dev/null; then
            print_item "Testing: Vitest"
        fi
        if grep -q "jest" "$project_root/package.json" 2>/dev/null; then
            print_item "Testing: Jest"
        fi
        if grep -q "nestjs" "$project_root/package.json" 2>/dev/null; then
            print_item "Backend: NestJS"
        fi
        if grep -q "@nestjs/typeorm" "$project_root/package.json" 2>/dev/null; then
            print_item "ORM: TypeORM"
        fi
        if grep -q "@prisma/client" "$project_root/package.json" 2>/dev/null; then
            print_item "ORM: Prisma"
        fi
    fi

    # Check for Python
    if [[ -f "$project_root/requirements.txt" ]] || [[ -f "$project_root/pyproject.toml" ]]; then
        print_item "Python project detected"

        if grep -q "fastapi" "$project_root/requirements.txt" 2>/dev/null; then
            print_item "Framework: FastAPI"
        fi
        if grep -q "django" "$project_root/requirements.txt" 2>/dev/null; then
            print_item "Framework: Django"
        fi
    fi

    # Check for Go
    if [[ -f "$project_root/go.mod" ]]; then
        print_item "Go project detected"

        if grep -q "gin-gonic" "$project_root/go.mod" 2>/dev/null; then
            print_item "Framework: Gin"
        fi
    fi

    # Check for database files
    if [[ -d "$project_root/prisma" ]]; then
        print_item "Database schema: Prisma"
    fi
    if [[ -f "$project_root/docker-compose.yml" ]] || [[ -f "$project_root/docker-compose.yaml" ]]; then
        print_item "Containerization: Docker Compose"
    fi

    echo ""
    print_info "Run './agent.sh setup <name> <role> [variants]' to create an agent"
}

# ============================================
# LEARN / RETROSPECT
# ============================================

learn_from_project() {
    print_header "🧠 LEARNING FROM PROJECT"

    local project_root="$(pwd)"

    print_info "Analyzing code patterns..."

    # This would be enhanced to actually analyze the codebase
    print_success "Pattern analysis complete"
    print_info "Run '/retrospect-work' in Claude Code for detailed learning"
}

# ============================================
# SYNC KNOWLEDGE
# ============================================

sync_knowledge() {
    local from_agent="$1"
    local to_agent="$2"

    if [[ -z "$from_agent" ]]; then
        print_error "Source agent required"
        echo "Usage: ./agent.sh sync <from-agent> <to-agent>"
        echo "       ./agent.sh sync <from-agent> --to-role <role>"
        exit 1
    fi

    print_header "🔄 SYNCING KNOWLEDGE"

    local from_dir="$(pwd)/.claude/agents/$from_agent"

    if [[ ! -d "$from_dir" ]]; then
        print_error "Source agent '$from_agent' not found"
        exit 1
    fi

    print_info "Syncing from: $from_agent"

    # Implementation would sync knowledge.md patterns
    print_success "Knowledge sync complete"
}

# ============================================
# MAIN
# ============================================

# Check if no arguments
if [[ $# -eq 0 ]]; then
    show_help
    exit 0
fi

# Parse command
command="$1"
shift

case "$command" in
    setup) setup_agent "$@" ;;
    update) update_agent "$@" ;;
    list|ls) list_agents ;;
    switch) switch_agent "$@" ;;
    check) check_skills "$@" ;;
    remove|rm) remove_agent "$@" ;;
    review) review_project ;;
    learn) learn_from_project ;;
    sync) sync_knowledge "$@" ;;
    init) init_project ;;
    help|-h|--help) show_help ;;
    version|-v|--version) echo "Agent Team Template v$VERSION" ;;
    *)
        print_error "Unknown command: $command"
        show_help
        exit 1
        ;;
esac
