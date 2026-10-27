function ProjectCard({ project, index }) {
  return (
    <article
      className="project-card"
      style={{ animationDelay: `${Math.min(index, 5) * 0.06}s` }}
    >
      <a
        className="project-card__media"
        href={project.live}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.title} live site`}
      >
        <img
          src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`}
          alt={`${project.title} preview`}
          loading="lazy"
        />
      </a>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        <p className="project-card__meta">
          {project.languages}
          <br />
          {project.packages}
        </p>
        <div className="project-card__actions">
          <a href={project.repo} target="_blank" rel="noreferrer">
            Repository
          </a>
          <a href={project.live} target="_blank" rel="noreferrer">
            Live site
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
