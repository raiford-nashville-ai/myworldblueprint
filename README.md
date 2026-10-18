# My World Blueprint

A static-first Living World Studio prototype built with Hugo.

## Current implementation

- Polished Tool navigation, light/dark modes, creative direction, and expandable writing tips.
- Same-page Blueprint View with tactile presentation and controlled emergent dissolves.
- Generation is a local illustrative simulation. No AI service, credentials, or canonical persistence is connected.
- Hugo templates and native asset pipelines now render the page. No frontend framework or CSS build dependency is required.

## Run locally

Use Hugo Extended v0.168.0; verify with `hugo version`.

```sh
hugo server --source site --bind 127.0.0.1 --port 1410 --baseURL http://localhost:1410/ --disableFastRender --noHTTPCache
```

Open http://localhost:1410/.

Build production assets without writing generated output into source:

```sh
hugo --source site --environment production --destination /tmp/myworldblueprint-hugo-build --panicOnWarning
```

On the initial development machine, the pinned binary is at `~/.cache/myworldblueprint/hugo-0.168.0/hugo`. Substitute that path for `hugo` if needed. Binaries are not included in Git. Configure the actual deployment `baseURL` before publishing; the repository currently targets local review.

## Folder direction

Each maintained source folder has an `AGENTS.md` defining its purpose, ownership, and local boundaries. Read instructions from the repository root down to the folder being changed; child files supplement the root Git and safety policy rather than repeating it.

`blueprints/` is read-only by default. Website work does not authorize blueprint edits; changes there require explicit approval. Generated output, dependencies, caches, and reports do not receive project instruction files.

Hugo component mounts explicitly exclude `AGENTS.md`, including nested files. These instructions must never become content pages, asset inputs, translations, or public static downloads. The production test harness verifies that exclusion.

## Source architecture

```text
site/layouts/
  baseof.html
  home.html
  partials/
    head.html
    scripts.html
    studio/
      sidebar.html
      topbar.html
      workspace.html
      writing-tips.html
      creative-direction.html
      blueprint-view.html
site/assets/
  css/
    main.css
    reset.css
    tokens.css
    semantic.css
    base.css
    layout.css
    components.css
  js/
    main.js
    dom.js
    tools.js
    state.js
    theme.js
    motion.js
    blueprint.js
    fixtures.js
```

`main.css` is a Hugo resource template: it declares cascade order and includes each layer file at build time through `resources.ExecuteAsTemplate`. It is not a browser-import stylesheet. Each layer file declares only its matching layer. `head.html` minifies and fingerprints the assembled resource in production.

- `reset`: browser normalization and shared accessibility defaults.
- `tokens`: primitive design values, including palette and motion timing.
- `semantic`: purpose-based aliases and light/dark token mappings.
- `base`: document typography and default heading behavior.
- `layout`: Studio grid, canvas geometry, and responsive structural rules.
- `components`: Tool buttons, fields, tips, Blueprint sheet, component states, and motion.

Responsive rules stay with their owner. No blanket responsive/override layer or inline presentation styles are used. Components consume semantic aliases; primitive colors remain isolated. See `specs/asset-architecture.md` for maintenance boundaries.

JavaScript modules are bundled by Hugo's `js.Build`. `tools.js` owns Tool definitions; `state.js` owns transient drafts and cancellation state; `fixtures.js` holds illustrative noncanonical responses. Production CSS and JS carry SHA-384 fingerprints and integrity attributes. Development uses stable asset URLs.

## Reference and regression checks

`specs/REFERENCE_UI.html` is an exact copy of the approved `mocks/polished-sidebar.html`. Neither is a website source file. Keep them unchanged unless a new design baseline is explicitly approved. Do not recreate `site/static/index.html`, which would collide with Hugo's homepage.

```sh
npm ci
node node_modules/@playwright/test/cli.js install chromium firefox
npm run test:structure
npm test
```

Only test/development tooling requires Node. `.npmrc` disables executable symlinks because the development workspace is on pCloud; npm scripts invoke the CLI with Node directly.

The browser harness builds actual production assets into an OS temporary directory and starts an isolated loopback server at port 1412. It serves the frozen reference only at a test-only route. It does not publish the reference in the website build. Set `HUGO_BIN=/path/to/hugo` when necessary.

- Exact pixel comparisons: both themes, widths 375/768/1100/1440/1920, world and character intention/Blueprint views, tips, entity details, expanded input, and mobile navigation.
- Behavior: drafts, generation cancellation, editable input, theme persistence, blocked storage, safe text rendering, export, keyboard/mobile navigation, and native/fallback/reduced-motion paths.
- Automated WCAG A/AA checks in both themes and major views. These do not replace manual accessibility review.
- Reports, screenshots, and failure traces: `playwright-report/` and `test-results/`, both ignored by Git.

See `specs/refactor-verification.md` for the recorded results and remaining production gates.

## Project documentation

- `AGENTS.md`: project boundaries, Git safety, branch conventions, and Conventional Commits.
- `blueprints/`: world architecture and maintainable user-request prompts.
- `specs/`: requirements, frozen reference, architecture, and verification notes.
- `mocks/`: preserved design history, not automatically synchronized.

The refactor is merged into `main`. The initial static prototype is live at https://myworldblueprint.netlify.app/ through a verified manual deployment.

Netlify build configuration is maintained in root `netlify.toml` on `main`. Automatic GitHub deployments still require the Netlify GitHub App to be authorized for this repository; deploy keys are disabled by repository policy. See `specs/netlify-deployment.md` for the exact status and remaining steps. Do not describe the Git-based pipeline as complete until a repository-triggered build succeeds.

Generation remains a simulation, not a live AI service.
