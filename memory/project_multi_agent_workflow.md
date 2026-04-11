---
name: Multi-agent workflow — Instance A and Instance B
description: Two Claude Code instances working together; roles, sync method, and onboarding prompt
type: project
---

## The Two-Instance Model (active from Day 22)

### Instance A — Claude Code Desktop (Teacher/Auditor)
- **Role:** Pedagogical Coach, Lead SDET Auditor, Curriculum Manager
- **Does:** Builds lessons, tests student, updates all .md docs, audits Instance B's code, manages schedule
- **Focus:** Teaching depth, interview prep, ISTQB prep, AI prompting mastery, QA smells, curriculum quality

### Instance B — Claude Code VS Code (THIS instance)
- **Role:** Lead Senior Automation Developer / Partner
- **Does:** Writes Playwright scripts, POMs, API tests, runs CI/CD, executes builds
- **Focus:** Speed, execution, passing tests, script quality

## Sync Method
All coordination happens through .md files in the repo — no direct channel needed.
- Instance A drafts the plan → Instance B executes → Instance A audits → Student approves

## Experimental Agent Teams (future)
When ready, enable direct instance-to-instance communication:
```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"
```

## Onboarding Instance A
Paste the full prompt from CLAUDE.md Section 10 (Multi-Agent Workflow) as the first message.
Files Instance A must read on startup (in order):
1. CLAUDE.md
2. memory/MEMORY.md + all linked files
3. MASTER_PLAN.md
4. QA_AUDIT_LESSONS.md
5. INTERVIEW_PRACTICE.md
6. QA_TEST_LAYERS.md
7. DAY21_API_POSTMAN_LESSON.md
8. playwright.config.ts, package.json, tsconfig.json, .mcp.json

**Why:** Student was spending too much cognitive energy on doc updates, quizzes, lesson management — leaving less time for actual learning and absorption. Splitting teacher/auditor from builder solves this.
