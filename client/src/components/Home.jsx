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
import Loading from "./Loading.jsx";
import logo from "./PokeImages/Logo.png";
import Psyduck from "./PokeImages/Psyduck.gif";
import "./styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const max = Math.ceil(allPokemons.length / perPage);
  const [input, setInput] = useState(1);
  const [order, setOrder] = useState("");

  const [selected, setSelected] = useState(false);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const handleAllPokes = (e) => {
    e.preventDefault(e);
    dispatch(getPokemons());
    setInput(1);
    setPage(1);
    setSelected(true);
  };

  const handleTypeOptions = (e) => {
    e.preventDefault(e);
    dispatch(filterByType(e.target.value));
    setInput(1);
    setPage(1);
  };

  const handleCreatedOptions = (e) => {
    e.preventDefault(e);
    dispatch(existingCreatedFilter(e.target.value));
    setInput(1);
    setPage(1);
  };

  const handleAbcOrder = (e) => {
    e.preventDefault(e);
    dispatch(alphabeticalOrder(e.target.value));
    setOrder(`Ordered ${e.target.value}`);
    setInput(1);
    setPage(1);
  };

  const handleAttackOrder = (e) => {
    e.preventDefault(e);
    dispatch(orderAttack(e.target.value));
    setOrder(`Ordered ${e.target.value}`);
    setInput(1);
    setPage(1);
  };

  return (
    <div className="bg-home">
      <div className="max-box">
        <img className="logo" src={logo} alt="Pokeimage not found" />
        <div className="menu-container">
          <div id="menu">
            <ul>
              <li>
                <Link className="Link" to={"/pokeCreate"}>
                  <button className="home-buttons">Create Pokemon</button>
                </Link>
              </li>
              <li>
                <button
                  className="home-buttons"
                  onClick={(e) => {
                    handleAllPokes(e);
                  }}
                >
                  Load all Pokemons
                </button>
              </li>
              <li>
                <Link className="Link" to={"/"}>
                  <button className="home-buttons">Landing Page</button>
                </Link>
              </li>
              <li>
                <SearchBar
                  setInput={setInput}
                  setPage={setPage}
                  setSelected={setSelected}
                />
              </li>
            </ul>
          </div>
          <div id="Order-filter">
            <ul>
              <li>
                <select
                  defaultValue="title"
                  onChange={(e) => handleAbcOrder(e)}
                >
                  <option value="title" selected={selected} disabled>
                    Order by: alphabet
                  </option>
                  <option value="asc">A to Z</option>
                  <option value="desc">Z to A</option>
                </select>
              </li>
              <li>
                <select
                  defaultValue="title"
                  onChange={(e) => handleAttackOrder(e)}
                >
                  <option value="title" selected={selected} disabled>
                    Order by: Attack
                  </option>
                  <option value="powerful">Powerful</option>
                  <option value="weak">Weak</option>
                </select>
              </li>
              <li>
                <select
                  defaultValue="title"
                  onChange={(e) => handleTypeOptions(e)}
                >
                  <option value="title" selected={selected} disabled>
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
              </li>
              <li>
                <select
                  defaultValue="title"
                  onChange={(e) => handleCreatedOptions(e)}
                >
                  <option value="title" selected={selected} disabled>
                    Filter by: Existing or Created
                  </option>
                  <option value="api">Existing</option>
                  <option value="created">Created</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {error ? (
        <div className="error-container">
          <img src={Psyduck} alt="Not Found" />
          <h2>No matches found, try again or load all pokemons!</h2>
        </div>
      ) : allPokemons.length > 0 ? (
        <div className="grid-container">
          {allPokemons
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((p) => {
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
            })}
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
      <div className="pag-container">
        <Paging
          page={page}
          setPage={setPage}
          max={max}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

export default Home;
