import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";
import { getDefaultNormalizer } from "@testing-library/react";
//Two parts to create a context:
// 1. create the storage: UserContext
// 2. provider: the component to access this storage

export const UserContext = createContext({
    currentUser: null,
    // null in the user object means no user
    setCurrentUser: ()=> null,
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) =>{
    console.log(action);
    console.log("dispatch");
    const {type, payload} = action;
    switch(type){
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: payload };
        
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

const INITIAL_STATE = {
    currentUser: null
};

export const UserProvider = ({children})=> {
    //const[currentUser, setCurrentUser] = useState(null);
    //const value = {currentUser, setCurrentUser};
    //state: current state; dispatch: pass this function an action object
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);
    const setCurrentUser = (user)=>
    {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    useEffect(()=>{
        //authstatechanges needs to be unmounted but ti actually returns an unsubscribe function to help you unomount the function
        //checks the authentication state when you listen to the listener
        const unsubscribe = onAuthStateChangedListener((user)=> {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;
    },[]);
    const value = {currentUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};