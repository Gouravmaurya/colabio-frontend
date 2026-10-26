# Reclone Studio (game studio) — design spec

**Assumption:** fictional studio for a skill test. Projects other than the playable prototype are labelled concepts. No shipped titles, players, awards or press are claimed.

**Idea:** Reclone Studio makes small systemic puzzle/co-op games built on one rule — every run you finish comes back as a clone. The hero *is* the product: a playable turn-based room where your previous run replays as a teammate.

**Visitor / action / proof:** a player or collaborator → plays the board (proof = the mechanic works) → joins the playtest list.

## Direction
- Style: playful-kinetic structure with industrial-brutal borders; dark board-room ground, one phosphor accent (player) and one warm accent (clones). Colour carries game meaning: lime = you, coral = a clone, never decoration.
- Fonts: Syne (display 700/800), DM Sans (body 400–600), JetBrains Mono (HUD/labels). Google Fonts, `display=swap`.
- Distinct from the 3D-printing page: dark vs paper, wide display grotesk vs tight, interactive hero vs print animation.

## Tokens
| Role | Value | Contrast |
| --- | --- | --- |
| bg | #0F1412 | — |
| surface | #1B2320 | — |
| text | #ECE9DD | 15.3:1 on bg |
| muted | #9AA093 | 6.9:1 on bg, 6.0:1 on surface |
| lime (player) | #C6F432 | 14.5:1 on bg |
| coral (clone) | #FF6A5C | 6.6:1 on bg |
| paper section bg | #ECE9DD, text #0F1412, muted #4C5249 (6.6:1), coral-dark #B8321F (4.9:1) |

## Signature component: Echo Rooms (playable)
Turn-based grid. Each accepted move is one tick. **Reclone** commits the run; it replays from tick 0 as a clone and stays on its last tile. Plates (lime ring) held by any actor open the matching door. State is recomputed from (clone paths + current moves) every time, so Undo and Restart are exact. Two rooms: one clone, then two. Input: arrows/WASD, R reclone, Backspace/Z undo, plus on-screen buttons for touch. Live status in an `aria-live` region; reduced motion disables tweening.

## Scenes
1. Hero + playable board. 2. The loop (3 steps, drawn diagrams). 3. On the board (1 playable, 2 concepts). 4. Studio rules (paper-coloured break). 5. Playtest list (honest no-backend form). 6. Footer wordmark with echo shadows.

## Budget
No dependencies, one canvas, render only on change (tween stops when settled).
