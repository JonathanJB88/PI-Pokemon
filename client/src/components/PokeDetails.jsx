import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokeDetails } from "../actions/index.js";
import { Link } from "react-router-dom";
import Error404 from "./Error404.jsx";
import pokeLoading from "./Gifs/PokeLoading.gif";
import "./styles/PokeDetails.css";

const PokeDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.pokeDetails);

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
          <img src={pokeLoading} alt="Pokeimage not found" />
          <h2> Loading Pokemon Details... </h2>
        </div>
      ) : (
        <div className="background-details">
          <div className="pokemon-card-container">
            <div className="pokemon-card">
              <div className="card-background">
                <img
                  src={pokemon.image}
                  alt="PokeImage not found"
                  className="image"
                />
              </div>
              <div className="content">
                <h1 className="pokemon-name">{pokemon.name}</h1>
                <span className="pokemon-type">
                  {pokemon.types?.map((t) => "  " + t.name + "  ")}
                </span>
                <div className="pokemon-stats">
                  <p>ID: {pokemon.id}</p>
                  <p>Health Power: {pokemon.hp}</p>
                  <p>Attack: {pokemon.attack}</p>
                  <p>Defense: {pokemon.defense}</p>
                  <p>Speed: {pokemon.speed}</p>
                  <p>Height: {pokemon.height}</p>
                  <p>Weight: {pokemon.weight}</p>
                  <p>
                    Abilities: {pokemon.abilities?.map((a) => "  " + a + "  ")}
                  </p>
                </div>
                <h1 className="pokemon-details">Pokemon Details</h1>
              </div>
            </div>
          </div>
          <div className="div-button-details">
            <Link to="/home">
              <button className="button-details">GO HOME</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeDetails;
