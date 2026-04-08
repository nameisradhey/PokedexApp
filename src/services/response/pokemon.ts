export interface PokemonListResult {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListResult[]
}

export interface PokemonTypesListResponse {
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonTypeResponse {
  id: number
  name: string
  pokemon: {
    pokemon: PokemonListResult
    slot: number
  }[]
}

export interface PokemonDetailResponse {
  id: number
  name: string
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string
      }
    }
  }
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}
