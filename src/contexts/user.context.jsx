import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import {  } from "../utils/firebase/firebase.utils";
//Two parts to create a context:
// 1. create the storage: UserContext
// 2. provider: the component to access this storage

export const UserContext = createContext({
    currentUser: null,
    // null in the user object means no user
    setCurrentUser: ()=> null,
})

export const UserProvider = ({children})=> {
    const[currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

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

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};