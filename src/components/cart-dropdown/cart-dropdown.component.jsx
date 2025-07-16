import './cart-dropdown.styles.scss'
import Button from '../button/button-component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandle = ()=> {
        navigate('./checkout');
    };


 return(
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItems.length ? cartItems.map(item=> <CartItem key = {item.id} cartItem = {item}/>): (<span className = 'empty-cart-message'>Your Cart Is Empty</span>)}
        </div>
        <Button onClick={goToCheckoutHandle}>Go To Checkout</Button>
    </div>
 );   
}
export default CartDropdown;