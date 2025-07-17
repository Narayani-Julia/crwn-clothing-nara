import { compose, createStore, applyMiddleware } from "redux";
//createStore is deprecated
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
//need a root-reducer ==> big reducer
//import { thunk } from 'redux-thunk'
//import loggerMiddleware from './middleware/logger'
//import monitorReducerEnhancer from './enhancers/monitorReducer'

//const middleWares = [logger];
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = createStore(rootReducer, undefined, composedEnhancers);

//const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunk)
//const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)
//runs before the action hits the reducer, before dispatch
//export const store = createStore(rootReducer, undefined, composedEnhancers);