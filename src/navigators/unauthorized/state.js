import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_LIST, API_USER, SECURITY_TOKEN } from '../../utils/_APIs';
import { Observable } from 'rxjs/Observable';

// --- BEGIN --- 
// --- actionTypes ---
const GET_DISCIPLINE = 'GET_DISCIPLINE';
const GET_LEVEL = 'GET_LEVEL';
const GET_DISCIPLINE_SUCCESS = 'GET_DISCIPLINE_SUCCESS';
const GET_LEVEL_SUCCESS = 'GET_LEVEL_SUCCESS';
const GET_MYSELF = 'GET_MYSELF';
const GET_MYSELF_SUCCESS = 'GET_MYSELF_SUCCESS';
const CHECK_EXISTS = 'CHECK_EXISTS';
const CHECK_EXISTS_SUCCESS = 'CHECK_EXISTS_SUCCESS';

const SET_ASYNC_TOKEN = 'SET_ASYNC_TOKEN';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const setAsyncToken = token => ({
  type: SET_ASYNC_TOKEN,
  payload: token
});

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

export const {
  actionCreator: getLevelAction,
  isFetchingSelector: isFetchingLevelSelector
} = makeFetchAction(GET_LEVEL, () => {
    return {
      endpoint: API_LIST.LEVEL,
      method: 'GET'
    };
  });

export const {
  actionCreator: getMySelfAction,
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

export const {
  actionCreator: checkExistsAction,
  isFetchingSelector: isFetchingCheckExistsSelector
} = makeFetchAction(CHECK_EXISTS, obj => {
    const data = Object.assign(obj, { security_token: SECURITY_TOKEN });
    return {
      endpoint: API_USER.EXISTS,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      params: obj
    };
  });
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
const getDisciplineEpic = (actions$) =>
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

const getLevelEpic = (actions$) =>
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

const getMySelfEpic = (actions$) =>
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

const checkExistsEpic = (actions$, store) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === CHECK_EXISTS;
    })
    .map((action) => {
      if(action.payload.json.data.exists === true) {
        store.dispatch(getMySelfAction(action.payload.params.token));
      }
      return {
        type: CHECK_EXISTS_SUCCESS,
        payload: {
          data: action.payload.json.data
        }
      };
    });

// const checkExistsEpic = (actions$, store) =>
//   actions$
//     .filter((action) => {
//       const { payload, type } = action;
//       if (!payload) return false;
//       const { name } = payload;
//       return type === '@@api/FETCH_COMPLETE' && name === CHECK_EXISTS;
//     })
//     .mergeMap(response => Observable. Observable.of(
//       { type: GET_DISCIPLINE },
//       { type: GET_LEVEL }
//     ));

export const preloadEpic = combineEpics(
  getDisciplineEpic,
  getLevelEpic,
  getMySelfEpic,
  checkExistsEpic
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const disciplineReducer = handleActions({
  [GET_DISCIPLINE_SUCCESS]: (state, { payload }) => payload.data
}, []);

export const levelReducer = handleActions({
  [GET_LEVEL_SUCCESS]: (state, { payload }) => payload.data
}, []);

export const mySelfReducer = handleActions({
  [GET_MYSELF_SUCCESS]: (state, { payload }) => payload.data,
  [CHECK_EXISTS_SUCCESS]: (state, { payload }) => payload.data
}, {});

export const asyncTokenReducer = handleActions({
  [SET_ASYNC_TOKEN]: (state, { payload }) => payload
}, {});

// selectors
export const disciplineSelector = getOr([], 'disciplineReducer');
export const levelSelector = getOr([], 'levelReducer');
export const mySelfSelector = getOr([], 'mySelfReducer');

// --- reducer ---
// --- END --- 