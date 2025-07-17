import { createContext, useEffect, useState, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils.js";

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

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartQty: 0,
    cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state, //old state
                ...payload, //updating with whatever is the new value
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state, 
                isCartOpen: payload,
            };
        default: 
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
};


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    //should be the uptodate array of the cart items
    cartItems: [],
    cartQty: 0,
    cartTotal: 0,
    setCartQty: ()=>{},
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
});

export const CartProvider = ({children})=>
{
    const [{cartItems, isCartOpen, cartQty, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        /*
        generate newCartTotal
        generate newCartCount
        dispatch new action with payload={new things}
        */
        const newCartQty = newCartItems.reduce(
            (total, cartItem)=> total+cartItem.quantity, 0
        );
        const newCartTotal = newCartItems.reduce(
            (total, cartItem)=> total+cartItem.quantity*cartItem.price, 0
        );

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, 
             {cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartQty: newCartQty}));
    };

    const addItemToCart = (productToAdd)=>{
        updateCartItemsReducer(addCartItem(cartItems, productToAdd));
    };
    const removeItemFromCart = (productToRemove)=>{
        updateCartItemsReducer(removeCartItem(cartItems, productToRemove));
    };
    const clearItemFromCart= (productToDelete)=>
    {
        updateCartItemsReducer(deleteItemFromCart(cartItems, productToDelete));
    };
    const setIsCartOpen = (bool)=>
    {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };


    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart, 
        cartItems, 
        cartQty};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    );
}
