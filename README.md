# Colabio Frontend

One project-local skill coordinates subject-specific art direction, distinctive
page architecture, working components, motion, and rendered craft review.
The bundle includes pinned Impeccable, Taste Skill, and Hallmark resources.
Awesome DESIGN.md is used as a curated research index, not an executable skill.

## Install with npm skills

Run this in your website project's folder:

```sh
npx skills add Gouravmaurya/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -y
```

This installs the complete Colabio skill and its bundled companion guides for
both Claude Code and Codex, locally in the current project. Requires Node.js
22.20+ and Git. The repository is public; private-repository access is unnecessary.
No global flag is used. Use `/colabio-frontend <task>` in Claude Code or
`$colabio-frontend <task>` in Codex afterward. Start a new session if needed.

The standard `skills/colabio-frontend/` folder contains the full package.
Companion entrypoints are named GUIDE.md so only Colabio is registered as a skill.
The npm skills CLI handles copying and its own lock file. It does not run our
custom installer or its backup/manifest logic. Preserve custom edits before
updating with the CLI. Use the optional verified installer below when those
backup and checksum features are needed.

The source repository is [Gouravmaurya/colabio-frontend](https://github.com/Gouravmaurya/colabio-frontend).
This uses the official `skills` npm CLI; there is no separate npm package named
Colabio that users need to install.

## Optional verified installer

Requires Git and Node.js 22+. Use a separate checkout from your website.
The public repository can be downloaded without organization authentication.

```sh
git -c core.autocrlf=false clone --depth 1 --single-branch --branch v1.0.0 https://github.com/Gouravmaurya/colabio-frontend.git colabio-bundle
cd colabio-bundle
node scripts/install.mjs --verify-only
node scripts/install.mjs --project "/absolute/path/to/your/project"
```

PowerShell wrapper:

```powershell
.\install.ps1 -Project 'D:\path\to\your\project'
```

Shell wrapper:

```sh
sh install.sh --project "/absolute/path/to/your/project"
```

Alternatively paste the complete [PASTE-INSTALL.md](PASTE-INSTALL.md) into a coding
assistant with the target project open. Both methods use the same tagged bundle
and installer. Ordinary chat without filesystem tools cannot install skills.
The programmatic downloader is `node scripts/bootstrap.mjs --project <folder>`.

## Use

```text
Claude Code: /colabio-frontend Build a distinctive landing page for <brief>
Codex:       $colabio-frontend Build a distinctive landing page for <brief>
```

The installer writes `.agents/skills/colabio-frontend/` and
`.claude/skills/colabio-frontend/`. Companions remain nested supporting resources;
they are not installed as separate top-level skills. Reload the assistant or
start a new session if it does not discover the new skill automatically.

No global installation, hooks, AGENTS.md changes, or frontend packages are added.
Upstream optional engines, browser tools, network research, and website animation
dependencies are separate runtime capabilities. Colabio reports unavailable tools
and uses permitted alternatives; it does not pretend that every upstream tool ran.

## Updates, verification, and restore

Reinstalling an identical bundle leaves files unchanged. A different installation
is staged and verified for both providers before replacement. Existing folders
are preserved as sibling `.backup-<restoreId>` folders. Installation failure rolls
back changed providers. Keep backups until you accept the new version.

```sh
node scripts/install.mjs --project "/absolute/project" --restore "<restoreId>"
```

Restore preserves the current copy as `.before-restore-<id>` rather than deleting
it. `manifest.json` and `manifest.sha256` detect corruption; they are not signatures
and do not protect against a compromised publisher. Use only the trusted source
repository and reviewed tags. Hashes are byte-sensitive: do not reformat vendored
files or enable Git newline conversion in the release checkout.

Maintainers update upstream pins in `sources.lock.json`, review the changed
instructions/scripts and licenses, regenerate the manifest with `npm run build`,
and pass `npm test` and `npm run verify` before tagging a release. Never move an
existing published tag. GitHub Actions also runs the checks on Windows and Linux.

## Evidence and rights

See [examples/REPORT.md](examples/REPORT.md) for observed checks and limitations.
No award or outcome is guaranteed. See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)
and each companion's license for redistribution terms. Linked design analyses
and photographs have their own rights; a repository license does not license a
third party's brand or imagery.
