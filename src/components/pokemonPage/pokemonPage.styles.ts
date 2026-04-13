import { StyleSheet } from "react-native";
import { Colors } from "../../setup/theme";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loadingRoot: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  backButton: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.headerIconBg,
    borderWidth: 1,
    borderColor: Colors.headerIconBorder,
    alignItems: "center",
    justifyContent: "center",
    left: 16,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: "600",
  },

  header: {
    height: 240,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
  pokemonImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  emojiBadge: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    top: 275,
    right: 16,
  },
  accentEmoji: {
    fontSize: 30,
  },


  identityBlock: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  idText: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
    opacity: 0.5,
  },
  pokemonName: {
    fontSize: 30,
    fontWeight: "700",
    textTransform: "capitalize",
    letterSpacing: -0.5,
    marginBottom: 10,
    color: Colors.textPrimary,
  },
  typesRow: {
    flexDirection: "row",
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 50,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textLight,
    textTransform: "capitalize",
  },

  infoRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.cardSurfaceBorder,
    overflow: "hidden",
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
  infoSeparator: {
    width: 0.5,
    backgroundColor: Colors.cardSurfaceBorder,
    marginVertical: 10,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },


  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },

  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  statName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    width: 36,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textPrimary,
    width: 30,
    textAlign: "right",
  },
  statBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  statBarFill: {
    height: 6,
    borderRadius: 3,
  },

  abilitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  abilityChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: Colors.card,
  },
  abilityChipHidden: {
    borderStyle: "dashed",
  },
  abilityText: {
    fontSize: 13,
    fontWeight: "500",
    textTransform: "capitalize",
    color: Colors.textPrimary,
  },
  abilityHiddenLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 1,
  },


  movesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  moveChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.cardSurfaceBorder,
  },
  moveLevelBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  moveLevelText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textLight,
  },
  moveNameText: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
    color: Colors.textPrimary,
  },

  spritesRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 30,
  },
  spriteBox: {
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 10,
    borderWidth: 0.5,
    borderColor: Colors.cardSurfaceBorder,
  },
  spriteImg: {
    width: 72,
    height: 72,
  },
  spriteLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
    textTransform: "capitalize",
  },

  errorTitle: {
    marginTop: 24,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 32,
  },
})