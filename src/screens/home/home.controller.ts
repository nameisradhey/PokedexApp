import { useEffect, useMemo, useState } from 'react'
import { useNavigation, DrawerActions, useRoute } from '@react-navigation/native'
import {
  useGetPokemonByTypeQuery,
  useGetPokemonListQuery,
} from '../../services/slices/pokemonApi'
import type { PokemonListItem, ViewMode } from './home.types'
import { Constants } from '../../setup/theme/'



export const useHomeController = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [offset, setOffset] = useState(0)
  const [allPokemonList, setAllPokemonList] = useState<PokemonListItem[]>([])
  const [typedPokemonList, setTypedPokemonList] = useState<PokemonListItem[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const selectedType = route.name.toLowerCase() === 'all' ? 'all' : route.name.toLowerCase()
  const isTypeMode = selectedType !== 'all'
  const currentLimit = Math.min(Constants.Page_Size, Constants.Max_Pokemon_Count - offset)

  const { data: listData, isFetching: isListFetching } = useGetPokemonListQuery(
    {
      limit: currentLimit,
      offset,
    },
    {
      skip: isTypeMode || currentLimit <= 0,
    }
  )

  const { data: typeData, isFetching: isTypeFetching } = useGetPokemonByTypeQuery(
    selectedType,
    {
      skip: !isTypeMode,
    }
  )

  useEffect(() => {
    if (!listData?.results) return
    setAllPokemonList(prev => {
      const existing = new Set(prev.map(item => item.url))
      const nextItems = listData.results.filter(item => !existing.has(item.url))
      return [...prev, ...nextItems].slice(0, Constants.Max_Pokemon_Count)
    })
    setIsLoadingMore(false)
  }, [listData])

  useEffect(() => {
    if (!isTypeMode || !typeData?.pokemon) return
    setTypedPokemonList(typeData.pokemon.map(item => item.pokemon))
  }, [isTypeMode, typeData])

  useEffect(() => {
    if (selectedType === 'all') {
      setTypedPokemonList([])
    }
  }, [selectedType])

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const loadMore = () => {
    if (isTypeMode) return
    if (allPokemonList.length >= Constants.Max_Pokemon_Count) return

    if (!isListFetching && listData?.next) {
      setIsLoadingMore(true)
      const nextOffset = offset + Constants.Page_Size

      if (nextOffset >= Constants.Max_Pokemon_Count) {
        setIsLoadingMore(false)
        return
      }

      setOffset(nextOffset)
    }
  }

  const activePokemonList = isTypeMode ? typedPokemonList : allPokemonList

  const filteredPokemon = useMemo(() => {
    return activePokemonList.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [activePokemonList, searchQuery])

  const isFetching = isTypeMode ? isTypeFetching : isListFetching

  return {
    viewMode,
    setViewMode,
    selectedType,
    searchQuery,
    setSearchQuery,
    openDrawer,
    filteredPokemon,
    loadMore,
    isFetching,
    isLoadingMore,
    isTypeMode,
  }
}
