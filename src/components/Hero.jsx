import { profile } from "../data/content";
import { SITE, resumePdfHref } from "../data/site";
import { HERO_IMAGE_ALT } from "../seo/copy";

function Hero() {
  return (
    <section id="home" className="hero" data-section aria-labelledby="home-title">
      <img
        className="hero__media"
        src={`${import.meta.env.BASE_URL}img/erik.webp`}
        alt={HERO_IMAGE_ALT}
        width={443}
        height={591}
        sizes="100vw"
        fetchpriority="high"
      />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__copy">
        <h1 id="home-title" className="hero__brand">
          {SITE.name}
        </h1>
        <p className="hero__headline">{profile.headline}</p>
        <p className="hero__lede">{profile.lede}</p>
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
