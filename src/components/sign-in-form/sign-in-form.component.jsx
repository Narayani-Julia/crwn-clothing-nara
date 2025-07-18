import { useState } from "react";
import { signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInAuthUserWithEmailAndPassword,
 } 
    from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from "../button/button-component";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
//import { UserContext } from "../../contexts/user.context";
const defaultFormFields = {
    email:'',
    password:'',
};

const SignInForm = () =>
{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const navigate = useNavigate();
    //No need for a setCurrent user because we are using a listener that handles this for us
    //Also no need for the useContext imports either
    //const {setCurrentUser} = useContext(UserContext);
    const dispatch = useDispatch();
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
    const logInWithGoogle = async() => {
    //Youre gonna get a response but we wanna destructure it in order to pass it to the firebase
        //const response = await signInWithGooglePopup();
        dispatch(googleSignInStart());
        
        //setCurrentUser(response.user);
        //This is not needed to be done here anymore. We can do it during the listener function
        //const userDocRef = await createUserDocumentFromAuth(response.user);
        navigate('/');
    };

    const handleChange = (event)=>{
        const {name, value} = event.target //gotta be the target
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            dispatch(emailSignInStart(email, password));
            //const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            //setCurrentUser(user);
            resetFormFields();
            navigate('/');
        }
        catch(error)
        {   
        switch(error.code){
            case "auth/invalid-credential":
                alert('incorrect password/email');
                break //says if one of the cases are true, you dont need to check for other conditions
            case "auth/user-not-found":
                alert('no such user found');
                break
            case "auth/popup-closed-by-user":
                alert('not logged in');
                break
            default: 
                console.log('uncaught error in sign in', error.message);
            }
        }
    }
    return (
        <div className = 'sign-in-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <h1>Sign In With Your Email And Password</h1>
                
                <FormInput label="Email" type = 'email' required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Enter Password" type = 'password' required onChange={handleChange} name="password" value={password}/>
                <div className = 'buttons-container'>
                <Button type="submit">Sign In</Button>
                {/* Need to change the button type to submit, so that it won't submit the form */}
                <Button type = "button" buttonType={BUTTON_TYPE_CLASSES.google} onClick = {logInWithGoogle} >Sign In</Button>
                </div>
            </form>
        </div>
    );
}
export default SignInForm;