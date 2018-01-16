import { createStore, applyMiddleware, compose } from 'redux';
import { middleware as apiMiddleware } from 'redux-api-call';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import rootReducers from './reducers';
import rootEpic from './epics';


const epics = combineEpics(rootEpic);
const epicMiddleware = createEpicMiddleware(epics);

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = [
  applyMiddleware(
    epicMiddleware,
    apiMiddleware()
  ),
];

const store = createStore(
  rootReducers,
  initialState,
  composeEnhancers(...enhancers),
);

export default store;
