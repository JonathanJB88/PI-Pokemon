import React from "react";
import { Link } from "react-router-dom";

const PokeCard = ({ id, image, name, types }) => {
  return (
    <div>
      <h3>Pokemon: {name}</h3>
      <Link to={`/pokeDetails/${id}`}>
        <img
          src={image}
          alt="PokeImage not found"
          width="200px"
          height="250px"
        />
      </Link>
      <h4>Types: {types.map((t) => " " + t.name + " ")}</h4>
      <br />
    </div>
  );
};

export default PokeCard;
