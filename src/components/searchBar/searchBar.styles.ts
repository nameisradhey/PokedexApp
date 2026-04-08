import { StyleSheet } from 'react-native'
import { Colors } from '../../setup/theme'

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.headerIconBg,
    borderWidth: 1,
    borderColor: Colors.headerIconBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 18,
    color: Colors.textLight,
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.headerSearchBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.headerIconBorder,
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 8,
  },
  searchIcon: {
    fontSize: 15,
    color: Colors.headerSearchIcon,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.textLight,
  },
})
