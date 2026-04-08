import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  drawerWindow: {
    width: 210,
    backgroundColor: 'rgba(20,20,30,1)',
  },
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 5,
    paddingBottom: 30,
  },
  title: {
    fontSize: 25,
    color: 'rgba(255, 255, 255, 0.8)',
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