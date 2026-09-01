# Onboarding a project to tamash-playwright's standards

Use this when `doctor` reports any `[WARN]`/`[FAIL]`. Work through its findings in the order below — each one is independent, so if only some apply, skip the rest. After every fix, the section tells you exactly how to confirm it actually worked — don't move on without checking.

**`[INFO]` rows are not part of this checklist.** `doctor` also reports a couple of purely observational rows — whether the configured model looks vision-capable by name, and how many locators sit inline across how many files. Neither is a standard to meet or something to fix; they're context, not findings. Once every `[WARN]`/`[FAIL]` below is resolved, the project is done here regardless of what those `[INFO]` rows still say.

## 1. No AI provider configured

`doctor` reports this as:

```
[WARN] HEALER_PROVIDER is not set. No AI provider is configured, so self-healing will never
       recover a failed action — it will just fail normally.
```

Ask the user which they want — don't assume:

- **Free, fastest to start**: Ollama Cloud (`HEALER_PROVIDER=ollama`) — a free API key from `ollama.com/settings/keys`.
- **An API-key provider they already pay for**: `openai` / `anthropic` / `gemini`.
- **A subscription they already have, no API key**: `claude-subscription` or `copilot-subscription` — work both locally and in CI (TypeScript only).
- **A Cursor, Kiro, or Codex subscription instead**: `cursor-subscription` / `kiro-subscription` / `codex-subscription` (all `@beta`, TypeScript only) — **local development only, never CI** (no confirmed unattended-CI auth token). All three run their CLI in a read-only mode (Cursor `--mode ask`, Codex `codex exec`'s sandbox, Kiro grants no tool trust), so a heal call can't edit files or run commands. `kiro`/`codex` answer cleanly in a few seconds; `cursor`'s `agent` is an interactive assistant that sometimes replies conversationally instead of with JSON (`stage=ai_declined`), so `kiro`/`codex` are the smoother choice.
- **Free, zero-AI, no network call**: `tamash` (currently `@beta` — `npm install tamash-playwright@beta`) — text-matches `.describe()` against the page's own accessibility tree, never guesses; a narrower success rate than an AI provider but no cost and no key at all.
- **Their own self-hosted Ollama server**: `ollama-local` (also `@beta`) — same shape as `ollama` but points at their own server instead of Ollama Cloud; `OLLAMA_LOCAL_API_KEY` is optional, only needed if their deployment sits behind an auth gateway.

Write (or update) `.env` from `.env.example` with their choice. **Never handle the real API key value yourself** — write the variable name with an empty value and have the user paste the real key into the file directly. Never echo a key back in chat, a commit message, a log line, or a report.

**Confirm it worked**: re-run `npx tamash-playwright doctor`. The AI Provider section must show:

```
[OK] Connected to <provider>:<model> successfully.
```

A `[FAIL]` here now spells out which kind of problem it is and the matching fix — a missing SDK/CLI (`npm install ...` / the vendor installer), a rejected request (`claude login` / check the API key / confirm the subscription is active and within quota), a timeout (raise `actionTimeout`), a rejected model id (fix the `<PROVIDER>_MODEL` value), or a network failure (proxy / base URL). The raw error line is printed beneath the guidance. Follow whichever it names; don't move on until this is `[OK]`.

## 2. Missing or too-close `actionTimeout`

`doctor` reports:

```
[WARN] playwright.config.ts does not set actionTimeout (or it's too close to `timeout`)
```

By default Playwright lets a broken locator retry silently for the *entire* test timeout before throwing — healing never gets a turn, since it only kicks in once an action actually fails. Open `playwright.config.ts` and set `actionTimeout` explicitly, comfortably below the overall `timeout`:

```ts
export default defineConfig({
  timeout: 60000, // overall test timeout
  use: {
    actionTimeout: 8000, // must be comfortably less than the timeout above
  },
});
```

This is mechanical and safe — apply it directly, no need to ask first.

**Confirm it worked**: re-run `doctor` — the Action Timeout section must show `[OK]`.

## 3. Locators without `.describe()`

`doctor` lists these ranked by priority (raw CSS/XPath selectors first) in a table, e.g.:

```
[WARN] Found 12 locator(s) without .describe():
  Priority | Location                  | Snippet
  1        | tests/login.spec.ts:14    | page.locator('input[name="user"]')
  ...
```

For each flagged locator:

1. Open the file at the given location.
2. **Read the actual context** — the surrounding page/component, not just the variable name — to write a genuinely accurate, human-readable description. This is the one place this skill should do better than the package's own automatic fallback (`decodeVariableName`, which only has the raw identifier to work from): you can look at what the element actually *is*.
3. Chain `.describe('...')` onto the locator. Purely additive, never changes runtime behavior — safe to apply across every flagged locator in one pass without asking per-locator. Summarize what you changed when done.

**Confirm it worked**: re-run `doctor` — the count under "Found N locator(s) without `.describe()`" should drop to reflect what you fixed (0 if you did all of them).

## 4. Locators written directly in test files (should be in a Page Object)

`doctor` flags these as a best-practice recommendation, not something broken — inline locators still heal fine, this is about long-term maintainability, not correctness. **Unlike the `.describe()` fix above, do not mechanically extract every one without asking first.** This is a real structural refactor, and every project already has (or lacks) its own Page Object conventions.

Before touching anything:

1. Look for an existing Page Object pattern in the project (a `pages/` directory, a base page class, an established naming convention). Follow whatever already exists — don't invent a new structure if one is already there.
2. **Before assuming a flagged file is an oversight, check whether it's deliberately excluded.** Open it and look for a signal that it's intentional — a comment like `// Non-POM example`, a file name like `*-inline.spec.ts` or `*-demo.spec.ts`, or a project README/AGENTS.md section describing it as a teaching/contrast example next to a POM equivalent. A project can have a complete Page Object layer already *and* still correctly leave a few files inline on purpose. Finding one real Page Object convention elsewhere in the repo is not, by itself, evidence that every flagged file is a bug — verify each one before folding it into scope.
3. If no existing convention is found at all (not even a deliberately-excluded demo file — genuinely nothing), propose one and confirm it with the user before creating it.
4. Ask the user for scope: every flagged locator that's actually in scope after step 2, or a small sample first to confirm the approach before doing the rest.

**Confirm it worked**: re-run `doctor` after the agreed scope is done — the "Locators written directly in test files" count should reflect exactly what was moved, no more, no less.

## Done

Once `doctor` reports no remaining `[WARN]`/`[FAIL]` (any `[INFO]` rows are fine — see the note at the top of this file), the project meets tamash-playwright's standards. If a test suite has already been run with healing enabled since then, continue to [heal.md](heal.md) to review what healed. Otherwise, onboarding is complete — no further action needed here.
