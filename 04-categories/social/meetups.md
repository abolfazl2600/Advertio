# Social & Events — Meetups

> Status: **Development specification**

## 1. Definition

A Meetup is an organized but typically lighter-weight gathering centered on a shared topic, interest or community.

```text
social_type = meetup
```

Examples:

- language meetup;
- founders meetup;
- tech meetup;
- board-game meetup;
- neighborhood meetup;
- recurring interest group.

## 2. Meetup vs Event

Use Meetup when the product intent is primarily:

- people gathering around an interest/community;
- informal or recurring group participation.

Use Event when the occurrence is more formal, program-led or event-like.

The distinction is a UI/taxonomy aid; both use the same Social attributes and filters.

## 3. Required V1 data

- title;
- description;
- start_at;
- timezone;
- participation mode;
- location when physical;
- schedule type;
- registration type;
- contact method.

Optional:

- topic;
- recurrence;
- venue;
- language;
- capacity;
- admission.

## 4. Recurring Meetups

For recurring meetup:

```text
schedule_type = recurring
```

Store recurrence explicitly.

Do not require the organizer to create a duplicate Listing for every occurrence unless the future event-occurrence architecture chooses that approach.

## 5. Human Connections boundary

```text
"Weekly public tennis meetup"
→ Social & Events / Meetup

"Looking for one tennis partner"
→ Human Connections
```

```text
"Weekly study group open to members"
→ Social & Events / Meetup

"Looking for a study partner"
→ Human Connections
```

## 6. Acceptance criteria

- [ ] Meetup uses the shared Social schema.
- [ ] Recurrence is representable.
- [ ] Public/group gathering and person-seeking intent are separated.
- [ ] Contact remains free.
