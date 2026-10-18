# Build-time data

## Purpose

Hold future structured definitions Hugo reads at build time, such as an approved ontology or shared configuration.

## Rules

- Prefer a single authoritative definition over duplicated constants across data, templates, and browser modules.
- The active Tool registry currently lives in ../assets/js/tools.js; do not create a parallel registry here without an approved migration.
- Store meaning and configuration, not HTML layouts or generated browser state.
- Do not invent ontology types, kinds, predicates, or canonical assertions without approval.
- Never store secrets or runtime credentials in build data; they can leak into published output.
