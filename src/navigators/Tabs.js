import { TabNavigator } from 'react-navigation';
import EventTab from './EventTab';
import FeedTab from './FeedTab';
import TeamTab from './TeamTab';
import MapTab from '../components/screens/authorized/tabs/mapTab/MapTab';
import NotificationTab from './NotificationTab';
import Tabbar from './bars';

const routeConfig = {
  FeedTab: { screen: FeedTab },
  EventTab: { screen: EventTab },
  MapTab: { screen: MapTab },
  TeamTab: { screen: TeamTab },
  NotificationTab: { screen: NotificationTab },
};

const navConfig = {
  initialRouteName: 'TeamTab',
  tabBarComponent: Tabbar,
  lazy: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#000',
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
};

export default Tabs = TabNavigator(routeConfig, navConfig);