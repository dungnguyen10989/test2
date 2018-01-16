import React from 'react';
import { compose } from 'recompose';
import { TabNavigator } from 'react-navigation';

import $DetailOfEvent from '../components/common/containers/detailOfEvent/indexDetailOfEvent';
import $MembersOfEvent from '../components/common/containers/membersOfEvent/indexMembersOfEvent';
import $MarkerMap from '../components/common/containers/markerMap';

const EventInformation = (props) => {
  const { id, type } = props.navigation.state.params;

  const routeConfig = {
    DetailOfEvent: { screen: $DetailOfEvent },
    MembersOfEvent: { screen: $MembersOfEvent },
    MarkerMap: { screen: $MarkerMap },
  };
  
  const navConfig = {
    initialRouteName: 'DetailOfEvent',
    lazy: false,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'top',
  };

  const EventInformationNav = TabNavigator(routeConfig, navConfig);

  return (
    <EventInformationNav screenProps={{ id, type }} />
  );
};

const HOCEventInformation = compose()(EventInformation);

HOCEventInformation.navigationOptions = {
  title: 'Event'
};

export default HOCEventInformation;