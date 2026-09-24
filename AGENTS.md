<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Context Protocol

Before making any future project change, read the applicable rules in
`.cursor/rules/` and the relevant documents in `Specs/`. Treat the Specs as the
source of truth for approved scope, design decisions, and the change history.

Required workflow:

1. Read `.cursor/rules/00-project-workflow.mdc` first, then all rules relevant
   to the requested change.
2. Read `Specs/README.md`, the applicable active specification, and the
   decision/change records it links to.
3. Update or create the relevant specification before implementing a change
   that alters approved behavior, UI, architecture, or dependencies.
4. Record the completed change in `Specs/changes.md` and any durable rationale
   in `Specs/decisions.md`.

Do not implement work that conflicts with an approved Spec without obtaining
explicit user direction and documenting the revised decision.
