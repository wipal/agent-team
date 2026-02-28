# Technology Radar

## Overview
A Technology Radar visualizes technology decisions across categories and adoption stages.

## Radar Structure

### Rings (Adoption Stages)
```
┌─────────────────────────────────────────────┐
│                  ADOPT                       │
│  ┌───────────────────────────────────────┐  │
│  │              TRIAL                     │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │           ASSESS                │  │  │
│  │  │  ┌───────────────────────────┐  │  │  │
│  │  │  │        HOLD               │  │  │  │
│  │  │  └───────────────────────────┘  │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

ADOPT: Proven, ready for production use
TRIAL: Worth pursuing, use in non-critical
ASSESS: Worth exploring, needs evaluation
HOLD: Proceed with caution, or avoid
```

### Quadrants (Categories)
```
┌──────────────────┬──────────────────┐
│   TECHNIQUES     │   PLATFORMS      │
│   - Practices    │   - Cloud        │
│   - Methods      │   - Services     │
│   - Patterns     │   - Infrastructure│
├──────────────────┼──────────────────┤
│   TOOLS          │   LANGUAGES      │
│   - Libraries    │   - Programming  │
│   - Frameworks   │   - Frameworks   │
│   - Applications │   - Runtimes     │
└──────────────────┴──────────────────┘
```

## Example Radar

### Techniques
```
ADOPT:
- Continuous Integration
- Trunk-based Development
- Infrastructure as Code
- Containerization

TRIAL:
- Feature Flags
- Contract Testing
- Chaos Engineering
- Event Storming

ASSESS:
- Platform Engineering
- FinOps
- Green Software Engineering

HOLD:
- Manual Deployments
- Waterfall Planning
```

### Platforms
```
ADOPT:
- AWS/Azure/GCP (multi-cloud strategy)
- Kubernetes
- Terraform
- PostgreSQL

TRIAL:
- Serverless Containers
- Managed Kafka
- GraphQL Services

ASSESS:
- Edge Computing
- WebAssembly Runtimes

HOLD:
- Data Centers (for most)
- VM-only Deployments
```

### Tools
```
ADOPT:
- Git
- Docker
- VS Code
- Prometheus/Grafana

TRIAL:
- Terraform Cloud
- Backstage
- ArgoCD

ASSESS:
- AI Coding Assistants
- New Relic One

HOLD:
- Jenkins (use modern alternatives)
- SVN
```

### Languages & Frameworks
```
ADOPT:
- TypeScript
- Python
- Go
- React
- Node.js

TRIAL:
- Rust (for performance-critical)
- Deno
- Svelte

ASSESS:
- Bun
- Swift on Server

HOLD:
- CoffeeScript
- jQuery (for new projects)
```

## Creating Your Radar

### Step 1: Gather Input
```
Sources:
- Team experience
- Industry trends
- Conference talks
- Tech blogs
- Consultant advice
- Community feedback
```

### Step 2: Categorize
```
For each technology:
1. Identify quadrant
2. Determine ring
3. Document rationale
4. Add move date
```

### Step 3: Review Regularly
```
Cadence:
- Quarterly reviews
- Annual major updates
- Ad-hoc for significant changes

Process:
1. Review existing placements
2. Discuss new technologies
3. Vote on ring changes
4. Document decisions
```

## Movement Rules

### Moving Outward (Adopt → Trial → Assess)
```
Technologies move outward when:
- Proven in production
- Team expertise grown
- Community adoption increased
- Risks mitigated
```

### Moving Inward (Assess → Trial → Adopt → Hold)
```
Technologies move inward when:
- Security vulnerabilities found
- Better alternatives emerge
- Maintenance issues
- Community decline
```

## Radar as Decision Tool

### For New Projects
```
1. Check radar first
2. Use ADOPT technologies for core
3. Use TRIAL for experiments
4. Avoid HOLD technologies
```

### For Technology Selection
```
If technology in ADOPT:
→ Proceed with confidence

If technology in TRIAL:
→ Use in non-critical paths
→ Have fallback plan

If technology in ASSESS:
→ POC required
→ Document decision

If technology in HOLD:
→ Need strong justification
→ Executive approval needed
```

## Radar Tools
```
- ThoughtWorks Tech Radar (open source viz)
- radar.thoughtworks.com
- Custom HTML/JS visualizations
- Confluence/Notion tables
- Miro/Figma diagrams
```

## Maintenance

### Quarterly Review Agenda
```
1. Review technologies that moved
   - What changed in the ecosystem?
   - What did we learn?

2. Discuss new candidates
   - What's emerging?
   - What's relevant to us?

3. Vote on changes
   - Consensus-based decisions
   - Document rationale

4. Update radar
   - Publish changes
   - Communicate to teams
```

### Metrics to Track
```
- Technologies per ring (balance)
- Time in each ring (velocity)
- Adoption success rate
- Regret rate (moved to hold after adopt)
```
