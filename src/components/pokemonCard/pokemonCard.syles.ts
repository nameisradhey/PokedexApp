import { StyleSheet } from 'react-native'
import { Colors } from '../../setup/theme'

export const styles = StyleSheet.create({
  gridCard: {
    flex: 1,
    margin: 6,
    borderRadius: 20,
    padding: 14,
    minHeight: 188,
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.cardSurfaceBorder,
    overflow: 'hidden',
    alignItems: 'flex-start',
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 18,
    padding: 12,
    minHeight: 124,
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: Colors.cardSurfaceBorder,
  },
  idText: {
    fontSize: 13,
    color: Colors.cardIdText,
    fontWeight: '600',
    marginBottom: 2,
  },
  listIdText: {
    fontSize: 15,
    color: Colors.cardIdText,
    fontWeight: '600',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.cardNameText,
    marginBottom: 6,
  },
  listNameText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.cardNameText,
    marginBottom: 6,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  typeBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 50,
    overflow: 'hidden',
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: Colors.cardTypeText,
  },
  listTypeBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: Colors.cardTypeText,
  },
  gridSprite: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginTop: 4,
  },
  listSprite: {
    width: 100,
    height: 100,
    marginRight: 50,
    marginLeft:30,
    resizeMode: 'contain',
  },
  listInfo: {
    flex: 1,
  },
  skeletonBlock: {
    backgroundColor: Colors.cardSkeleton,
    borderRadius: 12,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 999,
    backgroundColor: Colors.cardSkeleton,
    marginBottom: 8,
  },
  skeletonIdLine: {
    width: 52,
  },
  skeletonNameLine: {
    width: '60%',
    height: 18,
    marginBottom: 12,
  },
  skeletonPill: {
    height: 24,
    borderRadius: 999,
    backgroundColor: Colors.cardSkeleton,
  },
  skeletonTypePill: {
    width: 74,
  },
  skeletonTypePillShort: {
    width: 58,
  },
  skeletonSprite: {
    marginTop: 12,
  },
  decorEmoji:{
    position: 'absolute',
    top: 132,
    right: -10,
    fontSize: 50,
    opacity: 0.40,
  },
  listDecorEmoji:{
    position: 'absolute',
    top: 42,
    right: -20,
    fontSize: 50,
    opacity: 0.40,
  },

})
