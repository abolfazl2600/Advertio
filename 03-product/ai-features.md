# AI Features

AI features are primarily Future product capabilities. Version 2.0 is the main Smart & AI milestone; Version 2.5 adds AI Translation.

## Product decision: no Smart Matching

Advertio does not require:

- Smart Matching;
- Compatibility Score;
- Match Score;
- match percentages.

Structured Search, Active Filters, Saved Filters and normal Ranking remain the product discovery model.

AI can assist users in building searches/filters, but it does not create a separate matching system.

## Version 2.0

- AI Search Assistant
- AI Question Generator
- Price Suggestion
- Listing-quality assistance

Goal:
- smarter search/input experience
- reduce friction in building Filters
- improve Listing quality

## AI Search Assistant

Status: Future

### Goal

User describes a need in natural language instead of manually selecting every filter.

UI concept:

`Describe what you're looking for`

Examples:

- furnished room in Toronto under $1,200 near subway
- part-time warehouse job in Mississauga
- Cargo Toronto → Tehran next week
- tennis partner in North York this weekend

### Processing

AI can:

1. detect Category;
2. extract structured Attributes;
3. translate supported attributes into Active Filters;
4. execute normal Search + Filter behavior;
5. show the resulting filter state to the User.

The user should be able to edit/remove the generated filters.

### Capabilities

- Natural Language Search
- automatic Attribute extraction
- Active Filter generation
- query clarification when required
- save the resulting filter state for future notifications

### No hidden compatibility score

AI Search Assistant must not display:

- 98% Match;
- 85% compatibility;
- hidden personality similarity;
- a fuzzy matching threshold.

Search relevance/ranking can still order text-search results, but it is not presented as a person/listing compatibility score.

## Price Suggestion — Future

Source proposes:

- recommend Listing price based on similar Listings in same Area/Category;
- detect unrealistic/outlier prices.

No algorithm or validation result is provided.

## Listing-quality assistance — Future

Source proposes:

- suggestions to improve Listing text/quality;
- Category/Tag suggestions during Listing creation.

## AI Question Generator — Future

Before Contact:

- AI suggests questions User should ask seller/advertiser.

Source example:
- «این سؤال‌ها را از فروشنده بپرس.»

## AI Listing Translation — Version 2.5 / Future

After Listing create/edit:

- AI analyzes text;
- translates Title;
- translates Description;
- translates text Attributes/Tags;
- User sees Listing in selected language.

Future:

- Chat Translation
- Review translation
- Profile translation
- category-specific terminology
- language detection and best publication-language suggestion

### Translation storage conflict

One Source section says translated versions are stored alongside original.

Another note says after first translation, translation is cached as needed and multiple translations are not permanently stored per Listing.

> ⚠️ Source Conflict
>
> Source gives two incompatible storage behaviors for AI Translation:
> 1. store translated versions alongside original
> 2. do not keep multiple stored translations; cache when needed
>
> This requires final Product/Technical decision.

## AI and Operations — Future

Manual:

- Listing approval;
- Verification;
- Document review.

are intended to become increasingly automated via:

- AI Moderation;
- Fraud Detection;
- external Verification services;

after predefined Operational KPIs.

## AI feature validation status

Status: Proposed / Future

Source does not provide actual production results for:

- natural-language filter extraction accuracy;
- Search conversion uplift;
- Price Suggestion accuracy;
- AI Question usefulness;
- Translation quality.
