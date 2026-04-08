import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  gridCard: {
    flex: 1,
    margin: 6,
    borderRadius: 20,
    padding: 14,
    minHeight: 188,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgb(211, 211, 211)',
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
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: 'rgb(211, 211, 211)',
  },
  idText: {
    fontSize: 13,
    color: '#aaa',
    fontWeight: '600',
    marginBottom: 2,
  },
  listIdText: {
    fontSize: 15,
    color: '#aaa',
    fontWeight: '600',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  listNameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
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
    color: '#fff',
  },
  listTypeBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#fff',
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
    backgroundColor: 'rgba(215, 215, 215, 0.85)',
    borderRadius: 12,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(215, 215, 215, 0.85)',
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
    backgroundColor: 'rgba(215, 215, 215, 0.85)',
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
