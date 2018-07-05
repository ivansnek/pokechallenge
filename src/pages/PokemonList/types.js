// Redux Action Types
export const LOAD_POKEMON_LIST = 'PokemonList/LOAD_POKEMON_LIST';
export const LOAD_POKEMON_LIST_SUCESS = 'PokemonList/LOAD_POKEMON_LIST_SUCESS';

// Flow Types
export type PokemonListItem = {
  name: string,
  url: string
};