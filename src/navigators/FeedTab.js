import { StackNavigator } from 'react-navigation';
import $ListFeed from '../components/common/containers/listFeed/indexListFeed';
import EventInformation from './EventInformation';
import TeamInformation from './TeamInformation';
import $DetailOfUser from '../components/common/containers/detailOfUser/indexDetailOfUser';
import TrainingInformation from './TrainingInformation';
import $DetailOfFeed from '../components/common/containers/detailOfFeed/DetailOfFeed';
import $Payment from '../components/common/containers/payment';

const routeConfig = {
  ListFeed: { screen: $ListFeed, navigationOptions: { } },
  EventInformation: { screen: EventInformation },
  TrainingInfomation: { screen: TrainingInformation },
  TeamInformation: { screen: TeamInformation },
  DetailOfUser: { screen: $DetailOfUser },
  Payment: { screen: $Payment },
  DetailOfFeed: { screen: $DetailOfFeed }
};

const navConfig = {
  initialRouteName: 'ListFeed',  
};

export default FeedTab = StackNavigator(routeConfig, navConfig);
