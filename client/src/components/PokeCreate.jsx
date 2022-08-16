import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from "../actions/index.js";

const PokeCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pokeTypes = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 50,
    weight: 50,
    types: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPokemon(input));
    alert("Your pokemon has been successfully created");
    setInput({
      name: "",
      hp: 50,
      attack: 50,
      defense: 50,
      speed: 50,
      height: 50,
      weight: 50,
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
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="PokeName..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>HP: </label>
          <input
            type="range"
            min="0"
            max="100"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Attack:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Defense:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Speed:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>PokeImage: </label>
          <input
            type="url"
            value={input.image}
            name="image"
            placeholder="Url Image..."
            onChange={(e) => handleChange(e)}
          />
        </div>
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
          <ul>
            <li>{input.types?.map((t) => t + "  ")}</li>
          </ul>
        </div>
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
};

export default PokeCreate;
