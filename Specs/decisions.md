# Decisions

| Date | Decision | Rationale | Status |
| --- | --- | --- | --- |
| 2026-09-24 | Use SDD records in `Specs/` and project rules in `.cursor/rules/`. | Makes approved scope, design rationale, and change history available before future edits. | Active |
| 2026-09-24 | Figma node `0:1` is the initial home-screen visual reference. | The supplied Figma URL points to this node and its screenshot was successfully accessed. | Active |
| 2026-09-24 | Use local `public/` assets, `background-fundo.png` as the page background, and Syne for game text. | Explicit project requirements. | Active |
| 2026-09-24 | Implement the initial page as a static, responsive App Router interface. | The approved scope is interface-only; no game behavior or navigation has been requested. | Active |
| 2026-09-24 | Scale the Figma composition proportionally to the available desktop viewport instead of rendering it at its 1280×832 reference size. | The Figma canvas is a composition reference; the intended desktop presentation is a full, viewport-sized experience. | Active |
| 2026-09-24 | Use the yellow frame embedded in each game SVG; do not add a CSS border. | Prevents the duplicated frame visible in the initial render. | Active |
| 2026-09-24 | Add separate static App Router screens for Palavra Proibida and Emoji dos Santos, linked from the home cards. | The approved request is to implement the game interfaces from Figma; no game behavior was requested. | Active |
| 2026-09-24 | Keep score, time, prompt words, and emojis as fixed reference values in the initial game screens. | Preserves Figma fidelity without implying that timer or scoring mechanics are implemented. | Active |
| 2026-09-24 | Deliver game screens in phases, beginning with Palavra Proibida. | Emoji dos Santos remains approved but is deferred until the complete Figma node can be inspected. | Active |
| 2026-09-24 | Bundle the SIL Open Font License Digital Numbers font locally for game score and timer readouts. | Preserves the Figma typography without a runtime dependency on a font CDN. | Active |
| 2026-09-24 | Use the user-provided Emoji dos Santos screenshot as the complete visual source for its screen. | The screenshot was explicitly approved after the Figma API rate limit prevented a complete node response. | Active |
| 2026-09-24 | Implement game behavior, result submission, Firebase Firestore ranking, signed QR results, and `.env.example` in the root project only. | Extends the approved visual scope into the requested event experience without modifying `desafio-crescer2`. | Active |
| 2026-09-24 | Update the active Palavra Proibida round to show the current target in the title position and only the five forbidden words in the prompt panel. | Matches the approved gameplay hierarchy from the latest screen reference. | Active |
| 2026-09-24 | Use PageUp/PageDown for correct/skip, ArrowUp/ArrowDown for selecting the two games, and the player's headset as the only speech input. | This matches the final Air Mouse G10 Pro button layout confirmed by the user. | Active |
| 2026-09-29 | Restrict the Palavra Proibida deck to widely known saints, priests, objects, and Campina Grande churches, keeping forbidden words unchanged. | The user reported the game was too hard because of obscure names; familiarity is the simplification lever. | Active |
| 2026-09-29 | Provide the printable deck as an App Router page styled for A4 print instead of adding a PDF dependency. | Browser "Save as PDF" produces the requested file without new dependencies and always reflects the current deck. | Active |
