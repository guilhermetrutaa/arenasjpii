# Arena SJPII — Comportamento dos jogos e ranking

## Status

Approved for implementation in the root `arenasjpii` project. The `desafio-crescer2`
folder remains reference-only and must not be modified.

## Games

- `/palavra-proibida`: 90-second game, five forbidden words per card, score only
  for confirmed hits, automatic fault on forbidden speech, and Air Mouse control.
- `/emoji-dos-santos`: eight rounds of 30 seconds, three emojis per saint,
  speech detection with Air Mouse confirmation, timeout/manual skip.
- Game values must be rendered by the client game state; the static placeholder
  values in the visual reference are not the final runtime values.

## Palavra Proibida deck

- The deck in `src/data/forbidden-cards.ts` favors widely known names so the
  game stays accessible to a general Catholic audience.
- Saints: only popular saints, Marian titles, archangels, and apostles; obscure
  saints (e.g. São Frutuoso, São Guido, São Policarpo, Santo Hilário) are
  excluded.
- Priests and religious: nationally known priests plus the local references
  Dom Dulcênio, Padre Nilson Nunes, and Padre Rodolfo Lucena.
- Liturgical objects: only commonly known items (Bíblia, Hóstia, Altar,
  Cálice, Sacrário, Rosário, Pia Batismal, Ostensório).
- Churches of Campina Grande: Catedral de Nossa Senhora da Conceição, Igreja
  de São José, Igreja de Nossa Senhora do Rosário, Paróquia São João Paulo II,
  and Paróquia Nossa Senhora de Fátima.
- Forbidden words of the remaining cards are unchanged.

## Printable card sheet

- `/palavra-proibida/cartas` renders every card of the deck on A4 pages for
  printing or "Save as PDF".
- The cover shows the Arena logo, the São João Paulo II and Diocese crests,
  the title `PALAVRA PROIBIDA`, the rules, and the card count per category.
- Cards are grouped by category, each group starting on a new page; each card
  shows its target word, the five forbidden words, and the Arena branding.
- The layout must remain legible without printed background graphics.

## Air Mouse and headset controls

- The on-screen action buttons are removed from both games.
- `PageUp` confirms a correct answer; `PageDown` skips the current round.
- The microphone is the player's headset, not the Air Mouse, and is used only
  for forbidden-word or saint-name speech detection.
- On the home screen, `ArrowUp` selects `/palavra-proibida` and `ArrowDown`
  selects `/emoji-dos-santos`.
- `AudioVolumeMute` returns to `/` from every page through a global root
  listener; it is not limited to the game routes.
- Keyboard handlers ignore editable elements and prevent repeated transitions
  while a round is locked.

## Result and ranking

- `/resultado` shows the completed game summary and a QR code containing a
  server-signed result submission token.
- `/ranking` is public and reads the event ranking from Firebase Firestore.
- Opening the QR code presents the pending result and a team-name form.
- A team may submit a result every time a game is finished; there is no daily
  submission limit. All submitted scores accumulate for the event.
- Team names are normalized by case, accents, punctuation, and repeated or
  edge whitespace. A normalized name identifies the existing team and never
  creates a duplicate.
- Result tokens are validated server-side, expire, are single-use, and are safe
  against client score editing.

## Firebase

- Firestore stores teams, game results, and event configuration.
- The browser may read the public ranking through Firebase Web SDK.
- Writes and ranking updates go through Next.js route handlers using Firebase
  Admin; the client must not write scores directly.
- The root project must provide `.env.example`; no secret values are committed.

## Speech

- Use the existing AssemblyAI/RNNoise approach as a reference, but isolate it
  behind a client speech adapter with explicit permission, connection, retry,
  and cleanup states.
- The server keeps `ASSEMBLYAI_API_KEY` private.
- Manual controls remain available if speech is unavailable.

## Acceptance

- Both games have real timers, scoring, rounds, feedback, reset, and Air Mouse
  controls; the headset is the speech input.
- The result page and ranking page follow the Arena SJPII visual system.
- Firestore ranking updates are validated and idempotent.
- `.env.example` documents Firebase, Firebase Admin, AssemblyAI, and signing
  configuration without secrets.
- Root lint, typecheck, and build pass without including the nested reference
  project.
