import React from 'react';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import Spinner from '../../components/spinner/spinner';

const editUserModal = (props) => {
    let modalData = <div>
   
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" onKeyPress={props.NameKeyPress} maxLength='40'
                    minLength='3' name={props.firstNameInputName} value={props.firstNameValue} onChange={props.firstNameValueChange} />
                {!props.firstNameValue ? <span className="error">{props.firstNameError}</span> : null}
            </FormGroup>
            <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input id="lastName" name={props.lastNameInputName} 
                onKeyPress={props.NameKeyPress}
                maxLength='40'
                minLength='3'
                value={props.lastNameValue} onChange={props.lastNameValueChange} />
                {!props.lastNameValue ? <span className="error">{props.lastNameError}</span> : null}
            </FormGroup>
            <FormGroup>
                <Label for="Username">Username</Label>
                <Input id="Username"
                maxLength='40'
                minLength='3'
                name={props.userNameInputName} value={props.userNameValue} onChange={props.userNameValueChange} />
                {!props.userNameValue ? <span className="error">{props.userNameError}</span> : null}
                {props.userNameServerError ? <span className="error">{props.userNameServerError}</span> : null}
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email"  id="email"
                 maxLength='70'
                 minLength='6'
                 value={props.emailValue}
                 onKeyPress={props.emailKeyPress}
                 name={props.emailInputName} onChange={props.emailValueChange} />
                {!props.emailValue ? <span className="error">{props.emailError}</span> : null}
                {<span className="error">{props.inValidEmailFormatError}</span> }
                {props.emailServerError ? <span className="error">{props.emailServerError}</span>: null}
            </FormGroup>
            <FormGroup>
                <Label>Tower Name</Label>
                <Input name={props.towerInputName}
                    type="select"
                    onChange={props.towerChange} defaultValue={props.towerValue} >
                    <DefaultSelect />
                    {props.fetchingTower}
                </Input>
                {!props.towerValue ? <span className='error'>{props.towerError}</span> : null}
            </FormGroup>
        
            <FormGroup>
                <Label for="contact">Contact</Label>
                <Input id="contact" onKeyPress = {props.contactValidation} name={props.contactInputName} 
                value={props.contactValue} onChange={props.contactValueChange}
                maxLength='10' />
                {<span className="error">{props.contactError}</span>}
                {props.contactServerError ? <span className="error">{props.contactServerError}</span> : null}
            </FormGroup>
            <FormGroup>
                <Button type="submit" color="primary" onClick={props.updateUserClick}>Save</Button>{' '}
                <Button color="danger" onClick={props.toggle}>Cancel</Button>
            </FormGroup>
    </div>
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Edit User</ModalHeader>
            <ModalBody>
                
                {!props.modalLoading ? modalData : <Spinner /> }

            </ModalBody>
            
        </Modal>
    )
}

export default editUserModal;