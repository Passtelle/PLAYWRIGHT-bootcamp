---
name: POM method parameters must be fully explicit
description: Prefer required parameters over optional defaults in POM methods, especially for test-critical fields
type: feedback
---

Always use required parameters in POM method signatures — never use optional defaults that hide values from the caller.

**Why:** Optional defaults (e.g., `confirmPassword: string = password`) hide the test's intent. In a QA context, every test must explicitly declare its inputs so the test is self-documenting and auditable. The "convenience" of skipping a parameter is a product mindset, not a QA mindset.

**How to apply:** When a POM method has fields that are related (e.g., password + confirmPassword), always require both as separate explicit parameters. The test author must state both values — this makes happy-path and negative-path tests equally readable and intentional.
