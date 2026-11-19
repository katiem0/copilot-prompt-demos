---
description: "Add a feature to the DevTasks store following the repo's architecture, conventions, and test requirements."
name: "Add Feature"
argument-hint: "Describe the feature, e.g. 'filter tasks by priority'"
agent: "agent"
tools: [read, search, edit]
---

# Add a Feature

You are adding a feature to the DevTasks app. Follow this exact sequence — do not
skip steps.

## Inputs

- Feature request: `${input:feature:What feature should be added?}`

## Steps

1. **Restate scope.** Summarize the feature in one sentence and list the acceptance
   criteria as a bullet list.
2. **Hard stop (required).** After Step 1, stop and ask for confirmation that the
   criteria are testable. Do not edit files, run tests, or execute any write action
   until the user explicitly confirms (for example: "confirmed", "yes", or "proceed").
   If confirmation is not present, remain in clarification mode only.
3. **Locate the seam.** Implement business logic in [store.js](../../app/src/store.js)
   as a **pure function**. Only touch [ui.js](../../app/src/ui.js) and
   [main.js](../../app/src/main.js) if the feature needs rendering or wiring.
4. **Implement** following [JavaScript conventions](../instructions/javascript.instructions.md):
   ES modules, `const`, immutable updates, JSDoc, input validation with clear errors.
5. **Add tests** in [app/tests/](../../app/tests/) following the
   [testing conventions](../instructions/testing.instructions.md): happy path,
   boundaries, and error cases.
6. **Verify.** Run `npm test` and confirm all tests pass. Fix failures before finishing.

## Output

End with a short summary:

- **What changed** (files + functions)
- **Acceptance criteria** and how each is covered by a test
- **Test result** (`npm test` pass/fail)

## Constraints

- No new runtime dependencies.
- `store.js` must not import from `ui.js` or `storage.js`.
- Do not mutate inputs; return new arrays/objects.
