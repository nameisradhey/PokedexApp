import { StyleSheet } from "react-native";
import { Colors } from "../../setup/theme";
export const styles = StyleSheet.create({
  loadingRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(20,20,30,1)",
  },
  backButton: {
    position: "relative",
    left: -170,
    marginBottom: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.headerIconBg,
    borderWidth: 1,
    borderColor: Colors.headerIconBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorTitle: {
    marginTop: 24,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 8,
    color: "#fff",
    fontSize: 16,
  },
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hero: {
    alignItems: "center",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: -12,
  },
  heroId: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginBottom: 4,
  },
  heroName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  typeRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeChipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  heroImage: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
  contentCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: "row",
    gap: 12,
  },
  infoItem: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  infoLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    marginBottom: 8,
  },
  infoValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
