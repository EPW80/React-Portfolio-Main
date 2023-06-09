// Recent Photo or Avatar
// Short Biography
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
      {/* <p className="content is-italic mt-4">
        Front-end web developer leveraging a background in business to provide unique 
        perspectives on how end-users interact with websites and software platforms—
        earned a Full Stack Web Development certificate from the University of 
        California Los Angeles Coding Boot Camp. Problem-solver who is passionate about 
        developing apps with a focus on mobile-first design and development. Strengths 
        in creativity, teamwork, and building projects from ideation to execution. 
        Currently, a Junior at California State University Fullerton, completing a 
        Bachelor of Science in Computer Science.


      </p> */}
    </div>
  );
}

export default About;
