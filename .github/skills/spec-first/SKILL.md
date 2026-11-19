---
name: spec-first
description: Implement a DevTasks feature through a strict red-green-refactor loop. Use when acceptance criteria should become failing tests before implementation.
---

# Spec-first implementation

Implement the requested behavior with tests driving the code.

## Inputs

- Behavior and acceptance criteria

## Loop

1. Convert the criteria into concrete observable test cases, including happy paths, boundaries, and errors.
2. Write tests in `app/tests/` before implementation. Use `.github/instructions/testing.instructions.md`.
3. Run `npm test` and report the actual red result. Stop if the run is not red for a reason that proves the tests detect missing behavior.
4. Implement the minimum pure logic in `app/src/store.js`. Follow `.github/instructions/javascript.instructions.md`.
5. Run `npm test` and report the actual green result.
6. Refactor only with tests green, then run `npm test` one final time.

Do not add runtime dependencies or let `store.js` import UI or storage code.

Return exactly:

1. The test-case checklist.
2. The red result and failure reason.
3. The green result and final `npm test` summary.
