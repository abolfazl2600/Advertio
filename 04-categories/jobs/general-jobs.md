# Jobs — General Jobs

> The original Advertio product source identifies **General Jobs / daily work** as the initial Jobs focus. This document preserves that planning direction without presenting historical market assumptions as newly verified external data.

## Product direction from the source

Jobs is identified as the second category priority after Housing.

The source gives these reasons:

- high demand;
- users with serious/high-intent needs;
- monetization opportunity on the job-seeker side;
- General Jobs and daily work as the initial focus.

## Historical internal market-sizing assumptions

The original project source includes a General Jobs Canada sizing exercise using figures attributed there to Job Bank and Kijiji.

The source states:

- Job Bank: 12,578 General Jobs out of 63,119 total → 19.9%
- Kijiji: 11,321 General Jobs out of 68,292 total → 16.6%
- internal average General Jobs share → approximately 18%
- assumed Telegram users in Canada → approximately 3,000,000
- assumed job-seeker ratio → 3.6%
- resulting internal estimate → approximately 108,000 Telegram job seekers
- applying the 18% General Jobs share → approximately 19,400 General Jobs users

## Important evidence boundary

These numbers are preserved because they exist in the project source.

They have **not** been revalidated here against current Job Bank, Kijiji, Statistics Canada, Telegram, or other external sources.

Do not use them as current market facts without a separate fresh market-research task.

## General Jobs scope

The source does not define a detailed taxonomy for General Jobs.

It also does not define whether General Jobs includes specific verticals such as:

- warehouse;
- restaurant;
- delivery;
- retail;
- construction;
- cleaning;
- administrative;
- labour;
- hospitality.

Those examples must not be promoted to canonical subcategories until a product taxonomy is approved.

## Product risk

The source explicitly flags a marketplace risk:

> native/real listings must quickly become more important than crawled listings.

The crawler is intended to solve cold start, not turn Advertio into a permanent Telegram job-search mirror.

## Current implementation status

No dedicated General Jobs Mini App feed or filter UI has been verified.

Current verified Jobs availability is limited to:

- category presence in Telegram Bot Create Listing;
- Coming Soon state in Mini App Home.

## Next schema decision required

Before Jobs becomes a full Mini App category, the product needs a canonical decision for at least:

- Job Type values;
- whether General Jobs is a subtype/category/tag;
- which fields are mandatory;
- which filters are exposed;
- employer identity model;
- compensation representation;
- contact/application flow.

The source does not currently resolve those decisions.
