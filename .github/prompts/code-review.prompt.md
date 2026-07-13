---
description: "Review a diff or file against the DevTasks conventions and produce a structured, deterministic review report."
name: "Code Review"
argument-hint: "Path or #changes to review"
agent: "agent"
tools: [codebase, search, changes]
---

# Code Review

Review the target code against this repo's rules. Be specific and cite file and
line. Do not rewrite the code — report findings only.

## Target

- `${input:target:What should I review? (file path, or use #changes)}`

## Checklist

Evaluate each item and mark ✅ / ⚠️ / ❌:

1. **Architecture** — `store.js` stays pure; no DOM or storage imports there.
2. **Immutability** — no argument mutation; new arrays/objects returned.
3. **Conventions** — ES modules, `const`/`let`, JSDoc on exports, clear error
   messages (see [javascript.instructions.md](../instructions/javascript.instructions.md)).
4. **Tests** — new/changed logic has tests covering happy path, boundaries, and
   errors (see [testing.instructions.md](../instructions/testing.instructions.md)).
5. **Dependencies** — no new runtime packages added.

## Output Format

Return a Markdown table with columns: `Check | Status | Evidence (file:line) | Fix`.
Then a one-line **verdict**: `APPROVE` or `REQUEST CHANGES`, with the single most
important reason.

## Constraints

- Read-only. Do not edit files.
- Every ⚠️/❌ must cite a concrete location and a concrete fix.
