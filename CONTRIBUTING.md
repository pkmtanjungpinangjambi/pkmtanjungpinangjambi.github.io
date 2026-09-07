# Contributing

## Branch model

- `main` is the production source of truth.
- Use a short-lived branch for every change, for example `feat/...`, `fix/...`, `refactor/...`, or `chore/...`.
- Do not push directly to `main` for routine changes.

## Pull requests

Every pull request should explain:

1. what changed;
2. why the change is needed;
3. what was intentionally left untouched;
4. how the change was validated;
5. any deployment or rollback consideration.

For visual work, include a before/after screenshot when practical. Do not change header, logo, or the 10 Akses Cepat icons unless the task explicitly calls for it.

## Validation bar

Before merging, run the checks that apply to the change. At minimum for website changes:

- JavaScript syntax validation;
- HTML structure and local-reference validation;
- `git diff --check`;
- the repository Quality workflow must be green.

Security-sensitive changes should also pass CodeQL and receive deliberate review before merge.

## Commit messages

Prefer focused, descriptive Conventional Commit-style messages:

`feat(scope): ...`
`fix(scope): ...`
`refactor(scope): ...`
`chore(scope): ...`
`docs(scope): ...`
`security(scope): ...`

Avoid temporary messages such as `temp`, `test`, or `wip` on durable `main` history.

## Deployment discipline

A successful GitHub merge does not by itself prove that production has changed. Verify the deployment provider separately and record the production commit SHA in the relevant checkpoint when a release is important.

When a provider is rate-limited, do not create empty or unrelated commits merely to force a deployment retry. Resume from the same intended production commit when the provider becomes available.
