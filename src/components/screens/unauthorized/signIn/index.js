import React from 'react';
import { View, TextInput, Alert } from 'react-native';
import { compose, withState, lifecycle } from 'recompose';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { 
  checkSocialExistsAction, 
  isFetchingSocialExistsSelector,
  isFetchingSocialTokenSelector
} from '../../../../redux/common/social';
import { getAuthTokenAction, isFetchingAuthTokenSelector } from '../../../../redux/common/auth';
import Overlay from '../../../common/presentations/overlay/';

import TwitterButton from './ButtonTW';
import { CHANGE_UNAUTHORIZED_SCREEN, BASIC_INFO } from '../../../../redux/common/unAuthScreen';

const FBSDK = require('react-native-fbsdk');

const {
  LoginButton,
  AccessToken
} = FBSDK;

const SignIn = (props) => {
  const {
    dispatch, username, setUserName, password, setPassword, strings,
    isFetchingSocialExists, isFetchingSocialToken, isFetchingAuthToken
  } = props;

  const visible = 
  isFetchingSocialExists || 
  isFetchingSocialToken || 
  isFetchingAuthToken;

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Overlay visible={visible} />
      <TwitterButton />
      <LoginButton
        publishPermissions={['publish_actions']}
        onLoginFinished={
            (error, result) => {
              if (error) {
                Alert.alert(
                  strings.error,
                  `${strings.facebookLogin} ${result.error}`,
                  [
                    { text: 'OK', onPress: () => {} },
                  ],
                  { cancelable: false }
                );
              } else if (result.isCancelled) {

              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const obj = {
                      provider_uid: data.userID,
                      provider: 'facebook',
                      token: data.accessToken
                    };
                    dispatch(checkSocialExistsAction(obj));
                  }
                );
              }
            }
          }
      />
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
        onPress={() => dispatch(getAuthTokenAction(username, password))}
      />
      <Button
        title="Forgot"
        onPress={() => dispatch({ type: CHANGE_UNAUTHORIZED_SCREEN, payload: { routeName: BASIC_INFO } })}
      />
    </View>
  );
};

const HOCSignIn = compose(
  connect(
    state => ({
      strings: state.strings,
      mySelf: state.mySelfReducer,
      isFetchingAuthToken: isFetchingAuthTokenSelector(state),
      isFetchingSocialExists: isFetchingSocialExistsSelector(state),
      isFetchingSocialToken: isFetchingSocialTokenSelector(state)
    }),
    dispatch => ({ dispatch }),
  ),
  withState('username', 'setUserName', 'admin@bikenconnect.com'),
  withState('password', 'setPassword', 'admin'),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if(nextProps.mySelf.id) {
        const resetRoot = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'Authorized' })]
        });
        this.props.dispatch(resetRoot);        
      }
    }
  })
)(SignIn);

export default HOCSignIn;