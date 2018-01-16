import { Dimensions, Platform } from 'react-native';

export const LIMIT_RESULT_SERVICE = 13;

export const _ios = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

export const _dims = {
  width,
  height,
  navHeight: 50,
  tabBarIconSize: 20,
  topBarHeight: _ios ? 66 : 46,
  topBarsIcon: 20
};

export const _colors = {
  headerBackground: '#eee',
  headerIcon: 'gray',
  inactiveIconText: '#333',
  bottomBarBackground: '#eee'
};

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const _validates = {
  email: email => emailRegExp.test(email),
};