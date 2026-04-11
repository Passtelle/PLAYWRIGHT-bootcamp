---
name: Coding standards and CLAUDE.md rules established so far
description: Key standards beyond what's in CLAUDE.md — lessons learned during the Parabank build
type: project
---

## Always verify locators against live DOM
Never trust AI-generated locators for legacy apps. Parabank taught us this twice (register + login POMs). Verify name/id attributes by inspecting the actual HTML before assuming.

## Parabank-specific locator pattern
Use `page.locator('input[name="..."]')` throughout Parabank. `getByLabel()` and `getByPlaceholder()` fail because the app has no accessible label associations and no placeholder text.

## POM parameter rule (added to CLAUDE.md Section 7)
Never use optional defaults to hide related fields. All parameters must be required and explicit. Established from the `confirmPassword` lesson — optional defaults block negative testing.

## dotenv pattern
`dotenv.config()` lives in `playwright.config.ts` only. Tests access credentials via `process.env.PARABANK_USERNAME as string` — the `as string` cast is needed because TypeScript sees env vars as `string | undefined`.

## QA_AUDIT_LESSONS.md
Running lesson log in the repo. Currently has:
- Lesson 1: Password Mismatch Trap (confirmPassword design)
- Lesson 4: Spring MVC Locator Discovery (Parabank DOM inspection)
User is maintaining this file — do not overwrite, only append new lessons when asked.

## INTERVIEW_PRACTICE.md
Interview prep log in the repo. Session 1 covers the Data Factory Pattern (Faker.js). User practices polished answers 3-5 times. Natural authentic voice preferred over resume jargon.
