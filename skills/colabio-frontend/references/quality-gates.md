# Evidence, performance, and release checks

For substantial work, keep a short evidence record and screenshots in the target
project's requested output folder. Small changes retain their scope. Claims about
quality, behavior, or speed must distinguish implementation, inspection, and
actual observation. Never manufacture measurements or mark unavailable checks passed.

## Component depth and rendered review

Inspect the focal component and adjoining scene before spreading the direction
across the page. Evaluate product-specific information, composition, usable states,
keyboard/touch alternatives, mobile recomposition, and honest content. Cosmetic
changes to a catalog block, a hover link, or a count of installed libraries do
not establish originality. Familiar primitives remain appropriate infrastructure.

Review the full composition and representative phone/tablet/desktop layouts.
Record each material finding with location, problem, correction, and observed
recheck. Fix findings as a batch. Compare architecture and component behavior
with earlier work; changing only colors or headings does not pass a full redesign.
Do not invent an award score or claim an independent review that did not run.

## Performance budget before adding effects

Inspect the existing build and set a task-specific budget before expensive assets,
3D, or large motion modules. Use an existing project budget when present; otherwise
record a provisional budget and its rationale rather than imposing one universal
byte limit. Separate initial JavaScript from deferred code and compare the chosen
mechanism with a simpler rendering option.

Measure available build outputs (raw and compressed bytes) and, when tooling
permits, loading and interaction behavior under recorded viewport/device/network
conditions. Name the metric, tool/method, measurement scope, and budget. A gzip
file size is not a measured loading time, Core Web Vital, or frame rate. Investigate
unexpected regressions before delivery; document justified exceptions explicitly.

Consider dynamic loading for optional Three.js/viewers, lazy offscreen media,
responsive asset resolution, on-demand rendering, capped device-pixel ratio,
font subsets, and cleanup. Verify fallback behavior instead of assuming that a
try/catch proves it. Avoid adding engines for trivial effects or removing useful
functionality merely to meet a fabricated target.

## Repeatable evidence record

Use scripts/verify-evidence.mjs to check a JSON record:

```sh
node <colabio>/scripts/verify-evidence.mjs --project <output-folder> --record evidence.json
```

The helper is read-only. It validates record structure, relative evidence files,
responsive screenshot entries, reported budget comparisons, and gate disposition.
It does not open a browser, measure performance, judge aesthetics, or verify that
written claims are true. A successful completeness check is not independent
validation. Each reported pass still requires an actual observed check.

Record schemaVersion 1, scope (substantial or small), motion and webgl booleans,
starting from [the deliberately unverified example](evidence-example.json).
Copy it into the target output folder; change states only after actual checks.
Include checks for scope, product-fit, component-depth, responsive, interaction,
accessibility, motion, performance, and webgl. Each check contains status
(pass, fail, unverified, not-applicable), a nonempty note, and evidence (relative
file paths). A pass needs at least one nonempty evidence file. Not-applicable is
allowed only for absent motion/WebGL or component-depth on a small change.
Use unverified for host/tool limitations; do not disguise them as not-applicable.

When responsive passes on substantial web work, provide viewports with at least
two distinct positive widths and screenshot paths ending in .png, .jpg, .jpeg,
or .webp. Keep viewport conditions and actual observations in the linked report.
Native targets can use equivalent screenshots and document device dimensions.

When performance passes, provide at least one measurements item with name, unit,
method, a nonnegative numeric value, and a nonnegative maximum budget. A value
above its budget prevents ready status; resolve the regression or explicitly
revise the justified budget before rerunning. Do not change budgets to conceal
failure. List unverified performance metrics in the report rather than inventing
them to satisfy this schema.

Exit codes: 0 means the submitted record is complete with all applicable checks
reported passed; 2 means failed/unverified/over-budget gates prevent ready status;
1 means invalid input. Deliver useful work with explicit limitations when a host
cannot complete a gate, rather than blocking indefinitely or claiming full readiness.

## Broader skill evaluation

Use the three briefs in evaluation-briefs.md when evaluating a workflow release,
not for every user project. Evaluate structure, component specificity, font/color
fit, working controls, responsive behavior, OS reduced-motion changes, and recovery
including WebGL failure when used. Preserve screenshot/evidence records separately
per brief and version. Installer/unit tests do not count as rendered brief results.
Label a release's cross-brief visual evaluation incomplete until those runs exist.
