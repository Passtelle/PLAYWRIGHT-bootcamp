# QA Automation Portfolio

[![Playwright Tests](https://github.com/Passtelle/PLAYWRIGHT-bootcamp/actions/workflows/playwright.yml/badge.svg)](https://github.com/Passtelle/PLAYWRIGHT-bootcamp/actions/workflows/playwright.yml)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ingridbordin)

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Claude Code](https://img.shields.io/badge/Claude_Code-D4A574?style=for-the-badge&logo=anthropic&logoColor=white)
![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=github&logoColor=white)

> 13+ years at IBM Security & Fiserv — enterprise QA instinct, rebuilt with a modern AI-first automation stack.

---

## What This Project Demonstrates

| Skill | How It's Demonstrated |
|-------|----------------------|
| **E2E Test Automation** | SecureBank banking flow: login → deposit → balance verified in CI |
| **API Testing** | DummyJSON: 4 layers (happy / negative / boundary / security) in Postman + Playwright TypeScript |
| **CI/CD Pipeline** | GitHub Actions: push → test → JUnit XML → Xray upload → Jira updated automatically |
| **Page Object Model** | 17 POMs across banking, e-commerce, booking, and API test apps |
| **AI-Augmented QA** | Claude Code + Gemini Judge + GitHub Copilot multi-agent orchestration |
| **Test Management** | Jira/Xray: Gherkin BDD test cases linked to live CI executions |
| **Security Testing Mindset** | SQL injection, boundary analysis, auth token validation in API suite |

---

## Portfolio Centerpiece — SecureBank E2E Suite

Full end-to-end banking flow running automatically on every push:

```
Push to GitHub
     ↓
GitHub Actions triggers
     ↓
Playwright runs SecureBank E2E (login → deposit → balance verified)
     ↓
JUnit XML generated
     ↓
Xray API upload → Test Execution auto-created in Jira BAS project
```

**3 Page Object Models built for this suite:**

```
pages/
├── SecureBankLoginPage.ts       → All Gold locators (data-testid)
├── SecureBankDashboardPage.ts   → Reads live balance and account stats
└── SecureBankTransactionPage.ts → Handles Radix UI comboboxes (click + getByRole)
```

Key technical decisions:
- Radix UI custom dropdowns require `.click()` then `getByRole('option')` — not `selectOption()`
- Dynamic account IDs fixed with `selectOption({ label: /Primary Savings/ })` — RegExp partial match stable after every deposit
- Client-side SPA navigation used for balance check — preserves React state vs hard reload

---

## Test Suites

### UI Testing — SecureBank Banking App

| Test | Type | Status |
|------|------|--------|
| Login + deposit updates total balance | E2E Happy Path | ✅ Passing in CI |

**Site:** [qaplayground.com/bank](https://www.qaplayground.com/bank) — Next.js banking simulation with real `data-testid` attributes throughout.

### API Testing — DummyJSON

| Test File | Layer | What It Covers |
|-----------|-------|----------------|
| `BAS-4-auth-happy-path.spec.ts` | Happy Path | POST /auth/login → 200 + accessToken |
| `BAS-9-auth-missing-password.spec.ts` | Negative | Empty password → 400 |
| `BAS-10-auth-boundary-username.spec.ts` | Boundary | 128-char username via `'a'.repeat(128)` |
| `BAS-6-auth-sql-injection.spec.ts` | Security | SQL injection → no auth bypass, no 500 error |

All 4 layers covered: Happy Path → Negative → Boundary → Security. Designed to mirror the enterprise API coverage approach used at IBM and Fiserv.

---

## CI/CD Pipeline

Every push to `main` triggers the full pipeline:

```yaml
on: push (main)
  → npm ci
  → npx playwright install --with-deps
  → Run SecureBank E2E (Chromium)
  → Generate JUnit XML report
  → Upload results to Xray Cloud API
  → Test Execution auto-created in Jira BAS project
```

Credentials managed via GitHub Secrets — never exposed in source code.

---

## Tech Stack

| Category | Tools |
|----------|-------|
| **Test Automation** | Playwright 1.58.1, TypeScript (strict mode) |
| **API Testing** | Postman, DummyJSON, Playwright `request` fixture |
| **Test Data** | Faker.js — dynamic data, never hardcoded |
| **CI/CD** | GitHub Actions |
| **Test Management** | Jira, Xray (BDD/Gherkin + JUnit XML import) |
| **AI Tools** | Claude Code, GitHub Copilot, Gemini (Judge LLM) |
| **Security** | dotenv — credentials always in secrets vault |

---

## Coding Standards

All code follows strict standards documented in [`CLAUDE.md`](./CLAUDE.md):

- **No `any` type** — explicit TypeScript types everywhere
- **No hardcoded timeouts** — state-based waits only (`waitFor`, `toBeVisible`)
- **No assertions in POMs** — POMs act, tests assert
- **Locator priority** — Gold (`data-testid`) > Silver (`getByRole`) > Bronze (`getByPlaceholder`)
- **RegExp with `/i` flag** for all text assertions — never exact string matching
- **Explicit method parameters** — no optional defaults hiding test intent
- **3-section test structure** — `// THE PLAN / THE WORK / THE CHECK`

Every AI-generated file passes a three-role audit before merge:
1. **Claude Code** — implements following CLAUDE.md standards
2. **Gemini** — independent auditor, flags violations
3. **Human Architect** — final approval

15 real audit lessons documented in [`QA_AUDIT_LESSONS.md`](./QA_AUDIT_LESSONS.md).

---

## About the Author

I spent 13+ years testing complex applications at **IBM Internet Security Systems** and **Fiserv**: antivirus engines, IDS/IPS systems, firewalls, and financial web platforms. I led offshore QA teams, built test departments from scratch, and performed penetration testing on financial applications using Metasploit.

After a career break, I returned with one goal: become the kind of QA engineer that modern FinTech teams actually need. I spent several months building this portfolio, 8 to 10 hours a day, using an AI-first workflow I strongly believe represents where the industry is heading.

During my break I also built **DigitPilot**, an AI-powered crypto trading education and simulation platform ([digitpilot.io](https://digitpilot.io)), designed in Figma and prototyped using Claude, Gemini, and Vercel. It reflects both 3 years of active crypto trading experience and a deep interest in FinTech and blockchain QA.

**What I bring:**
- Enterprise security and financial QA instinct (IBM + Fiserv)
- Modern automation stack: Playwright, TypeScript, CI/CD, Jira/Xray
- AI-first testing approach: directing AI tools, auditing AI-generated code, Judge LLM strategies
- Domain knowledge: FinTech, cybersecurity, crypto/blockchain
- Bilingual: English and French

**Looking for:** Senior QA Engineer at a FinTech or blockchain startup.

[![LinkedIn](https://img.shields.io/badge/Connect_on_LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ingridbordin)

---

*Built with Playwright, TypeScript, Claude Code, and a lot of determination. Every commit is real work.*
