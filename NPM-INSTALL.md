# Install once, use across projects

```sh
npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -g -y
```

Requires Node.js 22.20+ and Git. The source folder contains only `SKILL.md`.
Omit `-g` for a project installation, or omit the agent you do not use.
Preserve customized installed files outside scanned skill directories before
updating. Check that each installed Colabio folder contains only `SKILL.md`.

```text
Claude Code: /colabio-frontend <frontend task>
Codex:       $colabio-frontend <frontend task>
```

Colabio's core works independently. During authorized implementation it selects
and installs missing specialist skills only when useful, reuses existing copies,
and respects the chosen scope, agents, and host permissions. Upstream skills may
include required supporting files. A review or plan does not silently install
them. Skill installation itself does not add website runtime packages.

All existing guides and the optional full-bundle installer remain in the source
repository. See [README.md](README.md) for migration and preserved-bundle details.

Official CLI: https://github.com/vercel-labs/skills
