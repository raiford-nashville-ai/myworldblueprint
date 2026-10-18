# Netlify deployment

## Project

- Live site: https://myworldblueprint.netlify.app/
- Netlify project: https://app.netlify.com/projects/myworldblueprint
- Team: RAIFORD.AI.
- Site ID: 9b0baae6-10eb-40b1-8a8e-f93f5d252105.
- GitHub repository: https://github.com/raiford-nashville-ai/myworldblueprint.
- Production branch target: main.
- Configuration was prepared on feat/netlify-deployment and approved for merge into main.

## Current status

- The merged initial-generation/refactor baseline is live as a manually built static deployment.
- Published deploy: 6ad53e82cdd594f2300a9986.
- Git-based continuous deployment is not operational yet.
- The initial Netlify Git build failed during repository preparation with SSH host-key verification failure.
- GitHub explicitly rejects deploy-key registration: Deploy keys are disabled for this repository.
- Do not change that policy or disable SSH host verification to work around the failure.
- The unused Netlify deploy key created during setup was removed. No GitHub deploy key was installed.
- No GitHub webhook or Actions workflow was added.

## Complete GitHub authorization

1. Open the Netlify project and its build/deployment repository settings.
2. Connect or reconnect GitHub through the Netlify GitHub App. Grant access to this repository; request organization approval if required.
3. Select raiford-nashville-ai/myworldblueprint and production branch main.
4. Use root netlify.toml from main as the authoritative build configuration.
5. Confirm root base directory, site/public publish directory, and the build command and versions in netlify.toml.
6. Trigger a Git-based deployment and verify it reaches ready/published state.
7. Verify the commit reference, live interface, guidance-file 404s, headers, and a subsequent authorized main-branch update before calling continuous deployment complete.

## Build contract

- Hugo Extended v0.168.0; Node 22 for the build environment.
- netlify.toml is the source for build settings and response headers.
- Repository root is the base; Hugo reads site/ and publishes site/public/.
- Deployment baseURL comes from DEPLOY_PRIME_URL, falling back to URL. Do not publish a localhost URL.
- Build warnings fail the build. CSS and JavaScript use Hugo's minification, fingerprinting, and integrity metadata.
- No SPA fallback redirect. Unknown paths must remain real 404s.
- Fingerprinted CSS/JS use immutable cache headers. Responses include MIME-sniffing, framing, referrer, and capability restrictions.
- Local .netlify/ state and caches are ignored. Credentials remain outside the repository.

## Initial manual publication

- Built the unchanged website with the pinned Hugo executable and the live HTTPS baseURL.
- The Netlify API uploaded only generated public files, not the source repository.
- For this API ZIP upload, headers from netlify.toml were materialized as a temporary output-only _headers file because API uploads do not run Netlify's repository build pipeline.
- The temporary build and upload helpers are outside Git; no credentials or private keys were added to source.
- Manual publication uses valid Netlify account authorization and does not grant or bypass GitHub repository access.

## Verified live

- HTTP 200 over HTTPS and successful browser loading of external CSS/JavaScript.
- Required security headers present.
- /AGENTS.md and an unknown route return HTTP 404.
- Light-theme toggle, simulated Tideglass Blueprint View, and mobile Character Tool navigation work.
- No page errors, failed asset requests, or mobile horizontal overflow in the live Chromium smoke check.
- Local production build completes without warnings.
- Existing full pre-deployment run: 7 architecture checks and 38 browser tests passed. Earlier pixel-test instability remains documented; this live smoke test does not replace the full regression suite.
- AI generation remains a clearly labeled simulation; no live AI service or canonical persistence is deployed.
