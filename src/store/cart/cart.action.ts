//Action needs to find out what it needs to update in the final reducer
//you no longer have scope,
//functions have to be as pure as possible
import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

// UTILITY FUNCTIONS ---------------------------------------------------------------------------------------------------------------------
const addCartItem = (cartItems: CartItem[], productToAdd:CategoryItem): CartItem[] => {
    //find if container contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id);
    //if found, increment qunatity
    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id ===productToAdd.id ? {...cartItem, quantity:cartItem.quantity+1} :cartItem);
    }
    // return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity:1}];
};

const removeCartItem = (cartItems: CartItem[], productToDelete:CategoryItem): CartItem[] => {
    //find if container contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToDelete.id);
    //if found, decrement qunatity
    if(existingCartItem && existingCartItem.quantity!==1){
        return cartItems.map((cartItem)=> cartItem.id === productToDelete.id ? 
        {...cartItem, quantity:cartItem.quantity-1} :cartItem);
    }
    // remove the singular element from the list
    return cartItems.filter(item=> item.id !== productToDelete.id);
};

const deleteItemFromCart = (cartItems: CartItem[], productToDelete: CategoryItem): CartItem[]=>{
    return cartItems.filter((item)=> item.id!== productToDelete.id);
};


//ACTION CREATOR FUNCTIONS::
// You need to make types for their return type

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));
type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>


//All of the following have the same type
type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;
//Creating a function for this new base type:
export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems=> createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) : SetCartItems=>{
        return setCartItems(addCartItem(cartItems, productToAdd));
    };
export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) : SetCartItems=>{
        return setCartItems(removeCartItem(cartItems, productToRemove));
    };
//BE CAREFUL ABOUT TYPES. Here product to add is a category item. Product to remove and delete is a cartItem
    export const clearItemFromCart= (cartItems: CartItem[], productToDelete: CartItem): SetCartItems=>{
        return setCartItems(deleteItemFromCart(cartItems, productToDelete));
    };