# Crawler Data Normalization

> Derived from Telclaw normalization/storage behavior and the Advertio ingest contract at commit [63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92).

## Principle

Advertio should receive **canonical structured data**, while the crawler must still retain the original source record.

Normalization must be deterministic and reviewable; it must not silently invent missing business data.

## Preserve three layers

For each record keep the conceptual separation:

1. **Raw text** — original Telegram message/caption.
2. **Cleaned/normalized text/data** — deterministic cleanup and canonical aliases.
3. **Structured extraction** — category fields produced by rules/AI and validated before delivery.

This allows reprocessing when rules, aliases or AI extraction improve.

## Canonical location

Telclaw's storage normalizer does not guess locations.

It:

- accepts a canonical city value from extraction;
- accepts only a valid-looking ISO 3166-1 alpha-2 country code;
- derives a stable ASCII reporting key;
- preserves `None` when location is unavailable instead of guessing.

Advertio's live location catalog is the final contract.

The ingest service exposes canonical country/province/city endpoints, and unknown/invalid locations produce a non-retryable validation error.

## Structured alias normalization

Telclaw supports field-specific normalization rules.

Important behaviors to preserve:

- case-insensitive alias matching;
- accent-insensitive alias matching;
- optional country-scoped aliases;
- ambiguous values can map to null instead of being guessed;
- existing structured rows can be explicitly re-normalized later;
- normalization changes are traceable.

## Category contract

The Advertio ingest contract defines `categorySlug` plus `attributesJson`.

Important rules:

- `attributesJson` is a **string containing JSON**, not a nested JSON object;
- required attributes must be present and valid;
- unknown attributes are rejected;
- values must use Advertio's canonical schema.

For Housing, the referenced contract currently lists required values including:

- `listing_type`
- `property_type`
- `bedrooms`
- `price`

If a required attribute cannot be reliably extracted:

```text
do not guess → reject/hold the record
```

## Canonical schema source

Advertio's live endpoints are the source of truth for current categories and attributes:

```text
GET /api/categories
GET /api/categories/{id}/attributes
```

If local crawler configuration conflicts with Advertio's live schema, the live Advertio contract wins.

## Title and description

The ingest contract currently limits:

- title: up to 200 characters;
- description: up to 2000 characters.

Normalization should produce content within these constraints before delivery.

## Media normalization

Media delivery rules from the Advertio contract include:

- JPEG / PNG / WebP;
- max 8 MB per upload;
- max 50 MP;
- max 10 media keys per listing;
- server strips EXIF/GPS;
- first media key is used as the feed-card image.

## References

- [Advertio ingest contract](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/docs/integrations/advertio-ingest-api.md)
- [Telclaw data normalizer](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/storage/data_normalizer.py)
- [Telclaw location normalizer](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/storage/location_normalizer.py)
- [Message repository](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/storage/message_repository.py)
