import axios from "axios";
import {
  ALPHABETICAL_ORDER,
  EXISTING_CREATED_FILTER,
  FILTER_BY_TYPE,
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKE_DETAILS,
  GET_TYPES,
  ORDER_BY_ATTACK,
  ERROR_404,
} from "./action_types.js";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      var json = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      var json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

export const pokemonByName = (name) => {
  return async (dispatch) => {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log({ error: error.message });
      return alert(
        "There is not a pokemon with that name, try again with a new one"
      );
    }
  };
};

export const createPokemon = (payload) => {
  return async (dispatch) => {
    try {
      var response = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      return response;
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

export const getPokeDetails = (id) => {
  return async (dispatch) => {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: GET_POKE_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log({ error: error.message });
      return dispatch({
        type: ERROR_404,
        payload: { error: error.message },
      });
    }
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

export const existingCreatedFilter = (payload) => {
  return {
    type: EXISTING_CREATED_FILTER,
    payload,
  };
};

export const alphabeticalOrder = (payload) => {
  return {
    type: ALPHABETICAL_ORDER,
    payload,
  };
};

export const orderAttack = (payload) => {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
};
