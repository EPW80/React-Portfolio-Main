function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        <strong>Erik Parra Williams</strong> — full-stack portfolio · {year}
      </p>
      <div className="site-footer__links">
        <a href="https://github.com/EPW80" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="mailto:erikparrawilliams@tutanota.com">Email</a>
      </div>
    </footer>
  );
}

export default Footer;
