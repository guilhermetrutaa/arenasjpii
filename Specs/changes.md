# Change log

| Date | Change | Scope |
| --- | --- | --- |
| 2026-09-24 | Added the initial SDD structure, Cursor rules, and project context protocol. | Project governance only; no interface code changed. |
| 2026-09-24 | Approved implementation of the initial home interface. | Visual-only scope; functionality remains excluded. |
| 2026-09-24 | Implemented the static Arena SJPII home interface from Figma node `0:1`. | Uses supplied local SVG assets, `background-fundo.png`, and Syne for game names; no interaction was added. |
| 2026-09-24 | Scaled the desktop composition to the viewport and removed duplicate game-card borders. | Desktop view preserves the Figma aspect ratio; the embedded SVG frame is the single yellow border. |
| 2026-09-24 | Removed the CSS shadow from the game cards. | The supplied SVG assets already include the intended visual treatment. |
| 2026-09-24 | Implemented the static `/palavra-proibida` interface from Figma node `12:2` and linked its home card. | Responsive visual-only screen using local assets, Syne, and the fixed prompt, score, and timer values; Emoji dos Santos remains deferred. |
| 2026-09-24 | Applied Digital Numbers to score and timer readouts and added internal padding to the forbidden-word prompt. | Matches the Figma numeral treatment and gives the prompt text more breathing room. |
| 2026-09-24 | Increased the forbidden-word prompt height and internal padding. | Improves breathing room around the placeholder words while keeping the reference border treatment. |
| 2026-09-24 | Replaced visible game action buttons with Air Mouse G10 Pro keyboard events and automatic headset microphone activation. | `PageUp` confirms, `PageDown` skips, home volume keys select games, and Mute returns home; the Air Mouse microphone is not used. |
| 2026-09-24 | Switched Air Mouse navigation from volume keys to the directional pad. | Arrow Up/Down controls correct/skip, Arrow Right opens Palavra Proibida, Arrow Left opens Emojis dos Santos, and Mute still returns home. |
| 2026-09-24 | Switched game selection to the Air Mouse Home and Delete keys. | Home opens Palavra Proibida and Delete opens Emojis dos Santos; Arrow Up/Down remain correct/skip. |
| 2026-09-24 | Finalized Air Mouse mappings from the user's button layout. | PageUp confirms, PageDown skips, ArrowUp opens Palavra Proibida, Delete opens Emojis dos Santos, and Mute returns home. |
| 2026-09-24 | Changed the home selection for Emojis dos Santos from Delete to ArrowDown. | Keeps game selection on the directional pad: ArrowUp opens Palavra Proibida and ArrowDown opens Emojis dos Santos. |
| 2026-09-24 | Added a root-level Air Mouse listener so Mute returns home from every route. | Applies the return shortcut consistently to home, games, result, and ranking pages. |
| 2026-09-24 | Fixed the speech client token request to use the current AssemblyAI route and POST method. | Eliminates the 404 that prevented headset microphone initialization. |
| 2026-09-24 | Made automatic headset initialization restart-safe under Next.js development Strict Mode. | Prevents the first microphone session from being canceled before the browser permission prompt appears. |
| 2026-09-24 | Redesigned the result page into a compact side-by-side summary and QR layout and removed its action buttons. | Keeps the desktop result page within one viewport while preserving the Arena visual system; mobile stacks the content. |
| 2026-09-24 | Changed result cards to show ACERTOS and ERROS instead of repeating score and hits. | The score is represented by the hits value, while errors are shown explicitly. |
| 2026-09-24 | Made QR result links use the public Vercel deployment URL with `NEXT_PUBLIC_SITE_URL` override. | Ensures scanned QR codes open the production ranking page instead of the browser's local origin. |
| 2026-09-24 | Made Firebase Admin accept a Base64 private key stored in the legacy `FIREBASE_PRIVATE_KEY` variable. | Fixes ranking submission when the environment uses the generated Base64 key without renaming the existing variable. |
| 2026-09-24 | Expanded Air Mouse media-key detection to support common `VolumeUp`, `VolumeDown`, `Mute`, legacy key codes, and captured key events. | Improves G10 Pro compatibility when the browser exposes media keys under alternate event names. |
| 2026-09-24 | Added Base64 Firebase Admin private-key support through `FIREBASE_PRIVATE_KEY_BASE64` with PEM fallback and documented it in `.env.example`. | Simplifies secure multiline key configuration for local and deployment environments. |
| 2026-09-29 | Restricted the Palavra Proibida deck to widely known saints, priests, liturgical objects, and five Campina Grande churches. | Makes the Catholic-themed game easier by removing obscure names while keeping forbidden words of remaining cards unchanged. |
| 2026-09-29 | Added `/palavra-proibida/cartas` as an A4 print sheet with Arena, parish, and diocese logos. | Lets the user save the current deck as a PDF from the browser without a PDF library. |
| 2026-10-15 | Added manual scoring to `/admin` through `/api/admin/ranking`. | Lets the operator record scores tallied outside the QR flow; the amount is added to the existing total and a missing team is created on demand. |
| 2026-10-15 | Replaced the ranking write catch-all with a logged, specific failure message. | A missing or revoked Firebase Admin credential reported the same generic error as any other fault, so the ranking could not be diagnosed from the app. |
| 2026-10-15 | Made a team keep the display name it first registered with. | Typing `Paroquia Sao Jose` after `Paróquia São José` had been recorded was downgrading the public leaderboard entry to an unaccented spelling. |
| 2026-10-15 | Rejected result tokens that do not have exactly two segments. | `verifyResult` destructured the first two segments and silently ignored any extra, so a token with appended garbage passed the shape check. |
| 2026-10-15 | Stopped the Air Mouse Enter binding from firing when a button is focused. | Pressing Enter in the new ranking form would also send an `ERRO` command to the running game; the same double-fire existed on the panel action buttons. |
| 2026-10-15 | Added the missing `.env.example` and ignored Firebase service-account JSON files. | The spec already required `.env.example`, and a service-account private key was tracked in git. |
| 2026-10-16 | Rewrote the interleave in `shuffleInterleaved` to draw from the category furthest behind its own share. | One card per category per pass drained the small groups first and ended the deck on 30 consecutive saints, which the category spread is meant to prevent. |
| 2026-10-16 | Made `shuffleInterleaved` accept a subset and removed the unused `getNextCard`/`getShuffledCards` pointer helpers. | The round builder needs to shuffle only the unused cards, and a memoized pointer re-delivered the same cards right after a full cycle while keeping no memory across reloads. |
| 2026-10-16 | Added a no-repeat deck for `/palavra-proibida` backed by `src/lib/forbidden-deck.ts`. | A round is dealt only from cards a player has not faced; the cycle restarts once every card has been used. The card is the unit that does not repeat, while the five forbidden words may repeat. |
| 2026-10-16 | Added a two-press "reiniciar baralho" control and the remaining-card count to the `/admin` panel, delivered as a `resetDeck` command. | Lets the operator recover from an interrupted round, which the persistent memory would otherwise turn into permanently skipped cards. |
| 2026-10-16 | Updated the deck section of `arena-game-behavior.md` to the 128 cards now in the file. | The spec still described the 103-card deck and five churches, so it no longer described the deck the game ships. |
