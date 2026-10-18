# Asset architecture

## Folder guidance

- Each maintained source directory has a local AGENTS.md describing purpose, ownership, and boundaries; root instructions supply inherited project and Git policy.
- Blueprints are reference-only unless the user explicitly approves a blueprint change. An implementation request is not blanket permission to rewrite the model.
- Reserved Hugo directories explain future use without introducing placeholder content or unapproved architecture.
- Dependencies, generated output, caches, and reports are excluded from this documentation pattern.
- Hugo component mounts in site/hugo.yaml use the current files exclusion syntax to omit root and nested AGENTS.md files. Negative patterns use the documented `! ` prefix.
- Keep all seven Hugo component mounts covered. Exclusions must prevent both content generation and static-file publication, not merely hide links.
- Architecture tests require guidance in every source folder. The production harness rejects instruction-file leaks and unexpected generated pages; browser checks require guidance URLs to return 404.

## Entrypoints

- Homepage: site/layouts/home.html within baseof.html.
- CSS: site/assets/css/main.css, assembled by resources.ExecuteAsTemplate in partials/head.html.
- JavaScript: site/assets/js/main.js, bundled by js.Build in partials/scripts.html.
- Development uses stable URLs. Production minifies and SHA-384 fingerprints both bundles and emits integrity attributes.
- Hugo Extended v0.168.0 is the pinned baseline. Node dependencies are test/formatting tools, not website build dependencies.

## CSS ownership

Order: reset, tokens, semantic, base, layout, components.

- reset.css: normalization, inherited form typography, focus defaults, hidden behavior.
- tokens.css: immutable palette primitives and shared timing/easing values. Color primitives retain their literal hex identity so aliases cannot silently refer to a renumbered palette.
- semantic.css: role mappings for canvas, text, controls, sidebar, actions, and the tactile blueprint. Light/dark mappings belong here.
- base.css: body typography and primary heading defaults.
- layout.css: application grid, canvas placement, main region, header/footer geometry, structural breakpoints.
- components.css: named component appearance and states, including component-specific breakpoints and Blueprint View presentation.
- Each file declares exactly its matching @layer. main.css declares the precedence order once.
- Do not add a global responsive layer, unlayered presentation rules, or !important specificity workarounds. The reset's hidden attribute exception is intentional.
- Do not put CSS in layouts or static/. No raw palette colors in component rules; resolve them through semantic variables.
- Keep responsive rules with the selectors and layer they modify.
- Keep the approved dimensions and typography until a visual change is authorized. Reference comparisons include antialiasing and use zero differing pixels.

## JavaScript ownership

- main.js: event wiring, Tool activation, creative-direction fields, and generation lifecycle.
- tools.js: Tool identity, accessible input label, writing-tip visibility, initial copy, and creative-question definitions.
- state.js: per-Tool drafts, active Tool, request-cancellation counter, last export snapshot. No persistence.
- theme.js: theme selection and guarded preference storage.
- motion.js: serialized emerge(update) transition boundary and safe inert cleanup.
- blueprint.js: structured response to DOM renderer.
- fixtures.js: illustrative response data. IDs and relationships are checked by architecture tests.
- dom.js: shared element construction. Builder/model text is assigned through textContent, never HTML injection.
- A new Tool needs a registry entry and a matching fixture while simulation is in use. Its questions render through the shared field renderer without new sidebar markup.

## Emergent motion

- Structural updates occur inside emerge(update), not before it.
- Native View Transition API: 360ms cross-dissolve, no geometry interpolation.
- Fallback: 200ms opacity fade out, update while invisible, 200ms fade in.
- Reduced-motion preference: update immediately without animation.
- No sliding, scaling, springing, bouncing, forced scrolling, or independent entrance animations.
- Move focus only after completion with preventScroll.
- The simulated 650ms response delay is not transition duration.
- Timing/easing primitives are in tokens.css, role aliases in semantic.css, animation rules and AI motion contract in components.css, and lifecycle handling in motion.js.

## Reference and runtime boundaries

- specs/REFERENCE_UI.html was copied directly from mocks/polished-sidebar.html without modification.
- Neither file is assembled into the deployed site.
- The test server alone exposes the frozen reference for side-by-side screenshot comparison.
- Generated CSS, JavaScript, and HTML are build output, not sources.
- No live AI engine or arbitrary model-generated UI is introduced. Any future runtime must validate responses and allowlist renderable structures.
- Generated proposals remain separate from canonical blueprints and require explicit acceptance before persistence.
