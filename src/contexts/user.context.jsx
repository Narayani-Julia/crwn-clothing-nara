import { createContext, useState } from "react";

//Two parts to create a context:
// 1. create the storage: UserContext
// 2. provider: the component to access this storage

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=> null,
})

export const UserProvider = ({children})=> {
    const[currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};