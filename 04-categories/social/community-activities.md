# Social & Events — Community Activities

> Status: **Development specification**

## 1. Definition

A Community Activity is an organized activity open to a community/group, often practical, recurring or participation-oriented.

```text
social_type = community_activity
```

Examples:

- community cleanup;
- volunteer activity;
- open group walk;
- public group practice;
- community class/session;
- neighborhood activity.

## 2. Boundary

A Community Activity has an organizer and an activity that exists independently of one specific person request.

```text
"Community cleanup Sunday at 9 AM"
→ Community Activity

"Looking for someone to help me with an errand"
→ Human Connections
```

## 3. Required V1 data

- title;
- description;
- start_at;
- timezone;
- participation mode;
- location for physical activity;
- schedule type;
- contact/registration behavior.

Optional:

- recurrence;
- topic;
- venue;
- language;
- capacity;
- admission/donation information.

## 4. Volunteering / donation

If an activity involves donation:

- label it clearly;
- do not imply Advertio verifies the recipient/charity unless a verification product exists;
- monetary donation processing is outside V1 unless separately implemented.

## 5. Acceptance criteria

- [ ] Community Activity is organizer/activity based.
- [ ] It does not absorb one-to-one partner requests.
- [ ] Recurring activities are representable.
- [ ] Trust claims are not fabricated.
