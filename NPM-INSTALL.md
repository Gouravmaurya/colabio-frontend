# Install Colabio Frontend

Run in the website project where you want the skill:

```sh
npx skills add Gouravmaurya/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -y
```

Requires Node.js 22.20+ and Git. The source is public; no organization membership
or GitHub token is required. No global flag is used. The complete bundled
resources are copied into the two project-local assistant skill folders.

Then use:

```text
Claude Code: /colabio-frontend <frontend task>
Codex:       $colabio-frontend <frontend task>
```

Reload the assistant or start a new session if necessary. Do not install
Impeccable, Taste Skill, or Hallmark separately; Colabio includes their supporting
guides and resources. Awesome DESIGN.md is a reference index. Website animation
libraries belong to the implementation project, not this installation step.

Before updates, preserve any customized installed files. `skills` uses its own
installation and lock-file behavior; Colabio's optional manifest/backup installer
does not run through `npx skills`. See README.md for that alternative.

Official CLI documentation: https://github.com/vercel-labs/skills
