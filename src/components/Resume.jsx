import { education, experience } from "../data/projects";

function Resume() {
  return (
    <section id="resume" className="section" data-section>
      <div className="section__head">
        <p className="section__eyebrow">Resume</p>
        <h2 className="section__title">Experience on one page</h2>
        <p className="section__lede">
          Roles, education, and project highlights — ready to share with a
          hiring team.
        </p>
      </div>
      <div className="resume-panel">
        <ul className="resume-list" aria-label="Work experience">
          {experience.map((item) => (
            <li key={`${item.company}-${item.role}`}>
              <span className="resume-list__label">
                {item.role} · {item.company}
              </span>
              <span className="resume-list__dates">{item.dates}</span>
              <span className="resume-list__detail">{item.summary}</span>
            </li>
          ))}
        </ul>
        <ul className="resume-list resume-list--education" aria-label="Education">
          {education.map((item) => (
            <li key={item.label}>
              <span className="resume-list__label">{item.label}</span>
              <span className="resume-list__detail">{item.detail}</span>
            </li>
          ))}
        </ul>
        <p>
          Download the full PDF for the complete timeline, skills, and project
          detail.
        </p>
        <div className="resume-panel__actions">
          <a
            className="btn btn--primary"
            href={`${import.meta.env.BASE_URL}Erik-Williams-Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
          <a className="btn btn--ghost" href="#contact">
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
