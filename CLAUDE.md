# QA Automation Standards for this Project

## 1. Coding Style & Types
- **Strict Typing:** ALWAYS use explicit TypeScript types (e.g., ': string', ': Locator', ': Page', ': RegExp').
- **No 'any':** Never use the 'any' type.
- **Async/Await:** All test steps must be async/await.

## 2. Locators & Selectors
- **Priority:** Always use 'page.getByRole()' or 'page.getByPlaceholder()' first.
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
