# Design defaults and learning from feedback

Read this before intake for a new build or redesign, and when handling design
feedback. This is design preference memory, not model retraining or permission
to modify the skill's own instructions after each project.

## Landing-page default

Unless the current request specifies otherwise, every landing page starts with
a premium, expressive, cinematic direction: deliberate type hierarchy, a
product-specific palette, strong imagery or a relevant rendered scene, distinctive
component anatomy and a coherent motion journey. Show what makes this subject
interesting; removing generic patterns without adding identity is insufficient.
Apply cinematic references and showpiece checks to the resulting landing page.

Develop a new concept for each product. Do not copy Altitude's aircraft, boarding
pass, orange palette, Barlow font or section order into unrelated projects.
User-approved examples inform the craft bar, not a template for every business.
Preserve existing brands and approved regions. Explicit minimal, quiet, static
or other style requests override this default; reduced-motion visitors always
receive a complete usable composition. Dashboards and operational UI retain
task-appropriate density and motion. Small fixes do not trigger a redesign.

## One shared preference file

Resolve `~/.colabio/frontend-preferences.md` from the current user's home directory,
not the project or skill root. Codex and Claude running as that user read the
same file. Read it before recommending a direction, reuse settled preferences,
and include only relevant preferences in delegated task packets and the brief.
Precedence: current explicit request and project/brand constraints, then applicable
saved preferences, then skill defaults. A project-specific exception does not
silently replace a global preference.

If the file is absent, continue with the skill defaults. Create it when there is
actual feedback to remember and writes are allowed. If home storage is unavailable
or a write needs approval, complete independent design work, preserve a proposed
update in the permitted project output and state that cross-session persistence
has not happened. Never claim memory was saved when only the current chat changed.
Do not change permissions, guess a cloud-sync service or put personal preferences
in distributed skill/library assets to bypass unavailable user storage.

Keep a small human-editable Markdown file with:

- **Confirmed preferences:** likes/dislikes with their scope (global, landing
  pages or a named project), evidence and the latest feedback date.
- **Approved examples:** project reference, what the user actually approved and
  what remains unknown about individual choices.
- **Superseded preferences:** a short note only when needed to explain a reversal.

No fixed schema, parser or tracking service is needed. Record design facts and
short feedback paraphrases, not a full conversation log or unrelated personal data.
Keep private local paths out of public page copy and shared deployment artifacts.

## Learn accurately

When the user gives meaningful approval, rejection, correction or an explicit
"remember this", the coordinator updates the relevant entry. Do not ask for a
rating after every build or add a new approval step. Read the latest file before
writing; merge changes, preserve unrelated preferences and use one writer.

- A specific like or dislike becomes a scoped preference. "I like this font for
  my aviation site" does not make that font mandatory everywhere.
- General praise such as "nice, good work" approves the overall example. It does
  not prove the user singled out every colour, font, component or animation.
  Identify the project from actual workspace/conversation evidence. If it remains
  unknown, retain approval in task context without inventing a saved reference
  or interrupting the user only to complete a memory entry.
- An initial project's style instruction belongs in its brief; it does not by
  itself create a lasting preference. Save confirmed feedback, explicit requests
  to remember, and preferences the user clearly extends beyond the current task.
- One rejection is evidence for that context, not a universal ban. For ambiguous
  feedback, use project context and clarify only if different interpretations
  would lead to materially different work; do not store a guessed dislike as fact.
- A clear new global preference replaces a conflicting old one. Keep its source
  date and scope; do not accumulate incompatible instructions indefinitely.
- If the user edits, removes or asks to forget an entry, respect that change.
  Do not recreate removed entries from old chats unless they explicitly re-enable them.

## Apply and close the loop

Explain only consequential personalization in the brief recommendation, then build.
Record applied preferences and any deliberate current-request overrides in the
project brief. Revise the page and recheck affected states when feedback requests
a change; a memory update alone does not complete a requested design correction.
At delivery, mention a saved preference only when it adds useful information.
Keep the profile compact by merging duplicates while retaining meaningful scope
and evidence. Learning changes future design decisions, not unrequested software,
model weights, accounts or application configuration.
