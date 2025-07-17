
export const selectCategoriesMap = (state) =>state.categories
    .categories
    .reduce((acc, category)=>{
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
}, {});
;

/*
  const dispatch = useDispatch();
      useEffect(()=>{
        //authstatechanges needs to be unmounted but ti actually returns an unsubscribe function to help you unomount the function
        //checks the authentication state when you listen to the listener
        const unsubscribe = onAuthStateChangedListener((user)=> {
            if(user){
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
    },[dispatch]);

*/