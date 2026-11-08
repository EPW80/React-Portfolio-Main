import { SITE } from "../data/site";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        <strong>{SITE.name}</strong> — full-stack &amp; backend portfolio ·{" "}
        {year}
      </p>
      <div className="site-footer__links">
        <a
          href={SITE.githubUrl}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label={`${SITE.name} on GitHub`}
        >
          GitHub
        </a>
        <a
          href={SITE.linkedInUrl}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label={`${SITE.name} on LinkedIn`}
        >
          LinkedIn
        </a>
        <a href={`mailto:${SITE.email}`} aria-label={`Email ${SITE.name}`}>
          Email
        </a>
      </div>
    </footer>
  );
}

export default Footer;
