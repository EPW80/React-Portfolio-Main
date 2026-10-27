import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

function Portfolio() {
  return (
    <section id="work" className="section" data-section>
      <div className="section__head">
        <p className="section__eyebrow">Selected work</p>
        <h2 className="section__title">Projects that show the range</h2>
        <p className="section__lede">
          Web apps, blockchain experiments, and full-stack builds — each with a
          live demo and source.
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
