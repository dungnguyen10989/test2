import { StyleSheet } from 'react-native';
import { _colors, _dims } from '../../../../utils';

export default styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 20
  },
  headerWrapper: {
    flexDirection: 'row'
  },
  avatar: {
    width: 60,
    height: 60
  },
  photo: {
    width: _dims.width - 40,
    height: _dims.width / 2 - 20
  },
  headerRight: {
    justifyContent: 'space-around',
    marginLeft: 10,
    flex: 1
  },
  infoWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 1
  },
  time: {
    textAlign: 'right',
  },
  title: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  address: {
    color: 'gray',
    paddingVertical: 1
  },
  level: {
    fontWeight: 'bold'
  }
});