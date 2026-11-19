---
description: "Write a Conventional Commits message for the current staged/working changes. Structured output, grounded in the diff."
name: "Commit Message"
argument-hint: "Optional scope hint, e.g. 'store' or 'ui'"
agent: "ask"
---

# Commit Message

Generate a commit message for the current changes. Read the diff — do not guess.

## Context

- Changes to describe: `#changes`
- Optional scope hint: `${input:scope:Scope (optional)}`

## Output Contract

Return **only** a fenced code block in Conventional Commits format:

```
<type>(<scope>): <summary in imperative mood, <= 72 chars>

<body: what & why, wrapped at 72 cols; omit if trivial>

<footer: BREAKING CHANGE / refs; omit if none>
```

`type` is one of: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`.

## Examples (few-shot)

```
feat(store): add filterByPriority to narrow tasks by level

Adds a pure helper plus validation so the UI can offer a priority
filter without duplicating logic.
```

```
fix(storage): fall back to in-memory store when localStorage throws
```

## Constraints

- Base the message strictly on `#changes`. If there are no changes, say so.
- Summary in imperative mood ("add", not "added").
- Output the code block only — no preamble, no explanation.
