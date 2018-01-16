import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  name: {
    fontSize: 18,
    color: 'black',
  },
  address: {
    fontSize: 14,
    color: '#95a5a6'
  },
  level: {
    fontSize: 14,
    color: '#60646D',
    marginVertical: 5,
  }
});
