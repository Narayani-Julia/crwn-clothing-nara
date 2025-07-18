import {all, call} from 'redux-saga/effects';
import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';
//generator function is defined like function*
//a function that resumbles async await
//built on top of generators
//.next() => (value, done: bool)
//yield means done is false
//last yield will give a value of 0, but if you return it will make sure last value is that value
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)]);
}

