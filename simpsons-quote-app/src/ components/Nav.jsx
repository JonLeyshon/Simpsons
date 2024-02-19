import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";

const Nav = () => {
  return (
    <div className="is-flex is-justify-content-space-evenly">
      <Link to="/"> Home </Link>
      <Link to="/About"> About </Link>
      <Link to="/Contact"> Contact Us </Link>
    </div>
  );
};

export default Nav;
