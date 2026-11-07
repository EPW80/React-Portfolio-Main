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
        <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={SITE.linkedInUrl} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${SITE.email}`}>Email</a>
      </div>
    </footer>
  );
}

export default Footer;
