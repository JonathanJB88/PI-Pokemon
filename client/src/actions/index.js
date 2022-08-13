import axios from "axios";
import { GET_POKEMONS } from "./action_types.js";

export const getPokemons = () => {
  return async (dispatch) => {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
  };
};
