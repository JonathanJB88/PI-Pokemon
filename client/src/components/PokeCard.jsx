import React from "react";
import { Link } from "react-router-dom";
import "./styles/PokeCard.css";

const PokeCard = ({ id, image, name, types }) => {
  return (
    <div className="card-container">
      <div className="cards">
        <div className="card-image">
          <Link className="Link" to={`/pokeDetails/${id}`}>
            <img src={image} alt="PokeImage not found" />
          </Link>
        </div>
        <div className="card-content">
          <h3>{name}</h3>
          <p>{types.map((t) => " " + t.name + " ")}</p>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
