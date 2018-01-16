/* eslint react/prop-types: 0 */
import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { CHANGE_UNAUTHORIZED_SCREEN, SIGN_IN } from '../../../../redux/common/unAuthScreen';
import Header from '../Header';


class Forgot extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Header
          onLeftPress={() => this.props.dispatch({
            type: CHANGE_UNAUTHORIZED_SCREEN,
            payload: SIGN_IN,
          })}
        />
        <Button
          title="send request success"
          onPress={() => this.props.dispatch({
            type: CHANGE_UNAUTHORIZED_SCREEN,
            payload: SIGN_IN,
          })}
        />
      </View>
    );
  }
}

export default connect()(Forgot);
