import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors, Type_Meta } from "../../setup/theme";
import { useGetPokemonDetailQuery } from "../../services/slices/pokemonApi";
import { PokemonURL } from "../../services/urls/pokemon.urls";
import type { RootStackParamList } from "../../screens/drawer/appNavigator";
import { styles } from "./pokemonCard.syles";
import type { PokemonCardProps } from "./pokemonCard.types";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  viewMode,
  dropZoneRef,
}) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: detail, isFetching } = useGetPokemonDetailQuery(pokemon.url);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(0);
  const scale = useSharedValue(1);
  const bgcolor= useSharedValue(Colors.cardSurface);

  const handleDrop = (x: number, y: number) => {
    if (!detail) return;
    dropZoneRef?.current?.checkDrop(
      {
        id: detail.id,
        name: detail.name,
        url: pokemon.url,
      },
      x,
      y,
    );
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = 100;
      scale.value = withSpring(1.1);
      bgcolor.value = withSpring(Colors.cardSurfaceHover);
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((event) => {
      runOnJS(handleDrop)(event.absoluteX, event.absoluteY);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      isDragging.value = withSpring(0);
      bgcolor.value = withSpring(Colors.cardSurface); 
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      zIndex: isDragging.value ? 100 : 0,
      position: "relative",
      backgroundColor: bgcolor.value,
    };
  });
  
  const formattedId = detail ? `#${String(detail.id).padStart(4, "0")}`: "####";
  const types = detail?.types.map((typeItem) => typeItem.type.name) ?? [];
  const sprite = detail ? PokemonURL.Pokemon_Image(detail.id) : undefined;
  const displayType = types.find((t) => t !== "normal") || "normal";
  const isLoading = isFetching || !detail;
  
  const handlePress = () => {
    if (!detail) return;
    navigation.navigate("PokemonPage", {
      id: detail.id,
      name: detail.name,
      url: pokemon.url,
    });
  };

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
        <View
          style={[
            styles.gridSprite,
            styles.skeletonBlock,
            styles.skeletonSprite,
          ]}
        />
      </View>
    );
  }

  if (viewMode === "list") {
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.listCard, animatedStyle]}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            activeOpacity={0.75}
            onPress={handlePress}
          >
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
                      { backgroundColor: Type_Meta[type]?.color ?? "#888" },
                    ]}
                  >
                    <Text style={styles.listTypeBadgeText}>{type}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.listDecorEmoji}>
                {Type_Meta[displayType]?.emoji ?? "❓"}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    );
  }


  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.gridCard, animatedStyle]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={0.75}
          onPress={handlePress}
        >
          <Text style={styles.decorEmoji}>
            {Type_Meta[displayType]?.emoji ?? "❓"}
          </Text>
          <Text style={styles.idText}>{formattedId}</Text>
          <Text style={styles.nameText}>{detail.name}</Text>
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
          <Image
            source={{ uri: sprite }}
            style={styles.gridSprite}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

export default PokemonCard;
