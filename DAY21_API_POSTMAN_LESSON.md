# Day 21: API Testing with Postman

## The Manual Lab Before the Automation

**Date:** March 25, 2026
**API Platform:** DummyJSON (`https://dummyjson.com`)
**Duration:** 2-3 hours
**Goal:** Understand APIs manually in Postman so Playwright API automation makes sense

> **Why DummyJSON?**
> Real authentication with Bearer tokens, 208 users, full CRUD, search, pagination.
> The same patterns used at every enterprise company — just without the politics. 😄

---

## 🧠 The Big Picture First

Before touching Postman, read this once.

**What is an API?**

> When you log into a banking app and your balance appears — you didn't see the database. The app sent a request to a server, the server looked up your balance, and sent it back as data. That invisible conversation is the API.
>
> UI testing (Playwright) tests the screen — the form, the button, the message you see.
> API testing tests the conversation directly — no browser, no clicking, just raw data.

**Why this matters for a QA Architect:**

- Bugs often live in the API layer, invisible to UI tests
- API tests run 10-100x faster than UI tests
- You can test edge cases impossible to reach through the UI
- Every QA Architect role in 2026 expects both layers

**The mental model:**

```
UI Test:   You → Browser → Form → Server → Response → You see it on screen
API Test:  You → Postman → Server → Response → You read raw data directly
```

---

## 🛠️ Setup (5 minutes)

1. Open Postman
2. Create a new Collection: **`DummyJSON API Testing`**
3. Create an Environment: **`DummyJSON`** with one variable:
   - `baseUrl` = `https://dummyjson.com`

> 💡 From now on every URL starts with `{{baseUrl}}` — if it ever changes, you update one place.

---

## 📚 Stage 1: Your First GET Request (20 minutes)

### What is GET?

> GET = "Give me data." You're asking the server to return information without changing anything.
> **Real world:** Viewing a list of bank customers. Reading only, no modifications.

---

### Exercise 1.1 — Get All Users

**In Postman:**

1. New Request → Method: **GET**
2. URL: `{{baseUrl}}/users`
3. Click **Send**

**Response (200 OK):**

```json
{
  "users": [
    {
      "id": 1,
      "firstName": "Emily",
      "lastName": "Johnson",
      "email": "emily.johnson@x.dummyjson.com",
      "age": 28,
      "role": "admin"
    }
    // ... 29 more users
  ],
  "total": 208,
  "skip": 0,
  "limit": 30
}
```

**Ask yourself:**

- How many total users exist in the system?
- How many were returned in this response?
- What does `skip` mean? (Hint: pagination)

> 💡 **You just read a real API response.** Every Playwright API test is a version of this.

---

### Exercise 1.2 — Get a Single User

```
GET {{baseUrl}}/users/1
```

Find in the response:

- What is Emily's role?
- What city does she live in?
- Is her address a string or a nested object?

---

### Exercise 1.3 — Search Users

```
GET {{baseUrl}}/users/search?q=John
```

**Notice:** The `?q=John` is a **query parameter** — you're filtering the results.
This is the API equivalent of typing in a search box.

---

## 📚 Stage 2: Reading JSON (20 minutes)

### JSON is the language APIs speak

```json
{
  "id": 1,
  "firstName": "Emily",
  "lastName": "Johnson",
  "age": 28,
  "address": {
    "street": "626 Main Street",
    "city": "Phoenix",
    "state": "Mississippi"
  },
  "bank": {
    "cardType": "Visa",
    "currency": "Dollar",
    "iban": "NO17 0695 2754 967"
  }
}
```

**JSON rules:**
| Symbol | Meaning | Example |
|---|---|---|
| `{ }` | One object with properties | A single user |
| `[ ]` | A list of objects | Multiple users |
| `"key": "value"` | A string property | `"firstName": "Emily"` |
| `"key": 28` | A number property | `"age": 28` |
| `"key": { }` | A nested object | `"address": { ... }` |

**Exercise 2.1 — Navigate nested JSON:**

From your Exercise 1.2 response, find:

- [ ] Emily's bank card type
- [ ] Emily's IBAN number
- [ ] Emily's city
- [ ] Is `bank` a string or an object? Why does that matter for assertions?

---

## 📚 Stage 3: Status Codes — Your First Assertions (20 minutes)

### Status codes tell you if the request succeeded or failed

| Code    | Meaning         | Plain English                               |
| ------- | --------------- | ------------------------------------------- |
| **200** | OK              | "Here's what you asked for"                 |
| **201** | Created         | "I made the new thing you requested"        |
| **400** | Bad Request     | "Your request doesn't make sense"           |
| **401** | Unauthenticated | "I don't know who you are — log in first"   |
| **403** | Unauthorized    | "I know who you are, but you can't do this" |
| **404** | Not Found       | "That thing doesn't exist"                  |
| **500** | Server Error    | "Something broke on our end"                |

> 💡 **Interview gold:** "401 means unauthenticated — you haven't identified yourself. 403 means unauthorized — you're identified but don't have permission. They're different failures with different fixes."

---

### Exercise 3.1 — Trigger a 404 on Purpose

```
GET {{baseUrl}}/users/99999
```

User `99999` doesn't exist. You should see **404**.

**The QA mindset:** Testing failure paths is as important as testing success paths. We deliberately break things to verify the system fails correctly.

---

### Exercise 3.2 — Trigger a 401

```
GET {{baseUrl}}/auth/me
```

Send this without any authentication. You should see **401** — the server is saying "who are you?"

Save this request. You'll fix it in Stage 5.

---

## 📚 Stage 4: POST Requests — Sending Data (30 minutes)

### What is POST?

> POST = "Create something new." You're sending data to the server and asking it to save it.
> **Real world:** Submitting a new customer registration form.

---

### Exercise 4.1 — Login (POST with a body)

**In Postman:**

1. Method: **POST**
2. URL: `{{baseUrl}}/auth/login`
3. Click the **Body** tab → select **raw** → choose **JSON**
4. Enter:

```json
{
  "username": "emilys",
  "password": "emilyspass",
  "expiresInMins": 30
}
```

5. Click **Send**

**Response (200 OK):**

```json
{
  "id": 1,
  "username": "emilys",
  "email": "emily.johnson@x.dummyjson.com",
  "firstName": "Emily",
  "lastName": "Johnson",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Copy the `accessToken` value** — you'll need it in Stage 5.

> 💡 **Notice:** GET has no body. POST has a body — that's the data you're sending to the server.

---

### Exercise 4.2 — Create a New User

```
POST {{baseUrl}}/users/add
```

**Body (raw JSON):**

```json
{
  "firstName": "Your First Name",
  "lastName": "Your Last Name",
  "email": "youremail@test.com",
  "age": 30,
  "role": "user"
}
```

**Expected response:** **201 Created** with your new user's `id`.

---

## 📚 Stage 5: Headers & Authentication (25 minutes)

### What are Headers?

> Headers are metadata that travel with your request — they tell the server who you are, what format you're sending, and what you expect back.

**The most important headers:**

| Header          | Example Value      | Meaning                  |
| --------------- | ------------------ | ------------------------ |
| `Content-Type`  | `application/json` | "I'm sending JSON data"  |
| `Accept`        | `application/json` | "Please respond in JSON" |
| `Authorization` | `Bearer eyJhbG...` | "Here's my login token"  |

---

### Exercise 5.1 — Fix Your 401 with a Bearer Token

Remember Exercise 3.2? Let's fix it.

1. Open your `GET {{baseUrl}}/auth/me` request
2. Click the **Authorization** tab
3. Select type: **Bearer Token**
4. Paste your `accessToken` from Exercise 4.1
5. Click **Send**

**Expected:** **200 OK** with Emily's full profile.

**What just happened:**

- Without token → 401 (server doesn't know you)
- With token → 200 (server recognizes you as Emily)

> 💡 This is how every modern API works. You login → get a token → use the token on every protected endpoint. QA tests must handle this flow.

---

### Exercise 5.2 — Save Token as Environment Variable

Instead of copy/pasting the token every time, save it:I did

1. Go to your **DummyJSON** environment
2. Add variable: `accessToken` = (paste your token value)
3. Update your Authorization header to use: `{{accessToken}}`

Now it's reusable across all requests. 🎯

---

## 📚 Stage 6: Writing Postman Tests (30 minutes)

### This is where manual becomes semi-automated

Every request in Postman has a **Tests** tab where you write JavaScript assertions that run automatically after each response.

---

### The 4 Core Tests (write these on every request):

**Test 1 — Status code:**

```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});
```

**Test 2 — Response time:**

```javascript
pm.test("Response time is under 2 seconds", function () {
  pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

**Test 3 — Response has expected field:**

```javascript
pm.test("Response contains users array", function () {
  const body = pm.response.json();
  pm.expect(body).to.have.property("users");
});
```

**Test 4 — Specific value assertion:**

```javascript
pm.test("Total users is greater than 0", function () {
  const body = pm.response.json();
  pm.expect(body.total).to.be.greaterThan(0);
});
```

---

### Exercise 6.1 — Test Your GET All Users Request

1. Open your `GET {{baseUrl}}/users` request
2. Go to the **Tests** tab
3. Write all 4 tests above
4. Click **Send**
5. Check **Test Results** tab at the bottom

You should see:

```
✅ Status code is 200
✅ Response time is under 2 seconds
✅ Response contains users array
✅ Total users is greater than 0
```

---

### Exercise 6.2 — Test the Login Response

Open your `POST /auth/login` request → **Tests** tab:

```javascript
pm.test("Login returns 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Response contains access token", function () {
  const body = pm.response.json();
  pm.expect(body).to.have.property("accessToken");
  pm.expect(body.accessToken).to.be.a("string");
});

pm.test("Logged in user is Emily", function () {
  const body = pm.response.json();
  pm.expect(body.firstName).to.equal("Emily");
});
```

---

### Exercise 6.3 — Write a Negative Test

Open your `GET {{baseUrl}}/users/99999` request → **Tests** tab:

```javascript
pm.test("Non-existent user returns 404", function () {
  pm.response.to.have.status(404);
});

pm.test("Error message is returned", function () {
  const body = pm.response.json();
  pm.expect(body).to.have.property("message");
});
```

> **The QA principle:** Always verify that failures fail correctly — with the right status code and a meaningful error message.

---

## 📚 Stage 7: Collections & Environments (15 minutes)

### Organize your requests like a professional

By now you should have 6-7 requests. Organize them into folders:

```
📁 DummyJSON API Testing
  📁 Users
    GET - Get All Users
    GET - Get Single User (id=1)
    GET - Search Users
    GET - Non-existent User (404 test)
    POST - Add New User
  📁 Authentication
    POST - Login
    GET - Get Current User (auth/me)
```

**How to create folders:**

- Right-click your collection → **Add Folder**
- Drag requests into the folder

---

## ✅ Day 21 Completion Checklist

**Stage 1 — GET Requests:**

- [ ] Listed all users successfully
- [ ] Retrieved a single user by ID
- [ ] Used a search query parameter

**Stage 2 — JSON:**

- [ ] Can identify `{}` (object) vs `[]` (array)
- [ ] Can navigate nested objects to find a specific value

**Stage 3 — Status Codes:**

- [ ] Know 200, 201, 400, 401, 403, 404, 500
- [ ] Intentionally triggered a 404
- [ ] Intentionally triggered a 401

**Stage 4 — POST:**

- [ ] Logged in and received an accessToken
- [ ] Created a new user with POST

**Stage 5 — Headers & Auth:**

- [ ] Fixed the 401 by adding Bearer token
- [ ] Saved the token as an environment variable

**Stage 6 — Tests:**

- [ ] Wrote status code assertion
- [ ] Wrote response time assertion
- [ ] Wrote response body assertion
- [ ] Wrote a negative test (404 scenario)

**Stage 7 — Organization:**

- [ ] All requests saved in organized folders
- [ ] Environment variables set up (`baseUrl`, `accessToken`)

---

## 🎤 Interview Questions This Unlocks

**Q: "What's the difference between GET and POST?"**

> "GET retrieves data without modifying anything — like viewing a list of customers. POST sends data to create something new — like submitting a registration. GET has no request body. POST has a body containing the data you're creating."

**Q: "What do you verify in an API test?"**

> "At minimum: the status code — did it succeed or fail correctly? The response time — is performance within acceptable bounds? And the response body — does it contain the expected data and structure? For negative tests, I verify the right error code is returned with a meaningful error message."

**Q: "What's the difference between 401 and 403?"**

> "401 Unauthorized means unauthenticated — the server doesn't know who I am, I need to log in. 403 Forbidden means unauthorized — the server knows exactly who I am but I don't have permission for that resource. They're different failures: 401 needs authentication, 403 needs different permissions."

**Q: "How do you handle authentication in API tests?"**

> "I make a login POST request first, extract the Bearer token from the response, and pass it in the Authorization header on all subsequent protected endpoints. In Postman I save the token as an environment variable so it's reusable. In Playwright I store it in a variable and pass it programmatically across the test."

---

## 🔜 What Comes Next (Day 22)

Everything you did manually in Postman maps directly to Playwright code:

```typescript
// Login — get the token
const loginResponse = await request.post(`${baseUrl}/auth/login`, {
  data: { username: "emilys", password: "emilyspass" },
});
expect(loginResponse.status()).toBe(200);
const { accessToken } = await loginResponse.json();

// Use token — get protected resource
const meResponse = await request.get(`${baseUrl}/auth/me`, {
  headers: { Authorization: `Bearer ${accessToken}` },
});
expect(meResponse.status()).toBe(200);
const user = await meResponse.json();
expect(user.firstName).toBe("Emily");
```

Same logic. Same assertions. Automated. ✅

---

**You've got this. See you on Day 22! 💪**
