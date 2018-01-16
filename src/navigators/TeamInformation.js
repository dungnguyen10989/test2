import React from 'react';
import { compose } from 'recompose';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import $DetailOfTeam from '../components/common/containers/detailOfTeam/indexDetailOfTeam';
import $TrainingsOfTeam from '../components/common/containers/trainingsOfTeam/indexTrainingOfTeam';
import $MembersOfTeam from '../components/common/containers/membersOfTeam/indexMembersOfTeam';
import $MarkerMap from '../components/common/containers/markerMap';
import HeaderLeft from './headerLeft';

const TeamInformation = (props) => {
  const { id, type } = props.navigation.state.params;

  const routeConfig = {
    DetailOfTeam: { screen: $DetailOfTeam },
    TrainingsOfTeam: { screen: $TrainingsOfTeam },
    MembersOfTeam: { screen: $MembersOfTeam },
    MarkerMap: { screen: $MarkerMap },
  };
  
  const navConfig = {
    initialRouteName: 'DetailOfTeam',
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'top',
  };

  const TeamInformationNav = TabNavigator(routeConfig, navConfig);

  return (
    <TeamInformationNav screenProps={{ id, type, navigation: props.navigation }} />
  );
};

const HOCTeamInformation = compose(
  connect(
    state => ({
      strings: state.strings
    })
  )
)(TeamInformation);

HOCTeamInformation.navigationOptions = props => ({
  title: 'Team',
  headerLeft: <HeaderLeft onPress={() => props.navigation.goBack()} />,
  headerBackTitle: ''
});

export default HOCTeamInformation;