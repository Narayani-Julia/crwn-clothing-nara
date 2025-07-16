import './cart-dropdown.styles.scss'
import Button from '../button/button-component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
 return(
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItems.length ? cartItems.map(item=> <CartItem key = {item.id} cartItem = {item}/>): (<span className = 'empty-cart-message'>Your Cart Is Empty</span>)}
        </div>
        <Button>Go To Checkout</Button>
    </div>
 );   
}
export default CartDropdown;