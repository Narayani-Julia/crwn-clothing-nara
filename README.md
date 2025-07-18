# Creating React App
npx create-react-app <app-name>
cd <app-name>

# Running site:
yarn install
yarn start

or:
npm install

# If reaact-scripts not installed correctly:
Stop livesharing your webpage when you do this. For some reason this makes an error
rm -rf node_modules && npm install

or
rd /s /q node_modules
del package-lock.json
npm install

# Git
git clone <repo>
cd <repo>
git checkout <branch>
git checkout -b <new branch from previous branch>
git add -A
git commit -m ""
git push -u origin <branch>
# Step 1: remove all the stuff that 

# Removing repo: 
rm -rf <repo>/ 

# Setting up SASS
yarn add sass

# How to set up routers in React, 
Version six is actually not backwards compatible.  Know what are the versions you want to use. 
yarn add react-router-dom@6

# Incorporate Routers:
import BrowserRouter
Wrap BrowserRouter around the App
App should be a directory of all the links
create a routes folder and store the components that each link returns
Use Outlet as where the components of each navigation component should be displayed
Routes Component to define which component is linked to each url
Link as the buttons to send to each url
Create route folder for seperation of concerns

# Adding New Link
- Add A navigation component
- Add a Link component
- Add the component itself to the routes folder, and youre pretty set!

# Firebase
Go to clone in the website in order to create a Firebase DB
No need for Firebase Analytics since it makes using a DB more complicated
Firestore Database is where you will find the instance of your DB
RealTime is older DB so no need to use it
Install firebase onto your application

# install firebase
yarn add firebase
go to the db on the firebase website and create a webapp <>
get the firebase config from the generated links given from the website


# Firestore stores data like: 

Collection is the file related to type of data stored
document is the individdual user
data - sstuff related to specific data

Shoes = Collection
    Nike = Document
        data
    Adidas = Document
        data

# Creating the database

Websitre => database => Build => Firestore database = > create database => production mode

Go to Rules: Change line to: allow read, write: if true; and then hit Publish

# incorporate Firebase into code
step 1: create a firebase/utils.js file because you want to keep all of the stuff that directly interacts with the firebase app in one place

step 2: 

# Incorporate User Context"
import useContext and UserContest in the utils file
context is used as a glorified component that gives access to some data

# EVERY listener has three components: 
1. next method: called everytime a new event in the stream happens
- event gets passed to this next function
- callback recieves that event
- TLDR: points to the callback
2. error: when errors occurs
- network delay, reject this error so that you can react consistently
3. complete(): when a stream closes, say that there are no more anticipated events

# Fetching data from an API, and havnig components storing them
- set up the storage first
- set up the call
- need to set up a context(1. provider, 2. value)
-- provider set up with a default dataset
- initialize the context with reacts createContext
- exporrt the provider --> needs children so we can pass it in between the product context provider
-- provider needs a useState for the data
-- pass the variable from useState as the value for the context
-- Wrap the provider tags where needed in the <App/> component
-- which provider depends on which provider, which needs access to what
-- using a useState for if the data that the provider is based on is something that is connected to a listener
-- if there are more elements needed to be added, have a another useState for the setter and variable respectively

- # In order to use this data
-- import context, import useContext
-- const {data} = useContext(dataContext)

# When is defining key neccassary?
- Inside a map()
- when there are mutiple div inside an outer div

# Coding notes
- map
  has to return something inside of it like 
  .map(()=>()) orr .map(()=>{;return();})

- if you have components that rely on async code, you need to put in safegaurds: <component> && <component>.display

# Adding Styled Components In SCSS
+ Run the following: yarn add styled-components
+ import styled from 'styled-components'; 
+ rename your .css or scss files to .jsx or .js in your style file
+ export const NavigationContainer = styled.div``
- could be any style element styled.button, .h2, 
etc etc
- For Link: styled(Link)``
- will forward the styles to the respective components
- inside the backtiks you can keep your styling
use NavigationContainer to keep any stuff that you want restricted to those styles
- wherever you want the component to restrict the styling for: <StyledComponent> </StyledComponent>
as = 'span' if you want to use the properties of a specific tag
- instead of sass variables:
$sub-color: grey;
you would do: const subcolor = 'grey';
- instead of sass @mixin:
const shrinkLabelStyles = css` ... ${subColor}`
-Want to define things by seeing which things are needed later, need to define dependencies first


# Targetinig different styled components within each other as selectors
- ${}{}
- Has to be initialized before accessing it, otherwise error
implicit return: () => ();
explicit return: () => {;;; return();}
`${variable}`


# Testing in React
- npm run tests

#Types of Testing:
- unit testing: logic of functions, individual functions. pure functions
- Integration Tests: checks the way things are connected. contract = connection between things. eg: server and db. these are slow/brittle
- automation tests: testing real life scenarios, design robots who do this for you. ui tests. aka &2& tests
-- hardest to set up
--eg: nightwatch, cypress, testcafe, nightmare
-webdriver.io good documentation
-testcafe: no cross browser, all tools in on
-nightmare : really simple ways to automate, also webscraping

# Testing Needs: 
- Testing Library: Scaffolding, Building structures
-- top three libraries for this: Jasmine, Jest, Mocha
- Assertion Library: assertion functions
-- jasmine, chai, jest
- Test Runner: npm run test
-- jasmine, jest, mocha, karma.js(browser)
-- browser: reduces overhead, pupeteer by google : headless version of browser
-- jsmon: fake version of dom
- Mock Spies and Stubs
-- mocks/stubs: fake function to test contracts
-- spies: shows how many times a fucntion is called
- Code Coverage
--- Istanbul library
-- shows % of code that is being tested, uncovered lines

# Testing 101:
- create project folder
- mkdir test
- cd test
- run to create package: npm init -y
- create script.js file: touch script.js
- open the file in whatever text editor you like: sublime . or code .
- run: npm install jest
(assumes --save as a dependency)
npm install --save-dev jest
- change in package.json:
"scripts" : {"test": "jest"},

# How to host your website using netlify
- netlify.com: CI environment, it will actually handle warnings
- modify the build command to: You need to keep that whitespace in there!
CI= yarn build
- You will get a warning when you refresh a page, Solution: Adding Redirects to netlify
-- this is because of webservers. Accessing a website is accessing a base route, but the resources are stored in the web server, it will send back the web files, including all the libraries and everything. Single page application ==> base route for the /endpoint
-- since its a single application

# Redirect file
/* means every page under this base route
/index.html is what react creates. We're sending the page to everysingle route
200 is success code

# Reducer
- Action{type: string, payload:any}
- type: "TOGGLE_CART_IS_OPEN" //Clear identifier of what is the action
- payload is optional, it's like the parameters that are needed to change the useState variables
- reducers returns an object
- reducers make more sense for bigger objects, bigger payloads. Smaller objects can use useState instead. Very useful when a change reflects on a bunch of other variables
- reducers store readable objects only
- reducers should not store any business logic

# Using reducer:
+ import useReducer
+ Think of the shape of the final output. Create INITIAL_STATE object first. Store relevant readable objects
+ Make the reducer. Reducer should have:
- type
- payload
- syntax: const <ReducerName> = (state, action) => { 
  const {type, payload} = action;
  switch(type){
    case 
    default: throw new Error(`unhandled type of ${type} in cartReducer`)
  }
};

Now think about how to divide the logic and the reducer code. 

+ Introduce a helper function in the component to handle the updates for the Reducer values. Use this hlper function wherever you are trying to set the values of the useState variables. At the end of this function, 
dispatch(type: "SET_CART_ITEMS", payload: {cartItem: newCartItems, cartTotal:newCartTotal, cartCount: newCartCount});
This function should have the stuff you would write in useEffect (how would you recalculate values)
+ const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

# Redux
- Redux will wrap around the entire application unlike Contexts
- AKA global state management
- singular dispatch
- concept: singular source of truth
- YOU NEED TO CHOOSE BETWEEN REDUX AND CONTEXT
yarn add redux react-redux redux-logger
react-redux: dispatch and pull
redux-logger: tool helps you find out whats happening. good for debugging

# Setting up redux
+ yarn add redux react-logger root-reduxer
+ Set up a store folder
+ create a file: store.js : this is where state lives, we recieve actions, dispatch them into reducers to update the state
+ dispatch whenever an action method is called
+ 

# redux-logger
- helps log stuff onto the console, super nice for debugging
- 

# Setting up reselect for redux to optimize
yarn add reselect
when you download new things, its good to restart your development set-up
- reselect basically uses memoization underneath the hood

# Setting up redux persist
+ yarn add redux-persist

# Redux DevTools
- helps look at past states of the redux state
+ get the chrome extension
+ store.js : compose(): 
```
const composeEnhacer = (process.env.NODE_ENV !== 'production' && windpw && window__REDUX_EXTENSION_COMPOSE__) || compose;
```

# redux thunk
- asynch side effects inside redux
- actions do not need to flow
- redux bindings: read from the store or dispatch new actions within the actual middleware section of redux
- components dictate how actions get fired, what they do
- thunk is a middleware
- recieves aactions that are functions
- actions are async passed to thunk, thunk passes that function a dispatch
- thunks can abstract the logic into themselves

# installing thunk
- yarn add thunk
- check where async behaviour is there in your code that you can move into an action driven flow
- helps you not need to wait for async functions, but let your code operate based on whether it is in a loading state or not. so show loading and buffering pages
- recommended to end the function name with Async so it is understandable that this is a thunk: 
export const fetchCategoriesAsync = () => async(dispatch) => {}
- dispatch
- try{
  await
  dispatchSuccess
}
catch{
  dispatchFail
}
 
# Testing thunk
- await Promise.reject(new Error('new error woops'))

# Note: thunk and persist 
- you dont need to have both of them for a component because the older persist values will show up for a split second unessaccarily. 
- choose between the two
- rather whitelist the reducers that actually need to be held onto

# SAGA:
- fire after the reducers have been updated, 
- yarn add redux-saga
- either choose between saga or thunk. theyre replaceable

# redux-toolkit
- helps remove boilerplate
- yarn add @reduxjs/toolkit




# Checking for dependencies
Sometimes you will spend 4 hours looking at code that doesnt work and you won't know why its breaking. Checking your dependencies and seeing if its right might help with this issue

yarn add react-router-dom@6
yarn add react-redux@7.2.6
npm ci
yarn why react
