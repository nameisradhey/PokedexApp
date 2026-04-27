import { StyleSheet } from 'react-native'
import { Colors } from '../../setup/theme'

export const getStyles = (status: boolean) => StyleSheet.create({
  container: {
    position: "absolute",
        bottom: 0,
        height: 70,
        width: "100%",
        zIndex: 999,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: status ? "#333" : "#2e7d32",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
        paddingBottom: 10,
    },
    closeText: {
        color: "#ff4d4d",
        fontSize: 18,
        fontWeight: "800",
        position: "absolute",
        top: -10,
        right: -80,
    },
});