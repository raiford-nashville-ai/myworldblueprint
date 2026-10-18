# Mocks

## Purpose

Preserve visual explorations and the history of approved interaction designs.

## Rules

- Treat existing mocks as read-only unless the user requests a mock change.
- Create a separately named version when the user asks to preserve alternatives.
- The current website is implemented in ../site/, not in this folder.
- Do not copy website changes back into historical mocks automatically.
- polished-sidebar.html is the approved baseline mirrored by ../specs/REFERENCE_UI.html.
- Do not alter either baseline to make regression tests pass.
- Keep simulated AI behavior visibly labeled; never imply that fixtures are generated from the Builder's input.
