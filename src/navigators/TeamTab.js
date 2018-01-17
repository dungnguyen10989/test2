import { StackNavigator } from 'react-navigation';
import FilterTeam from './FilterTeam';
import TeamInformation from './TeamInformation';
import $DetailOfUser from '../components/common/containers/detailOfUser/indexDetailOfUser';
import TrainingInformation from './TrainingInformation';
import $DetailOfFeed from '../components/common/containers/detailOfFeed/DetailOfFeed';

const routeConfig = {
  FilterTeam: { screen: FilterTeam, navigationOptions: { } },
  TeamInformation: { screen: TeamInformation },
  DetailOfUser: { screen: $DetailOfUser },
  TrainingInformation: { screen: TrainingInformation },
  DetailOfFeed: { screen: $DetailOfFeed }
};

const navConfig = {
  initialRouteName: 'FilterTeam',  
};

export default TeamTab = StackNavigator(routeConfig, navConfig);