import { createMMKV } from "react-native-mmkv";
import { Constants } from "../../setup/theme";

export interface FavoritePokemon {
  id: number;
  name: string;
  url: string;
}

export const storage = createMMKV({
  id: "pokedex-favorites",
});

const Favorites_Key = Constants.Favorites_Key;

export const getFavorites = (): FavoritePokemon[] => {
  const rawValue = storage.getString(Favorites_Key);

  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveFavorite = (pokemon: FavoritePokemon) => {
  if (!pokemon?.id || !pokemon?.name) {
    console.log("INVALID POKEMON:", pokemon);
    return [];
  }

  const favorites = getFavorites();

  const alreadyExists = favorites.some(
    (item) => item.id === pokemon.id
  );

  if (alreadyExists) {
    console.log("ALREADY EXISTS:", pokemon.id);
    return favorites;
  }

  const safePokemon: FavoritePokemon = {
    id: pokemon.id,
    name: pokemon.name,
    url: pokemon.url || "",
  };

  const updatedFavorites = [...favorites, safePokemon];

  console.log("SAVED:", safePokemon);

  storage.set(Favorites_Key, JSON.stringify(updatedFavorites));

  return updatedFavorites;
};