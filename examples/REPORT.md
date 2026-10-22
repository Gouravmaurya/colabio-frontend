# Coordinated workflow validation

Run date: 2026-10-22. This report records a single implementation session, not an
independent quality evaluation or a guarantee of future output.

## Three briefs and observed behavior

| Brief | Structure and signature component | Observed checks |
| --- | --- | --- |
| Haven, property research landing page | Follow one fictional home through annotated inspection, a rental waterfall, and due diligence | Retested existing standalone implementation. Rent stress changed the illustrative monthly remainder from +$376 to +$63; reset, phone layout, and motion-off cleanup worked. No new full redesign is claimed. |
| Northline, retrofit practice | Building-section opening, practice argument, project-scope instrument, and long-life closing | Building type and priority changed the outline. Workshop/reuse and community/staged-work produced the matching content. GSAP entrance and thermal-envelope scroll sequence; Lenis is removed when motion is disabled and restored when enabled. |
| Relay, maintenance desk | Persistent workspace navigation, actionable request queue, and contextual dispatch detail | Owner assignment, resolving/reopening, counts, filters, search, empty state, reset, and keyboard Enter selection worked. Framer Motion owns detail presence. Visible keyboard focus and locally loaded Manrope confirmed. |

The cases use different page architectures and content models, rather than
three palettes applied to the same landing-page skeleton. Northline and Relay
are fictional demonstrations; no contractor or resident is contacted. They have
no production backend. Haven's scenario and photograph are illustrative.

## Companion use and decisions

- Taste Skill's bundled direction generator ran with three subject-specific
  briefs. Real-estate and architecture page candidates and support-app candidates
  were returned. The Northline photo-heavy suggestions did not match its available
  assets; the final geometric section was authored from the building-fabric idea.
  Relay adapts the framed-sheet/ledger suggestions to the request workflow.
- Impeccable's bundled context engine ran against testing/index.html. It reported
  missing PRODUCT.md and the existing implementation. No production context was
  rewritten. Its craft floor and critique guidance informed rendered review;
  the complete upstream critique command and its independent assessments were
  not executed, so no upstream critique pass is claimed.
- Hallmark's structural and interaction-state references informed the signature
  components and review. Its whole theme-selection pipeline and numeric slop-test
  score were not run or claimed. Colabio resolves aesthetic conflicts against the
  brief rather than applying every upstream ban.
- Awesome DESIGN.md's Vercel and Runway analysis pages were opened. Their visible
  summaries informed restrained hierarchy versus media-led composition. The full
  downloadable DESIGN.md contents were not available in the browser result;
  no exact font/color analysis or copied design system is claimed.

Sources and exact upstream commits are in sources.lock.json. Optional Impeccable
engine files were downloaded only into the testing project's cache, not bundled
or installed globally. Taste history is configured to a project-local path.

## Visual and runtime evidence

Local browser inspection used the host's browser tools. Observed widths included
390px for all three surfaces, 768px for Haven, 1280px for Relay, and 1440px for
Northline. The checked views had no horizontal page overflow. Desktop and phone
screenshots are in previews/. Several full-page capture attempts were unavailable;
viewport captures are provided instead. Actual interaction and DOM evidence were
used alongside the screenshots. The sampled app/service console logs had no
warnings or errors.

Manual motion controls exercised the static path and Lenis teardown. OS reduced
motion handling was inspected in source; OS-preference emulation was unavailable,
so an OS-level emulation pass is not claimed. Animation cleanup on pagehide is
implemented; repeated route mount/unmount and performance benchmarks were not
measured. No full accessibility compliance certification is claimed.

## Installer checks

The automated suite verifies both provider folders, byte-level manifests, repeat
install without timestamp changes, upgrades/backups/restoration, corrupt and
missing files, unsafe paths, rollback after provider-commit failure, global-path
rejection, symlink/junction rejection, missing Git, simulated private download/
authentication failure, real tagged local-repository bootstrap, CLI errors,
PowerShell/shell wrappers, and all relative Markdown links in the bundled skill.

All 16 installer tests passed locally, including actual PowerShell and Git Bash
wrapper installations. All seven Haven financial-model tests passed. The React
example rebuilt successfully with the pinned project-local dependencies.

The local host is Windows; Git Bash exercises the shell wrapper here. The included
GitHub Actions matrix defines Windows and Ubuntu checks. Remote CI results must
be checked after publishing; a configured workflow is not proof it has passed.
Installer authentication-failure tests simulate the failure; authenticated private
remote installation is verified separately when the release becomes available.

Haven's existing seven financial-model tests are retained. Original production
source/config/dependency fingerprints are compared before and after this work.

## Run the isolated examples

From examples/: `npm ci`, then `npm start`. The server binds 127.0.0.1:4178;
choose an unused port through PORT if necessary. Open `/`, `/northline.html`,
or `/relay.html`. Rebuild Relay after source changes with `npm run build:relay`.
Examples and their dependencies are separate from skill installation.

The Manrope and IBM Plex Mono packages include their font licenses. The Haven
illustrative property photograph comes from the existing user project; no new
third-party ownership or unrestricted redistribution right is asserted.
