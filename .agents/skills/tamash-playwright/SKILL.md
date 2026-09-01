---
name: tamash-playwright
description: Set up and run tamash-playwright's self-healing Playwright workflow locally — onboard a project to its standards, then review, apply, verify, and land runtime heals as permanent fixes.
allowed-tools: Bash(npx tamash-playwright:*) Bash(npx playwright:*) Bash(node:*) Bash(npm:*) Bash(git:*) Bash(gh:*) Read Edit Write Grep Glob
---

# tamash-playwright — local self-healing workflow

`tamash-playwright` is a self-healing add-on for Playwright: when a locator breaks, it asks an AI model (or a free rule-based matcher) to find the element and heal the test at runtime, right when the failure happens. This skill is the **local counterpart to its CI automation** (run → `apply-heals` → verify → PR → report) — the same loop, but with a real agent reasoning about each fix instead of a static PR diff nobody reads closely.

## Start here: run `doctor`

Everything below branches on one command — run it before assuming which path applies:

```bash
npx tamash-playwright doctor
```

- **Any `[FAIL]` or `[WARN]`** (no provider configured, missing `actionTimeout`, undescribed locators, inline locators) → this project hasn't adopted tamash-playwright's standards yet. Follow **[references/onboarding.md](references/onboarding.md)** first.
- **No `[FAIL]`/`[WARN]` remaining** → the project's ready, regardless of what else is showing. An `[INFO]` row (Vision Fallback capability, a Page Objects locator count) is never a blocker — those are observational, not a standard to meet; see onboarding.md's own note on this if one is present. Follow **[references/heal.md](references/heal.md)** — its own first step is running the suite, so this applies whether or not it's already been run; you don't need pre-existing heals to justify starting it.

Don't guess which one applies from what the user says or how the project looks — `doctor`'s actual output is the source of truth every time.

## What this skill does NOT do

- It never invents a healing strategy of its own. Every action here is one of tamash-playwright's own existing CLI commands (`doctor`, `apply-heals`, the generated `verify-heals.cjs`) — this skill is orchestration and judgment layered on commands that already exist, not a new capability bolted onto the package.
- It never commits or opens a PR without asking first, no matter how clean a run was — see the LAND step in [heal.md](references/heal.md).
- It never touches anything `apply-heals` itself already excludes (`dragTo`/`drop` heals, action-recovery-only heals, `waitFor()`/assertion exclusions) — if `apply-heals` didn't offer to change it, this skill doesn't either.

## Getting this skill into a project

No coding agent auto-discovers a skill bundled inside `node_modules` — it's one explicit step after `npm install tamash-playwright`:

```bash
npx tamash-playwright init-skill
```

That copies this directory (`SKILL.md` + `references/`) into **both** standard locations — the same convention Playwright's own `playwright-cli install --skills` uses:

- `.claude/skills/tamash-playwright/` — Claude Code
- `.agents/skills/tamash-playwright/` — the emerging cross-tool standard (Cursor, GitHub Copilot, Windsurf, Kiro, Zed, and others read here)

Same content in both; there's no per-agent format conversion. `--target claude` or `--target agents` installs just one; `--user` installs under your home directory to cover every project on the machine; `--force` overwrites a hand-edited copy. A version marker is written so `npx tamash-playwright doctor` can flag when the installed skill has fallen behind the package — re-run `init-skill` to refresh.

By hand, if you prefer:

```bash
mkdir -p .agents/skills
cp -r node_modules/tamash-playwright/skills/tamash-playwright .agents/skills/tamash-playwright
```
