export interface PokemonDetailResponse {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprites: {
    front_default: string | null
    back_default:  string | null
    front_shiny:   string | null
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  types: {
    type: { name: string; url: string }
  }[]
  stats: {
    base_stat: number
    stat: { name: string }
  }[]
  abilities: {
    ability: { name: string }
    is_hidden: boolean
    slot: number
  }[]
  moves: {
    move: { name: string }
    version_group_details: {
      level_learned_at: number
      move_learn_method: { name: string }
    }[]
  }[]
}