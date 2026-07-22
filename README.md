# Prompt Architecture for Engineers

**From basic prompting to context engineering — deterministic, repeatable results in real workflows.**

This repository is a hands-on demo. It contains a tiny, dependency-free web app
(**DevTasks**) plus a set of GitHub Copilot customization files that show how to
move beyond wording a single prompt toward **engineering the context window**:
deliberately curating what the model sees — project rules, the right files, tool
results, and scope — the same way every time.

| Primitive | File | Part of the context window it engineers |
|-----------|------|------------------------------------------|
| **Custom agents** *(start here for shared workflows)* | [.github/agents/](.github/agents/) | Bounded scope, tools, and stop signals for a role |
| **Skills** *(bundle multi-step workflows)* | `SKILL.md` (see [skills docs](https://code.visualstudio.com/docs/copilot/customization/skills)) | Reusable procedures + assets a model can invoke by name |
| Project instructions | [.github/copilot-instructions.md](.github/copilot-instructions.md) | Persistent, always-on project context |
| File instructions | [.github/instructions/](.github/instructions/) | Conventions injected conditionally via `applyTo` |
| Prompt files *(useful, but prefer agents/skills for team-wide reuse)* | [.github/prompts/](.github/prompts/) | Canned tasks a single user runs from Chat (`/add-feature`, `/generate-tests`, `/code-review`) |

> **Where to invest first:** Reach for a **custom agent** or a **skill** for anything a
> team will use more than once. Prompt files are a fine on-ramp for a single developer's
> canned task, but they don't carry tool boundaries, handoffs, or stop signals the way
> agents and skills do — so they tend to drift as workflows mature.

## Prompt engineering fundamentals

This demo builds on GitHub's recognized prompt-engineering techniques
([docs](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)).
The intermediate leap is **encoding** those techniques into reusable files so you
don't re-apply them by hand every time:

| Technique | Where it lives in this repo |
|-----------|------------------------------|
| Start general, then get specific | The "restate scope" step in [add-feature.prompt.md](.github/prompts/add-feature.prompt.md) |
| Give examples (incl. tests as examples) | Snippets in [instructions/](.github/instructions/) + [store.test.js](app/tests/store.test.js) |
| Break complex tasks into simpler tasks | The numbered sequence in each prompt file |
| Avoid ambiguity | `applyTo` conventions + `argument-hint` in prompt files |
| Indicate relevant code | Markdown links / `#`-references inside the prompt files |
| Follow good coding practices | [copilot-instructions.md](.github/copilot-instructions.md) |

## Prerequisites

- **VS Code** with the **GitHub Copilot** and **Copilot Chat** extensions
- **Node.js 18+** (for the built-in test runner — no other install needed)

## Setup

```bash
# from the repo root
npm test          # run the app's test suite (should pass)
npm run serve     # serve the app at http://localhost:3000
```

Or just open `app/index.html` directly in a browser.

## The DevTasks app

A small task board with immutable, testable business logic:

- `app/src/store.js` — pure logic (create, add, delete, advance status, filter, summarize)
- `app/src/storage.js` — localStorage persistence
- `app/src/ui.js` — DOM rendering
- `app/src/main.js` — wiring
- `app/tests/` — Node built-in tests

## Try the prompts

In Copilot Chat, select an **agent** from the picker first — that's the pattern we
recommend for anything a team will share:

- **Spec Reviewer** — strict, read-only merge review (`APPROVE` / `REQUEST CHANGES`);
  tool scope acts as a **stop signal** so it can't rewrite the code it's judging
- **Feature Planner** — decomposes a request into a testable checklist, then hands off
  to implementation + review (multi-stage workflow with per-stage stop signals)

If you want to see the older prompt-file style, type `/` in Chat:

**Core prompts:**

- `/add-feature` — add a feature the repeatable way (scope → implement → test → verify)
- `/generate-tests` — generate a deterministic test suite for a `store.js` function
- `/code-review` — structured review against the repo's rules

**Advanced prompts:**

- `/spec-first` — test-first loop: failing tests from a spec, then implement to green
- `/refactor` — behavior-preserving refactor, locked by the existing test suite
- `/commit-message` — Conventional Commits output contract, grounded in `#changes`

> Prompt files are still useful, but treat them as scaffolding — once a workflow is
> shared, promote it to an **agent** (for tool boundaries and stop signals) or a
> **skill** (for a bundled multi-step procedure).

## Advanced techniques on show

Each file demonstrates a skilled prompt-engineering practice you can copy:

| Technique | Where |
|-----------|-------|
| **Stop signals** (explicit halts + tool caps that prevent over-building) | [add-feature](.github/prompts/add-feature.prompt.md) ("Stop and confirm"), [spec-reviewer](.github/agents/spec-reviewer.agent.md) (`tools: [read, search, changes]`), [refactor](.github/prompts/refactor.prompt.md) (negative constraints) |
| Output contracts (structured, parseable) | [commit-message](.github/prompts/commit-message.prompt.md), [code-review](.github/prompts/code-review.prompt.md) |
| Few-shot examples in the prompt | [commit-message](.github/prompts/commit-message.prompt.md) |
| Test-first / self-verifying loop | [spec-first](.github/prompts/spec-first.prompt.md) |
| Behavior-locked refactor + negative constraints | [refactor](.github/prompts/refactor.prompt.md) |
| Prompt composition (link, don't duplicate) | every prompt links to [instructions/](.github/instructions/) |
| Grounding (`#changes`, `#codebase`) | [commit-message](.github/prompts/commit-message.prompt.md) |
| Orchestration, handoffs, model fallback | [planner.agent.md](.github/agents/planner.agent.md) |
| Guardrails via tool limits (read-only) | [spec-reviewer.agent.md](.github/agents/spec-reviewer.agent.md) |

## Workshop

Follow the guided exercises in [exercises/LAB.md](exercises/LAB.md).
