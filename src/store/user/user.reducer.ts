import { USER_ACTION_TYPES } from "./user.types";
import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed } from "./user.action";
export type UserState ={
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error|null;
}

export const USER_INITIAL_STATE:UserState = {
    currentUser: null,    
    isLoading: false,
    error: null,
};

//Since there is no hook anymore that calls useReducer and passes into it an initial value, you need to pass in a default value here
export const userReducer = (state: UserState = USER_INITIAL_STATE, action: AnyAction):UserState =>{
    if(signInSuccess.match(action)){
            return {
                ...state,
                currentUser: action.payload };
            }
        if(signOutSuccess.match(action))
            return {...state, currentUser:null};
        if (
            signInFailed.match(action) ||
            signOutFailed.match(action)||
            signUpFailed.match(action)
        ){return {...state, error: action.payload};}                
            
        //need to return the default state. apparently because all reducers use the same dispatch function, so at some point there will be a case when there is no change to the code, meaning no re-renders
            return state;//new Error(`Unhandled type ${type} in userReducer`);
};

