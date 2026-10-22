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
