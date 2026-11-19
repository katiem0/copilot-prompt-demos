---
name: generate-tests
description: Generate deterministic Node.js tests for an existing DevTasks store function without changing its implementation.
---

# Generate tests

Generate or extend the test suite for the requested exported function in `app/src/store.js`.

1. Read the implementation and JSDoc.
2. Enumerate happy paths, boundary values, error cases, and relevant immutability checks.
3. Write tests only in `app/tests/` using `.github/instructions/testing.instructions.md`.
4. Do not change the implementation.
5. Run `npm test` and ensure every test passes.

Use only `node:test`, `node:assert/strict`, and imports from `../src/*.js`. Keep tests deterministic and do not test private helpers.

Return exactly:

1. A checklist of cases covered.
2. The final `npm test` summary line.
