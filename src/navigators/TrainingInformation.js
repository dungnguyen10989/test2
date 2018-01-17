import React from 'react';
import { compose } from 'recompose';
import { TabNavigator } from 'react-navigation';

import $DetailOfTraining from '../components/common/containers/detailOfTraining/indexDetailOfTraining';
import $MembersOfTraining from '../components/common/containers/membersOfTraining/indexMembersOfTraining';
import $MarkerMap from '../components/common/containers/markerMap/indexMarkerMap';

const TrainingInformation = (props) => {
  const { id, type } = props.navigation.state.params;

  const routeConfig = {
    DetailOfTraining: { screen: $DetailOfTraining },
    MembersOfTraining: { screen: $MembersOfTraining },
    MarkerMap: { screen: $MarkerMap },
  };
  
  const navConfig = {
    initialRouteName: 'DetailOfTraining',
    lazy: false,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'top',
  };

  const TrainingInformationNav = TabNavigator(routeConfig, navConfig);

  return (
    <TrainingInformationNav screenProps={{ id, type }} />
  );
};

const HOCTrainingInformation = compose()(TrainingInformation);

HOCTrainingInformation.navigationOptions = {
  title: 'Training'
};

export default HOCTrainingInformation;