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
            Erik Parra Williams is a full-stack developer with a business
            background that shapes how people actually use websites and
            software. Certified through the UCLA Coding Boot Camp, with
            strengths in creativity, teamwork, and taking ideas from sketch to
            ship.
          </p>
          <p>
            Currently completing a B.S. in Computer Science at California State
            University, Fullerton — building React interfaces, Node/GraphQL
            APIs, and Solidity/Web3 experiments end to end.
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
