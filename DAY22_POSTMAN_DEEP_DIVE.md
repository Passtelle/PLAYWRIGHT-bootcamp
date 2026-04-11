# Day 22: Postman Deep Dive
## How QA Engineers Actually Use It on the Job

**Date:** March 28, 2026
**Built for:** Senior QA Engineer returning to modern stack — 15 years IBM/Fiserv background
**Goal:** Understand the API layer the way you understand UI testing — deeply, not just mechanically

---

## Part 1: What Changed Since Your Era

Back in your QC and Test Director days, testing looked like this:

```
You → UI form → Submit button → Something happens → You verify the result on screen
```

The server was a black box. You tested the surface.

In 2026, QA engineers test one layer deeper:

```
You → UI form → Submit button → HTTP request fires → Server processes → HTTP response returns → UI updates
```

That middle part — the HTTP request and response — was always there. You just never had to look at it. Now you do. And that's actually good news, because you can test bugs that are completely invisible at the UI layer.

**Real example:** A form submits successfully, the success message appears, and the user thinks everything worked. But the API returned the wrong account balance in the response. The UI showed success — but the data was wrong. UI test passes. API test catches it.

That's why every QA role in 2026 expects both layers.

---

## Part 2: The Two Tools That Let You See the Hidden Layer

### DevTools Network Tab (browser built-in)

Every modern browser has this. When you test a UI and want to see what request the browser actually sent:

1. Open Chrome (or any browser)
2. Press **F12** to open DevTools
3. Click the **Network** tab
4. Perform an action on the page (submit a form, click a button, load a page)
5. Watch the requests appear in real time

Each row is one HTTP conversation — one request your browser sent, one response the server returned. Click any row and you see the raw details: the URL, the method, the headers, the body you sent, the status code, the response data.

This is your investigation tool. When a developer says "the API is returning wrong data," this is where you look first. No special tools needed — just F12.

### Postman (your QA testing tool)

DevTools shows you what the browser sent. Postman lets you build and send requests yourself — no browser, no UI, no form to fill in.

You are talking directly to the server.

This is powerful for three real-world QA jobs:

**1. Investigation** — A bug is reported. The UI looks fine. You open Postman, call the API directly, and look at the raw response. You find the server is returning `"balance": null` instead of a number. Bug confirmed, reported with evidence.

**2. Regression testing** — Before a release, you run your Postman collection. All 20 API calls respond correctly. You've verified the backend without touching the UI.

**3. Negative testing** — You deliberately send bad data to see if the server handles it correctly. Send a missing required field — does it return 400 or does it crash with 500? Send an expired token — does it return 401 or silently let you in?

---

## Part 3: The Anatomy of an HTTP Request

Every API call has exactly four parts. Once you understand what each one does, the Postman tabs will make complete sense.

### 1. Method — What type of action are you taking?

| Method | Meaning | Real-world example |
|--------|---------|-------------------|
| GET | Read data, change nothing | View a customer's account |
| POST | Create something new | Submit a new account application |
| PUT | Replace an existing record | Update all of a customer's profile |
| PATCH | Update part of a record | Change just the email address |
| DELETE | Remove something | Close an account |

Think of it like a filing cabinet. GET = read a file. POST = add a new file. PUT = replace a file entirely. PATCH = update one page inside a file. DELETE = shred it.

### 2. URL — Where are you sending it?

```
https://dummyjson.com/users/1
         ↑               ↑  ↑
     base URL         path  resource ID
```

The base URL is the server address. The path tells the server which resource you want. The ID specifies which one.

### 3. Headers — The envelope around your request

Headers are metadata — information about your request that isn't the data itself.

The three you'll use constantly:

| Header | Value | Meaning |
|--------|-------|---------|
| Content-Type | application/json | "I'm sending JSON data in the body" |
| Accept | application/json | "Please respond in JSON format" |
| Authorization | Bearer eyJhbG... | "Here's my login token — I am who I say I am" |

Analogy: if your request is a letter, the body is the letter itself. The headers are what's written on the envelope — who it's from, what format it's in, whether it's confidential.

**You don't need to add Content-Type manually in Postman.** When you select "raw JSON" in the Body tab, Postman adds it automatically. But you need to understand why it exists.

### 4. Body — The actual data you're sending

Only relevant for POST, PUT, and PATCH — when you're creating or updating something.

GET has no body. You're just asking for data, not sending any.

```json
{
  "username": "emilys",
  "password": "emilyspass"
}
```

This is JSON — the format APIs use to send and receive data. You've already worked with it in the Postman lab.

---

## Part 4: The Anatomy of an HTTP Response

When the server responds, it sends back three things:

### 1. Status code — Did it work?

You already know these from Day 21. The key ones:

| Code | Meaning | When you see it |
|------|---------|----------------|
| 200 | OK | Successful read |
| 201 | Created | Successful creation (POST) |
| 400 | Bad Request | You sent invalid data |
| 401 | Unauthenticated | No token or bad token |
| 403 | Unauthorized | Valid token, wrong permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | The server broke — always a bug |

**QA rule: a 500 on a negative test is itself a bug.** The server should reject bad input gracefully with a 400, not crash with a 500.

### 2. Response body — The data the server returned

```json
{
  "id": 1,
  "firstName": "Emily",
  "lastName": "Johnson",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

This is what you verify in an API test. Does the response contain the right fields? Are the values correct? Is the structure what the spec says it should be?

### 3. Response headers

Usually less important for QA, but occasionally relevant. `Content-Type: application/json` confirms the server returned JSON as expected.

---

## Part 5: The Postman Tabs — Now They Make Sense

With that foundation, here's what each tab in Postman actually does:

**Params** — Query parameters that go in the URL
```
GET /users/search?q=John&limit=5
                  ↑ these are query params
```
Postman lets you add them in a table instead of typing them in the URL manually. Cleaner, easier to read.

**Authorization** — Where you prove who you are
Select "Bearer Token" and paste your token. Postman adds the `Authorization: Bearer ...` header automatically. This is the tab you use to test authenticated endpoints.

**Headers** — Manual headers if you need them
Most of the time Postman handles Content-Type automatically. You come here when you need to add a custom header — like an API key, a tracking ID, or a specific Accept format.

**Body** — The data you're sending (POST/PUT/PATCH only)
Select "raw" → "JSON" and type your JSON. This is where your login credentials go, your new user data, your account update.

**Scripts** — Code that runs around your request
- **Pre-request tab:** runs BEFORE the request fires. Used to set up data, generate timestamps, or grab a fresh token if yours expired.
- **Post-response tab:** runs AFTER the response comes back. This is where you write your assertions (`pm.test`) and where you save the token to your environment variable.

---

## Part 6: Completing Stage 5.2 — Now You Know Why

You're saving the token as an environment variable so you don't paste it by hand every time, and so when it expires you can re-login and everything updates automatically.

**Step 1: Manually add the variable (one-time setup)**
1. Click **Environments** in the left sidebar
2. Open your **DummyJSON** environment
3. Add a new row: Name = `accessToken`, Current value = paste your token
4. Save

**Step 2: Auto-save it on every login (the professional approach)**
1. Open your `POST {{baseUrl}}/auth/login` request
2. Click **Scripts** tab → **Post-response** sub-tab
3. Paste this:

```javascript
const body = pm.response.json();
pm.environment.set("accessToken", body.accessToken);
```

4. Hit **Send**
5. The token saves automatically to your environment

**Why this matters:** Tokens expire after 30 minutes on DummyJSON. With this script, you just re-run the login request anytime and your `{{accessToken}}` variable refreshes. Every other request in your collection that uses `{{accessToken}}` works again instantly.

**Step 3: Verify it worked**
1. Open `GET {{baseUrl}}/auth/me`
2. Authorization tab → Bearer Token → value = `{{accessToken}}`
3. Send → should return 200 with Emily's profile

Stage 5.2 is done.

---

## Part 7: A Real Day in QA Using These Skills

Here's what Tuesday looks like for a QA Automation Engineer in 2026:

**Morning stand-up (15 min)**
Report what's passing, what's failing, what you're blocked on. If overnight CI/CD run failed, you know which tests and why.

**Triage a failing test (30-60 min)**
A Playwright test failed overnight. You open Postman, call the same API endpoint directly. The API returns a different structure than yesterday — a field was renamed. You confirm it's a backend change, not a flaky test. You file the bug with evidence (the raw Postman response).

**Review a new story in Jira (30 min)**
A developer is building a new "transfer funds" feature. Before they write a line of code, you write your test cases — all 4 layers. You share them so the developer knows exactly what you'll be testing. Bugs caught at this stage cost nothing. Bugs caught in production cost everything.

**Write or update automated tests (2-3 hrs)**
New feature is merged. You write Playwright API tests for the happy path, negative paths, and the critical boundary cases. You use Claude Code to generate the boilerplate, you audit the output, you approve and commit.

**Exploratory testing (1 hr)**
New feature is in staging. You open DevTools, watch the network traffic as you use the feature manually. You notice a request returns 200 but the response body has an empty array where data should be. That's a bug the automated tests didn't catch because you hadn't written that case yet. You add it.

**End of day — update Jira**
Test cases updated, bugs filed, CI/CD is green or failures are explained. Done.

That's the job. It's investigation, verification, and communication — the same as it always was. The tools changed. The thinking is yours.

---

## ✅ Completion Checklist

**After working through this lesson:**
- [ ] Understand why the API layer exists and what it adds to UI testing
- [ ] Know how to open DevTools Network tab and read what you see
- [ ] Understand the 4 parts of an HTTP request (Method, URL, Headers, Body)
- [ ] Know what each Postman tab does and why
- [ ] Complete Stage 5.2 (environment variable for Bearer token)
- [ ] Feel confident explaining "what does a QA engineer actually do" in an interview

---

**Last Updated:** Day 22 (March 28, 2026)
**Next:** Stage 6 (Postman test assertions) → Stage 7 (collection organization) → Playwright API automation
