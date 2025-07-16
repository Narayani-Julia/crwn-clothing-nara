import {useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button-component";
//import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
};


const SignUpForm = () =>
{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    //This is going to make react re-render the page when there is a new user
    //It wont usually update the DOM, this is where the Virtual DOM comes in hand, there is no need to update the DOM
    //re-rendering means that it will re-reun this entire return statement
    //const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleChange = (event)=>{
        const {name, value} = event.target //gotta be the target
        setFormFields({... formFields, [name]: value});
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        //create a user document
        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(
                email, 
                password);            
            //setCurrentUser(user);
            //Store document object
            //One place where the code is not centralized because we want a display name
            //centralized in terms of using the listener for authentication
            await createUserDocumentFromAuth(user, 
                {displayName});
            resetFormFields();
        }
        catch(error)
        {
            console.log('user creation encountered an error', error);
        if(error.code === "auth/email-already-in-use") //this is a good sign when as a coder you recieve this because it means its logging in the user correctly usually
         {alert("Email already in use");}
        else{console.log('user creation encountered an error', error);}
            console.log('error creation of user', error.message);
        }
    }
    return (
        <div className = 'sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up With Your Email And Password</h1>
                
                <FormInput label="Display Name" type = 'text' required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" type = 'email' required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Enter Password" type = 'password' required onChange={handleChange} name="password" value={password}/>
 
                <FormInput label="Confirm Password" type = 'password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button buttonType='inverted' type="submit">Sign Up</Button>
            </form>
        </div>
    );
}
export default SignUpForm;