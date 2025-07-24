import {BaseButton, GoogleSignInButton, InvertedButton} from './button.styles'
import { FC } from 'react';
import { ButtonHTMLAttributes } from 'react';
/*
    Three button Types:
    default
    inverted
    google sign in
*/

export enum BUTTON_TYPE_CLASSES {
    base= 'base',
    google='google-sign-in',
    inverted='inverted'
};

//NOTE: Since button is already something that is defined by react, react most likely has a type that you can extend your values for

//Need to define button props
export type ButtonProps = {
buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>(
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

const Button: FC<ButtonProps> = ({children, buttonType, ...otherProps})=>{
    //backticks gotta be in {}
    //accessing an element in an array constant should be via []
    const CustomButton = getButton(buttonType);
    return( < CustomButton {...otherProps}>{children}</CustomButton>);
};

export default Button;