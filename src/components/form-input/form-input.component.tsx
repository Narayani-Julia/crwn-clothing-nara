
import { FC, InputHTMLAttributes } from 'react';
import {FormInputLabel, Input, Group} from './form-input.styles'


type FormInputProps = {
 label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps>= ({label, ...otherProps}) => {
    return (
        <Group>
            <Input {...otherProps} />
            {/* type = 'text' required onChange={changeHandler} name="displayName" value={displayName} */}
            {/* Syntax to use ...ottherProps as props for the button */}
            {/* If statement in jsx: */}
            {label && (
            <FormInputLabel 
            // shrink recieves a boolean value
            shrink = {Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}>
                {label}
            </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;