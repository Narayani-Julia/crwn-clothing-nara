
import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState= {
    isCartOpen: false,
    cartItems: [],
};

//Here we dont need to destructure the object and prep for an emoty action like action = {}
export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
    if(setCartItems.match(action)){
            return {
                ...state, //old state
                cartItems: action.payload, //updating with whatever is the new value
            };
    }
    if(setIsCartOpen.match(action)){
            return{
                ...state, 
                isCartOpen: action.payload,
            };

    }
    return state;
};
