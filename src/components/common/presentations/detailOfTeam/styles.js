import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  cover: {
    width,
    height: width / 2,
    backgroundColor: 'black'
  },
  coverNull: {
    backgroundColor: 'silver',
    borderBottomWidth: 0.5,
    borderColor: 'black'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    top: width / 2 - 40,
    left: width / 2 - 40,
    zIndex: 10000,
  },
  avatarNull: {
    backgroundColor: 'gray',
  },
  camera: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 60,
  },
  discipline: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24
  },
  followWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton: {
    paddingHorizontal: 20,
    borderColor: 'silver'
  },
  followText: {
    color: 'gray'
  },
  counterWrapper: {
    paddingVertical: 20,
    margin: 20,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'silver',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  counterButton: {
    flex: 1,
  },
  counterText: {
    textAlign: 'center'
  },
  controlWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 10,
  },
  controlButton: {
    marginHorizontal: 10
  },
  controlLeft: {
    alignSelf: 'flex-start', 
    flexDirection: 'row', 
    flex: 1, 
    height: '100%',
    alignItems: 'center' 
  }
});