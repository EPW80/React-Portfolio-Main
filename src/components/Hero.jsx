import { resumePdfHref } from "../data/site";

function Hero() {
  return (
    <section id="home" className="hero" data-section>
      <div
        className="hero__media"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}img/erik.webp)`,
        }}
        role="img"
        aria-label="Erik Parra Williams"
      />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__copy">
        <h1 className="hero__brand">Erik Parra Williams</h1>
        <p className="hero__headline">
          Full-stack &amp; backend engineer shipping products end to end.
        </p>
        <p className="hero__lede">
          React and Next.js interfaces, Python and Go services, and AWS-backed
          deployments — from database design through production.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#work">
            View work
          </a>
          <a
            className="btn btn--ghost"
            href={resumePdfHref()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
