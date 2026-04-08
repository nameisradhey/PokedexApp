export const PokemonURL = {
  BASE: 'https://pokeapi.co/api/v2',
  LIST: '/pokemon',
  TYPES: '/type',
  BY_TYPE: (type: string) => `/type/${type}`,
  OFFICIAL_ARTWORK: (id: number | string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
}
