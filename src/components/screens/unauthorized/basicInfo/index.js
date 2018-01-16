/* eslint react/prop-types: 0 */
import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import {
  CHANGE_UNAUTHORIZED_SCREEN, ADVANCE_INFO, CHECK_EMAIL, BASIC_INFO
} from '../../../../redux/common/unAuthScreen';
import Header from '../Header';


class BasicInfo extends React.Component {
  render() {
    const { unAuthScreen } = this.props;
    onLeftPress = () => this.props.dispatch({
      type: CHANGE_UNAUTHORIZED_SCREEN,
      payload: { routeName: CHECK_EMAIL },
    });
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Header
          onLeftPress={onLeftPress}
          back={false}
        />
        <Button
          title="goto advance info"
          onPress={() => this.props.dispatch({
            type: CHANGE_UNAUTHORIZED_SCREEN,
            payload: { routeName: ADVANCE_INFO },
          })}
        />
      </View>
    );
  }
}

export default connect(state => ({ unAuthScreen: state.unAuthScreen }))(BasicInfo);
