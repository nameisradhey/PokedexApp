import { StyleSheet } from "react-native";
import { Colors } from "../../setup/theme";
export const styles = StyleSheet.create({
  heartView: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.heart,
    borderWidth: 1,
    borderColor: Colors.heartBorder,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
    heart: {
    fontSize: 30,
    color: Colors.white,
    textAlign: "center",
    lineHeight: 70,
  },
});
