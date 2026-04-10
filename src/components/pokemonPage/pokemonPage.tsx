import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetPokemonDetailQuery } from "../../services/slices/pokemonApi";
import { PokemonURL } from "../../services/urls/pokemon.urls";
import { Type_Meta } from "../../setup/theme";
import { styles } from "./pokemonPage.styles";
import type { PokemonPageRouteProp } from "./pokemonPage.types";

const formatPokemonId = (id: number) => `#${String(id).padStart(4, "0")}`;

export const PokemonPage = () => {
  const navigation = useNavigation();
  const route = useRoute<PokemonPageRouteProp>();
  const { top } = useSafeAreaInsets();
  const { data, isFetching, isError } = useGetPokemonDetailQuery(route.params.url);

  const pokemon = data ?? null;
  const name = pokemon?.name ?? route.params.name;
  const id = pokemon?.id ?? route.params.id;
  const types = pokemon?.types.map((item) => item.type.name) ?? [];
  const accentType = types[0] ?? "unknown";
  const accentColor = Type_Meta[accentType]?.color ?? "#888";
  const accentEmoji = Type_Meta[accentType]?.emoji ?? "❓";
  const sprite = pokemon ? PokemonURL.Pokemon_Image(pokemon.id) : undefined;

  if (isFetching && !pokemon) {
    return (
      <View style={[styles.loadingRoot, { paddingTop: top + 24 }]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

  if (isError || !pokemon) {
    return (
      <View style={[styles.loadingRoot, { paddingTop: top + 24 }]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.errorTitle}>Unable to load Pokemon</Text>
        <Text style={styles.errorText}>
          The detail request failed for {route.params.name}.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: `${accentColor}18` }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: accentColor, paddingTop: top + 18 }]}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={styles.heroEmoji}>{accentEmoji}</Text>
          <Text style={styles.heroId}>{formatPokemonId(id)}</Text>
          <Text style={styles.heroName}>{name}</Text>

          <View style={styles.typeRow}>
            {types.map((type) => (
              <View
                key={type}
                style={[
                  styles.typeChip,
                  { backgroundColor: Type_Meta[type]?.color ?? "#888" },
                ]}
              >
                <Text style={styles.typeChipText}>{type}</Text>
              </View>
            ))}
          </View>

          <Image
            source={{ uri: sprite }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>National ID</Text>
              <Text style={styles.infoValue}>{formatPokemonId(id)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Primary Type</Text>
              <Text style={styles.infoValue}>{types[0] ?? "Unknown"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Secondary Type</Text>
              <Text style={styles.infoValue}>{types[1] ?? "None"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonPage;
