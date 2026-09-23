# Advertio

> A trust-first marketplace for real-world needs.

Advertio is a marketplace platform designed to help people discover and connect around real needs such as **housing, jobs, services, passenger cargo, and social activities**.

The product is built around three core ideas:

1. **Structured discovery** — turning fragmented posts and conversations into searchable, filterable listings.
2. **Trust** — progressively adding identity verification, user history, reviews, ratings, and fraud controls.
3. **Distribution** — connecting the marketplace with channels such as the web and Telegram, with additional channels planned over time.

This repository is the **product, business, market, operations, and system-design knowledge base** for Advertio.

---

## Vision

Today, many real-world needs are still solved through fragmented Telegram groups, social networks, classifieds, and word of mouth.

That creates recurring problems:

- listings are difficult to search and compare;
- information is often incomplete or unstructured;
- users have limited information about the person behind a listing;
- spam and scam risk reduces trust;
- people repeatedly check multiple groups and websites;
- relevant opportunities are easy to miss;
- there is little persistent history or reputation across interactions.

Advertio aims to provide a more structured and trust-oriented marketplace experience without losing the speed and distribution advantages of community platforms.

---

## Initial Market

Advertio's initial market focus is **rental housing in Canada**, especially rental and roommate discovery.

The next major category is **Jobs**, with additional categories planned or explored over time.

Current and planned category areas include:

- Housing & Roommates
- Jobs
- Services
- Passenger Cargo
- Social & Events
- Human Matching / Activity Partners

Some categories and capabilities are exploratory and are not part of the first release.

---

## Product Principles

### 1. Trust before scale

Advertio is designed around a layered trust model rather than anonymous listings alone.

Depending on the product version, the trust layer may include:

- phone verification;
- video verification;
- document or identity verification;
- social-account verification;
- financial verification;
- user activity history;
- completed-deal history;
- reviews and ratings;
- trust badges;
- moderation and fraud detection.

Early versions intentionally keep some operational processes manual so that product assumptions can be validated before expensive automation is introduced.

### 2. User-generated supply should become the core

Advertio is **not intended to become a permanent search engine for Telegram**.

A crawler may be used during the cold-start stage to create initial marketplace supply from eligible public sources. The long-term objective is for genuine listings created directly by Advertio users to become the dominant supply.

### 3. Start simple, automate later

The initial product favors operational learning over premature complexity.

Manual moderation, manual verification, and limited payment workflows can be used in early versions and replaced progressively with dedicated services and automation as volume and product-market evidence increase.

---

## MVP — Version 1.0

The first product version focuses on the smallest useful marketplace experience.

### Core scope

- Rental Housing & Roommates
- Telegram Bot
- Simple Web Application
- Listing creation and browsing
- Phone verification
- Basic user profiles
- Manual admin moderation
- Telegram notifications
- Cold-start crawler integration
- Basic listing lifecycle:
  - Pending
  - Approved
  - Expired

### Initial success targets

- 50+ genuine published listings
- 200+ registered users

These are product targets, not claims that all targets have already been reached.

---

## Core Marketplace Flow

A simplified lifecycle is:

```text
User Registration
      ↓
Phone Verification
      ↓
Create Listing
      ↓
Admin Review
      ↓
Publish
      ↓
Discovery / Contact
      ↓
Boost / Extend / Early Access
      ↓
Deal
      ↓
Review & Reputation
```

The exact flow changes by category and product version.

---

## Monetization Direction

Advertio uses an internal **Wallet / Coin** model for small marketplace transactions.

Potential coin-based services include:

- Early Access to contact information
- Boosting a listing
- Extending or renewing a listing
- Urgent / promoted placement
- additional listing capacity
- targeted distribution
- future premium services

Pricing is intended to be configurable by market, category, supply/demand conditions, and observed unit economics rather than permanently hard-coded.

### Important validation status

The current source material includes evidence that some early users paid for **listing publication**.

Payment willingness for the planned **Early Access / contact-information model** has **not yet been validated** and remains a product hypothesis.

---

## Early Market Validation

An early English-language MVP for Canadian rental housing was tested across:

- a rental website;
- a Telegram bot;
- a dedicated Telegram channel.

Reported results from the initial four-month experiment:

| Metric | Result |
| --- | ---: |
| Telegram channel members | 272 |
| Direct listing requests | 38 |
| Paying users | 2 |
| Price per paid listing | $2 |
| Initial revenue | $4 |
| Request/member ratio | 13.9% |
| Payer/request ratio | 5.2% |

These results are **early validation signals**, not proof of product-market fit. The source notes that part of the initial audience may have been relatively warm or targeted, so the observed conversion rates should not be generalized to the full market.

---

## Search, Ranking & Notifications

Advertio is designed to evolve from simple structured search into a smarter matching system.

Planned capabilities include:

- saved searches;
- Telegram alerts;
- personalized notifications;
- ranking by recency, boost status, and verification;
- natural-language search;
- AI-assisted matching;
- compatibility scores;
- price suggestions;
- listing-quality suggestions;
- AI-assisted translation.

AI features are part of later product phases rather than requirements for the first MVP.

---

## Listing Lifecycle

The product model includes a configurable listing lifecycle with concepts such as:

- submission and moderation;
- active publication;
- Early Access periods for selected categories;
- public/free access after the Early Access window where applicable;
- Boost and Urgent promotion;
- expiration;
- paid extension / renewal;
- performance analytics.

Listing rules and monetization can differ by category and country.

---

## Repository Structure

| Directory | Purpose |
| --- | --- |
| [`01-business/`](./01-business/) | Vision, problem, strategy, value proposition, assumptions, risks, and business model |
| [`02-market/`](./02-market/) | Market research, sizing, competitors, target market, and validation |
| [`03-product/`](./03-product/) | Product requirements, flows, lifecycle, roadmap-level product behavior |
| [`04-categories/`](./04-categories/) | Category definitions and category-specific attributes |
| [`05-monetization/`](./05-monetization/) | Wallet, coins, pricing, revenue logic, and unit economics |
| [`06-marketing-growth/`](./06-marketing-growth/) | Acquisition, referrals, growth loops, and distribution |
| [`07-telegram-bot/`](./07-telegram-bot/) | Telegram bot behavior and user flows |
| [`08-backoffice/`](./08-backoffice/) | Admin panel, moderation, and operational controls |
| [`09-crawler/`](./09-crawler/) | Cold-start crawler design and ingestion rules |
| [`10-integrations/`](./10-integrations/) | External systems and platform integrations |
| [`11-data-model/`](./11-data-model/) | User, listing, wallet, transaction, and related entities |
| [`12-operations/`](./12-operations/) | Operational workflows and manual processes |
| [`13-data-metrics/`](./13-data-metrics/) | KPIs, experiments, funnels, retention, and marketplace metrics |
| [`14-decisions/`](./14-decisions/) | Product and architecture decision records |

---

## Recommended Starting Points

For a fast introduction to the project:

- [Vision](./01-business/vision.md)
- [Problem](./01-business/problem.md)
- [Value Proposition](./01-business/value-proposition.md)
- [Business Model](./01-business/business-model.md)
- [Market Validation](./02-market/market-validation.md)
- [Assumptions & Source Conflicts](./01-business/assumptions.md)

---

## Product Evolution

The current product direction is organized broadly as:

| Version | Focus |
| --- | --- |
| **1.0** | Minimum Viable Marketplace |
| **1.1** | Wallet & Monetization Base |
| **1.2** | Core Experience & Ranking |
| **1.5** | Trust Foundation |
| **2.0** | Smart Search & AI Features |
| **2.5** | International Expansion |
| **3.0** | Business Platform |

The roadmap is directional. Features, sequencing, and pricing may change as Advertio validates user behavior, marketplace liquidity, trust mechanisms, retention, and unit economics.

---

## Key Open Questions

Advertio is still validating several important marketplace assumptions:

- Does the trust layer materially improve successful transactions?
- Will users pay for faster or earlier access to high-value listings?
- Which verification methods create enough user value to justify their cost?
- Can user-generated supply quickly replace crawler-assisted cold-start supply?
- What drives repeat usage and 30/90/180-day retention?
- Which category reaches marketplace liquidity first?
- What is the sustainable CAC-to-LTV relationship?
- How should pricing vary by category and geography?

These questions should be answered with experiments and observed marketplace behavior rather than assumptions alone.

---

## Documentation Status

This repository is a living knowledge base.

Some documents are mature, while others are placeholders or work in progress. Product behavior described here may represent:

- currently tested behavior;
- MVP requirements;
- planned functionality;
- hypotheses requiring validation;
- future product ideas.

When a document contains conflicting historical assumptions, the conflict should be preserved and resolved explicitly rather than silently rewritten.

---

## Current Focus

The near-term focus is to validate a simple marketplace loop:

```text
Real Supply
   ↓
Relevant Discovery
   ↓
Trusted Contact
   ↓
Successful Interaction
   ↓
Repeat Usage
```

The long-term goal is not simply to aggregate listings, but to build a marketplace where **structured data, trusted identities, reputation, and intelligent matching** make real-world connections faster and safer.
