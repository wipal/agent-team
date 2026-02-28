---
name: security-architecture
description: |
  Use when designing security architecture, threat modeling, or ensuring
  compliance. Covers authentication patterns, authorization models,
  threat modeling (STRIDE), and compliance frameworks.
version: 1.0.0
category: security
tags:
  - security
  - threat-modeling
  - authentication
  - compliance
dependencies: []
references:
  - references/threat-modeling.md
  - references/auth-patterns.md
  - references/compliance.md
---

# Security Architecture

## Core Principle
**Security by design, defense in depth, least privilege.**

## When to Use This Skill

### Trigger Conditions
- Designing authentication/authorization system
- Conducting threat modeling
- Planning security controls
- Addressing compliance requirements
- Reviewing architecture for security

### Keywords
- "security architecture"
- "authentication"
- "authorization"
- "threat model"
- "compliance"
- "encryption"

## Security Principles

### 1. Defense in Depth
```
Multiple layers of security:

┌─────────────────────────────────────────┐
│ Layer 1: Network Security (Firewall)    │
├─────────────────────────────────────────┤
│ Layer 2: Application Security (WAF)     │
├─────────────────────────────────────────┤
│ Layer 3: Authentication (Identity)      │
├─────────────────────────────────────────┤
│ Layer 4: Authorization (RBAC/ABAC)      │
├─────────────────────────────────────────┤
│ Layer 5: Data Security (Encryption)     │
├─────────────────────────────────────────┤
│ Layer 6: Audit Logging                  │
└─────────────────────────────────────────┘
```

### 2. Least Privilege
```
Grant minimum permissions needed:
- Users: Only access their data
- Services: Only permissions for their function
- Admins: Limited scope, time-bound elevation
```

### 3. Zero Trust
```
Never trust, always verify:
- Verify every request
- Authenticate every service
- Encrypt all communication
- Assume breach
```

## Authentication Patterns

### OAuth 2.0 / OIDC
```
┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │────▶│  Auth   │────▶│  App    │
│         │     │ Server  │     │         │
└─────────┘     └────┬────┘     └─────────┘
                     │
                Access Token
                     │
                     ▼
               ┌─────────┐
               │   API   │
               └─────────┘

Flows:
- Authorization Code (web apps)
- PKCE (mobile/SPA)
- Client Credentials (service-to-service)
```

### JWT Pattern
```
JWT Structure:
Header.Payload.Signature

Best Practices:
- Short expiration (15-60 min)
- Refresh tokens for longevity
- Validate signature always
- Check claims (iss, aud, exp)
- Don't store sensitive data
```

## Authorization Models

### RBAC (Role-Based)
```
Roles → Permissions

Admin → [read:*, write:*, delete:*]
Editor → [read:*, write:*]
Viewer → [read:*]

User → Role → Permissions
```

### ABAC (Attribute-Based)
```
Attributes determine access:

User: department=HR, level=manager
Resource: type=salary_data
Policy: department=HR AND level>employee

More flexible, more complex
```

## Threat Modeling (STRIDE)

| Threat | Description | Mitigation |
|--------|-------------|------------|
| **S**poofing | Impersonation | Authentication |
| **T**ampering | Data modification | Integrity checks |
| **R**epudiation | Deny actions | Audit logs |
| **I**nfo Disclosure | Data leak | Encryption |
| **D**enial of Service | Availability | Rate limiting |
| **E**levation of Privilege | Unauthorized access | Authorization |

## Security Checklist

### Authentication
- [ ] Strong password policy
- [ ] Multi-factor authentication
- [ ] Secure password recovery
- [ ] Session management
- [ ] Token revocation

### Authorization
- [ ] Role-based access control
- [ ] Resource-level permissions
- [ ] API authorization
- [ ] Admin access controls

### Data Protection
- [ ] Encryption at rest
- [ ] Encryption in transit (TLS)
- [ ] Key management
- [ ] Data classification

### API Security
- [ ] Input validation
- [ ] Rate limiting
- [ ] API keys/tokens
- [ ] CORS configuration

### Infrastructure
- [ ] Network segmentation
- [ ] Firewall rules
- [ ] VPN/Bastion hosts
- [ ] Patch management

## Output

When designing security:
1. **Threat Model** - STRIDE analysis
2. **Security Architecture** - Diagram with controls
3. **Security ADR** - Key decisions
4. **Compliance Checklist** - Requirements mapped

## Rules

### DO
- ✅ Threat model every design
- ✅ Encrypt sensitive data
- ✅ Log security events
- ✅ Validate all input
- ✅ Use proven libraries

### DON'T
- ❌ Roll your own crypto
- ❌ Store secrets in code
- ❌ Trust user input
- ❌ Skip security review
- ❌ Ignore compliance
