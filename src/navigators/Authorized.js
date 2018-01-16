import { DrawerNavigator } from 'react-navigation';

import Tabs from './Tabs';
import Settings from '../components/screens/authorized/settings/Settings';
import DrawMap from '../components/screens/authorized/drawMap/DrawMap';

const routeConfig = {
  Tabs: { screen: Tabs },
  Settings: { screen: Settings },
  DrawMap: { screen: DrawMap },
};

const navConfig = {
  initialRouteName: 'Tabs',
  navigationOptions: {
    header: null,
  },
};

export default Authorized = DrawerNavigator(routeConfig, navConfig);
