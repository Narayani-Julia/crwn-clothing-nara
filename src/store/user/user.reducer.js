import { USER_ACTION_TYPES } from "./user.types";

export const INITIAL_STATE = {
    currentUser: null
};

//Since there is no hook anymore that calls useReducer and passes into it an initial value, you need to pass in a default value here
export const userReducer = (state = INITIAL_STATE, action={}) =>{
    const {type, payload} = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload };
        
        default: //need to return the default state. apparently because all reducers use the same dispatch function, so at some point there will be a case when there is no change to the code, meaning no re-renders
            throw state;//new Error(`Unhandled type ${type} in userReducer`);
    }
};

