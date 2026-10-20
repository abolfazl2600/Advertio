# Global Search — current implementation

> Global Search is implemented in the Web Mini App across every live journey. It is separate from each category's feed filters.

## Search contract

- Search matches listing titles and descriptions across Housing, Cargo and Jobs.
- Every word in the query must appear in the title or description; this is ordinary keyword matching, not semantic/AI search.
- Minimum query length: 2 characters.
- Maximum query length: 100 characters.
- The UI waits 350 ms after typing settles before committing the query.
- The query is stored in the URL as `?q=`, so the current search is shareable within the app's URL/history behavior.
- Results load in pages of 20 and support further-page loading.
- Previous results remain visible while a new query loads; the UI shows a searching state instead of flashing empty results.
- Returning from a listing restores the same query's cached results and scroll position. Starting a different query starts at the top.
- Clearing the query removes the active search and returns to the empty prompt.

## Examples

- `basement` can find a Housing listing whose title or description contains the word.
- `Tehran` can find Cargo trips because the generated Cargo title includes route endpoints.
- `cook` can find a Jobs listing if the word is present in its generated/custom title or description.

## Search versus category filters

Global Search does not inherit or modify the filters in the Housing, Cargo or Jobs feed. Those feeds have their own structured filters:

- Housing: category attributes, city/location and rent/roommate filters.
- Cargo: traveller/sender, origin and destination.
- Jobs: Hiring/Job seekers, field and Canadian city.

A keyword search is not guaranteed to interpret structured values as dedicated filters. For example, a date is not a Cargo travel-date filter in global Search; it is just text if it appears in a title or description.

## Empty and error states

- Queries shorter than two characters do not call the feed search endpoint.
- No matches show the query and an option to clear it.
- Network/server errors expose a retry action.
- Pagination is only available when the server reports more results.

## Current boundaries

- No AI/semantic ranking or natural-language query parsing.
- No guarantee that searching a value is equivalent to selecting that value in a category filter.
- Results reflect only the three live Web journeys, not every category record that may exist in the backend seed.
