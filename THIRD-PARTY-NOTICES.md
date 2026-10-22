# Third-party notices

Colabio's coordinator and installers are distributed by Gouravmaurya. The bundled
upstream files remain under their respective licenses and copyright notices.
The exact commit, repository, and source path are recorded in sources.lock.json.

| Package | Author / source | License | Bundled notice |
| --- | --- | --- | --- |
| Taste Skill | Leonxlnx/taste-skill | MIT | skills/colabio-frontend/companions/taste/LICENSE |
| Hallmark | Nutlope/hallmark / Together AI | MIT | skills/colabio-frontend/companions/hallmark/LICENSE |
| Impeccable | pbakaus/impeccable | Apache-2.0 | skills/colabio-frontend/companions/impeccable/LICENSE |

All root upstream LICENSE, NOTICE, and COPYING files present at the pinned commit
are retained alongside each companion. Upstream skill files and scripts are copied
without substantive edits. Companion SKILL.md entrypoints are renamed GUIDE.md
to prevent independent discovery. Two Hallmark documentation files have relative-link repairs;
their original and bundled hashes are recorded in sources.lock.json. Colabio's
adapters are separate files. Scripts are included, not automatically
executed. No optional third-party engine binary is included in this bundle.

Awesome DESIGN.md (VoltAgent/awesome-design-md, MIT) is linked as a discovery
index; its collection is not vendored. External analyses and assets may have
different terms. Preserve attribution and verify rights when reusing material.
