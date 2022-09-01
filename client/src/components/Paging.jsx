import React from "react";
import previous from "./PokeImages/previous.png";
import next from "./PokeImages/next.png";
import "./styles/Paging.css";

const Paging = ({ page, setPage, max, setInput, input }) => {
  const nextPage = () => {
    setInput(parseInt(page) + 1);
    setPage(parseInt(page) + 1);
  };

  const previousPage = () => {
    setInput(parseInt(page) - 1);
    setPage(parseInt(page) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > max ||
        isNaN(parseInt(e.target.value))
      ) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="container">
      <br />
      <button className="buttons" disabled={page <= 1} onClick={previousPage}>
        <img src={previous} alt="not found" width="10px" height="15px" />
      </button>
      <input
        className="input-pag"
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p className="text"> de {max} </p>
      <button className="buttons" disabled={page >= max} onClick={nextPage}>
        <img src={next} alt="not found" width="10px" height="15px" />
      </button>
    </div>
  );
};

export default Paging;
