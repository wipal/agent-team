# Threat Modeling

## What is Threat Modeling?
A structured approach to identifying, assessing, and addressing security threats.

## STRIDE Framework

### Spoofing
```
Definition: Pretending to be something/someone else

Examples:
- Fake login page
- Compromised credentials
- Session hijacking
- IP spoofing

Mitigations:
- Strong authentication (MFA)
- Certificate validation
- Session tokens with expiration
- Anti-phishing measures
```

### Tampering
```
Definition: Unauthorized modification of data

Examples:
- SQL injection
- Parameter tampering
- File modification
- Man-in-the-middle

Mitigations:
- Input validation
- Parameterized queries
- Digital signatures
- Integrity checks (hashes)
- TLS for transit
```

### Repudiation
```
Definition: Ability to deny actions

Examples:
- "I didn't make that transaction"
- "Someone else used my account"
- Log deletion

Mitigations:
- Comprehensive audit logging
- Digital signatures
- Non-repudiation services
- Timestamped logs
```

### Information Disclosure
```
Definition: Unauthorized access to information

Examples:
- Data breach
- Error message leakage
- Side-channel attacks
- Insecure storage

Mitigations:
- Encryption (at rest, in transit)
- Access controls
- Data masking
- Secure error handling
- Minimal data exposure
```

### Denial of Service
```
Definition: Preventing legitimate access

Examples:
- DDoS attacks
- Resource exhaustion
- Application crashes
- Locking accounts

Mitigations:
- Rate limiting
- Load balancing
- Auto-scaling
- Resource quotas
- Circuit breakers
```

### Elevation of Privilege
```
Definition: Gaining unauthorized capabilities

Examples:
- SQL injection to admin
- Exploiting vulnerabilities
- Token manipulation
- Horizontal/vertical escalation

Mitigations:
- Principle of least privilege
- Role validation
- Security patches
- Input validation
- API authorization
```

## Threat Modeling Process

### Step 1: Identify Assets
```
What are we protecting?
- User data
- Financial data
- Intellectual property
- System availability
- Reputation
```

### Step 2: Create Architecture Diagram
```
┌─────────┐     ┌─────────┐     ┌─────────┐
│  Users  │────▶│   Web   │────▶│   API   │
│         │     │   App   │     │ Server  │
└─────────┘     └─────────┘     └────┬────┘
                                     │
                                     ▼
                               ┌─────────┐
                               │Database │
                               └─────────┘

Mark trust boundaries and data flows.
```

### Step 3: Identify Threats
```
For each component and data flow:
1. Apply STRIDE
2. Identify specific threats
3. Assess likelihood and impact
```

### Step 4: Document Threats
```
| ID | Threat | STRIDE | Likelihood | Impact | Mitigation |
|----|--------|--------|------------|--------|------------|
| T1 | SQL injection | T | High | High | Parameterized queries |
| T2 | Credential theft | S | Medium | High | MFA, monitoring |
```

### Step 5: Prioritize and Plan
```
Risk = Likelihood × Impact

Priority 1: High likelihood, high impact
Priority 2: Medium likelihood, high impact
Priority 3: Low likelihood, high impact
...
```

## DREAD Assessment

```
Score 1-10 for each:
D - Damage potential
R - Reproducibility
E - Exploitability
A - Affected users
D - Discoverability

Risk Score = (D+R+E+A+D) / 5

High: 8-10
Medium: 5-7
Low: 1-4
```

## Common Threats by Architecture

### Web Application
```
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- SQL Injection
- Session hijacking
- Brute force attacks
```

### API
```
- Broken authentication
- Excessive data exposure
- Rate limiting bypass
- Injection attacks
- Improper asset management
```

### Microservices
```
- Service-to-service auth
- Secrets management
- Network eavesdropping
- Container vulnerabilities
- API gateway bypass
```

### Cloud
```
- Misconfigured resources
- Inadequate access controls
- Data exfiltration
- Insider threats
- Supply chain attacks
```
