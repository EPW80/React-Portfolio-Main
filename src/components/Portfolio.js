//Reference the Project.js to pull each JS file.

import React from "react";
import Project from "./Project";

const projects = [
  {
    id: 0,
    title: "Tuffle",
    languages: "C++",
    packages: "make files, tools, server, utils, data",
    image: "/img/tuff.jpg",
    description: "In the game Tuffle (based on the game Wordle), the user is trying to guess a secret 5 letter word. The user will type in a 5 letter guess, and the server will share information about how close the guess is to the actual answer. ",
    repo: "https://github.com/EPW80/Tuffle",
    live: "https://amajc.github.io/tuffle-frontend/",
  },
  {
    id: 1,
    title: "Ethereum tip jar",
    languages: "css, javascript, solidity",
    packages: "next, ethers, react-router-dom, react",
    image: "/img/tip.jpg",
    description: "A solidity built tip jar which accepts Ethereum. Connect your wallet and leave the developer a tip along side an optional message. ",
    repo: "https://github.com/EPW80/Ethereum-tip-jar",
    live: "https://buy-me-a-coffee-solidity-de-fi-tipping-app.vercel.app/",
  },
  {
    id: 2,
    title: "Budget-Tracker",
    languages: "html, css, js, handlebars",
    packages: " express, compression, mongoose, morgan",
    image: "/img/budget.png",
    description: "Allows users to keep track of their finances ",
    live: "https://shrouded-citadel-92853.herokuapp.com/",
    repo: "https://github.com/EPW80/Budget-Tracker",
  },
  {
    id: 3,
    title: "Faucet",
    languages: "web3, solidity, ethereum",
    image: "/img/nft.png",
    packages: "Web3, Solidity, Ethereum",
    description: "Faucet application will enable users to donate and withdraw funds from the smart contract",
    repo: "https://github.com/EPW80/faucet",
    live: "http://faucet-xgpo.vercel.app/",
  },
  {
    id: 4,
    title: "Book Search",
    languages: "html, css, js",
    packages: "MERN stack",
    image: "/img/duly-noted.png",
    description: "This app converts a fully functioning Google Books API search engine built with a RESTful API into a GraphQL API built with Apollo Server. Uses the MERN stack, with a React front end, MongoDB database, and Node.js/Express.js server and API.",
    repo: "https://github.com/EPW80/MERN-Book-Search",
    live: "https://warm-beach-66290.herokuapp.com/",
  },
  {
    id: 5,
    title: "Photo-Port",
    languages: "html, css, js",
    packages: "react, web-vitals, react-dom, react-scripts",
    image: "/img/1.jpg",
    description: " A no-frills site to display photos.",
    repo: "https://github.com/EPW80/photo-port",
    live: "https://epw80.github.io/photo-port/",
  },
  {
    id: 6,
    title: "THETA",
    languages: "html, css, js",
    packages: "graphql, react-dom, react, react-image-file-resizer, apollo-boost",
    image: "/img/caulkbook.png",
    description: "A social media app where users can post their thoughts and images.",
    repo: "https://github.com/EPW80/THETA",
    live: "https://gql-client-epw.herokuapp.com/",
  },
];

function Portfolio() {
  return (
    <div>
      <p className="content is-medium">Portfolio</p>
      <hr />

      <Project projects={projects} />
    </div>
  );
}

export default Portfolio;
