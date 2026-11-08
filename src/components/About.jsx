import { education, profile, skills } from "../data/content";

function About() {
  return (
    <section id="about" className="section" data-section aria-labelledby="about-title">
      <div className="section__head">
        <p className="section__eyebrow">About</p>
        <h2 id="about-title" className="section__title">
          Business sense meets engineering craft
        </h2>
      </div>
      <div className="about-layout">
        <div className="about-copy">
          {profile.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="profile-facts">
            <div>
              <dt>Role</dt>
              <dd>{profile.role}</dd>
            </div>
            {education.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
          <p>
            <a href="#work">Selected work</a>, <a href="#resume">experience</a>,
            and <a href="#contact">contact</a> are sections of this page.
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
