import {ShoppingIcon, CartIconContainer, ItemCount} from "./cart-icon.styles.jsx"
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

const CartIcon = () =>
{
    
    const dispatch = useDispatch();
    const cartQty = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    ///Defining a toggle
    const toggleIsCartOpen = ()=> dispatch(setIsCartOpen(!isCartOpen))
    return (
        <CartIconContainer onClick={toggleIsCartOpen}> 
            <ShoppingIcon />
            <ItemCount>{cartQty}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;