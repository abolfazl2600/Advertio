# Human Connections — Use Cases

> The original source presents many of these as **ideas for possible subareas**, not as implemented features.
>
> In the current product direction, they should be represented by structured `connection_type` / `activity_type` values and Active Filters rather than separate matching systems.

## 1. Travel

Source explicitly mentions travel date.

Examples:

- travel companion;
- airport/trip companion;
- someone travelling around the same date.

Useful filters:

- origin/location where relevant;
- destination where relevant;
- travel date/date range;
- remote does not normally apply to physical travel.

## 2. Study

Source explicitly mentions exam/study period.

Examples:

- study partner;
- exam preparation;
- study group;
- language practice.

Useful filters:

- remote/in-person;
- city;
- study/exam date range;
- subject/activity;
- availability.

## 3. Daily Life & Errands

Source ideas:

- Shopping Buddy
- Document Runner
- Pet Care Exchange

These should remain ordinary listings discoverable by filters.

No automatic pairing is required.

## 4. Health & Fitness

Source ideas:

- Gym Partner
- Running Partner
- Diet Accountability Partner
- Sports Team
- Hiking Group

Useful filters:

- activity;
- location/remote;
- date;
- recurring availability.

## 5. Sports & Outdoor

Source ideas:

- Tennis Partner
- Padel Partner
- Badminton Partner
- Table Tennis Partner
- Basketball Pickup Team
- Swimming Partner
- Cycling Buddy
- Ski/Snowboard Partner
- Climbing Partner
- Yoga Class Buddy

Recommended Active Filters:

- sport/activity;
- city/area;
- date;
- availability;
- group size where relevant.

Avoid skill-level compatibility scores. If Skill Level is later added, it should be a transparent structured filter.

## 6. Social & Activities

Source ideas:

- Event Buddy
- Board Game Group
- Gaming Duo Partner
- Book Club Partner
- Photography Walk Partner

Boundary:

- looking for a person/group → Human Connections;
- publishing the actual event/meetup → Social & Events.

## 7. Family & Kids

Source ideas:

- Babysitting Exchange
- School Pickup Rotation

These are **not automatically approved V1 use cases**.

They require separate safety, authorization and moderation design before activation.

## 8. Remote use cases

The original source explicitly requires remote support.

Good remote examples:

- study;
- language practice;
- gaming;
- accountability;
- book club.

Remote is a normal filter state, not a matching mechanism.

## 9. Future expansion rule

A new use case should be added when:

- it fits the Human Connections category purpose;
- required attributes can be expressed with existing or justified new fields;
- Active Filters can support discovery;
- moderation/safety requirements are understood.

Do not create a new matching algorithm for each use case.

## 10. Acceptance criteria

- [ ] Source-derived use cases are preserved as ideas.
- [ ] Use cases are expressed through structured attributes/filters.
- [ ] No use case requires automated matching.
- [ ] Social & Events boundary is clear.
- [ ] Higher-risk family/kids ideas remain gated.
