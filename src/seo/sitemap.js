function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function sitemapLocs(ctx) {
  if (ctx.indexing !== "index") return [];
  return [ctx.siteUrl];
}

export function renderSitemap(ctx) {
  const urls = sitemapLocs(ctx)
    .map((loc) => {
      const lastmod = ctx.lastmod
        ? `\n    <lastmod>${escapeXml(ctx.lastmod)}</lastmod>`
        : "";
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}${urls ? "\n" : ""}</urlset>\n`;
}
