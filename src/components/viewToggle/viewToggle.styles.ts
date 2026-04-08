import { StyleSheet } from 'react-native'
import { Colors } from '../../setup/theme'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
  },
  btn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.toggleBg,
    borderWidth: 1,
    borderColor: Colors.toggleBorder,
  },
  btnActive: {
    backgroundColor: Colors.toggleActiveBg,
  },
  icon: {
    fontSize: 15,
  },
})
