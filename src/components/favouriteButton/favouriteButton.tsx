import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Text, View } from "react-native";
import { styles } from "./favouriteButton.styles";
import {
  FavoriteButtonProps,
  FavoriteButtonRef,
  Pokemon,
} from "./favouriteButton.types";
import { saveFavorite } from "../../services/storage/favorites.storage";

const FavoriteButton = forwardRef<FavoriteButtonRef, FavoriteButtonProps>(
  (props, ref) => {
    const buttonRef = useRef<View>(null);

    useImperativeHandle(ref, () => ({
      checkDrop: (pokemon: Pokemon, x: number, y: number) => {
        buttonRef.current?.measureInWindow(
          (buttonX, buttonY, width, height) => {
            const isInsideX = x >= buttonX && x <= buttonX + width;
            const isInsideY = y >= buttonY && y <= buttonY + height;

            if (isInsideX && isInsideY) {
              saveFavorite(pokemon);
            }
          },
        );
      },
    }));

    return (
      <View ref={buttonRef} style={styles.heartView}>
        <Text style={styles.heart}>❤️</Text>
      </View>
    );
  },
);

export default FavoriteButton;
