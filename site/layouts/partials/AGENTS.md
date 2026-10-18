# Shared partials

## Purpose

Compose focused document infrastructure and Studio interface fragments.

## Rules

- head.html owns metadata and the assembled CSS link.
- scripts.html owns Hugo's JavaScript build and script inclusion.
- studio/ owns interface markup, not build infrastructure.
- Production links must retain minification, fingerprints, and integrity metadata; development links use stable URLs.
- Pass explicit context where needed and avoid hidden cross-partial state.
- Do not duplicate the same interface fragment or asset link across templates.
