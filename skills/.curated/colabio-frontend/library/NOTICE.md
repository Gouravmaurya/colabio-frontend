# Third-party notices for `library/`

The files under `library/` are reviewed upstream guidance bundled so this skill is one
self-contained package. Each upstream folder keeps its own license file. Upstream entry
files named `SKILL.md` were renamed `GUIDE.md` so they are not discovered as separate
skills. Files are copied without substantive edits; launcher binaries, demo sites, large
data catalogues, fonts and icon sets were left out to keep the package small. Exact
commits and source paths are recorded in `sources.lock.json` at the repository root.
Preserve these notices when redistributing.

| Folder | Source | Repository | License | License file |
| --- | --- | --- | --- | --- |
| `library/impeccable/` | Impeccable | https://github.com/pbakaus/impeccable | Apache-2.0 | `library/impeccable/LICENSE` |
| `library/hallmark/` | Hallmark | https://github.com/Nutlope/hallmark | MIT | `library/hallmark/LICENSE` |
| `library/taste/` | Taste Skill | https://github.com/Leonxlnx/taste-skill | MIT | `library/taste/LICENSE` |
| `library/design-data/` | UI/UX Pro Max (data subset) | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | MIT | `library/design-data/LICENSE` |
| `library/modules/animate/` | animate | https://github.com/emilkowalski/skills | MIT | `library/modules/animate/LICENSE` |
| `library/modules/animation-vocabulary/` | animation-vocabulary | https://github.com/emilkowalski/skills | MIT | `library/modules/animation-vocabulary/LICENSE` |
| `library/modules/apple-design/` | apple-design | https://github.com/emilkowalski/skills | MIT | `library/modules/apple-design/LICENSE` |
| `library/modules/brandkit/` | brandkit | https://github.com/Leonxlnx/imagegen-skills | MIT | `library/modules/brandkit/LICENSE` |
| `library/modules/design-motion-principles/` | design-motion-principles | https://github.com/kylezantos/design-motion-principles | MIT | `library/modules/design-motion-principles/LICENSE` |
| `library/modules/emil-design-eng/` | emil-design-eng | https://github.com/emilkowalski/skills | MIT | `library/modules/emil-design-eng/LICENSE` |
| `library/modules/find-animation-opportunities/` | find-animation-opportunities | https://github.com/emilkowalski/skills | MIT | `library/modules/find-animation-opportunities/LICENSE` |
| `library/modules/framer-motion/` | framer-motion | https://github.com/mindrally/skills | Apache-2.0 | `library/modules/framer-motion/LICENSE` |
| `library/modules/gpt-taste/` | gpt-taste | https://github.com/Leonxlnx/taste-skill-classics | MIT | `library/modules/gpt-taste/LICENSE` |
| `library/modules/gsap-core/` | gsap-core | https://github.com/greensock/gsap-skills | MIT | `library/modules/gsap-core/LICENSE` |
| `library/modules/gsap-frameworks/` | gsap-frameworks | https://github.com/greensock/gsap-skills | MIT | `library/modules/gsap-frameworks/LICENSE` |
| `library/modules/gsap-performance/` | gsap-performance | https://github.com/greensock/gsap-skills | MIT | `library/modules/gsap-performance/LICENSE` |
| `library/modules/gsap-plugins/` | gsap-plugins | https://github.com/greensock/gsap-skills | MIT | `library/modules/gsap-plugins/LICENSE` |
| `library/modules/gsap-react/` | gsap-react | https://github.com/greensock/gsap-skills | MIT | `library/modules/gsap-react/LICENSE` |
| `library/modules/gsap-scrolltrigger/` | gsap-scrolltrigger | https://github.com/greensock/gsap-skills | MIT | `library/modules/gsap-scrolltrigger/LICENSE` |
| `library/modules/gsap-timeline/` | gsap-timeline | https://github.com/greensock/gsap-skills | MIT | `library/modules/gsap-timeline/LICENSE` |
| `library/modules/gsap-utils/` | gsap-utils | https://github.com/greensock/gsap-skills | MIT | `library/modules/gsap-utils/LICENSE` |
| `library/modules/high-end-visual-design/` | high-end-visual-design | https://github.com/Leonxlnx/taste-skill-classics | MIT | `library/modules/high-end-visual-design/LICENSE` |
| `library/modules/image-to-code/` | image-to-code | https://github.com/Leonxlnx/imagegen-skills | MIT | `library/modules/image-to-code/LICENSE` |
| `library/modules/imagegen-frontend-web/` | imagegen-frontend-web | https://github.com/Leonxlnx/imagegen-skills | MIT | `library/modules/imagegen-frontend-web/LICENSE` |
| `library/modules/improve-animations/` | improve-animations | https://github.com/emilkowalski/skills | MIT | `library/modules/improve-animations/LICENSE` |
| `library/modules/industrial-brutalist-ui/` | industrial-brutalist-ui | https://github.com/Leonxlnx/taste-skill-classics | MIT | `library/modules/industrial-brutalist-ui/LICENSE` |
| `library/modules/minimalist-ui/` | minimalist-ui | https://github.com/Leonxlnx/taste-skill-classics | MIT | `library/modules/minimalist-ui/LICENSE` |
| `library/modules/mobile-native/` | mobile-native | https://github.com/emilkowalski/skills | MIT | `library/modules/mobile-native/LICENSE` |
| `library/modules/motion-dev-animations/` | motion-dev-animations | https://github.com/199-biotechnologies/motion-dev-animations-skill | MIT | `library/modules/motion-dev-animations/LICENSE` |
| `library/modules/prototype/` | prototype | https://github.com/emilkowalski/skills | MIT | `library/modules/prototype/LICENSE` |
| `library/modules/review-animations/` | review-animations | https://github.com/emilkowalski/skills | MIT | `library/modules/review-animations/LICENSE` |
| `library/modules/scroll-craft/` | scroll-craft | https://github.com/nateherkai/scroll-craft | MIT | `library/modules/scroll-craft/LICENSE` |
| `library/modules/stitch-design-taste/` | stitch-design-taste | https://github.com/Leonxlnx/taste-skill-classics | MIT | `library/modules/stitch-design-taste/LICENSE` |
| `library/modules/threejs-webgl/` | threejs-webgl | https://github.com/Emmraan/agent-skills | MIT | `library/modules/threejs-webgl/LICENSE` |

Impeccable is Apache-2.0: its LICENSE and NOTICE.md are kept in `library/impeccable/`,
and its files are unmodified apart from the entry rename. "Impeccable" is the name of the
upstream project; this skill is not endorsed by its authors.

Link repairs: relative links to `site/css/tokens.css` and `docs/recipes.md` inside `library/hallmark/` were rewritten to the bundled paths (8 links). No other upstream text was changed.
