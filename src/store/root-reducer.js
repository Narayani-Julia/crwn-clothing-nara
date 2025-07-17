import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
//this is the main reducer
export const rootReducer = combineReducers({
    //key = reducer slice, value = reducer function
    user: userReducer,
    categories: categoriesReducer,
});