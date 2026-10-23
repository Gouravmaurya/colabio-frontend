# Colabio Frontend

A frontend skill for Claude Code and Codex: product-specific design, deliberate
typography, working interfaces, purposeful motion, and rendered review.

**Install one `SKILL.md`. Add specialist skills only when the task needs them.**
Existing brands, useful features, and all 43 specialist routes remain preserved.
Large builds use a design council; small fixes stay single-agent.

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
└── SKILL.md
```

The Skills CLI writes this folder to these locations:

| Assistant | User install (`-g`) | Project install |
| --- | --- | --- |
| Claude Code | `~/.claude/skills/colabio-frontend/` | `.claude/skills/colabio-frontend/` |
| Codex | `~/.agents/skills/colabio-frontend/` | `.agents/skills/colabio-frontend/` |

`~` means your user home directory, including on Windows. The CLI may maintain
its own installation metadata outside this folder. Installing Colabio does not
install website packages, hooks, a browser, or every specialist.

Prefer a manual install? Download only the [standalone SKILL.md](https://raw.githubusercontent.com/Gouravmaurya/colabio-frontend/main/skills/.curated/colabio-frontend/SKILL.md),
create the appropriate folder above, and save it as `SKILL.md`. No repository
clone is required. Refresh skill discovery or restart the assistant if needed.

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

## Design council

Large builds and substantial redesigns coordinate these responsibilities:

| Role | Responsibility |
| --- | --- |
| Lead / manager | Owns the brief, assignments, integration, and final decision. |
| Skill scout | Reuses installed guidance and selects only needed missing specialists. |
| Designer | Chooses the product concept, page architecture, composition, and imagery. |
| Font researcher | Checks suitable families, licensing, weights, glyphs, and loading cost. |
| Typographer | Sets type roles, hierarchy, measure, wrapping, and responsive scale. |
| Engineer | Checks stack compatibility, implementation, interactions, and performance. |
| UX critic | Judges task clarity, product positioning, accessibility, and regressions. |
| Optional craft judge | Reviews originality, coherence, and rendered visual detail. |

Contributors discuss concrete disagreements; one lead decides. Roles can combine
or run in waves to fit the host's agent limit. Colabio uses the host's real
delegation tools rather than installing an agent framework. If delegation is
unavailable, it performs the passes sequentially and says so. Small fixes and
focused reviews stay single-agent; your explicit preference takes precedence.

## Specialists on demand

The core works by itself. During an authorized build, the agent:

1. Finds a concrete gap, such as React rendering performance or motion craft.
2. Reuses a compatible installed skill when available.
3. Reads the selected upstream instructions and requirements at a pinned revision.
4. Installs only that missing specialist, within the authorized scope and assistant targets.
5. Applies the relevant guidance and verifies the actual result.

Anthropic Frontend Design, Vercel React guidance, and the preserved Colabio
routes are available sources. Awesome Frontend Skills is a discovery directory,
not an executable skill to install.

For user-wide specialist setup in both assistants, state once:

```text
When this build needs a missing specialist, install only that selected skill globally for Claude Code and Codex. Reuse existing copies and preserve customized instructions.
```

Otherwise, missing specialists default to the current project and requested
assistant. Existing authorization is reused; host tool approvals, network access,
and prerequisites still apply. A Markdown link cannot install a skill on its own,
and a review or plan does not silently authorize persistent installation.

Only Colabio's core is guaranteed to be one file. Selected upstream skills may
need their own references or scripts. Application libraries belong in the target
application when needed; adding Colabio does not install them globally.

## Update and troubleshoot

Inspect installed skills:

```sh
npx skills list -g
npx skills list
```

Back up custom edits outside all scanned skill directories, then rerun the same
explicit install command and scope. Verify that the installed Colabio folder
contains exactly `SKILL.md`. Existing specialist skills are preserved and reused.

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
upgrade from the full bundle, and reinstall for both assistants, with exactly
one installed file. The preserved-bundle integration check verifies its complete
payload. Regenerate manifests after source edits. These checks establish packaging
and reported invariants; rendered frontend evaluation remains a separate task.

Installation commands are checked with Skills CLI `1.7.4`. See the
[Skills CLI reference](https://github.com/vercel-labs/skills/blob/main/docs/commands.md),
[agent installation paths](https://github.com/vercel-labs/skills/blob/main/docs/agents.md),
[Claude Code skills](https://code.claude.com/docs/en/skills), and
[Codex skills](https://learn.chatgpt.com/docs/build-skills) for host behavior.
