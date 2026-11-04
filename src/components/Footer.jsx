function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        <strong>Erik Parra Williams</strong> — full-stack &amp; backend
        portfolio · {year}
      </p>
      <div className="site-footer__links">
        <a
          href="https://github.com/EPW80"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/erikparrawilliams"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:erikparrawilliams@tutanota.com">Email</a>
      </div>
    </footer>
  );
}

export default Footer;
