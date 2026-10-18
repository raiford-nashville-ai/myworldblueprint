# Hugo build plan

## Current status

- Phase 1 is preserved in the initial main-branch commit.
- Phase 2 is implemented on refactor/hugo-asset-layers for review; no merge or deployment is authorized.
- Approved reference: specs/REFERENCE_UI.html, copied directly from mocks/polished-sidebar.html.
- Active sources are site/layouts/ and site/assets/, not site/static/index.html.
- See specs/asset-architecture.md for layer ownership and specs/refactor-verification.md for test coverage and limitations.
- Phase 1 below describes the historical baseline. Its single-file restriction was superseded by the explicit phase-2 refactor request.

## 1. Publish the approved page for review

- Use Hugo Extended v0.168.0, verified against the latest stable GitHub release for this setup.
- Scaffold the project in site/.
- Copy mocks/polished-sidebar.html unchanged to site/static/index.html.
- Disable Hugo-generated page kinds; serve the static homepage without templates or a theme.
- Keep CSS, JavaScript, Tool definitions, fixtures, and motion documentation in the single HTML file.
- Run a local-only preview at http://localhost:1410/.
- Do not add graph content, a layout split, AI integration, deployment, or commits in this step.

Acceptance:
- Hugo builds successfully.
- Built index.html exactly matches the approved mock.
- Homepage returns HTTP 200.
- Review light/dark modes, Tool switching, creative direction, expandable tips, editable intention, simulated Blueprint View, export, and emergent transitions in the browser.
- Respect reduced motion and retain mobile navigation.
- Keep simulated output visibly separate from real AI generation and canonical content.
- Wait for user review before phase 2.

## 2. Extract the approved interface

- Move the shared Studio shell into Hugo layouts and partials without changing the approved experience.
- Extract CSS to matching reset, tokens, semantic, base, layout, and components layer files, assembled through assets/css/main.css.
- Extract JavaScript into native modules built by Hugo's js.Build.
- Keep Tool definitions and creative-question structures in assets/js/tools.js; illustrative responses remain separate in fixtures.js.
- Retain registry-driven navigation and independently configurable Tool questions.
- Compare the production build against the frozen phase-1 reference with zero-pixel-difference screenshots in desktop and mobile browsers.
- A general model-generated Layout Map renderer is deferred; current Tools use the approved common workspace structure.

## 3. Introduce canonical content

- Agree the minimal ontology and blueprint schema before creating graph content.
- Use stable node.id values and explicit relationships targeting those IDs.
- Validate identity, ontology, relationship references, and provenance at build time.
- Keep canonical blueprints separate from illustrative fixtures and proposed changes.

## 4. Connect generation

- Add an authorized server-side runtime; Hugo remains the static publishing layer.
- Keep credentials off the client.
- Supply world context through the system prompt; use blueprints/prompts.md for user requests.
- Validate structured responses before rendering approved components.
- Preserve builder inputs, cancellation, errors, accessibility, and documented transition timing.
- Require explicit acceptance before committing generated changes to canonical blueprints.

## Local commands

Hugo binary: /home/doug/.cache/myworldblueprint/hugo-0.168.0/hugo

Build: /home/doug/.cache/myworldblueprint/hugo-0.168.0/hugo --source site --destination /tmp/myworldblueprint-hugo-build

Preview: /home/doug/.cache/myworldblueprint/hugo-0.168.0/hugo server --source site --bind 127.0.0.1 --port 1410 --baseURL http://localhost:1410/ --disableFastRender --noHTTPCache

The version-specific installation leaves the existing global Hugo binary unchanged. Its downloaded archive was verified against the release checksums. Other applications already use ports 1313 and 1314.
