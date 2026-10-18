# Browser behavior

## Purpose

Implement Tool interaction, transient creative state, and safe Blueprint presentation without a frontend framework.

## Ownership

- main.js: orchestration, events, and generation lifecycle.
- tools.js: Tool identity, accessible input labels, writing-tip visibility, and creative questions.
- state.js: per-Tool drafts, cancellation state, and export snapshot.
- theme.js: guarded theme preference storage.
- motion.js: serialized emerge(update) transitions and inert cleanup.
- blueprint.js: structured response rendering.
- fixtures.js: illustrative noncanonical response data.
- dom.js: shared safe DOM construction.

## Rules

- Keep new Tool definitions registry-driven and supply a matching fixture while simulation is active.
- Preserve drafts across Tool changes; cancel stale requests rather than rendering outdated results.
- Use textContent for Builder/model text. Do not inject arbitrary HTML, scripts, or executable model output.
- Route structural transitions through emerge(update); keep typing responsive and restore focus after transitions with preventScroll.
- Keep fixtures, proposals, and canonical blueprints distinct. No automatic canonical writes.
- No client-side credentials or live AI requests without an authorized runtime design.
