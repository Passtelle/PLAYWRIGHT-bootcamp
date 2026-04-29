# 📚 Daily Lesson Log

**Bootcamp:** AI-Driven QA Architect Training  
**Student:** Senior QA Engineer (15 years experience)

---

## Week 1: Foundation & Async Mastery

---

### **Day 1: The Async/Await Truth**

**Date:** Week 1, Day 1  
**Duration:** 2 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objective**

Understand why `async/await` exists and how it prevents race conditions in browser automation.

#### **🧠 The Mental Model**

**Old (Wrong) Mental Model:**

```
await = "pause until page loads"
```

**New (Correct) Mental Model:**

```
await = "pause until THIS SPECIFIC ACTION finishes"
```

#### **💡 Key Concept: Promises**

Every Playwright action returns a **Promise**:

- `page.goto()` → "I promise to navigate and tell you when done"
- `page.click()` → "I promise to click and tell you when clicked"
- `page.fill()` → "I promise to type and tell you when typing is done"

**`await` means:** "Stop my script until this promise is fulfilled."

#### **🔍 The Analogy**

It's like ordering at a restaurant:

**Without await (chaos):**

1. "I'll have a burger" ← Walk away immediately
2. "I'll have fries" ← Before chef even hears you
3. "I'm ready to pay" ← Food hasn't been made
4. Leave restaurant ← Starve

**With await (correct):**

1. "I'll have a burger" → **Wait for chef to confirm**
2. "I'll have fries" → **Wait for chef to confirm**
3. "I'm ready to pay" → **Wait for bill**
4. Leave restaurant → **With food**

#### **🧪 Experiment: Breaking Code on Purpose**

```typescript
import { test } from "@playwright/test";

test("Understanding Await - Broken Version", async ({ page }) => {
  // 🗒️ THE PLAN
  const url: string = "https://ecommerce-playground.lambdatest.io/";

  // 🎬 THE WORK (INTENTIONALLY BROKEN)
  page.goto(url); // ← NO await = doesn't wait
  page.click('a[href*="login"]'); // ← Page not loaded yet!

  console.log("Test finished!");
});
```

**What happens:**

- Browser flashes open and closes instantly
- No actions execute because script doesn't wait

#### **✅ Fixed Version**

```typescript
import { test } from "@playwright/test";

test("Understanding Await - Fixed Version", async ({ page }) => {
  // 🗒️ THE PLAN
  const url: string = "https://ecommerce-playground.lambdatest.io/";

  // 🎬 THE WORK (CORRECT)
  await page.goto(url); // ← Wait for navigation
  await page.click('a[href*="login"]'); // ← Wait for click

  // ✅ THE CHECK
  console.log("Test finished!");
});
```

#### **📝 Practice Exercise**

**Find the 7 bugs in this code:**

```typescript
import { test, expect } from "@playwright/test";

test("login test", () => {
  page.goto("https://example.com/login");
  page.fill("#username", "testuser");
  page.fill("#password", "password123");
  page.click('button[type="submit"]');

  expect(page.locator(".welcome-message")).toBeVisible();
});
```

**Bugs to find:**

1. Missing `async` keyword in test function
2. Missing `{ page }` parameter
3. Missing `await` on `page.goto()`
4. Missing `await` on first `page.fill()`
5. Missing `await` on second `page.fill()`
6. Missing `await` on `page.click()`
7. Missing `await` on `expect()` assertion

**Corrected version:**

```typescript
import { test, expect } from "@playwright/test";

test("login test", async ({ page }) => {
  // ← Added async and { page }
  await page.goto("https://example.com/login"); // ← Added await
  await page.fill("#username", "testuser"); // ← Added await
  await page.fill("#password", "password123"); // ← Added await
  await page.click('button[type="submit"]'); // ← Added await

  await expect(page.locator(".welcome-message")).toBeVisible(); // ← Added await
});
```

#### **🎤 Interview Question Preview**

**Q:** "What's the difference between `async` and `await`?"

**Bad Answer:**

> "Await makes the script wait for the page to load."

**Good Answer:**

> "In Playwright, every browser action returns a Promise. `async` marks the function as capable of handling promises. `await` pauses execution until a specific promise resolves. Without `await`, JavaScript would fire all commands simultaneously without waiting for completion, causing race conditions."

**Great Answer:**

> "Async/await is JavaScript's way of handling asynchronous operations synchronously. In testing, this is critical because browser actions aren't instant—clicking a button might trigger network calls, animations, or DOM updates. `await` ensures each step completes before the next begins, preventing flaky tests caused by timing issues."

#### **✅ Completion Checklist**

- [ ] Understand why each Playwright action needs `await`
- [ ] Can explain the Promise concept in your own words
- [ ] Found all 7 bugs in the practice exercise
- [ ] Can answer the interview question confidently

---

### **Day 2: TypeScript Basics & Your First Loop**

**Date:** Week 1, Day 2  
**Duration:** 4 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Understand `const` vs `let` (immutable vs mutable variables)
2. Master the Trinity structure: Locator → Action → Assertion
3. Understand arrays (`string[]` = multiple text values)
4. Write your first `for` loop to test with multiple users

#### **🧠 Key Concepts Learned**

**Variables: const vs let**

```typescript
const baseURL: string = "https://example.com"; // ← Can't change
let userName: string = "Alice"; // ← Can change later
userName = "Bob"; // ← This works!
```

**The Trinity Framework:**

- **Locator** = Find the element (e.g., `page.getByRole('button')`)
- **Action** = Do something (e.g., `.click()`, `.fill()`, `.goto()`)
- **Assertion** = Validate result (e.g., `expect(...).toBeVisible()`)

**Important:** Not every test follows Locator→Action→Assertion in that order. You can mix them:

- `page.goto()` = **Action** (not a locator!)
- Then Locator→Action→Assertion for form interactions

**Arrays:**

```typescript
const users: string[] = ["Alice", "Bob", "Charlie"]; // ← Multiple values
```

**Your First Loop:**

```typescript
for (const userName of users) {
  // This code runs 3 times, once for each user
  await page.getByPlaceholder("First Name").fill(userName);
}
```

#### **💡 Key Insight: Unique Emails**

You discovered why we need unique emails for each registration:

```typescript
const userEmail: string = `${userName.toLowerCase()}_${Date.now()}@test.com`;
```

**For Alice:**

- `userName.toLowerCase()` = "alice"
- `Date.now()` = 1770414802280 (unique timestamp)
- Result: `alice_1770414802280@test.com`

**For Bob:**

- Result: `bob_1770414802999@test.com` (different timestamp!)

#### **🛠️ Practical Exercise: Loop Test**

**File created:** `tests/bootcamp/day2_loop_users.spec.ts`

This test registers 3 users (Alice, Bob, Charlie) using a `for` loop, demonstrating:

- How loops reduce code repetition
- How to create unique data per iteration
- How to structure tests with CLAUDE.md format (PLAN, WORK, CHECK)

#### **🤝 Working with Claude Code**

**Learned how to prompt Claude Code effectively:**

**Good prompt structure:**

```
claude create a test file at [path] that [does what].
Fill these fields:
- Field 1 (with what data)
- Field 2 (with what data)
Then [action]. Verify [expected result].
Follow CLAUDE.md format.
```

**Key insight:** More specific prompts = better generated code, but Claude Code is smart enough to fill in reasonable defaults.

#### **📚 Modern Test Management Tools**

**Discovered the 2026 QA ecosystem:**

**Top 3 Tools:**

1. **Jira + Xray** (most popular, 10,000+ customers)
2. **Jira + Zephyr** (close second, 70+ reports)
3. **TestRail** (standalone or Jira plugin)

**Key workflow:**

1. Write test cases in Jira/Xray (not Excel!)
2. Link test cases → User Stories → Requirements
3. Execute tests (manual or automated Playwright)
4. Log defects in Jira
5. Track test coverage
6. Generate reports for stakeholders

**When we'll learn this:** Week 6 (Jira/Xray integration with CI/CD)

**Old tools are dead:** Mercury suite (QC/QTP/LoadRunner) replaced by Jira ecosystem

#### **✅ Completion Checklist**

- [x] Understand const vs let
- [x] Master the Trinity (Locator/Action/Assertion)
- [x] Understand arrays (`string[]`)
- [x] Write first loop test
- [x] Learn to prompt Claude Code effectively
- [x] Understand modern test management ecosystem

#### **🎤 Interview Prep from Day 2**

**Q: "How do you manage test cases and defects?"**

**Good Answer:**

> "I use Jira with Xray for test case management. I write test cases in Xray, link them to user stories for traceability, execute them either manually or through automated Playwright scripts, and track defects directly in Jira. This gives full visibility from requirements through test execution to defect resolution."

**Q: "How would you test registration with multiple users?"**

**Good Answer:**

> "I'd use a data-driven approach with a loop. I'd create an array of test users, then iterate through them with a for loop. For each user, I'd generate unique data like email addresses using timestamps to avoid conflicts. This reduces code duplication and makes the test maintainable."

---

### **Day 3: Loops with for...of & Strict Mode**

**Date:** Week 1, Day 3  
**Duration:** 3 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Master the `for...of` loop pattern for iterating through arrays
2. Understand Playwright's Strict Mode and when to use `.first()`
3. Debug locator errors independently using error messages
4. Apply CLAUDE.md standards without prompting

#### **🧠 The Mental Model**

**The for...of Pattern:**

```typescript
const productList: string[] = ['iPhone', 'MacBook', 'iPad'];
      ↑ plural (the collection)

for (const product of productList) {
           ↑ singular (one item at a time)

  // Use 'product' here (not 'productList')
  await page.fill(product);
}
```

**Key Rule:** Array name = plural, loop variable = singular

#### **💡 Key Concept: Strict Mode**

**The Problem:**

```typescript
await page.getByPlaceholder("Search For Products").fill(product);
// ❌ Error: strict mode violation: getByPlaceholder('Search For Products')
// resolved to 2 elements
```

**What happened:**

- The page has 2 search boxes (header + footer/mobile)
- Playwright doesn't know which one to use
- **Strict Mode** = Playwright refuses to guess

**The Solution:**

```typescript
await page.getByPlaceholder('Search For Products').first().fill(product);
                                                    ↑
                                            "Use the first one you find"
```

**From CLAUDE.md:**

> **Lists:** If a locator returns multiple items, use `.first()` or `.nth()` explicitly to handle Strict Mode.

#### **🔍 Real Debugging Session**

**Error encountered:**

```
Error: strict mode violation: getByPlaceholder('Search For Products')
resolved to 2 elements:
1) <input value="" type="text" name="search" ...>
2) <input value="" type="text" name="search" ...>
```

**Your debugging process:**

1. ✅ Read the error message carefully
2. ✅ Understood "2 elements" means multiple matches
3. ✅ Remembered CLAUDE.md rule about `.first()`
4. ✅ Applied the fix independently
5. ✅ Questioned the coach when contradictory info was given

**This is senior-level debugging!** 🏆

#### **🛠️ Code Created**

**File:** `tests/bootcamp/day3_search_products.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test("Search for Multiple Products", async ({ page }) => {
  // 🗒️ THE PLAN
  const baseURL: string = "https://ecommerce-playground.lambdatest.io/";
  const productList: string[] = ["iPhone", "MacBook", "iPad"];

  // 🎬 THE WORK
  for (const product of productList) {
    await page.goto(baseURL);
    await page.getByPlaceholder("Search For Products").first().fill(product);
    await page.getByPlaceholder("Search For Products").first().press("Enter");

    // ✅ THE CHECK
    await expect(page).toHaveTitle(/Search/i);
    const resultCount = await page.getByRole("heading", { level: 4 }).count();
    expect(resultCount).toBeGreaterThan(0);

    console.log(`✅ Found ${resultCount} results for ${product}`);
  }
});
```

#### **🎤 Interview Question from Day 3**

**Q: "What is Playwright's Strict Mode and why does it exist?"**

**Good Answer:**

> "Strict Mode is Playwright's safety feature that prevents ambiguous element selection. If a locator matches multiple elements, Playwright throws an error instead of guessing which one to interact with. This prevents flaky tests caused by selecting the wrong element. To handle it, I use `.first()`, `.last()`, or `.nth(index)` to explicitly specify which element I want."

**Q: "How do you debug a failing Playwright test?"**

**Good Answer:**

> "I start by reading the error message carefully—Playwright's errors are very descriptive. For locator issues, I check if the element exists, if there are multiple matches (strict mode), or if I'm using the right selector. I use `.first()` for multiple matches, add waits for timing issues, and run tests in headed mode to visually debug. I also check the trace viewer for detailed step-by-step execution."

#### **✅ Completion Checklist**

- [x] Understand `for...of` loop pattern completely
- [x] Know when and why to use `.first()`
- [x] Can debug Strict Mode errors independently
- [x] Created working search test with loop
- [x] Applied CLAUDE.md standards from memory

---

### **Day 4: Loop Mastery & Git Workflow**

**Date:** Week 1, Day 4  
**Duration:** 4 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Write loops from memory without looking at examples
2. Master Style A naming convention (clear, readable variable names)
3. Learn Git daily workflow (status → add → commit → push)
4. Distinguish between `: string` vs `: string[]` (type syntax)

#### **🧠 Key Concept: Style A Naming**

**The Problem with Similar Names:**

```typescript
const products: string[] = ['iPhone', 'MacBook'];
for (const product of products) {
           ↑ singular    ↑ plural
  // Too similar! Hard to remember which is which
}
```

**Style A Solution (Clearer):**

```typescript
const productList: string[] = ['iPhone', 'MacBook'];
      ↑ Obviously the collection

for (const item of productList) {
           ↑ Obviously one thing
  await page.fill(item);
}
```

**Alternative Style A patterns:**

- `emailList` / `email`
- `passwordList` / `pwd`
- `userList` / `user`

**Why Style A matters:**

- Easier to remember which is the array
- Clearer when reading code months later
- Reduces mental load during interviews

#### **💡 Loop Exercise: Phone Validation**

**Challenge:** Test registration form with 3 invalid phone numbers

**Your first attempt (95% correct):**

```typescript
const phoneNumberList: string = ['123', 'abcdefghij', '999-999-9999'];
                         ↑
                    Missing []!

for (const phoneNumber of phoneNumberList) {
  await page.getByPlaceholder('Telephone').fill(phoneNumber);  // ✅ Correct!
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText(/invalid/i)).toBeVisible();
}
```

**The ONE mistake:** Forgot `string[]` (array syntax)

**Corrected:**

```typescript
const phoneNumberList: string[] = ["123", "abcdefghij", "999-999-9999"];
//                     ↑↑ Added brackets!
```

**Your insight:**

> "I know it, I just forgot."

**That's the difference between:**

- ❌ "I don't understand" (need to learn)
- ✅ "I forgot the syntax" (need more reps) ← **You're here!**

#### **🔧 Git Daily Workflow**

**The 4-Command Pattern:**

```bash
# 1. Check what changed
git status

# 2. Stage your changes
git add .

# 3. Save with description
git commit -m "Day 4: Practice loops and clean up old test files"

# 4. Upload to GitHub
git push origin main
```

**What each command does:**

**`git status`**

- Shows modified, new, and deleted files
- Like checking your shopping cart before checkout

**`git add .`**

- Stages ALL changes for commit
- The `.` means "everything in this directory"

**`git commit -m "message"`**

- Takes a snapshot with a label
- Message should be clear and descriptive

**`git push origin main`**

- Uploads to GitHub
- `origin` = your GitHub repo
- `main` = the branch you're pushing to

#### **📝 Good Commit Messages**

**Format:** `[What you did]: [Brief description]`

**Good examples:**

- ✅ `"Day 4: Practice loops and clean up old test files"`
- ✅ `"Fix: Add .first() to handle multiple search inputs"`
- ✅ `"Feature: Add login test with 3 users"`

**Bad examples:**

- ❌ `"updates"`
- ❌ `"fixed stuff"`
- ❌ `"asdfasdf"`

**Why it matters:** Interviewers look at your GitHub commit history!

#### **🎤 Interview Questions from Day 4**

**Q: "Walk me through your typical Git workflow."**

**Good Answer:**

> "I start each day with `git status` to see what's changed. Then I use `git add` to stage my files—either specific files or `git add .` for everything. I commit with a descriptive message using `git commit -m`, following the pattern 'What I did: Brief description'. Finally, I push to GitHub with `git push origin main`. I commit frequently—after each meaningful change—so I have a clear history of my work."

**Q: "What's the difference between `string` and `string[]` in TypeScript?"**

**Good Answer:**

> "`string` is a type for a single text value, like `'Alice'`. `string[]` is a type for an array of text values, like `['Alice', 'Bob', 'Charlie']`. The brackets indicate it's a collection. This distinction is important because trying to assign an array to a `string` type will cause a TypeScript error at compile time, catching bugs before the code runs."

#### **✅ Completion Checklist**

- [x] Can write loops from memory (90%+ accuracy)
- [x] Understand Style A naming convention
- [x] Know Git 4-command workflow
- [x] Understand `string` vs `string[]`
- [x] Can write good commit messages

---

### **Day 5: Git Branches & TypeScript Explicit Types**

**Date:** Week 1, Day 5  
**Duration:** 5 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Understand the difference between repository and branch
2. Create and push a feature branch to GitHub
3. Master TypeScript explicit types (`: string`, `: number`, `: Locator`)
4. Understand what "infer" means and why explicit is better

#### **🧠 Git Concepts: Repository vs Branch**

**Repository = The Entire Project**

```
PLAYWRIGHT-bootcamp (Repository)
│
├── main (Branch)
│   └── Stable code
│
└── day5-typescript-practice (Branch)
    └── Experimental work
```

**Think of it as:**

- Repository = The filing cabinet
- Branches = Different drawers in the same cabinet

**Both branches share the SAME repository!**

#### **🔧 Creating Your First Branch**

**The workflow:**

```bash
# 1. Check current branch
git branch
# Output: * main

# 2. Create new branch and switch to it
git checkout -b day5-typescript-practice
# Creates branch locally

# 3. Make changes, commit
git add .
git commit -m "Day 5: Practice TypeScript loops on feature branch"

# 4. Push branch to GitHub (first time)
git push -u origin day5-typescript-practice
#       ↑ Creates branch on GitHub and links it
```

**Key commands:**

- `git checkout -b [name]` = Create + switch to branch
- `git push -u origin [name]` = Push new branch to GitHub
- `git branch` = See all branches

**Why branches matter:**

- ✅ `main` stays clean and stable
- ✅ You experiment safely on feature branches
- ✅ You can work on multiple features simultaneously
- ✅ Real jobs NEVER work directly on `main`

#### **💡 TypeScript: Explicit vs Inferred Types**

**What "Infer" Means:**

- **Infer = Figure out automatically**
- TypeScript looks at the value and guesses the type

**Example:**

```typescript
// TypeScript infers this is a string
const userName = "Alice";
// Hover in VS Code → shows: const userName: string

// TypeScript infers this is a number
const userAge = 25;
// Hover in VS Code → shows: const userAge: number
```

**Why Explicit is Better:**

**1. Catches Errors Earlier**

```typescript
// Implicit (inferred):
const userList = ["Alice", "Bob"];
userList.push(123); // ❌ No error! TypeScript thinks this is ok

// Explicit:
const userList: string[] = ["Alice", "Bob"];
userList.push(123); // ✅ RED ERROR in VS Code immediately!
```

**2. Makes Intent Clear**

```typescript
// Implicit:
const data = getData(); // What type is this??? 🤔

// Explicit:
const data: string[] = getData(); // Ah! Array of strings! ✅
```

**3. Better Autocomplete**

```typescript
// Explicit:
const searchBox: Locator = page.getByRole('button');
searchBox.  // ← VS Code shows .click(), .fill(), .isVisible()
```

#### **📊 TypeScript Type Reference**

| Type       | What It Means                | Example Value              |
| ---------- | ---------------------------- | -------------------------- |
| `string`   | One text value               | `'Alice'`                  |
| `number`   | A number                     | `99`                       |
| `boolean`  | True or false                | `true`                     |
| `string[]` | Array of text                | `['a', 'b']`               |
| `number[]` | Array of numbers             | `[1, 2, 3]`                |
| `Locator`  | Playwright element reference | `page.getByRole('button')` |
| `Page`     | Browser page/tab             | `page`                     |
| `RegExp`   | Text pattern                 | `/error/i`                 |

#### **✅ Your Quiz Results (100% Correct!)**

**Question:** Which are correct?

```typescript
A) const price: number = '99';        // ❌ String assigned to number
B) const price: number = 99;          // ✅ Correct!
C) const emailList: string = ['a'];   // ❌ Array assigned to string
D) const emailList: string[] = ['a']; // ✅ Correct!
```

**You answered:** B and D ✅

**Your understanding:** Perfect! You know:

- Text with quotes = `string`
- Number without quotes = `number`
- Multiple values need `[]` for array type

#### **🎤 Interview Questions from Day 5**

**Q: "When do you use explicit types vs letting TypeScript infer them?"**

**Good Answer:**

> "My coding standard is to always use explicit types for clarity and error prevention. While TypeScript can infer simple types like `string` or `number` from values, being explicit catches type mismatches at compile time. For Playwright elements like Locators, explicit typing is required because TypeScript can't infer correctly. Explicit types also improve code readability and provide better IDE autocomplete support."

**Q: "Explain your Git branching strategy."**

**Good Answer:**

> "I never work directly on main. For each new feature or test suite, I create a feature branch using `git checkout -b feature-name`. I commit my changes to that branch, push it to GitHub with `git push -u origin feature-name`, and later merge it back to main through a pull request. This keeps main stable and allows me to work on multiple features in parallel without conflicts."

**Q: "What's the difference between a Git repository and a Git branch?"**

**Good Answer:**

> "A repository is the entire project—all the code, commits, and history. It's like the whole filing cabinet. Branches are different versions within that repository—like different drawers in the same cabinet. The `main` branch typically holds production-ready code, while feature branches hold work in progress. Both branches exist in the same repository and share the same history up to the point where they diverged."

#### **✅ Completion Checklist**

- [x] Created first Git feature branch
- [x] Pushed branch to GitHub successfully
- [x] Understand repository vs branch concept
- [x] Master TypeScript explicit types
- [x] Know when to use `string` vs `string[]`
- [x] Understand "infer" and why explicit is better
- [x] Can explain Git workflow in interviews

#### **🏆 Week 1 Achievement Unlocked**

**You made a disciplined decision:**

- Postponed Moltbook bot side project
- Stayed focused on bootcamp deadline
- Recognized distraction vs urgent work

**This shows professional maturity!** 💪

---

### **Day 6: Fill-in-Blanks Mastery & Claude Code Introduction**

**Date:** Week 1, Day 6  
**Duration:** 9 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Master fill-in-blank exercises (building code fluency)
2. Generate first test using Claude Code
3. Understand professional vs simplified coding approaches
4. Learn Locator variables (Architect approach)

#### **🧠 Key Concepts Learned**

**Professional Code Structure:**

```typescript
// Simplified approach (what I taught Week 1-5):
await page.getByPlaceholder("Search").fill("iPhone");

// Professional approach (Claude Code + CLAUDE.md):
const searchInput: Locator = page.getByPlaceholder("Search").first();
await searchInput.fill("iPhone");
```

**Why Professional is Better:**

- ✅ More readable
- ✅ Reusable if you interact with element multiple times
- ✅ Matches CLAUDE.md standards
- ✅ What senior QAs write

#### **💡 Key Insight: Learning Style Clarity**

**What works for you:**

1. See complete working examples
2. Fill in strategic blanks
3. Modify existing code
4. Repeat 5-10 times for muscle memory

**What DOESN'T work:**

- ❌ Writing from blank slate too early
- ❌ Rushing through concepts
- ❌ Short 30-40 min sessions

**Revised timeline:** TypeScript fluency = 4-6 weeks of daily practice, not 1 week

#### **🛠️ First Claude Code Experience**

**Prompt given:**

```
claude create a test at tests/bootcamp/day6_claude_code_practice.spec.ts

Test should:
- Navigate to https://ecommerce-playground.lambdatest.io/
- Search for "MacBook"
- Click the search button
- Verify the page title contains "Search"

Follow CLAUDE.md standards.
```

**What Claude Code generated:**

- ✅ Perfect CLAUDE.md compliance (100/100 from Gemini)
- ✅ Used `Locator` variables
- ✅ Included `.first()` for Strict Mode
- ✅ Used `RegExp` with `/i` flag
- ✅ Proper 3-section structure

**Revelation:** Claude Code follows standards perfectly. The coach (Claude/me) was teaching simplified shortcuts instead of professional standards.

#### **🔍 Confusion Identified**

**The problem:**

- Started learning with Gemini (professional, clean)
- Switched to Claude coach (simplified, shortcuts)
- Created cognitive dissonance

**The gap:**

> "I can't believe we ask Claude Code to follow our 'strict Mode', and you didn't."

**Valid criticism:** Standards were created by Gemini, placed in CLAUDE.md for everyone to follow, but coaching examples didn't match the standards.

#### **📊 TypeScript Type Reference Learned**

| Type      | Meaning            | Example                    |
| --------- | ------------------ | -------------------------- |
| `string`  | Single text value  | `'Alice'`                  |
| `number`  | Numeric value      | `99`                       |
| `Locator` | Playwright element | `page.getByRole('button')` |
| `RegExp`  | Text pattern       | `/Search/i`                |
| `Page`    | Browser page       | `page`                     |

#### **✅ Completion Checklist**

- [x] Completed 3 fill-in-blank exercises (Test 1: 99%, Test 2: 100%, Test 3: 100%)
- [x] Generated first test with Claude Code
- [x] Learned Locator variable pattern
- [x] Understood explicit typing importance
- [x] Identified teaching approach mismatch
- [x] Made disciplined decision to focus on bootcamp (postponed Moltbook bot)

---

### **Day 7: Week 1 Checkpoint & POM Introduction**

**Date:** Week 1, Day 7  
**Duration:** 5 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Complete Week 1 review quiz
2. Attempt code modification exercises
3. Discover Arena.ai for AI comparison
4. Research QA interview trends (audit interviews)
5. Decide on Architect vs Junior learning path

#### **📝 Week 1 Review Quiz Results**

**Quiz Score: 82.7/100** (A-)

**Question Breakdown:**

1. Async/await fundamentals - 100/100 ✅
2. TypeScript types (string[]) - 100/100 ✅
3. Loops & iterations - 100/100 ✅
4. Playwright Strict Mode - 40/100 ⚠️
5. Git workflow - 100/100 ✅
6. Git branches - 100/100 ✅
7. Explicit types - 99/100 ✅
8. RegEx patterns - 85/100 ✅
9. Code auditing - 20/100 (found 2/10 bugs)

**Critical Gap Identified:**

> "We never reviewed error messages, and I don't know any error messages."

**Action:** Added "Error Message Reading" to Week 2, Day 8

#### **💡 Key Realizations**

**About Learning Progress:**

> "I'm starting to remember the variables, the loop, and how a script works in general. I learned a lot, actually, but don't remember much."

**Week 1 Success Metrics:**

- ✅ Understands async/await concepts
- ✅ Knows TypeScript basic types
- ✅ Can write loops with 90%+ accuracy
- ✅ Masters Git daily workflow
- ✅ Can READ and UNDERSTAND code
- ⏳ Code auditing (2/10 bugs found - Week 1 baseline)
  **By Week 8 Goal:** Find 8-10 bugs in AI-generated code within 30 minutes

---

### **Day 8: Page Object Model (POM) Deep Dive**

**Date:** Week 2, Day 8  
**Duration:** 8 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Understand what POM is and WHY it exists
2. Learn HTML-to-TypeScript correlation
3. Master Playwright locator priority (Gold/Silver/Bronze)
4. Create first POM with Claude Code
5. Understand constructor, readonly, properties vs methods

#### **🧠 The Problem POM Solves**

**Without POM:**

- Same locators repeated in 50 different tests
- UI change = fix 50 files
- Hard to maintain
- Code duplication everywhere

**With POM:**

- Locators stored in ONE class
- UI change = fix ONE file
- All tests still work
- Reusable, maintainable code

**Real-world example:**

```typescript
// Without POM (BAD):
test("login 1", async ({ page }) => {
  await page.getByPlaceholder("E-Mail Address").fill("test@test.com");
  await page.getByPlaceholder("Password").fill("pass123");
  await page.getByRole("button", { name: "Login" }).click();
});

test("login 2", async ({ page }) => {
  await page.getByPlaceholder("E-Mail Address").fill("user@user.com");
  // Same locators repeated... 50 times!
});

// With POM (GOOD):
test("login 1", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("test@test.com", "pass123");
});

test("login 2", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("user@user.com", "pass456");
});
```

#### **💡 HTML-to-TypeScript Correlation**

**The flow:**

```
Browser (HTML elements) ← Playwright API ← Your TypeScript code
```

**Example:**

```html
<!-- HTML in browser: -->
<input placeholder="E-Mail Address" />
```

```typescript
// TypeScript code:
await page.getByPlaceholder("E-Mail Address").fill("test@test.com");

// What happens:
// 1. Playwright looks at browser HTML
// 2. Finds the input with placeholder="E-Mail Address"
// 3. Types the email into it
```

**When HTML changes, your test breaks:**

```html
<!-- Developer changes to: -->
<label>Email</label>
<input id="email" />
```

```typescript
// Now you must update your locator:
await page.getByLabel("Email").fill("test@test.com");
```

**With POM: Update ONE place, all tests work!**

#### **🥇 Playwright Locator Priority (Gold/Silver/Bronze)**

**Gold Standard (ALWAYS prefer these):**

- `getByRole()` - Semantic, accessible, resilient
- `getByLabel()` - For form inputs with labels
- `getByPlaceholder()` - For inputs with placeholders
- `getByText()` - For visible text

**Silver Standard (Use if Gold doesn't work):**

- `getByTestId()` - Requires developers to add test IDs

**Bronze Standard (AVOID unless absolutely necessary):**

- CSS selectors - Brittle, breaks easily
- XPath - Very brittle, hard to read

**Why Gold is better:**

- User-visible (if user can't find it, test shouldn't either)
- Resilient to CSS/class changes
- Accessible (good for screen readers = good for tests)

#### **🏗️ POM Structure - LoginPage.ts**

**Created with Claude Code:**

```typescript
import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  // 🏗️ THE PLAN (Locators & Page Reference)
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
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

**Line-by-line breakdown:**

**Properties (Lines 5-8):**

- `readonly` = Cannot be changed after constructor sets them
- Stores: page reference, locators for email/password/button

**Constructor (Lines 10-14):**

- Runs automatically when you create `new LoginPage(page)`
- Initializes all locators using Gold standard methods
- Stores page reference for later use

**Methods (Lines 17-21):**

- `login()` = User action (fill fields, click button)
- Takes parameters (email, password)
- `Promise<void>` = Async function, returns nothing

#### **📊 Key Concepts Learned**

**Constructor:**

- Runs automatically when class is instantiated
- Sets up all locators
- Takes `page: Page` as parameter

**readonly:**

- Properties cannot be reassigned
- Prevents accidental bugs
- Set once in constructor, never changed

**Properties vs Methods:**

- **Property** = Stores something (locator, data, reference)
- **Method** = Does something (action, function)
- Example: `emailInput` (property) vs `login()` (method)

**Promise<void>:**

- Async function that returns nothing
- Used for actions (click, fill, etc.)

#### **🎯 Real-World Job Task Breakdown (Discovered)**

**What you'll ACTUALLY do as QA Architect:**

- **35% Verification & Auditing** - Review AI-generated code, find bugs
- **30% System Architecture** - Design test frameworks, POM structure
- **25% Prompt Engineering** - Direct AI tools to generate code
- **10% Writing Syntax** - Least important skill!

**This changes everything about learning priorities!**

#### **🤝 AI Team Roles Defined**

**The 4-Person Team:**

1. **You (Human Architect):** Director, final decision maker
2. **Claude Code (Builder):** Generates TS/Playwright code
3. **Claude AI (Teacher):** Explains concepts, provides lessons
4. **Gemini (Master Judge):** Audits against CLAUDE.md standards

**🔥 Critical First-Day-on-Job Tip (Gemini):**

> "Before writing ANY code, tell Claude Code: 'Read all the existing tests in this repository to learn our standard locator strategies before you write anything.'"

This ensures consistency with company patterns.

#### **💼 Career Progress: 2nd Recruiter Contact**

**Position:** Senior QA Engineer at Tirios (Web3 Real Estate Platform)
**Rate:** $50-$100/hour ($104k-$208k/year)
**Type:** Remote, Full-time/Part-time/Contract

**Requirements match bootcamp:**

- ✅ Playwright automation
- ✅ API testing (Postman)
- ✅ React frontend testing
- ✅ CI/CD pipelines
- ✅ Jira
- ✅ 5+ years experience (You have 15!)

**Skills to add:**

- Web3/blockchain testing (new, but learnable)
- Smart contract interaction testing

**Timeline:** Interview-ready in 6-8 weeks!

#### **✅ Completion Checklist**

- [x] Understood POM purpose (maintainability)
- [x] Learned HTML-to-TS correlation
- [x] Mastered Gold/Silver/Bronze locator standards
- [x] Created first POM with Claude Code (LoginPage.ts)
- [x] Understood constructor function
- [x] Understood readonly properties
- [x] Differentiated properties vs methods
- [x] Defined AI team roles
- [x] Received recruiter interest (validation!)

---

### **Day 9: Multi-POM Architecture & YAGNI Principle**

**Date:** Week 2, Day 9  
**Duration:** 10.5 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Create ProductPage POM using YAGNI principle
2. Build multi-POM tests (chaining POMs together)
3. Master Architect prompt template
4. Learn data-driven loop testing with POMs
5. Understand when to map vs when to skip locators

#### **🧠 The YAGNI Principle (You Aren't Gonna Need It)**

**The Problem:**
When creating a ProductPage, the junior instinct is:

> "Let me map EVERYTHING on this page - title, price, brand, quantity, reviews, all buttons!"

**Why this is wrong:**

- ❌ Creates technical debt (unused code to maintain)
- ❌ If UI changes, you fix locators you're not even testing
- ❌ Violates YAGNI - don't build what you don't need NOW

**The Architect Approach:**

> "What does my TEST need? Only build that."

**Example:**

```typescript
// ❌ Junior approach - map everything:
export class ProductPage {
  readonly productTitle: Locator;
  readonly brand: Locator;
  readonly price: Locator;
  readonly oldPrice: Locator;
  readonly availability: Locator;
  readonly quantity: Locator;
  readonly buyNowButton: Locator;
  readonly addToWishlist: Locator;
  readonly compareButton: Locator;
  readonly reviewStars: Locator;
  // ... 15 more locators you're not using
}

// ✅ Architect approach - YAGNI:
export class ProductPage {
  readonly buyNowButton: Locator; // Need this
  readonly successNotification: Locator; // Need this
  // That's it! Only what the test uses.
}
```

**Why YAGNI matters:**

- ✅ Less code to maintain
- ✅ Faster to write
- ✅ Only breaks if something you TEST changes
- ✅ Can add more locators LATER when you need them

#### **🏗️ ProductPage.ts - YAGNI Implementation**

**Created with Claude Code:**

```typescript
import type { Locator, Page } from "@playwright/test";

export class ProductPage {
  // 🏗️ THE PLAN (Only what we need!)
  readonly page: Page;
  readonly buyNowButton: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyNowButton = page.getByRole("button", { name: /buy now/i });
    this.successNotification = page.locator(".alert-success");
  }

  // 🎬 THE WORK (Simple, focused methods)
  async clickBuyNow(): Promise<void> {
    await this.buyNowButton.click();
  }
}
```

**What we DIDN'T map (and don't need yet):**

- Product title
- Price
- Quantity input
- Reviews
- Brand info

**We can add these LATER if/when we need to test them!**

#### **🔗 Multi-POM Test - Chaining POMs Together**

**Real-world test flow:**

```typescript
test("Search for MacBook and buy now using POM", async ({ page }) => {
  // 🏗️ THE PLAN
  const url: string = "https://ecommerce-playground.lambdatest.io/";
  const searchTerm: string = "MacBook";
  const successPattern: RegExp = /Success/i;

  // 🎬 THE WORK
  await page.goto(url);

  // Step 1: Search using SearchPage POM
  const searchPage: SearchPage = new SearchPage(page);
  await searchPage.search(searchTerm);

  // Step 2: Click first product
  const firstProduct: Locator = page.locator(".product-layout a").first();
  await firstProduct.click();

  // Step 3: Buy using ProductPage POM
  const productPage: ProductPage = new ProductPage(page);
  await productPage.clickBuyNow();

  // ✅ THE CHECK
  await expect(productPage.successNotification).toContainText(successPattern);
});
```

**This is a realistic user journey:**

1. Search for product ✅
2. Click search result ✅
3. Buy the product ✅
4. Verify success ✅

**All using POMs - clean, maintainable, professional!**

#### **📐 Architect Prompt Template (Standardized)**

**Added to CLAUDE.md for team use:**

```
Claude, create a [type] at `[file path]`.

Architecture:
* Import [components needed]
* [Any architectural requirements]

Data:
* [Locators, URLs, arrays, test data]

Logic:
* [Step 1: What to do]
* [Step 2: What to do]
* [Step 3: Assertions]

Strictly follow CLAUDE.md standards.
```

**This template:**

- ✅ Maps directly to test file structure (PLAN/WORK/CHECK)
- ✅ Forces architectural thinking before coding
- ✅ Consistent across entire team
- ✅ Claude Code understands it perfectly
- ✅ Reusable for every test/POM

#### **🔄 Data-Driven Loop Testing with POMs**

**Test with multiple invalid logins:**

```typescript
test("Invalid login attempts show a warning for each email", async ({
  page,
}) => {
  // 🏗️ THE PLAN
  const url: string =
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login";
  const invalidEmails: string[] = [
    "Alice@test.com",
    "bob@test.com",
    "rob@test.com",
  ];
  const password: string = "wrongpass123";
  const warningPattern: RegExp = /Warning/i;

  // 🎬 THE WORK
  const loginPage: LoginPage = new LoginPage(page); // Instantiate ONCE

  for (const email of invalidEmails) {
    await page.goto(url);
    await loginPage.login(email, password); // Use same instance

    // ✅ THE CHECK
    const errorMessage: Locator = page.locator(".alert-danger");
    await expect(errorMessage).toContainText(warningPattern);
  }
});
```

**Why instantiate outside the loop:**

- ✅ More efficient (create once, use 3 times)
- ✅ Locators don't change between iterations
- ✅ Professional pattern

#### **⏱️ Understanding Test Timing**

**Discovered the difference between:**

**Playwright execution time:**

- Tests run in parallel using workers
- "All 3 passed in 21 seconds" = browser execution time

**Claude Code thinking time:**

- "Churned for 34s" = AI agent's total time
- Includes: opening terminal + running command + watching test + analyzing results + writing summary

**Both are normal and expected!**

#### **📊 Key Learnings**

**Instantiate:**

- Means: Create an instance of a class
- Syntax: `const loginPage = new LoginPage(page);`
- The `new` keyword = instantiation
- Constructor runs automatically

**YAGNI in Practice:**

- Only map what your current test needs
- Can add more locators later
- Less maintenance burden
- Faster development

**Multi-POM Architecture:**

- Real tests use multiple POMs
- Chain them together in user workflows
- Each POM focused on one page/component
- Clean separation of concerns

#### **✅ Completion Checklist**

- [x] Created ProductPage POM with YAGNI principle
- [x] Built multi-POM test (SearchPage + ProductPage)
- [x] Learned Architect prompt template
- [x] Added template to CLAUDE.md as team standard
- [x] Created data-driven loop tests
- [x] Understood instantiation and constructor behavior
- [x] All tests passed Gemini audit (production-ready)
- [x] 10.5 hour intensive learning day

---

### **Day 10: Error Messages & POM Best Practices**

**Date:** Week 2, Day 10  
**Duration:** In Progress  
**Status:** 🟡 In Progress

#### **🎯 Learning Objectives**

1. Learn to read and decode Playwright error messages
2. Understand common error types and how to fix them
3. Identify POM anti-patterns (conditional logic, assertions in POMs)
4. Create POM prompt template with RegEx patterns
5. Master separation of concerns in test architecture

#### **🔍 The 5 Most Common Playwright Errors**

**Error 1: Missing await**

```
Error: page.goto: Target page, context or browser has been closed
```

**Cause:** Forgot `await` before Playwright command  
**Fix:** Add `await` to all async operations

---

**Error 2: Strict Mode Violation**

```
Error: strict mode violation: getByPlaceholder('Search') resolved to 2 elements
```

**Cause:** Locator found multiple matching elements  
**Fix:** Use `.first()`, `.last()`, or `.nth(index)` to be explicit

---

**Error 3: Element Not Found (Timeout)**

```
Error: Timeout 30000ms exceeded.
waiting for getByRole('button', { name: 'Submit' })
```

**Cause:** Element doesn't exist, wrong locator, or element not loaded yet  
**Fix:** Verify element exists, check locator, add proper waits

---

**Error 4: Type Mismatch**

```
Type 'string[]' is not assignable to type 'string'
```

**Cause:** Variable declared as one type but assigned different type  
**Fix:** Match the type declaration to the actual value

---

**Error 5: Timeout on Assertion**

```
Error: expect(locator).toBeVisible()
Timed out 5000ms waiting for expect(locator).toBeVisible()
```

**Cause:** Element exists but never became visible  
**Fix:** Run in `--headed` mode to see what's happening, verify locator

#### **🧪 Real Error Decoded**

**Actual error from our test:**

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /buy now/i })
```

**What it told us:**

1. Waited 30 seconds for Buy Now button
2. Button never appeared
3. Product was out of stock (button text was "OUT OF STOCK" not "BUY NOW")

**Key insight:** Code was perfect, product availability was the issue.

#### **🏗️ POM Architecture Best Practices**

**Rule 1: No Assertions in POMs**

**❌ Wrong:**

```typescript
async clickBuyNow(): Promise<void> {
  await this.buyNowButton.click();
  await expect(this.successNotification).toBeVisible(); // Don't do this!
}
```

**✅ Correct:**

```typescript
// In POM - just the action:
async clickBuyNow(): Promise<void> {
  await this.buyNowButton.click();
}

// In Test - the assertion:
await productPage.clickBuyNow();
await expect(productPage.successNotification).toBeVisible();
```

**Rule 2: No Conditional Logic in POM Methods**

**❌ Wrong:**

```typescript
async clickBuyNow(): Promise<void> {
  if (await this.buyNowButton.isVisible()) {  // Don't do this!
    await this.buyNowButton.click();
  }
}
```

**✅ Correct:**

```typescript
async clickBuyNow(): Promise<void> {
  await this.buyNowButton.click();  // Fail loudly if button missing
}
```

**Why:** POMs should be "dumb" and strict. If element doesn't exist, test should FAIL LOUDLY so you know something is wrong.

#### **📐 POM Prompt Template with RegEx**

**Created standardized template:**

```
Claude, create a Page Object Model at `pages/[PageName].ts`.

Architecture:
* Import `Locator` and `Page` from `@playwright/test`.

Data:
* Create a locator for [elementName] that looks for a [element type] matching the text `/pattern/i`.

Logic:
* Create a method called [methodName]() that [action description].

Strictly follow CLAUDE.md standards (use readonly for locators, and explicit types).
```

**Why use RegEx in locators:**

- ✅ Case-insensitive (`/buy now/i` matches "BUY NOW", "Buy Now", "buy now")
- ✅ More resilient to text changes
- ✅ Professional production pattern

#### **📊 Key Concepts Learned**

**Separation of Concerns:**

- **POM:** Actions and data retrieval
- **Test:** Decisions and assertions

**Error Reading Strategy:**

1. Read the error message completely
2. Identify the error type (timeout, strict mode, missing await, etc.)
3. Look at the line number and file
4. Understand what Playwright was waiting for
5. Fix the root cause

**POM Design Principles:**

- Keep methods simple and focused
- No assertions in POMs
- No conditional logic
- Return locators or data, let tests verify

#### **✅ Completion Checklist**

- [x] Learned 5 common Playwright error types
- [x] Decoded real timeout error from failed test
- [x] Identified POM anti-patterns
- [x] Created POM prompt template with RegEx
- [x] Defined separation of concerns rules
- [ ] Create ProductPageSmart with best practices
- [ ] Test the new POM in action

---

---

### **Day 11: Prompt Engineering & Debugging Real Tests**

**Date:** Week 2, Day 11  
**Duration:** 6 hours (after 2-day rest)  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Learn to write structured prompts that generate clean code every time
2. Debug failed tests by reading error messages systematically
3. Understand boolean type and conditional logic in tests
4. Switch to modern practice site for realistic scenarios

#### **💡 The Prompting Problem We Solved**

**What was happening:**

- Prompts were too vague or too detailed
- AI generated inconsistent code
- Had to fix code after generation
- Wasted time debugging AI output

**What we learned:**
Prompting is like giving instructions to a junior developer. You need:

- WHAT to build (file path, type)
- WHAT components to use (imports)
- WHAT data to work with (locators, variables)
- WHAT logic to implement (step by step)

**The solution: Strict templates**

**For POMs:**

```
Architecture: What to import
Data: What locators (with RegEx patterns)
Logic: What methods (with clear actions)
Constraints: Standards to follow
```

**For Tests:**

```
Architecture: What imports
Data (The Plan): What variables
Logic (The Work): What steps
The Check: What to verify
Constraints: Standards compliance
```

**Why this works:**

- AI understands structure better than free-form requests
- Consistent input = consistent output
- Templates are copy/paste - no thinking required
- Mirrors how the code file will be organized

#### **🧪 Lesson: Debugging With Error Messages**

**The test that failed:**

```typescript
await productPage.clickBuyNow(); // Timeout error
```

**The error message:**

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /buy now/i })
```

**What we learned to do:**

1. **Read the WHOLE error** - don't just see "timeout" and give up
2. **Find what it was waiting for** - "getByRole('button', { name: /buy now/i })"
3. **Check the line number** - ProductPage.ts:17
4. **Run in headed mode** - See what's actually on the page
5. **Inspect the actual element** - Button said "OUT OF STOCK" not "BUY NOW"

**The insight:**
The test CORRECTLY failed! The code was perfect. The product was out of stock so the button we expected didn't exist. This is what tests should do - fail loudly when reality doesn't match expectations.

#### **📖 New Concept: Boolean Type**

**What is a boolean?**
A type that can only be `true` or `false`. Nothing else.

**Real example from our code:**

```typescript
const outOfStock: boolean = await productPage.isOutOfStock();

if (outOfStock) {
  // If true
  console.log("Product unavailable");
} else {
  // If false
  await productPage.clickBuyNow();
}
```

**When to use booleans:**

- Questions with yes/no answers
- `isVisible()` → true or false
- `isEnabled()` → true or false
- `isChecked()` → true or false

**Type comparison:**

- `string` → any text: `'hello'`, `'MacBook'`
- `number` → any number: `42`, `3.14`
- `boolean` → only two: `true` or `false`

#### **🌐 Switching Practice Sites**

**Old:** ecommerce-playground.lambdatest.io
**New:** practicesoftwaretesting.com

**Why we switched:**
The new site is better for learning because:

- Modern tech stack (Angular - used in real companies)
- Has documentation explaining the application
- Has bug hunting mode to practice finding issues
- Used by other QA professionals (not just for learning)
- Better portfolio pieces (looks more professional)

**What this means for you:**
All future tests will use this site. When you show your portfolio to recruiters, you'll have tests on a realistic modern application, not an old demo site.

#### **💪 The Real Lesson: Getting Help When You Need It**

**What happened:**
After 10 hours of work, you were exhausted. You took 2 days off. When you came back, you said "I need to master prompting - I don't feel confident."

You went to Gemini (the architecture expert) and said "Give me templates that work every time."

You came back with exactly what you needed.

**This is Senior Engineer behavior:**

- Recognizing gaps in your knowledge
- Going to the right expert
- Bringing solutions back to your team
- Not pretending you know everything

**In a real job, this is what you'll do:**

- Ask senior developers for code review
- Consult with architects about design patterns
- Research best practices when stuck
- Bring solutions to the team

#### **✅ Completion Checklist**

- [x] Learned to write structured prompts using templates
- [x] Debugged real failed test by reading error messages
- [x] Understood boolean type and when to use it
- [x] Switched to modern practice site
- [x] Learned it's okay to ask for help from experts
- [x] Established prompt templates in CLAUDE.md Section 8

---

### **Day 12: Prompt Engineering Practice & Toast Notifications**

**Date:** Week 2, Day 12  
**Duration:** 3 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Practice prompting Claude Code with less structured prompts
2. Build ProductQuantityPage POM with quantity controls
3. Generate test file using AI with minimal guidance
4. Identify issues in AI-generated code
5. Understand toast notifications and cart state challenges

#### **🧠 Key Concepts Learned**

**Variable Naming Flexibility:**
Both patterns work - consistency matters more than the specific choice:

```typescript
// Pattern A:
quantityIncreaseButton; // [what][action][elementType]
quantityDecreaseButton;

// Pattern B:
plusButton; // Shorter, equally clear
minusButton;
```

**The naming convention rule:**

- Descriptive (says what it does)
- Consistent (follows same pattern in your codebase)
- Not too short (`btn` is bad)
- Not too long (`buttonToIncreaseTheProductQuantityByOne` is bad)

**Claude Code Learns From Your Codebase:**

- Reads existing tests to learn patterns
- Copies URL, structure, and style from previous tests
- This is GOOD for consistency
- Requires guidance when you want to change patterns

**Toast Notifications Challenge:**

```html
<div id="toast-container" class="toast-top-right toast-container">
  Product added to shopping cart.
</div>
```

- Appears briefly then disappears
- Hard to inspect in DevTools
- Can be located by `#toast-container` or `.toast-container`

**Cart State Problem (Preview of Fixtures):**

- Can't verify "cart shows 1 item" without knowing starting state
- What if cart already has items from previous test?
- Need clean starting state for each test
- This is WHY we need Fixtures (Day 13 topic!)

**Real-world parallel:**

> "Just like re-ghosting machines for security testing - tests need clean state!"

#### **🏗️ ProductQuantityPage POM Created**

**Prompt used:**

```
Claude, create a Page Object Model at pages/ProductQuantityPage.ts

Architecture:
* Import Locator and Page from @playwright/test

Data:
* Create a locator for quantityIncreaseButton that looks for a button with text /\+/ or aria-label increase
* Create a locator for quantityDecreaseButton that looks for a button with text /-/ or aria-label decrease
* Create a locator for addToCartButton that looks for a button matching the text /add to cart/i

Logic:
* Create a method called increaseQuantity() that clicks the quantityIncreaseButton
* Create a method called decreaseQuantity() that clicks the quantityDecreaseButton
* Create a method called addToCart() that clicks the addToCartButton

Strictly follow CLAUDE.md standards (use readonly for locators, and explicit types).
```

**Generated code (clean, production-ready):**

```typescript
import type { Locator, Page } from "@playwright/test";

export class ProductQuantityPage {
  readonly page: Page;
  readonly quantityIncreaseButton: Locator;
  readonly quantityDecreaseButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityIncreaseButton = page.getByRole("button", { name: /\+/ });
    this.quantityDecreaseButton = page.getByRole("button", { name: /-/ });
    this.addToCartButton = page.getByRole("button", { name: /add to cart/i });
  }

  async increaseQuantity(): Promise<void> {
    await this.quantityIncreaseButton.click();
  }

  async decreaseQuantity(): Promise<void> {
    await this.quantityDecreaseButton.click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
```

#### **🧪 Test Generation With Relaxed Prompt**

**Simple prompt to Claude Code:**

```
Claude, create a test at tests/bootcamp/day10_quantity_test.spec.ts using ProductQuantityPage

> for shortcuts
```

**What Claude Code generated:**

- Used OLD ecommerce site URL (copied from existing tests)
- Included search logic (pattern from previous tests)
- Put assertions outside the POM (correct!)
- Called `increaseQuantity()` twice (testing multiple clicks - smart!)

**Issues identified:**

1. ❌ Wrong URL - used old ecommerce site instead of practicesoftwaretesting.com
2. ✅ But structure was perfect (PLAN/WORK/CHECK)
3. ✅ Used POM correctly (no assertions in POM)
4. ❌ Used `.alert-success` locator that doesn't exist in our POM

**Fix applied with simple prompt:**

```
The URL is wrong. Use this instead:
https://practicesoftwaretesting.com/product/01KKA6D1S8VGA8NNXS3TVZC41B

Skip the search - go directly to the product page.
```

**Result:** Claude Code fixed it immediately!

#### **🔍 Code Review Skills Practiced**

**Questions asked during review:**

- "What does calling `increaseQuantity()` twice do?" → Increases from 1→2→3 (testing multiple clicks)
- "Is the assertion using the POM?" → No, going around it with `page.locator('.alert-success')`
- "Should we add success notification to POM?" → Not yet - we need to understand toast vs cart verification first

**Senior-level thinking demonstrated:**

> "We'd rather verify the Cart showing X items. But it gets complicated if we already have items in it. We don't want it to show '1' item specifically."

**This identified the need for Fixtures!**

#### **💡 Key Insight**

**For NOW, verify the toast:**

```typescript
const successToast: Locator = page.locator("#toast-container");
await expect(successToast).toBeVisible();
```

### **Day 13: Complete Cart Test with Fixtures & Hooks**

**Date:** Week 2, Day 13  
**Duration:** ~4 hours (includes coaching discussion)  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Build complete test with beforeEach/afterEach hooks
2. Implement cart clearing logic with conditional checks
3. Use state-based waiting (try-catch pattern) instead of isVisible()
4. Verify cart badge count after adding item
5. Understand test independence and clean state setup

#### **🧠 Key Concepts Learned**

**What Are Test Hooks?**

Test Hooks are functions that run automatically at specific times:

- `beforeEach()` - Runs BEFORE each test (setup/clean state)
- `afterEach()` - Runs AFTER each test (cleanup)
- `beforeAll()` - Runs ONCE before all tests in file
- `afterAll()` - Runs ONCE after all tests in file

**Why Hooks Matter:**

```
Without hooks (messy):
- Test 1: Add item → cart has 1 item ✅
- Test 2: Add item → cart has 2 items ❌ (Test 1's item still there!)

With beforeEach (clean):
- beforeEach: Clear cart
- Test 1: Add item → cart has 1 item ✅
- beforeEach: Clear cart (runs again!)
- Test 2: Add item → cart has 1 item ✅
```

**Real-world parallel:**

> "Just like re-ghosting machines for security testing at IBM - each test needs a clean starting state!"

**State-Based Waiting vs isVisible():**

❌ **Bad - isVisible() doesn't wait:**

```typescript
const isBadgeVisible: boolean = await cartBadge.isVisible();
// Returns immediately - might be false because page still loading!
```

✅ **Good - waitFor() with timeout:**

```typescript
let isBadgeVisible: boolean = false;
try {
  await cartBadge.waitFor({ state: "visible", timeout: 2000 });
  isBadgeVisible = true;
} catch {
  isBadgeVisible = false;
}
// Waits up to 2 seconds, handles timing issues properly
```

**Why this pattern is better:**

- `isVisible()` is a snapshot check - returns false immediately if element not in DOM yet
- `waitFor({ state: 'visible', timeout: 2000 })` polls until element appears or timeout expires
- Gives page time to settle after navigation
- Prevents flaky tests caused by race conditions

#### **🏗️ File Created: day13_cart_fixture_test.spec.ts**

**The Complete Test Structure:**

```typescript
import { test, expect, type Locator } from "@playwright/test";

test.describe("Day 13 - Cart Fixture Test", () => {
  // 🏗️ THE PLAN (Data & Variables)
  const homeUrl: string = "https://practicesoftwaretesting.com";
  const cartUrl: string = "https://practicesoftwaretesting.com/checkout";
  const productUrl: string =
    "https://practicesoftwaretesting.com/product/01KKC46KCFRG8GMD46FJ2X3Q22";

  test.beforeEach(async ({ page }) => {
    await page.goto(homeUrl);

    const cartBadge: Locator = page.locator('[data-test="cart-quantity"]');

    // State-based check for cart badge
    let isBadgeVisible: boolean = false;
    try {
      await cartBadge.waitFor({ state: "visible", timeout: 2000 });
      isBadgeVisible = true;
    } catch {
      isBadgeVisible = false;
    }

    // Only clear cart if items exist
    if (isBadgeVisible) {
      await page.goto(cartUrl);
      const removeButtons: Locator = page.locator(".btn-danger");
      let itemCount: number = await removeButtons.count();
      while (itemCount > 0) {
        await removeButtons.first().click();
        itemCount--;
        await expect(removeButtons).toHaveCount(itemCount);
      }
    }
  });

  test("Add item to empty cart", async ({ page }) => {
    // 🎬 THE WORK (Actions)
    await page.goto(productUrl);

    const addToCartButton: Locator = page.getByRole("button", {
      name: /add to cart/i,
    });
    await addToCartButton.click();

    const cartBadge: Locator = page.locator('[data-test="cart-quantity"]');

    // ✅ THE CHECK (Assertions)
    await expect(cartBadge).toHaveText("1");
  });
});
```

**Key Elements:**

- **Data-test attribute locator:** `[data-test="cart-quantity"]` (GOLD standard for testing!)
- **Conditional clearing:** Only clears cart if badge is visible
- **State-based waiting:** Uses try-catch with waitFor instead of isVisible
- **Loop with count:** Removes items one by one until cart is empty
- **Clean assertion:** Verifies exact cart badge text

#### **💡 Critical Discovery**

**Site Behavior:**

> "The cart is empty by default every time the script launches. Even if we add an item, when the script starts again, the cart is empty."

**What this means:**

- The beforeEach cart clearing is technically unnecessary for THIS site
- BUT we learned the pattern for sites that DO persist cart state (cookies/sessions)
- In real jobs, many sites maintain cart between test runs
- This is EXACTLY how real QA thinks: "Does this test assumption match actual app behavior?"

**The learning is still valuable:**

- ✅ Understand Fixtures concept
- ✅ Know how to clear cart when needed
- ✅ Practice state-based conditional logic
- ✅ Portfolio-ready test demonstrating proper fixture usage

#### **🔧 CLAUDE.md Update - Section 5**

**Added new rule:**

```markdown
**Avoid isVisible():** Do not use `isVisible()` for conditional checks as it doesn't wait.
Instead use try-catch with `waitFor({ state: 'visible', timeout: X })` for state-based
conditional logic.
```

**Why this rule matters:**

- Prevents flaky tests caused by timing issues
- Enforces state-based waiting (CLAUDE.md Section 5 principle)
- Claude Code will follow this pattern going forward

#### **🧪 Test Results**

**All tests passed reliably!** ✅

#### **🎓 Prompt Used (Following CLAUDE.md Section 8)**

```
Claude, create a test file at tests/bootcamp/day13_cart_fixture_test.spec.ts

Architecture:
* Import test and expect from @playwright/test
* Import type Locator from @playwright/test

Data (The Plan):
* homeUrl: string = 'https://practicesoftwaretesting.com'
* cartUrl: string = 'https://practicesoftwaretesting.com/checkout'
* productUrl: string = 'https://practicesoftwaretesting.com/product/01KKC46KCFRG8GMD46FJ2X3Q22'

Logic (The Work):
1. Create beforeEach hook that navigates to homeUrl
2. Check if cart badge with locator '[data-test="cart-quantity"]' is visible
3. If visible: navigate to cartUrl, find all remove buttons with class 'btn-danger',
   click first() in a loop until all removed
4. If not visible: skip clearing
5. Create test named "Add item to empty cart"
6. Navigate to productUrl
7. Click Add to cart button using getByRole
8. Locate cart badge using '[data-test="cart-quantity"]'

The Check (Assertions):
* Assert that cart badge has text "1"

Constraints:
* Strictly follow CLAUDE.md standards
* Use explicit TypeScript types
* Include // 🏗️ THE PLAN, // 🎬 THE WORK, and // ✅ THE CHECK comments
```

**Claude Code's Response:**

- Generated clean, production-ready code ✅
- Initially used `isVisible()` - we caught it! ❌
- Updated to try-catch pattern after correction ✅
- Explained why the change was better ✅

#### **🌍 Real-World Practice Sites Research**

**Selected sites for future weeks:**

1. **automationintesting.online** (B&B Booking) - Week 3 practice site
2. **parabank.parasoft.com** (Banking) - Week 4 API testing
3. **thinking-tester-contact-list.herokuapp.com** (CRM) - Week 4-5

**Reasoning:**

- Move beyond retail scenarios
- Practice on realistic business domains
- Build diverse portfolio projects
- No bot detection/captcha issues

#### **✅ Completion Checklist**

- [✅] Learned beforeEach/afterEach hooks concept
- [✅] Built complete cart clearing logic with conditional checks
- [✅] Used state-based waiting (try-catch with waitFor)
- [✅] Avoided isVisible() timing issues
- [✅] Updated CLAUDE.md with new rule
- [✅] Test passes reliably (3/3 runs)
- [✅] Inspected cart badge using data-test attribute
- [✅] Understood test independence principle
- [✅] Discovered site-specific cart behavior
- [✅] Researched real-world practice sites
- [✅] Maintained coaching relationship accountability

---

---

### **Day 14: New Practice Site & Explicit Prompts Mastery**

**Date:** Week 2, Day 14 (Friday, March 13, 2026)
**Duration:** 8 hours
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Switch to modern practice site (automationintesting.online)
2. Master explicit prompt template (Architecture/Data/Logic/Constraints)
3. Build production-quality POMs independently
4. Write professional test cases in Jira format
5. Apply YAGNI principle in practice

#### **🧠 Key Concepts Learned**

**Practice Site Evolution:**

```
Old: practicesoftwaretesting.com (ToolShop - retail)
New: automationintesting.online (B&B booking - SPA)

Why the switch:
- Modern SPA architecture (React/Angular)
- Realistic business domain (hospitality)
- Multiple user flows (booking, contact, admin)
- Industry-standard practice site
- No bot detection/captcha
```

**Explicit Prompt Template (LOCKED IN - Day 14):**

```
Claude, create a [POM/test] at `path/to/file`.

Architecture:
* Import [specific modules with exact names]

Data:
* Create a locator for [name] using [exactPlaywrightMethod('value')]

Logic:
* Create a method called [methodName](param: type) that [action]

Constraints:
* Strictly follow CLAUDE.md standards
* Use readonly for locators
* Use explicit TypeScript return types
* No assertions in POMs
```

**Why Explicit > Vague:**

- ❌ "Create a locator for name" → ambiguous
- ✅ "Create a locator for nameInput using getByTestId('ContactName')" → predictable

#### **🏗️ ContactPage.ts POM Created**

**Prompt Used (Student-Written, 99% Correct):**

```
Claude, create a Page Object Model at pages/ContactPage.ts.

Architecture:
* Import Locator and Page from @playwright/test.

Data:
* Create a locator for nameInput using getByTestId('ContactName').
* Create a locator for emailInput using getByTestId('ContactEmail').
* Create a locator for phoneInput using getByTestId('ContactPhone').
* Create a locator for subjectInput using getByTestId('ContactSubject').
* Create a locator for messageInput using getByTestId('ContactDescription').
* Create a locator for submitButton using getByRole('button', { name: 'Submit' }).

Logic:
* Create a method called goto() that navigates to 'https://automationintesting.online/'.
* Create a method called submitContactForm(name: string, email: string, phone: string, subject: string, message: string) that fills all inputs and clicks submitButton.

Constraints:
* Strictly follow CLAUDE.md standards.
* Use readonly for locators.
* Use explicit TypeScript return types (e.g., Promise<void>).
* No assertions (expect) in this file.
```

**Generated Code (Perfect on First Run):**

```typescript
import type { Locator, Page } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByTestId("ContactName");
    this.emailInput = page.getByTestId("ContactEmail");
    this.phoneInput = page.getByTestId("ContactPhone");
    this.subjectInput = page.getByTestId("ContactSubject");
    this.messageInput = page.getByTestId("ContactDescription");
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async goto(): Promise<void> {
    await this.page.goto("https://automationintesting.online/");
  }

  async submitContactForm(
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    await this.submitButton.click();
  }
}
```

**Test File: day14_contact_form.spec.ts (3/3 Passed)**

Success message appears: "Thanks for getting in touch Passtelle Ingrid!"

#### **🏗️ AdminLoginPage.ts POM Created**

**Student Independence: 95% Correct on First Attempt!**

**Key Learnings:**

- Used RegEx `/Login/i` for button resilience
- URL was correct (no `/#/` needed - modern SPA with HTML5 routing)
- Gemini made incorrect assumption about hash routing - student verified with actual site!

**Test File: day14_admin_login.spec.ts (3/3 Passed)**

Logout button appears after successful login.

#### **📝 QA Training: Test Case Writing**

**Learned Two Formats:**

**Format A: Steps Format (Traditional - 60% of companies)**

```
Test Case ID: TC-02
Title: Contact Form Submission - Valid Data
Priority: High
Type: Functional

Preconditions:
- User is on the homepage
- Internet connection is active

Test Steps:
1. Navigate to Contact section
2. Fill form with valid data
3. Click Submit button

Expected Results:
Step 1: Contact form is visible
Step 2: All fields accept input correctly
Step 3: Success message appears with user name

Postconditions:
- Success message is displayed
- Form is hidden (UX issue discovered!)
- User cannot submit again without refresh
```

**Format B: Given/When/Then (BDD - 40% of companies)**

```
Given the user is on the homepage
When the user fills contact form with valid data
  And clicks Submit
Then the success message appears
  And displays the user's name
```

**Key Learnings:**

- Preconditions = Setup (what exists BEFORE test)
- Expected Results = Map to each step (be VERY specific)
- Postconditions = What CHANGED (system state after)

**Senior QA Thinking Demonstrated:**

Student identified missing test cases:

- TC-02a: Name field boundary (0, 25, 26 characters)
- TC-02b: Email format validation
- TC-02c: Phone field boundary (10, 11, 21, 22 digits)
- TC-02d: Subject max length
- TC-02e: Message max length
- TC-02f: Empty form submission

**This is test suite design, not just individual test writing!**

**Golden Rule Stated:**

> "It all depends on the user stories and expected results. Test cases reflect REQUIREMENTS, not assumptions."

#### **💡 YAGNI Principle Applied**

**Student's Insight:**

> "Claude Code already knows the import paths from CLAUDE.md. I don't need to specify `../../pages/ContactPage` - YAGNI!"

**This is correct!** Architect thinking: Trust the system, don't over-specify.

#### **🔍 Challenging Experts (Critical Skill)**

**Student questioned both Coach AND Gemini:**

**Gemini said:** "Use `/#/admin` (SPA hash routing)"
**Coach repeated:** "Use `/#/admin`"
**Student verified:** Tested actual site, `/admin` works fine!

**Result:** Both Gemini and Coach were wrong. Student was right.

**This is senior engineer behavior:**

- Don't blindly trust experts
- Verify assumptions with actual testing
- Question when something doesn't match reality

#### **🐛 UX Bug Discovered**

**Contact Form Behavior:**

1. User submits form → Success message appears
2. Form DISAPPEARS (cannot resubmit)
3. User must refresh page to send another message

**This is questionable UX!** In a real job, would write a usability defect report.

#### **✅ Completion Checklist**

- [✅] Switched to automationintesting.online successfully
- [✅] Built ContactPage.ts POM (99% prompt accuracy)
- [✅] Built AdminLoginPage.ts POM (95% independent accuracy)
- [✅] Created 2 E2E tests (both passing 3/3)
- [✅] Learned test case writing (Steps + BDD formats)
- [✅] Wrote TC-02 and TC-03
- [✅] Identified edge cases and missing test cases
- [✅] Discovered UX bug
- [✅] Applied YAGNI principle successfully
- [✅] Challenged experts and verified with testing
- [✅] Locked in explicit prompt template

#### **🎤 Interview Questions Added**

**Q: "How do you decide what to include in a Page Object Model?"**

> "I follow the YAGNI principle - You Aren't Gonna Need It. I only map the locators and methods that my current test actually needs. This keeps POMs focused and maintainable. If I need more locators later, I add them incrementally."

**Q: "Should Page Objects contain assertions?"**

> "Absolutely not. This violates separation of concerns. POMs perform actions and return data. Tests make decisions and verify results. This makes POMs reusable across many different test scenarios."

---

### **Day 14-15 Weekend: 6 Anthropic AI Certifications**

**Date:** Weekend, March 14-15, 2026
**Duration:** 2 days intensive
**Status:** ✅ Completed

#### **🏆 Certifications Earned:**

**Saturday March 14:**

1. ✅ **Claude 101** (Score: 9/10)
2. ✅ **Claude Code in Action** (Score: 7/8)
3. ✅ **AI Fluency: Framework & Foundations**
4. ✅ **Introduction to Model Context Protocol**
5. ✅ **Introduction to Agent Skills**

**Sunday March 15:** 6. ✅ **Model Context Protocol: Advanced Topics**

**All added to LinkedIn profile immediately!**

#### **🧠 Key Learnings from Certifications**

**From MCP Courses:**

- **Server architecture** - How MCP servers expose tools
- **Resource management** - Documents, data sources, APIs
- **Prompts** - Pre-built interaction templates
- **Agent orchestration** - Multiple AI agents working together
- **Tool discovery** - Dynamic capability exposure

**Hooks Mastery Validated:**

> "The hooks part was very complex, but I knew a lot already" - scored 7/8

**Evidence that bootcamp learning is working!**

#### **💡 Critical Realization: Claude Code as Senior Developer**

**Old Mental Model (WRONG):**

```
You → Write detailed prompts → Claude Code generates → You fix
```

**New Mental Model (CORRECT):**

```
You (PM/Architect) → High-level requirements →
Claude Code (Senior Dev) → Explores, designs, implements →
You (Architect) → Review and approve
```

**This changes everything:**

- Stop writing detailed "do exactly this" prompts
- Start writing "build this feature" requirements
- Let Claude Code make design decisions
- Review architecture, not syntax

**Will be formalized in CLAUDE.md Section 9**

#### **📚 ISTQB Decision: Week 8 (Perfect Timing)**

**Why Week 8:**

- Study April 20-26 (7 days)
- Take exam April 27
- Results before job hunt starts
- Fresh knowledge for interviews

#### **✅ Weekend Accomplishments**

- [✅] 6 Anthropic AI certifications in 2 days
- [✅] All certifications added to LinkedIn
- [✅] MCP architecture fully understood
- [✅] Claude Code senior developer model defined
- [✅] ISTQB timeline planned (Week 8)
- [✅] Ready for Week 3 MCP hands-on practice

---

## Week 2: Playwright Architecture

### **Day 14: The Explicit Prompt Template & The Accessibility Trap**

**Date:** Friday, March 13, 2026  
**Duration:** 8 hours  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Master explicit prompt engineering for consistent AI code generation
2. Understand the difference between HTML elements and accessibility roles
3. Learn test case design in Jira format (Steps vs BDD)
4. Apply YAGNI principle to POM architecture

---

#### **🧠 Lesson 1: The Four-Section Explicit Prompt Template**

**The Problem:**
Vague prompts generate inconsistent code. "Create a contact form POM" produces unpredictable results.

**The Solution - Locked-In Template:**

Every POM prompt must have these **four mandatory sections:**

**Section 1: ARCHITECTURE**

```
What to import:
- Locator, Page from @playwright/test
```

**Section 2: DATA (Locators)**

```
Exact Playwright methods with specific selectors:
✅ GOOD: nameInput: page.getByPlaceholder('Name')
❌ BAD:  "a field for the user's name"
```

**Section 3: LOGIC (Methods)**

```
Typed method signatures with return types:
- Action verb method names (submitForm, clickLogin, enterDates)
- Explicit Promise<void> return types
```

**Section 4: CONSTRAINTS**

```
Reference CLAUDE.md standards:
- readonly properties
- No assertions in POMs
- Explicit TypeScript types
```

**Real Example That Works:**

```
Claude, create ContactPage POM.
Architecture: Import Locator and Page from @playwright/test.
Data: nameInput using getByPlaceholder('Name'), emailInput using getByPlaceholder('Email'), submitButton using getByRole('button', {name: /submit/i}).
Logic: submitContactForm(name, email, phone, subject, message) fills all fields and clicks submit. Return type Promise<void>.
Constraints: Follow CLAUDE.md - readonly locators, no assertions.
```

**Why This Works:**

- AI receives explicit Playwright syntax, not English descriptions
- Generates production-ready code on first attempt
- No guessing about structure or naming

---

#### **🧠 Lesson 2: Links vs Buttons - The Accessibility Trap**

**Critical Concept:**
Developers often make `<a>` tags **look** like buttons using CSS classes.

**The HTML:**

```html
<a href="/reservation/3" class="btn btn-primary">Book now</a>
```

**What You See:**
A blue button with white text saying "Book now"

**What Playwright Sees:**

```
Role: link
Name: "Book now"
```

**The Trap:**

```typescript
// ❌ THIS WILL FAIL - Looking for a button
bookNowButton: page.getByRole("button", { name: /Book now/i });

// ✅ THIS WORKS - It's actually a link
bookNowLink: page.getByRole("link", { name: /Book now/i });
```

**How to Identify the Correct Role:**

| HTML Tag                       | Accessibility Role | Playwright Method                           |
| ------------------------------ | ------------------ | ------------------------------------------- |
| `<button>Click me</button>`    | `button`           | `getByRole('button', { name: 'Click me' })` |
| `<a href="...">Click here</a>` | `link`             | `getByRole('link', { name: 'Click here' })` |
| `<input type="text">`          | `textbox`          | `getByRole('textbox')`                      |
| `<h1>Title</h1>`               | `heading`          | `getByRole('heading', { name: 'Title' })`   |
| `<input type="checkbox">`      | `checkbox`         | `getByRole('checkbox')`                     |

**The Rule:**
Always inspect the **HTML tag** in DevTools. The tag determines the role, NOT the visual appearance or CSS classes.

**Why This Matters:**
Playwright uses the **Accessibility Tree** (same as screen readers) to find elements. The accessibility tree reflects semantic HTML structure, not visual styling.

---

#### **🧠 Lesson 3: Test Case Design - Thinking in Suites**

**The Shift:**
Junior QA: "One feature = one test"  
Senior QA: "One feature = a comprehensive test suite"

**Example: Contact Form Feature**

Instead of writing just **TC-001: Valid submission**, we identify:

- **TC-001:** Happy path (all fields valid)
- **TC-002:** Name field boundary testing (0, 25, 26 chars if max is 25)
- **TC-003:** Email format validation (missing @, invalid domain, special chars)
- **TC-004:** Phone format validation (10, 11, 21, 22 digits if range is 11-21)
- **TC-005:** Empty required fields
- **TC-006:** Special characters in text fields

**One feature → 6+ test cases covering positive, negative, and edge cases.**

**Test Case Format (Jira Standard):**

**Format A: Steps Format (60% of companies)**

- TC ID: Unique identifier
- Title: Clear, action-based
- Priority: P0/P1/P2/P3
- Type: Functional/Regression/Smoke
- Preconditions: System state before test
- Test Steps: Numbered actions
- Expected Results: Map to each step (be VERY specific)
- Postconditions: What CHANGED (not what user "can do")

**Format B: BDD Given/When/Then (40% of companies)**

- Given: Initial state
- When: Action performed
- Then: Expected outcome

**Golden Rule:**
Test cases reflect **REQUIREMENTS**, not assumptions. Always trace back to user stories or specifications.

---

#### **🧠 Lesson 4: YAGNI in Page Object Models**

**YAGNI = You Aren't Gonna Need It**

**The Principle:**
Don't map every element on a page. Only create locators and methods that **current tests actually need**.

**Example:**

```typescript
// ❌ WRONG - Mapping everything "just in case"
export class ProductPage {
  readonly productTitle: Locator; // Not testing this
  readonly productPrice: Locator; // Not testing this
  readonly productImage: Locator; // Not testing this
  readonly buyNowButton: Locator; // ✅ Testing this
  readonly reviewsSection: Locator; // Not testing this
  readonly relatedProducts: Locator; // Not testing this
}

// ✅ RIGHT - Only what we need now
export class ProductPage {
  readonly buyNowButton: Locator; // Only testing Buy Now flow
}
```

**Benefits:**

- Smaller, focused POMs
- Less maintenance burden
- Changes only break tests that actually use affected elements
- Can add more locators incrementally when new tests need them

**When to Add More:**
Only when you write a new test that requires additional locators.

---

#### **🧠 Lesson 5: Verifying Expert Assumptions**

**Real Scenario from Day 14:**

**Gemini (Architect Expert):** "Use `/#/admin` for the admin page. SPAs always use hash routing."  
**Coach Claude:** "Yes, use `/#/admin`."  
**Student Action:** Tested **both** `/admin` and `/#/admin` in the actual browser.

**Result:**

- `/admin` works perfectly ✅
- `/#/admin` also works, but not required
- The app uses HTML5 History API, not hash routing

**Both experts were wrong. Student verified with actual testing.**

**The Lesson:**

- Expert opinions are valuable **starting points**
- Always **verify assumptions** with actual testing
- Don't blindly trust even senior advice
- "Trust but verify" is senior engineer behavior

**Interview Gold:**

> "When two experts told me to use hash routing for a SPA, I tested both URLs myself. Turns out the app uses HTML5 History API and `/admin` works fine. This taught me to always verify assumptions through actual testing rather than accepting expert advice at face value."

---

#### **🧠 Lesson 6: Weak vs Strong Assertions**

**The Discovery:**

**Weak Assertion (Testing the Tool):**

```typescript
await bookingPage.enterSearchDates("25/03/2026", "30/03/2026");
await expect(bookingPage.checkInInput).toHaveValue("25/03/2026");
```

**What this proves:**

- ✅ Playwright's `.fill()` method works (we already know this!)
- ❌ NOT that the application processed the search
- ❌ NOT that room results appeared

**Strong Assertion (Testing the Application):**

```typescript
await bookingPage.enterSearchDates("25/03/2026", "30/03/2026");
await expect(bookingPage.roomsHeading).toBeVisible();
```

**What this proves:**

- ✅ User entered dates
- ✅ Clicked search
- ✅ Site responded by showing "Our Rooms" section
- ✅ Room results actually appeared

**The Golden Rule:**
Every assertion should answer: **"Did the APPLICATION do what users expect?"** not **"Did my automation tool work?"**

---

#### **🛠️ Practical Exercises Completed**

**POMs Created:**

1. **ContactPage.ts**
   - Locators: nameInput, emailInput, phoneInput, subjectInput, messageInput, submitButton
   - Method: `submitContactForm(name, email, phone, subject, message)`
   - Prompt accuracy: 99% (student wrote independently)

2. **AdminLoginPage.ts**
   - Locators: usernameInput, passwordInput, loginButton
   - Method: `loginAdmin(username, password)`
   - Prompt accuracy: 95% (student wrote independently)

3. **BookingPage.ts**
   - Locators: checkInInput (.first()), checkOutInput (.nth(1)), searchButton, roomsHeading
   - Method: `enterSearchDates(checkIn, checkOut)`
   - Strategy: Type dates directly (easier than date picker clicking)

**Test Files Created:**

- `day14_contact_form.spec.ts` (3/3 passes)
- `day14_admin_login.spec.ts` (3/3 passes)
- `day15_booking-Step1.spec.ts` (3/3 passes)

---

#### **🐛 UX Bug Discovered**

**Contact Form Behavior:**

1. User submits form → Success message appears
2. Form disappears completely
3. User cannot resubmit without page refresh
4. Success message stays visible permanently

**Analysis:**
This is questionable UX. In a real job, we would document this as a usability defect while keeping our test assertions reflecting actual behavior (not desired behavior).

---

#### **✅ Completion Checklist**

- [✅] Locked in explicit four-section prompt template
- [✅] Mastered link vs button accessibility roles
- [✅] Learned Jira test case formats (Steps & BDD)
- [✅] Applied YAGNI to POM design
- [✅] Verified expert assumptions through testing
- [✅] Identified weak vs strong assertions
- [✅] Created 3 POMs independently
- [✅] Wrote 3 passing E2E tests
- [✅] Discovered UX bug
- [✅] Designed test suites (1 feature → 6+ cases)

---

### **Day 15: MCP Setup - The Database Auditor Workflow**

**Date:** Monday, March 15, 2026  
**Duration:** 9 hours (10:45 AM - 8:10 PM, including 1hr yoga)  
**Status:** ✅ Completed

#### **🎯 Learning Objectives**

1. Understand what MCP (Model Context Protocol) actually is
2. Set up SQLite database for backend verification
3. Configure MCP server to connect AI agents to database
4. Debug platform-specific (Windows) configuration issues
5. Verify autonomous database queries work

---

#### **🧠 Lesson 7: What is MCP and Why It Matters**

**The Problem MCP Solves:**

**Before MCP:**

- AI can chat and write code
- AI cannot ACCESS your tools (databases, CI/CD logs, GitHub)
- Every verification requires manual copy/paste

**With MCP:**

- AI can **directly query** databases
- AI can **read** CI/CD failure logs
- AI can **review** GitHub pull requests
- AI can **execute** autonomous verification workflows

**MCP = Model Context Protocol**
An open standard created by Anthropic that allows AI assistants to securely connect to external tools and data sources.

**Real Enterprise Use Cases:**

| Use Case             | What AI Does                            | Value                    |
| -------------------- | --------------------------------------- | ------------------------ |
| **Database Auditor** | Verifies backend state after UI actions | Catches integration bugs |
| **Bug Triager**      | Reads CI/CD logs, creates Jira tickets  | Auto-triage at 2am       |
| **PR Reviewer**      | Reviews test coverage, adds comments    | Autonomous code review   |
| **Pipeline Monitor** | Diagnoses failures, proposes fixes      | Self-healing tests       |

---

#### **🧠 Lesson 8: Database Verification Architecture**

**Our Implementation - The Database Auditor:**

**The Goal:**
After our E2E booking test completes in the UI, verify the booking was **actually saved** to the backend database.

**Why This Matters:**
UI can show "Booking Confirmed" while the backend transaction fails due to:

- API timeout
- Database connection lost
- Validation failure
- Race condition

**Without database verification:** Bug goes undetected  
**With database verification:** Caught immediately

---

#### **🛠️ What We Built:**

**Step 1: Created SQLite Database**

**File:** `hotel_backend.db` (in project root)

**Table Structure:**

```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY,
  firstname TEXT,
  lastname TEXT,
  email TEXT,
  phone TEXT,
  checkin_date TEXT,
  checkout_date TEXT
);
```

**Test Data Inserted:**

```
id: 1
firstname: John
lastname: Tester
email: john.tester@example.com
phone: 07700900123
checkin_date: 2026-03-25
checkout_date: 2026-03-30
```

**Why SQLite:**

- Lightweight (one file, no server needed)
- Uses **same SQL syntax** as enterprise databases (PostgreSQL, MySQL, Oracle)
- Perfect for local development and testing

**Installed:** `better-sqlite3` (industry-standard Node.js SQLite driver)

---

**Step 2: MCP Server Configuration**

**Created:** `.mcp.json` in project root

**Purpose:**
Tells Claude Code: "You can now access this database directly via MCP"

**Initial Configuration (Didn't Work):**

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "./hotel_backend.db"
      ]
    }
  }
}
```

**Problem:** 404 error on Windows

---

#### **🧠 Lesson 9: Platform-Specific Debugging**

**Three Issues Discovered and Resolved:**

**Issue 1: Windows Command Syntax**

- **Error:** MCP server won't start
- **Root Cause:** Windows requires `npx.cmd` instead of `npx`
- **Why:** Windows executable commands need `.cmd` extension
- **Fix:** Changed `"command": "npx"` to `"command": "npx.cmd"`

**Issue 2: Package Compatibility**

- **Error:** `@modelcontextprotocol/server-sqlite` throws 404
- **Root Cause:** Official package has Windows binary compatibility issues
- **Research:** Found this is a known issue
- **Fix:** Switched to community package `@pollinations/mcp-server-sqlite` (Node-native implementation)

**Issue 3: Path Configuration**

- **Best Practice:** Use **absolute paths** in MCP config
- **Why:** Works regardless of working directory
- **Example:** `C:/Users/pass_/Documents/PLAYWRIGHT-bootcamp/hotel_backend.db`

**Working Configuration (Windows):**

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx.cmd",
      "args": [
        "-y",
        "@pollinations/mcp-server-sqlite",
        "C:/Users/pass_/Documents/PLAYWRIGHT-bootcamp/hotel_backend.db"
      ]
    }
  }
}
```

---

#### **🧠 Lesson 10: The Value of Documentation**

**Why We Document Platform-Specific Issues:**

1. **Future Us:** Won't waste time re-debugging the same issue
2. **Future Teammates:** Will thank us for the notes
3. **Interview Value:** "Tell me about a time you debugged a complex issue"
4. **Portfolio Evidence:** Shows real problem-solving, not just tutorial-following

**What to Document:**

- ✅ What broke
- ✅ What we tried
- ✅ What actually fixed it
- ✅ Why it broke (root cause)

**NOT just:** "It works now"

---

#### **✅ Verification: MCP Connection Works**

**After restarting Claude Code, we tested:**

**Query:**

```
"Claude, using your SQLite MCP tool, query the database
and tell me the email address of the person currently booked."
```

**Claude's Autonomous Actions:**

```
1. ● sqlite - list_tables (MCP)
   → Discovered "bookings" table

2. ● sqlite - execute_query (MCP)
   → Wrote SQL: SELECT * FROM bookings
   → Executed query

3. Result returned:
   id,firstname,lastname,email,phone,checkin_date,checkout_date
   1,John,Tester,john.tester@example.com,07700900123,2026-03-25,2026-03-30

4. Claude answered:
   "The email address is john.tester@example.com
   (John Tester, 2026-03-25 → 2026-03-30)"
```

**What This Proves:**

- ✅ MCP server connected successfully
- ✅ Claude can write SQL autonomously
- ✅ Claude can execute queries via MCP
- ✅ Claude understands database structure
- ✅ Ready for E2E test integration

---

#### **🧠 Lesson 11: The Four-Person Team Model**

**How We Orchestrated Multiple AI Agents:**

**Team Member 1 - Gemini (Master Architect):**

- Role: Strategic guidance and schema design
- Contribution: Designed bookings table structure, provided database creation prompts, explained enterprise MCP use cases

**Team Member 2 - Claude Code (Senior Developer):**

- Role: Implementation and execution
- Contribution: Created `hotel_backend.db`, built table structure, installed `better-sqlite3`, generated `.mcp.json` with absolute paths

**Team Member 3 - Coach Claude (Teacher/Trainer):**

- Role: Teaching and context
- Contribution: Explained why MCP matters for jobs, connected to interview value, designed learning plan, provided technical explanations

**Team Member 4 - Student (Architect/PM):**

- Role: Director and orchestrator
- Contribution: Wrote clear prompts, validated each step, debugged Windows issues, drove workflow to completion

**This IS the 2026 QA Architect workflow:**

- You don't write every line of code
- You **orchestrate** AI agents to execute
- You **review** and **approve** architecture
- You **debug** when issues arise

---

#### **📁 Project Structure After MCP Setup**

```
PLAYWRIGHT-bootcamp/
├── .mcp.json                 ← MCP server configuration
├── hotel_backend.db          ← SQLite database
├── node_modules/
│   └── better-sqlite3        ← Database driver
├── pages/
│   ├── BookingPage.ts        ← Step 1 POM (date search)
│   ├── ContactPage.ts
│   └── AdminLoginPage.ts
└── tests/bootcamp/
    └── day15_booking-Step1.spec.ts ← Passing test
```

---

#### **🎤 Interview Questions This Enables**

**Q: "How do you verify end-to-end flows beyond UI testing?"**

**Answer:**

> "I use Model Context Protocol (MCP) to connect AI agents to our test database. After our booking E2E test completes in the UI and shows 'Booking Confirmed,' Claude queries the SQLite database via MCP to verify the booking record was actually created with correct customer details and dates. This catches integration bugs where the UI shows success but the backend transaction failed—common with async operations or API timeouts. I set this up by creating a local SQLite database with a bookings table, configuring the MCP server in `.mcp.json`, and handling platform-specific issues like Windows requiring `npx.cmd`. Now I can simply say 'Claude, verify this booking exists' and it writes and executes the SQL verification autonomously."

---

#### **✅ Completion Checklist**

- [✅] Understand what MCP is and why it matters
- [✅] Created SQLite database (`hotel_backend.db`)
- [✅] Built bookings table with realistic schema
- [✅] Installed `better-sqlite3` driver
- [✅] Configured MCP server (`.mcp.json`)
- [✅] Debugged Windows-specific issues (npx.cmd, package 404)
- [✅] Found community package alternative
- [✅] Used absolute paths for reliability
- [✅] Verified MCP connection works
- [✅] Tested autonomous database queries
- [✅] Orchestrated 4-person AI team
- [✅] Documented platform-specific solutions

---

### **Day 16: Financial Wallet Database - Understanding Schema Design**

**Date:** Wednesday, March 17, 2026  
**Duration:** 4 hours (morning: database setup, afternoon: business logic intro)  
**Status:** ✅ Database complete, logic functions generated (understanding in progress)

#### **🎯 Learning Objectives**

1. Understand relational database schema design for financial systems
2. Learn SQL data types and when to use them (INTEGER, TEXT, REAL)
3. Master FOREIGN KEY constraints for data integrity
4. Apply strategic test data design (happy path, boundary, negative cases)
5. Understand idempotency in database initialization scripts

---

#### **🧠 Lesson 5: Database Schema Design - The Foundation**

**The Shift:**
Instead of continuing with the booking website (which has questionable architecture), we pivoted to building a **Financial Wallet testing system** that:

- Plays to our 15-year financial services background (Fiserv)
- Teaches backend testing (more valuable than UI-only testing)
- Demonstrates MCP database verification mastery
- Provides a portfolio piece that stands out

**The Decision:**
Build a "Digital Wallet" system to test financial transaction logic BEFORE any UI exists. This is called **Shift-Left Testing** - validate backend logic at the database/API level first.

---

#### **📊 The Users Table - Identity and Balance**

```sql
CREATE TABLE Users (
  id      INTEGER PRIMARY KEY,
  name    TEXT    NOT NULL,
  balance REAL,
  status  TEXT
);
```

**Column Breakdown:**

**`id INTEGER PRIMARY KEY`**

- **Purpose:** Unique identifier for each user
- **PRIMARY KEY ensures:** No duplicates, auto-generated if not provided
- **Real-world:** Like a bank account number - unique forever
- **Interview tip:** "Primary keys ensure entity uniqueness and serve as foreign key targets"

**`name TEXT NOT NULL`**

- **TEXT:** Stores strings (variable length)
- **NOT NULL:** Field cannot be empty - database enforces this
- **Why it matters:** Every user needs a name for audit trails and regulatory compliance
- **Interview tip:** "NOT NULL constraints prevent incomplete data at the database level"

**`balance REAL`**

- **REAL:** Stores decimal numbers (floating-point precision)
- **Why not INTEGER:** Money has cents! $1500.00, not $1500
- **Why not TEXT:** Math operations require numeric types
- **Interview tip:** "Financial data uses REAL/DECIMAL types to maintain precision for calculations"

**`status TEXT`**

- **Purpose:** Account state - 'active', 'suspended', 'closed'
- **Business rule:** Suspended accounts cannot transfer money
- **Why at database level:** Enforces business logic regardless of which application accesses the database
- **Interview tip:** "Status fields enable business rule enforcement at the data layer"

---

#### **📊 The Transactions Table - Audit Trail**

```sql
CREATE TABLE Transactions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  from_user_id  INTEGER,
  to_user_id    INTEGER,
  amount        REAL,
  timestamp     TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (from_user_id) REFERENCES Users(id),
  FOREIGN KEY (to_user_id) REFERENCES Users(id)
);
```

**Column Breakdown:**

**`id INTEGER PRIMARY KEY AUTOINCREMENT`**

- **AUTOINCREMENT:** SQLite generates sequential IDs (1, 2, 3...)
- **Purpose:** Every transaction needs unique identifier for audit logs
- **Real-world:** Your bank statement transaction reference number
- **Interview tip:** "Transaction IDs enable audit trail reconstruction and dispute resolution"

**`from_user_id` and `to_user_id`**

- **Purpose:** Records who sent and who received
- **INTEGER type:** Must match User.id values
- **Why two columns:** Alice → Bob is different from Bob → Alice (directional flow)
- **Interview tip:** "Separate columns for sender/receiver enable query optimization and maintain data normalization"

**`amount REAL`**

- **Purpose:** The monetary value transferred
- **REAL for precision:** $100.50, not just $100
- **Critical field:** Must be accurate to the penny for financial compliance
- **Interview tip:** "Amount precision is non-negotiable in financial systems - REAL type maintains decimal accuracy"

**`timestamp TEXT DEFAULT (datetime('now'))`**

- **DEFAULT clause:** If no timestamp provided, SQLite inserts current datetime automatically
- **Format:** ISO 8601 (2026-03-17T14:30:00)
- **Purpose:** Audit trail - when did this transaction occur?
- **Regulatory requirement:** Most financial systems require transaction timestamps for compliance
- **Interview tip:** "DEFAULT timestamps ensure audit trail completeness without application-layer logic"

---

#### **🔐 FOREIGN KEY Constraints - Data Integrity**

```sql
FOREIGN KEY (from_user_id) REFERENCES Users(id)
FOREIGN KEY (to_user_id) REFERENCES Users(id)
```

**What FOREIGN KEYs Prevent:**

**The Problem Without Foreign Keys:**

```sql
-- ❌ This would succeed WITHOUT foreign keys:
INSERT INTO Transactions (from_user_id, to_user_id, amount)
VALUES (1, 999, 100);  -- User #999 doesn't exist!

-- Result: "Ghost transaction" - money transferred to/from non-existent account
```

**The Solution With Foreign Keys:**

```sql
-- ✅ This FAILS with foreign keys enabled:
INSERT INTO Transactions (from_user_id, to_user_id, amount)
VALUES (1, 999, 100);

-- Error: FOREIGN KEY constraint failed
-- Database REJECTS the insert automatically
```

**Why This Matters:**

- Prevents orphaned records (transactions referencing non-existent users)
- Enforces referential integrity at database level
- Catches bugs BEFORE they reach production
- **This is your first adversarial test!** - Can you trick the database? No, because of foreign keys.

**Interview Gold:**

> "I use FOREIGN KEY constraints to enforce referential integrity. In our wallet testing system, this prevents transactions from referencing non-existent users - the database rejects invalid inserts automatically, catching integration bugs before they reach production. This is particularly critical in financial systems where data accuracy is non-negotiable."

---

#### **🧠 Lesson 6: Strategic Test Data Design**

**The Three Test Users:**

```javascript
const TEST_USERS = [
  { id: 1, name: "Alice Martin", balance: 1500.0, status: "active" },
  { id: 2, name: "Bob Chen", balance: 250.75, status: "active" },
  { id: 3, name: "Carol Nguyen", balance: 0.0, status: "suspended" },
];
```

**This isn't random - this is senior QA test design:**

**Alice Martin - The Happy Path User**

- **Balance:** $1,500 (sufficient funds for most tests)
- **Status:** active (can send and receive)
- **Test scenarios:**
  - ✅ Can send $100? YES (sufficient funds)
  - ❌ Can send $2,000? NO (exceeds balance)
  - ✅ Can receive money? YES (active account)

**Bob Chen - The Boundary Case User**

- **Balance:** $250.75 (small amount with cents precision)
- **Status:** active
- **Test scenarios:**
  - ✅ Can send exactly $250.75? YES (empties account to $0.00)
  - ❌ Can send $250.76? NO (insufficient by one cent!)
  - 🎯 What if Bob sends $250.75 twice in 1 millisecond? (Race condition test!)

**Carol Nguyen - The Negative Case User**

- **Balance:** $0.00 (no funds)
- **Status:** suspended (blocked account)
- **Test scenarios:**
  - ❌ Can Carol send money? NO (suspended status)
  - 🤔 Can Carol receive money? (Tests business rule: should we allow deposits to suspended accounts?)
  - 🎯 Can someone send TO Carol? (Edge case: recipient validation)

**The Pattern:**

- **1 user** for happy path (everything works)
- **1 user** for boundary conditions (edge cases, precision tests)
- **1 user** for business rule violations (status checks, zero balance)

**Interview Insight:**

> "I design test data strategically with three user types: Alice for happy-path validation, Bob for boundary testing with cent-level precision, and Carol for business rule edge cases like suspended accounts and zero balances. This coverage ensures we validate normal operations, edge cases, and error handling in a single test suite."

---

#### **🧠 Lesson 7: Idempotency - Production-Ready Scripts**

```javascript
const insertUserStmt = db.prepare(`
  INSERT OR REPLACE INTO Users (id, name, balance, status)
  VALUES (?, ?, ?, ?)
`);
```

**Critical Concept: Idempotency**

**Definition:**
An operation is idempotent if running it multiple times produces the same result as running it once.

**Without `OR REPLACE` (Not Idempotent):**

```
First run:  ✅ Creates Alice, Bob, Carol
Second run: ❌ Error: UNIQUE constraint failed: Users.id
Third run:  ❌ Crashes - script unusable
```

**With `OR REPLACE` (Idempotent):**

```
First run:  ✅ Creates Alice, Bob, Carol
Second run: ✅ Replaces Alice, Bob, Carol with fresh data (reset to clean state)
Third run:  ✅ Still works! Clean state again
```

**Why This Matters in Production:**

**Scenario:** Your test suite runs, makes a mess of the database, then fails.

**Without idempotency:**

- You have to manually DELETE all data
- Or drop and recreate the entire database
- Or write cleanup scripts
- **Fragile and time-consuming**

**With idempotency:**

- Just re-run `node scripts/init_wallet_db.js`
- Database resets to clean state automatically
- **One command = clean environment**

**Real-World Application:**

- Database migration scripts in production
- CI/CD pipeline setup scripts
- Infrastructure-as-Code (Terraform, CloudFormation)
- **All production deployment scripts should be idempotent**

**Interview Gold:**

> "I design database initialization scripts to be idempotent using `INSERT OR REPLACE`, which allows the script to run multiple times safely. This gives us a reliable 'reset button' - running the script always returns the database to a known clean state, which is critical for repeatable test execution in CI/CD pipelines. This mirrors production deployment practices where migration scripts must be safely re-runnable."

---

#### **🧠 Lesson 8: Path Construction - Cross-Platform Compatibility**

```javascript
const DB_PATH = path.join(__dirname, "..", "wallet_backend.db");
```

**Why Not Just Use String Concatenation?**

**❌ Platform-Specific Problem:**

```javascript
// Works on Mac/Linux:
const DB_PATH = "../wallet_backend.db";

// Breaks on Windows (uses backslashes):
// Expected: C:\Users\...\wallet_backend.db
// Got: ..\wallet_backend.db (relative path fails in some contexts)
```

**✅ Cross-Platform Solution:**

```javascript
const DB_PATH = path.join(__dirname, "..", "wallet_backend.db");
```

**Breaking it down:**

**`__dirname`:**

- Built-in Node.js variable
- "Where is this script file located?"
- Example: `/PLAYWRIGHT-bootcamp/scripts/`

**`'..'` (parent directory):**

- "Go up one folder"
- From `/scripts/` → `/PLAYWRIGHT-bootcamp/`

**`'wallet_backend.db'`:**

- The filename
- Final path: `/PLAYWRIGHT-bootcamp/wallet_backend.db`

**Why `path.join()` Is Better:**

- Handles Windows backslashes (`\`) and Unix forward slashes (`/`) automatically
- Normalizes paths (removes redundant separators)
- Works in any environment (local dev, Docker containers, CI/CD runners)

**Interview Tip:**

> "I use Node's `path.join()` for file path construction to ensure cross-platform compatibility. This prevents path separator issues between Windows development environments and Linux CI/CD runners, making our tests portable across different operating systems without modification."

---

#### **✅ Day 16 Completion Checklist**

- [✅] Built `wallet_backend.db` with Users and Transactions tables
- [✅] Understood SQL data types (INTEGER, TEXT, REAL)
- [✅] Implemented FOREIGN KEY constraints for referential integrity
- [✅] Designed strategic test data (Alice/Bob/Carol pattern)
- [✅] Learned idempotency with INSERT OR REPLACE
- [✅] Mastered cross-platform path construction
- [✅] Generated business logic functions (deposit, withdraw, transfer)
- [⏳] Deep understanding of wallet.ts in progress (Day 17)

#### **📁 Files Created Day 16**

- `wallet_backend.db` - SQLite database with Users and Transactions tables
- `scripts/init_wallet_db.js` - Idempotent database initialization script
- `src/wallet.ts` - Business logic functions (generated, understanding in progress)
- `tsconfig.json` - TypeScript compiler configuration

---

### **Day 32: Locator Standards & Dashboard POM**

**Date:** April 22, 2026
**Status:** ✅ Completed

#### **🎯 Key Lessons**

**1. Gold/Silver/Bronze Locator Tiers (corrected)**

| Tier      | Locator                             | Why                                                |
| --------- | ----------------------------------- | -------------------------------------------------- |
| 🥇 Gold   | `getByTestId('data-testid')`        | Built for automation, never changes for UX reasons |
| 🥈 Silver | `getByRole()`, `getByLabel()`       | Semantic, accessibility-linked, stable             |
| 🥉 Bronze | `getByPlaceholder()`, `getByText()` | Fragile — disappears or changes with copy edits    |
| ❌ Avoid  | CSS classes, XPath                  | Break on UI redesigns                              |

**Previous understanding was wrong:** getByPlaceholder was listed as Gold in CLAUDE.md. Corrected today.

**2. Card wrapper vs value element**
Always inspect the child element, not the card container.
`accounts-count-card` = the whole card (returns "Active Accounts2No new accounts this week")
`accounts-count` = just the number (returns "2") ✅

**3. textContent() returns string | null**

```typescript
return (await this.totalBalance.textContent()) ?? "";
```

The `??` (nullish coalescing) means: "if null, return empty string instead."
Without it, TypeScript won't compile because you promised `Promise<string>` but might get `null`.

**4. POM separation of concerns — refresher**

- POM = access layer (fill, click, read)
- Test = judgment layer (is this what I expected?)
- Never put assertions inside a POM

---

**Last Updated:** Day 16 (April 22, 2026)  
**Next Lesson:** Day 17 (Deep dive into wallet.ts business logic - deposit, withdraw, transfer functions)

---

#### **🔍 Research: QA Field Trends (2026)**

**Audit Interview Discovery:**

> "Instead of writing syntax from scratch, a candidate is given functioning but flawed AI-generated code and tasked with identifying hidden risks, such as memory leaks, security vulnerabilities or scalability issues."

**What companies want in 2026:**

- ✅ Selenium/Playwright/Cypress
- ✅ API Testing (REST/SOAP)
- ✅ JIRA (defect tracking)
- ✅ CI/CD pipelines
- ✅ Agile/Scrum
- ✅ **AI/LLM testing** (NEW in 2026)
- ✅ **AI agent integration**
- ✅ **Auditing AI-generated code** (CRITICAL DIFFERENTIATOR)

**Target Role Clarity:**

- QA Architect who DIRECTS AI to write code
- Maintains and verifies AI-generated scripts
- Understands code well enough to audit it
- NOT a code monkey writing everything from scratch

#### **🎯 Arena.ai Discovery**

**Tool purpose:** Compare AI responses side-by-side

**Question asked:**

> "How should I start learning how to prompt Claude Code using TS in Playwright? The junior way or the architect way? I have 8 weeks."

**Gemini Pro 3 answer:**

- Start with Junior Week 1-2 (understand basics)
- Shift to Architect Week 3-8 (structure & patterns)
- 8 weeks is plenty for Architect approach

**Claude Sonnet 4.5 answer:**

- Go Architect from Day 1
- Unlearning bad habits harder than learning good ones first
- 8 weeks is plenty time

**Gemini's Verdict on YOUR progress:**

> "The 'Junior' phase is officially over. We shift to Architect Prompts. From tonight onward, your prompts will dictate structure."

**Decision:** Start Page Object Model (POM) Week 2, Day 8

#### **🚀 Gemini Generated First POM**

**File created:** `pages/SearchPage.ts`

**What it includes:**

```typescript
export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly productHeadings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder("Search For Products").first();
    this.productHeadings = page.getByRole("heading", { level: 4 });
  }

  async search(term: string): Promise {
    await this.searchInput.fill(term);
    await this.searchInput.press("Enter");
  }
}
```

**Why this matters:** Reusable, maintainable, professional structure

#### **✅ Completion Checklist**

- [x] Completed Week 1 review quiz (82.7%)
- [x] Identified error message reading gap
- [x] Discovered Arena.ai tool
- [x] Researched 2026 QA interview trends
- [x] Found audit interview format (AI code review)
- [x] Decided on Architect learning path
- [x] Gemini generated first POM (SearchPage.ts)
- [x] Ready for Week 2: POM phase

### **Day 33: selectOption() & Dropdown Strategies**

**Date:** April 24, 2026
**Status:** ✅ Completed

#### **🎯 Key Lessons**

**1. selectOption() — three ways**

| Method                                       | When to use                                 |
| -------------------------------------------- | ------------------------------------------- |
| `selectOption('deposit')`                    | Value is stable and predictable             |
| `selectOption({ label: 'Primary Savings' })` | Value is dynamic, label is stable           |
| `selectOption({ label: /Primary Savings/ })` | Label includes changing data (like balance) |

**2. The two fragility traps — both caught in one session**

Trap 1 — Dynamic IDs:
`id_1774728332594_jboac8a3k` — timestamp + random string.
Hardcoding this breaks the test when data resets.
Fix: use `{ label: }` instead.

Trap 2 — Balance in label:
`'Primary Savings - $5,000.00'` — balance changes after every transaction.
Fix: use RegExp `{ label: /Primary Savings/ }` — matches partial text.

**3. Promise<void> vs Promise<string> — locked**

| Return type       | When                                                        |
| ----------------- | ----------------------------------------------------------- |
| `Promise<void>`   | Method does something, returns nothing (goto, login, click) |
| `Promise<string>` | Method reads something, returns text (getTotalBalance)      |

**4. depositAmount as string**
`fill()` only accepts strings. Even numbers go in as `'500'`, not `500`.

### **Day 34: CI/CD Pipeline & GitHub Actions**

**Date:** April 24, 2026
**Status:** ✅ Completed

#### **🎯 Key Lessons**

**1. CI/CD in one picture**

**2. Workflow file anatomy**

```yaml
on: push          # when to run
timeout-minutes   # kill job after this long (use 60, not 3)
runs-on           # GitHub's server (ubuntu-latest)
npm ci            # installs strictly from package.json
env:              # reads from GitHub Secrets vault
```

**3. GitHub Secrets**

- Secrets vault = locked fridge
- env section in workflow = recipe saying "take milk from fridge"
- Without env section, secrets exist but tests can't read them

**4. 'Works on my machine' trap**
dotenv was installed locally but missing from package.json.
GitHub runs npm ci — installs only what's in package.json.
Fix: npm install dotenv --save

**5. JUnit XML**
Playwright generates test-results/results.xml after tests run.
Xray reads this file to create Test Executions in Jira automatically.

```yaml
reporter: [["html"], ["junit", { outputFile: "test-results/results.xml" }]]
```

### **Day 33: E2E Banking Flow & Transaction POM**

**Date:** April 23, 2026
**Status:** ✅ Completed

#### **🎯 Key Lessons**

**1. Radix UI combobox vs native select**

| Element         | HTML tag                   | Playwright method                 |
| --------------- | -------------------------- | --------------------------------- |
| Native dropdown | `<select>`                 | `selectOption('value')`           |
| Custom combobox | `<button role="combobox">` | `click()` + `getByRole('option')` |

Always inspect HTML before assuming dropdown type.

**2. Three selectOption() methods**

```typescript
selectOption("deposit"); // stable value
selectOption({ label: "Primary Savings" }); // dynamic ID, stable label
selectOption({ label: /Primary Savings/ }); // label includes changing data
```

**3. Hard reload vs client-side navigation**

- `page.goto()` = hard reload, resets React/Next.js in-memory state
- Clicking nav link = client-side navigation, preserves React state
- Use nav link click when verifying data updated after an action

**4. POM architectural gap**
SecureBankDashboardPage was missing goto(). Caught during E2E build.
Rule: review all POMs before writing the test, not after.

---

### **Day 17: AI-Driven Workflow Breakthrough - Codegen, Plan Mode, and Audit Thinking**

**Date:** Thursday, March 19, 2026  
**Duration:** 11.5 hours  
**Status:** ✅ Completed

#### **🎯 The Shift**

Pivoted from "learning to code" to "learning to direct AI and audit its output" - the actual 2026 QA Architect role.

#### **🛠️ Tools Mastered**

**1. Playwright Codegen (Recording)**

```bash
npx playwright codegen parabank.parasoft.com
```

- Records user interactions, generates TypeScript code
- Used to scout page structure before writing POMs
- Provides raw locators that need upgrading to semantic ones

**2. Claude Code `/plan` Mode**

- AI researches codebase BEFORE generating code
- Explains decisions in a table format
- Allows review/editing before execution
- **Trigger:** `/plan` or `Shift+Tab` twice

**3. Web Fetch for Autonomous Scouting**

- Claude Code can fetch pages and extract form fields automatically
- No need to manually inspect DevTools
- AI makes locator decisions based on page structure

#### **🧠 Key Lesson: The Password Mismatch Trap**

**What AI Generated:**

```typescript
async register(..., password: string): Promise<void> {
  await this.confirmPasswordInput.fill(password); // ← Forces match!
}
```

**The Gap:** Can't test negative scenario (password mismatch).

**The Fix:**

```typescript
async register(..., password: string, confirmPassword: string): Promise<void> {
  await this.confirmPasswordInput.fill(confirmPassword); // ← Explicit
}
```

**The Principle (Added to CLAUDE.md Section 7):**

> "Method parameters must be fully explicit. No optional defaults that hide related fields. Test intent must be visible at call site."

**Why This Matters:**

- Happy path: `register('Pass1', 'Pass1')` ✅ Clear
- Negative path: `register('Pass1', 'Wrong')` ✅ Testable

#### **🎯 New Training Focus: AI Auditing**

**The Workflow:**

1. **Generate** - AI creates POM/test
2. **Audit** - Ask "What scenarios does this NOT handle?"
3. **Challenge** - Push back on AI's decisions
4. **Fix** - Redirect AI with better approach
5. **Document** - Save lesson in QA_AUDIT_LESSONS.md

**Files Created Day 17:**

- `pages/ParabankLoginPage.ts` - Login POM with semantic locators
- `pages/ParabankRegisterPage.ts` - 11-parameter registration method
- `QA_AUDIT_LESSONS.md` - New audit training system

#### **📊 Locator Priority Cheat Sheet**

🥇 **Gold Tier:** `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`  
🥈 **Silver Tier:** `getByTestId`  
🥉 **Bronze Tier:** CSS selectors, XPath (legacy apps only)

#### **✅ Day 17 Wins**

- [✅] Learned codegen workflow (scout → generate → refine)
- [✅] Mastered `/plan` mode in Claude Code
- [✅] Prompted AI to autonomously fetch and analyze pages
- [✅] Spotted design flaw AI missed (password mismatch)
- [✅] Challenged AI's solution, taught better approach
- [✅] Updated CLAUDE.md with "explicit parameters" rule
- [✅] Created QA_AUDIT_LESSONS.md documentation system
- [✅] Built 2 production-quality POMs (Login, Register)

---

**Last Updated:** Week 3, Day 17 (March 19, 2026)
**Next Lesson:** Day 18 - Test Writing & Login Page Audit

---

--

#### **🎯 Learning Objective**

TBD - Will cover loop syntax variations and array methods

---

## Week 2: Playwright Architecture

_Lessons will be added as we progress_

---

## Week 3: AI Prompt Engineering

_Lessons will be added as we progress_

---

---

### **Day 36: beforeEach Hooks and Test Independence**

**Date:** April 28, 2026
**Status:** ✅ Completed

#### **🎯 Key Lessons**

**1. What is beforeEach and why does it exist?**

When you have multiple tests that all need the same starting point (logged in, page loaded, POMs ready), you have two choices:

- Copy/paste the setup into every test — works, but if something changes you fix it in 10 places
- Put the setup in `beforeEach` — runs automatically before every test, one place to maintain

`beforeEach` is Playwright's way of saying: "Before you run any test in this block, do this first."

```typescript
test.describe('SecureBank E2E', () => {
  test.beforeEach(async ({ page }) => {
    // This runs before Test 1, then again before Test 2, etc.
    await loginPage.goto();
    await loginPage.login('admin', 'admin123');
  });

  test('Test 1 - Happy Path', async ({ page }) => {
    // Login already done. Jump straight to the unique steps.
  });

  test('Test 2 - Negative Path', async ({ page }) => {
    // Login already done here too. Fresh page, fresh login.
  });
});
```

**2. let vs const for shared POM variables**

`const` means: assigned once, never reassigned.
`let` means: assigned now, can be reassigned later.

`beforeEach` reassigns the POM variables before every test run. So they must be `let`, not `const`.

```typescript
// Declared at describe scope — visible to ALL tests inside
let loginPage: SecureBankLoginPage;
let dashboardPage: SecureBankDashboardPage;

test.beforeEach(async ({ page }) => {
  loginPage = new SecureBankLoginPage(page);     // reassigned each time
  dashboardPage = new SecureBankDashboardPage(page);
});
```

If you used `const` here, TypeScript would throw an error the second time beforeEach tried to assign it.

**3. Scope: why declare outside beforeEach?**

Variables declared inside `beforeEach` are trapped inside that block. Tests can't see them.
Variables declared inside the `describe` block are visible to everything inside it — including `beforeEach` and all tests.

```
describe block
  ├── let loginPage       ← visible to everything below
  ├── beforeEach          ← fills loginPage in
  ├── Test 1              ← can use loginPage ✅
  └── Test 2              ← can use loginPage ✅
```

**4. Test independence — every test gets a fresh start**

Playwright gives each test its own browser page. `beforeEach` runs on that fresh page before each test. This means:

- Test 1 does not affect Test 2
- If Test 1 fails, Test 2 still runs from a clean state
- Tests can run in any order without breaking each other

This is called **test independence** and it is non-negotiable in production test suites.

**5. Parallel vs sequential execution**

By default Playwright runs tests in parallel (multiple workers = multiple browser windows at once). To run tests one after the other so you can watch:

```bash
npx playwright test --workers=1   # sequential — one at a time
npx playwright test --headed      # shows the browser window
npx playwright test --trace on    # records every step for inspection
```

**6. git checkout HEAD -- filename**

When you accidentally delete or overwrite a file, this restores it from the last commit:

```bash
git checkout HEAD -- tests/bootcamp/day32_securebank_e2e.spec.ts
```

`HEAD` = last commit. `--` separates the branch from the file path. Nothing is lost as long as it was committed.

**7. input[type=number] rejects non-numeric input**

Discovered during Test 2 development: the browser itself prevents typing `'abc'` into a number input. Playwright throws `Cannot type text into input[type=number]`. Always inspect the HTML element type before writing negative tests — the browser may already handle the validation before your code runs.

---

### **Day 37: Playwright Trace Viewer and Portfolio Documentation**

**Date:** April 29, 2026
**Status:** ✅ Completed

#### **🎯 Key Lessons**

**1. Playwright Trace Viewer — your black box recorder**

The trace viewer records every single action your test takes: clicks, fills, navigations, assertions. After the run you open it in a browser and scrub through it frame by frame — like a flight recorder for your test.

```bash
npx playwright test --trace on       # records traces for all tests
npx playwright show-trace trace.zip  # opens the viewer in your browser
```

Use it when:
- A test passes but you're not sure what actually happened
- You want to confirm what an error message looked like
- You need to find the exact element locator from a live run

**2. How we used it on Day 36**

We ran Test 2 (empty amount submission) with `--trace on` to see what the SecureBank app actually showed. The trace revealed the exact error text: `"Please enter a valid amount"`. We then wrote the real assertion from that observation:

```typescript
await expect(page.getByText(/please enter a valid amount/i)).toBeVisible();
```

This is the correct workflow: run with trace, observe, then assert. Never guess what the app shows.

**3. Revert File in VS Code**

When VS Code shows a stale/cached version of a file:
- Press `Ctrl + Shift + P`
- Type `Revert File`
- Press `Enter`

Forces VS Code to reload the file from disk.

---

**Last Updated:** Day 37 (April 29, 2026)
**Next Lesson:** TypeScript review — beforeEach, let/const, scope, async/await (2h/day morning routine)

---
