# Hugo layouts

## Purpose

Define the published document structure and reusable Studio markup.

## Rules

- baseof.html owns the document skeleton; home.html composes the homepage.
- Use partials for focused reusable markup, not unnecessary wrappers.
- Keep CSS and browser behavior under ../assets/; no inline presentation or application scripts.
- Preserve DOM IDs, accessible labels, and structural hooks consumed by JavaScript and tests.
- Use Hugo's normal escaping for content. Do not mark untrusted Builder/model output as safe HTML.
- Do not recreate a static/index.html homepage alongside the rendered home template.
- Keep the approved clean canvas; layout extraction does not authorize redesign.
