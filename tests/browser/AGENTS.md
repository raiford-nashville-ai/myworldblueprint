# Browser checks

## Purpose

Verify rendered production behavior and visual fidelity against the approved reference.

## Rules

- visual.spec.js compares both themes and responsive views with zero pixel differences, including antialiasing.
- Normalize rendering conditions equally for reference and implementation. Do not modify reference styles or introduce screenshot masks.
- Endpoint screenshots use reduced motion; behavior.spec.js separately checks normal, fallback, and reduced-motion handling.
- Keep generation, draft preservation, theme storage failures, safe text rendering, export, cancellation, keyboard access, and mobile navigation covered.
- accessibility.spec.js runs automated WCAG A/AA audits; retain manual-accessibility limitations in reports.
- Check page errors, failed asset requests, and unexpected network activity.
- Report actual browser coverage. WebKit currently requires missing host libraries and must not be described as tested.
