import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
//Assembling the routing for the application: 
import {Routes, Route} from 'react-router-dom'
import Shop from './routes/shop/shop.component'
import SignIn from './routes/sign-in/sign-in.component'


const App= () => {
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
    <Route path='/shop' element = {<Shop/>}/>
    <Route path='signIn' element={<SignIn/>}/>
    </Route>
  </Routes>
)}

export default App;