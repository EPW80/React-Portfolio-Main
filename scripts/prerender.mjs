import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const indexPath = path.join(root, "dist/index.html");
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const appHtml = render();
  let html = fs.readFileSync(indexPath, "utf8");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) {
    throw new Error("dist/index.html is missing an empty #root");
  }
  html = html.replace(marker, `<div id="root">${appHtml}</div>`);

  const stylesheet = html.match(
    /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)">/
  );
  if (stylesheet) {
    const css = fs.readFileSync(
      path.join(root, "dist", stylesheet[1].replace(/^\//, "")),
      "utf8"
    );
    html = html.replace(stylesheet[0], `<style>${css}</style>`);
  }

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    throw new Error(`Expected exactly one H1 in prerendered HTML, found ${h1Count}`);
  }
  for (const needle of [
    'rel="canonical"',
    'property="og:title"',
    'property="og:image"',
    "application/ld+json",
    'id="main"',
  ]) {
    if (!html.includes(needle)) {
      throw new Error(`Prerendered HTML is missing ${needle}`);
    }
  }
  if (html.includes('href="/work"')) {
    throw new Error("Prerendered HTML invented a /work route");
  }

  fs.writeFileSync(indexPath, html);

  for (const file of ["robots.txt", "sitemap.xml", "llms.txt", "404.html", "og.jpg"]) {
    if (!fs.existsSync(path.join(root, "dist", file))) {
      throw new Error(`dist/${file} was not emitted`);
    }
  }
  console.log("Prerendered dist/index.html");
} finally {
  await vite.close();
}
