# Colabio Frontend

Product-specific art direction, original page architecture, working signature
components, typography, purposeful motion, and rendered review in one `SKILL.md`.
Colabio installs only missing specialists with a concrete contribution to the task.

## Install the Markdown-only core

Install for both Claude Code and Codex across projects:

```sh
npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -g -y
```

The selected skill folder contains exactly one file: `SKILL.md`. Requires the
[Skills CLI](https://github.com/vercel-labs/skills) prerequisites (currently
Node.js 22.20+ and Git). Omit `-g` for project scope, or select only the agent
you use. The CLI can also discover the new core from the repository shorthand;
the explicit folder URL makes the one-file source unambiguous.

```text
Claude Code: /colabio-frontend <frontend task>
Codex:       $colabio-frontend <frontend task>
```

Colabio works from its own instructions without sibling scripts or references.
No application dependencies or specialist skills are installed merely by adding
Colabio. During an authorized build, it reuses installed skills and installs only
selected missing specialists within the user's chosen scope and agent targets.
Host permissions, network access, and runtime prerequisites still apply.

## What changed

- Core design decisions remain: understand the product, compare meaningful
  architectures, build a signature component, define exact type/color systems,
  implement usable behavior, and inspect the rendered result.
- Added interface-copy consistency, meaningful structural decoration, stronger
  restraint, and a critique of the plan before implementation.
- Redesigns establish a rendered baseline, retain recognizable brand strengths,
  and keep the actual product clear. Early slices and final comparisons check
  product recognition, credible evidence, visual craft, and usability; a cleaner
  appearance alone does not establish an upgrade.
- Added pinned routes to Anthropic Frontend Design and Vercel React performance
  guidance. Awesome Frontend Skills is a discovery index; Colabio never tries to
  install the directory itself.
- All 43 existing module routes remain available through preserved source pins.
  Image, prototype, native, style, motion, GSAP, scroll, and WebGL guidance can
  still be selected when relevant. No existing guide or resource was removed.
- GSAP, Lenis, Motion, and 3D are chosen for an actual mechanism rather than
  required as a set. Runtime packages belong in the target application.
- Big builds and substantial creative redesigns use a design council when the
  host supports delegation. A lead manages skill scouting, design, font research,
  typography, engineering, and UX critique, with an optional second craft judge.
  Contributors discuss concrete disagreements, then the lead decides one shared
  direction. Small fixes remain single-agent; host limits determine work waves.

Read the complete [standalone skill](skills/.curated/colabio-frontend/SKILL.md).
Only Colabio's own package is Markdown-only: selected upstream skills can require
their own scripts, references, or assets, and must be installed intact.

## Upgrade an existing installation

Preserve custom edits outside your assistant's scanned skill directories before
replacing an older installation. Install the new core with the command above
and verify that each installed `colabio-frontend` directory contains only
`SKILL.md`. Check project-local copies too: they can shadow user-global copies.
Refresh skill discovery or start a new session if the host does not pick up the
replacement. Existing specialists are reused rather than repeatedly upgraded.

## Preserved full bundle

The original `skills/colabio-frontend/` tree, all companion/module guides,
licenses, source pins, examples, and helper scripts remain in this repository.
Its original entrypoint is marked `metadata.internal` for Skills CLI discovery,
so the normal repository installation selects the one-file core. This CLI
metadata does not disable a full bundle already installed in Claude or Codex.

The optional `scripts/install.mjs`, shell/PowerShell wrappers, and tagged
bootstrap remain full-bundle installation routes. They do not install the new
standalone core. The original documentation is preserved in
[BUNDLE-README.md](BUNDLE-README.md); its full-bundle npm shorthand now requires
the legacy folder plus `INSTALL_INTERNAL_SKILLS=1`, or the original v1.5.0 tag.
Use the explicit standalone command above for the lighter default.

Preserving all source material keeps the repository available as a research and
offline library; the default installed payload is what becomes smaller.

## Validation

```sh
npm run build
npm run verify
npm test
npm run test:standalone
npm run test:npx
```

The standalone integration check installs the core for both agents in an isolated
temporary project and verifies an upgrade from the full bundle leaves exactly
`SKILL.md`. The existing bundle checks remain available. These checks establish
packaging behavior, not visual quality or guaranteed frontend outcomes.
