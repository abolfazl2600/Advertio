# Jobs — Application and Contact

> Status: **Jobs V1 proposed contact model**, aligned with Advertio native/crawled supply separation.

## Canonical application methods

```text
application_method:
- advertio_contact
- telegram
- external_url
- email
```

Only one primary method should be selected for V1 unless the product intentionally supports multiple methods.

## Advertio Contact

Use when the employer wants the job seeker to request/reveal contact through Advertio.

This path can later participate in contact monetization if the Jobs monetization model is explicitly activated.

## Telegram

Suitable for:

- crawled Telegram Jobs;
- native employer listings that explicitly choose Telegram where product rules allow.

For crawled records, follow crawler source/contact priority.

## External URL

Typical use:

```text
Apply on company website
```

Rules:

- HTTPS only;
- validate URL;
- display target domain where useful;
- instrument the click;
- do not imply Advertio controls the external application process.

## Email

If enabled:

- validate canonical email;
- protect against accidental disclosure where privacy/product rules require it;
- instrument the Apply action.

## Primary CTA examples

```text
Contact Employer
Open in Telegram
Apply on company website
Apply by email
```

## Crawled monetization

Shared product rules define crawler listings as non-monetized.

Therefore:

- no Coin charge for crawled Job contact;
- source/external route is used;
- crawled contact remains a separate analytics cohort.

## Conversion events

Every official action should record an event such as:

- `job_contact_clicked`
- `job_apply_clicked`

with:

- listing ID;
- supply source;
- application method;
- user ID where available;
- timestamp.

## Acceptance criteria

- [ ] Every active Job has a valid primary application method.
- [ ] Conditional URL/email fields validate.
- [ ] Crawled Jobs never use native paid contact monetization.
- [ ] Apply/Contact actions are measurable.
- [ ] External application clearly indicates leaving Advertio.
- [ ] Inactive/Expired/Filled listings do not expose a normal active CTA.
