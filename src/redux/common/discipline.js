import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';
import { API_LIST } from '../../utils/_APIs';

// --- BEGIN --- 
// --- actionTypes ---
const GET_DISCIPLINE = 'GET_DISCIPLINE';
const GET_DISCIPLINE_SUCCESS = 'GET_DISCIPLINE_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getDisciplineAction,
  isFetchingSelector: isFetchingDisciplineSelector
} = makeFetchAction(GET_DISCIPLINE, () => {
  return {
    endpoint: API_LIST.DISCIPLINE,
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
export const disciplineEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_DISCIPLINE;
    })
    .map(action => ({
      type: GET_DISCIPLINE_SUCCESS,
      payload: {
        data: action.payload.json.data
      }
    }));
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const disciplineReducer = handleActions({
  [GET_DISCIPLINE_SUCCESS]: (state, { payload }) => payload.data
}, []);

// selectors
export const disciplineSelector = getOr([], 'disciplineReducer');
// --- reducer ---
// --- END --- 