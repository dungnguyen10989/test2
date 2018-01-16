import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_TRAINING } from '../../../../utils/_APIs';
import { handleSuccessObject, handleSuccessList } from '../../../../redux/handleSuccess';
import { setDefaultHeader } from '../../../../redux/common/token';

// --- BEGIN --- 
// --- actionTypes ---
const GET_DETAIL_OF_TRAINING = 'GET_DETAIL_OF_TRAINING';
const GET_DETAIL_OF_TRAINING_SUCCESS = 'GET_DETAIL_OF_TRAINING_SUCCESS';
const REFRESH_FEEDS_OF_TRAINING = 'REFRESH_FEEDS_OF_TRAINING';
const GET_FEEDS_OF_TRAINING = 'GET_FEEDS_OF_TRAINING';
const GET_FEEDS_OF_TRAINING_SUCCESS = 'GET_FEEDS_OF_TRAINING_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getDetailOfTrainingAction,
  isFetchingSelector: isFetchingDetailOfTrainingSelector
} = makeFetchAction(GET_DETAIL_OF_TRAINING, id => {
  return {
    endpoint: API_TRAINING.DETAIL(id),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});

export const {
  actionCreator: getFeedsOfTrainingAction,
  isFetchingSelector: isFetchingFeedsOfTrainingSelector
} = makeFetchAction(GET_FEEDS_OF_TRAINING, (id, page) => {
  return {
    endpoint: API_TRAINING.ACTIVITIES(id, page),
    headers: setDefaultHeader,
    method: 'GET',
    params: {
      id
    }
  };
});


export const {
  actionCreator: refreshFeedsOfTrainingAction,
  isFetchingSelector: isRefreshingFeedsOfTrainingSelector
} = makeFetchAction(REFRESH_FEEDS_OF_TRAINING, id => {
  return {
    endpoint: API_TRAINING.ACTIVITIES(id, 1),
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
const getDetailOfTraininglEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_DETAIL_OF_TRAINING;
    })
    .map(action => ({
      type: GET_DETAIL_OF_TRAINING_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id
      }
    }));

const getFeedsOfTrainingEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_FEEDS_OF_TRAINING;
    })
    .map((action) => ({
      type: GET_FEEDS_OF_TRAINING_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id
      }
    }));

const refreshFeedsOfTrainingEpic = (actions$) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === REFRESH_FEEDS_OF_TRAINING;
    })
    .map((action) => ({
      type: GET_FEEDS_OF_TRAINING_SUCCESS,
      payload: {
        data: action.payload.json.data,
        id: action.payload.params.id,
        refresh: true
      }
    }));

export const detailOfTrainingEpic = combineEpics(
  getDetailOfTraininglEpic,
  getFeedsOfTrainingEpic,
  refreshFeedsOfTrainingEpic
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const detailOfTrainingReducer = handleActions({
  [GET_DETAIL_OF_TRAINING_SUCCESS]: (state, { payload }) => handleSuccessObject(state, payload)
}, {});

export const feedsOfTrainingReducer = handleActions({
  [GET_FEEDS_OF_TRAINING_SUCCESS]: (state, { payload }) => handleSuccessList(state, payload)
}, {});

// selectors
export const detailOfTrainingSelector = getOr([], 'detailOfTrainingReducer');
export const feedsOfTrainingSelector = getOr([], 'feedsOfTrainingReducer');
// --- reducer ---
// --- END --- 