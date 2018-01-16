import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_TEAM } from '../../../../utils/_APIs';
import { handleSuccessObject, handleSuccessList } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

// --- BEGIN --- 
// --- actionTypes ---
const GET_DETAIL_OF_TEAM = 'GET_DETAIL_OF_TEAM';
const GET_DETAIL_OF_TEAM_SUCCESS = 'GET_DETAIL_OF_TEAM_SUCCESS';
const REFRESH_FEEDS_OF_TEAM = 'REFRESH_FEEDS_OF_TEAM';
const GET_FEEDS_OF_TEAM = 'GET_FEEDS_OF_TEAM';
const GET_FEEDS_OF_TEAM_SUCCESS = 'GET_FEEDS_OF_TEAM_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getDetailOfTeamAction,
  isFetchingSelector: isFetchingDetailOfTeamSelector
} = makeFetchAction(GET_DETAIL_OF_TEAM, id => {
  return {
    endpoint: API_TEAM.DETAIL(id),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

export const {
  actionCreator: getFeedsOfTeamAction,
  isFetchingSelector: isFetchingFeedsOfTeamSelector
} = makeFetchAction(GET_FEEDS_OF_TEAM, (id, page) => {
  return {
    endpoint: API_TEAM.ACTIVITIES(id, page),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});


export const {
  actionCreator: refreshFeedsOfTeamAction,
  isFetchingSelector: isRefreshingFeedsOfTeamSelector
} = makeFetchAction(REFRESH_FEEDS_OF_TEAM, id => {
  return {
    endpoint: API_TEAM.ACTIVITIES(id, 1),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
const getDetailOfTeamlEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_DETAIL_OF_TEAM;
    })
    .map(action => ({
      type: GET_DETAIL_OF_TEAM_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id
      }
    }));

const getFeedsOfTeamEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_FEEDS_OF_TEAM;
    })
    .map((action) => {
      return({
        type: GET_FEEDS_OF_TEAM_SUCCESS,
        payload: {
          data: action.payload.json.data,
          id: action.payload.params.id
        }
      });
    });

const refreshFeedsOfTeamEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === REFRESH_FEEDS_OF_TEAM;
    })
    .map((action) => {
      return({
        type: GET_FEEDS_OF_TEAM_SUCCESS,
        payload: {
          data: action.payload.json.data,
          id: action.payload.params.id,
          refresh: true
        }
      });
    });

export const detailOfTeamEpic = combineEpics(
  getDetailOfTeamlEpic,
  getFeedsOfTeamEpic,
  refreshFeedsOfTeamEpic
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const detailOfTeamReducer = handleActions({
  [GET_DETAIL_OF_TEAM_SUCCESS]: (state, { payload }) => handleSuccessObject(state, payload)
}, {});

export const feedsOfTeamReducer = handleActions({
  [GET_FEEDS_OF_TEAM_SUCCESS]: (state, { payload }) => handleSuccessList(state, payload)
}, {});

// selectors
export const detailOfTeamSelector = getOr([], 'detailOfTeamReducer');
export const feedsOfTeamSelector = getOr([], 'feedsOfTeamReducer');
// --- reducer ---
// --- END --- 