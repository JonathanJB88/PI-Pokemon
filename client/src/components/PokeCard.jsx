import React from "react";
import { Link } from "react-router-dom";

const PokeCard = ({ id, img, name, types }) => {
  return (
    <div>
      <h3>Pokemon: {name}</h3>
      <Link to={`/pokemons/${id}`}>
        <img src={img} alt="PokeImage not found" width="200px" height="250px" />
      </Link>
      <h4 className="types">
        Types: {types.map((pt) => "- " + pt.name + " ")}
      </h4>
      <br />
    </div>
  );
};

export default PokeCard;
