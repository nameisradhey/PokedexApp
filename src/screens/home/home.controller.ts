import { useEffect, useMemo, useState } from "react";
import {
  useNavigation,
  DrawerActions,
  useRoute,
} from "@react-navigation/native";
import {
  useGetPokemonByTypeQuery,
  useGetPokemonListQuery,
} from "../../services/slices/pokemonApi";
import type { PokemonListItem, ViewMode } from "./home.types";
import { Constants } from "../../setup/theme/";
import { getFavorites, storage } from "../../services/storage/favorites.storage";

export const useHomeController = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [allPokemonList, setAllPokemonList] = useState<PokemonListItem[]>([]);
  const [typedPokemonList, setTypedPokemonList] = useState<PokemonListItem[]>([]);
  const [favouritesList, setFavouritesList] = useState<PokemonListItem[]>([]);
  const [shouldFetchSearchPool, setShouldFetchSearchPool] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const routeSelectedType =
    typeof route.params === "object" &&
    route.params !== null &&
    "selectedType" in route.params &&
    typeof route.params.selectedType === "string"
      ? route.params.selectedType
      : undefined;

  const selectedType =
    (routeSelectedType ?? route.name).toLowerCase() === "all"
      ? "all"
      : (routeSelectedType ?? route.name).toLowerCase();

  const isFavourites = selectedType === "favourites";
  const isTypeMode = selectedType !== "all" && !isFavourites;

  const currentLimit = Math.min(
    Constants.Page_Size,
    Constants.Max_Pokemon_Count - offset
  );

  const { data: listData, isFetching: isListFetching } =
    useGetPokemonListQuery(
      { limit: currentLimit, offset },
      {
        skip: isTypeMode || isFavourites || currentLimit <= 0,
      }
    );

  const { data: typeData, isFetching: isTypeFetching } =
    useGetPokemonByTypeQuery(selectedType, {
      skip: !isTypeMode,
    });

  const { data: searchPoolData, isFetching: isSearchPoolFetching } =
    useGetPokemonListQuery(
      { limit: 1350, offset: 0 },
      { skip: !shouldFetchSearchPool }
    );

  useEffect(() => {
    if (!listData?.results) return;
    setAllPokemonList((prev) => {
      const existing = new Set(prev.map((item) => item.url));
      const nextItems = listData.results.filter(
        (item) => !existing.has(item.url)
      );
      return [...prev, ...nextItems].slice(0, Constants.Max_Pokemon_Count);
    });
    setIsLoadingMore(false);
  }, [listData]);

  useEffect(() => {
  if (!isTypeMode || !typeData?.pokemon) return;

  const normalized = typeData.pokemon.map((item) => ({
    name: item.pokemon.name,
    url: item.pokemon.url,
  }));

  setTypedPokemonList(normalized);
}, [isTypeMode, typeData]);

  useEffect(() => {
    if (selectedType === "all") {
      setTypedPokemonList([]);
    }
  }, [selectedType]);

  useEffect(() => {
    if (!isFavourites) return;
    const favs = getFavorites();
    setFavouritesList(favs.map((p) => ({ name: p.name, url: p.url })));
  }, [isFavourites]);

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((key) => {
      if (key === "favorites") {
        const favs = getFavorites();
        setFavouritesList(
          favs.map((p) => ({ name: p.name, url: p.url }))
        );
      }
    });
    return () => listener.remove();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 2000);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const onSearchFocus = () => {
    if (shouldFetchSearchPool) return;
    setShouldFetchSearchPool(true);
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const loadMore = () => {
    if (isTypeMode || isFavourites) return;
    if (allPokemonList.length >= Constants.Max_Pokemon_Count) return;

    if (!isListFetching && listData?.next) {
      setIsLoadingMore(true);
      const nextOffset = offset + Constants.Page_Size;

      if (nextOffset >= Constants.Max_Pokemon_Count) {
        setIsLoadingMore(false);
        return;
      }

      setOffset(nextOffset);
    }
  };

  const activePokemonList = isFavourites
    ? favouritesList
    : isTypeMode
    ? typedPokemonList
    : allPokemonList;

  const filteredPokemon = useMemo(() => {
    const normalizedQuery = debouncedSearch.trim().toLowerCase();
    if (!normalizedQuery) return activePokemonList;

    const sourceList = isFavourites
      ? activePokemonList
      : searchPoolData?.results ?? activePokemonList;

    return sourceList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(normalizedQuery)
    );
  }, [activePokemonList, debouncedSearch, searchPoolData, isFavourites]);

  const isFetching = isFavourites
    ? false
    : isTypeMode
    ? isTypeFetching
    : isListFetching || isSearchPoolFetching;

  return {
    viewMode,
    setViewMode,
    selectedType,
    searchQuery,
    setSearchQuery,
    onSearchFocus,
    openDrawer,
    filteredPokemon,
    loadMore,
    isFetching,
    isLoadingMore,
    isTypeMode,
    isSearchMode: debouncedSearch.length > 0,
  };
};