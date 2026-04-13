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

const formatId = (id: number) => `#${String(id).padStart(4, "0")}`;

const formatHeight = (h: number) => `${(h / 10).toFixed(1)} m`;

const formatWeight = (w: number) => `${(w / 10).toFixed(1)} kg`;

const statColor = (value: number): string => {
  if (value < 50) return "#E84343";
  if (value < 90) return "#EF9F27";
  return "#639922";
};

const statLabel: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};

export const PokemonPage = () => {
  const navigation = useNavigation();
  const route = useRoute<PokemonPageRouteProp>();
  const { top } = useSafeAreaInsets();

  const { data, isFetching, isError } = useGetPokemonDetailQuery(
    route.params.url,
  );

  const pokemon = data ?? null;
  const types = pokemon?.types.map((t) => t.type.name) ?? [];
  const accentType = types[0] ?? "normal";
  const accentColor = Type_Meta[accentType]?.color ?? "#888";
  const accentEmoji = Type_Meta[accentType]?.emoji ?? "❓";
  const sprite = pokemon ? PokemonURL.Pokemon_Image(pokemon.id) : undefined;

  const levelUpMoves = pokemon
    ? pokemon.moves
        .map((m) => {
          const detail = m.version_group_details.find(
            (d) =>
              d.move_learn_method.name === "level-up" && d.level_learned_at > 0,
          );
          return detail
            ? { name: m.move.name, level: detail.level_learned_at }
            : null;
        })
        .filter(Boolean)
        .sort((a, b) => a!.level - b!.level)
        .filter((m, i, arr) => arr.findIndex((x) => x!.name === m!.name) === i)
        .slice(0, 20)
    : [];

  if (isFetching && !pokemon) {
    return (
      <View style={[styles.loadingRoot, { paddingTop: top + 24 }]}>
        <TouchableOpacity
          style={[styles.backButton, { top: top + 8 }]}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <ActivityIndicator
          size="large"
          color={accentColor}
          style={{ marginTop: 80 }}
        />
      </View>
    );
  }

  if (isError || !pokemon) {
    return (
      <View style={[styles.loadingRoot, { paddingTop: top + 24 }]}>
        <TouchableOpacity
          style={[styles.backButton, { top: top + 8 }]}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.errorTitle}>Unable to load Pokémon</Text>
        <Text style={styles.errorText}>
          The detail request failed for {route.params.name}.
        </Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >

      <View style={{ backgroundColor: accentColor, paddingTop: top }}>
        <TouchableOpacity
          style={[styles.backButton, { top: top + 8 }]}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <View style={styles.emojiBadge}>
          <Text style={styles.accentEmoji}>{accentEmoji}</Text>
        </View>

        <View style={styles.header}>
          <Image
            source={{ uri: sprite }}
            style={styles.pokemonImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.identityBlock}>
        <Text style={[styles.idText, { color: accentColor }]}>
          {formatId(pokemon.id)}
        </Text>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
        <View style={styles.typesRow}>
          {types.map((type) => (
            <View
              key={type}
              style={[
                styles.typeBadge,
                { backgroundColor: Type_Meta[type]?.color ?? "#888" },
              ]}
            >
              <Text style={styles.typeBadgeText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{formatHeight(pokemon.height)}</Text>
          <Text style={styles.infoLabel}>Height</Text>
        </View>
        <View style={styles.infoSeparator} />
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{formatWeight(pokemon.weight)}</Text>
          <Text style={styles.infoLabel}>Weight</Text>
        </View>
        <View style={styles.infoSeparator} />
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{pokemon.base_experience ?? "—"}</Text>
          <Text style={styles.infoLabel}>Base XP</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Base stats</Text>
        {pokemon.stats.map((stat) => {
          const val = stat.base_stat;
          const max = 255;
          const pct = Math.min(val / max, 1);
          const color = statColor(val);
          const label = statLabel[stat.stat.name] ?? stat.stat.name;
          return (
            <View key={stat.stat.name} style={styles.statRow}>
              <Text style={styles.statName}>{label}</Text>
              <Text style={styles.statValue}>{val}</Text>
              <View style={styles.statBarBg}>
                <View
                  style={[
                    styles.statBarFill,
                    { width: `${pct * 100}%`, backgroundColor: color },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* ── Abilities ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Abilities</Text>
        <View style={styles.abilitiesRow}>
          {pokemon.abilities.map((a) => (
            <View
              key={a.ability.name}
              style={[
                styles.abilityChip,
                {
                  borderColor: a.is_hidden
                    ? accentColor + "60"
                    : accentColor + "30",
                },
                a.is_hidden && styles.abilityChipHidden,
              ]}
            >
              <Text style={[styles.abilityText, { color: accentColor }]}>
                {a.ability.name}
              </Text>
              {a.is_hidden && (
                <Text style={styles.abilityHiddenLabel}>hidden</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {levelUpMoves.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Level-up moves</Text>
          <View style={styles.movesGrid}>
            {levelUpMoves.map((m) => (
              <View key={m!.name} style={styles.moveChip}>
                <View
                  style={[
                    styles.moveLevelBadge,
                    { backgroundColor: accentColor },
                  ]}
                >
                  <Text style={styles.moveLevelText}>{m!.level}</Text>
                </View>
                <Text style={styles.moveNameText}>{m!.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sprites</Text>
        <View style={styles.spritesRow}>
          {[
            { uri: pokemon.sprites.front_default, label: "front" },
            { uri: pokemon.sprites.back_default, label: "back" },
            { uri: pokemon.sprites.front_shiny, label: "shiny" },
          ]
            .filter((s) => !!s.uri)
            .map((s) => (
              <View key={s.label} style={styles.spriteBox}>
                <Image
                  source={{ uri: s.uri! }}
                  style={styles.spriteImg}
                  resizeMode="contain"
                />
                <Text style={styles.spriteLabel}>{s.label}</Text>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonPage;
