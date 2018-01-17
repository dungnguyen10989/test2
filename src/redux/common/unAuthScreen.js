export const CHANGE_UNAUTHORIZED_SCREEN = 'CHANGE_UNAUTHORIZED_SCREEN';
export const UPDATE_REGISTER = 'UPDATE_REGISTER';
export const SIGN_IN = 'SIGN_IN';
export const FORGOT = 'FORGOT';
export const CHECK_EMAIL = 'CHECK_EMAIL';
export const BASIC_INFO = 'BASIC_INFO';
export const ADVANCE_INFO = 'ADVANCE_INFO';
export const STRAVA_WEBVIEW = 'STRAVA_WEBVIEW';

const unAuthScreen = (state = { routeName: SIGN_IN }, action) => {
  switch (action.type) {
    case CHANGE_UNAUTHORIZED_SCREEN:
      return action.payload;
    case UPDATE_REGISTER: 
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default unAuthScreen;
