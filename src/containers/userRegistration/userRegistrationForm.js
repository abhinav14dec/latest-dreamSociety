import React from 'react';
import { FormGroup, Input, Button, Label } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';

const userRegistrationForm = (props) => (
    <div>
        <FormGroup>
                <Label>User Type</Label>
                <Input type="select" defaultValue='no-value' name={props.roleInputName} onChange={props.roleChange}>
                    <DefaultSelect />
                    {props.fetchingRole}
                </Input>
                <span className='error'>{props.roleError}</span>
            </FormGroup>
            <FormGroup>
                <Label>First Name</Label>
                <Input name={props.firstNameInputName}
                    type="text"
                    placeholder="First Name"
                    value={props.firstNameValue}
                    onChange={props.firstNameChange}
                    onKeyPress={props.NameKeyPress}
                    maxLength='25'
                    minLength='3' />
                <span className='error'>{props.firstNameError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Last Name</Label>
                <Input name={props.lastNameInputName}
                    type="text"
                    placeholder="Last Name"
                    value={props.lastNameValue}
                    onChange={props.lastNameChange}
                    onKeyPress={props.NameKeyPress}
                    maxLength='25'
                    minLength='3'  />
                <span className='error'>{props.lastNameError}</span>
            </FormGroup>
            <FormGroup>
                <Label>User Name</Label>
                <Input name={props.userNameInputName}
                    type="text"
                    placeholder="User Name"
                    value={props.userNameValue}
                    onChange={props.userNameChange}
                    maxLength='25'
                    minLength='3'  />
                <span className='error'>{props.userNameError}</span>
                <span className="error">{props.userNameServerValidationError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input name={props.emailInputName}
                    type="email"
                    placeholder="Email"
                    onChange={props.emailChange}
                    onKeyPress={props.emailKeyPress}
                    maxLength='40'
                    minLength='10'
                    onKeyPress={props.emailKeyPress}  />
                {props.emailError ? <span className='error'>{props.emailError}</span> : null}
                {props.emailServerValidationError ? <span className="error">{props.emailServerValidationError}</span>: ''}
                {<span className="error">{props.InValidEmailFormatError}</span>}
                
            </FormGroup>
            <FormGroup>
                <Label>Tower Name</Label>
                <Input name={props.towerInputName}
                    type="select"
                    defaultValue='no-value'
                    onChange={props.towerChange} >
                    <DefaultSelect />
                    {props.fetchingTower}
                </Input>
                <span className='error'>{props.towerError}</span>
            </FormGroup>
            {/* <FormGroup>
                <Label>Parking Slot Name</Label>
                <Input name={props.parkingInputName}
                    type="text"
                    placeholder="Parking Slot Name"
                    value={props.parkingValue}
                    onChange={props.parkingChange}
                    onKeyPress={props.parkingAndFloorKeyPress}
                    maxLength='20'  />
                <span className='error'>{props.parkingError}</span>
            </FormGroup> */}
            
            
            <FormGroup>
                <Label>Contact No.</Label>
                <Input name={props.contactInputName}
                    type="text"
                    placeholder="Contact No."
                    value={props.contactValue}
                    onChange={props.contactChange}
                    onKeyPress={props.contactKeyPress}
                    maxLength='10'
                    minLength='10' />
                <span className='error'>{props.contactError}</span>
                <span className='error'>{props.contactServerValidationError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input name={props.passwordInputName}
                    placeholder="Password"
                    type="password"
                    value={props.passwordValue}
                    onChange={props.passwordChange} />
                <span className='error'>{props.passwordError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Confirm Password</Label>
                <Input name={props.passwordConfirmationInputName}
                    placeholder="Confirm Password"
                    type="password"
                    value={props.passwordConfirmationValue}
                    onChange={props.passwordConfirmationChange} />
                <span className='error'>{props.passwordConfirmationError}</span>
            </FormGroup>

            <Button color="success" className="mr-2">Add User</Button>
            <Button onClick={props.routeToUserDetails} color="danger">Cancel</Button>
    </div>
);

export default userRegistrationForm;