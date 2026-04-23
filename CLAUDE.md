# QA Automation Standards for this Project

## 1. Coding Style & Types

- **Strict Typing:** ALWAYS use explicit TypeScript types (e.g., ': string', ': Locator', ': Page', ': RegExp').
- **No 'any':** Never use the 'any' type.
- **Async/Await:** All test steps must be async/await.

## 2. Locators & Selectors

### Locator Priority (Gold / Silver / Bronze)

**🥇 Gold — Always prefer these first:**

- `page.getByTestId('data-testid-value')` — built explicitly for automation, never changes for UX reasons
- `page.getByTestId('data-cy-value')` — same idea, Cypress convention also used in some apps

**🥈 Silver — Strong, semantic, use when Gold isn't available:**

- `page.getByRole('button', { name: /login/i })` — accessibility-linked, very stable
- `page.getByLabel('Username')` — tied to the input via `for=` attribute, structural

**🥉 Bronze — Use only when Gold/Silver aren't available:**

- `page.getByPlaceholder('Enter your username')` — disappears when typing, changes with copy edits
- `page.getByText('Submit')` — fragile, copy changes break it

**❌ Avoid unless absolutely necessary:**

- CSS classes (`.btn-primary`, `.input-field`) — change with UI redesigns
- XPath — brittle, unreadable, last resort only
- Generic IDs not meant for testing (`id="div-3"`)

### How to Identify Gold Locators

Open DevTools → inspect the element → look for:

- `data-testid="..."`
- `data-cy="..."`
- `data-qa="..."`

- **Avoid:** Do not use XPath or generic CSS selectors unless absolutely necessary.
- **Lists:** If a locator returns multiple items (like a list of products), use '.first()' or '.nth()' explicitly to handle Strict Mode.

## 3. Robustness & Assertions

- **Case Insensitivity:** For text assertions, ALWAYS use RegExp with the 'i' flag (e.g., /Success/i) instead of exact strings.
- **Variables:** Define all test data (URL, product names, locators) at the top of the test under a 'PLAN' section.

## 4. Test Structure

- Organize every test into 3 clearly commented sections:
  1. // 🏗️ THE PLAN (Data & Variables)
  2. // 🎬 THE WORK (Actions)
  3. // ✅ THE CHECK (Assertions)

## 5. AI Audit & Verification Standards

The Workflow: All AI-generated code (from Claude Code or ChatGPT) MUST be passed to the Primary Judge (Gemini) before the Human Architect approves it.

Flakiness Check: The Judge must verify that no tests rely on hardcoded timeouts (e.g., page.waitForTimeout()). All waits must be state-based (e.g., waiting for an element to be visible).

**Avoid isVisible():** Do not use `isVisible()` for conditional checks as it doesn't wait. Instead use try-catch with `waitFor({ state: 'visible', timeout: X })` for state-based conditional logic.

❌ NEVER use isVisible() for assertions or flow control.
✅ ALWAYS use expect(locator).toBeVisible() or locator.waitFor() to ensure the test handles flaky loading.

## 6. Architect Prompt Template for Claude Code

When prompting Claude Code to generate tests or POMs, use this structured format:

### Template Structure:

```
Claude, create a [type of test] at `[file path]`.

Architecture:
* Import [POM/Component name] from [path]
* [Any other architectural requirements]

Data:
* [URLs, arrays, test data needed]
* [Define data structures]

Logic:
* [Step 1: Setup/Navigation]
* [Step 2: Actions using POM methods]
* [Step 3: Assertions/Verification]

Strictly follow CLAUDE.md standards.
```

### Mapping to Test File Structure:

- **Architecture & Data** → 🏗️ THE PLAN section
- **Logic (Actions)** → 🎬 THE WORK section
- **Logic (Assertions)** → ✅ THE CHECK section
  The Architecture (What files/tools are we using?)
  The Data (What variables, URLs, or arrays are we passing in?)
  The Logic (What are the physical steps and the final assertions?)

### Example Architect Prompt:

```
Claude, create a data-driven test at `tests/bootcamp/day9_login_invalid_users.spec.ts`.

Architecture:
* Import LoginPage from ../../pages/LoginPage.ts

Data:
* Array invalidEmails: ['alice@test.com', 'bob@test.com', 'charlie@test.com']
* URL: https://ecommerce-playground.lambdatest.io/index.php?route=account/login
* Password: 'wrongpass123'

Logic:
* Navigate to login URL
* Instantiate LoginPage class
* Loop through invalidEmails array
* For each email: use login() method with email and password
* For each attempt: assert error message contains "Warning"

Strictly follow CLAUDE.md standards.
```

### Why This Structure Works:

1. **Clear separation of concerns** - Architecture, Data, Logic
2. **Maps directly to test file structure** - Makes review easier
3. **Forces architectural thinking** - Plan before execution
4. **Consistent across team** - Anyone can write prompts this way
5. **AI understands better** - Structured input = better output

## 7. Page Object Model (POM) Rules

### Separation of Concerns

- **POMs perform actions and return data** - No `expect()` statements allowed
- **Tests make decisions and verify results** - All assertions belong in test files

### POM Methods Must Be Strict

- Methods do exactly what they're told, nothing more
- No conditional logic like "click if exists"
- If an element doesn't exist, the test should FAIL LOUDLY
- Let tests handle decision-making, not POMs

### Method Parameters Must Be Fully Explicit

- **Never use optional defaults** to hide related fields (e.g., `confirmPassword: string = password`)
- **Always require every parameter** so the test's intent is fully visible at the call site
- A QA test must declare all inputs explicitly — convenience shortcuts hide information and block negative testing

**❌ BAD - Optional default hides the confirm value:**

```typescript
async register(password: string, confirmPassword: string = password): Promise<void>
```

**✅ GOOD - Both values required, intent is always visible:**

```typescript
async register(password: string, confirmPassword: string): Promise<void>
// Happy path:  register('SecurePass1!', 'SecurePass1!')
// Negative:    register('SecurePass1!', 'WrongPass999')
```

### Good vs Bad Examples

**❌ BAD - Assertion in POM:**

```typescript
async clickBuyNow(): Promise<void> {
  await this.buyNowButton.click();
  await expect(this.successNotification).toBeVisible(); // WRONG!
}
```

**✅ GOOD - POM returns locator, test asserts:**

```typescript
// In POM:
async clickBuyNow(): Promise<void> {
  await this.buyNowButton.click();
}

// In Test:
await productPage.clickBuyNow();
await expect(productPage.successNotification).toBeVisible(); // Correct!
```

### Use RegEx for Resilient Locators

When creating POM locators, prefer RegEx patterns for case-insensitive, flexible matching:

```typescript
// ✅ Good - case insensitive:
this.buyNowButton = page.getByRole("button", { name: /buy now/i });

// ❌ Less resilient - exact match:
this.buyNowButton = page.getByRole("button", { name: "BUY NOW" });
```

## 8. Strict Prompt Templates (Established Day 10)

These templates were created with Gemini and must be followed exactly for all future POMs and test files.

### Template for POM Files:

Strict POM: All interactions in 🎬 THE WORK must exclusively use locators defined in 🏗️ THE PLAN. No ad-hoc string selectors are allowed inside methods

```
Section 8 will be UPDATED with:
POM Prompt Template (EXPLICIT - Production Standard)
Use this template for ALL Page Object Models:
Claude, create a Page Object Model at `pages/[PageName].ts`.

Architecture:
* Import `Locator` and `Page` from `@playwright/test`.

Data:
* Create a locator for `[locatorName]` using `getByTestId('[testId]')`.
* Create a locator for `[locatorName]` using `getByRole('[role]', { name: '[text]' })`.
* Create a locator for `[locatorName]` using `getByPlaceholder('[placeholder]')`.
* [One line per locator - be EXPLICIT about the Playwright method]

Logic:
* Create a method called `[methodName](param: type, param: type)` that [exact action].
* [One line per method - include parameter types]

Constraints:
* Strictly follow CLAUDE.md standards.
* Use `readonly` for locators.
* Use explicit TypeScript return types (e.g., `Promise<void>`).
* No assertions (`expect`) in this file.
Key Rules:

ALWAYS specify the exact Playwright method: getByTestId, getByRole, getByPlaceholder, etc.
ALWAYS include parameter types in method signatures
ALWAYS specify return types (Promise<void>)
NO vague language like "looks for" or "finds"
* Include the `// 🏗️ THE PLAN`, `// 🎬 THE WORK`, and `// ✅ THE CHECK` comments.
---
### Practice Sites (Updated Day 21):

**Two-app stack — chosen Day 20/21:**

**UI Testing → QA Playground Bank Demo** (`qaplayground.com`)
- Full banking simulation: login, accounts, dashboard, transactions
- Built on Next.js — modern, semantic HTML, proper labels
- `getByRole`, `getByLabel`, `getByPlaceholder` all work correctly
- 22+ UI elements designed for Playwright practice

**API Testing → DummyJSON** (`https://dummyjson.com`)
- Real auth with Bearer tokens, 208 users, full CRUD, search, pagination
- Purpose-built for testing — 500M+ monthly requests
- Same patterns used at every enterprise company

**Legacy (retired for active use, kept for interview narrative):**
- `practicesoftwaretesting.com` — Angular e-commerce (Days 10-13)
- `automationintesting.online` — React booking SPA (Days 14-15)
- `parabank.parasoft.com` — Legacy Spring MVC banking (Days 17-20) — lessons preserved in QA_AUDIT_LESSONS.md

## 9. Claude Code Workflow Model

Claude Code is treated as a **Senior Developer** on the team, not a junior code generator.

**The Three-Role Model:**

1. **You (Human Architect/PM):**
   - Define high-level requirements and architecture
   - Specify constraints and standards (reference CLAUDE.md)
   - Make final decisions on design approach
   - Act as code reviewer and quality gate

2. **Claude Code (Senior Developer):**
   - Explores solutions and design options
   - Implements code following specified standards
   - Generates production-ready files
   - Self-corrects based on feedback

3. **Gemini (Master Judge/Auditor):**
   - Audits code against CLAUDE.md standards
   - Provides strategic architectural guidance
   - Acts as quality gate before human approval

**How to Prompt Claude Code:**

Use high-level requirements, not micro-instructions:

**✅ Good (Architect → Senior Dev):**
```

Claude, create a ContactPage POM with name, email, phone, subject, message fields and submit button.
Use getByPlaceholder for inputs, getByRole for button.
Follow CLAUDE.md standards.

```

**❌ Bad (Micromanaging):**
```

Claude, on line 5 type "readonly nameInput: Locator;" then on line 6 type...

````

**Trust Claude Code to:**
- Choose appropriate variable names
- Structure code logically
- Handle import paths
- Apply CLAUDE.md standards automatically

**Your Job:**
- Define WHAT to build
- Specify architectural constraints
- Review and approve output

**Claude Code's Job:**
- Design HOW to build it
- Generate clean, standard-compliant code
- Self-document with clear naming

## 10. Platform-Specific Configurations

### Windows Development Notes

**MCP Server Setup (Windows):**

**Windows Execution Rule:**
- **Terminal commands:** Standard `npx` works fine (Windows uses `PATHEXT` to auto-resolve)
- **JSON config files:** Always use `npx.cmd` when defining commands in `.mcp.json` or spawning background processes
- **Why:** Applications spawning processes don't use terminal - they talk directly to Windows OS, which requires exact file names

**Package Compatibility:**
- Official `@modelcontextprotocol/server-sqlite` has Windows binary issues (404 errors)
- Alternative: `@pollinations/mcp-server-sqlite` (Node-native, cross-platform compatible)

### Claude Desktop + VS Code Token Conflict (Windows — Known Issue)

**The Problem:**
Claude Code CLI (VS Code) and Claude Desktop share the same `~/.claude` config directory by default. They fight over the same OAuth token. VS Code claims it first → Desktop app finds it "expired" → Code tab throws:
`"Unable to start session: account information is unavailable because your sign-in has expired"`

**Also:** Claude Desktop MSIX installer times out on Windows 11 (`AddPackage timed out after 5 minutes`). Likely caused by Windows Defender scanning the 176MB package during install. Workaround: disable real-time protection before installing.

**The Fix — Separate config directories:**

In VS Code terminal (PowerShell), give Claude Code its own isolated config:
```powershell
$env:CLAUDE_CONFIG_DIR="$HOME\.claude-scripter"; claude
````

This separates the auth tokens — Desktop keeps its own, VS Code gets its own.
You'll be asked to log in again for the VS Code instance — that's expected.

**To make it permanent** (so you don't set it every session), add to PowerShell profile:

```powershell
notepad $PROFILE
# Add this line: $env:CLAUDE_CONFIG_DIR="$HOME\.claude-scripter"
```

**To UNDO everything if it doesn't work:**

```powershell
# Remove the separate config directory
Remove-Item "$HOME\.claude-scripter" -Recurse -Force -ErrorAction SilentlyContinue

# Clear the environment variable for this session
Remove-Item Env:\CLAUDE_CONFIG_DIR -ErrorAction SilentlyContinue
```

If you made it permanent in the profile, open `notepad $PROFILE` and delete the `CLAUDE_CONFIG_DIR` line.
Nothing is permanent — no risk to PC, repo, or existing Claude setup.

**Note:** Running the CLAUDE_CONFIG_DIR command ends the current VS Code Claude Code session. New instance starts fresh but reads all memory files.

### Multi-Agent Workflow (Planned — not yet active)

**The Two-Instance Model:**

1. **Claude Code Desktop (Teacher/Auditor)** — builds lessons, tests student, updates docs, audits scripts
2. **Claude Code VS Code (Senior Dev/Builder)** — generates scripts, runs tests, sees results

Both instances share the same repo files — that's the communication channel.

**Experimental Agent Teams (Windows PowerShell):**

```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"
```

Enables direct agent-to-agent communication between Claude Code instances.

**When activating the Teacher instance**, provide this context:

- Read `CLAUDE.md` for all standards
- Read `MEMORY.md` and all memory files for full project context
- Read `MASTER_PLAN.md` for where we are in the bootcamp
- Read `QA_AUDIT_LESSONS.md` for lessons already learned
- Read `INTERVIEW_PRACTICE.md` for interview prep history
