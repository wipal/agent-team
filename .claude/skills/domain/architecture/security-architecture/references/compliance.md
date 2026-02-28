# Compliance Frameworks

## Overview
Compliance requirements vary by industry and region. This reference covers common frameworks and their key requirements.

## Major Compliance Frameworks

### GDPR (EU Data Protection)
```
Scope: Personal data of EU residents

Key Requirements:
- Lawful basis for processing
- Data subject rights (access, deletion, portability)
- Data protection by design
- Privacy notices
- Data breach notification (72 hours)
- Data Protection Officer (for large-scale processing)

Technical Measures:
- Encryption at rest and in transit
- Access controls
- Audit logging
- Data minimization
- Pseudonymization

Documentation:
- Processing activities record
- Privacy impact assessments
- Data retention policies
```

### SOC 2 (Service Organization Control)
```
Scope: Service providers handling customer data

Trust Service Criteria:
1. Security (Common Criteria)
2. Availability
3. Processing Integrity
4. Confidentiality
5. Privacy

Key Controls:
- Access control
- Encryption
- Monitoring
- Incident response
- Change management
- Risk assessment

Types:
- Type I: Point-in-time
- Type II: Period (6-12 months)
```

### HIPAA (US Healthcare)
```
Scope: Protected Health Information (PHI)

Rules:
- Privacy Rule: Use and disclosure
- Security Rule: Technical safeguards
- Breach Notification Rule

Technical Safeguards:
- Access controls
- Audit controls
- Integrity controls
- Transmission security (encryption)
- Authentication

Administrative Safeguards:
- Security officer
- Risk analysis
- Training
- Incident procedures
```

### PCI DSS (Payment Cards)
```
Scope: Credit card data

Requirements (12 total):
1. Firewall configuration
2. Default passwords changed
3. Stored data protection
4. Encryption in transit
5. Anti-virus software
6. Secure systems
7. Need-to-know access
8. Unique user IDs
9. Physical access control
10. Access logging
11. Security testing
12. Information security policy

Compliance Levels:
- Level 1: >6M transactions/year (audit)
- Level 2: 1-6M transactions (self-assessment)
- Level 3: 20K-1M transactions (self-assessment)
- Level 4: <20K transactions (self-assessment)
```

### ISO 27001 (Information Security)
```
Scope: Information Security Management System (ISMS)

Structure:
- 114 controls in Annex A
- Organizational controls
- People controls
- Physical controls
- Technological controls

Implementation:
1. Scope definition
2. Risk assessment
3. Control selection
4. Policy documentation
5. Implementation
6. Internal audit
7. Certification audit
```

## Compliance Checklist Template

### Data Protection
```
- [ ] Data inventory completed
- [ ] Data classification scheme
- [ ] Retention policies defined
- [ ] Deletion procedures documented
- [ ] Encryption implemented
- [ ] Access controls in place
```

### Access Control
```
- [ ] Role-based access implemented
- [ ] Principle of least privilege
- [ ] Multi-factor authentication
- [ ] Access review process
- [ ] Privileged access management
```

### Audit & Monitoring
```
- [ ] Audit logging enabled
- [ ] Log retention defined
- [ ] Monitoring alerts configured
- [ ] Incident response procedures
- [ ] Regular security reviews
```

### Documentation
```
- [ ] Security policies documented
- [ ] Risk assessments completed
- [ ] Processing activities recorded
- [ ] Training records maintained
- [ ] Vendor assessments completed
```

## Cross-Compliance Mapping

```
Control Area          | GDPR | SOC2 | HIPAA | PCI | ISO27001
----------------------|------|------|-------|-----|----------
Access Control        |  ✓   |  ✓   |   ✓   |  ✓  |    ✓
Encryption            |  ✓   |  ✓   |   ✓   |  ✓  |    ✓
Audit Logging         |  ✓   |  ✓   |   ✓   |  ✓  |    ✓
Incident Response     |  ✓   |  ✓   |   ✓   |  ✓  |    ✓
Risk Assessment       |  ✓   |  ✓   |   ✓   |  ✓  |    ✓
Data Minimization     |  ✓   |  -   |   ✓   |  ✓  |    ✓
Vendor Management     |  ✓   |  ✓   |   ✓   |  ✓  |    ✓
Training              |  ✓   |  ✓   |   ✓   |  ✓  |    ✓
```

## Compliance in Architecture

### Data Residency
```
GDPR: EU data in EU (or adequate protection)
China: Data localization required
Russia: Personal data in Russia

Architecture Impact:
- Region-specific deployments
- Data replication controls
- Cross-border transfer mechanisms
```

### Right to Deletion
```
GDPR Article 17: Right to erasure

Implementation:
- Soft delete with retention period
- Hard delete capability
- Backup handling
- Cascade to related systems
- Verification mechanism
```

### Audit Trail Requirements
```
What to log:
- Who (user/service)
- What (action)
- When (timestamp)
- Where (IP, system)
- Result (success/failure)

Retention:
- HIPAA: 6 years
- SOX: 7 years
- PCI: 1 year
- GDPR: As needed for purpose
```

## Compliance Tools

### Assessment Tools
```
- Compliance frameworks (NIST CSF)
- Gap analysis tools
- Risk assessment templates
- Vendor questionnaires (SIG, CAIQ)
```

### Monitoring Tools
```
- SIEM (Security Information & Event Management)
- DLP (Data Loss Prevention)
- Cloud security posture management
- Compliance dashboards
```

### Documentation Tools
```
- GRC platforms (Governance, Risk, Compliance)
- Policy management systems
- Evidence collection tools
- Audit management systems
```
