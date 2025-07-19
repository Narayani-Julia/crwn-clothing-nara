
//In order to tell the parent component where the child Routes need to be displayed wrt to the parent component
//Create a top level navigation in order to do this
import { Outlet } from "react-router-dom";
//scg logos can expand and not look pixelated, so they are great to use as a logo
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {NavigationContainer, LogoContainer, NavLink, NavLinks} from './navigation.styles'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  //we dont need a setter method for the user because the UseContextListener will handle this for us
  //const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const signOutHandler = async ()=>{
    return dispatch(signOutStart());
    //await signOutUser();
  }; 

  return(
  //Should be the / component since it is supposed to be displayed all the time 
  <>    
    <NavigationContainer>
    {/* Since Link is like an anchor tag, it means you can wrap it around an object to treat it like an anchor tag */}
    <LogoContainer to='/'> 
      <CrwnLogo className= 'logo' />
    </LogoContainer>
    <NavLinks>
        {/* Correctly reference the right link based on the BrowswerRouter. Works like an a tag */}
        <NavLink to='/shop'>SHOP</NavLink>
        {currentUser ?
        //creating another function to handle the async of the auth function
            (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>):
            (<NavLink to="auth">Sign In</NavLink>)
        }
    <CartIcon/>
    </NavLinks>
    {isCartOpen && <CartDropdown/>}
    </NavigationContainer>
  <Outlet />
</>
    );
};

export default Navigation;
