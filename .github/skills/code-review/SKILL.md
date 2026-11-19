---
name: code-review
description: Review DevTasks changes read-only and return a deterministic architecture and test report. Use for merge-ready diff reviews.
---

# Review DevTasks code

Review the requested file or current `#changes` without editing code or running commands.

Check:

1. `store.js` is pure and does not import UI or storage code.
2. Updates are immutable and create fresh arrays/objects.
3. JavaScript conventions are followed.
4. Changed behavior has happy-path, boundary, and error tests.
5. No runtime dependency was added.

Use `.github/instructions/javascript.instructions.md` and `.github/instructions/testing.instructions.md`. Cite actual file and line evidence.

Return a Markdown table:

`Check | Status | Evidence (file:line) | Fix`

Use ✅, ⚠️, or ❌ and end with exactly one line:

`VERDICT: APPROVE` or `VERDICT: REQUEST CHANGES`
