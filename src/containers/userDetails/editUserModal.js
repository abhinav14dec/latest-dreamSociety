import React from 'react';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import Spinner from '../../components/spinner/spinner';

const editUserModal = (props) => {
    let modalData = <div>
        {/* <FormGroup>
                <Label>Role</Label>
                <Input type="select" name={props.roleInputName}  id="roleName" value={props.roleNameValue} onChange={props.roleNameChange} >
                    <DefaultSelect />
                    {props.fetchRoles}
                </Input>
                <span className="error">{props.roleNameError}</span>
            </FormGroup> */}

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
                onChange={props.userNameChange}
                maxLength='40'
                minLength='3'
                name={props.userNameInputName} value={props.userNameValue} onChange={props.userNameValueChange} />
                {!props.userNameValue ? <span className="error">{props.userNameError}</span> : null}
                {props.userNameServerError ? <span className="error">{props.userNameServerError}</span> : null}
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email"
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
            {/* <FormGroup>
                <Label>No. of Family Members</Label>
                <Input name={props.familyInputName}
                    placeholder="No. of Family Members"
                    type="text"
                    value={props.familyValue}
                    onChange={props.familyChange}
                    maxLength='1'
                    onKeyPress={props.contactKeyPress}  />
                {!props.familyValue ? <span className='error'>{props.familyError}</span> : null}
            </FormGroup> */}
            {/* <FormGroup>
                <Label>Parking Slot Name</Label>
                <Input name={props.parkingInputName}
                    type="text"
                    placeholder="Parking Slot Name"
                    value={props.parkingValue}
                    onChange={props.parkingChange}
                    onKeyPress={props.parkingAndFloorKeyPress}
                    maxLength='20'  />
                {!props.floorValue ? <span className='error'>{props.parkingError}</span> : null}
            </FormGroup> */}
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