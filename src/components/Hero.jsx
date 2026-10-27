function Hero() {
  return (
    <section id="home" className="hero" data-section>
      <div
        className="hero__media"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}img/erik.JPEG)`,
        }}
        role="img"
        aria-label="Erik Parra Williams"
      />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__copy">
        <h1 className="hero__brand">Erik Parra Williams</h1>
        <p className="hero__headline">Full-stack developer building products end to end.</p>
        <p className="hero__lede">
          From React interfaces to Solidity contracts — shipping clear, useful
          software with craft and care.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#work">
            View work
          </a>
          <a
            className="btn btn--ghost"
            href={`${import.meta.env.BASE_URL}Erik Parra Williams.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Download resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
