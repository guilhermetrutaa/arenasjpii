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

## Emoji dos Santos speech feedback

- While a round is running, every finalized speech utterance that does not
  score a hit shows a transient phrase at the bottom of the screen.
- `Errado` is shown when the utterance does not reach half of the displayed
  saint's name.
- `Quase` is shown when the utterance contains at least half of the name's
  content words, in order, without completing a scoreable name.
- Feedback is evaluated only on finalized utterances, never on interim
  transcripts, and clears 1.2 seconds after the last finalized utterance.
- The phrase is rendered centered in the flow directly below the speech status
  line, in the local `public/fonts/Spud AF Crisp W00 Regular.ttf` typeface with
  no background or entrance animation. This is a deliberate departure from the
  Syne game typography recorded in `arena-games.md`.
- Feedback is display-only: it never scores, faults, or skips a round. Only a
  confirmed hit advances the round.

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
- A team keeps the display name it first registered with. A later submission
  that resolves to the same team must not overwrite the leaderboard spelling.
- Result tokens are validated server-side, expire, are single-use, and are safe
  against client score editing.

## Admin manual scoring

- The `/admin` panel gains a ranking section so an operator can record scores
  taken outside the QR flow, for example from a WhatsApp tally.
- The operator types a team name and an integer amount of points. The amount is
  **added** to the team's `totalScore` and `totalGames`, never replaced.
- A team name that normalizes to an existing team resolves to that team, so the
  operator never creates a duplicate. A name that does not exist creates the
  team with `totalScore` equal to the amount and `totalGames` equal to one.
- Negative amounts are accepted so the operator can reverse a mistake recorded
  with the wrong value. The resulting `totalScore` may fall to zero but is never
  allowed below zero.
- Each manual entry writes an audit record to `gameResults` with `game:
  "manual"` and `source: "admin"`, so adjustments stay traceable.
- Manual entries carry a client-generated `operationId` and are idempotent: a
  repeated submission of the same id is rejected instead of scored twice.
- `/admin` and its ranking endpoint remain unauthenticated by explicit user
  decision; the panel is expected to be used only on the venue network.

## Firebase

- Firestore stores teams, game results, and event configuration.
- The browser may read the public ranking through Firebase Web SDK.
- Writes and ranking updates go through Next.js route handlers using Firebase
  Admin; the client must not write scores directly.
- The root project must provide `.env.example`; no secret values are committed.
- Ranking write routes must log the underlying failure server-side and return a
  specific, actionable message. A missing or revoked Firebase Admin credential
  must be reported as such instead of being collapsed into a generic failure.
- The admin ranking endpoint exposes a read-only status flag indicating whether
  Firebase Admin credentials are usable, so the panel can warn the operator
  before they start typing scores.

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
- Admin manual scoring adds to existing totals, creates missing teams, and is
  idempotent per operation.
- `.env.example` documents Firebase, Firebase Admin, AssemblyAI, and signing
  configuration without secrets.
- Root lint, typecheck, and build pass without including the nested reference
  project.
