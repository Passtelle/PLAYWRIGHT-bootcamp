# 🎤 Interview Prep Vault

**Bootcamp:** AI-Driven QA Architect Training  
**Purpose:** Master technical interview answers for 2026 QA roles

---

## 📋 Table of Contents

1. [Async/Await Questions](#asyncawait-questions)
2. [TypeScript & Type Safety](#typescript--type-safety)
3. [Playwright Architecture](#playwright-architecture)
4. [Page Object Model](#page-object-model)
5. [API Testing](#api-testing)
6. [AI/ML Testing](#aiml-testing)
7. [CI/CD & DevOps](#cicd--devops)
8. [Behavioral Questions](#behavioral-questions)
9. [Red Flags to Avoid](#red-flags-to-avoid)

---

## Async/Await Questions

### **Q1: What's the difference between `async` and `await`?**

**❌ Bad Answer (Fails Interview):**

> "Await makes the script wait for the page to load."

**✅ Good Answer (Passes):**

> "In Playwright, every browser action returns a Promise. `async` marks the function as capable of handling promises. `await` pauses execution until a specific promise resolves. Without `await`, JavaScript would fire all commands simultaneously without waiting for completion, causing race conditions."

**⭐ Great Answer (Gets You Hired):**

> "Async/await is JavaScript's way of handling asynchronous operations synchronously. In testing, this is critical because browser actions aren't instant—clicking a button might trigger network calls, animations, or DOM updates. `await` ensures each step completes before the next begins, preventing flaky tests caused by timing issues. It's essentially a more readable alternative to chaining `.then()` callbacks."

**Why This Matters:**

- Shows you understand concurrency
- Demonstrates awareness of flaky test causes
- Proves you know modern JavaScript patterns

---

### **Q2: What happens if you forget `await` in Playwright?**

**✅ Good Answer:**

> "The test will likely fail because JavaScript won't wait for the action to complete. For example, if I forget `await` on `page.goto()`, the next line might try to interact with elements before the page loads, causing 'element not found' errors."

**⭐ Great Answer:**

> "Without `await`, the Promise is returned but not resolved, so the script continues immediately. This creates a race condition where subsequent commands execute against an incomplete page state. In CI/CD, this manifests as intermittent failures—the test might pass locally (fast machine) but fail in the pipeline (slower). That's why Playwright's Strict Mode helps catch these issues early."

**Follow-up Questions They'll Ask:**

- "How do you debug missing await issues?"
- "Have you seen this cause flaky tests in production?"

---

### **Q3: Explain the JavaScript Event Loop in the context of browser automation.**

**✅ Good Answer:**

> "JavaScript is single-threaded, so it uses an event loop to handle asynchronous operations. When Playwright sends a command like `page.click()`, it's added to the task queue. The event loop processes these tasks one at a time, but without `await`, our script doesn't wait for the task to finish before moving to the next line."

**⭐ Great Answer:**

> "The event loop is JavaScript's concurrency model. When I call `page.goto()`, it returns a Promise and adds the navigation task to the Web API layer. My script continues running unless I use `await`, which tells JavaScript to pause execution until that Promise resolves. In testing, this is crucial—if I don't await a navigation, my test might try to interact with the previous page, causing false negatives. Tools like Playwright's trace viewer help visualize this event loop behavior when debugging flaky tests."

---

## TypeScript & Type Safety

### **Q4: Explain the difference between `const` and `let` in TypeScript.**

**❌ Bad Answer:**

> "Const is for constants and let is for variables."

**✅ Good Answer:**

> "`const` creates an immutable binding—once assigned, the variable cannot be reassigned. `let` creates a mutable binding that can be reassigned. In testing, I use `const` for test data that shouldn't change like URLs or expected values, and `let` for data that evolves during the test."

**⭐ Great Answer:**

> "In TypeScript, `const` prevents reassignment of the binding, making code more predictable and preventing accidental overwrites. For example, test configuration like base URLs should be `const` to prevent modification. `let` is used when values need to change, like iterating through test data. Note that `const` doesn't make objects immutable—you can still modify object properties or push to arrays declared with `const`."

---

### **Q5: What are arrays in TypeScript and why do we use them in testing?**

**✅ Good Answer:**

> "An array is a collection of values of the same type. In TypeScript, we denote arrays with square brackets, like `string[]` for an array of strings. In testing, arrays are essential for data-driven testing—storing multiple test users, products, or scenarios that we iterate through with loops."

**⭐ Great Answer:**

> "Arrays store multiple values of the same type. The syntax `string[]` means 'array of strings'. In QA automation, arrays enable data-driven testing—I can test login with 10 different users by putting them in an array and looping through it, rather than writing 10 separate tests. This makes tests more maintainable and reduces code duplication. Arrays also integrate well with test reporting—I can track which data set passed or failed."

---

## Loops & Data-Driven Testing

### **Q6: How would you test the same functionality with multiple sets of data?**

**❌ Bad Answer:**

> "I'd copy-paste the test and change the data each time."

**✅ Good Answer:**

> "I'd use a data-driven approach with arrays and loops. Create an array of test data, then use a `for...of` loop to iterate through each dataset, running the same test logic with different inputs. This keeps the code DRY (Don't Repeat Yourself)."

**⭐ Great Answer:**

> "I'd implement data-driven testing using TypeScript arrays and loops. For example, testing user registration with multiple users: create an array of user objects containing test data, use a `for...of` loop to iterate through them, and generate unique values like email addresses using timestamps to avoid conflicts. This approach is maintainable—when test logic changes, I update one place instead of multiple test copies. It also integrates well with test reporting frameworks that can show results per dataset."

**Example:**

```typescript
const users: string[] = ["Alice", "Bob", "Charlie"];
for (const userName of users) {
  const uniqueEmail = `${userName.toLowerCase()}_${Date.now()}@test.com`;
  // Execute test with this user
}
```

---

## Test Management Tools

### **Q7: What test management tools have you used?**

**❌ Bad Answer:**

> "Excel spreadsheets for tracking test cases."

**✅ Good Answer:**

> "I'm currently working with Jira integrated with Xray for test case management. I write test cases in Xray, link them to user stories for requirements traceability, execute tests through Playwright automation, and track defects in Jira. This provides end-to-end visibility from requirements through execution."

**⭐ Great Answer:**

> "I use Jira with Xray as my test management platform. My workflow includes: writing detailed test cases in Xray with preconditions and expected results, linking them to Jira user stories for bidirectional traceability, executing tests both manually and through Playwright automation which reports results back to Xray, and creating defects linked to failed test executions. I also leverage Xray's test coverage reports to ensure all requirements have test coverage, and use test execution reports for sprint retrospectives. Previously at IBM, we used Quality Center, but the modern Jira ecosystem provides better integration with agile development workflows."

**Follow-up they might ask:**

- "How do you link automated tests to test cases?"
- "What metrics do you track in test management tools?"

---

## AI & Automation

### **Q8: How do you use AI in your QA workflow?**

**❌ Bad Answer:**

> "I don't really use AI for testing."

**✅ Good Answer:**

> "I use AI tools like Claude Code to accelerate test script generation. I provide detailed prompts describing what the test should do, including specific fields to fill and validation points, and the AI generates the Playwright script structure. I then review and refine the generated code to ensure it meets quality standards and follows our coding conventions."

**⭐ Great Answer:**

> "I use AI throughout my testing workflow in several ways: First, for test script generation—I prompt AI tools like Claude Code with test case requirements and it generates Playwright TypeScript scaffolding, which I then review and customize. Second, for test data generation—AI helps create realistic test data sets and edge cases I might not have considered. Third, for debugging—when tests fail, I use AI to analyze error logs and suggest fixes. However, I always validate AI-generated code against our standards (proper locators, type safety, error handling) and never blindly trust AI output. The key is using AI to augment my QA expertise, not replace it."

---

## Git & Version Control

### **Q9: Walk me through your typical Git workflow for QA automation.**

**❌ Bad Answer:**

> "I just commit everything to main when I'm done."

**✅ Good Answer:**

> "I follow a branch-based workflow. For each test suite or feature, I create a new branch, commit my changes with descriptive messages, and push to GitHub. Once the tests are working, I create a pull request for code review before merging to main."

**⭐ Great Answer:**

> "I follow a feature-branch workflow that keeps main stable. My daily workflow: First, `git status` to review changes. Then `git add .` to stage files, `git commit -m` with a descriptive message following the format 'Type: Description' like 'Feature: Add login tests' or 'Fix: Handle strict mode in search'. I push with `git push origin branch-name`. For new features, I create branches using `git checkout -b feature-name`, work there, and push with `git push -u origin feature-name` to create the upstream branch. Before merging, I ensure tests pass in CI/CD. I commit frequently—after each logical unit of work—so the history tells a story. Good commit messages matter because they're searchable documentation of why changes were made."

**Example Workflow:**

```bash
git checkout -b feature/login-tests
# Make changes
git add .
git commit -m "Feature: Add multi-user login test suite"
git push -u origin feature/login-tests
# Create PR, get review, merge to main
```

**Follow-up Questions:**

- "How do you handle merge conflicts?"
- "What's your branching strategy for hotfixes?"
- "How do you know when to commit?"

---

### **Q10: What's the difference between a Git repository and a Git branch?**

**❌ Bad Answer:**

> "They're basically the same thing."

**✅ Good Answer:**

> "A repository is the entire project with all its code and history. A branch is a separate line of development within that repository. The main branch typically holds production code, while feature branches hold work in progress."

**⭐ Great Answer:**

> "A repository is the complete project—all code, commits, branches, and history. Think of it as the filing cabinet. Branches are different versions of the code within that repository—like different drawers in the same cabinet. For example, my PLAYWRIGHT-bootcamp repository contains a `main` branch with stable tests and feature branches like `day5-typescript-practice` for experimental work. Both branches exist in the same repo and share commit history up to their divergence point. This structure enables parallel development—I can work on API tests in one branch while maintaining UI tests in another, without conflicts. When ready, branches merge back to main, combining the work."

**Visual Example:**

```
Repository: PLAYWRIGHT-bootcamp
├── main branch (stable)
├── feature/api-tests (in progress)
└── feature/mobile-tests (in progress)
```

**Why This Matters:**

- Shows understanding of collaborative development
- Proves you can work on teams without blocking others
- Demonstrates version control literacy beyond basics

---

---

### **Q11: What is Playwright's Strict Mode and how do you handle it?**

**❌ Bad Answer:**

> "It's when Playwright is strict about selectors."

**✅ Good Answer:**

> "Strict Mode is a Playwright feature that prevents ambiguous element selection. If a locator matches multiple elements on the page, Playwright throws an error instead of guessing which one to interact with. To handle it, I use `.first()`, `.last()`, or `.nth(index)` to explicitly specify which element I want."

**⭐ Great Answer:**

> "Strict Mode is Playwright's safety mechanism that ensures test reliability. When a locator like `getByPlaceholder('Search')` matches multiple elements—for example, a search box in both the header and footer—Playwright refuses to proceed, throwing a 'strict mode violation' error. This prevents flaky tests caused by interacting with the wrong element. To resolve it, I explicitly specify which element using `.first()` for the first match, `.last()` for the last match, or `.nth(index)` for a specific position. This is part of defensive test design—being explicit about element selection rather than relying on implicit behavior that might change."

**Real-World Example:**

```typescript
// ❌ Fails with strict mode violation if 2+ search boxes exist
await page.getByPlaceholder("Search").fill("iPhone");

// ✅ Explicit - uses the first search box
await page.getByPlaceholder("Search").first().fill("iPhone");
```

**Follow-up Questions:**

- "How do you debug when you get a strict mode error?"
- "What's the difference between `.first()` and `.nth(0)`?"

---

### **Q12: Explain your approach to naming variables in test automation.**

**❌ Bad Answer:**

> "I just use whatever makes sense at the time."

**✅ Good Answer:**

> "I follow a consistent naming convention where arrays are plural and loop variables are singular. For example, `productList` contains multiple products, and the loop variable `product` represents one item. This makes code more readable and maintainable."

**⭐ Great Answer:**

> "I follow what I call 'Style A' naming—arrays have descriptive plural names like `productList`, `emailList`, or `passwordList`, while loop variables are singular like `product`, `email`, or `password`. This convention provides clarity in two ways: First, it's immediately obvious which variable holds the collection versus a single item. Second, it prevents cognitive load when reading code months later or during code reviews. This is especially important in data-driven testing where you might have nested loops—clear variable names prevent confusion about which loop level you're in."

**Example:**

```typescript
const emailList: string[] = ["test1@ex.com", "test2@ex.com"];
for (const email of emailList) {
  // Clear that 'email' is one item from 'emailList'
  await page.fill(email);
}
```

**Why This Matters:**

- Shows attention to code quality beyond just "making it work"
- Demonstrates understanding that tests are code that needs maintenance
- Proves you think about other developers reading your code

---

## TypeScript Type System

### **Q13: What's the difference between `string` and `string[]` in TypeScript?**

**❌ Bad Answer:**

> "One is a string and one is an array."

**✅ Good Answer:**

> "`string` is a type for a single text value like `'Alice'`. `string[]` is a type for an array of text values like `['Alice', 'Bob']`. The brackets indicate it's a collection. This distinction prevents type errors at compile time."

**⭐ Great Answer:**

> "`string` represents a single text value, while `string[]` represents an array of text values—the brackets denote a collection. In testing, this matters for type safety: if I declare `const userList: string[] = ['Alice', 'Bob']`, TypeScript prevents me from accidentally doing `userList.fill('Charlie')`—arrays don't have a `fill` method, only individual strings do. This catches bugs at compile time rather than runtime. When looping, the loop variable type is inferred from the array type: if `userList` is `string[]`, then `for (const user of userList)` makes `user` type `string`. This cascading type safety is why explicit typing matters—it provides guardrails throughout your code."

**Example:**

```typescript
// ✅ Correct typing
const email: string = "test@example.com";
const emailList: string[] = ["test1@ex.com", "test2@ex.com"];

// ❌ Type error caught at compile time
const emailList: string = ["test@ex.com"]; // Error!
```

**Follow-up Questions:**

- "What's the difference between `string[]` and `Array<string>`?"
- "How does TypeScript help prevent bugs in test automation?"

---

### **Q14: Explain the concept of type inference in TypeScript and when you use explicit types.**

**❌ Bad Answer:**

> "I don't really think about types, TypeScript handles it."

**✅ Good Answer:**

> "Type inference is when TypeScript automatically determines a variable's type from its value. For example, `const name = 'Alice'` is inferred as `string`. However, I use explicit types for clarity and to catch errors earlier, especially for function parameters, Playwright elements, and test data arrays."

**⭐ Great Answer:**

> "Type inference is TypeScript's ability to automatically deduce types from values—if I write `const price = 99`, TypeScript infers type `number`. While this works for simple cases, I follow a strict explicit typing standard for several reasons: First, explicit types catch mismatches earlier—if I accidentally assign an array to a `string` type, I get a compile error. Second, explicit types serve as documentation—`const searchBox: Locator` tells other developers exactly what this variable represents. Third, for Playwright elements, explicit typing is required because TypeScript can't correctly infer `Locator` types. Fourth, explicit types enable better IDE autocomplete—VS Code shows relevant methods when types are explicit. My rule: always explicit for function signatures, Playwright elements, and complex data structures."

**Code Example:**

```typescript
// TypeScript infers, but explicit is clearer
const price = 99; // Inferred: number
const price: number = 99; // Explicit: number ✅

// Must be explicit for Playwright
const button: Locator = page.getByRole("button"); // Required ✅
```

**Why This Matters:**

- Shows deep TypeScript understanding
- Demonstrates awareness of compile-time vs runtime errors
- Proves you write professional, maintainable code

---

### **Q15: Why is explicit typing considered a best practice in test automation?**

**✅ Good Answer:**

> "Explicit types make code more maintainable and catch errors at compile time instead of runtime. When I explicitly type variables, TypeScript prevents me from making mistakes like assigning a number to a string variable. This is especially important in testing where failures in CI/CD are expensive."

**⭐ Great Answer:**

> "Explicit typing provides three critical benefits in test automation: First, **early error detection**—type mismatches are caught during development, not during test execution or CI/CD runs. For example, trying to push a number into a `string[]` array fails at compile time, not when the test runs against production. Second, **self-documenting code**—when I see `const emailList: string[]`, I immediately know it's a collection of emails, reducing cognitive load during debugging or code reviews. Third, **better tooling support**—explicit types enable IntelliSense autocomplete, so VS Code suggests `.fill()` for `Locator` types, reducing typos and speeding development. In QA specifically, this matters because test code lives for years and is maintained by multiple people—explicit types are an investment in long-term maintainability."

---

## Test Debugging & Problem Solving

### **Q16: How do you debug a Playwright test that's failing with a locator error?**

**❌ Bad Answer:**

> "I just try different selectors until something works."

**✅ Good Answer:**

> "I start by reading the error message carefully—Playwright's errors are very descriptive. I check if the element exists on the page, if there are multiple matches causing a strict mode violation, or if I'm using the right selector strategy. I run tests in headed mode to visually see what's happening."

**⭐ Great Answer:**

> "My debugging workflow follows a systematic approach: First, I read the error message completely—Playwright errors tell you exactly what failed, like 'strict mode violation: 2 elements found'. Second, I run the test in headed mode (`--headed` flag) to watch the browser. Third, I check my locator strategy—is `getByRole` more appropriate than `getByPlaceholder`? Fourth, for strict mode violations, I verify if `.first()`, `.last()`, or `.nth()` is needed. Fifth, I use Playwright's trace viewer to see exact page state at failure. Sixth, I add explicit waits if it's a timing issue. I document the fix and root cause to prevent similar issues."

## Error Messages & Debugging

### **Q17: How do you debug a Playwright test that fails in CI/CD but passes locally?**

**❌ Bad Answer:**

> "I'd just run it again and hope it passes."

**✅ Good Answer:**

> "First, I'd check the CI/CD logs for the exact error message. Then I'd look for environment differences—different browser versions, network conditions, or timing issues. I'd run the test locally with the same browser version and headed mode to reproduce the issue. If it's a timing problem, I'd add proper state-based waits instead of hard timeouts."

**⭐ Great Answer:**

> "I'd follow a systematic debugging approach: First, examine the CI/CD logs and identify the exact failure point. Second, check for environmental differences—CI often runs headless on Linux while local might be headed on Windows. Third, review the Playwright trace if available (we should have trace: 'retain-on-failure' in CI). Fourth, look for timing issues—CI is often slower, so missing awaits or race conditions surface there. Fifth, reproduce locally using Docker or the same OS as CI. Finally, fix the root cause—usually it's missing state-based waits, incorrect locators, or test data conflicts. I document the fix and add it to our troubleshooting guide so the team learns from it."

**Follow-up Questions:**

- "What's the difference between running tests headed vs headless?"
- "How do you handle flaky tests in CI/CD?"
- "What debugging tools does Playwright provide?"

---

### **Q18: Explain a Playwright strict mode error and how you'd fix it.**

**❌ Bad Answer:**

> "I don't know what strict mode is."

**✅ Good Answer:**

> "Strict mode is when Playwright finds multiple matching elements and throws an error instead of guessing. For example, if two search boxes exist and I use `getByPlaceholder('Search')`, Playwright says 'strict mode violation: resolved to 2 elements'. I fix it by adding `.first()`, `.last()`, or `.nth(index)` to specify which element I want."

**⭐ Great Answer:**

> "Strict mode is Playwright's safety mechanism that prevents ambiguous element selection. When a locator matches multiple elements—say, a search box in both the header and footer—Playwright refuses to proceed and throws a 'strict mode violation' error. This is actually helpful because it prevents flaky tests caused by interacting with the wrong element. To fix it, I make the selection explicit using `.first()` for the first match, `.last()` for the last, or `.nth(index)` for a specific position. Even better, I can make my locator more specific—instead of `getByPlaceholder('Search')`, use `page.locator('header').getByPlaceholder('Search')` to scope it. This is part of defensive test design—being explicit about element selection rather than relying on implicit behavior that might change when the UI updates."

**Real-World Example:**

```typescript
// ❌ Fails with strict mode violation
await page.getByPlaceholder("Search").fill("iPhone");

// ✅ Explicit - uses the first match
await page.getByPlaceholder("Search").first().fill("iPhone");

// ⭐ Even better - scope to specific area
await page.locator("header").getByPlaceholder("Search").fill("iPhone");
```

---

## Page Object Model

### **Q19: What is the Page Object Model and why do we use it?**

**❌ Bad Answer:**

> "It's a way to organize tests into different files."

**✅ Good Answer:**

> "Page Object Model is a design pattern where each page of the application gets its own class that encapsulates all the locators and actions for that page. Instead of writing `page.getByPlaceholder('Email').fill(email)` in every test, we create a LoginPage class with a `login(email, password)` method. This makes tests more maintainable—if the email field locator changes, we update it once in the LoginPage class instead of in 50 different tests."

**⭐ Great Answer:**

> "Page Object Model (POM) is an architectural pattern that separates page-specific logic from test logic. Each page or component gets its own class that contains locators as properties and user actions as methods. For example, a LoginPage class stores the email field, password field, and login button as Locator properties, then provides methods like `login(email, password)` that encapsulate the interaction flow. This provides three key benefits: First, maintainability—when the UI changes, you update one Page Object instead of dozens of tests. Second, reusability—multiple tests can use the same LoginPage methods. Third, readability—tests read like user stories: `await loginPage.login(email, password)` instead of low-level Playwright commands. In Playwright with TypeScript, we use classes with readonly Locator properties, a constructor that accepts a Page object, and async methods that return Promises. This is the industry standard for test automation frameworks and what you'd see in any professional QA codebase."

**Code Example:**

```typescript
// Without POM (bad):
test("login", async ({ page }) => {
  await page.getByPlaceholder("Email").fill("test@test.com");
  await page.getByPlaceholder("Password").fill("pass123");
  await page.getByRole("button", { name: "Login" }).click();
});

// With POM (good):
test("login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("test@test.com", "pass123");
});
```

**Why This Matters:**

- Shows architectural thinking
- Demonstrates understanding of maintainable code
- Proves you think beyond "making tests work"

---

### **Q20: How would you structure a Page Object class in TypeScript?**

**❌ Bad Answer:**

> "I'd put all the locators in a class."

**✅ Good Answer:**

> "I'd create a class with a constructor that takes a Page parameter. Inside, I'd define locators as readonly properties using Playwright's Locator type. Then I'd add methods for user actions like `login()` or `search()`. All methods would be async and return Promise<void>."

**⭐ Great Answer:**

> "A professional Page Object in TypeScript follows this structure: First, import necessary types (`Locator`, `Page`) from Playwright. Second, export a class named after the page (e.g., `LoginPage`). Third, declare locators as `readonly` properties with explicit `: Locator` typing—readonly prevents accidental reassignment. Fourth, create a constructor that accepts `page: Page` and initializes all locators using getByRole or getByPlaceholder. Fifth, implement action methods as async functions with descriptive names and explicit return types like `Promise<void>`. Sixth, follow the Single Responsibility Principle—each method does one logical action. For example, a `login()` method takes email and password as parameters, fills both fields, clicks the button, but doesn't verify the result—that's the test's job. I also add JSDoc comments for complex methods and use TypeScript interfaces for method parameters if they're complex objects."

**Code Example:**

```typescript
import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  // 🗒️ THE PLAN (Locators & Page Reference)
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("E-Mail Address");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  // 🎬 THE WORK (Actions)
  async login(email: string, password: string): Promise {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async fillEmail(email: string): Promise {
    await this.emailInput.fill(email);
  }
}
```

**Follow-up Questions:**

- "Why use `readonly` for locators?"
- "When would you create a Page Object vs just writing the test directly?"
- "How do you handle dynamic elements in a Page Object?"

---

## Architect vs Junior Mindset

### **Q21: How do you approach writing test automation—do you write tests or build frameworks?**

**❌ Bad Answer:**

> "I just write tests when someone asks me to."

**✅ Good Answer:**

> "I think about maintainability from the start. Instead of writing individual test scripts, I build reusable components like Page Objects and fixtures. This means when requirements change, I update the framework once rather than fixing dozens of tests. I also use TypeScript interfaces to make the code type-safe and self-documenting."

**⭐ Great Answer:**

> "I approach test automation with an architect mindset, not a script writer mindset. Rather than asking 'How do I make this test pass?', I ask 'How do I structure this so it's maintainable in 6 months when the UI changes?' This means I invest time upfront in framework architecture—Page Object Model for UI abstraction, TypeScript interfaces for type safety, fixtures for test setup/teardown, and helper utilities for common operations. When I write tests, they're declarative and readable: `await loginPage.login(user.email, user.password)` instead of imperative Playwright commands scattered everywhere. I also think about the team—can a junior QA understand this code? Can we onboard new team members quickly? That's why I document patterns, create reusable components, and follow SOLID principles even in test code. In 2026, with AI tools generating code, the real skill isn't writing syntax—it's architecting systems that AI can extend without creating technical debt."

**Why This Matters:**

- Distinguishes senior from junior engineers
- Shows you think strategically
- Demonstrates you understand AI-augmented workflows

**Follow-up Questions:**

- "What's the difference between Playwright's Inspector and Trace Viewer?"
- "How do you handle flaky tests caused by timing issues?"

---

## Playwright Architecture

_Interview questions will be added in Week 2_

---

## Page Object Model

### **Q22: Explain the YAGNI principle in the context of Page Object Models.**

**❌ Bad Answer:**

> "YAGNI means You Aren't Gonna Need It. It's about not writing extra code."

**✅ Good Answer:**

> "YAGNI means only mapping the locators and methods that your current test actually needs. When creating a ProductPage POM, I don't map the entire page - just the specific elements my test interacts with. If a test only clicks 'Buy Now' and verifies success, I only create those two locators. This reduces maintenance burden because if the UI changes, I only fix locators I'm actually testing."

**⭐ Great Answer:**

> "YAGNI - You Aren't Gonna Need It - is a principle I apply when building Page Objects. Instead of mapping every element on a page 'just in case', I only create locators and methods for what my current tests actually use. For example, if I'm testing the checkout flow, my ProductPage might only have buyNowButton and successNotification - not the product title, price, reviews, or other elements I'm not testing. This matters because: First, less code to maintain when UI changes. Second, POMs only break when something I'm actually testing changes, not unrelated UI updates. Third, it's faster to build - I can add more locators later when I need them. Fourth, it follows the principle of building incrementally rather than trying to predict all future needs. In real projects, I've seen 'complete' POMs with 30+ locators where tests only use 5 - that's technical debt that slows the team down."

**Follow-up Questions:**

- "How do you decide what to include in a POM?"
- "What if you need to add a locator later?"

---

### **Q23: Should Page Objects contain assertions? Why or why not?**

**❌ Bad Answer:**

> "Sure, POMs can have assertions to verify things worked."

**✅ Good Answer:**

> "No, Page Objects should never contain assertions. POMs are responsible for actions and returning data - like clicking buttons or getting text values. The test file is responsible for all assertions. This separation of concerns keeps the architecture clean. If a POM has assertions, it's making decisions about what's 'correct', which is the test's job, not the POM's job."

**⭐ Great Answer:**

> "Absolutely not - this is a critical architecture principle. Page Objects should never contain expect() statements or assertions. Here's why: POMs represent the user interface and provide methods to interact with it. They perform actions (click, fill, navigate) and return data (locators, text content, state). Tests represent business logic and verification - they decide what's correct and assert it. If I put assertions in a POM, I'm mixing these concerns. For example, a bad POM might have clickBuyNow() that clicks the button AND asserts the success message appears. The problem is: what if I want to test a scenario where clicking Buy Now should fail? Or what if I want to verify different success messages in different contexts? The POM has locked me into one assertion. The correct pattern is: POM's clickBuyNow() method just clicks the button. The test calls that method, then the test decides what to assert based on the scenario. This separation makes POMs reusable across many different test scenarios. It's the same principle as MVC architecture - separate data, actions, and verification."

**Code Example:**

```typescript
// ❌ BAD - Assertion in POM:
async clickBuyNow(): Promise<void> {
  await this.buyNowButton.click();
  await expect(this.successNotification).toBeVisible();
}

// ✅ GOOD - POM just performs action:
async clickBuyNow(): Promise<void> {
  await this.buyNowButton.click();
}

// Test handles assertion:
await productPage.clickBuyNow();
await expect(productPage.successNotification).toBeVisible();
```

---

### **Q24: How do you debug a test that's failing with a timeout error?**

**❌ Bad Answer:**

> "I just increase the timeout and run it again."

**✅ Good Answer:**

> "First, I read the complete error message to understand what Playwright was waiting for. Then I run the test in headed mode with --headed flag to watch it execute. I check if the element exists on the page using browser DevTools. If it's a timing issue, I look for missing awaits or add proper state-based waits. I also check the Playwright trace if available to see the exact page state when it failed."

**⭐ Great Answer:**

> "I follow a systematic debugging approach for timeout errors. First, I read the entire error message - Playwright tells you exactly what it was waiting for, like 'waiting for getByRole(button, { name: /buy now/i })'. This tells me which locator failed. Second, I run the test in headed mode (--headed flag) so I can watch what actually happens in the browser. Third, I inspect the page at the point of failure - is the element actually there? Sometimes the issue is the element doesn't exist (wrong locator), sometimes it exists but isn't visible (CSS issue), sometimes it's a timing problem (page still loading). Fourth, I check for missing awaits - if I forgot await on an earlier step, the test might be on the wrong page entirely. Fifth, I verify my locator is correct by testing it in the browser console or Playwright inspector. For example, in our recent case, we got a timeout on 'Buy Now' button - running in headed mode showed us the button text was actually 'OUT OF STOCK', so our locator was correct but the product state was different. The test was working perfectly - it correctly failed because the expected button didn't exist. This is better than silently passing when something's wrong."

---

### **Q25: Describe a situation where you used multiple Page Objects in a single test.**

**❌ Bad Answer:**

> "I used a LoginPage and a DashboardPage in one test."

**✅ Good Answer:**

> "I recently built a test for an e-commerce checkout flow that used three POMs: SearchPage, ProductPage, and CartPage. The test searched for a product using SearchPage.search(), clicked the first result, then used ProductPage.clickBuyNow() to add it to cart, then CartPage.verifyItemAdded() to confirm. This demonstrates realistic user workflows and shows how POMs chain together."

**⭐ Great Answer:**

> "I regularly build tests that chain multiple Page Objects to represent realistic user journeys. For example, I recently created an end-to-end e-commerce test that uses SearchPage, ProductPage, and eventually will use CheckoutPage. The flow is: First, instantiate SearchPage and call search('iPhone') to search for a product. Second, the search returns results, so I click the first product link. Third, now I'm on the product page, so I instantiate ProductPage and call clickBuyNow(). Fourth, I verify the success notification appears using an assertion in the test file. This architecture demonstrates several best practices: POMs are focused on single pages (YAGNI principle), each POM has a clear responsibility, the test orchestrates the workflow, and assertions live in the test, not the POMs. In a real job, this pattern scales - I might have 50 different test scenarios all reusing the same SearchPage and ProductPage POMs. When the Buy Now button's locator changes, I update one line in ProductPage.ts and all 50 tests still work. This is the maintainability benefit of POM architecture."

### **Q26: "We try to avoid conditional logic (if/else statements) in automation. But if you have to use it, where does it belong: in the Page Object Model, or in the Test File?"**

❌ Bad Answer:

"It belongs in the Page Object Model so all the tests can share the if/else logic."

✅ Good Answer:

"It strictly belongs in the Test File. The Page Object Model should only contain locators and dumb action methods. The Test File acts as the controller that makes decisions based on the state returned by the POM."

⭐ Great Answer:

"Conditional logic should always live in the Test File, never the POM. This comes down to Separation of Concerns. The POM's only job is to interact with the DOM—if a button is supposed to be there and isn't, the POM method should fail loudly. If we put 'if element exists' inside the POM, it hides errors and creates false positives. Instead, the POM should return the page state (like reading an 'Out of Stock' badge), and the Test File handles the if/else logic to dictate the test flow. Tests make decisions; POMs just follow orders."

**Follow-up Questions:**

- "How do you decide when to create a new POM vs extending an existing one?"
- "What happens when the UI changes across multiple pages?"

---

#### **🎤 Interview Prep Notes**

**Q27: "How do you ensure tests start with a clean state?"**

**Good Answer:**

> "I use Fixtures with beforeEach hooks to set up a clean state before each test runs. For example, if I'm testing a shopping cart, I ensure the cart is empty at the start of each test. This makes tests independent and reliable - they can run in any order without affecting each other. It's the same principle as re-ghosting a machine for security testing, but automated."

**Q28: "How do you review AI-generated code?"**

**Good Answer:**

> "I look for several things: First, does it follow our coding standards? Second, are assertions in the right place - in tests, not POMs? Third, is it using the correct data - right URLs, current site, proper locators? Fourth, does it make assumptions about application state? For example, verifying 'cart shows 1 item' assumes the cart started empty - if it didn't, the test is unreliable. I also check if the AI copied patterns from old code when we've moved to new standards."

#### **🎤 Interview Prep - Fixtures Question**

**Q29: "How do you ensure test independence?"**

**❌ Bad Answer:**

> "I make sure tests don't interfere with each other."

**✅ Good Answer:**

> "I use Fixtures with beforeEach hooks to set up clean state before each test runs. For example, if I'm testing a shopping cart, I ensure the cart is empty at the start of each test using beforeEach. This makes tests independent - they can run in any order without affecting each other. It's the same principle as re-ghosting a machine for security testing, but automated."

**⭐ Great Answer:**

> "I use Playwright's test hooks to ensure each test starts with a known clean state. In beforeEach, I set up the environment - for example, clearing a cart, logging in, or navigating to a starting page. In afterEach, I clean up - logging out or clearing test data. The key is using state-based checks with waitFor() rather than snapshot checks like isVisible(), because those can cause flaky tests when pages are still loading. I also verify the setup worked - for instance, checking that the cart badge is actually gone after clearing. This pattern ensures tests are independent, reliable, and can run in parallel without conflicts."

**Follow-up questions to prepare for:**

- "What's the difference between beforeEach and beforeAll?"
- "How do you handle test data that persists between runs?"
- "Have you encountered flaky tests? How did you fix them?"

### \*\*Q30: What exactly is that { page } argument we pass into Playwright tests?"

**✅ Good Answer:**
It is a built-in Playwright fixture. Behind the scenes, Playwright uses setup hooks to automatically launch a browser, create an isolated, incognito browser context, and hand the test a clean page tab to work with. This ensures every test runs in a perfectly sandboxed environment.

### **Q33: "Walk me through how you would approach testing a contact form from scratch."**

**❌ Bad Answer:**

> "I'd just fill out the form and click submit."

**✅ Good Answer:**

> "I'd start by understanding the requirements - what fields are required, what validations exist, what the success message should say. Then I'd create a test suite covering the happy path (valid submission), boundary testing (field length limits), format validation (email, phone), empty field handling, and special characters. For a contact form, I'd test at least 6-8 scenarios, not just one valid case."

**⭐ Great Answer:**

> "First, I'd examine the requirements to understand expected behavior. For a contact form with name, email, phone, subject, and message fields, I'd design a comprehensive test suite thinking in scenarios, not just one test. My approach: TC-001 validates happy path with all valid data. TC-002 tests boundary conditions - for example, if name field max is 50 characters, I test at 49, 50, and 51. TC-003 validates email format (missing @, invalid domain). TC-004 checks phone format validation. TC-005 tests empty required fields. TC-006 validates special characters in text fields. This demonstrates I'm thinking like a QA Architect - one feature becomes a suite of 6+ test cases covering positive, negative, and edge cases. Each test case includes preconditions (browser opened, form loaded), test steps, expected results, and postconditions (what changed - not what user 'can do' but what actually happened)."

---

### **Q34: "How do you handle switching to a new practice site or application under test?"**

**❌ Bad Answer:**

> "I just start writing tests for the new site."

**✅ Good Answer:**

> "First, I'd explore the site manually to understand the user flows and identify test scenarios. Then I'd inspect elements using DevTools to determine the best locator strategy. I'd check if the site has data-test attributes, accessible labels, or if I need to use role-based locators. Finally, I'd create POMs for the pages I need to test."

**⭐ Great Answer:**

> "When I switched from practicesoftwaretesting.com to automationintesting.online recently, my process was: First, manual exploration - I navigated the site like a user to understand core flows (contact form, admin login, booking). Second, requirements gathering - I identified what needs testing based on business value. Third, technical inspection - I opened DevTools to examine the DOM structure and identify locator strategies. For example, I discovered the cart badge uses data-test='cart-quantity', which is gold-standard for testing. Fourth, I verified assumptions - when experts suggested the site used hash routing (/#/admin), I actually tested both URLs and found /admin worked fine without the hash. This taught me to always verify assumptions with actual testing, not blindly trust even senior advice. Fifth, I planned my test architecture - which POMs to build, what test cases to write. This systematic approach ensures I understand the application before writing any code."

---

### **Q35: "Explain your process for writing explicit prompts to AI code generators."**

**❌ Bad Answer:**

> "I just tell it what I want and it generates the code."

**✅ Good Answer:**

> "I use a structured template with four sections: Architecture (what to import), Data (what locators with specific Playwright methods), Logic (what methods to create), and Constraints (standards to follow like CLAUDE.md). This ensures consistent, predictable output."

**⭐ Great Answer:**

> "After struggling with vague prompts that generated inconsistent code, I established an explicit prompt template that's now our team standard. It has four mandatory sections: Architecture defines imports and dependencies. Data specifies exact locators using precise Playwright methods - not 'looks for a button' but 'getByRole('button', { name: /submit/i })'. Logic describes each method with clear action verbs and return types. Constraints references our coding standards. For example, when creating ContactPage POM, my prompt was: 'Architecture: Import Locator and Page. Data: nameInput using getByPlaceholder('Name'), emailInput using getByPlaceholder('Email'). Logic: submitContactForm(name, email, phone, subject, message) that fills all fields and clicks submit. Constraints: Follow CLAUDE.md - readonly locators, explicit types, Promise<void> returns.' This level of specificity generates production-ready code on the first attempt. The key insight: prompting AI is like giving instructions to a senior developer - be explicit about the 'what', trust them on the 'how'."

---

### **Q36: "How do you verify expert assumptions vs actual application behavior?"**

**❌ Bad Answer:**

> "I trust what experts tell me."

**✅ Good Answer:**

> "I verify assumptions through actual testing. Recently two experts said a SPA required hash routing (/#/admin), but when I tested both URLs, /admin worked fine. I always test rather than assume, even when experts agree."

**⭐ Great Answer:**

> "I follow a 'trust but verify' approach, especially for technical assumptions. Recently I had Gemini (our architecture expert) and my coach both say I needed to use /#/admin for a Single Page Application because 'SPAs always use hash routing.' Instead of blindly implementing this, I tested both URLs myself - navigated to /admin and /#/admin, inspected the routing behavior, verified which worked. Turns out /admin worked perfectly; the app uses HTML5 History API, not hash routing. Both experts made assumptions without checking. This taught me a critical lesson: expert opinions are valuable starting points, but always validate with actual testing. In a real job, this saves time - if I'd written tests with the wrong URL based on expert advice, I'd waste hours debugging later when tests failed. The habit of verifying assumptions is what separates senior engineers from juniors. Trust but verify, always."

---

### **Q37: "What certifications do you have and how do they apply to this role?"**

**✅ Your Current Answer (March 2026):**

> "I hold six Anthropic AI certifications earned in March 2026: Claude 101, Claude Code in Action, AI Fluency: Framework & Foundations, Introduction to Model Context Protocol, Introduction to Agent Skills, and Model Context Protocol: Advanced Topics. These certifications demonstrate my expertise in AI-assisted test development, prompt engineering for QA, and orchestrating multiple AI agents in testing workflows. I'm also planning to take the ISTQB Foundation Level certification in late April 2026 to solidify my foundational QA knowledge before my job search. This combination of traditional QA certification and cutting-edge AI skills positions me uniquely for 2026 AI-Driven QA roles where the industry is moving toward QA engineers who can architect test strategies and supervise AI agents, not just write every line of code manually."

---

### **Q38: "How do you identify UX issues during functional testing?"**

**❌ Bad Answer:**

> "That's not my job - I just verify the requirements."

**✅ Good Answer:**

> "When I discover potential UX issues during testing, I document them separately from functional bugs. For example, if a contact form disappears after submission making it impossible to resubmit without refreshing, I note this as a usability concern and discuss with the product team."

**⭐ Great Answer:**

> "While testing the contact form on automationintesting.online, I discovered a UX issue: after successful submission, the form disappears and the success message stays visible permanently. The user cannot submit another message without page refresh. My process for handling this: First, verify it's actual behavior by testing multiple times - not a timing issue or test error. Second, check requirements - does the spec say the form should persist or disappear? Third, document actual behavior in my test postconditions - I don't change my test based on what SHOULD be, I document reality. Fourth, write a separate usability defect report with clear reproduction steps, expected vs actual behavior, user impact explanation ('Users cannot submit multiple inquiries without manual page refresh'), and suggested fix ('Keep form visible or add a 'Submit Another' button'). But I let product management decide if it needs changing. My job is to surface issues, not make product decisions. The test case always reflects actual behavior; the defect report captures the concern. This demonstrates I think beyond 'does it match the spec' to 'is this a good user experience'."

---

### **Q39: "What's your approach to test case design - how do you go from one feature to a complete test suite?"**

**❌ Bad Answer:**

> "I write one test per feature."

**✅ Good Answer:**

> "I think in test suites, not individual tests. For a contact form feature, I don't just write one 'valid submission' test. I identify multiple scenarios: happy path, boundary testing for field lengths, format validation for email/phone, empty field handling, and special characters. One feature becomes 6-10 test cases."

**⭐ Great Answer:**

> "When I see a feature like a contact form, I immediately think 'this needs a suite, not a test.' My systematic approach: First, happy path - TC-001 validates successful submission with all correct data. Second, boundary conditions - if name field max is 50 chars, I test at 0, 1, 49, 50, and 51 characters. If phone field expects 11-21 digits, I test at 10, 11, 21, and 22. Third, format validation - TC-004 tests invalid email formats (no @, missing domain, special chars). TC-005 tests phone format edge cases. Fourth, negative scenarios - TC-006 tests empty required fields. TC-007 tests SQL injection attempts in text fields. TC-008 tests XSS prevention in message field. This demonstrates architect-level thinking: one feature → comprehensive coverage. For the contact form, I identified 6 core test cases immediately, plus 3 optional security tests. A junior writes 1 test; a senior writes a suite. This also ties to requirements traceability - each test case links back to a specific requirement, ensuring nothing is missed and nothing is over-tested."

---

### **Q40: "How do you work with AI coding assistants like Claude Code or GitHub Copilot in your QA workflow?"**

**❌ Bad Answer:**

> "I let AI write all my code for me."

**✅ Good Answer:**

> "I use AI as a senior developer on my team - I define requirements and architecture, the AI generates code following our standards, then I review and refine the output. I act as architect and code reviewer, not as someone who writes every line manually."

**⭐ Great Answer:**

> "My workflow treats AI as a senior developer, not a code generator. Here's the model that works: I act as Product Manager/Architect - I define high-level requirements, decide on architecture, and specify constraints. Claude Code acts as Senior Developer - it explores solutions, designs implementation, and writes code. I then act as Code Reviewer - I verify it meets standards, passes audits, and solves the actual problem. For example, when building ContactPage POM on Day 14, I provided: 'Create POM with name/email/phone/subject/message inputs and submit button, use getByPlaceholder locators, follow CLAUDE.md standards.' Claude Code generated production-ready code in one attempt. I reviewed it, ran it through Gemini audit (our quality gate), and it passed 100%. This is the 2026 workflow - QA Architects who can direct AI effectively are more valuable than those who manually write every line. The skill isn't coding speed anymore; it's architectural thinking, prompt engineering, and knowing how to verify AI output meets quality standards."

---

## Days 14-15: Explicit Prompts, MCP, & Database Verification

### **Q33: "Walk me through how you would approach testing a contact form from scratch."**

**❌ Bad Answer:**

> "I'd just fill out the form and click submit."

**✅ Good Answer:**

> "I'd start by understanding the requirements—what fields are required, what validations exist, what the success message should say. Then I'd create a test suite covering the happy path, boundary testing for field length limits, format validation for email and phone, empty field handling, and special characters. For a contact form, I'd test at least 6-8 scenarios, not just one valid case."

**⭐ Great Answer:**

> "First, I'd examine the requirements to understand expected behavior. For a contact form with name, email, phone, subject, and message fields, I'd design a comprehensive test suite thinking in scenarios, not just one test. My approach: TC-001 validates happy path with all valid data. TC-002 tests boundary conditions—for example, if name field max is 50 characters, I test at 49, 50, and 51. TC-003 validates email format (missing @, invalid domain). TC-004 checks phone format validation. TC-005 tests empty required fields. TC-006 validates special characters. This demonstrates I'm thinking like a QA Architect—one feature becomes a suite of 6+ test cases covering positive, negative, and edge cases. Each test case includes preconditions, test steps, expected results, and postconditions documenting what changed."

---

### **Q34: "Explain the difference between an HTML link and a button in accessibility terms."**

**❌ Bad Answer:**

> "They're the same thing—both are clickable."

**✅ Good Answer:**

> "In HTML, `<button>` elements perform actions on the current page, while `<a>` (anchor) tags navigate to different URLs. Playwright uses the accessibility tree, which reflects this semantic difference. Even if a link is styled to look like a button with CSS, Playwright's `getByRole('button')` won't find it—you need `getByRole('link')`."

**⭐ Great Answer:**

> "This is a critical accessibility distinction. The `<button>` tag represents an action (submit form, open modal, trigger JavaScript), while `<a>` represents navigation to another resource. Developers often make links look like buttons using CSS classes like 'btn btn-primary', but the underlying semantic HTML determines the accessibility role. Playwright reads the accessibility tree—the same information screen readers use—so it correctly identifies a styled link as role='link', not role='button'. I learned this debugging a 'Book now' element that visually appeared as a button but was actually `<a href='/reservation/3' class='btn btn-primary'>`. Using `getByRole('button')` failed because Playwright correctly identified it as a link. This taught me to always inspect the HTML tag in DevTools rather than assume based on visual appearance."

---

### **Q35: "How do you ensure your test assertions validate application behavior, not just tool functionality?"**

**❌ Bad Answer:**

> "I just check that the elements are there."

**✅ Good Answer:**

> "I distinguish between weak assertions that test the automation tool and strong assertions that test the application. For example, after filling a form field, asserting the field contains the typed value just tests that Playwright's fill() method works. Instead, I assert on the application's response—like verifying a success message appears or the next page loads."

**⭐ Great Answer:**

> "I focus on testing application behavior, not tool functionality. Recently I caught this exact issue: my booking search test asserted that the date input field contained the date I typed—essentially testing whether Playwright's `.fill()` method works, which we already know it does. This was a weak assertion. The strong assertion was verifying that after clicking 'Check Availability', the 'Our Rooms' heading became visible, proving the site actually processed the search and displayed results. Every assertion should answer 'Did the application do what users expect?' not 'Did my automation framework work?'. This distinction prevents false confidence where tests pass but the feature is actually broken."

---

### **Q36: "What is Model Context Protocol (MCP) and how do you use it in testing?"**

**❌ Bad Answer:**

> "I don't know what that is."

**✅ Good Answer:**

> "MCP is a protocol that allows AI assistants to connect to external tools and data sources. In testing, I use it to enable AI agents to query databases, access CI/CD logs, and review code repositories. For example, I've set up an MCP SQLite server so Claude can verify database state after E2E tests complete."

**⭐ Great Answer:**

> "Model Context Protocol is an open standard created by Anthropic that allows AI assistants to securely connect to external tools, databases, and APIs. In our QA workflow, I've implemented what we call the 'Database Auditor' pattern using MCP. After our E2E booking test completes and the UI shows 'Booking Confirmed', Claude queries our test database via the MCP SQLite server to verify the booking record was actually created with correct customer details and dates. This catches integration bugs where the UI shows success but the backend transaction failed—common with async operations or API timeouts. The setup involved creating a local SQLite database, installing the MCP server package, and configuring `.mcp.json` with platform-specific settings for Windows. Now I can simply say 'Claude, verify this booking exists in the database' and it autonomously writes SQL, executes the query via MCP, and returns verification results."

---

### **Q37: "How do you handle platform-specific configuration issues in your automation projects?"**

**❌ Bad Answer:**

> "I just use whatever works on my machine."

**✅ Good Answer:**

> "I document platform-specific configurations clearly. For example, when setting up our MCP server on Windows, we discovered that JSON configuration files require `npx.cmd` instead of `npx` because applications spawning background processes bypass the terminal's PATHEXT resolution and communicate directly with Windows OS."

**⭐ Great Answer:**

> "I approach platform-specific issues systematically: identify the root cause, implement the fix, and document it for the team. Recently when configuring our MCP SQLite server on Windows, we encountered failures even though `npx` works fine in terminal commands. After debugging, I learned that when applications spawn processes from JSON config files, they bypass Windows terminal's PATHEXT environment variable which auto-resolves `npx` to `npx.cmd`. Instead, they communicate directly with Windows OS, which requires exact file names. The fix was using `npx.cmd` in `.mcp.json`. I also discovered the official Anthropic package had Windows binary compatibility issues (404 errors), so we switched to the community-maintained `@pollinations/mcp-server-sqlite` package. I documented both issues in our CLAUDE.md so future team members don't waste hours re-debugging. This demonstrates that senior engineers don't just fix problems—they understand root causes and prevent others from hitting the same issues."

---

### **Q38: "Describe your approach to explicit prompt engineering for AI code generation."**

**❌ Bad Answer:**

> "I just tell the AI what I want and it generates code."

**✅ Good Answer:**

> "I use a structured four-section template: Architecture (imports and dependencies), Data (specific locators with exact Playwright methods), Logic (method signatures with types), and Constraints (coding standards to follow). This ensures consistent, production-ready code generation."

**⭐ Great Answer:**

> "After struggling with inconsistent AI-generated code from vague prompts, I established an explicit four-section template that's now our team standard. Architecture defines imports—not just 'import Playwright' but exact: 'Import Locator and Page from @playwright/test'. Data specifies locators using precise Playwright syntax—not 'a button for login' but 'loginButton using getByRole('button', { name: /login/i })'. Logic describes methods with explicit TypeScript types: 'async submitForm(email: string): Promise<void>'. Constraints references our CLAUDE.md standards. For example, when creating our ContactPage POM, the prompt was: 'Architecture: Import Locator and Page. Data: nameInput using getByPlaceholder('Name'). Logic: submitContactForm(name, email, phone, subject, message) that fills all fields and clicks submit. Constraints: Follow CLAUDE.md—readonly locators, Promise<void> returns, no assertions.' This generates production-ready code on the first attempt every time. The key insight: prompting AI is like giving requirements to a senior developer—be explicit about the what, trust them on the how."

---

### **Q39: "How do you verify expert assumptions versus actual application behavior?"**

**❌ Bad Answer:**

> "I trust what experts tell me."

**✅ Good Answer:**

> "I follow a 'trust but verify' approach. Recently two experts told me a Single Page Application required hash routing (`/#/admin`), but when I tested both `/admin` and `/#/admin` myself, I discovered the app uses HTML5 History API and `/admin` works fine. Always verify assumptions through actual testing."

**⭐ Great Answer:**

> "I practice 'trust but verify,' especially for technical assumptions. Recently I had both our architecture expert and my coach tell me to use `/#/admin` for a SPA because 'SPAs always use hash routing.' Instead of blindly implementing this, I tested both URLs myself—navigated to both, inspected the routing behavior, verified which worked. Turns out `/admin` worked perfectly; the app uses HTML5 History API, not hash routing. Both experts made assumptions without checking. This taught me a critical lesson: expert opinions are valuable starting points, but always validate with actual testing. In a real job, this saves time—if I'd written tests with the wrong URL based on expert advice, I'd waste hours debugging when tests failed. The habit of verifying assumptions is what separates senior engineers from juniors. Trust but verify, always."

---

### **Q40: "What certifications do you have relevant to AI-driven testing and QA?"**

**Your Answer (Updated March 2026):**

> "I hold six Anthropic AI certifications earned in March 2026: Claude 101, Claude Code in Action, AI Fluency: Framework & Foundations, Introduction to Model Context Protocol, Introduction to Agent Skills, and Model Context Protocol: Advanced Topics. These certifications demonstrate my expertise in AI-assisted test development, prompt engineering for QA, and orchestrating multiple AI agents in testing workflows. I'm also scheduled to take the ISTQB Foundation Level certification in late April 2026 to solidify my foundational QA knowledge before my job search. This combination of traditional QA certification and cutting-edge AI skills positions me uniquely for 2026 AI-Driven QA roles where the industry is moving toward QA engineers who can architect test strategies and supervise AI agents, not just write every line of code manually."

---

### **Q41: "How do you orchestrate multiple AI agents in your QA workflow?"**

**❌ Bad Answer:**

> "I use one AI tool to help me write code."

**✅ Good Answer:**

> "I work with a multi-AI team: Gemini provides architectural guidance, Claude Code generates implementation, and I act as architect reviewing and approving. Each AI has a specific role based on its strengths."

**⭐ Great Answer:**

> "I use a four-person team model where I act as Product Manager and Architect, orchestrating three AI agents with distinct roles. Gemini acts as Master Architect providing strategic guidance—when we set up database verification, Gemini designed the bookings table schema and explained enterprise MCP patterns. Claude Code acts as Senior Developer executing implementation—it created the SQLite database, installed dependencies, and generated the MCP configuration with platform-specific handling for Windows. My coaching AI provides training context and explains why decisions matter for interviews and job readiness. I direct each agent with clear prompts, validate execution at each step, debug issues when they arise, and make final architectural decisions. For example, during MCP setup, when the official package failed on Windows, I researched alternatives, found the community solution, and directed Claude Code to implement it. This mirrors real enterprise QA where you coordinate with architects, developers, and DevOps—except now some team members are AI agents, allowing 10x faster execution while maintaining senior-level oversight."

---

### **Q42: "Explain your approach to test case design. How do you go from one feature to a complete test suite?"**

**❌ Bad Answer:**

> "I write one test per feature."

**✅ Good Answer:**

> "I think in test suites, not individual tests. For a contact form, I don't just write one 'valid submission' test. I identify multiple scenarios: happy path, boundary testing for field lengths, format validation for email/phone, empty field handling, special characters. One feature becomes 6-10 test cases."

**⭐ Great Answer:**

> "I think in test suites, not individual tests. When I see a feature like a contact form, I immediately think 'this needs a comprehensive suite.' My systematic approach: First, happy path—TC-001 validates successful submission with all correct data. Second, boundary conditions—if name field max is 50 chars, I test at 0, 1, 49, 50, and 51 characters. If phone expects 11-21 digits, I test at 10, 11, 21, and 22. Third, format validation—TC-004 tests invalid email formats (no @, missing domain). Fourth, negative scenarios—empty required fields, SQL injection attempts, XSS prevention. For our recent contact form, I identified 6 core test cases immediately, plus 3 optional security tests. A junior writes 1 test; a senior writes a suite. This also ties to requirements traceability—each test case links back to a specific requirement, ensuring nothing is missed and nothing is over-tested. This is the difference between testing and quality assurance—QA means anticipating all the ways something could fail, not just verifying the happy path works."

---

### **Q43: "How do you work with AI coding assistants like Claude Code or GitHub Copilot in your workflow?"**

**❌ Bad Answer:**

> "I let AI write all my code for me."

**✅ Good Answer:**

> "I use AI as a senior developer on my team—I define requirements and architecture, the AI generates code following our standards, then I review and refine the output. I act as architect and code reviewer, not someone who writes every line manually."

**⭐ Great Answer:**

> "My workflow treats AI as a senior developer, not just a code generator. I act as Product Manager/Architect—I define high-level requirements, decide on architecture, and specify constraints referencing our CLAUDE.md standards. Claude Code acts as Senior Developer—it explores solutions, designs implementation, and writes code. I then act as Code Reviewer—I verify it meets standards, passes our quality gates, and solves the actual problem. For example, when building our ContactPage POM, I provided: 'Create POM with name/email/phone/subject/message inputs and submit button, use getByPlaceholder locators, follow CLAUDE.md standards.' Claude Code generated production-ready code in one attempt. I reviewed it, ran it through our Gemini audit (quality gate), and it passed 100%. This is the 2026 workflow—QA Architects who can direct AI effectively are more valuable than those who manually write every line. The skill isn't coding speed anymore; it's architectural thinking, prompt engineering, and knowing how to verify AI output meets quality standards. In interviews, I demonstrate this by showing our explicit prompt templates and explaining how they consistently generate production-ready code."

---

**Last Updated:** Week 2, Days 14-15 (March 15, 2026)  
**Next Addition:** Days 16-17 (E2E booking suite completion + database verification integration)

---

## API Testing

_Interview questions will be added in Week 4_

---

## AI/ML Testing

_Interview questions will be added in Week 5_

---

## CI/CD & DevOps

_Interview questions will be added in Week 6_

---

## Behavioral Questions

### **Q: Tell me about a time you found a critical bug that others missed.**

**Framework: STAR Method**

- **Situation:** Set the context
- **Task:** Your responsibility
- **Action:** What you did
- **Result:** The outcome

**Example Answer:**

> "At Fiserv (Situation), I was testing a payment processing module before a major release (Task). During exploratory testing, I noticed the system accepted negative dollar amounts in refund fields—something the automated tests missed because they only used positive test data (Action). I documented the issue, worked with developers to add input validation, and updated our test data strategy to include boundary value analysis. This prevented potential financial losses and led to a company-wide review of our test data practices (Result)."

---

## Locator Strategy Questions

### **Q: Walk me through how you choose a locator in Playwright.**

**✅ Good Answer (in your voice):**

> "I follow a priority system. First I look for data-testid attributes — those are built specifically for automation and don't change when the UI gets redesigned. If there's no data-testid, I use getByRole or getByLabel because those are tied to accessibility and are structurally stable. I only fall back to getByPlaceholder or getByText when I have no other option, because placeholder text disappears when you type and copy changes break text-based locators. I stay away from CSS classes and XPath unless I'm absolutely stuck."

**⭐ Story to tell:**

> "Early in my bootcamp I had an AI generate a POM using getByLabel when a data-testid was sitting right there in the HTML. Caught it during audit. That's exactly the kind of thing that causes silent failures six months later when a designer renames a label."

---

### **Q: What's the difference between a card container and the value inside it?**

**✅ Good Answer:**

> "When verifying dashboard data, I always inspect the specific child element that holds the value, not the card wrapper. The wrapper's textContent() returns everything inside it — the title, the number, the subtitle — concatenated. The child element returns just the number. I learned this by inspecting the HTML directly before building the POM, not by guessing."

---

## CI/CD & Pipeline Questions

### **Q: How does your CI/CD pipeline work?**

**✅ Good Answer (in your voice):**

> "Every push to GitHub triggers GitHub Actions, which reads my workflow file and runs the Playwright tests on a fresh Ubuntu server. I have the credentials stored as GitHub Secrets so they're never exposed in the code. After the tests run, Playwright generates a JUnit XML report which gets uploaded to Xray automatically — so test results appear in Jira without any manual work."

---

### **Q: Tell me about a CI/CD problem you solved.**

**✅ Your story:**

> "During my bootcamp I set up a GitHub Actions pipeline and it kept failing even though tests passed locally. Turned out dotenv was installed on my machine but never added to package.json. GitHub runs npm ci which installs strictly from package.json — so the package didn't exist on the server. Classic 'works on my machine' problem. I fixed it with npm install dotenv --save and the pipeline went green."

---

### **Q: What's the difference between a native dropdown and a custom combobox in Playwright?**

**✅ Good Answer:**

> "Native HTML select elements use selectOption() — one line. Custom comboboxes like Radix UI need two steps: click the trigger to open it, then getByRole('option') to select the item. I always inspect the HTML first. If I see a button with role='combobox', I know it's custom and selectOption() won't work."

---

## Red Flags to Avoid

### **❌ DON'T Say:**

1. **"I never write flaky tests"**
   - Every QA has written flaky tests. Show you know how to fix them.

2. **"I always prefer UI testing over API testing"**
   - Shows lack of test pyramid understanding.

3. **"I don't need to understand the code, I just test"**
   - 2026 QA roles require technical depth.

4. **"AI will replace manual testing"**
   - Shows naivety. AI augments, doesn't replace.

5. **"I've never had a test fail in CI/CD"**
   - Unrealistic. Show you troubleshoot pipeline failures.

### **✅ DO Say:**

1. **"I've debugged flaky tests using..."**
   - Trace viewer, headed mode, network logs

2. **"I follow the test pyramid: unit, API, UI"**
   - Shows strategic thinking

3. **"I review developers' code to understand testability"**
   - Demonstrates collaboration

4. **"I use AI to generate test scaffolding, then refine it"**
   - Shows AI-augmented workflow

5. **"I've improved CI/CD reliability by..."**
   - Parallel execution, retry logic, better waits

---

## Interview Preparation Tips

### **Before the Interview:**

1. **Review your portfolio projects** (we'll build 3 during bootcamp)
2. **Prepare 3 STAR stories** (bugs found, automation wins, team conflicts)
3. **Know the company's tech stack** (check their job posting)
4. **Have questions ready** (about their QA culture, tools, AI strategy)

### **During Technical Interviews:**

1. **Think out loud** (interviewers want to see your thought process)
2. **Ask clarifying questions** (shows critical thinking)
3. **Start with the simplest solution** (optimize later)
4. **Admit when you don't know** (but explain how you'd find out)

### **Red Flags in the Company:**

1. **"We don't have time for automation"**
2. **"QA finds bugs at the end"** (waterfall mindset)
3. **"We don't use version control for tests"**
4. **"Our tests are too flaky to trust"**

---

## Week-by-Week Interview Prep Goals

- **Week 1:** Master async/await explanation
- **Week 2:** Explain POM benefits and trade-offs
- **Week 3:** Discuss AI-augmented testing workflow
- **Week 4:** Describe API testing strategy
- **Week 5:** Explain Judge LLM approach
- **Week 6:** Walk through CI/CD pipeline design
- **Week 7:** Discuss mobile/a11y testing strategy
- **Week 8:** Full mock interview (live coding + behavioral)

---

**Last Updated:** Week 1, Day 5  
**Next Addition:** Day 6 - TypeScript interview questions
