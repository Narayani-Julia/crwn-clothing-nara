import { Match } from "@testing-library/react";
import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;
export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction){
            return action.type === type;
        },
    });
};


//There are some actions without a payload and some with a payload, so its important to make two explicit types to define Actions
export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

export type Action<T> = {
    type: T;
}
//T extends string because action type is an enum string
//pauyload is void because you need to have same number of parameters to overload it
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T,P>;
export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P){
    return {type, payload};
}


// Matchable allows us to extend all of these different action creator functions with an ability to match the recieved action by the datatype for the actioncreator
// Adding properties to action creators so that they can behave like action type gaurds
// extend action creators to perform type checking when they
//step 1: type predicate: basically checks for a datatype. returns parameter is datatype
// parameter is datatype
//step 2: 
// 
// 
// 