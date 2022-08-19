import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokeDetails } from "../actions/index.js";
import { Link } from "react-router-dom";
import Error404 from "./Error404.jsx";
import pokeLoading from "./Gifs/PokeLoading.gif";

const PokeDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.pokeDetails);
  console.log(pokemon);
  useEffect(() => {
    dispatch(getPokeDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {pokemon.error ? (
        <div>
          <Error404 />
        </div>
      ) : !pokemon.name ? (
        <div>
          <br />
          <img src={pokeLoading} alt="Pokeimage not found" />
          <h2> Loading Pokemon Details... </h2>
        </div>
      ) : (
        <div>
          <img
            src={pokemon.image}
            alt="PokeImage not found"
            height="250px"
            width="200px"
          />
          <h1>Pokemon: {pokemon.name}</h1>
          <h3>ID: {pokemon.id}</h3>
          <h3>Health Power: {pokemon.hp}</h3>
          <h3>Attack: {pokemon.attack}</h3>
          <h3>Defense: {pokemon.defense}</h3>
          <h3>Speed: {pokemon.speed}</h3>
          <h3>Height: {pokemon.height}</h3>
          <h3>Weight: {pokemon.weight}</h3>
          <h3>
            Types:
            {pokemon.types?.map((t) => "  " + t.name + "  ")}
          </h3>
          <br />
          <Link to="/home">
            <button>GO HOME</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PokeDetails;
