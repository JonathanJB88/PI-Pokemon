import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pokemonByName } from "../actions/index.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(pokemonByName(name));
    setName("");
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
