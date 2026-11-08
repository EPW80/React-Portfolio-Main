import { experience, profile, projects, skills } from "../data/content.js";
import { SITE } from "../data/site.js";
import { SEO_DESCRIPTION, SEO_TITLE } from "./copy.js";

export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function credential(entry) {
  return {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: entry.category,
    name: entry.name,
    recognizedBy: {
      "@type": entry.organizationType,
      name: entry.school,
    },
  };
}

const DEGREE = {
  category: "degree",
  name: "B.S. Computer Science",
  school: "California State University, Fullerton",
  organizationType: "CollegeOrUniversity",
};

const CERTIFICATE = {
  category: "certificate",
  name: "Full-Stack Web Development",
  school: "UCLA Extension",
  organizationType: "EducationalOrganization",
};

export const supportedCredentials = [DEGREE, CERTIFICATE];

function projectNode(project, siteUrl, personId) {
  const node = {
    "@type": "CreativeWork",
    "@id": `${siteUrl}#project-${project.id}`,
    name: project.title,
    description: project.description,
    author: { "@id": personId },
  };

  if (project.tags?.length) node.keywords = project.tags.join(", ");
  if (project.live) node.url = project.live;
  else if (project.repo) node.url = project.repo;
  if (project.live && project.repo) node.sameAs = [project.repo];
  if (project.status) node.creativeWorkStatus = project.status;
  if (project.image) {
    node.image = new URL(project.image.replace(/^\//, ""), siteUrl).href;
  }

  return node;
}

export function buildJsonLd(ctx) {
  const siteUrl = ctx.siteUrl;
  const personId = `${siteUrl}#person`;
  const websiteId = `${siteUrl}#website`;
  const profileId = `${siteUrl}#profile`;
  const currentEmployers = experience.filter((item) =>
    /present/i.test(item.dates)
  );

  const person = {
    "@type": "Person",
    "@id": personId,
    name: SITE.name,
    url: siteUrl,
    email: `mailto:${SITE.email}`,
    jobTitle: profile.role,
    description: profile.paragraphs.join(" "),
    image: new URL("img/erik.webp", siteUrl).href,
    sameAs: [SITE.githubUrl, SITE.linkedInUrl],
    knowsAbout: skills,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: DEGREE.school,
    },
    hasCredential: supportedCredentials.map(credential),
    worksFor: currentEmployers.map((item) => ({
      "@type": "Organization",
      name: item.company,
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: SITE.name,
    description: SEO_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": personId },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": profileId,
    url: siteUrl,
    name: SEO_TITLE,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    primaryImageOfPage: person.image,
  };

  if (ctx.lastmod) profilePage.dateModified = ctx.lastmod;

  return {
    "@context": "https://schema.org",
    "@graph": [
      profilePage,
      website,
      person,
      ...projects.map((project) => projectNode(project, siteUrl, personId)),
    ],
  };
}
