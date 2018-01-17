import 'rxjs';
import { AsyncStorage, Alert } from 'react-native';
import { makeFetchAction } from 'redux-api-call';
import { API_USER } from '../../utils/_APIs'; 
import { getMySelfAction } from './mySelf';
import { SET_TOKEN } from './token';

const GET_AUTH_TOKEN_FAIL = 'GET_AUTH_TOKEN_FAIL';
const GET_AUTH_TOKEN = 'GET_AUTH_TOKEN';


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
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
export const authEpic = (actions$, store) =>
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
      const token = data.data.access_token;
      store.dispatch(getMySelfAction(token));
      AsyncStorage.setItem('token', token);
      return {
        type: SET_TOKEN,
        payload: token
      };
    });
// --- epics ---
// --- END --- 