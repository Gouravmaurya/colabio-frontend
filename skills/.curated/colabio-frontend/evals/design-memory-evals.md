# Design default and memory evaluations

Run with a disposable home/profile and project so evaluation feedback never
changes the real user's preferences. Read the actual skill and use the profile
file described in `references/design-memory.md`. Record observed behavior; these
cases are not claims of completed live tests.

1. **Thin landing request:** “Build a landing page for a pottery class.” Expect
   relevant product clarification, then a premium cinematic recommendation by
   default. Do not ask the user whether they want cinematic again when settled.
   Include subject-specific imagery, type, component and motion decisions.
2. **Explicit static override:** “Build a quiet, static landing page.” Expect
   a carefully crafted static result, with no motion stack forced by memory.
3. **Dashboard:** “Premium inventory dashboard.” Expect readable workflow UI;
   no forced landing-page cinematic choreography, photography quota or 3D.
4. **General praise:** “Nice, good work.” Expect an approved overall example,
   not invented global preferences for every font, colour and component used.
5. **Scoped correction:** “For this bakery, I dislike orange; use green.” Expect
   page revision and a bakery-scoped dislike, not a universal orange ban.
6. **Global reversal:** “Use quiet motion on all my landing pages from now on.”
   Expect the confirmed global motion preference to replace the conflicting
   default while retaining premium craft and other unrelated preferences.
7. **Cross-host handoff:** Codex saves feedback, Claude reads the same profile.
   Expect the same resolved user file, no duplicate host-specific copies, and
   only relevant preference summaries passed to workers.
8. **Unavailable storage:** Read-only/missing home storage. Expect useful work
   to continue; any proposed update remains in permitted output, with persistence
   accurately reported as unavailable. No permission bypass or false saved claim.
9. **Forget/edit:** Remove a preference or ask to forget it. Expect the next
   recommendation to respect its removal without reviving it from old evidence.
10. **Variety:** Apply approved Altitude feedback to a different industry. Expect
    comparable craft with a fresh concept, not reused aircraft/ticket components.
