# Impeccable bridge: a second opinion, not a second workflow

[Impeccable](https://github.com/pbakaus/impeccable) (Paul Bakaus, Apache-2.0) is a
design skill with a deterministic anti-pattern detector (62 rules, no LLM, no API
key) and evaluation and refinement playbooks: `critique`, `audit`, `polish`,
`distill`, `bolder`, `quieter`, `harden`, `typeset`, `layout`, `animate`, `colorize`.
Colabio does not vendor or require it. When it is installed (the finish gate looks
in `~/.claude/skills/impeccable`, `~/.agents/skills/impeccable` and the project's
`.claude/skills` and `.agents/skills`), use it for what it is best at.

## Division of labour

| Colabio | Impeccable |
| --- | --- |
| Idea to brief: understanding sheet, scene plan, domain-grounded theme, build selector | Evaluation and refinement of an existing surface |
| One-pass build with starters, motion recipes, rendered gates | `critique` (heuristic scoring), `audit` (a11y, performance, responsive), `polish`, `harden` |
| Palette lab, template-tell scan, finish gate | Detector: contrast, layout-property transitions, undersized text, cramped padding, thin border + wide shadow, numbered section labels, stripes, overused fonts |

Do not run both full workflows on one task. Call specific parts: the detector at the
end of a build, a playbook when the user asks to critique, audit or polish.

## When to use it

1. **End of every build (automatic):** `node scripts/finish-gate.mjs <site>` runs the
   detector if present and lists the rules that fired. For locations run it directly:
   `<impeccable>/scripts/impeccable detect <file-or-dir-or-url>`.
   Fix or justify each finding. `low-contrast`, `layout-transition`,
   `undersized-ui-text` and `cramped-padding` are almost always real; judge advisory
   items (a deliberate barcode or grain overlay can trip `repeating-stripes` and
   `buried-raster`).
2. **User asks to critique, audit, polish, harden, typeset or fix the layout of
   something already built:** read the matching `reference/<command>.md` in the
   Impeccable skill folder and apply it to that surface instead of improvising.
3. **A build feels timid:** its `bolder` playbook; **too loud:** `quieter`.

## Rules of engagement

- The user's brief and brand win over any detector or playbook preference.
- Colabio's anti-clone, understanding-first and rendered-gate rules still apply.
- Impeccable's `PRODUCT.md` / `DESIGN.md` context files are fine to read or create in
  the project when the user uses it; Colabio's `design-brief.md` stays the source for
  the pipeline.
- If Impeccable is missing, say the second opinion was skipped; do not install it
  without the user's say-so (`npx impeccable install` is their choice). Keep working
  with `slop-lint.mjs`, `palette-lab.mjs --check` and `check-contrast.mjs`.
- Record in the delivery notes which detector rules fired, which were fixed and which
  were deliberately kept, with the reason.

## Worked example

The Selvage garment landing (a cotton ground with a dark order scene) passed all
three Colabio scanners and still had 40+ detector hits: muted text at 4.4:1 on a
deeper cotton section, `transition: padding/width` on hover and the schedule bars,
functional labels under 11px, numbered section kickers, and a 1px border with a wide
shadow. Fixing them (token tweak, transform-based motion, 12px floor, plain kickers,
tighter shadow) removed most of them in one pass.
