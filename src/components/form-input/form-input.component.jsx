
import {FormInputLabel, Input, Group} from './form-input.styles.jsx'

const FormInput= ({label, ...otherProps}) => {
    return (
        <Group>
            <Input {...otherProps} />
            {/* type = 'text' required onChange={changeHandler} name="displayName" value={displayName} */}
            {/* Syntax to use ...ottherProps as props for the button */}
            {/* If statement in jsx: */}
            {label && (
            <FormInputLabel 
            shrink = {otherProps.value.length}>
                {label}
            </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;