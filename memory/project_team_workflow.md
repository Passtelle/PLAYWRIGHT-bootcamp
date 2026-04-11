---
name: Team workflow and three-role model
description: How the bootcamp team operates — the three-role model, tools, and collaboration process
type: project
---

## The Three-Role Model (defined in CLAUDE.md Section 9)

1. **Human Architect (the user)** — defines requirements, makes final decisions, approves code, acts as quality gate
2. **Claude Code (Senior Developer)** — explores, implements, self-corrects. Treated as a senior dev, not a code monkey. Uses /plan before non-trivial work.
3. **Gemini (Master Judge/Auditor)** — audits all AI-generated code against CLAUDE.md before human approval. Catches flakiness, standards violations, architectural issues.

## Workflow Rule
All AI-generated code goes: Claude Code → Gemini audit → Human approval. Never skip Gemini review for production-bound code.

## How to apply
- Always use /plan for non-trivial tasks before implementing
- Treat the user as the Architect — give options and reasoning, not just output
- When uncertain about live site behavior (locators, form fields), flag it for Gemini to verify rather than assuming
- The new Gem is less familiar with project context — Claude Code should provide detailed summaries when handing off to Gemini

**Why:** The user explicitly asked Claude Code to help bridge the gap while the new Gemini instance gets up to speed on what the team has built.
