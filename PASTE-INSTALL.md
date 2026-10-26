# Paste into Claude Code or Codex

Install the self-contained Colabio Frontend skill globally for my user account,
for both Claude Code and Codex. This request authorizes downloading the public
standalone folder and writing those user-level skill directories. Include its
bundled references and scripts; no other skill installation is needed.

1. Check the Skills CLI prerequisites: Node.js 22.20+ and Git. Do not request or
   print credentials. Preserve customized Colabio files outside scanned skill
   directories before replacing an existing installation.
2. Run:

   ```sh
   npx skills add https://github.com/Gouravmaurya/colabio-frontend/tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -g -y
   ```

3. Verify both installed `colabio-frontend` folders match the standalone source:
   `SKILL.md`, `references/`, and `scripts/`, including their supporting files.
   Run `npx skills list -g` and report actual paths. Inspect project-local copies
   that could shadow the new skill. Do not describe a failed install as successful.
4. Show `/colabio-frontend <task>` for Claude Code and `$colabio-frontend <task>`
   for Codex. Refresh discovery or start a new session if necessary.

This installs Colabio only. Preserve the repository's existing full bundle.
Application packages such as GSAP, Lenis, Motion, and Three.js belong locally in the target
application when needed for an authorized build. Do not install website packages
globally, add hooks, edit AGENTS.md/CLAUDE.md, or set up paid services.

For a project-only setup, omit `-g` and run from the intended project root.
