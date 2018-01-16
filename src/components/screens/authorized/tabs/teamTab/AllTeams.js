import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import $ListTeam from '../../../../common/containers/listTeam/indexListTeam';

const AllTeams = (props) => {
  return (
    <$ListTeam id={-1} navigation={props.navigation} />
  );
};

const HOCAllTeams = compose(
  connect(state => ({
    mySelf: state.mySelfReducer
  }))
)(AllTeams);
export default HOCAllTeams;
