# Salty Blonde Bakery — Launch Readiness Audit

Audit date: 2026-10-04

## 1. Legacy Squarespace route coverage

| Existing public route/function | New destination | Status |
| --- | --- | --- |
| `/` | `/` | Native page |
| `/about` | `/about/` | Native page |
| `/menu` | `/menu/` | Native page |
| `/cinnamon-rolls-austin` | `/menu/#classic-cinnamon-roll` | 301 redirect |
| `/cookies-austin` | `/menu/#salted-brown-butter-chocolate-chip` | 301 redirect |
| `/preorder` | `/preorder/` | Native page + form |
| `/contact` | `/visit/` | 301 redirect |
| Squarespace cart `/cart` | `/order/` | 301 redirect; external ordering replaces Squarespace cart |
| Delivery CTA | `/order/` → Uber Eats / DoorDash | Native chooser |
| Directions | Google Maps destination | Preserved |
| Instagram | `@the.saltyblondebakery` | Preserved |

## 2. Product identity audit

The labeled Classics section was corrected to use verified product-specific photographs:

- Classic Cinnamon Roll — `Bake(2)/IMG_0934`
- Caramel Pecan Sticky Bun — `Bake(2)/IMG_1814`
- Salted Brown Butter Chocolate Chip — `Bake(2)/IMG_0937`
- The Hyde Park Cookie — `Bake(7)/IMG_0611`

The previous build incorrectly used a topped specialty roll / waffle-cone-style cookie / crumb-topped cookie imagery beside some classic product names. Those mappings are no longer used.

## 3. Patron-image audit

The two similar customer images are now used at most twice across the site:

- Home Visit preview
- About story

Visit uses food/location imagery instead of a third patron placement.

## 4. Pre-order capability

The current Squarespace pre-order page establishes these business rules, all preserved here:

- cookies by the dozen;
- cinnamon roll 4-packs;
- specialty baked goods / larger bakery orders when production allows;
- at least 48 hours notice for large pre-orders;
- submission is a request, not an automatic confirmation;
- bakery replies to confirm availability, timing, and total;
- pickup is the default; customers may ask whether delivery is possible;
- allergy preferences can be noted, but the kitchen handles common allergens.

The new `/preorder/` page includes a real HTML request form and a Cloudflare Pages Function at `/api/preorder`.

### Form fields
- name;
- email;
- phone;
- preferred pickup date;
- preferred pickup time;
- order type;
- order details / quantity;
- event/company/occasion;
- allergy/dietary notes;
- pickup vs ask-about-delivery;
- extra notes;
- required acknowledgment that the request is not confirmed yet.

The exact old Squarespace form field schema was not exposed in the public crawl, so this is a functional recreation based on the public pre-order workflow, not a claim that every field exactly matches Squarespace.

## 5. Form-delivery architecture

The site remains static Astro. The form posts to a Cloudflare Pages Function, which sends the request to the bakery using Cloudflare Email Service REST API.

No database is required. By default, submissions are not stored on the website; the email received by the bakery is the durable record.

Required Cloudflare Pages secrets/variables:

- `CF_ACCOUNT_ID`
- `CF_EMAIL_API_TOKEN`
- `PREORDER_FROM` (recommended: `preorders@saltyblondebakery.com`)
- `PREORDER_TO` (`saltyblondebakery@icloud.com`)

The iCloud destination should be verified in Cloudflare Email Routing / Email Service. The sender must use a Salty Blonde domain/routing domain accepted by Cloudflare Email Service.

## 6. Current ordering sources

The public site does not mirror live inventory. It hands current availability/pricing to:

- Uber Eats
- DoorDash

This is intentional and avoids stale website availability.

## 7. Remaining launch gates

Before DNS cutover:

1. Run the Astro production build successfully.
2. Deploy to a Cloudflare `pages.dev` staging URL.
3. Configure Cloudflare Email Service + Pages secrets.
4. Submit at least two real pre-order tests and verify the emails arrive and Reply-To targets the customer email.
5. Click-test all internal navigation and external order/directions/social links on staging.
6. Review Home/Menu/About/Visit/Pre-order/Order at desktop and mobile sizes.
7. Only then move the real domain to Cloudflare / attach it to Pages.
8. Keep the Squarespace site intact temporarily as rollback insurance.
