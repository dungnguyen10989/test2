import 'rxjs';
import { makeFetchAction } from 'redux-api-call';
import { CHANGE_UNAUTHORIZED_SCREEN, BASIC_INFO } from './unAuthScreen';


// --- BEGIN --- 
// --- actionTypes ---
const FACEBOOK_GRAPH = 'FACEBOOK_GRAPH';
const FACEBOOK_GRAPH_SUCCESS = 'FACEBOOK_GRAPH_SUCCESS';
// --- actionTypes ---
// --- END --- 

// --- BEGIN --- 
// --- actionCreators ---
export const {
  actionCreator: facebookGraphAction,
  isFetchingSelector: isFetchingFacebookGrapSelector
} = makeFetchAction(FACEBOOK_GRAPH, (data) => {
  const link = `https://graph.facebook.com/v2.5/me?fields=email,name,birthday,gender&access_token=${data.token}`;
  return {
    endpoint: link,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: data
  };
});
// --- actionCreators ---
// --- END --- 

// --- BEGIN --- 
// --- epics ---
export const facebookGraphEpic = (actions$, store) =>
  actions$
    .filter((action) => {
      const { payload, type } = action;
      if (!payload) return false;
      const { name } = payload;
      return type === '@@api/FETCH_COMPLETE' && name === FACEBOOK_GRAPH;
    })
    .map((action) => {
      const data = action.payload.json;
      const obj = { ...action.payload.params, ...data };
      store.dispatch({
        type: CHANGE_UNAUTHORIZED_SCREEN,
        payload: {
          routeName: BASIC_INFO,
          data: obj,
          back: false
        }
      });
      return { type: FACEBOOK_GRAPH_SUCCESS };
    });
// --- epics ---
// --- END --- 