// scripts/generate-sitemap.js
// Writes sitemap into dist/sitemap.xml so Netlify publishes it.
const fs = require('fs');
const path = require('path');

const SITE_URL = (process.env.SITE_URL || 'https://techfy3.netlify.app').replace(/\/$/, '');
const pages = [
  '/',
  '/tools/resize/',
  '/tools/crop/',
  '/tools/compress/',
  '/privacy/',
  '/terms/'
];

const now = new Date().toISOString();
const items = pages.map(p => `
  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;

const outDir = path.join(__dirname, '..', 'dist');
const outPath = path.join(outDir, 'sitemap.xml');

try {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log('Sitemap written to', outPath);
} catch (err) {
  console.error('Failed to write sitemap:', err);
  process.exit(1);
}
