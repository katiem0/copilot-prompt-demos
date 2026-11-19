---
name: add-feature
description: Add a focused DevTasks store feature test-first, with confirmation before edits and verification. Use for adding behavior to app/src/store.js or app/tests/store.test.js.
---

# Add a DevTasks feature

Follow this exact sequence:

1. Restate the feature in one sentence and list concrete acceptance criteria.
2. Stop and ask for confirmation before editing files or running commands.
3. After confirmation, implement the business logic in `app/src/store.js`.
4. Add focused tests in `app/tests/store.test.js` following `.github/instructions/testing.instructions.md`.
5. Follow `.github/instructions/javascript.instructions.md`; keep `store.js` pure.
6. Run `npm test` and report the actual result.

Only change `app/src/store.js` and `app/tests/store.test.js` unless the requested feature explicitly requires UI or wiring changes.

Do not add runtime dependencies, mutate inputs, import DOM/storage modules in `store.js`, or claim success without command output.

End with:

- What changed
- Acceptance criteria and test coverage
- `npm test` pass/fail
