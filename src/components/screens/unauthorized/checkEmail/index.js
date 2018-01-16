

import React from 'react';
import { View, Image } from 'react-native';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import { getDisciplineAction } from '../../../../redux/common/discipline';
import { getListTeamAction } from '../../../common/containers/listTeam/stateListTeam';

const CheckEmail = (props) => {
  console.log(props);
  return (
    <View style={{ flex: 1 }}>
    </View>
  );
};

const HOCCheckEmail = compose(
  connect(
    state => ({
      screen: state.unAuthScreen
    }),
    (dispatch) => ({
      dispatch,
      getDisciplineAction,
      getListTeamAction
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getDisciplineAction();
    }
  })
)(CheckEmail);

export default HOCCheckEmail;