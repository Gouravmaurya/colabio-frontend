# Colabio Frontend

> Preserved full-bundle documentation. The new default is the one-file core in
> [README.md](README.md). To reproduce the original npm bundle installation,
> use the explicit source `https://github.com/Gouravmaurya/colabio-frontend/tree/v1.5.0/skills/colabio-frontend`
> in the command below. The unversioned repository shorthand now selects the core.

One project-local skill coordinates subject-specific art direction, distinctive
page architecture, working components, motion, and rendered craft review.
The bundle includes pinned Impeccable, Taste Skill, Hallmark, and 34 additional
design/image/motion/scroll/WebGL modules, with 39 primary/module/adapter routes.
Awesome DESIGN.md is used as a curated research index, not an executable skill.

## Install with npm skills

Install once for your user account, for Claude Code and Codex across projects:

```sh
npx skills add Gouravmaurya/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -g -y
```

This installs the complete Colabio skill and its bundled companion guides for
both Claude Code and Codex in your user-level skill directories. Requires Node.js
22.20+ and Git. The repository is public; private-repository access is unnecessary.
For project-only installation, omit `-g`. Use `/colabio-frontend <task>` in Claude Code or
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
git -c core.autocrlf=false clone --depth 1 --single-branch --branch v1.5.0 https://github.com/Gouravmaurya/colabio-frontend.git colabio-bundle
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

The optional custom installer writes `.agents/skills/colabio-frontend/` and
`.claude/skills/colabio-frontend/`. Companions remain nested supporting resources;
they are not installed as separate top-level skills. Reload the assistant or
start a new session if it does not discover the new skill automatically.

The npm command's `-g` affects only skill installation. No hooks, AGENTS.md changes,
or frontend packages are added during skill installation.
Upstream optional engines, browser tools, network research, and website animation
dependencies are separate runtime capabilities. Colabio reports unavailable tools
and uses permitted alternatives; it does not pretend that every upstream tool ran.

## Build with the coordinated toolbox

Colabio selects relevant modules for web/native interfaces, bespoke components,
visual concepts, redesign, polish, purposeful motion, immersive scrolling, and
3D/WebGL. The [module router](skills/colabio-frontend/references/module-router.md)
lists all guides. Duplicate Taste installations are deduplicated. Classic styles
and v1 compatibility are optional; one direction and token system governs a build.
Redesign-existing-projects routes to maintained Taste guidance. Web interface
guidelines link to Vercel's current source instead of redistributing unlicensed text.

During authorized implementation, Colabio automatically installs missing GSAP,
Lenis, and Framer Motion/Motion packages in the target application when needed.
It respects npm/pnpm/Yarn/Bun, existing dependencies and lock files, and skips
React Motion for non-React pages. It does not install all libraries into every
project, install website dependencies globally, or add them during a review/plan.
The bundled dependency helper supports preview and execution and is tested.

The [component-library guide](skills/colabio-frontend/references/component-libraries.md)
adds shadcn/ui, Vengeance UI, Skiper UI, and Motion selection and installation
routes. Colabio installs selected source components when needed, preserves the
project theme, and previews registry changes. The skill does not globally install
these libraries or include paid component access.

Image generation, paid video services, native toolchains, Python, FFmpeg, and
GPU/browser capabilities remain host-dependent. Optional tools are not silently
installed globally. No skill can guarantee quality across every possible brief.

## Automatic skill selection

For each substantial project, Colabio assesses all 43 routes against the brief,
actual stack, existing components, assets, and scope. It combines relevant design,
component-craft, responsive, motion, and review guides rather than stopping at
three core companions. There is no fixed skill-count target.

The bundled read-only selector produces selected/candidate/not-needed decisions
for the entire inventory. Colabio resolves library candidates, consults selected
guides phase by phase, and records actual applications separately from the plan.
It preserves one concept and token system, avoids incompatible theme generators,
and adds runtime dependencies only when required by an authorized implementation.

See [automatic selection](skills/colabio-frontend/references/automatic-selection.md).
The selector supports small scoped tasks as well as full websites, app screens,
and native targets. It is a planning aid, not an autonomous renderer or an award
guarantee. All prior invocation and installation commands still work.

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

## Product-led decisions and verification

Version 1.5 adds a focused discovery round for unresolved creative choices, product-specific direction/component/palette comparisons, offline original mechanism analyses, and repeatable evidence checks. Minimal, editorial premium, and expressive flagship describe character; none implies a guaranteed monetary valuation.

The read-only evidence helper validates reported gate records, local artifact paths, responsive screenshot entries, and performance budgets. It does not run browser tests or independently judge quality. Cross-brief rendered evaluation remains separate from installer/unit tests; see EXPANSION-VERIFICATION.md for release-specific limits.
