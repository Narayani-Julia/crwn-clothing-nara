//Refer to the db by creatning and ap
//Things you need for signing in
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    FacebookAuthProvider} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//FIRESTORE STUFF
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useTransition } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
    //this is the basic firebase apikey for everyone, so its okay if everyone sees this api
  apiKey: "AIzaSyBbULE3v3lXkh0cUjZXc9roYgZU4JCGIAY",
  authDomain: "crwn-clothing-db-34c84.firebaseapp.com",
  projectId: "crwn-clothing-db-34c84",
  storageBucket: "crwn-clothing-db-34c84.firebasestorage.app",
  messagingSenderId: "101254136722",
  appId: "1:101254136722:web:a5b3e817e0376e33ca774b"
};

// Initialize Firebase
//abstracts the important java functionality
const firebaseApp = initializeApp(firebaseConfig);

//different providers will have different ways
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider()
provider.setCustomParameters({
    //Gotta check the spelling of this right
    prompt: 'select_account', //this comma is actually important for defining key value pairs
});

//need to have the same authentication for one application
export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();

//you want the
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {

    //
    if(!userAuth)
        return;

    //wanna get the data from the response in the Sign In
    //first check if document reference exists
    const userDocRef = doc(db, 'users', userAuth.uid); //parameters: db, collection you wanna reference, identifier's uniqueID
    console.log(userDocRef);

    //Now get the data with the userId
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    //Check if user data exists
    if(!userSnapshot.exists())
    {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            //Need to reference the user in order to set the data for the document
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt,
                ...additionalInformation,
            }
            );
        }
        catch(error)
        {
        }
    }
    return userDocRef;
    //return userDocRef
    //if user data does not exist
    //create a document using the snapshot
}
//next step: go to the website. Go to db authentication, click start, click the type of sign in, then click enable sign in
//setting some value inside of firebase

//creating a value in the authentication tab with a user
//keeping all these function in a seperate file helps with seperation of concerns
//thus your code is seperate from the layer that the user creates the logic for their own app
//protecting the front-end application from the stuff underneat here

//creating these functions asynchronously inside of firebase
export const createAuthUserWithEmailAndPassword = async(email, password) => {

    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};