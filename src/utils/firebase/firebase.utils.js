//Refer to the db by creatning and ap
//Things you need for signing in
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//FIRESTORE STUFF
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

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
provider.setCustomParameters({
    //Gotta check the spelling of this right
    prompt: 'select_account', //this comma is actually important for defining key value pairs
});

//need to have the same authentication for one application
//keeps track of what user is being signed in rn
export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, obectsToAdd, field)=>{
    //going to give us the reference to the given collection
    const collectionRef = collection(db, collectionKey);
    //transaction: unit of work in a db
    const batch = writeBatch(db);
    //need to create a bunch of set methods 
    obectsToAdd.forEach((object)=>{
        //2nd param, key of the object
        const docRef = doc(collectionRef, object.title.toLowerCase());
        //
        batch.set(docRef, object);
    })
    await batch.commit();
};

export const getCategoriesAndDocuments = async()=>{
    const collectionRef = collection(db, 'categories');
    //object will help you get a snapshot
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    //.docs can get you arrays
    //reduce 1param: callback for each element, 2param: initial value to concatenate/
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    //     .reduce((acc, docSnapshot)=>{
    //     const {title, items} = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
    //return categoryMap;
};


//you want the
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {

    //
    if(!userAuth)
        return;

    //wanna get the data from the response in the Sign In
    //first check if document reference exists
    const userDocRef = doc(db, 'users', userAuth.uid); //parameters: db, collection you wanna reference, identifier's uniqueID

    //Now get the data with the userId
    const userSnapshot = await getDoc(userDocRef);

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
            console.log('error creating the user', error.message)
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

export const signInAuthUserWithEmailAndPassword = async(email, password) =>
    {
        if(!email || !password) return;
        return await signInWithEmailAndPassword(auth, email, password);
        
    };

export const signOutUser = async() => await signOut(auth);
//callback is called everytime the state is changed because its listening to the state of the object
//open AudioListener, it permanently is a listener
//thus you need to unmount it
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

