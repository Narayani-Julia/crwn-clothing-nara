//Refer to the db by creatning and ap
//Things you need for signing in
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//FIRESTORE STUFF
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { Category } from "../../store/categories/category.types";

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
export type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, obectsToAdd: T[]): Promise<void>=>{
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


export const getCategoriesAndDocuments = async():Promise<Category[]>=>{
    const collectionRef = collection(db, 'categories');
    //object will help you get a snapshot
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    //.docs can get you arrays
    //reduce 1param: callback for each element, 2param: initial value to concatenate/
    //we do as Category here because we know Firebase is going to give us back a Category object but typescript does not know this
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};


export type AdditionalInformation = {
    displayName?: string;
}
export type UserData ={
    createAt: Date;
    displayName: string;
    email: string;
}
//Firebase has a datatype User for its userAuth objects as well as QueryDocumentSnapshot<user-definedd-type-here> for typescript users :)
export const createUserDocumentFromAuth = async (userAuth: User, 
    additionalInformation={} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {

    // Return void in the Promise since we are calling createUserDocumentFromAuth even when there is no user to be returned eg: signing out
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
            console.log('error creating the user', error)
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>; //data lives on the snapshot. Changing this to use this data using redux-saga
    //return userDocRef; //reference to the data
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
export const createAuthUserWithEmailAndPassword = async(email: string, password: string) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};
//typescript infers the return type via these functions so thats why we are not getting an error here. We can check with the typescript compiler whether these are the correct datatypes and they seem to be so yea
export const signInAuthUserWithEmailAndPassword = async(email: string, password: string) =>
{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
    
};

export const signOutUser = async() => await signOut(auth);
//callback is called everytime the state is changed because its listening to the state of the object
//open AudioListener, it permanently is a listener
//thus you need to unmount it
//NextOrObserver<User> firebase given datatype for this listener
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

//a function defined to wrap onAuthStateChanged inside a promise
//promise based function call
export const getCurrentUser = (): Promise<User | null> => {
    //resolve: positive, sucess in retrieving a value
    //reject: an error
    return new Promise((resolve, reject)=>
    {
        //we need to unsubscribe the moment we get a value
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe(); //need to remove the listener to prevent memory leaks
                resolve(userAuth);
            },
            reject //this parameter has to be a callback that runs when error thrown when trying to fetch user
        );
    });
}
