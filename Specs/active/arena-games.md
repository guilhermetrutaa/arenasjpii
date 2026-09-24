# Arena SJPII — Game interfaces

## Status

Approved for functional implementation. Both game screens retain the approved
visual composition while runtime state, scoring, timers, randomization, and
answer validation are implemented through the behavior specification.

## Source of truth

- Figma file: `Arena SJPII` (`mgQ2VplrXbnPccEWQVxw4K`).
- Palavra Proibida screen: node `12:2`.
- Emoji dos Santos screen: node `12:22`, supplemented by the user-provided
  reference screenshot approved on 2026-09-24 because the Figma API rate limit
  prevented a complete node response. The screenshot is the visual source of
  truth for the title `EMOJIS DOS SANTOS`, emojis `😊 💐 💕`, score, and timer.
- Local assets: `public/`.
- Required background: `public/background-fundo.png`.
- Typography: game-related labels and prompts use Syne; numeric readouts use the local Digital Numbers font.

## Intended outcome

Add responsive, static interfaces for Palavra Proibida and Emoji dos Santos.
Each screen preserves the Arena visual identity and presents the game title,
the prompt panel, an initial zero score, and a 30-second reference timer as
shown in Figma.

## Acceptance criteria

- `/palavra-proibida` and `/emoji-dos-santos` render the corresponding Figma
  compositions on desktop and remain usable on smaller viewports.
- The home game cards navigate to their respective interfaces.
- Palavra Proibida shows five placeholder forbidden words in its prompt panel.
- Emoji dos Santos shows the exact title `EMOJIS DOS SANTOS` and the emojis
  `😊 💐 💕` from the approved reference screenshot.
- Both screens reuse local brand assets and `background-fundo.png`, and use
  Syne for game text. Score and timer values use Digital Numbers.
- The visual-only values remain the initial render values; runtime values are
  updated by the functional game state: score `0` and time `1:30` for Palavra
  Proibida; score `0` and time `30` for Emoji dos Santos.
- Game data, audio, recognition, and runtime interaction follow
  `arena-game-behavior.md`; no implementation changes are permitted inside
  `desafio-crescer2`.

## Open items

- A future game-behavior specification can replace the static prompt, score,
  and timer values with live state.
