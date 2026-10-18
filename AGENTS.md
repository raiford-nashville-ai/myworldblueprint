# Project instructions

## Folder instructions

- This file defines repository-wide defaults. Before working in a folder, read applicable AGENTS.md files from the root down to that folder.
- Folder instructions define local purpose, ownership, and boundaries; they do not silently grant permission to change protected sources.
- blueprints/ is read-only by default. Writing there requires explicit user approval for the blueprint change; website work does not grant that approval.
- Keep a concise AGENTS.md in every maintained source folder, including intentionally reserved Hugo folders. State what belongs there, what does not, and any approval gates.
- Do not add project instructions to dependencies, generated output, caches, or reports.
- Do not copy all parent instructions into children. Keep general Git and project policy here and add only local direction below.
- Keep guidance files excluded from Hugo's mounted components and public output; maintain exclusion tests when adding folders.

## Scope

- Read existing files before editing. Prefer focused changes.
- Treat blueprints/master-blueprint.md and specs/ as architectural context.
- blueprints/world.md is currently empty; do not invent canonical world content.
- Website source: site/layouts/ and site/assets/. The homepage is layouts/home.html, using baseof.html and Studio partials.
- Preserve specs/REFERENCE_UI.html as the byte-identical copy of mocks/polished-sidebar.html. Do not update the reference to hide regressions.
- Preserve mocks/ as design history. Do not synchronize or overwrite mocks without a request.
- Do not recreate site/static/index.html; it would collide with Hugo's rendered homepage.
- CSS entry point: assets/css/main.css. Files map directly to reset, tokens, semantic, base, layout, and components layers, in that order.
- Keep raw palette values in tokens.css, theme/role mappings in semantic.css, and responsive rules in the layer they modify. Components consume semantic tokens, never palette values directly.
- Use Hugo's resource pipeline for CSS assembly and js.Build for JavaScript modules. Production assets are minified, fingerprinted, and linked with integrity metadata.
- Add Tool identity, accessible input label, writing-tip visibility, and creative questions in assets/js/tools.js. Add matching illustrative fixtures in fixtures.js until a real engine is authorized.
- Hugo publishes static content. The current generation response is a labeled simulation, not an AI service.
- Keep the clean canvas, polished Tool sidebar, tactile Blueprint View, and light/dark modes.
- Follow the emergent-motion contract in assets/css/components.css and assets/js/motion.js: controlled 200–500ms dissolves, no sudden movement, reduced-motion support.
- Use blueprints/prompts.md for user-request templates. Do not repeat system-level world definitions in each request.

## Deployment

- Netlify build configuration lives in root netlify.toml. Follow specs/netlify-deployment.md for project identity, live status, and remaining authorization steps.
- The current live site was published manually; GitHub continuous deployment is not yet verified.
- Repository policy disables deploy keys. Do not bypass it or disable SSH host verification; use an authorized Netlify GitHub App connection.
- Keep deployment credentials, local .netlify/ state, and generated public files out of Git.
- Build for the actual deployment URL, not the localhost baseURL used for local review.
- Deploy only with user authorization and verify the target project before publishing.

## Git identity

- Use repository-local identity: Anonymous <anonymous@example.invalid>.
- Do not change global Git configuration.
- Keep credentials, personal email addresses, and machine-local runtime artifacts out of new commits.
- Anonymous commit metadata does not anonymize file contents or hosting accounts. Inspect staged content separately.

## Branches

- main: reviewed baseline.
- feat/<short-kebab-description>: new functionality.
- fix/<short-kebab-description>: bug fixes.
- refactor/<short-kebab-description>: behavior-preserving restructuring.
- docs/<short-kebab-description>: documentation only.
- chore/<short-kebab-description>: tooling and maintenance.
- Examples: feat/blueprint-editor, fix/theme-contrast, refactor/studio-shell.
- Start an authorized feature branch from the agreed baseline. Do not switch branches with unrelated uncommitted work.
- Do not create extra worktrees or agents without a request.

## Commits

- Use Conventional Commits: type(scope): imperative summary.
- Types: feat, fix, refactor, docs, style, test, build, ci, perf, chore, revert.
- Scopes: studio, blueprint, tools, hugo, prompts, repo; omit scope when unnecessary.
- Keep the subject concise, preferably within 72 characters; no trailing period.
- Examples: feat(studio): add blueprint view; fix(studio): preserve tool drafts; docs(prompts): clarify revision request.
- Use ! and a BREAKING CHANGE: footer only for actual breaking changes.
- Explain intent and verification in a body when useful. Do not claim tests that were not run.
- Keep commits focused. Commit only when requested or authorized by the agreed workflow.

## Safe workflow

1. Inspect git status --short --branch, current branch, and git diff before work.
2. Preserve unrelated user changes; never discard or stage them silently.
3. Implement and validate the requested scope.
4. Stage explicit paths, not broad git add . operations.
5. Inspect git diff --cached, git diff --cached --check, and staged filenames. Check for secrets and generated artifacts.
6. Commit with the repository-local identity and an accurate message.
7. Report commit hash, branch, tests, and remaining changes.

- Never use reset --hard, clean -fd, checkout -- ., history rewriting, amend, or force pushes without explicit authorization.
- Prefer an authorized revert for an already shared change.
- Do not bypass hooks or verification without permission.
- Do not merge, rebase, tag releases, add remotes, push, or deploy without authorization.

## Verification

- Target Hugo Extended v0.168.0 for this baseline. Check hugo version before builds.
- Build: hugo --source site --destination /tmp/myworldblueprint-hugo-build.
- Preview: hugo server --source site --bind 127.0.0.1 --port 1410 --baseURL http://localhost:1410/ --disableFastRender --noHTTPCache.
- Install locked test dependencies with npm ci; .npmrc disables executable symlinks for pCloud compatibility.
- Install test browsers: node node_modules/@playwright/test/cli.js install chromium firefox.
- Run npm run test:structure and npm test. Set HUGO_BIN if the pinned executable is not on PATH or in the documented cache path.
- Browser tests build and serve production output on loopback port 1412. Do not reuse an unrelated server or weaken visual comparisons to obtain a pass.
- Visual tests compare all pixels, including antialiasing, against the frozen reference in the same browser. Reduced motion is used for stable endpoint screenshots; motion behavior has separate tests.
- Review playwright-report/ for screenshots and traces. Record actual browser coverage and unsupported engines.
- Do not describe syntax-only checks or automated accessibility checks as a complete browser/accessibility certification.
- Keep public/, generated resources, browser reports, Hugo locks, caches, logs, secrets, and installed binaries untracked.
