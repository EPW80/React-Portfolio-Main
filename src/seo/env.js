/**
 * Canonical host verified from this repo, not invented here:
 * - README "Live site"
 * - index.html canonical / Open Graph URL
 * - GitHub repository website field
 * - live HTTPS response serving this Vite build
 *
 * VITE_SITE_URL overrides this when a real custom domain is attached.
 * Do not set it to a preview hostname.
 */
export const VERIFIED_SITE_ORIGIN =
  "https://react-portfolio-main-erik-williams-projects.vercel.app";

/** Training / dataset crawlers. Opt-in block only. Not Google Search. */
export const AI_TRAINING_AGENTS = [
  "GPTBot",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
  "ClaudeBot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Bytespider",
  "Diffbot",
];

/** AI search and user-triggered fetchers. Separate from training crawlers. */
export const AI_SEARCH_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];

export function normalizeSiteUrl(input) {
  const raw = String(input ?? "").trim();
  if (!raw) return null;

  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  url.hash = "";
  url.search = "";
  const pathname = url.pathname.replace(/\/index\.html$/i, "/") || "/";
  if (pathname === "/") return `${url.origin}/`;

  const trimmed = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return `${url.origin}${trimmed}`;
}

function crawlFlag(value) {
  const flag = String(value ?? "").trim().toLowerCase();
  if (["disallow", "block", "deny", "no"].includes(flag)) return "disallow";
  return "allow";
}

export function resolveIndexing(env, command) {
  const explicit = String(env.VITE_INDEXING ?? "").trim().toLowerCase();
  if (explicit === "index" || explicit === "noindex") return explicit;
  if (explicit) {
    throw new Error(
      `VITE_INDEXING must be "index" or "noindex" (received ${explicit}).`
    );
  }

  if (command === "serve" || command === "development") return "noindex";

  const vercelEnv = String(env.VERCEL_ENV ?? "").trim().toLowerCase();
  if (vercelEnv === "preview" || vercelEnv === "development") return "noindex";

  return "index";
}

export function resolveSiteUrl(env) {
  const override = String(env.VITE_SITE_URL ?? "").trim();
  if (!override) return normalizeSiteUrl(VERIFIED_SITE_ORIGIN);

  const normalized = normalizeSiteUrl(override);
  if (!normalized) {
    throw new Error(
      "VITE_SITE_URL is set but is not a valid absolute http(s) URL. Refusing to invent a canonical host."
    );
  }
  return normalized;
}

export function sanitizeLastmod(value) {
  if (!value) return undefined;
  const match = String(value).trim().match(/^(\d{4}-\d{2}-\d{2})/);
  if (!match) return undefined;

  const [year, month, day] = match[1].split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return undefined;
  }
  return match[1];
}

export function withBase(baseUrl = "/", assetPath = "") {
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${base}${String(assetPath).replace(/^\//, "")}`;
}

export function buildSeoContext({
  env = {},
  command = "build",
  lastmod,
  baseUrl = "/",
} = {}) {
  const indexing = resolveIndexing(env, command);
  return {
    siteUrl: resolveSiteUrl(env),
    indexing,
    robots: indexing === "index" ? "index, follow" : "noindex, follow",
    aiSearch: crawlFlag(env.VITE_AI_SEARCH_CRAWLERS),
    aiTraining: crawlFlag(env.VITE_AI_TRAINING_CRAWLERS),
    verification: String(env.VITE_GOOGLE_SITE_VERIFICATION ?? "").trim(),
    lastmod: sanitizeLastmod(lastmod),
    baseUrl: baseUrl || "/",
  };
}
