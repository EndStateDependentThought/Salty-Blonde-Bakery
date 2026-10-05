# Salty Blonde Bakery — Staging & Migration Guide

This project is designed to be a separate Cloudflare Pages project in the same Cloudflare account as any other sites you own. It does **not** require a second Cloudflare account or a new domain.

## The four pieces are separate

- **Domain registration:** `saltyblondebakery.com` may remain registered with Squarespace.
- **DNS:** can move to Cloudflare when ready.
- **Website hosting:** Cloudflare Pages serves the Astro build.
- **Ordering:** Uber Eats and DoorDash remain the live transactional menus.

The pre-order form adds one serverless component: `functions/api/preorder.js`. It emails a fixed, verified bakery destination through Cloudflare Email Service.

## Safe migration order

1. **Local verification**
   - Extract to a fresh folder.
   - `npm.cmd install`
   - `npm.cmd run build`
   - `npm.cmd run dev`
   - Review Home, Menu, About, Visit, Pre-order, Order, and mobile navigation.

2. **GitHub**
   - Create a separate repository such as `salty-blonde-bakery` in your existing GitHub account.
   - Commit this project and push `main`.
   - There is no need to mix this repository with Less Confused.

3. **Cloudflare staging**
   - In the existing Cloudflare account, create a **new Pages project** from the bakery repository.
   - Build command: `npm run build`
   - Build output: `dist`
   - Production branch: `main`
   - Review the generated `*.pages.dev` URL first. This does not alter the live Squarespace website.

4. **Move DNS to Cloudflare without moving the website yet**
   - Add `saltyblondebakery.com` as a zone in the same Cloudflare account.
   - Copy/verify every existing Squarespace DNS record before changing nameservers. This includes website records and any MX/TXT/verification records.
   - Change nameservers at the Squarespace registrar to the two Cloudflare nameservers.
   - Keep the website DNS records pointing to Squarespace at this stage. The old Squarespace site can remain live while Cloudflare becomes the DNS provider.

5. **Configure pre-order email**
   - In Cloudflare Email Service, verify `saltyblondebakery@icloud.com` as a destination address.
   - Configure/onboard `saltyblondebakery.com` for the sending address used by the form, e.g. `preorders@saltyblondebakery.com`.
   - Create an API token with Email Sending permission.
   - In the Pages project, add:
     - `CF_ACCOUNT_ID`
     - `CF_EMAIL_API_TOKEN` (encrypted secret)
     - `PREORDER_FROM=preorders@saltyblondebakery.com`
     - `PREORDER_TO=saltyblondebakery@icloud.com`
   - Redeploy and submit test requests from the staging site.
   - Confirm the email arrives and Reply goes to the customer's submitted email.

6. **Final pre-launch audit on staging**
   - Test all navigation and footer links.
   - Test `/menu/` product labels/images.
   - Test Uber Eats and DoorDash destinations.
   - Test `/preorder/` success and error paths.
   - Test phone, email, Instagram, and directions.
   - Test legacy routes in `public/_redirects` after Cloudflare deployment.
   - Review desktop and mobile.

7. **Website cutover**
   - Add `saltyblondebakery.com` and `www.saltyblondebakery.com` under Pages -> Custom domains.
   - Let Cloudflare create/update the website DNS records for Pages.
   - Do **not** cancel Squarespace yet.

8. **Post-launch**
   - Verify the public domain, HTTPS, form delivery, external order links, and redirects.
   - Keep Squarespace intact for a short rollback window.
   - Once stable, cancel only the Squarespace website subscription if it is no longer needed. Keep the domain registration unless you intentionally decide to transfer it later.

## Important limitations

- The website does not automatically mirror live Uber Eats/DoorDash inventory. Those platforms remain the source of truth for today's availability and prices.
- The pre-order form is a **request**, not checkout or automatic order confirmation.
- Form submissions are delivered by email; there is no order dashboard/database in v1.
- `npm run dev` tests the Astro front end. The Cloudflare Pages Function is best validated on the deployed Pages staging URL after its secrets are configured.
- Do not commit real API tokens or secrets. Use Cloudflare Variables and Secrets.
