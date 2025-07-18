
import {createSelector} from 'reselect';
//input selectors: give us params
//output selectors
//gives us back the reducer that is needed
const selectCategoryReducer = (state) => state.categories;

//memoized selector, basically only runs when its the same
export const selectCategories = createSelector(
    [selectCategoryReducer], //input selectors
    (categoriesSlice)=>{return categoriesSlice.categories}    //output selectors, first param, corresponds with first element of input selector
);

//Will always be getting a new object. There will be unessaccary renders thus you need to use re-select
export const selectCategoriesMap = createSelector(
        [selectCategories],
        (categories)=> categories
        .reduce( (acc, category)=> {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {}
));

export const selectCategoriesIsLoading = createSelector(
[selectCategoryReducer],
(categoriesSlice) => categoriesSlice.isLoading
);

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