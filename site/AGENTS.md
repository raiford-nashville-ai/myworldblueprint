# Hugo website

## Purpose

Express the approved Living World Studio as a static-first, accessible Hugo website.

## Ownership

- layouts/: document structure and Studio partials.
- assets/: processed CSS and JavaScript sources.
- content/: future authored pages and canonical semantic nodes.
- data/: future build-time structured definitions.
- static/: files copied without processing.
- archetypes/: defaults for newly authored content.
- i18n/: future interface translations.
- themes/: optional reusable Hugo themes; currently unused.

## Rules

- Build with Hugo Extended v0.168.0 and follow ../specs/asset-architecture.md.
- Preserve the approved experience unless a design change is authorized.
- Read blueprints as architectural input; website implementation does not authorize blueprint edits.
- Keep generation simulated until a server-side engine is explicitly authorized.
- Do not write generated output, dependencies, secrets, or installed binaries into source folders.
- Keep AGENTS.md files out of Hugo component mounts and published output. Preserve the exclusion rules in hugo.yaml.
- Do not modify public/ or other generated output directly.
