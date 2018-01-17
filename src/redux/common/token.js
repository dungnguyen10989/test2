import 'rxjs';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { authEpic } from './auth';
import { socialEpic } from './social';

// --- BEGIN --- 
// --- actionTypes ---
export const SET_TOKEN = 'SET_TOKEN';
export const CHECK_AUTH_EXISTS = 'CHECK_AUTH_EXISTS';
export const CHECK_AUTH_EXISTS_SUCCESS = 'CHECK_AUTH_EXISTS_SUCCESS';
// --- actionTypes ---
// --- END --- 


// --- BEGIN --- 
// --- epics ---
export const tokenEpic = combineEpics(
  authEpic, socialEpic
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const tokenReducer = handleActions({
  [SET_TOKEN]: (state, { payload }) => payload
}, []);

// selectors
export const tokenSelector = getOr([], 'tokenReducer');
// --- reducer ---
// --- END --- 

export const setDefaultHeader = state => {
  const token = tokenSelector(state);
  return {
    'moo-access-token': token,
    'Content-Type': 'application/json'
  };
};