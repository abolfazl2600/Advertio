# AI Features

AI features are primarily Future product capabilities. Version 2.0 is the main Smart & AI milestone; Version 2.5 adds AI Translation.

## Version 2.0

- AI Recommendation Assistant
- AI Search + Smart Matching
- AI Question Generator
- Price Suggestion
- Compatibility Score

Goal:
- smarter user experience
- significant conversion improvement

## AI Recommendation Assistant

Status: Future

### Goal
User describes need in natural language instead of selecting many Filters.

UI concept:
- `Describe what you're looking for`

Examples:
- furnished room in Toronto under $1,200 near subway
- part-time warehouse job in Mississauga
- passenger cargo Toronto → Tehran next week

### Processing
AI:
1. detects Category
2. extracts required Attributes
3. ranks relevant Listings by match
4. shows close alternatives when exact results are insufficient

### Capabilities
- Natural Language Search
- automatic Attribute extraction
- AI Match Score
- similar Listing suggestions
- save request for future notifications

### Example
Input:
- female roommate
- North York
- budget ≤ $900

Extracted:
- Category: Housing
- City: North York
- Listing Type: Roommate
- Gender Preference: Female
- Budget: ≤ $900

Example output:
- 98% Match
- 95% Match
- 90% Match

These percentages are examples, not validated performance.

## AI Search + Smart Matching

Benefits stated:
- fewer manual Filters
- faster discovery
- natural search
- discovery of alternatives

Platform goals:
- higher engagement
- higher Listing clicks
- better search quality
- collect data to improve recommendation algorithms

## Price Suggestion — Future

Source proposes:
- recommend Listing price based on similar Listings in same Area/Category
- detect unrealistic/outlier prices

No algorithm or validation result is provided.

## Listing-quality assistance — Future

Source proposes:
- suggestions to improve Listing text/quality
- Category/Tag suggestions during Listing creation

## AI Question Generator — Future

Before Contact:
- AI suggests questions User should ask seller/advertiser.

Source example:
- «این سؤال‌ها را از فروشنده بپرس.»

## Compatibility Score — Future

Status: Proposed

- Example: 85% Match
- based on Search/request
- fuzzy suggestion behavior
- Source notes possible conflict with Urgent Listings

See [Ranking](./ranking.md).

## AI Listing Translation — Version 2.5 / Future

After Listing create/edit:
- AI analyzes text
- translates Title
- translates Description
- translates text Attributes/Tags
- User sees Listing in selected language

Future:
- Chat Translation
- Review translation
- Profile translation
- category-specific terminology
- language detection and best publication-language suggestion

### Translation storage conflict

One Source section says:
- translated versions are stored alongside original.

Another note says:
- after first translation, translation is cached as needed
- multiple translations are not permanently stored per Listing.

> ⚠️ Source Conflict
>
> Source gives two incompatible storage behaviors for AI Translation:
> 1. store translated versions alongside original
> 2. do not keep multiple stored translations; cache when needed
>
> This requires final Product/Technical decision.

## AI and Operations — Future

Manual:
- Listing approval
- Verification
- Document review

are intended to become increasingly automated via:
- AI Moderation
- Fraud Detection
- external Verification services

after predefined Operational KPIs.

## AI feature validation status

Status: Proposed / Future

Source does not provide actual production results for:
- Match accuracy
- Search conversion uplift
- Price Suggestion accuracy
- Compatibility Score accuracy
- AI Question usefulness
- Translation quality
