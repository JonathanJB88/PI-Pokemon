import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from "../actions/index.js";

const PokeCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pokeTypes = useSelector((state) => state.types);

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
    image: "",
  });

  const validateURL = (url) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const validate = (input) => {
    let errors = {};
    if (
      !input.name ||
      typeof input.name !== "string" ||
      input.name.length < 1
    ) {
      errors.name = "Please, input a name for your pokemon";
    } else if (input.image.length > 0 && !validateURL(input.image)) {
      errors.image =
        "Please, insert a jpg, jpeg, png, webp, avif, gif, svg url image of your pokemon";
    } else if (!input.hp || input.hp > 100 || input.hp < 0 || isNaN(input.hp)) {
      errors.hp = "Please, select a valid health power number from 0 to 100";
    } else if (
      !input.attack ||
      input.attack > 100 ||
      input.attack < 0 ||
      isNaN(input.attack)
    ) {
      errors.attack = "Please, insert a valid attack number from 0 to 100";
    } else if (
      !input.defense ||
      input.defense > 100 ||
      input.defense < 0 ||
      isNaN(input.defense)
    ) {
      errors.defense = "Please, insert a valid defense number from 0 to 100";
    } else if (
      !input.speed ||
      input.speed > 100 ||
      input.speed < 0 ||
      isNaN(input.speed)
    ) {
      errors.speed = "Please, insert a valid speed number from 0 to 100";
    } else if (
      !input.height ||
      input.height > 100 ||
      input.height < 0 ||
      isNaN(input.height)
    ) {
      errors.height = "Please, insert a valid height number from 0 to 100";
    } else if (
      !input.weight ||
      input.weight > 100 ||
      input.weight < 0 ||
      isNaN(input.weight)
    ) {
      errors.weight = "Please insert a valid weight number from 0 to 100";
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
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    const valErrors = validate({ ...input, [e.target.name]: e.target.value });
    const valErrorTypes = valSelect(input);
    console.log("change", valErrors);
    console.log("select", valErrorTypes);
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
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    const valErrorTypes = valSelect({
      ...input,
      types: [...input.types, e.target.value],
    });
    const valErrors = validate(input);
    console.log("change", valErrors);
    console.log("select", valErrorTypes);
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
    console.log("select", valErrorTypes);
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
      image: "",
    });
    history.push("/home");
  };

  return (
    <div>
      <div>
        <Link to="/Home">
          <button>GO HOME</button>
        </Link>
        <h1>Create your Pokemon</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Pokemon name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="PokeName..."
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <br />
        <div>
          <label>Select Types:</label>
          <select defaultValue="title" onChange={(e) => handleSelect(e)}>
            <option value="title" disabled name="types">
              Select Types:
            </option>
            {pokeTypes?.map((pt) => {
              return (
                <option value={pt.name} key={pt.id}>
                  {pt.name}
                </option>
              );
            })}
          </select>
          {input.types?.map((t, index) => (
            <div key={index}>
              <span>{t} </span>
              <button onClick={() => handleDelete(t)}>X</button>
            </div>
          ))}
          {errorSelect.types && <span>{errorSelect.types}</span>}
        </div>
        <br />
        <div>
          <label>PokeImage: </label>
          <input
            type="url"
            value={input.image}
            name="image"
            placeholder="Url Image..."
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <span>{errors.image}</span>}
        </div>
        <br />
        <div>
          <label>HP: </label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
          />
          <span>{input.hp}</span>
          {errors.hp && <span>{errors.hp}</span>}
        </div>
        <br />
        <div>
          <label>Attack:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
          <span>{input.attack}</span>
          {errors.attack && <span>{errors.attack}</span>}
        </div>
        <br />
        <div>
          <label>Defense:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
          <span>{input.defense}</span>
          {errors.defense && <span>{errors.defense}</span>}
        </div>
        <br />
        <div>
          <label>Speed:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
          <span>{input.speed}</span>
          {errors.speed && <span>{errors.speed}</span>}
        </div>
        <br />
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          <span>{input.height}</span>
          {errors.height && <span>{errors.height}</span>}
        </div>
        <br />
        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
          <span>{input.weight}</span>
          {errors.weight && <span>{errors.weight}</span>}
        </div>
        <br />
        <button type="submit" disabled={disabled}>
          CREATE
        </button>
      </form>
    </div>
  );
};

export default PokeCreate;
