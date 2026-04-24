import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHomeController } from "./home.controller";
import { SearchBar, PokemonCard, ViewToggle } from "../../components";
import { styles } from "./home.styles";
import type { PokemonListItem } from "./home.types";
import { pngs } from "../../assets/png";
import FavoriteButton from "../../components/favouriteButton/favouriteButton";
import type { FavoriteButtonRef } from "../../components/favouriteButton/favouriteButton.types";

const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const numColumns = width > 600 ? 3 : 2;

  const dropZoneRef = useRef<FavoriteButtonRef>(null);
  const endReachedDuringMomentumRef = useRef(true);

  const {
    viewMode,
    setViewMode,
    selectedType,
    searchQuery,
    setSearchQuery,
    onSearchFocus,
    filteredPokemon,
    openDrawer,
    loadMore,
    canLoadMore,
    isLoadingMore,
    showPaginationRetry,
    retryPagination,
    isTypeMode,
    isSearchMode,
    isError,
    retry,
  } = useHomeController();

  const handleEndReached = () => {
    if (endReachedDuringMomentumRef.current) return;
    if (!canLoadMore) return;

    endReachedDuringMomentumRef.current = true;
    loadMore();
  };

  const handleRetryPagination = () => {
    endReachedDuringMomentumRef.current = true;
    retryPagination();
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: top }]}>
        <View style={styles.headerTop}>
          <Image source={pngs.adaptiveIcon} style={styles.logo} />
        </View>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onMenuPress={openDrawer}
          onFocus={onSearchFocus}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.toolbar}>
          <Text style={styles.countText}>
            {isError
              ? "No Internet Connection"
              : filteredPokemon.length + " Pokémon"}
            {selectedType !== "all" ? ` · ${selectedType}` : ""}
          </Text>
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </View>

        <FavoriteButton ref={dropZoneRef} />

        {isError ? (
          <View style={styles.noInternetContainer}>
            <Image
              source={pngs.noInternet}
              style={styles.noInternetImage}
              resizeMode="contain"
            />
            <Text style={styles.noInternetWarning1}>
              No Internet Connection
            </Text>
            <Text style={styles.noInternetWarning2}>
              Please check your connection
            </Text>
            <TouchableOpacity onPress={retry} style={styles.noInternetButton}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            key={`${viewMode}-${numColumns}`}
            data={filteredPokemon}
            keyExtractor={(item) => item.url}
            numColumns={viewMode === "grid" ? numColumns : 1}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }: { item: PokemonListItem }) => (
              <PokemonCard
                pokemon={item}
                viewMode={viewMode}
                numColumns={numColumns}
                dropZoneRef={dropZoneRef}
              />
            )}
            onEndReached={
              isSearchMode || !canLoadMore ? undefined : handleEndReached
            }
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => {
              endReachedDuringMomentumRef.current = false;
            }}
            onScrollBeginDrag={() => {
              endReachedDuringMomentumRef.current = false;
            }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              !isTypeMode && !isSearchMode ? (
                isLoadingMore ? (
                  <ActivityIndicator size="small" color="#cc0000" />
                ) : showPaginationRetry ? (
                  <TouchableOpacity
                    onPress={handleRetryPagination}
                    style={{
                      alignSelf: "center",
                      padding: 10,
                      borderRadius: 50,
                      backgroundColor: "#cc0000",
                      marginVertical: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      Retry
                    </Text>
                  </TouchableOpacity>
                ) : null
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
