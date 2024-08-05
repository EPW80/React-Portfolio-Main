import React from "react";

function Resume() {
  return (
    <div className="columns">
      <div className="column">
        <p className="content is-medium">Résumé</p>
        <hr />

        <a
          className="button is-info is-light"
          href={process.env.PUBLIC_URL + "/Erik Parra Williams.pdf"}
          target="_blank"
          rel="noreferrer"
        >
          <span className="icon">
            <i className="fas fa-download"></i>
          </span>
          <span>My Resume</span>
        </a>
      </div>
      {
        <div className="column">
          <p className="content is-medium"></p>
          <hr />
          <ul>
            <li></li>
          </ul>
        </div>
      }
    </div>
  );
}

export default Resume;
