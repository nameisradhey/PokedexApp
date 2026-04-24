import { useEffect, useMemo, useRef, useState } from "react";
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
import {
  getFavorites,
  storage,
} from "../../services/storage/favorites.storage";
import { useDispatch } from "react-redux";
import { pokemonApi } from "../../services/slices/pokemonApi";

export const useHomeController = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [prevOffset, setPrevOffset] = useState(0);

  const [allPokemonList, setAllPokemonList] = useState<PokemonListItem[]>([]);
  const [typedPokemonList, setTypedPokemonList] = useState<PokemonListItem[]>([]);
  const [favouritesList, setFavouritesList] = useState<PokemonListItem[]>([]);

  const [shouldFetchSearchPool, setShouldFetchSearchPool] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showPaginationRetry, setShowPaginationRetry] = useState(false);

  const offsetRef = useRef(offset);
  const prevOffsetRef = useRef(prevOffset);
  const isLoadingMoreRef = useRef(isLoadingMore);
  const showPaginationRetryRef = useRef(showPaginationRetry);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    prevOffsetRef.current = prevOffset;
  }, [prevOffset]);

  useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  useEffect(() => {
    showPaginationRetryRef.current = showPaginationRetry;
  }, [showPaginationRetry]);

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
    Constants.Max_Pokemon_Count - offset,
  );

  const {
    data: listData,
    error: listError,
    refetch: refetchList,
  } = useGetPokemonListQuery(
    { limit: currentLimit, offset },
    {
      skip: isTypeMode || isFavourites || currentLimit <= 0,
    },
  );

  const {
    data: typeData,
    isFetching: isTypeFetching,
    error: typeError,
    refetch: refetchType,
  } = useGetPokemonByTypeQuery(selectedType, {
    skip: !isTypeMode,
  });

  const { data: searchPoolData } = useGetPokemonListQuery(
    { limit: 1350, offset: 0 },
    { skip: !shouldFetchSearchPool },
  );

  useEffect(() => {
    if (listError) {
      isLoadingMoreRef.current = false;
      showPaginationRetryRef.current = true;
      setIsLoadingMore(false);
      setOffset(prevOffsetRef.current);
      setShowPaginationRetry(true);
      return;
    }

    if (!listData?.results) {
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
      return;
    }

    if (showPaginationRetryRef.current) {
      return;
    }

    setAllPokemonList((prev) => {
      const existing = new Set(prev.map((item) => item.url));
      const nextItems = listData.results.filter(
        (item) => !existing.has(item.url),
      );
      return [...prev, ...nextItems].slice(0, Constants.Max_Pokemon_Count);
    });

    isLoadingMoreRef.current = false;
    showPaginationRetryRef.current = false;
    setIsLoadingMore(false);
    setShowPaginationRetry(false);
  }, [listData, listError]);

  useEffect(() => {
    if (!isTypeMode) return;

    if (isTypeFetching) return;

    if (typeError) {
      setTypedPokemonList([]);
      return;
    }

    if (!typeData?.pokemon) return;

    const normalized = typeData.pokemon.map((item) => ({
      name: item.pokemon.name,
      url: item.pokemon.url,
    }));

    setTypedPokemonList(normalized);
  }, [isTypeMode, typeData, typeError, isTypeFetching]);

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
        setFavouritesList(favs.map((p) => ({ name: p.name, url: p.url })));
      }
    });
    return () => listener.remove();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
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
    if (isLoadingMoreRef.current) return;
    if (showPaginationRetryRef.current) return;
    if (allPokemonList.length >= Constants.Max_Pokemon_Count) return;

    const nextOffset = offsetRef.current + Constants.Page_Size;
    if (nextOffset >= Constants.Max_Pokemon_Count) return;

    isLoadingMoreRef.current = true;
    setPrevOffset(offsetRef.current);
    setIsLoadingMore(true);
    setOffset(nextOffset);
  };

  const retryPagination = () => {
    if (isLoadingMoreRef.current) return;

    const nextOffset = offsetRef.current + Constants.Page_Size;
    if (nextOffset >= Constants.Max_Pokemon_Count) return;

    isLoadingMoreRef.current = true;
    showPaginationRetryRef.current = false;
    setShowPaginationRetry(false);
    setIsLoadingMore(true);
    setOffset(nextOffset);
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
      : (searchPoolData?.results ?? activePokemonList);

    return sourceList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(normalizedQuery),
    );
  }, [activePokemonList, debouncedSearch, searchPoolData, isFavourites]);

  const hasData = activePokemonList.length > 0;

  const isError =
    !hasData && (isTypeMode ? !!typeError : !!listError);

  const retry = () => {
    dispatch(pokemonApi.util.invalidateTags(["PokemonTypes"]));

    if (isTypeMode) {
      setTypedPokemonList([]);
      refetchType();
    } else {
      setOffset(0);
      setAllPokemonList([]);
      refetchList();
    }
  };

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
    retryPagination,
    canLoadMore:
      !isTypeMode &&
      !isFavourites &&
      !isLoadingMore &&
      !showPaginationRetry &&
      allPokemonList.length < Constants.Max_Pokemon_Count,
    isLoadingMore,
    showPaginationRetry,
    isTypeMode,
    isSearchMode: debouncedSearch.length > 0,
    isError,
    retry,
  };
};
