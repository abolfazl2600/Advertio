# Mini App — current implementation

> **Reviewed:** 2026-10-20. Describes the code merged to GitLab `master`; Production deployment was not independently checked.

## 1. Live journeys and URL structure

The Web app uses a journey registry. The only journeys registered as live are:

| Display label | Backend slug | Scope |
|---|---|---|
| Housing | `housing` | Canadian rental and roommate listings |
| Cargo | `passenger-cargo` | Traveller/sender route listings |
| Jobs | `jobs` | Canadian hiring and job-seeker listings |

Public journey URLs use the slug at the root (for example, `/housing`, `/passenger-cargo`, `/jobs`). Create forms are reached at the journey's `/new` route and listing details use the listing ID under that journey. Do not rename `passenger-cargo` to `cargo` in backend routes: Cargo is the display label, while `passenger-cargo` is the canonical slug.

Services and Social have backend category definitions, but are deliberately absent from the live Web journey registry. Their presence in the category schema must not be described as a live Web journey.

## 2. Top-level navigation

The shell provides these top-level destinations:

- **Home / Hub:** category cards for the live journeys.
- **Search:** global keyword search across listings from every live journey.
- **Post:** because three journeys are live, opens a chooser for Housing, Cargo or Jobs.
- **Saved:** saved listings across journeys; requires sign-in.
- **My listings:** the signed-in user's listings across journeys.
- **Wallet:** coin balance, top-up entry points and payment history; phone verification is required.
- **Profile:** display name, avatar, phone verification, identity verification, links to Saved/My listings and sign-out.

Category journey pages have their own header/back navigation. The shell's tab bar is not guaranteed to remain visible inside every journey route.

## 3. Browse and search

Each journey has its own feed and category-specific filters:

- Housing: listing type, location and schema-driven housing attributes.
- Cargo: traveller/sender role, origin city and destination city. Past-date trips are excluded from the feed.
- Jobs: hiring/job-seeker role, job category and Canadian city.

Global Search is separate from those feed filters. It matches keywords in listing titles and descriptions across Housing, Cargo and Jobs. Search requirements:

- Minimum query length: 2 characters.
- Maximum query length: 100 characters.
- The client commits the query after a 350 ms settle/debounce period.
- Results are paged in batches of 20.
- The committed query is stored in the URL as `?q=`; Back from a listing returns to the search.
- Loaded results are cached and the previous scroll position is restored when returning from a detail page.
- All words in the query must appear in the title or description. Search is not a semantic/AI search.

## 4. Posting and validation

- Each live journey owns its own create form. The Post chooser only routes the user to the correct form; it does not implement a shared category form.
- Housing has a structured listing wizard with schema-defined attributes and optional photos.
- Cargo and Jobs are deliberately short, single-screen forms with four required choices; optional detail fields are behind an expandable section.
- Category attribute definitions are loaded from the backend schema. Required fields, select options, conditional visibility and numeric validation are not intended to be duplicated as a second hardcoded source in the UI.
- The backend validates the category schema, location catalog, media ownership, active-listing limit, duplicate detection and configured action price.
- Current server rule: one active user-created listing per user per category. A user must close/finish the existing active listing before creating another in that category.

## 5. Shared listing detail and interactions

All three journeys reuse the shared listing layer for:

- detail loading and category-specific card rendering;
- save/unsave;
- reporting a listing;
- contact confirmation and contact unlock;
- conversation panel and message relay;
- owner actions (renew and boost where eligible);
- publisher trust display and source-aware contact behavior.

For user-created listings, the contact path may require coins according to the category policy. For crawled listings, the app never charges coins to reach the original contact; it opens the Telegram source/contact route instead. See [Shared listing interactions](./listing-interactions.md).

## 6. Authentication and trust gates

- Inside Telegram, the Mini App obtains a Telegram credential and initializes the Telegram Mini App SDK before React mounts.
- In a browser, the app can offer Telegram-based sign-in, Google sign-in when configured, or a phone-code flow delivered through the Advertio bot to an already linked Telegram identity.
- Google sign-in alone does not prove a phone number. A signed-in session without a verified phone can browse, but phone-gated actions remain blocked.
- Phone verification is the account/transacting gate for posting and other paid/owner operations.
- Identity verification is a separate paid, manually reviewed process: a verified phone and linked Telegram are prerequisites; the user sends a document and challenge video through the bot.

See [Authentication](./authentication.md) and [Profile](./profile.md).

## 7. Wallet and payments

Wallet data and payment packages are loaded from the server. Payment rails depend on context:

- Telegram Stars inside the Telegram Mini App.
- Stripe Checkout on the ordinary browser web app.
- Other/manual payment options only when configured by the server; evidence and review are handled through Telegram and the Backoffice.

The UI reads prices and packages from the server rather than calculating its own authoritative charge. Refund availability is returned per payment by the server.

## 8. Images

- Housing supports up to 10 listing photos.
- Accepted client-side file types are JPEG, PNG and WebP.
- Each file is capped at 8 MiB before upload.
- Upload happens as soon as the user selects a file, one at a time; the form publishes opaque media keys, not arbitrary image URLs.
- The backend validates and processes uploaded images and produces the public media variants.
- Avatar upload has its own 8 MiB client-side cap.

## 9. Error and empty states

The app has explicit loading, empty, retry and server-error states for listing feeds, global search, profile, wallet and detail pages. Business-rule refusals (insufficient coins, active listing already exists, a listing state that cannot be renewed/boosted) should be shown as actionable errors rather than generic retry prompts.

## 10. Not implemented / not verified

- Services and Social are not live Web journeys despite backend category seeds.
- There is no AI/semantic search.
- No multiple-active-listings-per-user support within one category.
- No dedicated Jobs `Filled` state or external apply-by-email/link flow.
- No Cargo lifecycle expiration based on the travel date; feed hiding is separate from the 30-day listing TTL.
- No claim is made here that the current GitLab revision is deployed to Production.
