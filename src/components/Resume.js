// Link to a downloadable resume
// a list of the developer’s proficiencies

import React from "react";

function Resume() {
  return (
    <div className="columns">
      <div className="column">
        <p className="content is-medium">Résumé</p>
        <hr />

        <a
          className="button is-info is-light"
          href={process.env.PUBLIC_URL + "/EP_Williams.pdf"}
          target="_blank"
          rel="noreferrer"
        >
          <span className="icon">
            <i className="fas fa-download"></i>
          </span>
          <span>My Resume</span>
        </a>
      </div>
      {/* <div className="column">
        <p className="content is-medium">Skills</p>
        <hr />
        <ul>
          <li>C++, Python, HTML, CSS, Javascript</li>


        </ul>
      </div> */}
    </div>
  );
}

export default Resume;
