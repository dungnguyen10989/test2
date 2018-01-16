import { makeFetchAction } from 'redux-api-call';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { API_USER } from '../../../../utils/_APIs';
import { handleSuccessList } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

export const GET_LIST_FOLLOWER = 'GET_LIST_FOLLOWER';
export const REFRESH_LIST_FOLLOWER = 'REFRESH_LIST_FOLLOWER';
export const GET_LIST_FOLLOWER_SUCCESS = 'GET_LIST_FOLLOWER_SUCCESS';

export const {
  actionCreator: getListFollowerAction,
  isFetchingSelector: isFetchingListFollowerSelector
} = makeFetchAction(GET_LIST_FOLLOWER, (id, page) => {
  return {
    endpoint: API_USER.FOLLOWER(id, page),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

export const {
  actionCreator: refreshListFollowerAction,
  isFetchingSelector: isRefreshingListFollowerSelector
} = makeFetchAction(REFRESH_LIST_FOLLOWER, (id) => {
  return {
    endpoint: API_USER.FOLLOWER(id, 1),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

// --- epics ---
const getListFollowerEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_LIST_FOLLOWER;
    })
    .map(action => ({
      type: GET_LIST_FOLLOWER_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id
      }
    }
    ));

const refreshListFollowerEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === REFRESH_LIST_FOLLOWER;
    })
    .map(action => ({
      type: GET_LIST_FOLLOWER_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id,
        refresh: true
      }
    }
    ));

export const listFollowerEpic = combineEpics(
  getListFollowerEpic,
  refreshListFollowerEpic
);

export const listFollowerReducer = handleActions({
  [GET_LIST_FOLLOWER_SUCCESS]: (state, { payload }) => handleSuccessList(state, payload),
}, {});

// selector for home MEMBERS
export const listFollowerSelector = getOr([], 'listFollowerReducer');