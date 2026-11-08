import { SITE } from "../data/site.js";
import {
  HERO_IMAGE_ALT,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_SOCIAL_DESCRIPTION,
  SEO_TITLE,
  SHARE_IMAGE_ALT,
} from "./copy.js";
import { withBase } from "./env.js";
import { buildJsonLd, serializeJsonLd } from "./jsonld.js";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function shareImageUrl(ctx) {
  return new URL("og.jpg", ctx.siteUrl).href;
}

export function heroImageUrl(ctx) {
  return withBase(ctx.baseUrl, "img/erik.webp");
}

export function renderHeadTags(ctx) {
  const image = shareImageUrl(ctx);
  const lines = [
    `<title>${escapeHtml(SEO_TITLE)}</title>`,
    `<meta name="description" content="${escapeHtml(SEO_DESCRIPTION)}" />`,
    `<meta name="author" content="${escapeHtml(SITE.name)}" />`,
    `<meta name="keywords" content="${escapeHtml(SEO_KEYWORDS)}" />`,
    `<meta name="robots" content="${escapeHtml(ctx.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(ctx.siteUrl)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(SEO_TITLE)}" />`,
    `<meta property="og:description" content="${escapeHtml(SEO_SOCIAL_DESCRIPTION)}" />`,
    `<meta property="og:url" content="${escapeHtml(ctx.siteUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(SHARE_IMAGE_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(SEO_TITLE)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(SEO_SOCIAL_DESCRIPTION)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(SHARE_IMAGE_ALT)}" />`,
    `<link rel="preload" as="image" href="${escapeHtml(heroImageUrl(ctx))}" fetchpriority="high" />`,
  ];

  if (ctx.verification) {
    lines.push(
      `<meta name="google-site-verification" content="${escapeHtml(ctx.verification)}" />`
    );
  }

  lines.push(
    `<script type="application/ld+json">${serializeJsonLd(buildJsonLd(ctx))}</script>`
  );

  return lines.join("\n    ");
}
