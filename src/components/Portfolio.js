//Reference the Project.js to pull each JS file.

import React from "react";
import Project from "./Project";

const projects = [
  {
    id: 0,
    title: "Crowd-Coin",
    languages: "react, css, js",
    packages: "web3, ethereum, react.js, solidity",
    image: "/img/food.png",
    description: "Crowd Coin is an app that utilizes ethereum for donations. Users can view campaigns and donate using their Metamask accounts. ",
    repo: "https://github.com/EPW80/Crowd-Coin",
    live: "https://ethreum-kickstart-10bxba6he-epw80.vercel.app/",
  },
  {
    id: 1,
    title: "Cabana Joe's Hospitality Products",
    languages: "html, handlebars, javascript",
    packages: "MERN, axios, redux, dotenv, moment, react-router-dom, toastify, heroku, web-vitals, react",
    image: "/img/cjhp.png",
    description: "A modern e-commerce website made for my client, 'Cabana Joes Hospitality Product's ",
    repo: "https://github.com/EPW80/MERN-Stack",
    live: "https://client-side-cabana-joe-hp.herokuapp.com/",
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
    packages: "mern",
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
