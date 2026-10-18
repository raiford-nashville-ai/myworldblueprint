# Refactor verification

## Scope

- Implementation branch: refactor/hugo-asset-layers.
- Baseline: initial-generation commit 26692bf.
- Reference: specs/REFERENCE_UI.html, copied byte-for-byte from mocks/polished-sidebar.html.
- This refactor changes source architecture, not the approved design or simulated-generation boundary.
- No deployment, merge, remote changes, or live AI integration was performed.

## Environment

- Hugo Extended v0.168.0.
- Playwright 1.64.1.
- Chromium 156.0.8078.4 and Firefox 157.0, Linux headless.
- Browser tests build and serve minified, fingerprinted production resources on an isolated local server.
- Website build requires only Hugo; Node is needed for test and development tooling.

## Latest folder-guidance verification

- Added or refined AGENTS.md in all maintained source directories; dependencies and generated directories are excluded from the pattern.
- Blueprint instructions preserve the user's explicit approval gate for writes.
- Hugo's seven component mounts exclude instruction files using the current files setting.
- Production build with --panicOnWarning passes and emits only the homepage and its CSS/JavaScript bundles; no guidance files or extra pages are emitted.
- Architecture suite: 7 passed, including complete source-folder guidance coverage.
- Browser suite after this documentation/configuration change: 37 passed, 1 failed out of 38. The failing case is Chromium, 1100px, dark, initial intention view, with 6 differing pixels. It also fails on a targeted rerun; Firefox's matching case and the guidance-publication checks pass.
- This pixel discrepancy is unresolved. Do not infer its cause, change the reference, add a screenshot mask, or weaken the assertion. The current complete suite must not be described as green.
- The prior passing refactor run below remains historical evidence, not the latest all-tests status.

## Original refactor results

- Production Hugo build with --panicOnWarning: passed, no warnings.
- npm run test:structure: 6 passed.
- npm test: 36 passed, no skipped tests in the configured Chromium/Firefox projects.
- npm audit --audit-level=low: no reported vulnerabilities at verification time.
- git diff --check: passed for tracked changes.
- Reference/mock byte comparison: identical.

## Pixel comparisons

- 20 visual test cases: 5 viewport widths × 2 themes × 2 browsers.
- Widths: 375, 768, 1100, 1440, and 1920 pixels; viewport height 960; device scale factor 1.
- 144 full-page reference/implementation image pairs compared.
- Result: zero differing pixels in all pairs, including antialiasing. No screenshot masks or difference tolerance.
- Views: World intention, expanded writing tips, World Blueprint View, expanded entity details, expanded intention, Character intention, Character Blueprint View, and mobile Tool navigation.
- Comparisons use a shared browser context for consistent texture/font rendering, with reduced motion to capture stable endpoint states. Chromium uses --disable-lcd-text for deterministic text rasterization. The reference itself is not modified or restyled.
- Pointer hover, focus, fonts, and paint completion are normalized before capture. Separate behavior tests retain and verify keyboard focus and motion handling.
- An extracted caption cascade conflict and template-induced preformatted caption whitespace were corrected during testing; the comparison threshold was not relaxed.

## Functional checks

- Production CSS and JavaScript load with fingerprinted URLs and SHA-384 integrity metadata.
- No page errors, failed resources, or generation-time network requests in the checked flow.
- Per-Tool intentions and creative-direction values survive Tool switching.
- Theme preference survives reload; blocked localStorage is handled safely.
- Blueprint View compacts the editable intention and renders the correct illustrative fixture.
- Entity details, expanded intention, and JSON sample export work.
- Export retains the submitted intention and creative direction with explicit noncanonical fixture provenance.
- Editing cancels an in-flight simulation and marks an existing snapshot stale.
- Switching Tools cancels stale generation.
- Whitespace-only intentions are rejected.
- Input containing HTML is rendered as text, not executed.
- Mobile Tool navigation, skip-link keyboard access, focus restoration, and absence of horizontal overflow are checked.
- Normal-motion flows, the two-phase 200ms fallback, reduced-motion bypass, and opacity-only CSS keyframes are checked.
- CSS layer/file correspondence, token references, absence of inline presentation, and fixture graph identity/reference integrity are checked.

## Accessibility checks

- Eight automated WCAG 2 A/AA and 2.1 A/AA audits: both themes × intention/Blueprint views × both browsers.
- No violations reported by the configured axe checks.
- This is not a complete accessibility certification. Manual screen-reader, zoom, high-contrast, and real-device review remain necessary.

## Artifacts and reproduction

- Run npm ci.
- Install browsers: node node_modules/@playwright/test/cli.js install chromium firefox.
- Run npm run test:structure and npm test.
- Set HUGO_BIN when the pinned Hugo executable is not discoverable at the documented location.
- Reports/screenshots: playwright-report/; failure traces: test-results/. Both are intentionally untracked.
- The test-only reference route is not part of Hugo production output.

## Remaining production gates

- WebKit/Safari is not verified. WebKit installation succeeded, but browser launch is blocked by missing host dependencies libevent-2.1-7t64 and libavif16. No system packages were installed or changed to bypass this.
- Visual results apply to these tested browsers, dimensions, fonts, operating system, and states; they do not establish equivalence on every device.
- Complete human review of the running site and manual accessibility checks before release.
- Configure the real deployment baseURL, hosting security/cache headers, and deployment process separately. No hosting environment was tested.
- The generation feature remains a clearly labeled static simulation, not a production AI engine or persistence service.
- Tests demonstrate refactor fidelity and static-prototype readiness for review, not blanket production certification.
