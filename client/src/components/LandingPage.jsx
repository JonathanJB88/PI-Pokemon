import React from "react";
import { Link } from "react-router-dom";
import "./styles/LandingPage.css";
import logo from "./PokeImages/Logo.png";
import linkedIn from "./PokeImages/Icono_LinkedIn.png";
import github from "./PokeImages/Icon_github.png";

const LandingPage = () => {
  return (
    <div className="background">
      <div className="logo-container">
        <img className="logo-landing" src={logo} alt="Pokeimage not found" />
      </div>
      <div className="foot-container">
        <Link className="Link" to={"/home"}>
          <button className="button">DISCOVER</button>
        </Link>
        <div>
          <h2 className="byJon">BY JONATHAN BRACHO</h2>
          <a
            href="https://www.linkedin.com/in/jonathanbracho/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icons" src={linkedIn} alt="Not-found" />
          </a>
          <a
            href="https://github.com/JonathanJB88"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icons" src={github} alt="Not-found" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
