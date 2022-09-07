import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getPokeDetails,
  updatePokemon,
  cleanDetail,
  cleanPokemons,
} from "../actions/index.js";
import { valUpdate, valSelect } from "../Validators/Validators.js";
import Loading from "./Loading.jsx";
import "./styles/PokeUpdate.css";

const PokeUpdate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const pokeTypes = useSelector((state) => state.types);
  const pokemon = useSelector((state) => state.pokeDetails);

  const [errors, setErrors] = useState({});
  const [errorSelect, setErrorSelect] = useState({});
  const [disabled, setDisable] = useState(true);
  const [input, setInput] = useState({
    abilities: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getPokeDetails(id));
    dispatch(getTypes());
    dispatch(cleanPokemons());
  }, [dispatch, id]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    const valErrors = valUpdate({ ...input, [e.target.name]: e.target.value });
    const valErrorTypes = valSelect(input);
    if (
      JSON.stringify(valErrors) === "{}" &&
      JSON.stringify(valErrorTypes) === "{}"
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setErrors(valErrors);
    setErrorSelect(valErrorTypes);
  };

  const handleSelect = (e) => {
    if (!input.types.includes(e.target.value)) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      const valErrorTypes = valSelect({
        ...input,
        types: [...input.types, e.target.value],
      });
      const valErrors = valUpdate(input);

      if (
        JSON.stringify(valErrorTypes) === "{}" &&
        JSON.stringify(valErrors) === "{}"
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
      setErrors(valErrors);
      setErrorSelect(valErrorTypes);
    }
  };

  const handleDelete = (type) => {
    setInput({
      ...input,
      types: input.types?.filter((t) => t !== type),
    });
    const valErrorTypes = valSelect({
      ...input,
      types: input.types?.filter((t) => t !== type),
    });
    const valErrors = valUpdate(input);

    if (
      JSON.stringify(valErrorTypes) === "{}" &&
      JSON.stringify(valErrors) === "{}"
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setErrors(valErrors);
    setErrorSelect(valErrorTypes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cleanDetail());
    dispatch(updatePokemon(id, input));
    alert("Your pokemon has been successfully updated");
    setInput({
      abilities: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
      image: "",
    });
    history.push(`/pokeDetails/${id}`);
  };

  return (
    <Fragment>
      {pokemon ? (
        <div className="bg-create">
          <h1>Let's update your Pokemon</h1>
          <div className="cancel-container">
            <Link className="Link" to={`/pokeDetails/${id}`}>
              <button className="cancel-button">CANCEL</button>
            </Link>
          </div>
          <div className="upmain">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="upleft">
                <h4 className="pokemonTitle">{pokemon.name}</h4>
                <div>
                  <label>Abilities </label>
                  <input
                    className="input-update"
                    type="text"
                    value={input.abilities}
                    name="abilities"
                    placeholder="Type your pokemon abilities here..."
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.abilities && (
                    <p className="uperrors">{errors.abilities}</p>
                  )}
                </div>
                <br />
                <div>
                  <label>Pokemon image </label>
                  <input
                    className="input-update"
                    type="url"
                    value={input.image}
                    name="image"
                    placeholder="Url image..."
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.image && <p className="uperrors">{errors.image}</p>}
                </div>
                <br />
                <div>
                  <label>Choose types</label>
                  <select
                    disabled={input.types.length > 2}
                    defaultValue="title"
                    onChange={(e) => handleSelect(e)}
                  >
                    <option value="title" disabled name="types">
                      Choose types
                    </option>
                    {pokeTypes?.map((t) => {
                      return (
                        <option value={t.name} key={t.id}>
                          {t.name}
                        </option>
                      );
                    })}
                  </select>
                  {input.types?.map((t, index) => (
                    <div key={index}>
                      <span className="upoptions">{t} </span>
                      <span
                        className="upoptions-delete"
                        onClick={() => handleDelete(t)}
                      >
                        delete
                      </span>
                    </div>
                  ))}
                  {errorSelect.types && (
                    <p className="uperrors">{errorSelect.types}</p>
                  )}
                </div>
                <br />
              </div>
              <div className="upright">
                <div>
                  <label>HP </label>
                  <input
                    className="input-update"
                    type="number"
                    placeholder="1 - 100"
                    value={input.hp}
                    name="hp"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.hp && <p className="uperrors">{errors.hp}</p>}
                </div>
                <br />
                <div>
                  <label>Attack</label>
                  <input
                    className="input-update"
                    type="number"
                    placeholder="1 - 100"
                    value={input.attack}
                    name="attack"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.attack && <p className="uperrors">{errors.attack}</p>}
                </div>
                <br />
                <div>
                  <label>Defense</label>
                  <input
                    className="input-update"
                    type="number"
                    placeholder="1 - 100"
                    value={input.defense}
                    name="defense"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.defense && (
                    <p className="uperrors">{errors.defense}</p>
                  )}
                </div>
                <br />
                <div>
                  <label>Speed</label>
                  <input
                    className="input-update"
                    type="number"
                    placeholder="1 - 100"
                    value={input.speed}
                    name="speed"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.speed && <p className="uperrors">{errors.speed}</p>}
                </div>
                <br />
                <div>
                  <label>Height</label>
                  <input
                    className="input-update"
                    type="number"
                    placeholder="1 - 100"
                    value={input.height}
                    name="height"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.height && <p className="uperrors">{errors.height}</p>}
                </div>
                <br />
                <div>
                  <label>Weight</label>
                  <input
                    className="input-update"
                    type="number"
                    placeholder="1 - 100"
                    value={input.weight}
                    name="weight"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.weight && <p className="uperrors">{errors.weight}</p>}
                </div>
                <br />
              </div>
              <div className="div-update-button">
                <input
                  className="update-button"
                  type="submit"
                  value={"UPDATE"}
                  disabled={disabled}
                />
              </div>
            </form>
          </div>
          <br />
          <div className="div-home-button">
            <Link className="Link" to={"/home"}>
              <button className="home-button">GO HOME</button>
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default PokeUpdate;
