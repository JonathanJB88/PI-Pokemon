import React from "react";

const Paging = ({ pokesOnPage, allPokemons, paging }) => {
  const pageNumbers = [];
  const page = Math.ceil(allPokemons / pokesOnPage);

  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers?.map((pag) => {
          return (
            <li key={pag}>
              <button onClick={() => paging(pag)}>{pag}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paging;
