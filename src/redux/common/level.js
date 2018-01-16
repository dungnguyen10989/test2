import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';
import { API_LIST } from '../../utils/_APIs';

// --- BEGIN --- 
// --- actionTypes ---
const GET_LEVEL = 'GET_LEVEL';
const GET_LEVEL_SUCCESS = 'GET_LEVEL_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getLevelAction,
  isFetchingSelector: isFetchingLevelSelector
} = makeFetchAction(GET_LEVEL, () => {
  return {
    endpoint: API_LIST.LEVEL,
    method: 'GET'
  };
});
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
export const levelEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_LEVEL;
    })
    .map((action) => ({
      type: GET_LEVEL_SUCCESS,
      payload: {
        data: action.payload.json.data
      }
    }));
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const levelReducer = handleActions({
  [GET_LEVEL_SUCCESS]: (state, { payload }) => payload.data
}, []);

// selectors
export const levelSelector = getOr([], 'levelReducer');
// --- reducer ---
// --- END --- 