import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Text, View } from "react-native";
import { styles } from "./favouriteButton.styles";
import { saveFavorite } from "../../services/storage/favorites.storage";
import type { Pokemon, FavoriteButtonRef } from "./favouriteButton.types";

const FavoriteButton = forwardRef<FavoriteButtonRef>((props, ref) => {
  const buttonRef = useRef<View>(null);

  const layoutRef = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const updateLayout = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      layoutRef.current = { x, y, width, height };
    });
  };

  useImperativeHandle(ref, () => ({
    checkDrop: (pokemon: Pokemon, x: number, y: number) => {
      let isInside = false;

      buttonRef.current?.measureInWindow((bx, by, width, height) => {
        isInside = x >= bx && x <= bx + width && y >= by && y <= by + height;

        if (isInside) {
          saveFavorite(pokemon);
        }
      });

      return isInside;
    },
  }));

  return (
    <View ref={buttonRef} onLayout={updateLayout} style={styles.heartView}>
      <Text style={styles.heart}>❤️</Text>
    </View>
  );
});

export default FavoriteButton;
