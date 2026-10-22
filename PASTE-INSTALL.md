# Paste into Claude Code or Codex

Install Colabio Frontend globally for my user account, for both Claude Code and
Codex, using the official npm skills CLI. This request authorizes writing the
user-level assistant skill directories and downloading the public
Gouravmaurya/colabio-frontend bundle with its pinned supporting modules.

1. Check Node.js 22.20+ and Git. Never request or print credentials.
2. Preserve existing custom Colabio edits before replacement if applicable.
3. Run:

   `npx skills add Gouravmaurya/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -g -y`

4. Verify both assistants' installed Colabio SKILL.md, modules.json, referenced
   GUIDE.md files, scripts, and resources. Run `npx skills list -g` and report
   actual installed paths. Do not claim a failed installation worked.
5. Show usage:
   Claude Code: `/colabio-frontend <frontend task>`
   Codex: `$colabio-frontend <frontend task>`
   Start a new session if required for skill discovery.

Install only the skill bundle globally. Do not install GSAP, Lenis, Framer Motion,
Three.js, or website packages globally. During a later authorized build, Colabio
adds only needed missing runtime libraries locally in the target application,
using its package manager and lock file. Skill installation does not start a
website build, add hooks, edit AGENTS.md/CLAUDE.md, or create paid service accounts.
Follow host permission requirements. For a project-only installation, omit `-g`.
