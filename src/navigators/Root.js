import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import Authorized from './Authorized';
import Unauthorized from './UnAuthorized';


const routeConfig = {
  Unauthorized: { screen: Unauthorized },
  Authorized: { screen: Authorized },
};

const navConfig = {
  initialRouteName: 'Unauthorized',

  navigationOptions: {
    header: null,
  },
};

export const RootNav = StackNavigator(routeConfig, navConfig);

class Root extends React.Component {
  render() {
    return (
      <RootNav navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })}
      />
    );
  }
}

const mapStateToProps = state => ({ nav: state.nav });

export default connect(mapStateToProps)(Root);
