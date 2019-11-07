import React from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';

const parkingForm = (props) => (
    <div>
        <FormGroup>
                <Label>Parking Name</Label>
                <Input type="select" defaultValue="no-value" name={props.parkingName} onChange={props.parkingChange}>
                    <DefaultSelect />
                    {props.fetchParkingName}
                </Input>
                <span className='error'>{props.parkingError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Parking Slots</Label>
                <Input name={props.parkingSlotValueName}
                    placeholder="Parking Slots"
                    type="text"
                    value={props.parkingSlotValue}
                    onChange={props.parkingSlotValueChange}
                    onKeyPress={props.parkingSlotKeyPress}
                    maxLength='2'
                    minLength='1'
                />
                <span className='error'>{props.parkingSlotError}</span>
            </FormGroup>
            <Button color="success" className="mr-2">Add</Button>
            <Button onClick={props.routeToParkingDetails} color="danger">Cancel</Button>
    </div>
);

export default parkingForm;