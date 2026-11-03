import { resumeHighlights } from "../data/projects";

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
        <ul className="resume-list">
          {resumeHighlights.map((item) => (
            <li key={item.label}>
              <span className="resume-list__label">{item.label}</span>
              <span className="resume-list__detail">{item.detail}</span>
            </li>
          ))}
        </ul>
        <p>
          Download the full PDF for the complete timeline, coursework, and
          references.
        </p>
        <div className="resume-panel__actions">
          <a
            className="btn btn--primary"
            href={`${import.meta.env.BASE_URL}Erik Parra Williams.pdf`}
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
