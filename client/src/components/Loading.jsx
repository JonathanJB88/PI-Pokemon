import React from "react";
import pokeLoading from "./Gifs/PokeLoading.gif";
import "./styles/Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading">
        <img
          src={pokeLoading}
          alt="Pokeimage not found"
          width="120px"
          height="120px"
        />
        <h2 className="loading-text"> Loading... </h2>
      </div>
    </div>
  );
};

export default Loading;
