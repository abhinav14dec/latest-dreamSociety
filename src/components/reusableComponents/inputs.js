import React from 'react';
import { FormGroup, Input, Button, Label } from 'reactstrap';

const InputField = props => {
    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <Input disabled={props.disabled} placeholder={props.placeholder} name={props.name} type={props.type} maxLength={props.maxLength} onChange={props.inputChange} onKeyPress={props.onKeyPress} value={props.value
            } />
            <span className={props.className}>{props.error}</span>
        </FormGroup>
    );
}

export default InputField;