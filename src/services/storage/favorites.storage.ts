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
  if (!rawValue) {
    return [];
  }
  try {
    const parsedValue = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }
    return parsedValue;
  } catch {
    return [];
  }
};
export const saveFavorite = (pokemon: FavoritePokemon) => {
  const favorites = getFavorites();
  const alreadyExists = favorites.some((item) => item.url === pokemon.url);
  if (alreadyExists) {
    return favorites;
  }
  const updatedFavorites = [...favorites, pokemon];
  storage.set(Favorites_Key, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};
