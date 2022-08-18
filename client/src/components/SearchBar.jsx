import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pokemonByName } from "../actions/index.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const allPokes = useSelector((state) => state.allPokemons);

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch(pokemonByName(name));
      setName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Find pokemons..."
        value={name}
        onChange={(e) => handleInput(e)}
      />
      <button type="submit" onClick={(e) => handleClick(e)}>
        FIND
      </button>
    </div>
  );
};

export default SearchBar;
