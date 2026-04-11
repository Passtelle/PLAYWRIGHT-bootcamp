# Day 25: The Postman Core 6 — Chai & the pm Object

**Date:** April 7, 2026
**Taught by:** Gemini (Master Judge/Auditor)
**Purpose:** Reference sheet — the only Postman scripting patterns you need to know

---

## What is pm?

`pm` stands for PostMan. It is the master remote control.
When you type `pm.`, you are telling Postman to wake up and look at the request you just sent.

## What is Chai?

Chai is a JavaScript library that Postman includes automatically.
Its only job is to make assertions read like plain English sentences.
That is why you see words like `.to.be` and `.to.have` — they are Chai's way of translating JavaScript into something humans can read.

---

## The Golden Rule: Always Parse First

Before writing any assertion that checks the response body, always write this line first:

```javascript
const jsonData = pm.response.json();
```

This converts the raw response into a JavaScript object you can read and inspect.
Everything else comes after this.

---

## The Core 6 Assertions

These 6 patterns cover 99% of API testing on the planet.

### 1. The Status Check — Is it green?

```javascript
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});
```

### 2. The Speed Check — Is it fast?

```javascript
pm.test("Response time is under 500ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
```

### 3. The Contract Check — Does the field even exist?

```javascript
pm.test("Response has id field", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
});
```

### 4. The Type Check — Is the price actually a number?

```javascript
pm.test("Price is a number, not a string", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData.current_price).to.be.a('number');
});
```

### 5. The Exact Match — Is this actually Bitcoin?

```javascript
pm.test("Coin name is Bitcoin", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql('Bitcoin');
});
```

### 6. The Array Check — Did it give me a list?

```javascript
pm.test("Response is an array", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
});
```

---

## pm.response vs pm.expect — The Distinction

`pm.response` is the entire response box.
Postman built a few shortcuts directly on it — like `pm.response.to.have.status(200)`.

`pm.expect()` is your universal magnifying glass. Put anything inside it:
- `pm.expect(pm.response.responseTime)` — inspect the speed
- `pm.expect(jsonData.name)` — inspect a field in the body
- `pm.expect(jsonData)` — inspect the whole body object

---

## The Snippets Tab

The Snippets panel on the right side of the Scripts tab contains all these patterns ready to insert with one click.

Senior QAs do not memorize this syntax. They click Snippets, insert the wrapper, then change the field names to match their test.

Use Snippets constantly. That is what they are for.

---

## Interview Answer: Why API Tests Are Faster Than UI Tests

> "UI tests are slow because they wait for the browser to load, buttons to render, and animations to finish. API tests run in milliseconds. I audit the UI suite and remove anything that does not need a browser — like verifying a user was created. Those checks move to the API layer. UI tests stay only for critical user journeys. That cuts execution time dramatically."

**Vocabulary:** Test pyramid, shifting left, browser overhead

---

**Last Updated:** Day 25 (April 7, 2026)
**Next:** Day 26 — Apply Core 6 to DummyJSON: Login, Bearer Tokens, 4 Test Layers
