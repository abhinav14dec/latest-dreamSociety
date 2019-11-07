import React from 'react';
import { FormGroup, Input,Label } from 'reactstrap';

const DropDownComponent = props => {
    console.log("dropdown-->",props)
    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <Input defaultValue={props.defaultValue} name={props.name} type={props.type} onChange={props.inputChange} value={props.value
            }>{props.children}</Input>
        </FormGroup>
    );
}


export default DropDownComponent;