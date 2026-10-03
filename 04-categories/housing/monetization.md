# Housing — Monetization

> This file separates **current verified UI behavior** from older/planned product-source monetization rules because the source documents contain conflicting Early Access timing.

## Current verified Housing contact state

The reviewed 3 Oct 2026 Housing listing detail shows:

- `Contact via Telegram`
- `No coins charged`
- `Open in Telegram`

This confirms that at least the reviewed current Housing contact flow can be free and open an external Telegram contact.

The current screenshot does not visibly identify the supply-source badge in the captured area, so the category documentation does not infer the record source solely from this UI.

## Crawled Housing rule

The canonical product rules explicitly define crawled listings as:

- free listings;
- Advertio monetization disabled;
- contact redirected to the Telegram advertiser;
- internal chat disabled;
- review disabled;
- escrow disabled.

This is consistent with the current free Telegram-contact UI.

## Native Housing monetization — source conflict

The existing product documents define two incompatible lifecycle models.

### Model A — monetize fresh value first

Source describes:

- Early Access immediately after publication;
- approximately 30 hours / Day 1–3 language;
- contact access consumes Coin during Early Access;
- contact becomes free afterward.

### Model B — free first, monetize later

Another source flow describes:

- Day 1–3 free;
- Day 4+ contact access costs 1 Coin;
- expiry at Day 30.

These models point in opposite directions.

Therefore this category documentation does **not** declare either model as the current canonical Housing monetization behavior until product/runtime behavior is separately verified.

## Housing extension pricing in source documentation

Older source material defines:

- first 30-day Housing extension: **65 Coins**
- second/later Housing extension: **85 Coins**

Prices are stated as dynamically configurable by Admin.

These values are source-defined product rules, not verified from the supplied current Mini App screenshots.

## Boost / Urgent

Platform source documentation defines:

- Boost as paid and Admin-configurable;
- Boost can return a listing toward the top and republish it to communication channels;
- Urgent as a paid visual distinction with category-specific configurable fee.

Current Housing screenshots supplied for this update do not verify the purchase UI for these actions.

## Rule for this documentation

Do not describe a monetization mechanism as current merely because it exists in old product planning.

Current-state claims require verified runtime/UI evidence.

## Related

- [Product Rules](../../03-product/product-rules.md)
- [Listing Lifecycle](../../03-product/listing-lifecycle.md)
