import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  cleanDetail,
  cleanPokemons,
  deletePokemon,
  getPokeDetails,
} from "../actions/index.js";
import { Link } from "react-router-dom";
import Error404 from "./Error404.jsx";
import Loading from "./Loading.jsx";
import "./styles/PokeDetails.css";

const PokeDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const pokemon = useSelector((state) => state.pokeDetails);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getPokeDetails(id));
    dispatch(cleanPokemons());
  }, [dispatch, id]);

  const handleClick = () => {
    dispatch(cleanDetail());
  };

  const handleDelete = () => {
    if (pokemon["createdInDb"]) {
      dispatch(deletePokemon(id));
      dispatch(cleanDetail());
      dispatch(cleanPokemons());
      alert("Your pokemon has been successfully deleted");
      history.push("/home");
    } else {
      alert("You can not delete an original pokemon");
    }
  };

  const clickUpdate = () => {
    if (pokemon["createdInDb"]) {
      history.push(`/pokeUpdate/${id}`);
    } else {
      alert("You can not delete an original pokemon");
    }
  };

  return (
    <div>
      {error ? (
        <div>
          <Error404 />
        </div>
      ) : !pokemon ? (
        <Loading />
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
                <h3 className="pokemon-name">{pokemon.name}</h3>
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
                <h4 className="pokemon-details">Pokemon Details</h4>
                <div className="delete-container">
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete()}
                  >
                    DELETE
                  </button>
                </div>
                <div className="update-container">
                  <button
                    className="updateButton"
                    onClick={() => clickUpdate()}
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="div-button-details">
            <Link className="Link" to="/home">
              <button className="button-details" onClick={() => handleClick()}>
                GO HOME
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeDetails;
