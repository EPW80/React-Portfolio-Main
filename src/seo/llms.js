import {
  education,
  experience,
  profile,
  projects,
  skills,
} from "../data/content.js";
import { SITE } from "../data/site.js";
import { SEO_DESCRIPTION } from "./copy.js";

const EXPERIMENTAL =
  "llms.txt is an experimental convention for a concise crawlable summary. It is not a ranking signal and does not guarantee that any AI system will cite this site.";

export function renderLlmsTxt(ctx) {
  if (ctx.indexing !== "index") {
    return [
      `# ${SITE.name}`,
      "",
      `> ${EXPERIMENTAL}`,
      "",
      "This deployment is not indexable (local development, a preview build, or an explicit noindex build).",
      "Do not treat this host as the canonical source.",
      `Canonical site: ${ctx.siteUrl}`,
      "",
      "The public summary is published from the canonical host only when indexing is enabled.",
      "",
    ].join("\n");
  }

  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${EXPERIMENTAL}`,
    "",
    SEO_DESCRIPTION,
    "",
    `Canonical: ${ctx.siteUrl}`,
    "",
    "## Pages",
    `- ${ctx.siteUrl} is the only canonical page.`,
    "- Work, about, resume, and contact are sections on that page (#work, #about, #resume, #contact), not separate URLs.",
    "",
    "## Identity",
    `- Name: ${SITE.name}`,
    `- Role: ${profile.role}`,
    `- Email: ${SITE.email}`,
    `- GitHub: ${SITE.githubUrl}`,
    `- LinkedIn: ${SITE.linkedInUrl}`,
    ...education.map((item) => `- ${item.label}: ${item.detail}`),
    "",
    "## Summary",
    ...profile.paragraphs,
    "",
    `Focus: ${profile.lede}`,
    "",
    "## Experience",
    ...experience.map(
      (item) =>
        `- ${item.role}, ${item.company} (${item.dates}): ${item.summary}`
    ),
    "",
    "## Skills",
    ...skills.map((skill) => `- ${skill}`),
    "",
    "## Selected work",
  ];

  for (const project of projects) {
    const status = project.status ? ` (${project.status})` : "";
    lines.push(`- ${project.title}${status}: ${project.description}`);
    if (project.live) lines.push(`  Live: ${project.live}`);
    if (project.repo) lines.push(`  Repository: ${project.repo}`);
  }

  lines.push(
    "",
    "## Resume",
    `- PDF: ${ctx.siteUrl}${SITE.resumePdf}`,
    "",
    "## Contact",
    `- Email: ${SITE.email}`,
    "- A contact form is on the canonical page.",
    ""
  );

  return lines.join("\n");
}
