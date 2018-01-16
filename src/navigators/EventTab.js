import { StackNavigator } from 'react-navigation';
import $ListEvent from '../components/common/containers/listEvent/indexListEvent';
import EventInformation from './EventInformation';
import TeamInformation from './TeamInformation';
import $DetailOfUser from '../components/common/containers/detailOfUser/indexDetailOfUser';
import TrainingInformation from './TrainingInformation';
import $DetailOfFeed from '../components/common/containers/detailOfFeed/DetailOfFeed';
import $Payment from '../components/common/containers/payment';

const routeConfig = {
  ListEvent: { screen: $ListEvent, navigationOptions: { header: null } },
  EventInformation: { screen: EventInformation },
  TrainingInfomation: { screen: TrainingInformation },
  TeamInformation: { screen: TeamInformation },
  DetaiOfUser: { screen: $DetailOfUser },
  Payment: { screen: $Payment },
  DetailOfFeed: { screen: $DetailOfFeed }
};

const navConfig = {
  initialRouteName: 'ListEvent',  
};

export default EventTab = StackNavigator(routeConfig, navConfig);
