import { LOADING_POKEMON_DATA, LOADED_POKEMON_DATA, CHANGE_URL } from './types';

const INITIAL_STATE = {
  data: {},
  loading: false,
  url: ''
}
export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOADED_POKEMON_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case CHANGE_URL:
      return {...state, url: action.payload };
    case LOADING_POKEMON_DATA:
      return { ...state, loading: action.payload }
    default:
    return INITIAL_STATE;
  }
}