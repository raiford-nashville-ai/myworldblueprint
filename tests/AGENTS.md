# Verification

## Purpose

Provide repeatable evidence that the implementation preserves approved architecture, behavior, and appearance.

## Ownership

- architecture.test.js: source-layer contracts, reference integrity, token resolution, motion rules, and fixture graph integrity.
- serve-production.mjs: isolated production build and test-only reference server.
- browser/: visual, behavior, and accessibility checks.

## Rules

- Test actual production assets, not a substitute application or an unrelated running server.
- Keep the frozen reference outside published output; expose it only through the test harness.
- Do not relax assertions, replace baselines, or mask interface regions to hide regressions.
- Keep temporary builds in OS temporary directories and reports/traces in ignored output folders.
- Record unsupported engines and environmental limits. Passing automated checks is not blanket production certification.
- Test documentation and guidance-file exclusions when changing folder instructions or Hugo mounts.
