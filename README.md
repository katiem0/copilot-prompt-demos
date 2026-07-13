# Prompt Architecture for Engineers

**From basic prompting to context engineering — deterministic, repeatable results in real workflows.**

This repository is a hands-on demo. It contains a tiny, dependency-free web app
(**DevTasks**) plus a set of GitHub Copilot customization files that show how to
move beyond wording a single prompt toward **engineering the context window**:
deliberately curating what the model sees — project rules, the right files, tool
results, and scope — the same way every time.

| Primitive | File | Part of the context window it engineers |
|-----------|------|------------------------------------------|
| Project instructions | [.github/copilot-instructions.md](.github/copilot-instructions.md) | Persistent, always-on project context |
| File instructions | [.github/instructions/](.github/instructions/) | Conventions injected conditionally via `applyTo` |
| Prompt files | [.github/prompts/](.github/prompts/) | The right files + process, pulled in repeatably (`/add-feature`, `/generate-tests`, `/code-review`) |
| Custom agent | [.github/agents/spec-reviewer.agent.md](.github/agents/spec-reviewer.agent.md) | Bounded scope + tools for one job |

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

In Copilot Chat, type `/` and pick one.

**Core:**

- `/add-feature` — add a feature the repeatable way (scope → implement → test → verify)
- `/generate-tests` — generate a deterministic test suite for a `store.js` function
- `/code-review` — structured review against the repo's rules

**Advanced:**

- `/spec-first` — test-first loop: failing tests from a spec, then implement to green (self-verifying)
- `/refactor` — behavior-preserving refactor, locked by the existing test suite
- `/commit-message` — Conventional Commits output contract, grounded in `#changes` with few-shot examples

Then select an agent from the picker:

- **Spec Reviewer** — strict, read-only merge review (`APPROVE` / `REQUEST CHANGES`)
- **Feature Planner** — decomposes a request into a testable checklist and hands off to implementation + review

## Advanced techniques on show

Each file demonstrates a skilled prompt-engineering practice you can copy:

| Technique | Where |
|-----------|-------|
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
