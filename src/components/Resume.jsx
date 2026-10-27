import { skills } from "../data/projects";

function Resume() {
  return (
    <section id="resume" className="section" data-section>
      <div className="section__head">
        <p className="section__eyebrow">Resume</p>
        <h2 className="section__title">Experience on one page</h2>
        <p className="section__lede">
          Download the full résumé, or scan the core stack below.
        </p>
      </div>
      <div className="resume-layout">
        <div className="resume-panel">
          <p>
            Roles, education, and project highlights — ready to share with a
            hiring team.
          </p>
          <a
            className="btn btn--primary"
            href={`${import.meta.env.BASE_URL}Erik Parra Williams.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Download PDF
          </a>
        </div>
        <ul className="skill-list" aria-label="Technical skills">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Resume;
