import { compose, createStore, applyMiddleware, Middleware} from "redux";
//createStore is deprecated

import {persistStore, persistReducer, PersistConfig } from "redux-persist"
import { rootReducer } from "./root-reducer";
//local storage
import logger from "redux-logger";
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
export type RootState = ReturnType<typeof rootReducer>;
//change to 'development' if you want the log during production
const middleWares = [
    process.env.NODE_ENV !== 'production' && loggerMiddleware,
    sagaMiddleWare,
].filter((middleware)=> middleware !== false);

//: middleware is Middleware => Boolean(middleware));
//typescript doesnt know that the filter is removing false values, so it Middleware[] wont have a null type

declare global{
    interface Window { //adding the key to the existing interface
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhacer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//Need to remove the white list values from the array that are not from the given root state
type ExtendedPersistConfig = PersistConfig<RootState> &{
    whitelist: (keyof RootState)[]
}

//configuration object
const persistConfig :ExtendedPersistConfig= {
    key: 'root',
    storage, 
    //only want to white list values inside the root state
    //wanna keep an array of strings of reducers you dont want to persist, example private info
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhacer(applyMiddleware(...(middleWares as Middleware[])));
export const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
//const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunk)
//const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)
//runs before the action hits the reducer, before dispatch
//export const store = createStore(rootReducer, undefined, composedEnhancers);