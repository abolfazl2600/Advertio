# Jobs — Filters

> Current state: a dedicated Jobs filter experience has **not** been verified in the Mini App.

## Current verified state

- Jobs appears in Telegram Bot category selection.
- Jobs is marked **Coming Soon** on the current Mini App Home.
- No Jobs-specific filter sheet or filter row is currently documented as implemented.
- Global Search exists in the Mini App, but the reviewed UI evidence is not sufficient to document a dedicated Jobs search/filter experience.

## Source-supported future/minimal filter model

The project source explicitly supports the following Jobs-related inputs:

### Location

Generic listing location includes:

- Country
- Province / State
- City
- optional area/neighborhood

Location is therefore a supported dimension for Jobs discovery once the Jobs category becomes available.

### Job Type

The source explicitly identifies **Job Type** as a Jobs-specific field.

A future Jobs structured filter experience can use the canonical Job Type values once that enum/schema is defined.

## Not defined in the source

The current source does not define canonical filter values for:

- salary range;
- employment type;
- full-time / part-time;
- remote / hybrid / onsite;
- company;
- experience level;
- education;
- schedule/shift;
- benefits;
- visa/work permit;
- language;
- industry;
- profession.

These should not be added to documentation as existing filters until product schema and runtime behavior are defined.

## Search relationship

Advertio's product direction separates:

- **Quick/global text search**
- **Category-specific advanced filters**

Issue #33 specifies a future/revised Telegram Quick Search where Jobs results use the 💼 emoji and the user does not have to preselect Jobs before searching.

That issue is not recorded here as completed behavior.

## Filter semantics for future implementation

When Jobs filters are implemented, they should follow the same platform principles already used elsewhere:

- `Any` / unset should not constrain the query;
- filter values should use canonical structured data;
- missing listing attributes should not be fabricated;
- filtering should not mutate listing content;
- result count should reflect the active filters.

These are platform conventions, not proof of an existing Jobs UI.

## Related

- [Jobs attributes](./attributes.md)
- [Issue #33 — Telegram Quick Search revision](https://github.com/abolfazl2600/Advertio/issues/33)
