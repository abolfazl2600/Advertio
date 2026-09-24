# Saved Search

## Version scope

Roadmap:
- Version 1.2: Saved Search + Alerts

Feature prioritization:
- Saved Filters in Phase 2

## Core behavior

User:
1. builds Search with desired Filters in Web App
2. saves the Search / Filter
3. enables Telegram notification
4. receives notification when new Listing matches

Source also describes:
- one daily summary containing links to matching Listings.

## Example

- Toronto housing
- under $1,500
- roommate gender = Female

## Match threshold

Source:
- if Listing is approximately 70% close to User Filter, it can be sent.

User-configurable threshold:
- planned for Future
- not available in Current version

## No-result behavior

If no Listing is sent:
- System recommends reducing/loosening Filters to receive more results.

Example:
- Toronto housing between $1,000 and $1,500

## Notification channels

Current Saved Search flow:
- Telegram Bot message

Future:
- User can add Email for alerts

## Admin visibility

- Active Saved Filters are visible in Admin Panel.

## AI Recommendation relationship — Future

AI Recommendation Assistant can:
- understand natural-language request
- extract Attributes
- save request
- notify User about new matching Listings later

This is a Future AI extension of Saved Search behavior.

## Product purpose

Version 1.2 goal:
- improve experience
- increase engagement

Source does not provide actual Saved Search conversion/retention results.

## Missing rules

> اطلاعات کافی برای این بخش در Source Document فعلی وجود ندارد.

Source does not define:
- max Saved Searches per User
- expiry
- delete/edit behavior
- duplicate filter behavior
- notification deduplication
- exact 70% matching formula
- frequency override by User
