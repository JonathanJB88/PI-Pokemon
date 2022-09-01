import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pokemonByName } from "../actions/index.js";
import "./styles/SearchBar.css";
import SearchIcon from "./PokeImages/Search_icon.png";

const SearchBar = ({ setInput, setPage, setSelected }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleClick = (e) => {
    if (name !== "") {
      dispatch(pokemonByName(name)).then((info) => {
        setInput(1);
        setPage(1);
      });
      setName("");
      setSelected(true);
    }
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (name !== "") {
        dispatch(pokemonByName(name)).then((info) => {
          setInput(1);
          setPage(1);
        });
        setName("");
        setSelected(true);
      }
    }
  };

  return (
    <div>
      <div className="searchBar">
        <input
          className="searchBar-input"
          required
          type="text"
          placeholder="Search..."
          value={name}
          onKeyDown={(e) => onKeyDown(e)}
          onChange={(e) => handleInput(e)}
        />
        <button
          className="searchBar-button"
          type="submit"
          onClick={(e) => handleClick(e)}
        >
          <img src={SearchIcon} alt="not found" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
