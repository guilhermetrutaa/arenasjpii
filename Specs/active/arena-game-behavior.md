# Arena SJPII — Comportamento dos jogos e ranking

## Status

Approved for implementation in the root `arenasjpii` project. The `desafio-crescer2`
folder remains reference-only and must not be modified.

## Games

- `/palavra-proibida`: 90-second game, five forbidden words per card, score only
  for confirmed hits, automatic fault on forbidden speech, and Air Mouse control.
- `/emoji-dos-santos`: a difficulty is chosen before the match, then eight rounds
  of 30 seconds, three emojis per saint, cumulative hints at 10s and 20s,
  speech detection with Air Mouse confirmation, timeout/manual skip, and a
  point score that depends on the chosen difficulty.
- Game values must be rendered by the client game state; the static placeholder
  values in the visual reference are not the final runtime values.

## Emoji dos Santos difficulty, hints, and scoring

The player chooses one of three difficulties **before** the match, on a screen
that shows the multiplier and the promise of each level. The choice is fixed
for the eight rounds of that match and is only re-chosen for the next match.

- `Fácil` — "Comece a jogar", multiplier `×1`. Popular Brazilian saints with
  intuitive emoji sets.
- `Médio` — "Vale o dobro", multiplier `×2`. Saints of intermediate knowledge.
- `Desafio` — "Vale o triplo", multiplier `×3`. Less known saints and subtler
  emoji associations.
- Every saint in `src/data/emoji-dos-santos.ts` carries `id`, the normalized
  `name` used by the speech detector, a `displayName` for the reveal, the
  `emojis`, its `difficulty`, `hint1`, `hint2`, a short educational
  `curiosity`, and the ASR `acceptedNames`. The comments above each entry
  record why the emojis point to that saint.
- At least eight saints exist per difficulty, so a match never repeats a saint
  and is never a pure coincidence of the shuffle.

Round timeline, with `H` the elapsed seconds of the current round:

- `0 <= H < 10`: emojis only, no textual hint.
- `H >= 10` and the round is still open: `hint1` appears.
- `H >= 20` and the round is still open: `hint2` appears **in addition** to
  `hint1`; the hints are cumulative and never replace each other.
- `H >= 30` with no correct answer: the round closes as unanswered, the saint's
  name and curiosity are revealed, and the round counts as not scored.
- A correct answer stops that round's clock immediately, releases only the
  hints already shown, awards the points once, and reveals the same name and
  curiosity. Hints scheduled after that moment are never displayed.
- Hints are derived from the round clock, not from extra timers, so a round has
  exactly one interval and one reveal timeout, both cleared when the round
  changes and when the component unmounts.

Points:

- `round points = EMOJI_BASE_POINTS (1) × difficulty multiplier`, so the score
  is literally the number of correct emoji combinations multiplied by the
  level: three hits in `Médio` are worth `3 × 2 = 6` points.
- Only a correct answer scores. A wrong answer, a timeout, and an operator
  fault score zero, and no round can score twice.
- The total is the plain sum of the eight rounds: 8 (Fácil), 16 (Médio) or
  24 (Desafio) for a perfect match. The ranking keeps accumulating the score of
  every match a team plays.
- Hints never subtract points and speed never adds points.
- `/api/results` validates the emoji score against the level carried in the
  payload (`score === hits × multiplier`), and falls back to the `hits × 3`
  ceiling when the level is absent, so a tampered score is rejected either way.
  `hits` is the number of scored rounds, not the point total.

Screens:

- The pre-match screen lists the three levels with their multipliers; the
  active one is highlighted and can be chosen with a click or with the Air
  Mouse. `PageUp` starts the match, `ArrowUp`/`ArrowDown` move the selection.
- During a round the screen keeps the emojis, the 30-second clock, the running
  point total, the chosen level with its multiplier, the round counter, the
  hints already released, and the microphone status line. The scoreboard shows
  **only PONTOS and TEMPO**: the hit count is not repeated while playing.
- When a round closes, the reveal panel shows the correct name, the awarded
  points (or that no points were awarded), and the curiosity. `PageUp`
  continues to the next round immediately instead of waiting for the reveal.
- There is **no end-of-match screen inside the game**. After the eighth round
  the game keeps the last reveal on screen while it requests the signed result
  and then sends the player to `/resultado`, the QR Code screen.
- `/resultado` shows, for the emoji game, only `PONTOS` and `NÃO ACERTADAS`,
  plus the level the match was played on; "Palavra Proibida" keeps its
  `ACERTOS`/`ERROS` cards. Replaying means opening the game again, where the
  level screen starts a new match from zero.

Speech:

- Speech remains the primary answer channel, with the Air Mouse and `/admin`
  as the manual alternatives.
- A speech failure is a technical problem, not a wrong answer: it never scores,
  never advances, and never resets the round clock. It shows a friendly message
  with a control to retry the microphone.


## Palavra Proibida deck without repetition

- A round is dealt only from the cards a player has not faced yet. Nothing
  repeats until every card in the deck has been used, and the cycle then
  restarts with the whole deck available again.
- The unit that never repeats is the **card**: the target word together with its
  five forbidden words. The forbidden words themselves **may repeat** between
  cards and rounds. Two distinct cards carrying the same five forbidden words
  are expected to appear within the same cycle; they are not a repetition.
  Forbidden words are display content and speech-detection input, never a draw
  filter.
- A card counts as used as soon as it reaches the screen, so an interrupted
  round still consumes what the team actually saw. Only advancing the round,
  not finishing it, is what marks a card.
- The memory of used cards is stored in the browser under
  `arena:palavra-proibida:usadas`, so it survives navigation, reloads and a
  browser restart. Cards are identified by their category and target word, not
  by position: adding a card makes it immediately available, renaming one
  returns it to the pool, and removing one drops its leftover entry.
- Unreadable storage, an unexpected shape, and keys whose card no longer exists
  are discarded instead of breaking the round; the game falls back to dealing
  the whole deck.
- The operator can clear the memory from `/admin`, next to the running game, so
  an interrupted round does not permanently remove those cards. The panel shows
  how many cards are still available. Resetting the deck does not restart the
  round clock.
- Within a round the categories stay mixed: the deck is drawn from whichever
  category is furthest behind its own share, so the smaller groups do not drain
  early and leave a block of one category at the end.

## Palavra Proibida deck

- The deck in `src/data/forbidden-cards.ts` favors widely known names so the
  game stays accessible to a general Catholic audience.
- The deck holds 128 cards: 57 saints, 28 priests and religious, 27 liturgical
  objects and 16 churches. Every card carries exactly five forbidden words.
- Saints: only popular saints, Marian titles, archangels, and apostles; obscure
  saints (e.g. São Frutuoso, São Guido, São Policarpo, Santo Hilário) are
  excluded.
- Priests and religious: nationally known priests, the three popes, plus the
  local references Dom Dulcênio, Padre Nilson Nunes, and Padre Rodolfo Lucena.
- Liturgical objects: commonly known items of the celebration, from the
  everyday (Bíblia, Hóstia, Altar, Cálice, Rosário) to the altar linen and
  vestments (Casula, Estola, Mitra, Báculo, Corporal, Manustérgio).
- Churches of Campina Grande: the Catedral de Nossa Senhora da Conceição, the
  Igreja de São José, Igreja de Nossa Senhora do Rosário, Paróquia Nossa Senhora
  de Fátima, Paróquia São João Paulo II, Igreja de São Francisco, Santuário do
  Sagrado Coração de Jesus, Paróquia de Santo Antônio, Paróquia Nossa Senhora do
  Carmo, Paróquia da Sagrada Família, Igreja de São Vicente de Paulo, Paróquia
  de São Cristóvão, Paróquia Nossa Senhora das Graças, Paróquia Santa Rosa de
  Lima, Paróquia São João Bosco, and Santuário de Nossa Senhora da Guia.
- Forbidden words of the remaining cards are unchanged.
- Distinct cards may share the same five forbidden words, for example São João
  Paulo II and Papa São João Paulo II. This is allowed; see the no-repetition
  rule above.

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
