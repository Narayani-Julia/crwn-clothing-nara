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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    //should be the uptodate array of the cart items
    cartItems: [],
    cartQty: 0,
    setCartQty: ()=>{},
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
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
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartQty};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    );
}
