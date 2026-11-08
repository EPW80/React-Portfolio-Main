import ProjectCard from "./ProjectCard";
import { projects } from "../data/content";

function Portfolio() {
  return (
    <section id="work" className="section" data-section aria-labelledby="work-title">
      <div className="section__head">
        <p className="section__eyebrow">Selected work</p>
        <h2 id="work-title" className="section__title">
          Projects that show the range
        </h2>
        <p className="section__lede">
          AI workflows, real-time backends, and full-stack product builds —
          source for every project, with live demos where they&apos;re still
          online. Background and skills are in <a href="#about">About</a>.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
