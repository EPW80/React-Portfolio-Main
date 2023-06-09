//Needs links to my Github, Linkedin, and a Third Platform?

import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>My Development Portfolio</strong> - by{" "}
          <a href="https://github.com/EPW80" target="_blank" rel="noreferrer">
            Erik Parra Williams
          </a>
          .
          <hr />
          <a
            href="https://www.linkedin.com/in/erik-parra-williams/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>{" "}
          {/* <a href="https://twitter.com/EPW80" target="_blank" rel="noreferrer">
            Twitter
          </a>{" "} */}
          |{" "}
          <a href="https://github.com/EPW80" target="_blank" rel="noreferrer">
            Github
          </a>{" "}
          |{" "}
          <a
            href="mailto:erikparrawilliams@tutanota.com?"
            target="_blank"
            rel="noreferrer"
          >
            Email Me
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
