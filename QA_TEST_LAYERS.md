# QA Test Layers — What Needs to Be Tested

**Student:** Senior QA Engineer (IBM/Fiserv veteran)
**Purpose:** A reference for every feature or API endpoint — the 4 layers of test coverage a QA Architect thinks through.

---

## The 4 Layers of API Testing

For every endpoint, run through all 4 layers. Not every layer applies every time — but you must consciously decide to skip one, not accidentally miss it.

---

### Layer 1: Happy Path
> "Does it work when I use it correctly?"

- Send valid, complete data
- Expect the correct success status code (200 or 201)
- Verify the response body contains what you sent
- Verify any nested objects are correctly structured

**Example:**
```
POST /users/add  →  valid name + email + age  →  201  →  id assigned, fields match
```

---

### Layer 2: Negative Tests
> "Does it fail correctly when I use it wrong?"

- Missing required fields → expect 400 Bad Request
- Wrong data type (string where number expected) → expect 400
- Invalid email format → expect 400
- Wrong credentials (login) → expect 401
- Non-existent resource → expect 404

**The QA principle:** A system that fails silently is more dangerous than one that fails loudly. Always verify the right error code AND a meaningful error message.

**Example:**
```
POST /auth/login  →  wrong password  →  401  →  body has "message" field
GET /users/99999  →  non-existent    →  404  →  body has "message" field
```

---

### Layer 3: Boundary Tests
> "What happens at the edges of what's allowed?"

- Minimum value (age = 0, age = 1)
- Maximum value (age = 150, firstName = 1000 characters)
- Empty string vs null vs missing field — are they treated the same?
- Exactly at the limit vs one over the limit

**Why this matters:** Most bugs live at the boundaries, not in the middle. A field that accepts 255 characters often crashes at 256.

**Example:**
```
POST /users/add  →  firstName = ""         →  400 or 201? (what does the API decide?)
POST /users/add  →  age = -1               →  400 or does it accept negative age?
POST /users/add  →  firstName = "A" x 1000 →  400 or truncated or accepted?
```

---

### Layer 4: Security Tests
> "Can the system be abused?"

- **Privilege escalation:** Can a regular user set `"role": "admin"` on themselves?
- **Injection:** What happens with `"<script>alert(1)</script>"` as a name? (XSS)
- **Auth bypass:** Can you access protected endpoints without a token?
- **Token abuse:** Can you use an expired token? A malformed one?
- **Mass assignment:** Can you set fields that should be server-controlled (id, role, createdAt)?

**Your IBM background applies here.** Security testing is a whole category most QA Engineers skip — you don't.

**Example:**
```
POST /users/add  →  "role": "admin"                    →  should be ignored by server
GET /auth/me     →  Authorization: Bearer expired_token →  should return 401
GET /auth/me     →  no Authorization header             →  should return 401, not 500
```

---

## The QA Mindset for APIs

```
Happy path   = "Does it work?"
Negative     = "Does it fail correctly?"
Boundary     = "Does it hold up at the edges?"
Security     = "Can it be abused?"
```

A junior tester covers Layer 1.
A good tester covers Layers 1 and 2.
A QA Architect covers all 4 — and documents which ones were skipped and why.

---

## For UI Testing — Same 4 Layers Apply

| API Layer | UI Equivalent |
|-----------|--------------|
| Happy path | Fill form correctly, submit, see success |
| Negative | Submit empty form, wrong format, see error messages |
| Boundary | Paste 1000 chars in a name field, submit |
| Security | Try XSS in input fields, test role-based page access |

---

## Quick Reference — Status Codes to Expect by Layer

| Layer | Expected Codes |
|-------|---------------|
| Happy path | 200, 201 |
| Negative | 400, 401, 403, 404 |
| Boundary | 400, 413 (payload too large) |
| Security | 401, 403, 400 — never 500 (500 = server broke, that's a bug) |

> **Interview gold:** "A 500 on a negative test is itself a bug — the server should never crash on bad input, it should reject it gracefully."

---

**Last Updated:** Day 22 (March 26, 2026)
