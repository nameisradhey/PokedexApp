import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PokemonURL } from '../urls/pokemon.urls'
import type {
  PokemonListResponse,
  PokemonTypeResponse,
  PokemonTypesListResponse,
  PokemonDetailResponse,
} from '../response/pokemon'

export interface PokemonListParams {
  limit: number
  offset: number
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: PokemonURL.BASE }),
  endpoints: builder => ({
    getPokemonList: builder.query<PokemonListResponse, PokemonListParams>({
      query: ({ limit, offset }) =>
        `${PokemonURL.LIST}?limit=${limit}&offset=${offset}`,
    }),

    getPokemonTypes: builder.query<PokemonTypesListResponse, void>({
      query: () => PokemonURL.TYPES,
    }),

    getPokemonByType: builder.query<PokemonTypeResponse, string>({
      query: type => PokemonURL.By_Type(type),
    }),

    getPokemonDetail: builder.query<PokemonDetailResponse, string>({
      query: url => url.replace(PokemonURL.BASE, ''),
    }),
  }),
})

export const {
  useGetPokemonListQuery,
  useGetPokemonTypesQuery,
  useGetPokemonByTypeQuery,
  useGetPokemonDetailQuery,
} = pokemonApi
