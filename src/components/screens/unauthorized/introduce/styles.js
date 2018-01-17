import { StyleSheet } from 'react-native';
import { _dims } from '../../../../utils';

export default styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  slider: {
    width: _dims.width,
    height: _dims.height,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red'
  },
  swiper: {
    borderWidth: 1
  },
  image: {
    width: _dims.width,
    resizeMode: 'center'
  }
});