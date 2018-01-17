import 'rxjs';
import { AsyncStorage } from 'react-native';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_USER, SECURITY_TOKEN } from '../../utils/_APIs'; 
import { getMySelfAction } from './mySelf';
import { CHANGE_UNAUTHORIZED_SCREEN, BASIC_INFO } from './unAuthScreen';
import { facebookGraphEpic, facebookGraphAction } from './facebook';

import { SET_TOKEN } from './token';

// --- BEGIN --- 
// --- actionTypes ---
const GET_SOCIAL_TOKEN = 'GET_SOCIAL_TOKEN';
const CHECK_SOCIAL_EXISTS = 'CHECK_SOCIAL_EXISTS';
const CHECK_SOCIAL_EXISTS_SUCCESS = 'CHECK_SOCIAL_EXISTS_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getSocialTokenAction,
  isFetchingSelector: isFetchingSocialTokenSelector
} = makeFetchAction(GET_SOCIAL_TOKEN, (data) => {
  // data = { 
  //   provider : '',
  //   provider_uid: 123,
  //   gender: '',
  //   email: '',
  //   birthday: ''
  // }
  const obj = JSON.stringify({ ...data, security_token: SECURITY_TOKEN });
  return {
    endpoint: API_USER.SOCIAL_TOKEN,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: obj
  };
});

export const {
  actionCreator: checkSocialExistsAction,
  isFetchingSelector: isFetchingSocialExistsSelector
} = makeFetchAction(CHECK_SOCIAL_EXISTS, (obj) => {
  // obj = { 
  //   provider : '',
  //   provider_uid: 123,
  //   gender: '',
  //   email: '',
  //   birthday: '',
  // }
  const data = { provider_uid: obj.provider_uid, security_token: SECURITY_TOKEN };
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
const getSocialTokenEpic = (actions$, store) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_SOCIAL_TOKEN;
    })
    .map((action) => {
      const token = action.payload.json.data.access_token;
      store.dispatch(getMySelfAction(token));
      AsyncStorage.setItem('token', token);
      return {
        type: SET_TOKEN,
        payload: token
      };
    });

const checkSocialExistsEpic = (actions$, store) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === CHECK_SOCIAL_EXISTS;
    })
    .map((action) => {
      // action.payload.params = { 
      //   provider : '',
      //   provider_uid: 123,
      //   gender: '',
      //   email: '',
      //   birthday: '',
      // }
      if(action.payload.json.data.exists === true) {
        store.dispatch(getSocialTokenAction(action.payload.params));
      }else if(action.payload.params.provider === 'facebook') {
        store.dispatch(facebookGraphAction(action.payload.params));
      }else if(action.payload.params.provider === 'twitter') {
        store.dispatch({ 
          type: CHANGE_UNAUTHORIZED_SCREEN, 
          payload: {
            routeName: BASIC_INFO,
            data: action.payload.params,
            back: false
          }
        });
      }else if(action.payload.params.provider === 'strava') {
        
      }
      return { type: CHECK_SOCIAL_EXISTS_SUCCESS };
    });

export const socialEpic = combineEpics(
  getSocialTokenEpic,
  checkSocialExistsEpic,
  facebookGraphEpic
);
// --- epics ---
// --- END --- 