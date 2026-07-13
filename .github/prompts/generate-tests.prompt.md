---
description: "Generate a deterministic Node test suite for a store.js function following the repo's testing conventions."
name: "Generate Tests"
argument-hint: "Name of the function to test, e.g. 'filterTasks'"
agent: "agent"
tools: [codebase, search, editFiles, runCommands]
---

# Generate Tests

Generate a complete, passing test suite for an existing function in
[store.js](../../app/src/store.js).

## Inputs

- Function under test: `${input:fn:Which exported function should be tested?}`

## Steps

1. Read the function's implementation and JSDoc in
   [store.js](../../app/src/store.js). Do not change the implementation.
2. Enumerate cases before writing code:
   - happy path(s)
   - boundary values (empty list, single item, unknown id)
   - error cases (invalid input → `assert.throws`)
   - immutability (input is not mutated), where applicable
3. Write or extend the matching file in [app/tests/](../../app/tests/) following
   the [testing conventions](../instructions/testing.instructions.md).
4. Run `npm test` and ensure every test passes.

## Output Format

Return exactly:

1. A checklist of the cases you covered.
2. The `npm test` summary line (e.g. `pass 12  fail 0`).

## Constraints

- Node built-in runner only (`node:test`, `node:assert/strict`).
- Deterministic tests — no timers, network, or ordering assumptions.
- Import only from `../src/*.js`.
