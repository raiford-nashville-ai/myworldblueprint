# Project instructions

## Scope

- Read existing files before editing. Prefer focused changes.
- Treat blueprints/master-blueprint.md and specs/ as architectural context.
- blueprints/world.md is currently empty; do not invent canonical world content.
- Current website source: site/static/index.html, initially copied from mocks/polished-sidebar.html.
- Preserve mocks/ as design history. Do not synchronize or overwrite mocks without a request.
- Keep the single-page implementation intact until a layout extraction is authorized.
- Hugo publishes static content. The current generation response is a labeled simulation, not an AI service.
- Keep the clean canvas, polished Tool sidebar, tactile Blueprint View, and light/dark modes.
- Follow the emergent-motion contract documented inside the page: controlled 200–500ms dissolves, no sudden movement, reduced-motion support.
- Use blueprints/prompts.md for user-request templates. Do not repeat system-level world definitions in each request.

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
- Check JavaScript syntax and verify UI changes in a browser when available.
- Do not describe syntax-only checks as browser testing.
- Keep public/, generated resources, Hugo locks, caches, logs, secrets, and installed binaries untracked.
