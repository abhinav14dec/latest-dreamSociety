import React from 'react';
import { FormGroup, Button } from 'reactstrap';

const ButtonComponent = props => {
    return (
        <Button className={props.className} style={props.style} color={props.color} onClick={props.buttonClicked} disabled={props.disabled}>{props.title}</Button>
    );
}


export default ButtonComponent;