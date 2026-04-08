import { StyleSheet } from 'react-native';
import { Colors } from '../../setup/theme';

export const styles = StyleSheet.create({
  drawerWindow: {
    width: 210,
    backgroundColor: Colors.drawerBackground,
  },
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 5,
    paddingBottom: 30,
  },
  title: {
    fontSize: 25,
    color: Colors.drawerTitle,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 18,
    paddingLeft: 30,
  },
  item: {
    borderRadius: 50,
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
});
