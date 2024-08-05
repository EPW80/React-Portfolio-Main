import React from "react";

function About() {
  return (
    <div>
      <p className="content is-medium"></p>
      <hr />
      <img
        className="my-pic"
        src={process.env.PUBLIC_URL + "/img/erik.JPEG"}
        alt="Erik Parra Williams"
      />
      {}
    </div>
  );
}

export default About;
