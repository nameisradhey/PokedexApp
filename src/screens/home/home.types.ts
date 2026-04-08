export type ViewMode = 'grid' | 'list'

export interface PokemonListItem {
  name: string
  url: string
}

export interface Pokemon extends PokemonListItem {
  id: number
  types: string[]
  sprite: string
}
