import {
  ALPHABETICAL_ORDER,
  CREATE_POKEMON,
  EXISTING_CREATED_FILTER,
  FILTER_BY_TYPE,
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  ORDER_BY_ATTACK,
} from ".././actions/action_types.js";

const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_BY_TYPE:
      const allPokemons = state.allPokemons;
      const filteredByType =
        action.payload === "all"
          ? allPokemons
          : allPokemons?.filter((p) =>
              p.types.map((t) => t.name).includes(action.payload)
            );
      return {
        ...state,
        pokemons: filteredByType,
      };
    case EXISTING_CREATED_FILTER:
      const allPokes = state.allPokemons;
      const pokeFilter =
        action.payload === "created"
          ? allPokes?.filter((p) => p.createdInDb === true)
          : allPokes?.filter((p) => p.createdInDb !== true);
      return {
        ...state,
        pokemons: action.payload === "all" ? allPokes : pokeFilter,
      };
    case ALPHABETICAL_ORDER:
      const pokes = state.pokemons;
      let pokeOrder =
        action.payload === "asc"
          ? pokes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : pokes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: pokeOrder,
      };
    case ORDER_BY_ATTACK:
      const thePokemons = state.pokemons;
      let attackOrder =
        action.payload === "powerfull"
          ? thePokemons.sort((a, z) => {
              if (a.attack > z.attack) {
                return -1;
              }
              if (z.attack > a.attack) {
                return 1;
              }
              return 0;
            })
          : thePokemons.sort((a, z) => {
              if (a.attack > z.attack) {
                return 1;
              }
              if (z.attack > a.attack) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: attackOrder,
      };
    case GET_POKEMON_BY_NAME:
      let fullPoke = state.allPokemons;
      let onePoke = fullPoke?.filter((p) => p.name === action.payload[0].name);
      return {
        ...state,
        pokemons: onePoke,
      };
    case CREATE_POKEMON:
      return { ...state };
    default:
      return { ...state };
  }
};

export default rootReducer;
