import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_ACTIVITIES } from '../../../../utils/_APIs';
import { handleSuccessList } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

// --- BEGIN --- 
// --- actionTypes ---
const GET_LIST_FEED = 'GET_LIST_FEED';
const GET_LIST_FEED_SUCCESS = 'GET_LIST_FEED_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getListFeedAction,
  isFetchingSelector: isFetchingListFeedSelector
} = makeFetchAction(GET_LIST_FEED, (id, page) => {
  return {
    endpoint: API_ACTIVITIES.HOME(id, page),
    headers: setDefaultHeader,
    method: 'GET',
    params: { id, page }
  };
});
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
const getListFeedEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_LIST_FEED;
    })
    .map((action) => {
      return {
        type: GET_LIST_FEED_SUCCESS,
        payload: {
          data: action.payload.json.data,
          id: action.payload.params.id,
          page: action.payload.params.page,
        }
      };
    });
export const listFeedEpic = combineEpics(
  getListFeedEpic
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const listFeedReducer = handleActions({
  [GET_LIST_FEED_SUCCESS]: (state, { payload }) => handleSuccessList(state, payload)
}, {});
// reducer selectors
export const listFeedReducerSelector = getOr([], 'listFeedReducer');
// --- reducer ---
// --- END --- 