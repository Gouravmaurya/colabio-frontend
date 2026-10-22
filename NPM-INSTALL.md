# Install once, use across projects

```sh
npx skills add Gouravmaurya/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -g -y
```

Requires Node.js 22.20+ and Git. This public source needs no organization access.
The `-g` flag installs the skill bundle in your user-level assistant directories.
Omit `-g` for a project-only install. Existing project-local skills can take
precedence in a host; update an old local Colabio copy when necessary.

```text
Claude Code: /colabio-frontend <frontend task>
Codex:       $colabio-frontend <frontend task>
```

Start a new session if needed. Colabio includes its pinned design, image,
prototype, motion, Scroll Craft, official GSAP, and Three.js/WebGL guides. It
selects relevant modules instead of activating every style on every task.

During implementation it installs needed missing GSAP, Lenis, and React Motion
libraries locally in the website project, respecting existing packages and its
package manager. Global skill installation does not install website libraries.

Preserve customized installed files before updates. The npm CLI handles its own
installation and lock-file behavior. The optional custom installer provides
project-local backups and byte-level manifest verification instead; it is not
run automatically by npm skills. See README.md for details.

Official CLI: https://github.com/vercel-labs/skills
