import CATEGORIES_ACTION_TYPES from './category.types';

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false, //for reducers to get a track of what state it is in
  error: null //errors within the thunk 
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {  
    const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {...state, isLoading: true};
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {...state, error:payload, isLoading:false};
    default:
      return state;
}
};
