import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TYPE_META } from "../../setup/theme/type";
import { useGetPokemonDetailQuery } from "../../services/slices/pokemonApi";
import { PokemonURL } from "../../services/urls/pokemon.urls";
import { styles } from "./pokemonCard.syles";
import type { PokemonCardProps } from "./pokemonCard.types";

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, viewMode }) => {
  const { data: detail, isFetching } = useGetPokemonDetailQuery(pokemon.url);

  const formattedId = detail ? `#${String(detail.id).padStart(4, "0")}` : "####";
  const types = detail?.types.map((typeItem) => typeItem.type.name) ?? [];
  const sprite = detail ? PokemonURL.OFFICIAL_ARTWORK(detail.id) : undefined;
  const displayType = types.find((t) => t !== "normal") || "normal";
  const isLoading = isFetching || !detail;

  if (isLoading && viewMode === "list") {
    return (
      <View style={styles.listCard}>
        <View style={[styles.listSprite, styles.skeletonBlock]} />
        <View style={styles.listInfo}>
          <View style={[styles.skeletonLine, styles.skeletonIdLine]} />
          <View style={[styles.skeletonLine, styles.skeletonNameLine]} />
          <View style={styles.typesRow}>
            <View style={[styles.skeletonPill, styles.skeletonTypePill]} />
            <View style={[styles.skeletonPill, styles.skeletonTypePillShort]} />
          </View>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.gridCard}>
        <View style={[styles.skeletonLine, styles.skeletonIdLine]} />
        <View style={[styles.skeletonLine, styles.skeletonNameLine]} />
        <View style={styles.typesRow}>
          <View style={[styles.skeletonPill, styles.skeletonTypePill]} />
          <View style={[styles.skeletonPill, styles.skeletonTypePillShort]} />
        </View>
        <View style={[styles.gridSprite, styles.skeletonBlock, styles.skeletonSprite]} />
      </View>
    );
  }

  if (viewMode === "list") {
    return (
      <TouchableOpacity style={styles.listCard} activeOpacity={0.75}>
        <Image
          source={{ uri: sprite }}
          style={styles.listSprite}
          resizeMode="contain"
        />
        <View style={styles.listInfo}>
          <Text style={styles.listIdText}>{formattedId}</Text>
          <Text style={styles.listNameText}>{detail.name}</Text>
          <View style={styles.typesRow}>
            {types.map((type) => (
              <View
                key={type}
                style={[
                  styles.typeBadge,
                  { backgroundColor: TYPE_META[type]?.color ?? "#888" },
                ]}
              >
                <Text style={styles.listTypeBadgeText}>{type}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.listDecorEmoji}>
            {TYPE_META[displayType]?.emoji ?? "❓"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.gridCard} activeOpacity={0.75}>
      <Text style={styles.decorEmoji}>
        {TYPE_META[displayType]?.emoji ?? "❓"}
      </Text>
      <Text style={styles.idText}>{formattedId}</Text>
      <Text style={styles.nameText}>{detail.name}</Text>
      <View style={styles.typesRow}>
        {types.map((type) => (
          <View
            key={type}
            style={[
              styles.typeBadge,
              { backgroundColor: TYPE_META[type]?.color ?? "#888" },
            ]}
          >
            <Text style={styles.typeBadgeText}>{type}</Text>
          </View>
        ))}
      </View>
      <Image
        source={{ uri: sprite }}
        style={styles.gridSprite}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PokemonCard;
