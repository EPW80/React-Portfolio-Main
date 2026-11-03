function ProjectCard({ project, index }) {
  const hasLive = Boolean(project.live);

  return (
    <article
      className="project-card"
      style={{ animationDelay: `${Math.min(index, 5) * 0.06}s` }}
    >
      {hasLive ? (
        <a
          className="project-card__media"
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
        >
          <img
            src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`}
            alt={`${project.title} preview`}
            loading="lazy"
          />
        </a>
      ) : (
        <div className="project-card__media project-card__media--static">
          <img
            src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`}
            alt={`${project.title} preview`}
            loading="lazy"
          />
        </div>
      )}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        {project.tags?.length ? (
          <ul className="project-card__tags" aria-label={`${project.title} tech`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
        <div className="project-card__actions">
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            Repository
          </a>
          {hasLive ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              Live site
            </a>
          ) : (
            <span className="project-card__muted">Demo offline</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
