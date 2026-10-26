# Colabio Frontend

A frontend skill for Claude Code and Codex: product-specific design, deliberate
typography, working interfaces, purposeful motion, and rendered review.

**One self-contained skill: no other skill to install.** `SKILL.md` plus bundled
style recipes, curated fonts and palettes, a seeded direction picker, a
template-tell scanner, motion recipes, asset/copy gates and component-library
mining. Existing brands are preserved; small fixes stay local. The larger
43-route bundle remains available separately.

Version **1.6.0** adds six cinematic composition recipes and strict rendered
baseline/slice/final gates. A redesign with a recorded visual regression is a
candidate, not a verified upgrade. The bundled checker catches missing/mismatched
evidence and unresolved findings; it cannot judge aesthetics or guarantee awards.
The [live portfolio study](skills/.curated/colabio-frontend/references/studies/editorial-portfolio.md)
shows how to learn framing, typography and continuity without copying a palette.

Open color briefs compare two grounded palettes before choosing. The rendered
review challenges unsupported color choices, including tinted neutrals and large
CTA surfaces; the kit is a starting point and established brand colors still win.

[Read the skill](skills/.curated/colabio-frontend/SKILL.md) ·
[Copy-paste setup prompt](PASTE-INSTALL.md) ·
[Preserved full-bundle documentation](BUNDLE-README.md)

## Install

Requires **Node.js 22.20+**, **Git**, and Claude Code or Codex with local skill
support. Run the commands in a terminal, not in the assistant's chat input.
The source is public; no GitHub token is needed.

### Both Claude Code and Codex

Install for your user account, available across projects:

```sh
npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -g -y
```

When updating, back up customized copies outside scanned skill directories first.
Check the actual `.agents/skills/colabio-frontend` (Codex) and
`.claude/skills/colabio-frontend` (Claude Code) files, not just the clone. The new
entrypoint includes `metadata.version: "1.6.0"`, and both installed folders must
contain `references/cinematic-recipes.md`, `references/visual-comparison-gates.md`
and `scripts/verify-visual-gates.mjs`. Check project-local and alternate `.codex`
copies that might shadow the global version. Refresh discovery after replacement.

For this project only, run from its root and omit `-g`:

```sh
npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -y
```

### Only one assistant

Claude Code across projects:

```sh
npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code --copy -g -y
```

Codex across projects:

```sh
npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a codex --copy -g -y
```

`-a` selects assistants, `--copy` copies the files, `-g` selects user scope,
and `-y` accepts the installer's prompts. Back up customized Colabio files
before running a replacement install.

### What gets installed

The selected source folder contains exactly:

```text
colabio-frontend/
├── SKILL.md
├── references/
├── scripts/
├── templates/
└── evals/
```

The Skills CLI writes this folder to these locations:

| Assistant | User install (`-g`) | Project install |
| --- | --- | --- |
| Claude Code | `~/.claude/skills/colabio-frontend/` | `.claude/skills/colabio-frontend/` |
| Codex | `~/.agents/skills/colabio-frontend/` | `.agents/skills/colabio-frontend/` |

`~` means your user home directory, including on Windows. The CLI may maintain
its own installation metadata outside this folder. Installing Colabio does not
install website packages, hooks, a browser, or other skills.

Prefer a manual install? Copy the [standalone folder](skills/.curated/colabio-frontend)
(`SKILL.md`, `references/`, `scripts/`, `templates/`, `evals/`) into the appropriate skills folder above. Refresh skill discovery or restart the assistant if needed.

## Use

Open your actual website or application project in the assistant. Invoke Colabio
explicitly for a predictable starting point.

**Claude Code — type in chat:**

```text
/colabio-frontend Redesign our landing page. Inspect the current live site first, preserve our logo and brand, and make our product clearer. Build and verify the responsive result.
```

**Codex — type in chat:**

```text
$colabio-frontend Build a garment operations dashboard with orders, production, inventory, and retail flows. Reuse the existing stack and APIs. Make any sample data explicit and test the working interactions.
```

For a small task:

```text
/colabio-frontend Fix the mobile navigation overlap. Keep the current design and work single-agent.
```

Use `$colabio-frontend` instead of `/colabio-frontend` for that prompt in Codex.
Automatic selection is also possible when the request matches the skill's
description. If it is missing, inspect the installed skills list: `/skills` in
Codex, or ask Claude Code what skills are available. Start a new session if the
installation is not picked up.

### Give it the right brief

Include the product and audience, the pages or components to build, the main
user task, the current site or screenshots when relevant, and constraints such
as the existing framework, brand, available APIs, or single-agent preference.
For example: “Improve the checkout only; preserve its behavior and our colors.”

For substantial work, Colabio should inspect the project, compare meaningful
directions, implement one coherent interface, and review it rendered. A redesign
compares the original and result across product clarity, brand recognition,
feature discovery, visual craft, and usability. Cleaner spacing alone does not
establish an upgrade. Unavailable checks and simulated behavior are disclosed.

## Built in

One skill, one entry point. Everything is in the skill folder:

- **Pipeline and decisions:** understanding sheet, Cinematic Design Prompt, build selector, domain-grounded palette lab, anti-clone rule, rendered gates, finish gate.
- **Commands:** new, shape, redesign, critique, audit, polish, harden, distill, bolder, quieter, typeset, layout, colorize, animate, onboard, clarify, adapt, optimize.
- **`library/`:** reviewed upstream guides bundled with their licenses and routed by `library/INDEX.md` (Impeccable playbooks, Hallmark components and page structures, Taste anti-slop references, UI/UX Pro Max decision data, Emil Kowalski's guides, GSAP official skills, Motion, Scroll Craft, Three.js rules). See `library/NOTICE.md` and `references/sources.md`.
- **Starters and scripts:** four working templates, `select-build`, `palette-lab`, `finish-gate`, `slop-lint`, `check-contrast`, `serve`, `scaffold`.

It never installs another skill. If Impeccable, Taste or Hallmark are also installed, disable them so they do not double-trigger.

## Update and troubleshoot

Inspect installed skills:

```sh
npx skills list -g
npx skills list
```

Back up custom edits outside all scanned skill directories, then rerun the same
explicit install command and scope. Verify that the installed Colabio folder
is the self-contained standalone folder (SKILL.md, references/, scripts/).

If the old bundle still loads, check both user and project installations and
any legacy/custom locations your host lists. A project copy can override a
personal copy in Claude Code; Codex can expose multiple same-named skills.
Update the intended copy, then refresh discovery or restart. Do not keep a
backup containing `SKILL.md` inside a scanned skills folder: it may be discovered
as another skill.

If `npx` is unavailable, install Node.js and Git or use the manual Markdown route.
If a specialist or browser tool is unavailable, Colabio reports the limitation
and continues with the core where possible. Quality and conversion gains are
not guaranteed by installation or test counts.

## Preserved source library

All 43 original routes, companion/module guides, licenses, source pins, examples,
and helpers remain in this repository. The original `skills/colabio-frontend/`
bundle is retained, with `metadata.internal` for Skills CLI discovery. The default
installed payload is smaller; preserving the research library keeps the source
repository larger.

The original verified installer, shell/PowerShell wrappers, and tagged bootstrap
continue to install the full bundle. They do not install the standalone core.
See [BUNDLE-README.md](BUNDLE-README.md) for that workflow and its backup/restore
behavior. The existing `v1.5.0` tag remains unchanged.

## Maintainer checks

```sh
npm run build
npm run verify
npm test
npm run test:standalone
npm run test:npx
```

The standalone integration check covers fresh installation, repository discovery,
upgrade from the full bundle, and reinstall for both assistants, with installed
files matching the complete standalone folder. The preserved-bundle integration
check verifies its complete payload. Regenerate manifests after source edits. These checks establish packaging
and reported invariants; rendered frontend evaluation remains a separate task.

Installation commands are checked with Skills CLI `1.7.4`. See the
[Skills CLI reference](https://github.com/vercel-labs/skills/blob/main/docs/commands.md),
[agent installation paths](https://github.com/vercel-labs/skills/blob/main/docs/agents.md),
[Claude Code skills](https://code.claude.com/docs/en/skills), and
[Codex skills](https://learn.chatgpt.com/docs/build-skills) for host behavior.
