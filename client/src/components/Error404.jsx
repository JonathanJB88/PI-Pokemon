import React from "react";
import error404 from "./PokeImages/Error404.png";
import { Link } from "react-router-dom";
import "./styles/Error404.css";

const Error404 = () => {
  return (
    <div>
      <img className="errorImage" src={error404} alt="Pokeimage not found" />
      <div className="divErrorButton">
        <Link to="/home">
          <button className="errorButton">GO BACK HOME</button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
