import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import CATEGORIES_ACTION_TYPES from "./category.types";

//it attempts to call an async function, generates actions that goes back into the redux flow/sagas llistening for connections
export function* fetchCategoriesAsync() {
        try{
            //yeild call == await
            //anytime you call a function in a generator you got to use the call keyword because it is an effect
            //second parameter is where you keep your parameters
            const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');

            //put is how you call dispatch in your generative functions
            yield put(fetchCategoriesSuccess(categoriesArray));
        }
        catch(error){
            //what to do when it fails
            yield put(fetchCategoriesFailed(error));
        }
    }

export function* onFetchCategories(){
    //takeLatest: if you hear a bunch of the same actions, give me the latest one
    //kinda like a listener, and then run the second argument
    //this 
    //this line basically initializes the async saga generator function
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync );
}

//this is listening to all of the actions
export function* categoriesSaga () {
   //gimme array of things or functions or generators. wait until all of those complete before we continue 
   yield all([call(onFetchCategories)]); //only complete when it is done
  
}

