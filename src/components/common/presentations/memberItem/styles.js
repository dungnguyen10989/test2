import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  name: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5
  },
  city: {
    fontSize: 14,
    color: 'gray'
  },
  button: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 2
  },
  buttonText: {
    fontSize: 14
  },
  followedButton: {
    backgroundColor: '#000'
  },
  followedButtonText: {
    color: 'yellow'
  },
  unfollowedButton: {
    backgroundColor: 'silver'
  },
  unfollowedButtonText: {
    color: '#000'
  }
});
