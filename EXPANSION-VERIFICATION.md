# v1.5.0 verification scope

This release adds product-led design decisions, focused discovery questions, component-depth gates, original MIT-licensed local mechanism analyses, three distinct evaluation briefs, and a read-only evidence validator. The validator checks submitted records and file presence; it does not establish visual quality or independently measure reported performance.

Cross-brief rendered evaluation of v1.5.0 is not completed. The earlier LAYR v1.4.0 retest informs the original object-shop analysis, but it does not count as a new v1.5.0 run. Service and app mechanism notes are explicitly labeled design hypotheses.

Verified on 2026-10-23: all 39 automated tests passed, including new evidence-gate validation, path/symlink boundaries, CLI failure modes, and marketing/service/app routing boundaries. Official skills@1.7.4 copied all 503 skill files correctly for Claude Code and Codex in an isolated project. The deliberately unverified example returned incomplete status as expected. Relative bundle links and single-entrypoint discovery passed.

# v1.4.0 component-research verification

Verified locally on 2026-10-22 before publication.

- All 31 automated tests passed, including new Vue/Svelte versus React GSAP routing and scoped, read-only component research checks.
- The official skills@1.7.4 CLI copied all 496 skill files correctly for both Claude Code and Codex in an isolated project.
- Full React builds select shadcn/ui, Vengeance UI, and Skiper UI for research. Selection still reports not-yet-used; it does not install registry source or claim runtime use.
- The guidance now requires relevant catalog comparisons, source review of finalists, concrete omission reasons, and a product-specific working composition.
- Source pins, licenses, 43-route inventory, and dependency installation helper are unchanged. This is a skill revision, not a new rendered storefront test.

The following notes describe earlier releases.

# v1.3.0 automatic-selection verification

Verified locally on 2026-10-22 before publication.

- All 29 automated tests passed: 24 existing packaging/dependency tests plus
  five selector tests covering full React and static vanilla sites, Motion app
  reuse, native/small-review boundaries, specialist composition, and no writes.
- The official skills@1.7.4 CLI copied all 496 skill files correctly for both
  Claude Code and Codex in an isolated project.
- The new read-only selector assessed all 43 routes for the actual Haven testing
  package. Its landing/redesign profile selected 21 guidance routes and three
  UI-library candidates, retaining GSAP/Lenis/Framer Motion and omitting WebGL.
- This is a selection-plan test, not another rendered Haven rebuild or proof
  that the 21 planned guides were executed. Every route retains not-yet-used
  evidence until actual application is recorded in a frontend task.
- Existing upstream source pins, licenses, and 43-route inventory are unchanged.
  New selector and coordination instructions are original Colabio code/guidance.

The following notes describe earlier releases.

# v1.2.0 component-library integration verification

Verified locally on 2026-10-22 before publication.

- Added four original integration routes: shadcn/ui, Vengeance UI, Skiper UI,
  and Motion. Total inventory: 43 routes; total skill files: 494.
- Checked installation guidance against each library's official documentation.
  No external component source or paid collection was redistributed.
- All 24 existing automated tests passed with filesystem access required by
  installer fixtures. The restricted sandbox initially blocked rename, symlink,
  Git, and shell operations; the permitted rerun passed all checks.
- The official skills@1.7.4 CLI copied all 494 skill files into both Claude Code
  and Codex folders in an isolated project, with matching hashes.
- Verified relative links and single-entrypoint discovery. Registry integration
  is instruction-driven; no claim is made that every external component was
  installed or rendered. The runtime dependency helper remains unchanged.

The earlier toolbox verification below describes v1.1.1, not new visual testing.

# v1.1.1 toolbox verification

Verified locally on 2026-10-22 before release publication.

- All 30 user-requested unique module names resolve to bundled guides or clearly
  labeled adapters. Duplicate current Taste installations are deduplicated.
- The inventory has 39 routes: three core companions, 34 additional pinned
  modules, and two maintained/external integration adapters.
- All 24 automated tests passed, including dependency selection, package-manager
  handling, non-React behavior, failure reporting, installer rollback, backups,
  restoration, single-skill discovery, and relative Markdown links.
- The official skills@1.7.4 CLI installed every one of the 493 skill files for
  both Claude Code and Codex in an isolated project, with matching hashes.
- An isolated sample React package installed GSAP, Lenis, and Framer Motion
  successfully through the dependency helper. A second call reported unchanged
  and reused all three packages. The original website was not targeted.
- Module pinning and redistribution notices are in sources.lock.json and
  MODULE-NOTICES.md. The Vercel guideline module is an original linking adapter;
  the retired redesign module routes to maintained Taste guidance.

This verifies packaging and dependency setup, not the execution of every upstream
workflow or a new rendered site from every module. Native toolchains, image/video
generation, GPU behavior, and paid services remain host-dependent. No universal
performance or design-quality score is claimed.

The release's CI matrix additionally runs on Windows and Ubuntu. A workflow
definition is not proof of a remote run; inspect the published run before claiming
remote success. Global installation is verified separately after publishing.
