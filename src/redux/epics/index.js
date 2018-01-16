import { combineEpics } from 'redux-observable';
import { disciplineEpic } from '../common/discipline';
import { levelEpic } from '../common/level';
import { tokenEpic } from '../common/token';
import { mySelfEpic } from '../common/mySelf';
import { listTeamEpic } from '../../components/common/containers/listTeam/stateListTeam';
import { listEventEpic } from '../../components/common/containers/listEvent/stateListEvent';
import { listFeedEpic } from '../../components/common/containers/listFeed/stateListFeed';
import { detailOfUserEpic } from '../../components/common/containers/detailOfUser/stateDetailOfUser';
import { membersOfTeamEpic } from '../../components/common/containers/membersOfTeam/stateMembersOfTeam';
import { detailOfTeamEpic } from '../../components/common/containers/detailOfTeam/stateDetailOfTeam';
import { listFollowerEpic } from '../../components/common/containers/listFollower/stateListFollower';
import { trainingsOfTeamEpic } from '../../components/common/containers/trainingsOfTeam/stateTrainingOfTeam';

export default combineEpics(
  disciplineEpic,
  levelEpic,
  tokenEpic,
  mySelfEpic,
  listTeamEpic,
  listEventEpic,
  listFeedEpic,
  detailOfTeamEpic,
  detailOfUserEpic,
  membersOfTeamEpic,
  listFollowerEpic,
  trainingsOfTeamEpic
);
