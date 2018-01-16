import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_USER } from '../../../../utils/_APIs';
import { handleSuccessObject, handleSuccessList } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

// --- BEGIN --- 
// --- actionTypes ---
const GET_DETAIL_OF_USER = 'GET_DETAIL_OF_USER';
const GET_DETAIL_OF_USER_SUCCESS = 'GET_DETAIL_OF_USER_SUCCESS';
const REFRESH_FEEDS_OF_USER = 'REFRESH_FEEDS_OF_USER';
const GET_FEEDS_OF_USER = 'GET_FEEDS_OF_USER';
const GET_FEEDS_OF_USER_SUCCESS = 'GET_FEEDS_OF_USER_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getDetailOfUserAction,
  isFetchingSelector: isFetchingDetailOfUserSelector
} = makeFetchAction(GET_DETAIL_OF_USER, id => {
  return {
    endpoint: API_USER.USER_GET_INFO(id),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

export const {
  actionCreator: getFeedsOfUserAction,
  isFetchingSelector: isFetchingFeedsOfUserSelector
} = makeFetchAction(GET_FEEDS_OF_USER, (id, page) => {
  return {
    endpoint: API_USER.USER_ACTIVITIES(id, page),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});


export const {
  actionCreator: refreshFeedsOfUserAction,
  isFetchingSelector: isRefreshingFeedsOfUserSelector
} = makeFetchAction(REFRESH_FEEDS_OF_USER, id => {
  return {
    endpoint: API_USER.USER_ACTIVITIES(id, 1),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id,
      page: 1
    }
  };
});
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
const getDetailOfUserEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_DETAIL_OF_USER;
    })
    .map(action => ({
      type: GET_DETAIL_OF_USER_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id
      }
    }));

const getFeedsOfUserEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_FEEDS_OF_USER;
    })
    .map((action) => ({
      type: GET_FEEDS_OF_USER_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id
      }
    }));

const refreshFeedsOfUserEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === REFRESH_FEEDS_OF_USER;
    })
    .map((action) => ({
      type: GET_FEEDS_OF_USER_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id,
        refresh: true
      }
    }));

export const detailOfUserEpic = combineEpics(
  getDetailOfUserEpic,
  getFeedsOfUserEpic,
  refreshFeedsOfUserEpic
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const detailOfUserReducer = handleActions({
  [GET_DETAIL_OF_USER_SUCCESS]: (state, { payload }) => handleSuccessObject(state, payload)
}, {});

export const feedsOfUserReducer = handleActions({
  [GET_FEEDS_OF_USER_SUCCESS]: (state, { payload }) => handleSuccessList(state, payload)
}, {});

// selectors
export const detailOfUserSelector = getOr([], 'detailOfUserReducer');
export const feedsOfUserSelector = getOr([], 'feedsOfUserReducer');
// --- reducer ---
// --- END --- 