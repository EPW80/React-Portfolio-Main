import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { education, experience, profile, projects } from "../data/content";
import { SITE } from "../data/site";
import { render } from "../entry-server";
import { SEO_DESCRIPTION, SEO_TITLE } from "./copy";
import {
  AI_SEARCH_AGENTS,
  AI_TRAINING_AGENTS,
  VERIFIED_SITE_ORIGIN,
  buildSeoContext,
  normalizeSiteUrl,
  sanitizeLastmod,
} from "./env";
import { renderHeadTags } from "./html";
import { buildJsonLd, serializeJsonLd, supportedCredentials } from "./jsonld";
import { renderLlmsTxt } from "./llms";
import { renderRobotsTxt } from "./robots";
import { renderSitemap, sitemapLocs } from "./sitemap";

const production = () => buildSeoContext({ env: {}, command: "build" });
const preview = () =>
  buildSeoContext({ env: { VERCEL_ENV: "preview" }, command: "build" });

function typesIn(value, found = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => typesIn(item, found));
  } else if (value && typeof value === "object") {
    if (typeof value["@type"] === "string") found.push(value["@type"]);
    Object.values(value).forEach((item) => typesIn(item, found));
  }
  return found;
}

function keysIn(value, found = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => keysIn(item, found));
  } else if (value && typeof value === "object") {
    found.push(...Object.keys(value));
    Object.values(value).forEach((item) => keysIn(item, found));
  }
  return found;
}

describe("canonical URL", () => {
  it("uses the verified production origin and ignores fragments", () => {
    expect(production().siteUrl).toBe(`${VERIFIED_SITE_ORIGIN}/`);
    expect(
      normalizeSiteUrl(`${VERIFIED_SITE_ORIGIN}/#work?utm=1`)
    ).toBe(`${VERIFIED_SITE_ORIGIN}/`);
    expect(normalizeSiteUrl(`${VERIFIED_SITE_ORIGIN}/index.html`)).toBe(
      `${VERIFIED_SITE_ORIGIN}/`
    );
    expect(normalizeSiteUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeSiteUrl("not a url")).toBeNull();
  });

  it("refuses an invalid override instead of inventing a host", () => {
    expect(() =>
      buildSeoContext({ env: { VITE_SITE_URL: "notaurl" }, command: "build" })
    ).toThrow(/Refusing to invent/);
  });

  it("accepts an explicit absolute override", () => {
    const ctx = buildSeoContext({
      env: { VITE_SITE_URL: "https://example.com/portfolio/" },
      command: "build",
    });
    expect(ctx.siteUrl).toBe("https://example.com/portfolio");
  });
});

describe("indexing and robots", () => {
  it("keeps production builds indexable and allows crawling", () => {
    const ctx = production();
    expect(ctx.indexing).toBe("index");
    expect(ctx.robots).toBe("index, follow");
    const robots = renderRobotsTxt(ctx);
    expect(robots).toContain("User-agent: *\nAllow: /");
    expect(robots).not.toMatch(/User-agent: \*\nDisallow/);
    expect(robots).toContain(`Sitemap: ${ctx.siteUrl}sitemap.xml`);
    expect(robots).toContain("not access control");
    for (const agent of [...AI_TRAINING_AGENTS, ...AI_SEARCH_AGENTS]) {
      expect(robots).not.toContain(`User-agent: ${agent}`);
    }
  });

  it("noindexes previews without blocking crawlers from seeing noindex", () => {
    for (const env of [
      { VERCEL_ENV: "preview" },
      { VERCEL_ENV: "development" },
    ]) {
      const ctx = buildSeoContext({ env, command: "build" });
      expect(ctx.robots).toBe("noindex, follow");
      const robots = renderRobotsTxt(ctx);
      expect(robots).toContain("User-agent: *\nAllow: /");
      expect(robots).not.toContain("Sitemap:");
      expect(robots).not.toMatch(/User-agent: \*\nDisallow/);
    }
    expect(buildSeoContext({ env: {}, command: "serve" }).indexing).toBe(
      "noindex"
    );
  });

  it("lets an explicit indexing flag override the environment", () => {
    expect(
      buildSeoContext({
        env: { VERCEL_ENV: "preview", VITE_INDEXING: "index" },
        command: "build",
      }).indexing
    ).toBe("index");
    expect(
      buildSeoContext({
        env: { VERCEL_ENV: "production", VITE_INDEXING: "noindex" },
        command: "build",
      }).indexing
    ).toBe("noindex");
    expect(
      buildSeoContext({ env: { VERCEL_ENV: "production" }, command: "build" })
        .indexing
    ).toBe("index");
    expect(() =>
      buildSeoContext({ env: { VITE_INDEXING: "maybe" }, command: "build" })
    ).toThrow(/VITE_INDEXING/);
  });

  it("configures AI search and training crawlers separately", () => {
    const training = renderRobotsTxt(
      buildSeoContext({
        env: { VITE_AI_TRAINING_CRAWLERS: "disallow" },
        command: "build",
      })
    );
    expect(training).toContain("User-agent: GPTBot\nDisallow: /");
    expect(training).toContain("User-agent: Google-Extended\nDisallow: /");
    expect(training).not.toContain("User-agent: OAI-SearchBot");
    expect(training).toContain("User-agent: *\nAllow: /");

    const search = renderRobotsTxt(
      buildSeoContext({
        env: { VITE_AI_SEARCH_CRAWLERS: "disallow" },
        command: "build",
      })
    );
    expect(search).toContain("User-agent: OAI-SearchBot\nDisallow: /");
    expect(search).toContain("User-agent: PerplexityBot\nDisallow: /");
    expect(search).not.toContain("User-agent: GPTBot");
    expect(search).toContain("User-agent: *\nAllow: /");
  });
});

describe("sitemap", () => {
  it("lists only the canonical page and real lastmod values", () => {
    const ctx = buildSeoContext({
      env: {},
      command: "build",
      lastmod: "2026-11-07T08:45:04Z",
    });
    expect(sitemapLocs(ctx)).toEqual([ctx.siteUrl]);
    const xml = renderSitemap(ctx);
    expect(xml).toContain(`<loc>${ctx.siteUrl}</loc>`);
    expect(xml).toContain("<lastmod>2026-11-07</lastmod>");
    expect(xml).not.toContain("#");
    expect(xml).not.toContain("Erik-Williams-Resume.pdf");
    expect(xml).not.toContain("/work");
    expect(xml).not.toContain("index.html");
    expect(xml).not.toContain("og.jpg");
    expect(xml.match(/<loc>/g)).toHaveLength(1);
  });

  it("omits preview URLs and invented dates", () => {
    const xml = renderSitemap(preview());
    expect(xml).not.toContain("<loc>");
    expect(renderSitemap(production())).not.toContain("<lastmod>");
    expect(sanitizeLastmod("2026-02-31")).toBeUndefined();
    expect(sanitizeLastmod("yesterday")).toBeUndefined();
  });
});

describe("initial HTML metadata", () => {
  it("emits absolute canonical and social tags for production", () => {
    const ctx = production();
    const html = renderHeadTags(ctx);
    expect(html).toContain(`<title>${SEO_TITLE.replace("&", "&amp;")}</title>`);
    expect(html).toContain(`content="${SEO_DESCRIPTION}"`);
    expect(html).toContain(`<link rel="canonical" href="${ctx.siteUrl}" />`);
    expect(html).toContain(`<meta property="og:url" content="${ctx.siteUrl}" />`);
    expect(html).toContain(`<meta property="og:title" content="${SEO_TITLE.replace("&", "&amp;")}" />`);
    expect(html).toContain(`<meta property="og:image" content="${ctx.siteUrl}og.jpg" />`);
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(html).toContain('<meta name="robots" content="index, follow" />');
    expect(html).toContain('rel="preload" as="image" href="/img/erik.webp"');
    expect(html).not.toContain("noindex");
    expect(html).not.toContain("google-site-verification");
    expect(html).not.toContain("#work");
  });

  it("keeps the production canonical on noindex previews", () => {
    const ctx = preview();
    const html = renderHeadTags(ctx);
    expect(html).toContain('<meta name="robots" content="noindex, follow" />');
    expect(html).toContain(`href="${production().siteUrl}"`);
  });

  it("adds Search Console verification only when configured", () => {
    const html = renderHeadTags(
      buildSeoContext({
        env: { VITE_GOOGLE_SITE_VERIFICATION: "abc123" },
        command: "build",
      })
    );
    expect(html).toContain(
      '<meta name="google-site-verification" content="abc123" />'
    );
  });
});

describe("JSON-LD", () => {
  it("parses as a portfolio graph without invented entities", () => {
    const graph = buildJsonLd(
      buildSeoContext({ env: {}, command: "build", lastmod: "2026-11-07" })
    );
    expect(JSON.parse(serializeJsonLd(graph))).toEqual(graph);
    const top = graph["@graph"].map((node) => node["@type"]);
    expect(top).toEqual([
      "ProfilePage",
      "WebSite",
      "Person",
      ...projects.map(() => "CreativeWork"),
    ]);
    expect(top).not.toContain("Organization");
    expect(top).not.toContain("BreadcrumbList");
    expect(top).not.toContain("FAQPage");
    expect(top).not.toContain("Article");
    expect(typesIn(graph)).not.toContain("SearchAction");
    expect(typesIn(graph)).not.toContain("MedicalWebPage");

    const usedKeys = keysIn(graph);
    for (const banned of [
      "telephone",
      "address",
      "aggregateRating",
      "review",
      "award",
      "datePublished",
      "potentialAction",
    ]) {
      expect(usedKeys).not.toContain(banned);
    }

    const person = graph["@graph"].find((node) => node["@type"] === "Person");
    expect(person.sameAs).toEqual([SITE.githubUrl, SITE.linkedInUrl]);
    expect(person.jobTitle).toBe(profile.role);
    expect(person.email).toBe(`mailto:${SITE.email}`);
    expect(person.description).toBe(profile.paragraphs.join(" "));
    expect(profile.paragraphs[0].toLowerCase()).toContain(profile.role.toLowerCase());

    for (const credential of supportedCredentials) {
      expect(
        education.some((item) => item.detail.includes(credential.name))
      ).toBe(true);
      expect(
        education.some((item) => item.detail.includes(credential.school))
      ).toBe(true);
    }

    const employers = experience
      .filter((item) => /present/i.test(item.dates))
      .map((item) => item.company);
    expect(person.worksFor.map((item) => item.name)).toEqual(employers);
    expect(JSON.stringify(graph)).not.toContain("Cabana");

    const sugar = graph["@graph"].find((node) => node.name === "SugarMenu");
    expect(sugar.creativeWorkStatus).toBe("In progress");
    expect(sugar.url).toBe(
      projects.find((project) => project.title === "SugarMenu").live
    );

    const agentflow = graph["@graph"].find((node) => node.name === "AgentFlow");
    expect(agentflow.image).toBeUndefined();
    expect(agentflow.sameAs).toEqual([
      projects.find((project) => project.title === "AgentFlow").repo,
    ]);

    const faucet = graph["@graph"].find((node) => node.name === "Faucet");
    expect(faucet.image).toBe(`${VERIFIED_SITE_ORIGIN}/img/nft.webp`);

    const website = graph["@graph"].find((node) => node["@type"] === "WebSite");
    expect(website.potentialAction).toBeUndefined();
    expect(graph["@graph"].find((node) => node["@type"] === "ProfilePage").dateModified).toBe(
      "2026-11-07"
    );
    expect(
      buildJsonLd(production())["@graph"].find((node) => node["@type"] === "ProfilePage")
        .dateModified
    ).toBeUndefined();
  });

  it("escapes embedded markup", () => {
    expect(serializeJsonLd({ html: "</script><script>alert(1)</script>" })).not.toContain(
      "<"
    );
  });
});

describe("llms.txt", () => {
  it("summarizes public canonical content and labels the convention", () => {
    const text = renderLlmsTxt(production());
    expect(text).toContain("experimental convention");
    expect(text).toContain("does not guarantee");
    expect(text).toContain(`Canonical: ${production().siteUrl}`);
    expect(text).toContain("not separate URLs");
    expect(text).toContain(SITE.email);
    expect(text).toContain(SITE.linkedInUrl);
    for (const project of projects) {
      expect(text).toContain(project.title);
      expect(text).toContain(project.description);
    }
    expect(text).toContain("In progress");
    expect(text).not.toContain("telephone");
  });

  it("does not publish the corpus for a noindex deployment", () => {
    const text = renderLlmsTxt(preview());
    expect(text).toContain("not indexable");
    expect(text).toContain(production().siteUrl);
    expect(text).toContain("experimental convention");
    expect(text).not.toContain("AgentFlow");
    expect(text).not.toContain(projects[0].live);
  });
});

describe("prerendered document", () => {
  it("includes one h1 and the primary copy before client JavaScript", () => {
    const html = render();
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain('id="main"');
    expect(html).toContain(profile.paragraphs[0]);
    expect(html).toContain(projects[0].title);
    expect(html).toContain('href="#work"');
    expect(html).not.toContain('href="/work"');
    expect(html).toContain("Portrait of Erik Parra Williams");
    expect(html).toContain("Faucet interface with donate and withdraw actions");
  });
});

describe("checked-in SEO files", () => {
  it("matches the production head and does not noindex the public page", () => {
    const source = fs.readFileSync("index.html", "utf8");
    const match = source.match(/<!--seo:start-->([\s\S]*?)<!--seo:end-->/);
    expect(match).toBeTruthy();
    expect(match[1].trim()).toBe(renderHeadTags(production()).trim());
    expect(source).not.toContain("fonts.googleapis.com");
    expect(source).not.toContain("noindex");
  });

  it("ships a real 404 without a canonical or sitemap entry", () => {
    const html = fs.readFileSync("public/404.html", "utf8");
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain('content="noindex, follow"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain("application/ld+json");
    expect(html).toContain('href="/#work"');
    expect(html).not.toContain('href="/work"');
  });

  it("redirects /index.html on Vercel without forcing noindex", () => {
    const config = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
    expect(config.redirects).toEqual([
      { source: "/index.html", destination: "/", permanent: true },
    ]);
    expect(JSON.stringify(config)).not.toContain("X-Robots-Tag");
    expect(JSON.stringify(config)).not.toContain("noindex");
  });

  it("does not keep a second static robots.txt", () => {
    expect(fs.existsSync("public/robots.txt")).toBe(false);
    expect(fs.existsSync("public/og.jpg")).toBe(true);
    expect(fs.existsSync("public/fonts/figtree-latin.woff2")).toBe(true);
    expect(fs.existsSync("public/fonts/bricolage-grotesque-latin.woff2")).toBe(true);
  });
});
