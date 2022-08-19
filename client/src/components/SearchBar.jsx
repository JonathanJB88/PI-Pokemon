import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pokemonByName } from "../actions/index.js";

const SearchBar = ({ setInput, setPage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch(pokemonByName(name));
      setName("");
      setInput(1);
      setPage(1);
    }
  };
  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      if (name !== "") {
        dispatch(pokemonByName(name));
        setName("");
        setInput(1);
        setPage(1);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Find pokemons..."
        value={name}
        onKeyDown={(e) => onKeyDown(e)}
        onChange={(e) => handleInput(e)}
      />
      <button type="submit" onClick={(e) => handleClick(e)}>
        FIND
      </button>
    </div>
  );
};

export default SearchBar;
