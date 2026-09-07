# CHECKPOINT — GitHub Operations Hardening — 2026-09-07

## Production source of truth

- Default branch: `main`
- Latest protected feature merged: PR #258, Hero BerAKHLAK + 5S
- Merge commit: `465df259e6ea4e5324933164814671df8dd85d0c`
- Repository visibility: public

## Current website baseline

- Header/logo: locked unless explicitly changed.
- 10 Akses Cepat icons: locked unless explicitly changed.
- Tablet layout: 4–4–2 for 10 icons.
- Hero: Tagline 2029 followed by BerAKHLAK and 5S visuals.
- Leader card: no BerAKHLAK/5S badge.

## Deployment note

The Vercel deployment associated with the #258 change was rejected by the Hobby deployment-rate limit (`api-deployments-free-per-day`). Cloudflare Workers reported a successful production deployment for the #258 head commit before the GitHub merge.

This means GitHub `main` and the Vercel production deployment may temporarily be on different commits. When the Vercel quota is available, deploy the existing `main` commit rather than creating an empty workaround commit.

## GitHub hardening introduced in this branch

- `.github/workflows/quality.yml` — reusable PR/main quality gate for JavaScript syntax, HTML structure, local references, content-protection presence, and whitespace checks.
- `.github/workflows/codeql.yml` — scheduled and PR/main CodeQL analysis for JavaScript/TypeScript.
- `.github/dependabot.yml` — monthly updates for GitHub Actions dependencies.
- `SECURITY.md` — private vulnerability-reporting guidance and rules for handling sensitive information.
- `CONTRIBUTING.md` — branch, PR, validation, commit, and deployment discipline.
- `.github/pull_request_template.md` — scope guard and deployment checklist.

## Legacy automation removed

The following one-time write-capable workflows were removed from the hardening branch because they could mutate branches automatically:

- `.github/workflows/activate-content-protection.yml`
- `.github/workflows/manual-activate-content-protection.yml`
- `.github/workflows/normalize-script-cache.yml`

The consolidated Quality workflow now verifies the resulting state in read-only mode.

## Next hardening step

Configure a `main` branch ruleset requiring pull requests and the Quality workflow to pass before merge, while preserving the owner's emergency administrative override for genuine production incidents.
