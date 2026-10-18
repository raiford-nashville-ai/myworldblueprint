# Processed assets

## Purpose

Hold editable frontend sources processed through Hugo's asset pipeline.

## Rules

- css/main.css is the stylesheet entry point; js/main.js is the JavaScript entry point.
- Keep CSS in css/ and JavaScript in js/; do not duplicate them inline in layouts or under static/.
- Hugo assembles CSS and bundles JavaScript. Production minification, fingerprints, and integrity metadata are owned by the head/scripts partials.
- Do not check generated bundles, source maps, caches, or installed dependencies into this folder.
- Preserve visual and behavioral parity against the frozen reference during structural changes.
