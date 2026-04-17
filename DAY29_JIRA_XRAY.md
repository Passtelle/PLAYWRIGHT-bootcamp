# Day 29: Jira + Xray — Real-World Test Management for QA Engineers

**Date:** April 12, 2026  
**Project:** Banking API Suite (BAS) — qa-ai-driven-bootcamp.atlassian.net  
**Purpose:** How QA uses Jira + Xray in the real world, and how it connects to CI/CD

---

## The Mental Model — Two Layers

**Jira** is the whole team's command center. Developers, PMs, QA, DevOps all work there.  
It tracks what needs to be built, what's broken, and what's done.

**Xray** is the QA floor inside that building. It adds the test management layer:  
test cases, test plans, test executions, coverage reports, and defect traceability.

Without Xray, Jira has no concept of a "test case." Just Stories and Bugs.  
Xray adds the full QA layer on top.

---

## The Complete QA Workflow

This is what happens on every professional team, every sprint:

BA/Dev creates a User Story → defines the requirement
QA writes Test Cases → linked to that Story (traceability)
CI/CD runs Playwright tests → results exported as JUnit XML
GitHub Actions posts to Xray → Test Execution created automatically
Bug found → QA files a Defect → linked back to the Story
Story shows: tests passed/failed + open bugs → team sees full picture

Everything connects back to the Story. That is the traceability chain.

---

## The Core Xray Entities

| Entity             | What it is                       | Example in our project      |
| ------------------ | -------------------------------- | --------------------------- |
| **Test**           | A single test case               | BAS-4: Happy path login     |
| **Test Execution** | Record of tests being run        | Auto-created by CI/CD       |
| **Defect**         | A bug linked to a test and story | (Future: when we find bugs) |

**Optional entities** (for larger teams):

- **Precondition** — Setup required before a test runs
- **Test Set** — A group of related tests (suite)
- **Test Plan** — Sprint-level coverage planning

For CI/CD, you need: **Test + Test Execution** at minimum.

---

## How Items Connect — The Traceability Map

BAS-1 (Story) ← The requirement: "User can log in with valid credentials"
↑ linked via "tests"
BAS-4 (Test) ← The test case: Happy path login (Gherkin)
↓ executed in
Test Execution ← Auto-created when CI/CD runs
↓ finds (if bugs exist)
BAS-X (Bug/Defect) ← Linked back to BAS-1

### How to create these connections in Jira:

**Test → Story link (BAS-4 covers BAS-1):**  
When creating BAS-4 → "Linked Work Items" → Link type: "tests" → Select BAS-1

**Bug → Story link:**  
When creating the Bug → "Linked Work Items" → Link type: "relates to" → BAS-1

---

## Test Types in Xray

When creating a Test (BAS-4), you choose the test type:

| Type         | When to use                       | Format                               |
| ------------ | --------------------------------- | ------------------------------------ |
| **Manual**   | Step-by-step execution by a human | Action + Test Data + Expected Result |
| **Cucumber** | BDD/Gherkin — wires into CI/CD    | Given / When / Then / And            |
| **Generic**  | Freeform — for non-standard tests | Description only                     |

**For API tests with Playwright + CI/CD: use Cucumber.**  
The Gherkin you write here is what Xray tracks when CI/CD posts results back.

### Gherkin Format (BDD)

Gherkin is the language of BDD test cases. It lives in the **Scenario** section of a Cucumber-type Test in Xray.

```gherkin
Feature: User Authentication
  As a registered user
  I want to log in with valid credentials
  So that I can receive an access token

Scenario: Happy path login with valid credentials
  Given the DummyJSON API is available at "https://dummyjson.com"
  When I send a POST request to "/auth/login" with the following credentials:
    | username | emilys     |
    | password | emilyspass |
  Then the response status code should be 200
  And the response body should contain an "accessToken" field
  And the "accessToken" value should be a non-empty string
  And the response time should be less than 2000ms
```

**Given** = precondition / system state  
**When** = the action being tested  
**Then** = the expected outcome  
**And** = continuation of the previous keyword

---

## How CI/CD Connects to Xray

This is the Week 5-6 integration. Here's the full pipeline:

Dev pushes code to GitHub
GitHub Actions triggers
Playwright runs all tests
Playwright exports results → JUnit XML file
GitHub Action calls Xray REST API
Xray creates a Test Execution in Jira automatically
BAS-4 shows: PASSED (green) or FAILED (red)
BAS-1 shows coverage: 1 test, last run passed

For this to work:

- Your Test in Xray must exist (BAS-4) ✅
- Your Playwright test must have the same test name or Xray key tagged
- GitHub Actions needs your Xray client ID + secret (set as GitHub Secrets)

---

## Complete Step-by-Step: Creating a Test Case for CI/CD

### Step 1: Create the Test Case

**Click** the blue **"Create"** button

| Field                 | What to enter                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Project**           | Banking API Suite                                                                                                                        |
| **Issue Type**        | TEST                                                                                                                                     |
| **Summary**           | Happy Path Login - Valid Credentials Return Access Token                                                                                 |
| **Description**       | Verify that a POST request to /auth/login with valid credentials returns a 200 status code and a valid accessToken in the response body. |
| **Sprint**            | BAS Sprint 1                                                                                                                             |
| **Labels**            | `api`, `auth`, `smoke`                                                                                                                   |
| **Linked Work Items** | Link type: "tests" → BAS-1                                                                                                               |

**Click "Create"**

---

### Step 2: Add the Gherkin Scenario

1. **Open the Test ticket** (BAS-4)
2. **Click "Test details" tab**
3. **Change Test Type** to "Cucumber"
4. **Paste Gherkin** into the Scenario editor
5. **Click ✓ to save**

---

### Step 3: Verify the Link

**Go to BAS-1** (the Story)

**Look for "Linked Work Items" section**

You should see: **"is tested by BAS-4"**

This means coverage is tracked. ✅

---

## Day 29 Progress

### What Was Built

| Ticket | Type              | Content                                                             | Status                            |
| ------ | ----------------- | ------------------------------------------------------------------- | --------------------------------- |
| BAS-1  | Story             | "User can log in with valid credentials and receive an accessToken" | ✅ Created                        |
| BAS-4  | Test (Cucumber)   | Happy path login — Gherkin with 7 steps                             | ✅ Created                        |
| BAS-5  | Epic/Precondition | "User exists"                                                       | ✅ Created (optional, not linked) |

### Connections Complete

- ✅ BAS-4 → BAS-1 (Link type: "tests")
- ✅ BAS-1 shows test coverage

---

## Interview Q&A — Senior Level

---

**Q: "How do you maintain traceability from requirement to test result?"**

> "Every Test in Xray is linked to a User Story using the 'tests' relationship. When CI/CD runs, Playwright exports JUnit XML and GitHub Actions posts it to the Xray API. Xray creates a Test Execution automatically and updates the coverage status on the Story. So on the ticket you see: requirement, linked test cases, last execution result, and open defects — all in one place. That's end-to-end traceability without any manual updates."

---

**Q: "A developer pushes a hotfix at 2am. How does your setup tell you what needs to be tested before deploy?"**

> "Test cases are tagged with labels matching the affected component — auth, payments, profile. The CI pipeline runs the tagged subset automatically on every push to main. If anything fails, the deploy is blocked. The Test Execution in Xray gives the on-call engineer full context — which tests ran, which failed, what the error was — without digging through logs."

---

**Q: "What's the difference between a Test Plan and a Test Execution in Xray?"**

> "A Test Plan is intent — 'for this sprint, we plan to run these 30 test cases against these requirements.' A Test Execution is evidence — 'on April 11, these 30 tests ran, 28 passed, 2 failed.' The Plan is for planning and coverage decisions. The Execution is the audit trail. In regulated industries like financial services, you need both — the plan shows what was scoped, the execution shows what actually happened."

---

**Q: "How do you handle flaky tests in your Xray reporting?"**

> "Flaky tests are a data quality problem. A test that passes 80% of the time is not a passing test — it's an unreliable measurement. I tag them with a 'flaky' label in Xray and exclude them from release sign-off gates. The rule I use: flaky tests get a 72-hour quarantine — fix them or delete them. If a flaky test stays in the suite it starts masking real failures, which is worse than having no test at all."

---

**Q: "How do you use Xray in a CI/CD pipeline — walk me through it."**

> "Playwright runs in GitHub Actions on every push to main. At the end of the run, we use the Xray GitHub Action to post the JUnit XML results to Jira using the Xray REST API. Xray maps each test result to a Test Case by name or by the Xray test key embedded in the spec. It creates a Test Execution automatically with Pass/Fail/Blocked status per test. The Story shows a live coverage badge. If a test fails, the PR is blocked. The developer sees the failure reason directly on the Jira ticket — no log hunting."

---

**Last Updated:** Day 29 (April 12, 2026)  
**Next:** AI-Powered Test Case Generation & Playwright API Automation
