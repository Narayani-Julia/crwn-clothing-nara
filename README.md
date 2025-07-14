# Creating React App
npx create-react-app <app-name>
cd <app-name>

# Running site:
yarn install
yarn start

or:
npm install

# If reaact-scripts not installed correctly:
rm -rf node_modules && npm install

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
-- context set up with a dataset
- initialize the context with reacts createContext
- exporrt the provider --> needs children so we can pass it in between the product context provider
-- provider needs a useState for the data
-- pass the variable from useState as the value for the context
-- Wrap the provider tags where needed in the <App/> component
-- which provider depends on which provider, which needs access to what
-- using a useState for if the data that the provider is based on is something that is connected to a listener

- # In order to use this data
-- import context, import useContext
-- const {data} = useContext(dataContext)
