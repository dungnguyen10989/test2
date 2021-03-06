import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';
import { API_USER } from '../../utils/_APIs';

// --- BEGIN --- 
// --- actionTypes ---
const GET_MYSELF = 'GET_MYSELF';
const GET_MYSELF_SUCCESS = 'GET_MYSELF_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getMySelfAction,
  errorSelector: getMySelfError,
  isFetchingSelector: isFetchingMySelfSelector
} = makeFetchAction(GET_MYSELF, (token) => {
  return {
    endpoint: API_USER.ME(token),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
});
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
export const mySelfEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_MYSELF;
    })
    .map((action) => {
      return {
        type: GET_MYSELF_SUCCESS,
        payload: {
          data: action.payload.json.data
        }
      };
    });
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const mySelfReducer = handleActions({
  [GET_MYSELF_SUCCESS]: (state, { payload }) => payload.data
}, {});

// selectors
export const mySelfSelector = getOr([], 'mySelfReducer');
// --- reducer ---
// --- END --- 