export const PokemonURL = {
  BASE: 'https://pokeapi.co/api/v2',
  LIST: '/pokemon',
  TYPES: '/type',
  By_Type: (type: string) => `/type/${type}`,
  Pokemon_Image: (id: number | string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
}
