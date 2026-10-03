# Crawling Rules

> The rules below are extracted from Telclaw's current collection code/tests at commit [63fbc01](https://github.com/abolfazl260/Telclaw/commit/63fbc01555f01345bb92124c9112db63f1395e92). Advertio should treat them as the baseline crawler eligibility contract unless intentionally changed.

## Crawl scope

Telclaw crawls an inclusive date range:

```text
from_date .. to_date
```

It stops when messages become older than the requested start date.

Supported collection modes currently include:

- `all`
- `photos_only`

## Message eligibility

A message is eligible for persistence only after these collection gates.

### 1. Human-origin requirement

Accepted:

- direct human-authored message;
- forwarded message whose origin resolves to a human user.

Skipped:

- bot-authored messages;
- forwarded-from-channel messages;
- forwarded-from-bot messages;
- forwarded messages whose origin cannot be verified as human.

This behavior is covered by Telclaw regression tests.

### 2. Telegram username required

The current crawler requires a non-empty sender username.

Messages with no sender username are skipped.

This is a current Telclaw rule, not a universal Telegram limitation. If Advertio later relaxes it, it must replace the lost contact/ownership signal with another verified provenance mechanism.

### 3. Minimum useful text

Current Telclaw threshold:

```text
MIN_MESSAGE_WORDS = 10
```

Messages with fewer than 10 whitespace-normalized words are skipped.

Exactly 10 words pass.

### 4. Crawl mode

In `photos_only` mode, only photo media records pass the crawl-mode filter.

In `all` mode, media type does not determine collection eligibility.

## Raw preservation

At collection time Telclaw stores raw message text and collection metadata.

Cleaning and AI extraction are not performed by the Telegram I/O layer.

Advertio should preserve this boundary:

```text
raw source ≠ cleaned text ≠ structured extraction
```

## Media behavior

At crawl time:

- media metadata is recorded;
- photos are **not downloaded**;
- album/group ID can be preserved;
- public message link/media reference can be preserved.

Photo download is deferred until after AI validation and immediately before Advertio delivery.

Downstream Advertio contract allows at most **10 media keys**.

## Crawl-time duplicate gate

Before persistence, Telclaw checks same-sender normalized-content duplicates. See [duplicate-detection.md](./duplicate-detection.md).

## Pacing

The current crawler includes deliberate delays between Telegram operations, including a channel-start delay and small randomized message-level delays.

Advertio should preserve respectful pacing and avoid unnecessary concurrent pressure on Telegram or the Advertio ingest service.

## Error handling

Known Telegram access failures such as invalid or private/inaccessible channels are surfaced as failed crawl results.

Per-channel crawl output includes operational counters such as:

- saved;
- duplicates skipped;
- media metadata seen;
- crawl-mode filtered;
- weak-text skipped;
- bot skipped;
- forwarded channel/bot/unknown skipped;
- no-username skipped;
- total skipped.

These counters are valuable for crawler health monitoring and should remain observable.

## Source references

- [collection/crawler.py](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/collection/crawler.py)
- [minimum-text tests](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/tests/test_crawler_minimum_text.py)
- [forwarded-origin tests](https://github.com/abolfazl260/Telclaw/blob/63fbc01555f01345bb92124c9112db63f1395e92/tests/test_crawler_forwarded_channel.py)
