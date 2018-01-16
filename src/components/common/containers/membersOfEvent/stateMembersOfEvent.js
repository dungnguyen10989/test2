import { makeFetchAction } from 'redux-api-call';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { API_TEAM } from '../../../../utils/_APIs';
import { handleSuccessList } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

export const GET_MEMBERS_OF_TEAM = 'GET_MEMBERS_OF_TEAM';
export const GET_MEMBERS_OF_TEAM_SUCCESS = 'GET_MEMBERS_OF_TEAM_SUCCESS';
export const GET_MEMBERS_OF_TEAM_FAIL = 'GET_MEMBERS_OF_TEAM_FAIL';

export const REFRESH_MEMBERS_OF_TEAM = 'REFRESH_MEMBERS_OF_TEAM';
export const REFRESH_MEMBERS_OF_TEAM_SUCCESS = 'REFRESH_MEMBERS_OF_TEAM_SUCCESS';
export const REFRESH_MEMBERS_OF_TEAM_FAIL = 'REFRESH_MEMBERS_OF_TEAM_FAIL';

export const {
  actionCreator: getMembersOfTeamAction,
  isFetchingSelector: isFetchingMembersOfTeamSelector
} = makeFetchAction(GET_MEMBERS_OF_TEAM, (id, page) => {
  return {
    endpoint: API_TEAM.MEMBERS(id, page),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

export const {
  actionCreator: refreshMembersOfTeamAction,
  isFetchingSelector: isRefreshingMembersOfTeamSelector
} = makeFetchAction(REFRESH_MEMBERS_OF_TEAM, (id) => {
  return {
    endpoint: API_TEAM.MEMBERS(id, 1),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

// --- epics ---
const getMembersOfTeamEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_MEMBERS_OF_TEAM;
    })
    .map((action) => {
      // if has data
      if (action.payload.json.status === 1) {
        return {
          type: GET_MEMBERS_OF_TEAM_SUCCESS,
          payload: {
            data: action.payload.json.data,
            id: action.payload.params.id
          }
        };
      }
      // if no data for get method

      return {
        type: GET_MEMBERS_OF_TEAM_FAIL,
        payload: {
          data: action.payload.json.data
        }
      };
    });

const refreshMembersOfTeamEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === REFRESH_MEMBERS_OF_TEAM;
    })
    .map((action) => {
      // if has data
      if (action.payload.json.status === 1) {
        return {
          type: GET_MEMBERS_OF_TEAM_SUCCESS,
          payload: {
            data: action.payload.json.data,
            id: action.payload.params.id,
            page: 1
          }
        };
      }
      // if no data for get method

      return {
        type: GET_MEMBERS_OF_TEAM_FAIL,
        payload: {
          data: action.payload.json.data
        }
      };
    });

export const membersOfTeamEpic = combineEpics(
  getMembersOfTeamEpic,
  refreshMembersOfTeamEpic
);

export const membersOfTeamReducer = handleActions({
  [GET_MEMBERS_OF_TEAM_SUCCESS]: (state, { payload }) => handleSuccessList(state, payload),
  [GET_MEMBERS_OF_TEAM_FAIL]: state => state,
}, {});

// selector for home MEMBERS
export const membersOfTeamSelector = getOr([], 'membersOfTeamReducer');