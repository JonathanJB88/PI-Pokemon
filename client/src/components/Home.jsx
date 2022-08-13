import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions/index.js";
import { Link } from "react-router-dom";
import PokeCard from "./PokeCard";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault(e);
    dispatch(getPokemons());
  };

  return (
    <div>
      <h1>Pokemon App</h1>
      <Link to={"/pokemons"}>
        <button>Create Pokemon</button>
      </Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Load all Pokemons
      </button>
      <div>
        <select>
          <option value="all">Alphabetical Order...</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
        <select>
          <option value="all">Type Order...</option>
          <option value="grass">Grass</option>
          <option value="poison">Poison</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="water">Water</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="electric">Electric</option>
          <option value="ground">Ground</option>
          <option value="fairy">Fairy</option>
        </select>
        <select>
          <option value="all">Existent or Created Filter...</option>
          <option value="api">Existent</option>
          <option value="created">Created</option>
        </select>
        {allPokemons?.map((p) => {
          return (
            <fragment>
              <PokeCard id={p.id} img={p.image} name={p.name} types={p.types} />
            </fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
