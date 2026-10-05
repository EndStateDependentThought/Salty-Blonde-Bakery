# Salty Blonde — current Cloudflare Workers deployment

This project targets Cloudflare's current Workers + Static Assets workflow, not legacy Pages.

## Build/deploy settings

- Project name: `salty-blonde-bakery`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: leave Cloudflare's current default if offered; otherwise `npx wrangler versions upload`
- Root directory: repository root / blank

`wrangler.jsonc` is authoritative for the Worker entry point and static asset directory.

## Architecture

- Astro statically builds the public site to `dist/`.
- Workers Static Assets serves `dist/` directly.
- Only `/api/*` invokes the Worker first.
- `worker/index.js` owns `/api/preorder`.
- `public/_headers` and `public/_redirects` are copied into `dist/` and are supported by Workers Static Assets.

## Runtime variables/secrets

Configure these in the Worker settings before testing the preorder form:

- `CF_ACCOUNT_ID`
- `CF_EMAIL_API_TOKEN` (secret)
- `PREORDER_FROM`
- `PREORDER_TO`

## Local validation

```powershell
npm.cmd install
npm.cmd run build
npx.cmd wrangler dev
```

The ordinary Astro UI dev server remains:

```powershell
npm.cmd run dev
```

Use `wrangler dev` when you need to exercise `/api/preorder` locally.
