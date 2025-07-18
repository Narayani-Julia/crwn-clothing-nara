//Action needs to find out what it needs to update in the final reducer
//you no longer have scope,
//functions have to be as pure as possible

import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
    //find if container contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id);
    //if found, increment qunatity
    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id ===productToAdd.id ? {...cartItem, quantity:cartItem.quantity+1} :cartItem);
    }
    // return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity:1}];
};

const removeCartItem = (cartItems, productToDelete) => {
    //find if container contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToDelete.id);
    //if found, decrement qunatity
    if(existingCartItem.quantity!==1){
        return cartItems.map((cartItem)=> cartItem.id === productToDelete.id ? 
        {...cartItem, quantity:cartItem.quantity-1} :cartItem);
    }
    // remove the singular element from the list
    return cartItems.filter(item=> item.id !== productToDelete.id);
};

const deleteItemFromCart = (cartItems, productToDelete)=>{
    return cartItems.filter((item)=> item.id!== productToDelete.id);
};

export const addItemToCart = (cartItems, productToAdd)=>{
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addCartItem(cartItems, productToAdd));
    };
export const removeItemFromCart = (cartItems, productToRemove)=>{
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeCartItem(cartItems, productToRemove));
    };
export const clearItemFromCart= (cartItems, productToDelete)=>
    {
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, deleteItemFromCart(cartItems, productToDelete));
    };