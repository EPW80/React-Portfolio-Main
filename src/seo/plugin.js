import fs from "node:fs";
import path from "node:path";
import { buildSeoContext } from "./env.js";
import { renderHeadTags } from "./html.js";
import { readContentLastmod } from "./lastmod.js";
import { renderLlmsTxt } from "./llms.js";
import { renderRobotsTxt } from "./robots.js";
import { renderSitemap } from "./sitemap.js";

function contextFromPlugin(plugin) {
  return buildSeoContext({
    env: plugin.env,
    command: plugin.command,
    lastmod: plugin.lastmod,
    baseUrl: plugin.baseUrl,
  });
}

function applySeoBlock(html, ctx) {
  const block = renderHeadTags(ctx);
  const wrapped = `<!--seo:start-->\n    ${block}\n    <!--seo:end-->`;
  if (html.includes("<!--seo:start-->")) {
    return html.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, wrapped);
  }
  return html.replace("</head>", `    ${wrapped}\n  </head>`);
}

export function portfolioSeoPlugin() {
  const state = {
    command: "build",
    env: process.env,
    lastmod: undefined,
    baseUrl: "/",
    outDir: "dist",
  };

  return {
    name: "portfolio-seo",
    configResolved(config) {
      state.command = config.command;
      state.baseUrl = config.base;
      state.outDir = path.resolve(config.root, config.build.outDir);
      state.env = { ...process.env, ...config.env };
      state.lastmod = readContentLastmod();
    },
    transformIndexHtml(html) {
      return applySeoBlock(html, contextFromPlugin(state));
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        const ctx = buildSeoContext({
          env: { ...process.env, ...state.env },
          command: "serve",
          lastmod: state.lastmod,
          baseUrl: state.baseUrl,
        });

        if (url === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(renderRobotsTxt(ctx));
          return;
        }
        if (url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(renderSitemap(ctx));
          return;
        }
        if (url === "/llms.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(renderLlmsTxt(ctx));
          return;
        }
        next();
      });
    },
    closeBundle() {
      if (state.command !== "build") return;
      const ctx = contextFromPlugin(state);
      fs.mkdirSync(state.outDir, { recursive: true });
      fs.writeFileSync(path.join(state.outDir, "robots.txt"), renderRobotsTxt(ctx));
      fs.writeFileSync(path.join(state.outDir, "sitemap.xml"), renderSitemap(ctx));
      fs.writeFileSync(path.join(state.outDir, "llms.txt"), renderLlmsTxt(ctx));
    },
  };
}
