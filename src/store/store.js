import { compose, createStore, applyMiddleware } from "redux";
//createStore is deprecated
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
//need a root-reducer ==> big reducer
//import { thunk } from 'redux-thunk'
//import loggerMiddleware from './middleware/logger'
//import monitorReducerEnhancer from './enhancers/monitorReducer'
const loggerMiddleware = (store) => (next) => (action) =>{
    if(!action.type){
        return next(action);
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());
    next(action);
    console.log('next state: ', store.getState())
};

const middleWares = [loggerMiddleware];//[process.env.NODE_ENV === 'development' && loggerMiddleware].filter(Boolean);
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = createStore(rootReducer, undefined, composedEnhancers);

//const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunk)
//const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)
//runs before the action hits the reducer, before dispatch
//export const store = createStore(rootReducer, undefined, composedEnhancers);