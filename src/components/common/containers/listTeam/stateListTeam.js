import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_TEAM } from '../../../../utils/_APIs';
import { handleSuccessList } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

// --- BEGIN --- 
// --- actionTypes ---
const GET_LIST_TEAM = 'GET_LIST_TEAM';
const GET_LIST_TEAM_SUCCESS = 'GET_LIST_TEAM_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getListTeamAction,
  isFetchingSelector: isFetchingListTeamSelector
} = makeFetchAction(GET_LIST_TEAM, (id, page) => {
  return {
    endpoint: API_TEAM.GET_LIST_TEAM(id, page),
    headers: setDefaultHeader,
    method: 'GET',
    params: { id, page }
  };
});
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
export const getListTeamEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_LIST_TEAM;
    })
    .map((action) => {
      return {
        type: GET_LIST_TEAM_SUCCESS,
        payload: {
          data: action.payload.json.data,
          id: action.payload.params.id,
          page: action.payload.params.page,
        }
      };
    });

export const listTeamEpic = combineEpics(
  getListTeamEpic
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const listTeamReducer = handleActions({
  [GET_LIST_TEAM_SUCCESS]: (state, { payload }) => handleSuccessList(state, payload)
}, {});
// reducer selectors
export const listTeamSelector = getOr([], 'listTeamReducer');
// --- reducer ---
// --- END --- 