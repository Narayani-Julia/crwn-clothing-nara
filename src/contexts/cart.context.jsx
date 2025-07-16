import { createContext, useEffect, useState } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    //should be the uptodate array of the cart items
    cartItems: [],
    cartQty: 0,
    setCartQty: ()=>{},
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
});

export const CartProvider = ({children})=>
{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQty, setCartQty] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce(
            (total, cartItem)=>total+cartItem.quantity
            , 0);
        setCartQty(newCartCount);
    }
        , [cartItems]);

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    const removeItemFromCart = (productToRemove)=>{
        setCartItems(removeCartItem(cartItems, productToRemove));
    };
    const clearItemFromCart= (productToDelete)=>
    {
        setCartItems(deleteItemFromCart(cartItems, productToDelete));
    };

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartQty};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    );
}
