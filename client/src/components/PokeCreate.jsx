import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon, getPokemons } from "../actions/index.js";
import { validate, valSelect } from "../Validators/Validators.js";
import "./styles/PokeCreate.css";

const PokeCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pokeTypes = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.allPokemons);

  const [errors, setErrors] = useState({});
  const [errorSelect, setErrorSelect] = useState({});
  const [disabled, setDisable] = useState(true);
  const [input, setInput] = useState({
    name: "",
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
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    const valErrors = validate(
      { ...input, [e.target.name]: e.target.value },
      pokemons
    );
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
      const valErrors = validate(input, pokemons);

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
    const valErrors = validate(input, pokemons);

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
    dispatch(createPokemon(input));
    alert("Your pokemon has been successfully created");
    setInput({
      name: "",
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
    history.push("/home");
  };

  return (
    <div className="bg-create">
      <h1>Let's create a new Pokemon</h1>
      <div className="main">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="left">
            <div>
              <label>Pokemon name </label>
              <input
                className="input-create"
                type="text"
                value={input.name}
                name="name"
                placeholder="Type your pokemon name here..."
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p className="errors">{errors.name}</p>}
            </div>
            <br />
            <div>
              <label>Abilities </label>
              <input
                className="input-create"
                type="text"
                value={input.abilities}
                name="abilities"
                placeholder="Type your pokemon abilities here..."
                onChange={(e) => handleChange(e)}
              />
              {errors.abilities && <p className="errors">{errors.abilities}</p>}
            </div>
            <br />
            <div>
              <label>Pokemon image </label>
              <input
                className="input-create"
                type="url"
                value={input.image}
                name="image"
                placeholder="Url image..."
                onChange={(e) => handleChange(e)}
              />
              {errors.image && <p className="errors">{errors.image}</p>}
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
                  <span className="options">{t} </span>
                  <span
                    className="options-delete"
                    onClick={() => handleDelete(t)}
                  >
                    delete
                  </span>
                </div>
              ))}
              {errorSelect.types && (
                <p className="errors">{errorSelect.types}</p>
              )}
            </div>
            <br />
          </div>
          <div className="right">
            <div>
              <label>HP </label>
              <input
                className="input-create"
                type="number"
                placeholder="1 - 100"
                value={input.hp}
                name="hp"
                onChange={(e) => handleChange(e)}
              />
              {errors.hp && <p className="errors">{errors.hp}</p>}
            </div>
            <br />
            <div>
              <label>Attack</label>
              <input
                className="input-create"
                type="number"
                placeholder="1 - 100"
                value={input.attack}
                name="attack"
                onChange={(e) => handleChange(e)}
              />
              {errors.attack && <p className="errors">{errors.attack}</p>}
            </div>
            <br />
            <div>
              <label>Defense</label>
              <input
                className="input-create"
                type="number"
                placeholder="1 - 100"
                value={input.defense}
                name="defense"
                onChange={(e) => handleChange(e)}
              />
              {errors.defense && <p className="errors">{errors.defense}</p>}
            </div>
            <br />
            <div>
              <label>Speed</label>
              <input
                className="input-create"
                type="number"
                placeholder="1 - 100"
                value={input.speed}
                name="speed"
                onChange={(e) => handleChange(e)}
              />
              {errors.speed && <p className="errors">{errors.speed}</p>}
            </div>
            <br />
            <div>
              <label>Height</label>
              <input
                className="input-create"
                type="number"
                placeholder="1 - 100"
                value={input.height}
                name="height"
                onChange={(e) => handleChange(e)}
              />
              {errors.height && <p className="errors">{errors.height}</p>}
            </div>
            <br />
            <div>
              <label>Weight</label>
              <input
                className="input-create"
                type="number"
                placeholder="1 - 100"
                value={input.weight}
                name="weight"
                onChange={(e) => handleChange(e)}
              />
              {errors.weight && <p className="errors">{errors.weight}</p>}
            </div>
            <br />
          </div>
          <div className="div-create-button">
            <input
              className="create-button"
              type="submit"
              value={"CREATE"}
              disabled={disabled}
            />
          </div>
        </form>
      </div>
      <br />
      <div className="div-home-button">
        <Link className="Link" to="/Home">
          <button className="home-button">GO HOME</button>
        </Link>
      </div>
    </div>
  );
};

export default PokeCreate;
