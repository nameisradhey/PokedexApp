import type { RefObject } from "react"
import type { FavoriteButtonRef } from "../favouriteButton/favouriteButton.types"
import type { PokemonListItem, ViewMode } from '../../screens/home/home.types'

export interface PokemonCardProps {
  pokemon: PokemonListItem
  viewMode: ViewMode
  numColumns: number
  dropZoneRef?: RefObject<FavoriteButtonRef | null>
}
