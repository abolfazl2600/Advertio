# Jobs — General Jobs

> The original Advertio source identifies General Jobs / daily work as the initial Jobs direction. The taxonomy below is a proposed V1 implementation layer.

## Initial product focus

Advertio should begin with common, high-frequency job openings that fit community/Telegram supply and do not require a complex professional-network product.

Recommended V1 categories:

- General Labour
- Warehouse
- Delivery & Driver
- Restaurant & Food
- Retail
- Cleaning
- Construction
- Office & Administration
- Customer Service
- Sales
- Skilled Trades
- Other

IT/Tech, Design/Creative, Healthcare Support, Childcare and Education can exist in the canonical taxonomy but do not need special V1 product flows.

## Historical internal market assumptions

The existing project source contains an older General Jobs Canada sizing exercise attributed there to Job Bank and Kijiji.

Those figures should remain treated as historical internal planning assumptions and **not** current verified market facts.

## Why General Jobs first

Product rationale:

- frequent hiring;
- local/city-based discovery matters;
- job posts often already circulate in community channels;
- simpler application/contact flow;
- suitable for crawler-assisted cold start;
- useful for newcomers and community-based employment discovery.

## V1 product constraint

General Jobs should not introduce unique custom fields for every profession.

Use a stable common Jobs schema first:

- title;
- category;
- company;
- employment type;
- work arrangement;
- location;
- salary;
- description;
- skills;
- shift/schedule;
- contact/apply.

Profession-specific schemas can be added only when volume justifies them.

## Marketplace risk

Crawler supply must not become the permanent product.

Track:

- Native Jobs %
- Crawled Jobs %
- Native contact/apply share
- Crawled contact/apply share

A healthy Jobs marketplace should gradually increase native employer supply.

## Acceptance criteria

- [ ] General Jobs uses the common Jobs schema.
- [ ] V1 does not require profession-specific posting forms.
- [ ] Crawled and native supply remain analytically distinguishable.
- [ ] Product analytics can measure whether native supply is replacing crawler dependence.
