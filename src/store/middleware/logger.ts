import { Middleware } from "redux";
import { RootState } from "../store";
//first param: adding extra stuff to the dispath to extend, 2: rootstate
export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());
    next(action);
    console.log('next state: ', store.getState())
};
