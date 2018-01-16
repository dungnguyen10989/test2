import { StackNavigator } from 'react-navigation';

import Chat from '../components/screens/authorized/chat/Chat';

const routeConfig = {
  Chat: { screen: Chat },
};

const navConfig = {
  initialRouteName: 'Chat',
};

const NotificationTab = StackNavigator(routeConfig, navConfig);
export default NotificationTab;
