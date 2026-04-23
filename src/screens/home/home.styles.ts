import { StyleSheet } from "react-native";
import { Colors } from "../../setup/theme";
export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logo: {
    width: 200,
    height: 40,
    marginBottom: -15,
    resizeMode: "contain",
  },
  // Red header
  header: {
    backgroundColor: Colors.primary,
    paddingBottom: 10,
    shadowColor: Colors.headerShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    gap: 10,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textLight,
    letterSpacing: -0.3,
  },

  // Body
  body: {
    flex: 1,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  countText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 6,
    paddingBottom: 30,
  },
  emptyWrap: {
    alignItems: "center",
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  noInternetContainer: {
    flex: 1,
    paddingBottom: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  noInternetImage: {
    width: 190,
    height: 180,
    marginBottom: 20,
    borderRadius: 120,
  },
  noInternetWarning1: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "condensed",
    marginBottom: 5,
  },
  noInternetWarning2: {
    color: Colors.backgroundDark,
    fontSize: 12,
    marginBottom: 20,
  },
  noInternetButton: {
    backgroundColor: Colors.backgroundDark,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
