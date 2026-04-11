---
name: Parabank test suite — what has been built
description: All POMs, helpers, tests, and infrastructure built for the Parabank test suite as of Day 19
type: project
---

## Practice Site
`https://parabank.parasoft.com` — legacy Spring MVC Java banking demo app.
Known credentials: username `john`, password `demo` (stored in `.env`).

## Key Discovery: Spring MVC Locators
Parabank uses Spring MVC object binding — form field `name` attributes follow dotted paths:
- `customer.firstName`, `customer.lastName`, `customer.address.street`, etc.
- Login form uses plain `input[name="username"]` and `input[name="password"]`
- `getByLabel()` does NOT work — table-based layout has no `<label for>` associations
- Always use `page.locator('input[name="..."]')` for Parabank form fields

## POMs Built
- `pages/ParabankLoginPage.ts` — `goto()`, `login(username, password)`, `logout()`
- `pages/ParabankRegisterPage.ts` — `goto()`, `register(11 params including confirmPassword)`
- `pages/ParabankOpenAccountPage.ts` — `goto()`, `openAccount(accountType, fromAccountId): Promise<string>`, `getNewAccountId(): Promise<string>`. Uses `AccountType = 'CHECKING' | 'SAVINGS'` union type. Returns new account ID for E2E chaining.

## Helpers
- `helpers/testData.ts` — `generateUserData(): UserData`, `generateUniqueUsername(): string`. Uses `fakerEN_US`. SSN format: `XXX-XX-XXXX`. Phone: raw digits. State: full name.

## Tests Built
- `tests/bootcamp/parabank_register.spec.ts` — 3 tests: happy path, password mismatch, duplicate username. All passing (3/3, 13.8s).
- `tests/bootcamp/parabank_login.spec.ts` — 2 tests: valid login, invalid password. All passing (2/2, 11.1s).

## Infrastructure
- `.env` at root — `PARABANK_USERNAME=john`, `PARABANK_PASSWORD=demo`
- `playwright.config.ts` — loads dotenv at top
- `tsconfig.json` — includes `helpers/**/*`
- `@faker-js/faker` v10.3.0 and `dotenv` installed as devDependencies

## Queued / Next Steps
- E2E test: Register → Login → Open Account → Assert account in overview (uses `getNewAccountId()`)
- `ParabankOpenAccountPage.ts` locators need Gemini verification against live DOM

**Why:** User asked Claude Code to maintain full project context to support the new Gemini instance getting up to speed.
