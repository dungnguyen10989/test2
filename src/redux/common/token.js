import 'rxjs';
import { AsyncStorage, Alert } from 'react-native';
import { handleActions } from 'redux-actions';
import { getOr } from 'lodash/fp';
import { combineEpics } from 'redux-observable';
import { makeFetchAction } from 'redux-api-call';
import { API_USER, SECURITY_TOKEN } from '../../utils/_APIs'; 
import { getMySelfAction } from './mySelf';

// --- BEGIN --- 
// --- actionTypes ---
const GET_AUTH_TOKEN = 'GET_AUTH_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';
const GET_AUTH_TOKEN_SUCCESS = 'GET_AUTH_TOKEN_SUCCESS';
const GET_AUTH_TOKEN_FAIL = 'GET_AUTH_TOKEN_FAIL';
const GET_SOCIAL_TOKEN = 'GET_SOCIAL_TOKEN';
const GET_SOCIAL_TOKEN_SUCCESS = 'GET_SOCIAL_TOKEN_SUCCESS';
const CHECK_SOCIAL_EXISTS = 'CHECK_SOCIAL_EXISTS';
const CHECK_SOCIAL_EXISTS_SUCCESS = 'CHECK_SOCIAL_EXISTS_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: getAuthTokenAction,
  isFetchingSelector: isFetchingAuthTokenSelector
} = makeFetchAction(GET_AUTH_TOKEN, (username, password) => {
  const data = JSON.stringify({ username, password });
  return {
    endpoint: API_USER.AUTH_TOKEN,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  };
});

export const {
  actionCreator: getSocialTokenAction,
  isFetchingSelector: isFetchingSocialTokenSelector
} = makeFetchAction(GET_SOCIAL_TOKEN, (provider, provider_uid, email) => {
  const data = JSON.stringify({ 
    provider, provider_uid, email, security_token: SECURITY_TOKEN
  });
  return {
    endpoint: API_USER.SOCIAL_TOKEN,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data,
    params: {
      provider,
      provider_uid,
      email
    }
  };
});

export const {
  actionCreator: checkSocialExistsAction,
  isFetchingSelector: isFetchingSocialExistsSelector
} = makeFetchAction(CHECK_SOCIAL_EXISTS, (obj) => {
  const data = JSON.stringify({ email: obj.email, security_token: SECURITY_TOKEN });
  return {
    endpoint: API_USER.EXISTS,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data,
    params: { email: obj.email, token: obj.token.access_token }
  };
});
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
const getAuthTokenEpic = (actions$, store) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_AUTH_TOKEN;
    })
    .map(action => {
      const data = action.payload.json;
      if(data.status === 0) {
        Alert.alert(
          'Error',
          data.message,
          [
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false }
        );
        return {
          type: GET_AUTH_TOKEN_FAIL,
        };
      }
      store.dispatch(getMySelfAction(data.data.access_token));
      return {
        type: GET_AUTH_TOKEN_SUCCESS,
        payload: {
          data: data.data.access_token,
        }
      };
    });

const getSocialTokenEpic = (actions$, store) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === GET_SOCIAL_TOKEN;
    })
    .map((action) => {
      store.dispatch(checkSocialExistsAction({
        email: action.payload.params.email,
        token: action.payload.json.data
      }));
      return {
        type: GET_SOCIAL_TOKEN_SUCCESS,
        payload: {
          data: action.payload.json.data,
          params: action.payload.params
        }
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
      if(action.payload.json.data.exists === true) {
        store.dispatch(getMySelfAction(action.payload.params.token));
      }
      return {
        type: CHECK_SOCIAL_EXISTS_SUCCESS,
        payload: {
          data: action.payload.json.data
        }
      };
    });

export const tokenEpic = combineEpics(
  getAuthTokenEpic,
  getSocialTokenEpic,
  checkSocialExistsEpic
);
// --- epics ---
// --- END --- 

// --- BEGIN --- 
// --- reducer ---
export const tokenReducer = handleActions({
  [SET_TOKEN]: (state, { payload }) => payload,
  [GET_AUTH_TOKEN_SUCCESS]: (state, { payload }) => {
    const data = { token: payload.data, exists: true };
    AsyncStorage.setItem('token', JSON.stringify(data));
    return data;
  },
  [GET_SOCIAL_TOKEN_SUCCESS]: (state, { payload }) => {
    const { data, params } = payload;
    const merge = Object.assign(params, { token: data.access_token });
    AsyncStorage.setItem('token', JSON.stringify(merge));
    return merge;
  },
  [CHECK_SOCIAL_EXISTS_SUCCESS]: (state, { payload }) => Object.assign(state, payload.data)
}, []);

// selectors
export const tokenSelector = getOr([], 'tokenReducer');
// --- reducer ---
// --- END --- 

export const setDefaultHeader = state => {
  const token = tokenSelector(state);
  return {
    'moo-access-token': token.token,
    'Content-Type': 'application/json'
  };
};