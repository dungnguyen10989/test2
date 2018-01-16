import { makeFetchAction } from 'redux-api-call';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { API_TRAINING } from '../../../../utils/_APIs';
import { handleSuccessList } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

export const GET_TRAININGS_OF_TEAM = 'GET_TRAININGS_OF_TEAM';
export const GET_TRAININGS_OF_TEAM_SUCCESS = 'GET_TRAININGS_OF_TEAM_SUCCESS';
export const REFRESH_TRAININGS_OF_TEAM = 'REFRESH_TRAININGS_OF_TEAM';

export const {
  actionCreator: getTrainingsOfTeamAction,
  isFetchingSelector: isFetchingTrainingsOfTeamSelector
} = makeFetchAction(GET_TRAININGS_OF_TEAM, (id, page) => {
  return {
    endpoint: API_TRAINING.GET_TRAININGS_OF_TEAM(id, page),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

export const {
  actionCreator: refreshTrainingsOfTeamAction,
  isFetchingSelector: isRefreshingTrainingsOfTeamSelector
} = makeFetchAction(REFRESH_TRAININGS_OF_TEAM, (id) => {
  return {
    endpoint: API_TRAINING.GET_TRAININGS_OF_TEAM(id, 1),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

// --- epics ---
const getTrainingsOfTeamEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_TRAININGS_OF_TEAM;
    })
    .map(action => ({
      type: GET_TRAININGS_OF_TEAM_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id
      }
    }));

const refreshTrainingsOfTeamEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === REFRESH_TRAININGS_OF_TEAM;
    })
    .map(action => ({
      type: GET_TRAININGS_OF_TEAM_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id,
        refresh: true
      }
    }));

export const trainingsOfTeamEpic = combineEpics(
  getTrainingsOfTeamEpic,
  refreshTrainingsOfTeamEpic
);

export const trainingsOfTeamReducer = handleActions({
  [GET_TRAININGS_OF_TEAM_SUCCESS]: (state, { payload }) => handleSuccessList(state, payload),
}, {});

// selector for home Trainings
export const trainingsOfTeamSelector = getOr([], 'trainingsOfTeamReducer');