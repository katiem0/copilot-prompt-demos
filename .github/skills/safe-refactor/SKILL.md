---
name: safe-refactor
description: Improve DevTasks implementation quality while preserving behavior and matching the existing test suite.
---

# Safe refactor

Refactor only the requested function or file while preserving its public behavior.

1. Run `npm test` and record the passing baseline. Do not proceed if it is red.
2. Add characterization tests first if the target lacks coverage for current behavior.
3. Refactor names, duplication, or structure only. Preserve signatures and observable values.
4. Follow `.github/instructions/javascript.instructions.md` and testing conventions.
5. Run `npm test` again and report baseline versus final results.

Do not add features, fix unrelated bugs, change public signatures, alter behavior, or add runtime dependencies.
