import { signInWithGooglePopup,
    createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () =>{
    const logGoogleUser = async() => {
        //Youre gonna get a response but we wanna destructure it in order to pass it to the firebase
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };
    return (
        <>
            <button onClick = {logGoogleUser}>Sign In with google popUp</button>
            <SignUpForm />
        </>
    );

}
export default SignIn;