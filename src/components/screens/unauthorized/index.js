import React from 'react';
import { View, Image } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import {
  ADVANCE_INFO, BASIC_INFO, CHECK_EMAIL, FORGOT, SIGN_IN, STRAVA_WEBVIEW
} from '../../../redux/common/unAuthScreen';
import SignIn from './signIn';
import Forgot from './forgot';
import AdvanceInfo from './advanceInfo';
import BasicInfo from './basicInfo';
import CheckEmail from './checkEmail';
import StravaWebview from './strava';

const UnAuthForm = (props) => {
  const { screen } = props;
  return (
    <View style={{ flex: 1 }}>
      { screen === SIGN_IN && <SignIn /> }
      { screen === FORGOT && <Forgot /> }
      { screen === CHECK_EMAIL && <CheckEmail /> }
      { screen === BASIC_INFO && <BasicInfo /> }
      { screen === ADVANCE_INFO && <AdvanceInfo /> }
      { screen === STRAVA_WEBVIEW && <StravaWebview /> }
    </View>
  );
};

const HOCUnAuthForm = compose(
  connect(
    state => ({
      screen: state.unAuthScreen
    }),
    dispatch => ({
      dispatch
    })
  )
)(UnAuthForm);

export default HOCUnAuthForm;