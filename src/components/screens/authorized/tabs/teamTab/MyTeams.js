import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import $ListTeam from '../../../../common/containers/listTeam/indexListTeam';

const MyTeams = (props) => {
  return (
    <$ListTeam id={props.mySelf.id} navigation={props.navigation} />
  );
};

const HOCMyTeams = compose(
  connect(state => ({
    mySelf: state.mySelfReducer
  }))
)(MyTeams);
export default HOCMyTeams;
