import './cart-dropdown.styles.jsx'
import Button from '../button/button-component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { EmptyCartMessage, CartDropdownContainer, CartItems } from './cart-dropdown.styles.jsx';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandle = ()=> {
        navigate('./checkout');
    };


 return(
    <CartDropdownContainer>
        <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
        )}                
        </CartItems>
        <Button onClick={goToCheckoutHandle}>Go To Checkout</Button>
    </CartDropdownContainer>
 );   
}
export default CartDropdown;