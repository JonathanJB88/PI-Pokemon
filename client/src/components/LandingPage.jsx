import React from "react";
import { Link } from "react-router-dom";
import "./styles/LandingPage.css";
import logo from "./PokeImages/Logo.png";

const LandingPage = () => {
  return (
    <div className="background">
      <img className="logo-landing" src={logo} alt="Pokeimage not found" />
      <div className="divbutton">
        <Link to={"/home"}>
          <button className="button">DISCOVER</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
