import './button.styles.scss'
/*
    Three button Types:
    default
    inverted
    google sign in
*/

const BUTTON_TYPE_CLASSES = {
    google:'google-sign-in',
    inverted:'inverted'
}
const Button=({children, buttonType, ...otherProps})=>{
    //backticks gotta be in {}
    //accessing an element in an array constant should be via []

    return( <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}{...otherProps}>{children}</button>);
};

export default Button;