import { StyleSheet } from 'react-native';
import { _dims } from '../../utils';

export default styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  indicator: {
    position: 'absolute',
    width: _dims.width,
    height: _dims.height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1001
  },
  background: {
    flex: 1,
    resizeMode: 'stretch',
    width: _dims.width,
    height: _dims.height,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
});