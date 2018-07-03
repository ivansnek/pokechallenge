import axios from 'axios';
import {
  LOAD_POKEMON_LIST,
  LOAD_POKEMON_LIST_SUCESS,
} from './types';

export const loadPokemonList = (nextUrl) => {
  return (dispatch) => {
    dispatch({ type: LOAD_POKEMON_LIST, payload: true });
    axios.get(nextUrl)
      .then(response => {
        dispatch({
          type: LOAD_POKEMON_LIST_SUCESS,
          payload: response.data.results,
          url: response.data.next
        });
      })
      .catch(error => {
        // TODO: Handle Errors
        console.log(error);
      })
  }
};