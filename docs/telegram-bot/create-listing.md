# Telegram bot — Create Listing hand-off

> **Current behavior:** listing creation happens in the Web Mini App. The bot intentionally does not host a category-by-category listing form.

## Entry point

The Main Menu's **Create Listing** button is rendered as a Telegram Mini App/web-app or URL button when the Mini App entry can be resolved. Telegram opens the Web app client-side; no bot callback is required for the normal path.

The Mini App entry uses the configured create-listing start parameter. Once in the Mini App, the Post chooser routes to the selected live journey:

- Housing → `/housing/new`
- Cargo → `/passenger-cargo/new`
- Jobs → `/jobs/new`

## Fallback and stale keyboards

- If the Mini App is not configured/reachable, the bot renders a callback that leads to an unavailable message and a Back button.
- If the bot receives an old `menu:create_listing` callback from a keyboard created before the Mini App was configured, it resolves the current Mini App entry and offers the working link.
- The normal create flow is not an in-chat wizard; screenshots of older category/type/city prompts should not be used as the current implementation specification.

## Why the hand-off matters

Each live journey owns its own create form and category schema. Housing has a structured wizard and photos; Cargo and Jobs use short single-screen forms. The Mini App performs server-backed validation, configured pricing, duplicate detection and the shared listing lifecycle.

## Related pages

- [Mini App overview](../mini-app/overview.md)
- [Housing](../mini-app/housing.md) · [Cargo](../mini-app/cargo.md) · [Jobs](../mini-app/jobs.md)
