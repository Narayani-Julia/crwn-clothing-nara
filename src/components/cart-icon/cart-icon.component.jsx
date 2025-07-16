import {ShoppingIcon, CartIconContainer, ItemCount} from "./cart-icon.styles.jsx"
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () =>
{
    const {isCartOpen, setIsCartOpen, cartQty} = useContext(CartContext);

    ///Defining a toggle
    const toggleIsCartOpen = ()=> setIsCartOpen(!isCartOpen)
    return (
        <CartIconContainer onClick={toggleIsCartOpen}> 
            <ShoppingIcon />
            <ItemCount>{cartQty}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;