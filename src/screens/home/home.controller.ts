import { useEffect, useMemo, useState } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import {
  useGetPokemonByTypeQuery,
  useGetPokemonListQuery,
} from '../../services/slices/pokemonApi'
import type { PokemonListItem, ViewMode } from './home.types'

const PAGE_SIZE = 10

export const useHomeController = () => {
  const navigation = useNavigation()

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [offset, setOffset] = useState(0)
  const [allPokemonList, setAllPokemonList] = useState<PokemonListItem[]>([])
  const [typedPokemonList, setTypedPokemonList] = useState<PokemonListItem[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const isTypeMode = selectedType !== 'all'

  const { data: listData, isFetching: isListFetching } = useGetPokemonListQuery(
    {
      limit: PAGE_SIZE,
      offset,
    },
    {
      skip: isTypeMode,
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
      return [...prev, ...nextItems]
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
    navigation.setParams({
      selectedType,
      onSelectType: setSelectedType,
    } as never)
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const loadMore = () => {
    if (isTypeMode) return

    if (!isListFetching && listData?.next) {
      setIsLoadingMore(true)
      if (offset!=1350) {
        setOffset(prev => prev + PAGE_SIZE)
      }
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
    setSelectedType,
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
