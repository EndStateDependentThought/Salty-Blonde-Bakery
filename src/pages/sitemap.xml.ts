import type { APIRoute } from 'astro';
import { businessConfig } from '../config/business';

const pages = [
  '/',
  '/menu/',
  '/cinnamon-rolls-austin/',
  '/cookies-austin/',
  '/about/',
  '/visit/',
  '/preorder/',
  '/order/',
];

export const GET: APIRoute = () => {
  const urls = pages.map((path) => `  <url><loc>${businessConfig.siteUrl}${path}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
