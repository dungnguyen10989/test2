

import React from 'react';
import { View } from 'react-native';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

const CheckEmail = (props) => {
  return (
    <View style={{ flex: 1 }}>
    </View>
  );
};

const HOCCheckEmail = compose(
  connect(
    state => ({
      unAuthScreen: state.unAuthScreen
    }),
    (dispatch) => ({ dispatch })
  ),
  lifecycle({
    componentDidMount() {
    }
  })
)(CheckEmail);

export default HOCCheckEmail;