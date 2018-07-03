import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import PokemonListReducer from '../pages/PokemonList/reducers';
import PokemonDetailReducer from '../pages/PokemonDetail/reducers';

const reducers = combineReducers({
  pokemonList: PokemonListReducer,
  pokemon: PokemonDetailReducer
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;
