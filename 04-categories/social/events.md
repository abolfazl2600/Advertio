# Social & Events — Events

> Status: **Development specification**

## 1. Definition

An Event is a scheduled organized occurrence with a clear start time and an organizer.

```text
social_type = event
```

Typical examples:

- workshop;
- cultural event;
- public presentation;
- community celebration;
- scheduled public activity;
- organized conference/session.

## 2. Required V1 data

At minimum:

- title;
- description;
- start_at;
- timezone;
- participation_mode;
- location for in-person/hybrid;
- admission_type;
- registration_type;
- contact method.

Recommended when applicable:

- end_at;
- venue name;
- activity/topic;
- admission price/currency;
- capacity;
- external registration URL.

## 3. Event lifecycle

```text
Draft
→ Pending Review
→ Active
→ Event ends
→ Inactive / Expired
```

An Event should not remain in normal upcoming-event discovery after its end time.

Historical detail can remain accessible according to retention/history policy.

## 4. Registration

Advertio may route users to:

- official contact;
- external registration URL.

V1 does not imply:

- ticket issuance;
- attendance guarantee;
- refund processing;
- escrow.

## 5. Admission

An organizer may state:

- Free
- Paid
- Donation
- Unspecified

Paid admission is informational unless future event-commerce functionality is explicitly added.

## 6. Boundary with Human Connections

```text
"Photography walk at 10 AM Saturday, everyone welcome"
→ Social & Events / Event or Community Activity

"Looking for someone to join me for a photography walk"
→ Human Connections
```

## 7. Acceptance criteria

- [ ] Event has a timezone-aware start.
- [ ] Ended Events leave upcoming discovery.
- [ ] Registration mode is explicit.
- [ ] Paid admission is not processed as Contact Early Access.
- [ ] Partner-seeking posts are redirected to Human Connections.
