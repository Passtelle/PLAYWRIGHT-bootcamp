---
name: API testing progress and Day 21 lesson
description: API testing track — Postman manual lab (Day 21) and the bridge to Playwright API automation (Day 22+)
type: project
---

## Where We Are in the API Track

Day 21 Postman lab is **in progress** — stopped mid-Stage 4 (end of session March 25, 2026).
Day 22 is next: translating everything from Postman into Playwright `request` API tests.

## Day 22 Progress (March 26, 2026)
- ✅ Exercise 4.2: POST /users/add → 201 Created (user id 209, Passtelle Bebe)
- ✅ Stage 5.1: Bearer token auth — fixed 401 on GET /auth/me → 200 OK
- ⏳ Stage 5.2: Save token as environment variable (Postman env editor read-only — unresolved)
- ⏳ Stages 6-7: Postman pm.test assertions + collection organization
- ⏳ Resume point: Stage 5.2 then Stages 6 and 7

## Day 22 Other (March 26, 2026)
- Spent ~4 hours debugging Claude Desktop App MSIX install timeout on Windows 11
- Root cause: AddPackage times out after 5 min (likely Defender or Windows App deployment service)
- Partial fix found: CLAUDE_CONFIG_DIR separation to avoid token conflict between Desktop + VS Code instances
- Claude Desktop Code tab error: "sign-in expired" — likely caused by VS Code Claude Code claiming the shared auth token
- Fix to try: $env:CLAUDE_CONFIG_DIR="$HOME\.claude-scripter"; claude in VS Code terminal
- NOTE: Running this command ends the current VS Code Claude Code session

## Day 21 Progress (stopped at Stage 4, Exercise 4.2)
- ✅ Stage 1: GET requests — all users, single user, search with ?q=
- ✅ Stage 2: JSON — flat vs nested, navigating Emily's bank/address data
- ✅ Stage 3: Status codes — triggered 404 (user 99999) and 401 (auth/me no token)
- ✅ Stage 4 partial: POST login — got 200 + accessToken (needs to copy token + do Exercise 4.2)
- ⏳ Stage 4 Exercise 4.2: Create new user (POST /users/add) — expect 201
- ⏳ Stage 5: Headers & Bearer token auth — fix the 401 with accessToken
- ⏳ Stage 6: Writing Postman pm.test assertions
- ⏳ Stage 7: Collections & Environments organization

**Resume point:** Exercise 4.2 — POST {{baseUrl}}/users/add with own name/email/age, expect 201 Created.

## Platform Used
**DummyJSON** (`https://dummyjson.com`) — real auth with Bearer tokens, 208 users, full CRUD.
Originally the lesson was written for ReqRes.in, but it had changed significantly into a backend-as-a-service — no longer a simple mock API. DummyJSON was chosen as the replacement: 500M+ monthly requests, purpose-built for testing, real auth flow. Switch happened Day 21.

## Day 21 Postman Lab Coverage (DAY21_API_POSTMAN_LESSON.md)
- Stage 1: GET requests (all users, single user, search with query params)
- Stage 2: Reading and navigating nested JSON (`{}` vs `[]`)
- Stage 3: Status codes — 200, 201, 400, 401, 403, 404, 500. Deliberately triggered 404 and 401.
- Stage 4: POST requests — Login (get accessToken), Create user (201)
- Stage 5: Headers & Auth — Bearer token, save token as env variable `{{accessToken}}`
- Stage 6: Writing Postman test assertions (status, response time, body, negative tests)
- Stage 7: Organizing into folders (Users / Authentication)

## The Bridge to Day 22 (Playwright API)
The Day 21 lesson ends with a preview — the same login+token flow in Playwright:
```typescript
const loginResponse = await request.post(`${baseUrl}/auth/login`, { data: { username: 'emilys', password: 'emilyspass' } });
const { accessToken } = await loginResponse.json();
const meResponse = await request.get(`${baseUrl}/auth/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
```

## Interview Gold Unlocked by Day 21
- GET vs POST distinction
- What to verify in an API test (status, response time, body, negative paths)
- 401 vs 403 difference (unauthenticated vs unauthorized)
- How to handle Bearer token auth in API tests

**Why:** This track is critical — every QA Architect role in 2026 expects both UI and API testing layers.
