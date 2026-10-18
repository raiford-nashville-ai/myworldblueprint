# CSS layers

## Purpose

Make the Studio's styling predictable through explicit, purpose-based cascade layers.

## Ownership

- main.css: Hugo assembly entry point and layer order.
- reset.css: browser normalization and shared accessibility defaults.
- tokens.css: primitive palette and timing values.
- semantic.css: role aliases and theme mappings.
- base.css: document typography and element defaults.
- layout.css: Studio geometry and structural breakpoints.
- components.css: component appearance, states, local breakpoints, and motion rules.

## Rules

- Preserve order: reset, tokens, semantic, base, layout, components.
- Each layer file declares only its matching layer.
- Components use semantic variables, not raw colors or direct palette references.
- Keep responsive rules in the layer they modify; do not add a global responsive override layer.
- Avoid unlayered presentation and specificity escalation. The hidden-attribute reset exception is intentional.
- Follow the documented emergent-motion contract: 200–500ms opacity dissolves, no sliding or bouncing, and reduced-motion support.
- Do not weaken pixel comparisons or edit the reference to accommodate unintended style changes.
