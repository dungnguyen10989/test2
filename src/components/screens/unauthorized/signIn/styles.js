import { StyleSheet } from 'react-native';
import { _dims } from '../../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingTop: 20,
  },
  logo: {
    height: _dims.height / 3,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  form: {
    padding: 10,
  },
  input: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: 10,
    borderRadius: 1,
    margin: 10,
    fontSize: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
  },
});

export default styles;
