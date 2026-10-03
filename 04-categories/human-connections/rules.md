# Human Connections — Category Rules

> Human Connections replaces the legacy Human Matching category concept.
>
> The category uses Search + Active Filters. It has no matching engine.

## 1. Category identity

Canonical name:

```text
Human Connections
```

Do not use **Human Matching** as the canonical product name.

## 2. No-matching rule

Human Connections must not implement:

- automatic person-to-person pairing;
- Compatibility Score;
- Match Score;
- 70%/85%/95% match percentages;
- AI Smart Matching;
- swipe-style compatibility;
- hidden personality matching.

Normal Search, Active Filters, Saved Filters and Ranking are sufficient.

## 3. Listing intent

A listing should clearly describe:

- what activity/connection the user is seeking;
- where or whether it is remote;
- when;
- important practical context.

## 4. Location/Remote

Every listing must specify participation mode:

- in person;
- remote;
- either.

In-person listings need a usable location.

## 5. Date

Date is required when the use case is inherently time-specific.

Examples:

- travel;
- exam preparation;
- one-time activity;
- scheduled sport/activity.

Recurring activities can use availability instead.

## 6. Safety

Human Connections can lead to real-world meetings.

The product should support general platform safety/moderation rules and should avoid encouraging users to publish unnecessary sensitive personal information.

Recommended safety controls include:

- report listing/user;
- moderation/takedown;
- verification indicators where available;
- block/contact safety in later communication features;
- clear distinction between verified and unverified profile states.

## 7. Minors / child-related use cases

Source ideas include:

- babysitting exchange;
- school pickup rotation.

These involve elevated safety and authorization concerns.

Do not enable them merely because they appear in source ideation.

They require a separate product/safety decision before public activation.

## 8. Verification

Verification can be displayed or filtered only when backed by a real platform verification state.

Do not derive "compatible", "trusted", or "safe" from filter similarity.

## 9. Ranking

Human Connections may use normal platform Ranking such as:

- Boosted;
- freshness;
- verified-user signal where defined;
- other platform ranking signals.

Ranking must not be represented as a compatibility score.

## 10. Saved Filters

Users may save their Active Filter state and receive alerts for new listings satisfying it.

Saved Filter behavior must not use a fuzzy match threshold unless a future explicit product decision reintroduces such behavior.

## 11. Human Connections vs Social & Events

- Human Connections = user seeks person/group for an activity.
- Social & Events = user publishes/discovers an event or meetup.

Avoid duplicating the same listing across both categories automatically.

## 12. Acceptance criteria

- [ ] Human Matching terminology is removed from canonical category docs.
- [ ] No matching/compatibility engine is specified.
- [ ] Active Filters are the structured discovery mechanism.
- [ ] Time/location/remote constraints are represented.
- [ ] Safety concerns for real-world connections are explicit.
- [ ] Child-related use cases remain gated pending separate safety decision.
