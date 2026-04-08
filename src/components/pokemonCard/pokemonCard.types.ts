import type { PokemonListItem, ViewMode } from '../../screens/home/home.types'

export interface PokemonCardProps {
  pokemon: PokemonListItem
  viewMode: ViewMode
  numColumns: number
}
