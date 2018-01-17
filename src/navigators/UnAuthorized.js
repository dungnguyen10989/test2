import { StackNavigator } from 'react-navigation';

import Introduce from '../components/screens/unauthorized/introduce/Introduce';
import UnAuthForm from '../components/screens/unauthorized/unAuthForm/UnAuthForm';

const routeConfig = {
  Introduce: { screen: Introduce },
  UnAuthForm: { screen: UnAuthForm }
};

const navConfig = {
  initialRouteName: 'UnAuthForm',
  navigationOptions: {
    header: null,
  },
};

export default UnAuthorized = StackNavigator(routeConfig, navConfig);
