# Paste into Claude Code or Codex with your project open

Install Colabio Frontend in the current project using the official npm skills
CLI. This request authorizes downloading the public Gouravmaurya/colabio-frontend
repository and installing its complete Colabio skill, including the bundled
Impeccable, Taste Skill, and Hallmark supporting guides.

1. Identify the current project folder. Ask only if no single project is clear.
2. Check Node.js 22.20+ and Git. Do not install anything globally or request tokens.
3. Preserve any existing custom edits before replacing an installed Colabio skill.
4. Run this from the project folder:

   `npx skills add Gouravmaurya/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -y`

5. Verify both `.agents/skills/colabio-frontend/SKILL.md` and
   `.claude/skills/colabio-frontend/SKILL.md`, their referenced companion GUIDE.md
   files, and the required references/scripts exist. Run `npx skills list` to
   confirm discovery. Report actual results; never claim a failed install worked.
6. Show usage:
   Claude Code: `/colabio-frontend <frontend task>`
   Codex: `$colabio-frontend <frontend task>`
   Start a new session if the host needs to refresh its skill catalog.

Use the user's project only. Do not add a global flag, change AGENTS.md/CLAUDE.md,
install website dependencies, add hooks, deploy, or start building the website
during installation. Follow host permissions. The repository is public; GitHub
organization membership is not required. The npm CLI performs its own install;
it does not invoke Colabio's optional custom backup/checksum installer.
