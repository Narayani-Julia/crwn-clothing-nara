import { compose, createStore, applyMiddleware } from "redux";
//createStore is deprecated
import logger from "redux-logger";
import {persistStore, persistReducer } from "redux-persist"
import { rootReducer } from "./root-reducer";
//local storage
import { thunk } from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
//need a root-reducer ==> big reducer
//import { thunk } from 'redux-thunk'
//import loggerMiddleware from './middleware/logger'
//import monitorReducerEnhancer from './enhancers/monitorReducer'
const loggerMiddleware = logger;

const sagaMiddleWare = createSagaMiddleware();

//change to 'development' if you want the log during production
const middleWares = [
    process.env.NODE_ENV !== 'production' && loggerMiddleware,
    sagaMiddleWare,
].filter(Boolean);

const composeEnhacer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_EXTENSION_COMPOSE__) || compose;

//configuration object
const persistConfig = {
    key: 'root',
    storage, 
    //wanna keep an array of strings of reducers you dont want to persist, example private info
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const composedEnhancers = composeEnhacer(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
//const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunk)
//const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)
//runs before the action hits the reducer, before dispatch
//export const store = createStore(rootReducer, undefined, composedEnhancers);