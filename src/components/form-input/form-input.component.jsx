
import './form-input.styles.scss'
const FormInput= ({label, ...otherProps}) => {
    return (
        <div className="group">
            <input className='form-input' {...otherProps} />
            {/* type = 'text' required onChange={changeHandler} name="displayName" value={displayName} */}
            {/* Syntax to use ...ottherProps as props for the button */}
            {/* If statement in jsx: */}
            {label && (
            <label className={`${otherProps.value.length>0?`shrink`:``} form-input-label`}>{label}</label>
            )}
        </div>
    );
};

export default FormInput;