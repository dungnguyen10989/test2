import { TabNavigator } from 'react-navigation';
import FilterTeamTabbar from './bars/FilterTeamTabbar';
import AllTeams from '../components/screens/authorized/tabs/teamTab/AllTeams';
import MyTeams from '../components/screens/authorized/tabs/teamTab/MyTeams';

const routeConfig = {
  AllTeams: { screen: AllTeams },
  MyTeams: { screen: MyTeams }  
};

const navConfig = {
  initialRouteName: 'AllTeams',
  tabBarComponent: FilterTeamTabbar,
  lazy: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#000',
    labelStyle: styles.label
  },
  tabBarPosition: 'top',
  swipeEnabled: false,
  animationEnabled: true
};

export default FilterTeam = TabNavigator(routeConfig, navConfig);