// Redux Action Types
export const LOADED_POKEMON_DATA = 'PokemonDetail/LOADED_POKEMON_DATA';
export const LOADING_POKEMON_DATA = 'PokemonDetail/LOADING_POKEMON_DATA';
export const CHANGE_URL = 'PokemonDetail/CHANGE_URL';

// Flow Types

export type PokemonType = {
  name: string,
  weight: number,
  abilities: Array<object>,
  stats: Array<object>,
  types: Array<object>
};