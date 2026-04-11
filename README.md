# AI-Driven QA Architect Bootcamp

**Author:** Ingrid | Senior QA Engineer → QA Architect
**Duration:** 10 weeks | 8–10 hours/day
**Stack:** Playwright · TypeScript · Postman · GitHub Actions · Claude Code
**Status:** 🟢 Active — Week 4 (API Testing)

---

## About This Repository

This repository documents my journey from Senior QA Engineer (15 years at IBM and Fiserv) to modern **AI-Driven QA Architect** — rebuilt from the ground up using Playwright, TypeScript, and AI-assisted workflows.

After a 10-year career gap, I returned to tech and built this bootcamp myself with the help of an AI team. Every commit is real work. Every test reflects a real concept learned and applied.

This is not a tutorial clone. This is a working portfolio.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright 1.58.1 | UI and API test automation |
| TypeScript (strict mode) | Type-safe test architecture |
| Faker.js | Dynamic test data generation |
| Postman + DummyJSON | API testing manual layer |
| dotenv | Secure credentials management |
| GitHub Actions | CI/CD pipeline (Week 5) |
| Claude Code | AI-assisted development and auditing |

---

## Repository Structure

```
├── pages/                    # Page Object Models (POM)
│   ├── LoginPage.ts
│   ├── ParabankLoginPage.ts
│   ├── ParabankRegisterPage.ts
│   ├── ParabankOpenAccountPage.ts
│   ├── ProductPage.ts
│   ├── BookingPage.ts
│   └── ...
│
├── tests/bootcamp/           # Test suite (Day 1 → present)
│   ├── day1_register.spec.ts
│   ├── day2_loop_users.spec.ts
│   ├── day3_search_products.spec.ts
│   ├── ...
│   ├── day16_master_booking.spec.ts
│   ├── parabank_login.spec.ts
│   └── parabank_register.spec.ts
│
├── helpers/
│   └── testData.ts           # Faker.js data factory
│
├── memory/                   # AI team knowledge base
│   ├── MEMORY.md
│   └── *.md
│
├── CLAUDE.md                 # Coding standards enforced on every file
├── MASTER_PLAN.md            # Full bootcamp roadmap
├── QA_AUDIT_LESSONS.md       # 15 real lessons caught during AI auditing
├── INTERVIEW_PRACTICE.md     # 9 interview prep sessions
└── playwright.config.ts
```

---

## Bootcamp Progress

### Week 1 — Foundation ✅
- Playwright + TypeScript setup
- Async/await mental model
- Locators: `getByRole`, `getByPlaceholder`, `getByLabel`
- First loop-driven test (data-driven pattern)
- Git fundamentals for QA professionals

### Week 2 — Playwright Architecture ✅
- Page Object Model (POM) from scratch
- Fixtures and test hooks (`beforeEach`, `afterEach`)
- AI-generated test auditing workflow
- Multi-site test coverage: ecommerce, booking, banking apps

### Week 3 — AI Prompt Engineering + Parabank ✅
- Structured prompt templates for test generation (CLAUDE.md)
- MCP Server setup (SQLite, filesystem tools)
- Three-role AI team: Human Architect + Claude Code + Gemini Judge
- Parabank banking app: login, registration, account management POMs
- Faker.js data factory — eliminated hardcoded test data
- Production-quality 3-test registration suite (happy/negative/edge)

### Week 4 — API Testing ✅ (in progress)
- Postman manual lab: GET, POST, Bearer token auth, status codes
- DummyJSON platform: 208 users, real auth flow, full CRUD
- 9 interview sessions covering full 4-layer API testing answer
- Pancake Rule: isolated `pm.test` blocks, never nested
- Next: Playwright API automation (translating Postman → TypeScript)

### Week 5 — CI/CD with GitHub Actions ⏳
### Week 6 — Advanced Patterns + LinkedIn Automation ⏳
### Week 7 — Performance + Accessibility Testing ⏳
### Week 8 — ISTQB Foundation Exam Prep ⏳
### Week 9–10 — Job Applications (5/day) ⏳

---

## Key Patterns Implemented

### Page Object Model (POM)
All UI interactions are encapsulated in POM classes. Tests never contain raw selectors.

```typescript
// pages/ParabankLoginPage.ts
export class ParabankLoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.usernameInput = page.getByPlaceholder(/username/i);
    this.passwordInput = page.getByPlaceholder(/password/i);
    this.loginButton = page.getByRole('button', { name: /log in/i });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Data Factory Pattern (Faker.js)
No hardcoded test data. Every test run generates fresh, unique users.

```typescript
// helpers/testData.ts
export function generateUser(): UserData {
  return {
    username: `user_${Date.now()}`,
    password: 'SecurePass1!',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    ssn: faker.string.numeric(9),
    phone: faker.phone.number()
  };
}
```

### Test Structure Standard
Every test follows a consistent 3-section structure:

```typescript
test('register new user - happy path', async ({ page }) => {
  // 🏗️ THE PLAN — data and variables
  const user = generateUser();
  const registerPage = new ParabankRegisterPage(page);

  // 🎬 THE WORK — actions
  await page.goto(URL);
  await registerPage.register(user);

  // ✅ THE CHECK — assertions
  await expect(page.getByText(/your account was created/i)).toBeVisible();
});
```

---

## Coding Standards

All code in this repository follows strict standards documented in [`CLAUDE.md`](./CLAUDE.md):

- **No `any` type** — explicit TypeScript types everywhere
- **No hardcoded timeouts** — state-based waits only
- **No assertions in POMs** — POMs act, tests assert
- **RegExp with `/i` flag** for all text assertions
- **Explicit method parameters** — no optional defaults hiding intent
- **`getByRole` / `getByPlaceholder` first** — no XPath, no generic CSS

---

## AI Audit System

Every AI-generated file is audited before approval using a three-role model:

1. **Human Architect (me)** — defines requirements, reviews output, approves
2. **Claude Code** — implements code following CLAUDE.md standards
3. **Gemini** — independent auditor, flags violations before human approval

15 real lessons learned from this process are documented in [`QA_AUDIT_LESSONS.md`](./QA_AUDIT_LESSONS.md).

---

## Interview Preparation

9 structured interview sessions documented in [`INTERVIEW_PRACTICE.md`](./INTERVIEW_PRACTICE.md), covering:

- Data Factory Pattern and parallel execution
- API testing: GET vs POST, status codes, Bearer token auth
- 401 vs 403, idempotency, contract testing
- The complete 4-layer API testing answer
- ISTQB vocabulary: error/defect/failure, verification/validation, BVA

---

## About the Author

Senior QA Engineer with 15 years of experience at IBM and Fiserv, specializing in enterprise software quality across financial services. Returning to tech with a focus on modern AI-driven automation architecture.

**Background:** Manual QA → Test automation → AI-assisted QA architecture
**Target:** QA Architect role combining 15 years of QA instinct with modern tooling
**Interested in:** Fintech · Blockchain/Web3 QA · AI-driven testing workflows

---

*Built with Playwright, TypeScript, and a lot of coffee. ☕*
