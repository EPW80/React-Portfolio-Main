export const SITE = {
  name: "Erik Parra Williams",
  email: "erikparrawilliams@tutanota.com",
  githubUrl: "https://github.com/EPW80",
  linkedInUrl: "https://www.linkedin.com/in/erikparrawilliams",
  resumePdf: "Erik-Williams-Resume.pdf",
  formspreeId: "xknyyydk",
};

export function resumePdfHref(baseUrl = import.meta.env.BASE_URL) {
  return `${baseUrl}${SITE.resumePdf}`;
}

export function formspreeFormId() {
  return import.meta.env.VITE_FORMSPREE_ID || SITE.formspreeId;
}
