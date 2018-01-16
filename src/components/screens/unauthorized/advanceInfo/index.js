/* eslint react/prop-types: 0 */
import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

import { CHANGE_UNAUTHORIZED_SCREEN, SIGN_IN, BASIC_INFO } from '../../../../redux/common/unAuthScreen';
import Header from '../Header';


class AdvanceInfo extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Header
          onLeftPress={() => this.props.dispatch({
            type: CHANGE_UNAUTHORIZED_SCREEN,
            payload: BASIC_INFO,
          })}
        />
        <Button
          title="register sucess"
          onPress={() => this.props.dispatch({
            type: CHANGE_UNAUTHORIZED_SCREEN,
            payload: SIGN_IN,
          })}
        />
      </View>
    );
  }
}

export default connect()(AdvanceInfo);
