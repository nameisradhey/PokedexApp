export const PokemonURL = {
  Base: 'https://pokeapi.co/api/v2',
  List: '/pokemon',
  Types: '/type',
  By_Type: (type: string) => `/type/${type}`,
  Pokemon_Image: (id: number | string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
}
