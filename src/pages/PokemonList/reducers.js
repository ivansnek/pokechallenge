import {
  LOAD_POKEMON_LIST,
  LOAD_POKEMON_LIST_SUCESS,
} from './types';
import CONFIG from '../../utils/config';

const INITIAL_STATE = {
  list: [],
  loading: false,
  nextURL: `${CONFIG.API_URL}/pokemon/?limit=25&offset=0`
}
export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_POKEMON_LIST:
      return { ...state, loading: true };
      case LOAD_POKEMON_LIST_SUCESS:
      return {
        ...state,
        list: [...state.list, ...action.payload],
        nextURL: action.url,
        loading: false
      };
    default:
    return { ...state };
  }
}