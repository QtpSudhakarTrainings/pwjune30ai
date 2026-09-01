# Reviewing, applying, verifying, and landing local heals

The local counterpart to tamash-playwright's CI automation (test → `apply-heals` → verify → PR → report) — same steps, same "never land an unproven fix" discipline, but run by an agent with real judgment in the loop instead of unattended.

Prerequisite: `doctor` reports all `[OK]` — see [onboarding.md](onboarding.md) if not.

## The loop

Every gate below defaults to **continue** except two — genuine ambiguity in REVIEW, and anything past VERIFY. That's what makes this an actual loop rather than a manual walkthrough: a clean run with unambiguous heals and a passing verify goes start to finish with no interruptions, and the agent only surfaces itself when something genuinely warrants a human's judgment.

### 1. RUN

```bash
npx playwright test   # or the project's own test command; a named subset is fine
```

Runs with healing already enabled — nothing extra to configure once onboarding is done. Every attempt, healed or not, is appended to `.tamash-playwright/heals.jsonl`, and the console prints one line per attempt:

```
[self-healer] src/pages/loginpage.ts:11 — locator.fill "Username Textbox" -> HEALED [provider=ollama:gpt-oss:120b, vision=no, actionRecovery=no, suggested="getByRole(\"textbox\", { name: \"Username\" })", 620 tokens (489 input + 131 output)] — locator.fill: Timeout 8000ms exceeded.
```

The console line already has everything needed for the REVIEW step below, but the same detail also lands in Playwright's own HTML report (`npx playwright show-report`) for every attempt, healed or not — worth opening if a console line alone doesn't answer a question: an annotation summarizing the outcome (plus a separate `self-heal-needs-review` annotation on the kind of fix REVIEW should look closer at), and a JSON attachment with the full detail — provider, whether vision/action-recovery was involved, the suggested selector, token cost, and, for anything that didn't heal, which stage it stopped at (`ai_declined`, `replay_failed`, etc.).

**GATE — did anything heal?**

- No `HEALED` lines at all, or `.tamash-playwright/heals.jsonl` doesn't exist / is empty → **stop here.** Report "suite passed, nothing needed healing." The loop ends clean — there's nothing to review, apply, or land.
- At least one `HEALED` line → continue to REVIEW.

Also note — but don't act on yet — any line where the action failed and was **not** healed (`ai_declined`, `replay_failed`, etc.). That's a real, still-broken locator `apply-heals` can't touch at all. Carry it into the final report as something a human needs to look at directly.

### 2. REVIEW

```bash
npx tamash-playwright apply-heals --dry-run
```

Produces a table like:

```
Fixes (2, 1 needing review)
┌───────────────────────────────┬──────────────────────────┬───────────────────────────────────────────┬────────┐
│ Location                      │ Before                    │ After                                       │ Review │
├───────────────────────────────┼──────────────────────────┼───────────────────────────────────────────┼────────┤
│ src/pages/loginpage.ts:11     │ .locator('input[name="…' │ .getByRole("textbox", { name: "Username" })│ —      │
│ tests/employee-id.spec.ts:31  │ .getByPlaceholder('Empl…'│ .locator('div').filter({ hasText: 'Empl…'})│ yes    │
└───────────────────────────────┴──────────────────────────┴───────────────────────────────────────────┴────────┘
⚠ tests/employee-id.spec.ts:31 — No stable identity of its own — durable selector anchors on nearby text instead.
```

**GATE — is each fix trustworthy?**

- **Review column is `—`** (came from the element's own real identity: id, test id, accessible role+name, label, or placeholder) → high confidence. Continue.
- **Review column is `yes`** (came from a nearby label or a positional fallback — the warning line under the table explains why) → actually look closer before deciding. Open the target file, and the real page/component if it helps. Form a genuine opinion, don't just relay the flag.
  - Confident it's correct → continue, but say so explicitly in the final report (don't silently treat it the same as an unflagged fix).
  - Still genuinely unsure → **PAUSE.** Ask the user, naming the specific fix, its location, and exactly why it's uncertain. Don't guess past this point.

### 3. APPLY

```bash
npx tamash-playwright apply-heals --yes
```

**Always pass `--yes` (or `-y`) when you're the one running this, not a human at a keyboard.** The confirmation prompt (`Apply N fix(es) to your source files (M needing review)? [y/N]:`) only exists for a real interactive terminal; in a genuinely non-interactive invocation it's skipped automatically anyway, but `--yes` is the documented, supported way to answer it deliberately rather than relying on stdin behavior you haven't verified. Never pipe an answer into stdin (`echo y | ...`) — it isn't a supported way to answer this prompt, even if it happens to appear to work in a given environment.

**GATE — did it match expectations?**

- Output reports the same count of fixes as the dry-run showed, `0 skipped` → continue.
- Anything unexpected (fewer applied, files skipped, an error) → **stop**, surface exactly what didn't match before doing anything else.

### 4. VERIFY

```bash
node .tamash-playwright/verify-heals.cjs
```

Sets `HEALER_ENABLED=false` and re-runs **only the tests actually affected**, proving the rewritten selectors work standalone — not just "worked while healing was still there to catch a mistake."

**GATE — hard gate, never soft:**

- Exit code 0, all green → continue to LAND.
- Any failure → **STOP. Do not land.** Report exactly which test/assertion failed and why. A failed verify here means either the applied fix is actually wrong, or something unrelated broke — either way, a human needs to see this before anything is committed. Mirrors the CI workflow's own rule: a bad verification is always surfaced, never silently landed, and never silently discarded either.

### 5. LAND

**This gate never auto-continues, regardless of how clean steps 1–4 were.** Present:

- What's ready to land — the exact diff, or point at `.tamash-playwright/apply-heals-report.md`.
- Proof it works — the verify-heals result from step 4.

Then ask the user to choose:

- Commit directly on the current branch.
- Create a new branch and `gh pr create` — compose the PR body the same way the CI workflow does (the before/after report plus the verification result, clearly labeled pass/fail).
- Leave everything staged/unstaged for the user to handle themselves.

Never pick for them, and never commit or push without an explicit answer — same standing rule as any other push/publish action.

### 6. CLOSE THE LOOP

Once landed, re-run the full suite once more (healing still on):

```bash
npx playwright test
```

A clean pass with **zero new `HEALED` lines** confirms the fix is genuinely durable, not just "verify-heals happened to pass once" — and leaves the project in a clean state for the next time this loop runs.

### 7. REPORT

One summary at the end, regardless of where the loop stopped:

- What ran, what healed, what got applied / verified / landed.
- Anything still needing a human: declined heals from step 1, or a fix paused on in step 2.
- Where to look for more detail: `.tamash-playwright/apply-heals-report.md` (or `.json` for the structured version), or `npx playwright show-report` for the full HTML report.
