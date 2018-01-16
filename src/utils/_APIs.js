const ROOT_API = 'https://dev.bikenconnect.com/api/';
const STRAVA_CLIENT_ID = 21862;
const STRAVA_CALLBACK_URL = 'https://beta.bikenconnect.com';

export const SECURITY_TOKEN = '7f1c3f66c7b8755ef6cd4e2f23695176';

export const API_USER = {
  AUTH_TOKEN: () => `${ROOT_API}auth/token`,
  SOCIAL_TOKEN: `${ROOT_API}user/social`,
  FORGOT: `${ROOT_API}user/forgot`,
  EXISTS: `${ROOT_API}user/exists`,
  GET_INFO: id => `${ROOT_API}user/${id}`,
  ME: token => `${ROOT_API}user/me?access_token=${token}`,
  ACTIVITIES: (id, page) => `${ROOT_API}user/${id}/activities?page=${page}`,
  FOLLOWER: id => `${ROOT_API}user/follower/${id}`,
  FOLLOWING: id => `${ROOT_API}user/following/${id}`,
};

export const API_LIST = {
  DISCIPLINE: `${ROOT_API}list/discipline`,
  LEVEL: `${ROOT_API}list/level`
};

export const API_STRAVA = {
  CLIENT_ID: STRAVA_CLIENT_ID,
  CALLBACK_URL: STRAVA_CALLBACK_URL,
  CLIENT_SECRET: 'b86214efebd23278372ad533b8094319e3dfc54f',
  GET_CODE_URL: `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_CALLBACK_URL}&scope=write&state=mystate&approval_prompt=force`,
  GET_TOKEN_URL: 'https://www.strava.com/oauth/token',
  DENY: 'error=access_denied',
};

export const API_ACTIVITIES = {
  HOME: (id, page) => `${ROOT_API}activity/home?id=${id}&page=${page}`,
  DELETE: id => `${ROOT_API}activity/${id}`,
  POST: `${ROOT_API}activity/post`,
};

export const API_TEAM = {
  GET_LIST_TEAM: (userId, page) => `${ROOT_API}team?page=${page}&user_id=${userId}`,
  ACTIVITIES: (userId, page) => `${ROOT_API}team/activity/${userId}?page=${page}`,
  MEMBERS: (userId, page) => `${ROOT_API}team/member/${userId}?page=${page}`,
  DETAIL: id => `${ROOT_API}team/${id}`,
};

export const API_TRAINING = {
  GET_TRAININGS_OF_USER: (id, page) => `${ROOT_API}training?type=user&page=${page}&user_id=${id}`,
  GET_TRAININGS_OF_TEAM: (id, page) => `${ROOT_API}training?type=team&page=${page}&user_id=${id}`,
};

export const API_EVENT = {
  GET_LIST_EVENT: (page) => `${ROOT_API}event?page=${page}`,
};