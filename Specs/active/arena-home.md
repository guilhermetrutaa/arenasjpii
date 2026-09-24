# Arena SJPII — Home interface

## Status

Approved for visual-only implementation. No application behavior, navigation,
or game functionality is in scope.

## Source of truth

- Figma file: `Arena SJPII` (`mgQ2VplrXbnPccEWQVxw4K`), node `0:1`.
- Local assets: `public/`.
- Required background: `public/background-fundo.png`.
- Typography: game-related text uses Syne.

## Intended outcome

Implement the screen represented by the approved Figma node as a responsive
Next.js home interface, using the supplied local assets and preserving the
visual hierarchy of the design.

## Acceptance criteria

- The page uses the supplied background image.
- Local visual assets are reused where represented in the Figma reference.
- Text related to games renders in Syne.
- The desktop composition scales to fill the available desktop viewport while
  preserving the Figma layout ratio.
- Each game card has a single yellow frame, supplied by its local image asset.
- The result remains responsive and passes the project checks.

## Open items

- Verify the rendered desktop interface against Figma after implementation.
