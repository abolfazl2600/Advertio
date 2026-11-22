# Advertio — Canada Compliance Delta & Execution Handoff (2026-11-22)

> **Status:** Research addendum and implementation handoff; NOT legal approval or production compliance certification.  
> **Parent research:** [AD-10](https://advertio24.atlassian.net/browse/AD-10) · [Original assessment](./canada-legal-compliance.md).  
> **Product evidence:** [Current capability catalogue](../docs/current-capabilities.md) audited against GitLab master at 2026-11-13; **repository documentation, not live production audit**.

## 1. Decision

The 2026-10-21 research covers the principal Canadian federal/provincial privacy, marketing, consumer, payments, housing, cargo and tax issues. It is suitable as a *research deliverable*, conditional on reviewing the newer product documentation and authoritative regulatory changes below. It cannot be described as legal sign-off or launch approval. The implementation checklist C-01 through C-14 is a separate workstream; all evidence links, assigned owners and counsel decisions must be tracked independently.

**Scope dependency:** actual corporate domicile, relevant provinces (especially Québec), processing/storage locations, payment fund flows, whether users exchange payments via Advertio, source-level crawler rights, and Advertio's real role in Cargo remain unanswered. Counsel/accountant decisions must be fact-based, not presumed.

## 2. Product / legal delta since October 21

| Area | Verified documented state by November 13 | Compliance implication | Needed result |
|---|---|---|---|
| Wallet & Coin | Server-configured prices for contact unlock, additional native concurrent listing, renew, boost, identity verification; Stripe/Stars/manual funding when configured. Self-serve refunds are conditional on unspent coins. | Wallet top-up copy still says coins are spent only on contact unlock, despite broader configured actions; do not call this a verified live defect without testing. | Review actual pricing UI, payment/receipt/refund flows, finance/provider scope; update copy and approved payment terms. |
| Identity | Document image and randomized challenge video go through Telegram to bot/admin workflow. | Sensitive identity evidence creates higher retention, processor/data-flow and access-control needs. | Inventory, necessity analysis, access test, retention approval, deletion test. |
| Crawler | User-created and crawled supplies have distinct handling; source Telegram link/contact path for crawled items; also supports Housing, Cargo, Jobs. | Public-source personal data is not automatically exempt from privacy duties. | Source-level rights/usage-basis register, human removal/objection process, publisher-identity and Verified badge controls. |
| Housing and Cargo | Cargo catalogs expanded to 11 countries; user-created Cargo supports separate city/route currency logic and crawled supply. Housing, Jobs and shared moderation remain active. | Do not automatically assume each selectable route creates a launch market, but review sanctions, restricted trade and role of platform for materially used routes. | Allowed/prohibited cargo rules and jurisdiction-defined review, source and contact notices. |
| Marketing | Saved-search alerts, bot marketing opt-in, broadcasts and new Instagram integration; Instagram default rule disabled/dry-run, production Meta approval not verified. | Analyze CEM vs service notifications and direct messages under CASL. Avoid treating public channel posts as identical to DM. | Message taxonomy, proof of consent/unsubscribe tests; Instagram review before live enablement. |
| Québec and languages | Web catalog documents fa/en/fr/ru/hi UI support; user content is not auto-translated. | French UI alone does not establish legal compliance for Québec services, contracts, payment terms or privacy. | Québec applicability/marketing scope decision and localized consumer-contract review. |
| Known gaps | Ratings/reviews and reputation screens are not shipped according to November catalogue; older docs contain conflicting phrasing on multiple concurrent listings vs later implementation. | Exclude unshipped reviews/ratings from active-law implementation scope, and reconcile contradictory inventory entries. | Product owner approval of verified shipped feature list. |

## 3. Newly verified official regulation changes (as of 2026-11-22)

- **Iran sanctions:** Canada amended the Special Economic Measures (Iran) Regulations **on November 5, 2026**, including re-listing eleven entities; this was **after** the October 21 legal report. Update the Cargo-specific and payment screening review against the current consolidated regulations. Do **not** infer that all personal documents or all Iran–Canada shipments are forbidden. [Global Affairs Canada amendments](https://www.international.gc.ca/world-monde/international_relations-relations_internationales/sanctions/iran-regulations-reglementations.aspx?lang=eng) · [Iran sanctions overview](https://www.international.gc.ca/world-monde/international_relations-relations_internationales/sanctions/iran.aspx?lang=eng).
- **Payment scope:** The Bank of Canada updated registration criteria June 29, 2026; **closed-loop and incidental** exemptions can be relevant, subject to actual coin/payment operations. [BoC PSP criteria](https://www.bankofcanada.ca/2026/06/criteria-for-registering-payment-service-providers/).
- **CASL:** Direct commercial messages in two-way social/instant messaging may be subject to CASL whereas a public one-way social post is not equivalent. Applicability depends on content, recipients and exceptions. [CRTC FAQ](https://crtc.gc.ca/eng/com500/faq500.htm).
- **Privacy requests:** In scope of PIPEDA, a normal individual-access response period is **30 calendar days**, with specific statutory exceptions/extensions. [OPC business guidance](https://www.priv.gc.ca/en/privacy-topics/accessing-personal-information/obligations-for-organizations/02_05_d_54_ati_02/).
- **Crawler:** Source information being public on the internet does not itself settle lawful reuse of personal information. [OPC web scraping joint statement](https://www.priv.gc.ca/en/opc-news/speeches-and-statements/2023/js-dc_20230824/).

## 4. Prioritized implementation/evidence map

| C-ID | Workstream | Evidence required before closure | Role (not a Jira assignee) |
|---|---|---|---|
| C-01 | Jurisdiction and privacy accountability | Signed factual jurisdiction memo, market list, appointed privacy lead | Management / Canadian Counsel |
| C-02 | Data flow and processors | Inventory of account, identity evidence, listings, chats, crawler, wallet, logs/backups, transfers | Engineering / Privacy |
| C-03, C-08 | Privacy/Terms/payment disclosures | Versioned final customer copy, approved notice/consent flows, proof of visibility in actual product | Product / Legal |
| C-04 | Crawler source rights | Source matrix, data types/usage grounds, complaint/removal workflow and tests | Operations / Privacy / Legal |
| C-05 | Data subject requests | Verified identity, access/correction/deletion/objection cases, logs and lawful retention exceptions | Engineering / Privacy |
| C-06 | Privacy incident response | Incident register, risk triage, notification decision and tabletop evidence | Security / Privacy |
| C-07 | Coins, charges, refunds | UI screenshots/test cases for prices, receipts, failed charges, ledger and refunds; RPAA/FINTRAC counsel decision | Product / Finance / Legal |
| C-09 | Bot/DM marketing | Message map with transactional vs marketing flows, consent evidence and opt-out tests | Marketing / Engineering |
| C-10 | Housing/Jobs/crawler trust | Moderation rules, restricted representations, flagged listings review, verified label consistency | Trust & Safety / Legal |
| C-11 | GST/HST | Accounting advice for corporate and supply model, correct receipts, record retention | Finance / Accountant |
| C-12 | Québec conditional | Written scope determination plus French, privacy and online contract checks *if applicable* | Management / Québec Counsel |
| C-13 | Cargo sanctions | November 5 sanctions update considered, prohibited items/actors policy and role-of-platform memo | Operations / Canadian Counsel |
| C-14 | Post-launch monitoring | Named owner, change-trigger and periodic tests after pre-launch controls | Privacy / Operations |

**Acceptance discipline:** Never mark implementation Done based solely on a research report. Require a corresponding real test/artifact and where needed legal approval. Distinguish **mandatory legal requirement**, **risk-reduction product recommendation**, **counsel-dependent determination**. Scope/priority are management recommendations, not universal legal mandates.

## 5. Existing work and governance

- [AD-32](https://advertio24.atlassian.net/browse/AD-32) is already Done for a privacy/data governance technical task, but its comment says the linked technical policy was **DRAFT / not legally reviewed**. Do not duplicate its original implementation; require separate customer-facing legal review and release evidence.
- [AD-10](https://advertio24.atlassian.net/browse/AD-10) concerns *research*. Compliance execution and formal launch sign-off must be recorded separately.
- If Jira project AD supports only the **Task** issue type, use a clearly labeled coordination Task plus **Relates** issue links until an administrator enables Epic or another parent hierarchy; do not pretend a Task is a real Epic.

**Research conclusion:** ready for owner review as a dated research handoff; **not** a legal opinion and **not** a statement that Advertio is production-compliant.