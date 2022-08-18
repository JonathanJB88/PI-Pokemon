import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterByType,
  existingCreatedFilter,
  alphabeticalOrder,
  orderAttack,
} from "../actions/index.js";
import { Link } from "react-router-dom";
import PokeCard from "./PokeCard";
import Paging from "./Paging.jsx";
import SearchBar from "./SearchBar.jsx";
import pokeLoading from "./Gif Loading/PokeLoading.gif";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);

  const [actualPage, setActualPage] = useState(1);
  const [pokesOnPage, setPokesOnPage] = useState(12);
  const [order, setOrder] = useState("");
  const lastPokeIndex = actualPage * pokesOnPage;
  const firstPokeIndex = lastPokeIndex - pokesOnPage;
  const actualPokes = allPokemons.slice(firstPokeIndex, lastPokeIndex);

  const paging = (pageNumber) => {
    setActualPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const handleAllPokes = (e) => {
    e.preventDefault(e);
    dispatch(getPokemons());
  };

  const handleTypeOptions = (e) => {
    dispatch(filterByType(e.target.value));
  };

  const handleCreatedOptions = (e) => {
    dispatch(existingCreatedFilter(e.target.value));
  };

  const handleAbcOrder = (e) => {
    e.preventDefault(e);
    dispatch(alphabeticalOrder(e.target.value));
    setActualPage(1);
    setOrder(`Ordered ${e.target.value}`);
  };

  const handleAttackOrder = (e) => {
    e.preventDefault(e);
    dispatch(orderAttack(e.target.value));
    setActualPage(1);
    setOrder(`Ordered ${e.target.value}`);
  };

  return (
    <div>
      <h1>Pokemon App</h1>
      <Link to={"/pokeCreate"}>
        <button>Create Pokemon</button>
      </Link>
      <button
        onClick={(e) => {
          handleAllPokes(e);
        }}
      >
        Load all Pokemons
      </button>
      <div>
        <select defaultValue="title" onChange={(e) => handleAbcOrder(e)}>
          <option value="title" disabled>
            Order by: alphabet
          </option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
        <select defaultValue="title" onChange={(e) => handleTypeOptions(e)}>
          <option value="title" disabled>
            Filter by: Type
          </option>
          <option value="all">All</option>
          {allTypes?.map((t) => {
            return (
              <option value={t.name} key={t.id}>
                {t.name}
              </option>
            );
          })}
        </select>
        <select defaultValue="title" onChange={(e) => handleAttackOrder(e)}>
          <option value="title" disabled>
            Order by: Attack
          </option>
          <option value="powerfull">Powerfull</option>
          <option value="weak">Weak</option>
        </select>
        <select defaultValue="title" onChange={(e) => handleCreatedOptions(e)}>
          <option value="title" disabled>
            Filter by: Existing or Created
          </option>
          <option value="all">All</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
        <Paging
          pokesOnPage={pokesOnPage}
          allPokemons={allPokemons.length}
          paging={paging}
        />
        <SearchBar />
        {actualPokes.length > 0 ? (
          actualPokes.map((p) => {
            return (
              <Fragment key={p.id}>
                <PokeCard
                  id={p.id}
                  image={p.image}
                  name={p.name}
                  types={p.types}
                />
              </Fragment>
            );
          })
        ) : (
          <div>
            <br />
            <img src={pokeLoading} alt="Pokeimage not found" />
            <h2> Loading Pokemons... </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
