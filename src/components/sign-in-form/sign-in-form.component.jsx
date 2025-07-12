import { useContext, useState } from "react";
import { signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInAuthUserWithEmailAndPassword } 
    from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'

import Button from "../button/button-component";
import { UserContext } from "../../contexts/user.context";
const defaultFormFields = {
    email:'',
    password:'',
};

const SignInForm = () =>
{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
    const logInWithGoogle = async() => {
    //Youre gonna get a response but we wanna destructure it in order to pass it to the firebase
    const response = await signInWithGooglePopup();
    setCurrentUser(user);
    const userDocRef = await createUserDocumentFromAuth(response.user);
    };

    const handleChange = (event)=>{
        const {name, value} = event.target //gotta be the target
        setFormFields({... formFields, [name]: value});
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
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
            default: 
                console.log(error);
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
                <Button type = "button" buttonType='google' onClick = {logInWithGoogle} >Sign In</Button>
                </div>
            </form>
        </div>
    );
}
export default SignInForm;