Generate a Gherkin test case for the following API test:

**Endpoint:** POST /auth/login
**Test Type:** Negative test - Missing password
**Negative test subtype:** Empty string (field present but value is "")
**Test Data:**

- username: "emilys"
- password: "" (empty string)

**Expected Result:**

- Status code: 400
- Response body contains: "Username and password required"

**API Base URL:** https://dummyjson.com

Use this format:

- Feature: [feature name]
- Scenario: [Login fails when password is missing] [scenario name]
- Given/When/Then/And structure
- Include response time assertion (< 2000ms)

Notes:

1. Run the Postman request → capture EXACT response
2. Use that response in your prompt
3. Generate Gherkin with AI
4. Paste into Xray (BAS-6)
5. Write Playwright test to match the Gherkin

2nd prompt:
Generate a Gherkin test case for the following API test:

**Endpoint:** POST /auth/login  
**Test Type:** Negative/Security test  
**Subtype:** SQL injection attack  
**Test Data:**

- username: "admin' --"
- password: "emilyspass"

**Expected Result:**

- Status code: 400
- Response body contains: "Invalid credentials"

**API Base URL:** https://dummyjson.com

Use Given/When/Then format and include response time assertion (< 2000ms).

Results:
Feature: User Authentication - Security Validation
As a system
I want to reject SQL injection attempts
So that the authentication system remains secure

Scenario: Login fails when username contains SQL injection payload
Given the DummyJSON API is available at "https://dummyjson.com"
When I send a POST request to "/auth/login" with the following credentials:
| username | admin' -- |
| password | emilyspass |
Then the response status code should be 400
And the response body should contain "Invalid credentials"
And the response time should be less than 2000ms
