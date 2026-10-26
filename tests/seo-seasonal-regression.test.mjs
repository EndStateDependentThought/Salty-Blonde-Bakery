import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = (relative) => readFile(path.join(root, relative), 'utf8');

test('seasonal feature is wired to home and menu with all four fall products', async () => {
  const [home, menu, seasonal, component] = await Promise.all([
    read('src/pages/index.astro'),
    read('src/pages/menu.astro'),
    read('src/data/seasonal.ts'),
    read('src/components/shared/SeasonalFeature.astro'),
  ]);

  assert.match(home, /<SeasonalFeature\s*\/>/);
  assert.match(menu, /<SeasonalFeature compact=\{true\}\s*\/>/);
  for (const product of ['Apple Pie Crumble Roll', 'Apple Cider Cookie', 'Pumpkin Spice Cinnamon Roll', 'Punk’n Pie Cookie']) {
    assert.ok(seasonal.includes(product), `missing seasonal product: ${product}`);
  }
  assert.match(component, /See what’s baking today/);
  assert.match(component, /Fall and Thanksgiving bakery specials/);
});

test('seasonal source images exist and remain lightweight', async () => {
  const files = [
    'src/assets/images/seasonal/apple-pie-crumble-roll.jpg',
    'src/assets/images/seasonal/apple-cider-cookie.jpg',
    'src/assets/images/seasonal/pumpkin-spice-cinnamon-roll.jpg',
    'src/assets/images/seasonal/punk-n-pie-cookie.jpg',
  ];

  for (const file of files) {
    const info = await stat(path.join(root, file));
    assert.ok(info.size > 100_000, `${file} unexpectedly tiny`);
    assert.ok(info.size < 750_000, `${file} is too large for the source bundle`);
  }
});

test('high-impression local search themes are represented naturally in key page metadata', async () => {
  const [home, rolls, cookies, visit, reviews] = await Promise.all([
    read('src/pages/index.astro'),
    read('src/pages/cinnamon-rolls-austin.astro'),
    read('src/pages/cookies-austin.astro'),
    read('src/pages/visit.astro'),
    read('src/components/home/ReviewProof.astro'),
  ]);

  assert.match(home, /Austin Bakery for Cinnamon Rolls & Cookies/);
  assert.match(home, /seasonal desserts/i);
  assert.match(rolls, /Cinnamon Rolls in Austin/);
  assert.match(cookies, /Cookies in Austin/);
  assert.match(visit, /Austin Bakery in Hyde Park/);
  assert.match(reviews, /Salty Blonde Bakery reviews/);
  assert.match(reviews, /best cinnamon rolls in Austin/);
});

test('structured data strengthens local identity without self-serving review markup', async () => {
  const layout = await read('src/layouts/SiteLayout.astro');
  assert.match(layout, /'@type': 'Bakery'/);
  assert.match(layout, /menu: new URL\('\/menu\/'/);
  assert.match(layout, /hasMap: businessConfig\.directionsUrl/);
  assert.match(layout, /'@type': 'WebSite'/);
  assert.match(layout, /alternateName: businessConfig\.shortName/);
  assert.doesNotMatch(layout, /AggregateRating|aggregateRating|reviewRating/);
});

test('canonical SEO routes and legacy redirects remain intact', async () => {
  const [sitemap, redirects] = await Promise.all([
    read('src/pages/sitemap.xml.ts'),
    read('public/_redirects'),
  ]);

  for (const route of ['/', '/menu/', '/cinnamon-rolls-austin/', '/cookies-austin/', '/about/', '/visit/', '/preorder/', '/order/']) {
    assert.ok(sitemap.includes(`'${route}'`), `sitemap missing ${route}`);
  }
  for (const rule of ['/home / 301', '/shop /menu/ 301', '/contact /visit/ 301', '/cart /order/ 301']) {
    assert.ok(redirects.includes(rule), `redirect missing: ${rule}`);
  }
});


test('public review ratings match the current October 26 snapshot', async () => {
  const reviews = await read('src/data/reviews.ts');
  for (const [platform, rating] of [
    ['Google', '5.0'],
    ['Yelp', '5.0'],
    ['Uber Eats', '4.8'],
    ['DoorDash', '4.8'],
  ]) {
    const pattern = new RegExp(`name: '${platform}',\\s+rating: '${rating.replace('.', '\\.')}'`);
    assert.match(reviews, pattern, `${platform} rating is not ${rating}`);
  }
});
