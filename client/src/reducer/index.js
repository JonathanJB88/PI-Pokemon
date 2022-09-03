import {
  ALPHABETICAL_ORDER,
  CREATE_POKEMON,
  EXISTING_CREATED_FILTER,
  FILTER_BY_TYPE,
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKE_DETAILS,
  GET_TYPES,
  ORDER_BY_ATTACK,
  ERROR_404,
  DELETE_POKEMON,
  CLEAN_DETAIL,
  CLEAN_POKEMONS,
  UPDATE_POKEMON,
} from ".././actions/action_types.js";

const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
  pokeDetails: null,
  error: null,
  pokemonsByType: [],
  pokemonsByOrigin: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        error: null,
        pokemons: action.payload,
        allPokemons: action.payload,
        pokemonsByOrigin: action.payload,
        pokemonsByType: action.payload,
      };
    case GET_TYPES:
      return { ...state, types: action.payload };
    case FILTER_BY_TYPE:
      const allPokemons = state.allPokemons;
      const filteredByType =
        action.payload === "all"
          ? allPokemons
          : allPokemons?.filter((p) =>
              p.types.map((t) => t.name).includes(action.payload)
            );
      const commonPokes1 =
        state.pokemonsByOrigin.length > 0
          ? filteredByType.filter((p) => state.pokemonsByOrigin.includes(p))
          : filteredByType;
      return {
        ...state,
        pokemonsByType: filteredByType,
        pokemons: commonPokes1,
        error:
          commonPokes1.length === 0
            ? { message: "There are no created dogs yet" }
            : null,
      };
    case EXISTING_CREATED_FILTER:
      const allPokes = state.allPokemons;
      const pokeFilter =
        action.payload === "created"
          ? allPokes?.filter((p) => p.createdInDb === true)
          : allPokes?.filter((p) => p.createdInDb !== true);
      const commonPokes2 =
        state.pokemonsByType.length > 0
          ? pokeFilter.filter((p) => state.pokemonsByType.includes(p))
          : pokeFilter;
      return {
        ...state,
        pokemonsByOrigin: pokeFilter,
        pokemons: commonPokes2,
        error:
          commonPokes2.length === 0
            ? { message: "There are no created dogs yet" }
            : null,
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
        action.payload === "powerful"
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
      if (action.payload.length === 0) {
        return {
          ...state,
          pokemons: action.payload,
          error: { message: "Not matches found" },
        };
      } else {
        return {
          ...state,
          pokemons: action.payload,
          error: null,
        };
      }

    case GET_POKE_DETAILS:
      return {
        ...state,
        pokeDetails: action.payload,
      };
    case ERROR_404:
      return { ...state, error: action.payload };
    case CREATE_POKEMON:
      return { ...state };
    case DELETE_POKEMON:
      return { ...state };
    case UPDATE_POKEMON:
      return { ...state };
    case CLEAN_DETAIL:
      return { ...state, pokeDetails: action.payload, error: null };
    case CLEAN_POKEMONS:
      return { ...state, pokemons: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
