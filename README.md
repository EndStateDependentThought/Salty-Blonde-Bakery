# Salty Blonde Bakery — Launch Audit Candidate

This is the audited continuation of the approved **Phase 5C / Living Bake Wall** site.

The visual direction is preserved. This snapshot focuses on launch correctness: verified menu-product photography, de-duplicated patron imagery, recreation of the pre-order workflow, legacy-route coverage, and deployment readiness.

## Pages

- `/` — Home
- `/menu/` — durable "what we bake" menu + live ordering handoff
- `/about/` — bakery story + process
- `/visit/` — address, hours, directions, contact
- `/preorder/` — larger-order information + pre-order request form
- `/order/` — Uber Eats / DoorDash chooser
- `/404.html` — custom not-found page

## Run locally

Node 22.12+ is required.

PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Production compiler check:

```powershell
npm.cmd run build
npm.cmd run preview
```

Astro writes the static output to `dist/`.

### Important local-form limitation

`npm run dev` serves Astro, but Cloudflare Pages Functions are a deployment/runtime feature. The pre-order page and client-side validation can be reviewed locally; actual email delivery should be tested on the Cloudflare staging deployment after the form environment variables are configured.

## Product-image corrections

Explicitly labeled menu classics now use verified product-specific photos from the supplied archive:

- Classic Cinnamon Roll — `Bake(2)/IMG_0934`
- Caramel Pecan Sticky Bun — `Bake(2)/IMG_1814`
- Salted Brown Butter Chocolate Chip — `Bake(2)/IMG_0937`
- The Hyde Park Cookie — `Bake(7)/IMG_0611`

See `IMAGE_CURATION_FINAL.md` for the complete image map.

## Pre-order form

The site now has a real `/preorder/` page and a Cloudflare Pages Function:

```text
functions/api/preorder.js
```

The function does not require a database. It emails the request to the bakery through Cloudflare Email Service and uses the customer email as Reply-To.

### Cloudflare Pages environment variables / secrets

Configure these on the Pages project for Preview and Production:

```text
CF_ACCOUNT_ID       your Cloudflare account ID
CF_EMAIL_API_TOKEN  secret API token with Email Sending permission
PREORDER_FROM       preorders@saltyblondebakery.com
PREORDER_TO         saltyblondebakery@icloud.com
```

Do not commit the API token to GitHub.

### Cloudflare Email setup

Before the form can deliver real email:

1. `saltyblondebakery.com` must be added to the same Cloudflare account as a DNS zone.
2. In Cloudflare Email Service / Email Routing, verify `saltyblondebakery@icloud.com` as a destination address.
3. Configure/onboard a Salty Blonde sending/routing domain so `PREORDER_FROM` is valid (recommended `preorders@saltyblondebakery.com`).
4. Create a scoped Cloudflare API token with Email Sending permission.
5. Add the four variables above to the Pages project.
6. Redeploy the Pages project.
7. Send a real test submission from the `pages.dev` staging site and confirm receipt.

The form deliberately treats a submission as a **request**, not a confirmed order.

## Cloudflare Pages deployment

Use a separate Pages project for Salty Blonde. It can live in the same Cloudflare account as another website/project.

- Framework: Astro
- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node: 22.12+

You do **not** need another domain. The existing `saltyblondebakery.com` domain can remain registered at Squarespace while Cloudflare handles DNS and the Pages site handles hosting.

## Legacy route coverage

`public/_redirects` preserves known old Squarespace paths:

- `/contact` → `/visit/`
- `/cookies-austin` → `/menu/#salted-brown-butter-chocolate-chip`
- `/cinnamon-rolls-austin` → `/menu/#classic-cinnamon-roll`
- `/cart` → `/order/`

`/preorder/` is now a real native page rather than a redirect.

## Operational content sources

Editable facts are centralized:

- `src/config/business.ts` — address, hours, contact, directions, pre-order policy
- `src/config/ordering.ts` — Uber Eats / DoorDash links
- `src/config/site.ts` — navigation
- `src/data/menu.ts` — durable labeled classics
- `src/data/images.ts` — archive mapping, alt text, focal points

The website intentionally does not claim live inventory. Uber Eats and DoorDash remain the operational source for current availability/pricing.

## Launch checklist

See `LAUNCH_AUDIT.md` for the route/function audit.

Minimum publish gate:

1. `npm.cmd run build` succeeds.
2. Cloudflare Pages staging deploy succeeds.
3. Every page works at desktop + mobile.
4. Uber Eats, DoorDash, directions, Instagram, email and phone links are click-tested.
5. Pre-order form sends a real email successfully.
6. Reply-To on that email points to the test customer address.
7. Known legacy URLs redirect correctly.
8. Business hours/contact details are confirmed on launch day.
9. Only then attach/cut over `saltyblondebakery.com`.
10. Keep Squarespace intact for a short rollback window after launch.

## Design guardrail

Do not clean the approved visual system back into sparse editorial modules.

**Bakery first, designed website second** — immediate food, abundance, lavender identity, Playfair Display + Karla, real process, and Hyde Park character.

## Launch audit additions

- Verified classic product imagery is under `src/assets/images/menu-verified/` and documented in `IMAGE_CURATION_FINAL.md`.
- Visual verification sheet: `docs/menu-verified-contact-sheet.jpg`.
- Native pre-order request page: `/preorder/`.
- Cloudflare Pages Function: `functions/api/preorder.js`.
- Full migration walkthrough: `DEPLOYMENT_GUIDE.md`.
- Audit record: `LAUNCH_AUDIT.md`.

## Cloudflare deployment target (October 2026)

This snapshot targets the current **Cloudflare Workers + Static Assets** workflow, not legacy Pages. See `WORKERS_DEPLOYMENT.md` and `wrangler.jsonc`. The pre-order endpoint is implemented in `worker/index.js` at `/api/preorder`.
