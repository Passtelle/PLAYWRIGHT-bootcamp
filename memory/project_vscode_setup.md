---
name: VS Code extensions and dev environment setup
description: Complete VS Code extension stack, npm packages, and known Windows issues as of Day 22
type: project
---

## VS Code Extensions (Installed Day 21)

- ✅ Playwright Test — run/debug Playwright tests inside VS Code
- ✅ ESLint — TypeScript linting
- ✅ Prettier — code formatting
- ✅ GitHub Copilot — AI code suggestions
- ✅ indent-rainbow — visual indentation guides
- ✅ Markdown Preview Enhanced — render lesson files (Ctrl+Shift+V)
- ✅ emojisense — emoji autocomplete 💜

## npm Packages (from package.json as of Day 21)

**devDependencies:**
- `@playwright/test` ^1.58.1
- `@faker-js/faker` ^10.3.0
- `@types/node` ^25.0.3
- `dotenv` ^17.3.1

**dependencies:**
- `@anthropic-ai/sdk` ^0.78.0
- `@cucumber/cucumber` ^12.6.0
- `better-sqlite3` ^12.8.0
- `ts-node` ^10.9.2

## Known Windows Issue — Claude Desktop + VS Code Token Conflict

Claude Code CLI (VS Code) and Claude Desktop share `~/.claude` config by default.
They fight over the same OAuth token → Desktop Code tab throws "sign-in expired" error.

**Fix:** Give VS Code its own config directory:
```powershell
$env:CLAUDE_CONFIG_DIR="$HOME\.claude-scripter"; claude
```
Full details in CLAUDE.md Section 10.

## Claude Desktop MSIX Install Timeout

Installer times out after 5 minutes on Windows 11 (`AddPackage timed out`).
Workaround: disable Windows Defender real-time protection before installing.
See CLAUDE.md Section 10 for full details.

**How to apply:** Environment is fully set up. No additional tooling needed to start Day 22.
