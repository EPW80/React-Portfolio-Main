// Recent Photo or Avatar
// Short Biography
import React from "react";

function About() {
  return (
    <div>
      <p className="content is-medium">Software Engineer</p>
      <hr />
      <img className="my-pic" src={process.env.PUBLIC_URL + '/img/erik.JPEG'} alt="Erik Parra Williams" />
      <p className="content is-italic mt-4">
        I am Erik P. Williams, a junior software engineer who finds solutions. Fervent about blockchain development and creating outstanding web3 based applications. Besides my admiration for blockchain development, martial arts and fitness are what I participate in on a regular basis.
        Recently earned a Certificate in Full Stack Web Development from the University of California, Los Angeles, enhancing skills in HTML, CSS, JavaScript, MongoDB, Node.js, MERN, and JSON. Successfully developed a modern decentralized web3 application with full functionality for a client established in the NFT industry, which now utilizes Open Sea to deploy custom NFT’s. 
        Completeing my BS in Computer Science at California State University Fullerton. Let us develop the future together.

      </p>
    </div>
  );
}

export default About;
