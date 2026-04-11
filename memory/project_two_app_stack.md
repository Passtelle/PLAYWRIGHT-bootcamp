---
name: Two-app stack decision — moving beyond Parabank
description: The strategic pivot from Parabank to a modern two-app stack for UI + API testing
type: project
---

## The Decision (Day 21, March 25 2026)

User recognized Parabank is a 20-year-old legacy app and moving forward on it was slowing the journey down. Claude confirmed the concern was valid and recommended a two-app stack going forward.

**Why:** Modern QA Architect roles require modern tooling. Parabank's table-based layout, missing semantic HTML, and Spring MVC structure don't reflect what candidates will face in 2025-2026 interviews.

## The Two-App Stack

### UI Testing → QA Playground Bank Demo
- URL: `qaplayground.com`
- Full banking simulation: login, accounts, dashboard, transactions
- Built on Next.js — modern, semantic HTML, proper labels
- `getByRole`, `getByLabel`, `getByPlaceholder` all work correctly
- 22+ UI elements designed specifically for Playwright practice
- Free, no login required

### API Testing → DummyJSON
- URL: `https://dummyjson.com`
- Real auth with Bearer tokens, 208 users, full CRUD, search, pagination
- Originally Claude recommended ReqRes.in, but it had changed into a paid BaaS — DummyJSON was chosen as the replacement

## What We Keep From Parabank

Don't discard it — flip the narrative:
> "I automated both a modern Next.js banking app AND a legacy Spring MVC system — which taught me why locator strategy matters across different technology stacks."

That's a Senior QA Architect answer. The legacy lessons (Spring MVC locators, table layouts, dotted `name` attributes) are preserved in QA_AUDIT_LESSONS.md as interview gold.

## The API Lesson Sequence
1. Original lesson written targeting Parabank API endpoints
2. Pivoted to ReqRes.in (recommended for modern REST practice)
3. ReqRes.in discovered to have changed significantly (now a paid BaaS)
4. DummyJSON chosen — 500M+ monthly requests, purpose-built for testing

**How to apply:** All future UI test work targets QA Playground. All API test work targets DummyJSON. POMs, helpers, and test patterns all transfer — only URLs and locators change.
