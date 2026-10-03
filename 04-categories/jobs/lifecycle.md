# Jobs — Lifecycle

> Status: **Jobs V1 proposed lifecycle**, extending Advertio's shared listing lifecycle with a Jobs-specific Filled state.

## Core states

Recommended Jobs lifecycle:

```text
Draft
→ Pending
→ Active
→ Filled / Deactivated / Expired / TakenDown

Pending → Rejected
```

## Draft

Not public.

Used while employer/poster edits the Job.

## Pending

Submitted and waiting for Admin moderation.

No public Apply/Contact.

## Active

Visible in Jobs feed/search.

Apply/Contact enabled.

## Filled

Jobs-specific terminal/inactive state.

Employer/poster can mark:

```text
Position filled
```

Behavior:

- remove from active discovery;
- retain history/analytics;
- disable normal Apply/Contact.

## Deactivated

Poster voluntarily deactivates the job for reasons other than Filled.

## Expired

Shared source documentation commonly uses a 30-day listing expiry model.

Until Jobs runtime policy is explicitly configured differently, Jobs can reuse the platform expiry policy rather than inventing a separate duration.

## TakenDown

Admin/moderation removal.

No active discovery/contact.

## Rejected

Failed moderation before publication.

## Extend

Source documentation defines sample Jobs/Social extension pricing:

- first extension: 35 Coins;
- second/later extension: 55 Coins.

Pricing is Admin-configurable and should not be hard-coded as immutable product logic.

## Boost

Shared source model supports Boost.

Boost should affect visibility/ranking without changing the underlying job data.

## Urgent

Shared source model supports paid Urgent distinction.

Jobs-specific Urgent UI is not yet verified.

## Application deadline

If a Job has `application_deadline`, product behavior should prevent the Job from remaining normally applicable after that deadline.

Implementation options:

- auto-expire;
- mark application closed;
- require employer confirmation.

Choose one canonical runtime rule during implementation.

## Acceptance criteria

- [ ] Pending Jobs are not public.
- [ ] Active Jobs are discoverable and actionable.
- [ ] Filled Jobs leave active discovery and lose active CTA.
- [ ] TakenDown/Rejected Jobs cannot be applied to.
- [ ] Expiry is deterministic.
- [ ] Extend preserves listing identity/history.
- [ ] Boost does not mutate core job attributes.
- [ ] Deadline handling is explicit and tested before launch.
