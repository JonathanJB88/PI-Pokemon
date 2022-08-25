import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon, getPokemons } from "../actions/index.js";
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
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    abilities: "",
    image: "",
  });

  const validateURL = (url) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const validate = (input) => {
    let errors = {};
    if (!input.name || !isNaN(input.name) || input.name.length < 1) {
      errors.name = "Please, input a name for your pokemon";
    } else if (
      pokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())
    ) {
      errors.name = "There is already a pokemon with that name";
    } else if (input.image.length > 0 && !validateURL(input.image)) {
      errors.image =
        "Please, insert a jpg, jpeg, png, webp, avif, gif, svg url image of your pokemon";
    } else if (!input.hp || input.hp > 100 || input.hp < 0 || isNaN(input.hp)) {
      errors.hp = "Please, select a valid health power number from 1 to 100";
    } else if (
      !input.attack ||
      input.attack > 100 ||
      input.attack < 0 ||
      isNaN(input.attack)
    ) {
      errors.attack = "Please, insert a valid attack number from 1 to 100";
    } else if (
      !input.defense ||
      input.defense > 100 ||
      input.defense < 0 ||
      isNaN(input.defense)
    ) {
      errors.defense = "Please, insert a valid defense number from 1 to 100";
    } else if (
      !input.speed ||
      input.speed > 100 ||
      input.speed < 0 ||
      isNaN(input.speed)
    ) {
      errors.speed = "Please, insert a valid speed number from 1 to 100";
    } else if (
      !input.height ||
      input.height > 100 ||
      input.height < 0 ||
      isNaN(input.height)
    ) {
      errors.height = "Please, insert a valid height number from 1 to 100";
    } else if (
      !input.weight ||
      input.weight > 100 ||
      input.weight < 0 ||
      isNaN(input.weight)
    ) {
      errors.weight = "Please insert a valid weight number from 1 to 100";
    } else if (!isNaN(input.abilities) || input.abilities.length <= 2) {
      errors.abilities = "Please, type just the abilities of your pokemon";
    }
    return errors;
  };

  const valSelect = (input) => {
    let errorSelect = {};
    if (input.types.length === 0 || input.types.length > 3) {
      errorSelect.types = "Please, select from 1 to 3 pokemon types";
    }
    return errorSelect;
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    const valErrors = validate({ ...input, [e.target.name]: e.target.value });
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
      const valErrors = validate(input);

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
    const valErrors = validate(input);

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
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
      abilities: "",
      image: "",
    });
    history.push("/home");
  };

  return (
    <div className="bg-create">
      <div className="reg-form">
        <h1>Let's create a new Pokemon</h1>
      </div>
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
