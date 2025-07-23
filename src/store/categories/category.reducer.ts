import { AnyAction } from 'redux';
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { Category } from './category.types';

//readonly means values cannot be modified
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false, //for reducers to get a track of what state it is in
  error: null //errors within the thunk 
};

//typescript unfortunately does not understand that every action passes into the reducers
// it assumes that it will be only of the given action types. but it is important for the default case to work.
// we want an error catch for making sure the default case is necissary
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction // This is called a discriminatory union
  //Discriminatory Unions are slightly problematic
):CategoriesState => {  

  if(fetchCategoriesStart.match(action)) {
      return {...state, isLoading: true};
  }
  if(fetchCategoriesSuccess.match(action)){
      return { ...state, isLoading: false, categories: action.payload }; //Typescript is so smart and will understand that this action.type is of FETCHCATEGORIESSUCCESS datatype
  }
  if(fetchCategoriesFailed.match(action))
  {
      return {...state, error: action.payload, isLoading:false};
  }
      return state;
};
