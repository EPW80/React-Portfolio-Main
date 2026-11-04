import { skills } from "../data/projects";

function About() {
  return (
    <section id="about" className="section" data-section>
      <div className="section__head">
        <p className="section__eyebrow">About</p>
        <h2 className="section__title">Business sense meets engineering craft</h2>
      </div>
      <div className="about-layout">
        <div className="about-copy">
          <p>
            Erik Parra Williams is a full-stack and backend software engineer
            with a B.S. in Computer Science from California State University,
            Fullerton. Certified through the UCLA Extension Full-Stack Web
            Development program, with strengths in taking ideas from sketch to
            ship.
          </p>
          <p>
            Lead contract developer for a WooCommerce e-commerce business —
            owning the storefront, third-party API integrations, and a Go payout
            service backed by hundreds of automated tests. Deploys on AWS with
            Docker and CI/CD, from database design through production.
          </p>
        </div>
        <ul className="skill-list" aria-label="Skills">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default About;
