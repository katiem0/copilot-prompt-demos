---
description: "Test-first (spec-driven) development: turn acceptance criteria into failing tests, then implement until green."
name: "Spec-First Feature"
argument-hint: "Describe the behavior + acceptance criteria"
agent: "agent"
model: ["Claude Sonnet 4.5 (copilot)", "GPT-5 (copilot)"]
tools: [codebase, search, editFiles, runCommands]
---

# Spec-First Feature (TDD loop)

Build a feature **test-first**. Tests are the executable specification — write
them before the implementation, then let them drive the code.

## Inputs

- Behavior + acceptance criteria: `${input:spec:Describe the behavior and its acceptance criteria}`

## Loop — do not skip or reorder

1. **Specify.** Convert the acceptance criteria into a bullet list of concrete
   test cases (happy path, boundaries, errors). Confirm each is observable.
2. **Red.** Write the tests in [app/tests/](../../app/tests/) following the
   [testing conventions](../instructions/testing.instructions.md). Run `npm test`
   and **show that the new tests fail** (this proves they test something real).
3. **Green.** Implement the minimum pure logic in
   [store.js](../../app/src/store.js) to make the tests pass. Follow the
   [JavaScript conventions](../instructions/javascript.instructions.md).
4. **Refactor.** Clean up names/duplication with tests still green.
5. **Verify.** Run `npm test` a final time — all green.

## Output Format

Return exactly:

1. The test-case checklist from step 1.
2. The **red** result (which tests failed and why).
3. The **green** result (`npm test` summary line).

## Constraints

- Tests come **first**. Never write the implementation before a failing test.
- No new runtime dependencies. `store.js` stays pure.
- If a criterion is ambiguous, state your assumption before writing the test.
