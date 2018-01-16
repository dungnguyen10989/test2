import { combineReducers } from 'redux';
import { reducers as apiReducer } from 'redux-api-call';
import strings from '../common/strings';
import { disciplineReducer } from '../common/discipline';
import { levelReducer } from '../common/level';
import { mySelfReducer } from '../common/mySelf';
import { tokenReducer } from '../common/token';
import unAuthScreen from '../common/unAuthScreen';
import { listTeamReducer } from '../../components/common/containers/listTeam/stateListTeam';
import { listFeedReducer } from '../../components/common/containers/listFeed/stateListFeed';
import { listEventReducer } from '../../components/common/containers/listEvent/stateListEvent';
import { feedsOfUserReducer, detailOfUserReducer } from '../../components/common/containers/detailOfUser/stateDetailOfUser';
import { membersOfTeamReducer } from '../../components/common/containers/membersOfTeam/stateMembersOfTeam';
import { detailOfTeamReducer, feedsOfTeamReducer } from '../../components/common/containers/detailOfTeam/stateDetailOfTeam';
import { listFollowerReducer } from '../../components/common/containers/listFollower/stateListFollower';
import { trainingsOfTeamReducer } from '../../components/common/containers/trainingsOfTeam/stateTrainingOfTeam';
import { RootNav } from '../../navigators/Root';


// root navigator
const nav = (state, action) => {
  const nextState = RootNav.router.getStateForAction(action, state);
  return nextState || state;
};

const rootReducers = combineReducers({
  ...apiReducer,
  strings,
  nav,
  tokenReducer,
  unAuthScreen,
  disciplineReducer,
  levelReducer,
  mySelfReducer,
  listTeamReducer,
  listEventReducer,
  listFeedReducer,
  feedsOfUserReducer,
  detailOfUserReducer,
  feedsOfTeamReducer,
  membersOfTeamReducer,
  detailOfTeamReducer,
  listFollowerReducer,
  trainingsOfTeamReducer
});

export default rootReducers;
