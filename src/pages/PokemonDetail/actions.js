import axios from 'axios';
import { LOADING_POKEMON_DATA, LOADED_POKEMON_DATA, CHANGE_URL } from './types';

export const loadPokemon = (url) => {
  return (dispatch) => {
    dispatch({ type: LOADING_POKEMON_DATA, payload: true });
    axios.get(url)
      .then(response => {
        dispatch({
          type: LOADED_POKEMON_DATA,
          payload: response.data
        });
      })
      .catch(error => {
        // TODO: Handle Erros
        console.log(error);
      })
  }
};

export const changePokemonURL = (url) => ({ type: CHANGE_URL, payload: url });