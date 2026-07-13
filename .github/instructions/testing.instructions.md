---
description: "Testing conventions for DevTasks. Use when writing, editing, or generating test files (*.test.js)."
applyTo: "app/tests/**/*.test.js"
---

# Testing Conventions

- Use the **Node built-in test runner** only: `import { test } from "node:test"`
  and `import assert from "node:assert/strict"`. No Jest, Mocha, or Vitest.
- One behavior per `test(...)`. Test names describe behavior, not implementation:
  `"advanceStatus cycles todo -> doing -> done -> todo"`.
- Cover the happy path, boundaries, and error cases (use `assert.throws`).
- Assert immutability where relevant: confirm the input array/object is unchanged.
- Import only from `../src/*.js`. Do not test private helpers directly.
- Keep tests deterministic — no timers, no network, no reliance on `Date.now()`
  ordering. If you need an id, create the task through `createTask`.

## Example

```js
test("addTask appends without mutating the original list", () => {
  const original = [];
  const next = addTask(original, createTask("A"));
  assert.equal(next.length, 1);
  assert.equal(original.length, 0);
});
```
