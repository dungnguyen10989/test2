import { TabNavigator } from 'react-navigation';
import AllTeams from '../components/screens/authorized/tabs/teamTab/AllTeams';
import MyTeams from '../components/screens/authorized/tabs/teamTab/MyTeams';

const routeConfig = {
  AllTeams: { screen: AllTeams },
  MyTeams: { screen: MyTeams }  
};

const navConfig = {
  initialRouteName: 'AllTeams',
  lazy: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#000',
    labelStyle: styles.label
  },
  tabBarPosition: 'top',
  swipeEnabled: false,
  animationEnabled: false
};

export default FilterTeam = TabNavigator(routeConfig, navConfig);