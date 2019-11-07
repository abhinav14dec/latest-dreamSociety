import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UI from '../../components/newUI/tenantDashboard';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner'
import { Form, Button, FormGroup, Input, Label, Col, Row } from 'reactstrap';
import DefaultSelect from './../../constants/defaultSelect';
import { OnKeyPressUserhandler, numberValidation } from '../../validation/validation';




class GuestInvitation extends Component {
    constructor() {
        super();

        this.state = {

            errors: {},
            message: '',
            fullName: '',
            contactNo: '',
            address: '',
            purpose: '',
            eventName: '',
            contactNo: '',
            noOfPerson:''

        }
    }

    onChange = (e) => {
      
        this.setState({ message: '' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword=()=>{ 
        console.log("password")
        return this.props.history.replace('/tenantDashboard/changePasswordTenant')
    }

    close = () => {
        return this.props.history.replace('/tenantDashboard')
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        let errors = {};
        
        if(!this.state.fullName) {
            errors.fullName = "cant be empty";
        }

        else if(this.state.contactNo.length !== 10) {
            errors.contactNo = "contact number should be 10 digit";
        }

        else if(this.state.address ==='') {
            errors.address = "cant be empty";
        }
        
        else if(this.state.purpose ==='') {
            errors.purpose = "cant be empty";
        }

        else if(this.state.eventName ==='') {
            errors.eventName = "cant be empty";
        }

        else if(this.state.noOfPerson ==='') {
            errors.noOfPerson = "cant be empty";
        }

        
        this.setState({ errors });
        console.log("submited===========================", this.state);

        const isValid = Object.keys(errors).length === 0;

        if(isValid){
                    // this.setState({loading:true})
                    const {fullName,contactNo,address,purpose,eventName,noOfPerson}=this.state
                    console.log(fullName,contactNo,address,purpose,eventName,noOfPerson)
                    // this.props.postRegister(this.state)
                    // .then((msg)=>{ msg;
                    //     console.log(msg)
                    //     this.setState({message : msg.payload.message, loading: false 
                    //     })
                    //     this.toggle()
                    // })
                    // .catch(err=>{err;
                    //     console.log(err);
                    //     this.setState({message : err.response.data.message, loading: false})
                    // })
                
                 
                    }
    }

    render() {

        let data =
            <div>
                <FormGroup>
                    <Row>
                        <Col md={6}>
                            <Label>Name</Label>
                            <Input type="text" name="fullName" placeholder="Enter full name" onChange={this.onChange} onKeyPress={OnKeyPressUserhandler} maxLength={200}></Input>
                            <span className='error'>{this.state.errors.fullName}</span>
                        </Col>

                        <Col md={6}>
                            <Label>Contact No.</Label>
                            <Input type="text" name="contactNo" placeholder="Enter contact no" onChange={this.onChange} onKeyPress={numberValidation} maxLength={10}></Input>
                            <span className='error'>{this.state.errors.contactNo}</span>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row>
                        <Col md={6}>
                            <Label>Address</Label>
                            <Input type="textarea" name="address" placeholder="Enter address" onChange={this.onChange}></Input>
                            <span className='error'>{this.state.errors.address}</span>
                        </Col>

                        <Col md={6}>
                            <Label >Coming for Purpose</Label>
                            <Input type="select" defaultValue='no-value' name='purpose' onChange={this.onChange}>
                                <DefaultSelect />
                                <option>Private Event</option>
                                <option>Public Event</option>
                            </Input>
                            <span className='error'>{this.state.errors.purpose}</span>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Row>
                        <Col md={6}>
                            <Label>Event Name</Label>
                            <Input type="select" defaultValue='no-value' name="eventName" onChange={this.onChange} onKeyPress={OnKeyPressUserhandler} placeholder="eventName">
                                <DefaultSelect />
                                <option>Birthday</option>
                                <option>Independence Day</option>
                            </Input>
                            <span className='error'>{this.state.errors.eventName}</span>
                        </Col>

                        <Col md={6}>
                            <Label>No. of Person</Label>
                            <Input type="text" name="noOfPerson" onChange={this.onChange} onKeyPress={numberValidation} placeholder="no. of person" maxLength={4}></Input>
                            <span className='error'>{this.state.errors.noOfPerson}</span>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Button color="success" type="submit" >Submit</Button>
                </FormGroup>
            </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Guest Invitation</h3>
                        {data}
                    </Form>
                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {

    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(GuestInvitation));