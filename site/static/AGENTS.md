# Unprocessed public files

## Purpose

Hold intentionally public files Hugo must copy without transformation, such as approved icons or downloads.

## Rules

- Everything in this mount can become publicly downloadable. Never place secrets, private documents, or internal references here.
- Keep CSS and JavaScript source in ../assets/, not here.
- Do not add index.html; the homepage is rendered by ../layouts/home.html.
- Do not copy mocks or specs/REFERENCE_UI.html into the published site.
- AGENTS.md is internal guidance, not a download; preserve the mount exclusion and test that it is not published.
- No public static resources are required by the current prototype.
