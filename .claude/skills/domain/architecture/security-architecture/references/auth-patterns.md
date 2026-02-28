# Authentication & Authorization Patterns

## Authentication Patterns

### Session-Based Auth
```
┌─────────┐                      ┌─────────┐
│  Client │──── Login ──────────▶│ Server  │
│         │                      │         │
│         │◀─── Set-Cookie ──────│         │
│         │    (session_id)      │         │
│         │                      │         │
│         │──── Request + ──────▶│         │
│         │    Cookie            │         │
│         │                      │         │
│         │◀─── Response ────────│         │
└─────────┘                      └─────────┘

Pros: Simple, server-controlled
Cons: Server state, scaling challenges
```

### Token-Based Auth (JWT)
```
┌─────────┐                      ┌─────────┐
│  Client │──── Login ──────────▶│  Auth   │
│         │                      │ Server  │
│         │◀─── JWT Token ───────│         │
│         │                      └─────────┘
│         │
│         │──── Request + ──────▶┌─────────┐
│         │    Bearer Token      │   API   │
│         │                      │ Server  │
│         │◀─── Response ────────│         │
└─────────┘                      └─────────┘

Pros: Stateless, scalable
Cons: Token revocation complex
```

### OAuth 2.0 Flows

#### Authorization Code Flow (Web Apps)
```
1. User → App: Click "Login with Google"
2. App → User: Redirect to Google
3. User → Google: Authenticate
4. Google → User: Redirect with auth code
5. User → App: Auth code
6. App → Google: Exchange code for token
7. Google → App: Access token + Refresh token
8. App → API: Request with token
```

#### PKCE Flow (Mobile/SPA)
```
Adds code_verifier to Authorization Code:
1. Generate code_verifier (random string)
2. Create code_challenge = SHA256(verifier)
3. Send challenge with auth request
4. Exchange code + verifier for token
5. Server verifies challenge matches
```

#### Client Credentials Flow (Service-to-Service)
```
┌─────────────┐                    ┌─────────────┐
│   Service   │─── client_id/secret─▶│    Auth    │
│     A       │                      │   Server   │
│             │◀──── access_token ───│            │
│             │                      └─────────────┘
│             │
│             │──── Request + ──────▶┌─────────────┐
│             │    Bearer Token      │   Service   │
│             │                      │      B      │
└─────────────┘                      └─────────────┘
```

### OIDC (OpenID Connect)
```
Adds identity layer to OAuth 2.0:

Standard Claims:
- sub: Subject (user ID)
- name: Full name
- email: Email address
- picture: Profile picture

ID Token (JWT):
{
  "iss": "https://auth.example.com",
  "sub": "user123",
  "aud": "client_id",
  "exp": 1234567890,
  "iat": 1234560000,
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Authorization Patterns

### Role-Based Access Control (RBAC)
```
┌─────────┐     ┌─────────┐     ┌─────────────┐
│  User   │────▶│  Role   │────▶│ Permission  │
└─────────┘     └─────────┘     └─────────────┘

Example:
User: alice
Roles: [admin, developer]
Permissions:
  admin → [users:read, users:write, system:config]
  developer → [code:read, code:write, deploy:staging]

Implementation:
def check_permission(user, action, resource):
    for role in user.roles:
        if action in role.permissions:
            return True
    return False
```

### Attribute-Based Access Control (ABAC)
```
Policy-based authorization:

Policy:
ALLOW IF user.department == resource.department
      AND user.clearance >= resource.classification

Attributes:
- User: department, clearance, role
- Resource: department, classification, owner
- Environment: time, location, device

Implementation:
def evaluate_policy(user, resource, action, env):
    policy = get_policy(action, resource.type)
    return policy.evaluate(user, resource, env)
```

### Resource-Based Authorization
```
Check access to specific resource:

def can_access_document(user, document):
    if user.is_admin:
        return True
    if document.owner_id == user.id:
        return True
    if user.id in document.shared_with:
        return True
    return False
```

## Best Practices

### Password Storage
```
✅ Use strong hashing:
- bcrypt (cost factor 12+)
- argon2id (preferred)
- scrypt

❌ Never use:
- MD5, SHA1 (broken)
- Plain text
- Reversible encryption
```

### Session Management
```
- Generate cryptographically random session IDs
- Set secure cookie flags: HttpOnly, Secure, SameSite
- Implement session timeout
- Regenerate session after login
- Store minimal session data
```

### Token Security
```
JWT Best Practices:
- Short expiration (15-60 min)
- Use refresh tokens for longer sessions
- Validate signature on every request
- Check all claims (iss, aud, exp, iat)
- Implement token revocation list
- Don't store sensitive data in JWT
```

### MFA Implementation
```
Factors:
1. Something you know (password)
2. Something you have (phone, token)
3. Something you are (biometric)

Common Methods:
- TOTP (Time-based OTP)
- SMS OTP (less secure)
- Push notifications
- Hardware keys (YubiKey)

Implementation:
- Require MFA for sensitive operations
- Offer backup codes
- Handle device loss gracefully
```
