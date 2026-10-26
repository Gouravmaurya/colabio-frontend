# Release checklist (v1.6.0)

Status: release candidate on `main`. No tag exists for v1.6.0 yet. Do these in order.

## 1. Test (before tagging)
- [ ] Restart Claude Code; confirm only `colabio-frontend` triggers for frontend work (duplicates disabled).
- [ ] Run the acceptance cases in `skills/.curated/colabio-frontend/evals/acceptance.md` (A to F) and fill the results table. Fix what fails; rerun.
- [ ] `npm run verify && npm test && npm run test:standalone && npm run test:npx` all pass (Node 22+).
- [ ] Clean install check on a scratch project: `npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code --copy -y`, then open `/colabio-frontend` and run preflight.

## 2. Prepare
- [ ] `RELEASE-NOTES.md` top section reads "v1.6.0" (drop "release candidate, no tag created").
- [ ] Version strings agree: `package.json` (1.6.0), `SKILL.md` `metadata.version` (1.6.0), `README.md` ("Version 1.6.0", existing `v1.5.0` tag note).
- [ ] After the tag exists: bump `scripts/bootstrap.mjs` default `version` to `v1.6.0` and the `v1.5.0` links in `BUNDLE-README.md`, then rebuild the manifest (`node scripts/build.mjs`) and rerun the tests. Do not change them before the tag exists, or the full-bundle bootstrap points at a missing tag.
- [ ] `library/NOTICE.md` lists every folder under `library/` and each keeps its `LICENSE`; no file named `SKILL.md` below `library/` (the test checks both).
- [ ] No personal paths, secrets or scratch files in the repo (`git status` clean, `git grep -n "C:\\\\Users"` empty outside docs that mention paths as examples).

## 3. Release
- [ ] `git tag -a v1.6.0 -m "Colabio Frontend v1.6.0"` on the tested commit, then `git push origin v1.6.0`.
- [ ] Create the GitHub release from the tag using the v1.6.0 section of `RELEASE-NOTES.md`.
- [ ] Verify install from the tag: `npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/v1.6.0/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code --copy -y`.
- [ ] Update `PASTE-INSTALL.md` / README install commands if they should pin the tag instead of `main`.

## 4. After
- [ ] Keep `~/.claude/skills/colabio-frontend` as the single working copy (the `~/.agents` entry is a junction to it).
- [ ] Re-enable duplicate skills only if you want them separately; see `~/.claude/skills-disabled/README.md`.
- [ ] Open issues for anything the acceptance run marked "not checked".
