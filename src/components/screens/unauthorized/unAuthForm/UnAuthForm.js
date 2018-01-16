import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import {
  ADVANCE_INFO, BASIC_INFO, CHECK_EMAIL,
  FORGOT, SIGN_IN, STRAVA_WEBVIEW
} from '../../../../redux/common/unAuthScreen';
import SignIn from '../signIn';
import Forgot from '../forgot';
import CheckEmail from '../checkEmail';
import BasicInfo from '../basicInfo';
import AdvanceInfo from '../advanceInfo';
import StravaWebview from '../strava';

const UnAuthForm = (props) => {
  const {
    unAuthScreen
  } = props;
  let Route;
  switch(unAuthScreen.routeName) {
    case SIGN_IN: 
      Route = SignIn;
      break;
    case CHECK_EMAIL: 
      Route = CheckEmail;
      break;
    case BASIC_INFO: 
      Route = BasicInfo;
      break;
    case FORGOT: 
      Route = Forgot;
      break;
    case ADVANCE_INFO: 
      Route = AdvanceInfo;
      break;
    case STRAVA_WEBVIEW: 
      Route = StravaWebview;
      break;
    default: break;
  }
  return (
    <Route />
  );
};

const HOCUnAuthForm = compose(
  connect(
    state => ({
      strings: state.strings,
      unAuthScreen: state.unAuthScreen
    }),
    dispatch => ({ dispatch })
  ),
  lifecycle({
    componentDidMount() {
      
    },
  })
)(UnAuthForm);

export default HOCUnAuthForm;
