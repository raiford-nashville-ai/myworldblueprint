# My World Blueprint

A static-first Living World Studio prototype built with Hugo.

## Current baseline

- Polished Tool navigation, light/dark modes, creative-direction inputs, and expandable writing tips.
- Same-page Blueprint View with tactile presentation and documented emergent transitions.
- Blueprint generation is a local illustrative simulation. No AI service, credentials, or canonical persistence is connected.
- The complete page lives in site/static/index.html. It has not been split into Hugo layouts.

## Run locally

Use Hugo Extended v0.168.0 for this baseline. The installed system Hugo may be a different version; verify with hugo version.

```sh
hugo server --source site --bind 127.0.0.1 --port 1410 --baseURL http://localhost:1410/ --disableFastRender --noHTTPCache
```

Open http://localhost:1410/.

Build without writing generated output into source:

```sh
hugo --source site --destination /tmp/myworldblueprint-hugo-build
```

On the initial development machine, the verified version-specific binary is available at ~/.cache/myworldblueprint/hugo-0.168.0/hugo. Substitute that path for hugo if needed. Binaries are not included in Git.

## Structure

- AGENTS.md: project instructions, safe Git operations, branch names, and Conventional Commits.
- blueprints/: world architecture and maintainable user-request prompts.
- specs/: website requirements and phased Hugo build plan.
- mocks/: retained design explorations and approved mock history.
- site/: Hugo project and current website source.

Edit site/static/index.html for website changes. Historical mocks are not synchronized automatically. Generated output and Hugo locks are ignored.

## Next steps

Review the running prototype before extracting layouts. Structured graph content and server-side AI integration are later, separately authorized phases. See specs/hugo-build-plan.md.

## Git

The initial baseline uses main. Use feat/, fix/, refactor/, docs/, or chore/ branches and Conventional Commit subjects such as feat(studio): add blueprint view.

Repository-local commit identity: Anonymous <anonymous@example.invalid>. This anonymizes author metadata only, not source contents or a future hosting account. No remote or deployment is configured by this setup.
