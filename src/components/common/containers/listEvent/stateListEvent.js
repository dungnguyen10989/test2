import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_EVENT } from '../../../../utils/_APIs';
import { handleSuccessObject } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

// --- BEGIN --- 
// --- actionTypes ---
const GET_LIST_EVENT = 'GET_LIST_EVENT';
const REFRESH_LIST_EVENT = 'REFRESH_LIST_EVENT';
const GET_LIST_EVENT_SUCCESS = 'GET_LIST_EVENT_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getListEventAction,
  isFetchingSelector: isFetchingListEventSelector
} = makeFetchAction(GET_LIST_EVENT, (id, page) => {
  return {
    endpoint: API_EVENT.GET_LIST_EVENT(page),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

export const {
  actionCreator: refreshListEventAction,
  isFetchingSelector: isRefreshingListEventSelector
} = makeFetchAction(REFRESH_LIST_EVENT, (id) => {
  return {
    endpoint: API_EVENT.GET_LIST_EVENT(1),
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
const getListEventEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_LIST_EVENT;
    })
    .map((action) => {
      return {
        type: GET_LIST_EVENT_SUCCESS,
        payload: {
          data: action.payload.json.data,
          id: action.payload.params.id,
          refresh: true
        }
      };
    });

const refreshListEventEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === REFRESH_LIST_EVENT;
    })
    .map((action) => {
      return {
        type: GET_LIST_EVENT_SUCCESS,
        payload: {
          data: action.payload.json.data,
          id: action.payload.params.id,
          refresh: true
        }
      };
    });

export const listEventEpic = combineEpics(
  getListEventEpic,
  refreshListEventEpic,
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const listEventReducer = handleActions({
  [GET_LIST_EVENT_SUCCESS]: (state, { payload }) => handleSuccessObject(state, payload)
}, {});
// reducer selectors
export const listEventReducerSelector = getOr([], 'listEventReducer');
// --- reducer ---
// --- END --- 