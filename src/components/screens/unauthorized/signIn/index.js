import React from 'react';
import { View, TextInput } from 'react-native';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { getAuthTokenAction, isFetchingAuthTokenSelector } from '../../../../redux/common/token';


const navigate = (routeName) => NavigationActions.navigate({ routeName });

const SignIn = (props) => {
  const { 
    getAuthTokenAction, username, setUserName, password, setPassword
  } = props;
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput 
        style={{ 
          height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#fff', width: '100%' 
        }}
        onChangeText={(username) => setUserName(username)}
        value={username}
      />
      <TextInput 
        style={{ 
          height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#fff', width: '100%' 
        }}
        onChangeText={(password) => setPassword(password)}
        value={password}
      />
      <Button 
        title="log in"
        onPress={() => getAuthTokenAction(username, password)}
      />
      <Button 
        title="Forgot"
        onPress={() => props.navigation.dispatch(navigate('Forgot'))}
      />
      <Button 
        title="log in"
        onPress={() => getAuthTokenAction(username, password)}
      />
    </View>
  );
};

const HOCSignIn = compose(
  connect(
    state => ({
      isFetchingAuthToken: isFetchingAuthTokenSelector(state),
      strings: state.strings
    }),
    {
      getAuthTokenAction
    }
  ),
  withState('username', 'setUserName', 'admin@bikenconnect.com'),
  withState('password', 'setPassword', 'admin'),
)(SignIn);

export default HOCSignIn;