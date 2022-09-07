import React from "react";
import error404 from "./PokeImages/Error404.png";
import { useDispatch } from "react-redux";
import { cleanDetail } from "../actions";
import { Link } from "react-router-dom";
import "./styles/Error404.css";

const Error404 = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(cleanDetail());
  };

  return (
    <div className="container-error">
      <div>
        <img className="errorImage" src={error404} alt="Pokeimage not found" />
      </div>
      <div className="divErrorButton">
        <Link className="Link" to="/home">
          <button className="errorButton" onClick={(e) => handleClick(e)}>
            GO BACK HOME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
