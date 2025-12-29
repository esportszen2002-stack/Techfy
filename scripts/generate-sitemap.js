// Simple sitemap generator (node). Run: node scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const SITE_URL = process.env.SITE_URL || 'https://www.example.com';
const pages = ['/', '/tools/resize/', '/tools/crop/', '/tools/compress/'];
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
const out = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, xml, 'utf8');
console.log('Sitemap generated:', out);
