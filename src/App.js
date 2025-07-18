import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
//Assembling the routing for the application: 
import {Routes, Route} from 'react-router-dom'
import Shop from './routes/shop/shop.component'
import Authentication from './routes/authentication/authentication.component'
import Checkout from './routes/checkout/checkout.component'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { onAuthStateChangedListener, 
          createUserDocumentFromAuth, 
          getCurrentUser} from './utils/firebase/firebase.utils'
import { checkUserSession, setCurrentUser } from './store/user/user.action'

const App= () => {
  //prop drilling: passing in props for components that dont need it, but their child possibly needs it
  //Context allows React to store data so that components from different parts of the DOM tree can access it
  const dispatch = useDispatch();
      useEffect(()=>{
        dispatch(checkUserSession())
        //getCurrentUser().then((user) => console.log('user', user));
    },[]);

  return (
  // extending the browser router properties into the subclasses here
  <Routes>
    <Route path= '/' element = {<Navigation />}>
    {/* Default Page is defined as index elment. It will be displayed under parent component url */}
    <Route index element={<Home/>}/>
    {/* the '/' this is the main page*/}
    {/* nested Route components 
    - relative children paths
    - the parent component will render. The child component will not know where to go with respect to the home page. You need to define the child component within the 
    parent component definition.
    - need to use an Outlet in order to implement this
      */}    

      {/* 
      in a route '/*' means match ANYTHING that has this route, render this component either way
      */}
      <Route path='/shop/*' element = {<Shop/>}/>
      <Route path='auth' element={<Authentication/>}/>
      <Route path='checkout' element={<Checkout/>}/>
    </Route>
  </Routes>
      );
};
export default App;