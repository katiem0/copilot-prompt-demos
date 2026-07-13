# Lab: From Basic Prompting to Context Engineering

Work through these exercises in order. Each one engineers **more of the context**
the model sees, and makes the result more deterministic. Keep the `npm test`
terminal open the whole time.

> Goal: feel the shift from "write a better message" to "engineer the context
> window" — and see how to put it into place in a real repo.

---

## Exercise 0 — Warm up (2 min)

```bash
npm test
npm run serve   # open http://localhost:3000
```

Add a few tasks, advance them, and delete one. Confirm the app works.

---

## Exercise 1 — Prompt engineering by hand (7 min)

First, the naive prompt. In Copilot Chat, ask:

> Add a way to filter tasks by priority.

Note where it puts code, whether it wrote tests, and whether you'd merge it.
Undo (`git checkout .`).

Now apply GitHub's
[prompt-engineering techniques](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)
**deliberately** in a single, better prompt:

> **[start general, then specific]** Add priority filtering to the DevTasks store.
> **[indicate relevant code]** Put the logic in `app/src/store.js` (see `#filterTasks`).
> **[break tasks down]** 1) add a pure `filterByPriority(tasks, priority)` function;
> 2) validate the priority; 3) add tests.
> **[give examples]** `filterByPriority(tasks, "high")` returns only high-priority tasks;
> an invalid priority should throw.
> **[avoid ambiguity]** "priority" is one of `low` \| `medium` \| `high`.

**Compare the two.** The engineered prompt is clearly better — *and* notice how
much you had to remember and re-type. Would a teammate phrase all five the same
way? This is the ceiling of by-hand prompting.

Undo changes (`git checkout .`).

> **Takeaway:** the techniques work. The problem is they live in your head and
> get re-typed every time. The next exercises **encode** them into files.

---

## Exercise 2 — Instructions as engineered context (5 min)

Look at:

- [.github/copilot-instructions.md](../.github/copilot-instructions.md)
- [.github/instructions/javascript.instructions.md](../.github/instructions/javascript.instructions.md)
- [.github/instructions/testing.instructions.md](../.github/instructions/testing.instructions.md)

Open `app/src/store.js`. Notice the JavaScript instruction auto-attaches because
its `applyTo: "app/**/*.js"` glob matches — that's **context injected on
condition**, not typed by you.

Now ask the **same** informal prompt again:

> Add a way to filter tasks by priority.

Notice how the output now respects the architecture (pure function in `store.js`),
uses `const`, immutable updates, JSDoc, and matches the test style — without you
saying so. **You didn't write a better prompt; you engineered the context so the
same prompt succeeds.** (This is "follow good coding practices" + "avoid
ambiguity", encoded once instead of re-typed.)

Undo changes (`git checkout .`).

---

## Exercise 3 — A repeatable prompt (8 min)

In Chat, run the prompt file:

> `/add-feature filter tasks by priority`

Open [.github/prompts/add-feature.prompt.md](../.github/prompts/add-feature.prompt.md)
and find the Markdown links to `store.js`, `ui.js`, and the instruction files.
Those links **pull the exact right files into context on every run** — you never
have to remember to attach them. That is context engineering, not luck.

Compare to Exercise 1. The prompt also enforces a **sequence**: restate scope →
implement in the right seam → add tests → run `npm test` → summarize.

This single file encodes the techniques you re-typed by hand in Exercise 1:
**start general then specific** (restate scope), **break tasks down** (the
numbered steps), **indicate relevant code** (the file links), and **give
examples** (the test conventions).

Run it a second time with a different feature:

> `/add-feature mark all tasks done`

Same curated context, same structure, same quality bar. **This is determinism:
same shape of output every time, regardless of who runs it.**

---

## Exercise 4 — Generate tests deterministically (5 min)

Pick a function and run:

> `/generate-tests summarize`

Confirm it produces happy-path, boundary, and error cases, then runs `npm test`.

---

## Exercise 5 — A scoped reviewer (5 min)

Make a deliberately sloppy change (e.g., mutate the array in `deleteTask`).
Then:

1. Run `/code-review #changes` — get a structured findings table.
2. Switch to the **Spec Reviewer** agent and ask it to review your change.

Notice it is **read-only** and returns an `APPROVE` / `REQUEST CHANGES` verdict.
Restore the file when done (`git checkout .`).

---

# Advanced track

These exercises show skilled prompt-engineering practices. Do any subset.

## Exercise 6 — Test-first, self-verifying (8 min)

Run the spec-driven loop:

> `/spec-first tasks can be starred; starred tasks sort to the top`

Watch the phases: it writes tests **first**, runs `npm test` to show them
**fail (red)**, implements to **green**, then refactors. The prompt grounds
itself in the real test output instead of assuming success.

**Why it's advanced:** tests-as-specification + a self-verifying loop. The model
can't claim "done" — the tool result proves it. `git checkout .`

## Exercise 7 — Behavior-locked refactor (6 min)

> `/refactor summarize`

The prompt records a `npm test` baseline, refactors for readability only, then
proves the results are **identical**. Try asking it to also "add a feature" —
notice it refuses; the negative constraints hold the line. `git checkout .`

## Exercise 8 — Output contract + grounding (5 min)

Make a small change, then:

> `/commit-message`

It reads `#changes` (the diff, not your description) and returns **only** a
Conventional Commits block, shaped by the few-shot examples in the prompt file.
Structured output like this is diffable and automatable. `git checkout .`

## Exercise 9 — Orchestration & handoff (6 min)

Select the **Feature Planner** agent and ask:

> Plan: let users archive completed tasks.

It stays **read-only**, decomposes the work into `action → file → proof (test)`,
lists risks, and recommends handing off to `/spec-first` then the **Spec
Reviewer**. Follow the handoff to see a scoped multi-agent workflow.

## Exercise 10 — Grounding & iterate (5 min)

Ask a repo-wide question with explicit grounding:

> Using `#codebase`, where is task status advanced, and what would break if I
> added a fourth status?

Then **iterate** on the answer by refining the *reference* (add `#file` links),
not just re-wording the question.

---

## Wrap-up

You went from a prompt no one could reproduce to a small library of curated
context that anyone on the team can run and get consistent, reviewable results.

- Basic prompt → context is whatever you happened to type
- Instructions → persistent + conditional context, applied automatically
- Prompt files → the right files + process pulled into context, repeatably
- Custom agent → bounded context and tools for one job
- Advanced: output contracts, test-first loops, guarded refactors, grounding,
  and multi-agent orchestration — each encoded once and reused

### Put it into place this week

Pick your team's **most repeated** Copilot request and turn it into one prompt
file. Move one "we always do it this way" rule into an instruction file with a
scoped `applyTo`. Open a PR for both and review them like code.
