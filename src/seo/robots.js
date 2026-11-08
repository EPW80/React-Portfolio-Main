import { AI_SEARCH_AGENTS, AI_TRAINING_AGENTS } from "./env.js";

function agentBlock(agents) {
  return agents
    .map((agent) => `User-agent: ${agent}\nDisallow: /`)
    .join("\n\n");
}

export function renderRobotsTxt(ctx) {
  const lines = [
    "# robots.txt is not access control.",
    "# Crawling stays allowed for User-agent: * so a noindex directive can be seen.",
    "# Disallowing * would hide that directive and is not used for previews.",
    "# AI search and AI training policies are separate and default to allow,",
    "# which matches the previous public robots.txt. Set VITE_AI_SEARCH_CRAWLERS",
    "# or VITE_AI_TRAINING_CRAWLERS to disallow to opt out of those bots only.",
    "",
  ];

  if (ctx.aiTraining === "disallow") {
    lines.push(agentBlock(AI_TRAINING_AGENTS), "");
  }
  if (ctx.aiSearch === "disallow") {
    lines.push(agentBlock(AI_SEARCH_AGENTS), "");
  }

  lines.push("User-agent: *", "Allow: /", "");

  if (ctx.indexing === "index") {
    lines.push(`Sitemap: ${ctx.siteUrl}sitemap.xml`, "");
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}
