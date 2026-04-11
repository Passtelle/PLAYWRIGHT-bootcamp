# 🎙️ Interview Practice Log

**Bootcamp:** AI-Driven QA Architect Training
**Student:** Senior QA Engineer (15 years experience, IBM/Fiserv)
**Practice Start Date:** March 23, 2026 (Day 19)

---

## **Practice Format:**

**Daily Structure (10-15 minutes):**
1. Coach presents ONE real job requirement or technical question
2. Student answers in natural voice (record or type)
3. Coach provides feedback in student's voice (not robot polish)
4. Student practices polished version 3-5 times

**Goal:** Build confidence in technical explanations using natural, authentic voice

---

## **Session 1: WireWheel - Data Factory Pattern**
**Date:** March 22, 2026 (Day 18)
**Job Description:** "Build & enhance a web test automation using Playwright TypeScript"

### **The Question:**
> "At WireWheel, our QA team has a bad habit. In our Playwright tests, all test data—like user names, emails, and addresses—is hardcoded directly inside the test() blocks. Because of this, our tests fail constantly with 'Duplicate User' errors when we run in parallel, and the files are massive and hard to read. If you joined our team, how would you re-architect our test data strategy?"

### **Raw Answer (First Attempt):**
> "I would use a helper, the NPM faker, to generate fake users so the data is not hard-coded in your test files, and is refreshed every time we run a test. We import the helper file in the test file so a new user(s) is generated to test a user registration, for example."

### **Coach Feedback:**
**What was RIGHT:**
- ✅ Solved the problem completely (Faker.js helper)
- ✅ Explained the workflow (import helper into tests)
- ✅ Identified the benefit (not hardcoded, fresh every run)

**What was MISSING:**
- More structure (Problem → Solution → Benefit)
- Slight confidence boost in delivery

### **Polished Answer (In Student's Voice):**
> "Okay, so the issue is hardcoded data - when you run tests in parallel, you get duplicate user errors because everyone's using the same fake email or username.
>
> What I'd do is create a helper file that uses Faker.js - it's an npm package that generates random realistic data. So instead of hardcoding 'john@test.com' in every test, you import the helper and it gives you a fresh user every time with a unique timestamp-based username.
>
> The big win is your tests can run in parallel without colliding, and your test files stay clean because all the data generation logic lives in one place."

### **Key Vocabulary Learned:**
- **Data Factory Pattern** = Centralized helper for generating test data
- **Separation of Concerns** = Data logic separate from test logic
- **Parallel Execution** = Running multiple tests at the same time
- **Collision** = When tests interfere with each other (duplicate data)

### **Practice Status:** ⏳ Need to practice polished version 3-5 times

---

## **Session 2: API Testing Fundamentals**
**Date:** March 25, 2026 (Day 21)
**Topic:** API testing concepts unlocked from Postman lab

### **Interview Questions Now Ready:**

**Q: "What's the difference between GET and POST?"**
> "GET retrieves data without modifying anything — like viewing a list of bank customers. POST sends data to create something new — like submitting a registration. GET has no request body. POST has a body containing the data you're creating."

**Q: "What do you verify in an API test?"**
> "At minimum: the status code — did it succeed or fail correctly? The response time — is performance within acceptable bounds? And the response body — does it contain the expected data and structure? For negative tests, I verify the right error code is returned with a meaningful error message."

**Q: "What's the difference between 401 and 403?"**
> "401 and 403 are commonly confused because the HTTP spec mislabeled 401 as 'Unauthorized' in 1999. The correct meaning of 401 is unauthenticated — the server doesn't know who I am, I need to log in. 403 is the one that actually means unauthorized — the server knows exactly who I am but I don't have permission for that resource. They require different fixes: 401 needs authentication, 403 needs different permissions."

**Q: "How do you handle authentication in API tests?"**
> "I make a login POST request first, extract the Bearer token from the response, and pass it in the Authorization header on all subsequent protected endpoints. In Postman I save the token as an environment variable so it's reusable. In Playwright I store it in a variable and pass it programmatically across the test."

**Q: "What's the difference between REST and JSON?"**
> "REST is the architectural style — the rules for how the API conversation is structured: use GET to read, POST to create, and status codes to communicate outcomes. JSON is the data format — the language the data is written in. They work together but they're completely separate. You could technically use XML with REST, but JSON won the industry standard debate."

### **Key Vocabulary:**
- **Pagination** — returning data in chunks (limit/skip pattern)
- **Query parameter** — filter appended to URL (`?q=John`)
- **Bearer token** — proof of authentication passed in headers
- **JWT** — JSON Web Token; encodes user identity in a signed string
- **Nested object** — a value that contains its own set of properties `{}`

### **Practice Status:** ⏳ Practice these answers 3-5 times in natural voice

---

## **Vocabulary Translation Table:**

**Use this to translate your natural phrasing into "Resume Words" when needed:**

| My Natural Phrasing | Resume Words (Interview Polish) |
|---------------------|----------------------------------|
| "generate fake users" | "dynamic data generation" |
| "data is not hard-coded" | "abstract data out of test blocks" |
| "refreshed every time" | "eliminates data collisions during parallel execution" |
| "import the helper file" | "centralized Data Factory pattern" |
| "so tests don't fail" | "separation of concerns" |
| "keeps files clean" | "improves maintainability and readability" |
| "tests don't step on each other" | "enables safe parallel execution" |

**Note:** Use resume words SPARINGLY. Natural voice is more authentic and trustworthy in interviews.

---

## **Session 3: ISTQB Foundation Vocabulary**
**Date:** March 27, 2026 (Day 22)
**Topic:** The three terminology traps that catch experienced testers

### **The Three Core Distinctions:**

**Q: "What's the difference between an error, a defect, and a failure?"**
> "An error is the human mistake — a developer misunderstands a requirement. A defect is the bad code that results from that mistake, also called a bug or fault. A failure is what happens when that defect executes and something breaks for the user. The sequence is: error creates a defect, defect causes a failure. ISTQB keeps these three strictly separate."

**Q: "What's the difference between verification and validation?"**
> "Verification is 'are we building it right?' — checking against the spec, reviewing documents, static testing. Validation is 'are we building the right thing?' — does it meet the user's actual needs, dynamic testing. A trick that sticks: Validation involves the user."

**Q: "What's the difference between regression testing and confirmation testing?"**
> "Confirmation testing is running the specific test that failed after a bug is fixed — confirming the fix works. Regression testing is running the broader suite to make sure the fix didn't break anything else. Most testers call both 'regression,' which is why this question catches people."

### **ISTQB Study Strategy (time-constrained):**
1. Take a practice exam cold first — wrong answers = your study list
2. Learn ISTQB vocabulary for things you already know by different names
3. Focus on Chapters 2, 4, and 5 (most exam questions come from here)
4. Do 2-3 practice exams per week alongside studying
5. Pass mark is 65% (26/40) — with 15 years experience, vocabulary is the main gap

### **Practice Status:** ✅ Vocabulary memorized, practice exams started

---

## **Session 4: Test Case Writing Practice**
**Date:** March 27-28, 2026 (Day 22)
**Topic:** Writing test cases from user stories — rediscovering the muscle memory

### **Key Insight:**
The knowledge was never lost. The format habit drifted — writing steps/procedures instead of test cases (multiple scenarios). Two weeks of daily practice fixes this.

### **Exercise 1: Login User Story**
Score: ~5/14 scenarios on first attempt (format issue, not knowledge gap)

Key gaps identified: missing security test (SQL injection), missing concurrent/state edge cases

### **Exercise 2: Bank Transfer ($500 checking, $200 savings)**
Standout answers:
- TC11: Validate user cannot login with old password (security instinct)
- TC04/TC05: Validate both balances after transfer (state verification)
- Boundary sweep: $0.50, -$100, $501 (advanced instinct)

Gaps: happy path was bundled, $0 and $1 boundary missing, same-account transfer

### **Exercise 3: Password Reset via Email**
Score: ~9-10/15 (significant improvement in one session)

Standout answers: link expiry (TC05), old password invalidation (TC11), boundary sweep on password field (TC09)

Key lesson: "Reset password" and "Change password" are two different user stories. Reset = forgot password, not logged in. Change = knows password, logged in.

Gaps: link invalidation after use, multiple reset requests, same password as old, security nuance on "email not found" response

### **Confirmed Strengths:**
- Boundary value analysis (fires on instinct)
- State verification after actions
- End-to-end loop thinking (verify the whole flow, not just the form)

### **Identified Gap:**
Security testing layer — SQL injection in input fields, audit logging for compliance, PII masking, role hierarchy (Admin > Agent > Customer). This is new material, not forgotten knowledge. Week 5 dedicated session planned.

### **Practice Status:** ⏳ Daily test case exercises recommended until format is automatic

---

## **Session 5: API Testing Layers — The Full Picture**
**Date:** March 28-30, 2026 (Day 23)
**Topic:** Beyond the 4 layers — what separates junior from architect

### **The 10 Testing Layers:**

| Layer | Name | Level |
|-------|------|-------|
| 1 | Happy Path | Foundation |
| 2 | Negative Testing | Foundation |
| 3 | Boundary Value Analysis | Foundation |
| 4 | Security Testing | Foundation |
| 5 | Contract Testing | Mid-level |
| 6 | Idempotency | Senior |
| 7 | Concurrency | Architect |
| 8 | Data Persistence | Mid-level |
| 9 | Error Information Disclosure | Senior |
| 10 | Audit Trail | Architect (regulated industries) |

**Q: "How do you approach API testing?"**
> "I start with the 4 foundation layers — happy path, negative, boundary value analysis, and security. Then I go deeper depending on the domain. For fintech, I always add idempotency testing — double submissions are catastrophic in banking. I check error disclosure to make sure failures don't leak database details. And in regulated industries like financial services, I verify the audit trail exists for compliance. The difference between a checklist tester and an architect is knowing which layers to skip and why."

**Q: "What is contract testing?"**
> "Contract testing verifies that the API response matches the specification — not just the status code, but the field names, data types, and structure. A response can return 200 and still be wrong if age comes back as a string instead of a number. The frontend might crash doing math on that string. I use pm.test in Postman to assert field types on every response."

**Q: "What is idempotency and why does it matter?"**
> "Idempotency means sending the same request twice produces the same result — no duplicate side effects. In a payment system, if a network drop causes a retry, you need the transfer to happen once, not twice. I test this by sending the same POST request multiple times and verifying the outcome is identical."

**Q: "What's the difference between boundary and edge case?"**
> "They're related but boundary value analysis is the formal ISTQB term — testing the exact boundaries of valid input. $500 balance: transfer $500 (exactly at limit), $500.01 (one cent over), $0 (minimum). Edge case is casual language for unusual scenarios. In interviews I use BVA — it signals ISTQB knowledge."

### **Practice Status:** ⏳ Practice the 10-layer answer 3-5 times

---

## **Session 6: API Speed — Shifting from UI to API Layer**
**Date:** April 7, 2026 (Day 25)
**Topic:** Why API tests solve slow UI test suites

### **The Question:**
> "At WireWheel, our UI automated test suite is taking 45 minutes to run, and it is slowing down our developers. How would you use your knowledge of API testing and tools like Postman to help solve this problem?"

### **The Answer (in your voice):**
> "UI tests are incredibly slow because they have to wait for the browser to load, buttons to render, and animations to finish. API tests run in milliseconds. To fix the 45-minute delay, I would look at our UI suite and take out anything that doesn't need a browser. If we are just verifying that a user account was created in the database, we can test that instantly through the API. We leave the UI tests only for the critical user journeys, which drastically cuts down execution time."

### **Why this answer works:**
- Shows you understand the root cause (browser overhead)
- Demonstrates architecture thinking (what needs a browser vs what doesn't)
- Gives a concrete action plan (audit the suite, move logic tests to API layer)
- Signals you know both layers — not just UI automation

### **Key vocabulary:**
- **Test pyramid** — UI tests at the top (few, slow), API in the middle, unit tests at the base (many, fast)
- **Shifting left** — catching bugs earlier in the pipeline, at the API layer before they reach the UI

### **Practice Status:** ⏳ Practice this answer 3-5 times in natural voice

---

## **Session 7: Authentication API — Layer 1 (Happy Path)**
**Date:** April 7-8, 2026 (Day 26-27)
**Topic:** Walking through a full auth endpoint test

### **The Question:**
> "Walk me through your approach to testing an authentication API endpoint."

### **The Answer (in your voice):**
> "I always start with Layer 1: The Happy Path. I send a POST request with valid credentials, assert the 200 status code, and parse the JSON response to verify the accessToken is generated. Once I prove the Happy Path is rock solid, I store that token as a variable for downstream requests, and immediately pivot to Layer 2: Negative Testing — like passing invalid passwords or malformed JSON — to ensure the API fails securely with a 400 or 401."

### **The Code Pattern (Postman):**
```javascript
const body = pm.response.json();

pm.test("Login returns 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Response contains accessToken", function() {
    pm.expect(body).to.have.property('accessToken');
});
```

### **Practice Status:** ⏳ Practice 3-5 times in natural voice

---

## **Session 8: API Negative Testing — Layer 2**
**Date:** April 7-8, 2026 (Day 26-27)
**Topic:** How API negative testing differs from UI negative testing

### **The Question:**
> "How do you approach API negative testing? How is it different from UI negative testing?"

### **The Answer (in your voice):**
> "In my Playwright and Postman frameworks, I treat UI negative testing and API negative testing differently. UI testing verifies the user experience of a failure — the red warning box, the error message on screen. API testing verifies system integrity. I always assert that the endpoint returns the correct 4xx status code rather than crashing with a 500, and I parse the JSON response body to ensure the exact error string matches our API contract. This guarantees the backend is actively protecting the database."

### **The Key Distinction:**
- UI negative test: "Does the user see the right error message?"
- API negative test: "Does the server reject bad input gracefully without crashing?"
- A 500 on a negative test IS A BUG. The server should return 400, not crash.

### **The Code Pattern (Postman):**
```javascript
const body = pm.response.json();

pm.test("Invalid login returns 400", function() {
    pm.response.to.have.status(400);
});

pm.test("Error message matches contract", function() {
    pm.expect(body.message).to.eql('Invalid credentials');
});
```

### **The Pancake Rule:**
Stack pm.test blocks independently. Never nest one inside another. Each test is its own block, sitting on top of the last one like pancakes. This keeps failures isolated — one failing test doesn't take down the others.

### **Practice Status:** ⏳ Practice 3-5 times in natural voice

---

## **Session 9: The Complete 4-Layer API Testing Answer**
**Date:** April 10, 2026 (Day 28)
**Topic:** Tying all 4 layers into one senior-level interview answer

### **The Question:**
> "How do you approach API testing?"

### **The Answer (in your voice):**
> "I work through four layers. I start with the happy path — valid credentials, correct status, response contract verified. Then negative testing — wrong password, missing fields — making sure the server rejects bad input with the right 4xx code and a clear message, never a 500. Then boundary testing — empty strings, missing fields, oversized inputs — the edges where validation breaks down. And finally security: SQL injection attempts, unprotected endpoint access, malformed tokens. Every one of those should return 401 or 400. If any of them returns 200 or 500, that's a defect. I document the expected behavior for each layer before I write a single assertion."

### **The Key Distinctions You Can Now Explain:**
- 400 vs 500: server rejected input (400) vs server crashed (500) — 500 on a negative test IS a bug
- 401 vs 403: unauthenticated (no/bad token) vs unauthorized (valid token, wrong permissions)
- eql vs include: exact match vs partial match — use eql when wording is a spec requirement
- Empty string vs missing field: same behavior here, but worth testing both — some APIs treat them differently
- No token vs fake token: different 401 messages — server distinguishes between absence and invalidity

### **Practice Status:** ⏳ Practice out loud with voice Claude — 3-5 times

---

**Last Updated:** Day 28 (April 10, 2026)
**Next Session:** Day 29 — Jira & Xray workflow, BDD test cases, defect management
