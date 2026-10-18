# Hugo build plan

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

- After approval, move the shared Studio shell into Hugo layouts and partials.
- Extract layered CSS and JavaScript into assets without changing the approved experience.
- Move Tool definitions and Layout Maps into structured data.
- Keep navigation registry-driven and Tool workspaces independently configurable.
- Compare against phase 1 in desktop and mobile browsers.

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
