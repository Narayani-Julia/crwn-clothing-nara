import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button-component";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
const defaultFormFields = {
    email:'',
    password:'',
};

const logInWithGoogle = async() => {
    //Youre gonna get a response but we wanna destructure it in order to pass it to the firebase
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
};


const SignInForm = () =>
{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    console.log(formFields);

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleChange = (event)=>{
        const {name, value} = event.target //gotta be the target
        setFormFields({... formFields, [name]: value});
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
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

            console.log(error.message);
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