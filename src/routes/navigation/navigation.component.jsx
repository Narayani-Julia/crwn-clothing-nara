
//In order to tell the parent component where the child Routes need to be displayed wrt to the parent component
//Create a top level navigation in order to do this
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react/cjs/react-jsx-runtime.production.min";
//scg logos can expand and not look pixelated, so they are great to use as a logo
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
const Navigation = () =>{
  return(
  //Should be the / component since it is supposed to be displayed all the time 
  <>
    <div className = 'navigation'>
    {/* Since Link is like an anchor tag, it means you can wrap it around an object to treat it like an anchor tag */}
    <Link className ='logo-container' to='/'> 
    <CrwnLogo className= 'logo' />
    </Link>
    <div className = 'nav-links-container'>
        {/* Correctly reference the right link based on the BrowswerRouter. Works like an a tag */}
        <Link className = 'nav-link' to='/shop'>SHOP</Link>
        <Link to="auth">Sign In</Link>
    </div>
  </div>
    <Outlet />
</>
    );
}

export default Navigation;
