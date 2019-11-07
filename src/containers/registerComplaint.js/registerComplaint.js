import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {userflatDetails,postRegister,serviceDetails} from '../../actions/registerComplainAction';
import UI from '../../components/newUI/tenantDashboard';
import {Form, Button,  FormGroup,  Input, Label,Row, Col,Modal,ModalBody,ModalHeader } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';


class RegisterComplaintTenant extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            flatDetailId:'',
            serviceId:'',
            priority:'',
            date:'',
            slotTime1:'',
            slotTime2:'',
            slotTime3:'',
            description:'',
            errors: {},
            message:'',
            modal:false,
            loading: true,
            
           

            menuVisible: false,
         }
    }

    
    componentDidMount=()=>{
        this.refreshData()     
    }

    refreshData=()=>{
         
        this.props.userflatDetails().then(() => this.setState({loading: false}));
        this.props.serviceDetails().then(() => this.setState({loading: false}));
       
   }

   toggles = () => {
    this.setState({ modal: !this.state.modal })
    }

    toggle = () => { 
        this.setState({
            modal: !this.state.modal
        })
    }
    

    service({item}){
        if(item){
            console.log(item,"details============")
           return( 
            item.map((item) =>{ 
                   return(
                       <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName}
                       </option>
                   )
               })
           )
            
        }
    }

    userflatDetails({userFlat}){
        if(userFlat &&  userFlat.flats){
            return( 
                userFlat.flats.map((item) =>{ 
                    return(
                        <option key={item.flatDetailId} value={item.flatDetailId}>
                         {"Flatno-"+item.flatNo+", "+item.tower_master.towerName+", "+item.floor_master.floorName+" floor"}
                        </option>
                    )
                })
            )
             
         }
    }

    minDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }



    handleSubmit=(e)=>{
        e.preventDefault();

        let errors = {};
        
        if(!this.state.flatDetailId) {
            errors.flatDetailId = "cant be empty";
        }

       

        else if(this.state.serviceId ==='') {
            errors.serviceId = "cant be empty";
        }

        else if(this.state.priority ==='') {
            errors.priority = "cant be empty";
        }

        else if(this.state.date ==='') {
            errors.date = "cant be empty";
        }


        else if(this.state.slotTime1 ==='') {
            errors.slotTime1 = "cant be empty";
        }

        else if(this.state.description === '') {
            errors.description = "cant be empty";
        }
   
        this.setState({ errors });
        console.log("submited===========================", this.state);

        const isValid = Object.keys(errors).length === 0;

        if(isValid){
                    this.setState({loading:true})
                    this.props.postRegister(this.state)
                    .then((msg)=>{ msg;
                        console.log(msg)
                        this.setState({message : msg.payload.message, loading: false 
                        })
                        this.toggle()
                    })
                    .catch(err=>{err;
                        console.log(err);
                        this.setState({message : err.response.data.message, loading: false})
                    })
                
                 
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

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({message:'' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    
    



    render(){
        let formData=<div>
             
             <FormGroup>
                 
             <Row md={12}>
                <Col md={6}>
                <Label>Flat no</Label>
                <Input type="select" defaultValue='no-value' name="flatDetailId"  onChange={this.onChange} >
                    <DefaultSelect />
                    {this.userflatDetails(this.props.registerComplaintReducer)}
                </Input >
                <span className='error'>{this.state.errors.flatDetailId}</span>
                </Col>
                <Col md={6}>
                <Label>Service Type</Label>
                <Input type="select" defaultValue='no-value' name="serviceId"  onChange={this.onChange}>
                    <DefaultSelect />
                    {this.service(this.props.registerComplaintReducer)}
                </Input >
                <span className='error'>{this.state.errors.serviceId}</span>
                </Col>
                </Row>
            </FormGroup>


                 
            <FormGroup>
            <Row md={12}>
                <Col md={6}>
                <Label>Priority</Label>
                <Input type="select" defaultValue='no-value' name="priority"  onChange={this.onChange}>
                    <DefaultSelect />
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </Input >
                <span className='error'>{this.state.errors.priority}</span>
                </Col>
                
                <Col md={6}>
                <Label>Date</Label>
                <Input type="date" min={this.minDate()} name="date"  onChange={this.onChange}>
                    <DefaultSelect />
                    {/* {this.service(this.props.displayServiceMasterReducer)} */}
                </Input >
                <span className='error'>{this.state.errors.date}</span>
                </Col>
                </Row>
            </FormGroup>

            
            <FormGroup>
            <Row md={12}>
                <Col md={4}>
                    <Label>Slot Time 1</Label>
                    <Input type="time"  name="slotTime1" onChange={this.onChange} >
                    </Input>
                    <span className='error'>{this.state.errors.slotTime1}</span>
                </Col>
                
                <Col md={4}>
                    <Label>Slot Time 2</Label>
                    <Input type="time"  name="slotTime2" onChange={this.onChange} >
                    </Input>
                </Col>
               
                <Col md={4}>
                    <Label>Slot Time 3</Label>
                    <Input type="time"  name="slotTime3" onChange={this.onChange} >
                    </Input>
                </Col>
            </Row>
            </FormGroup>
               




            <FormGroup>
                <Label>Description</Label>
                <Input type="textarea"  name="description" maxLength={500} onChange={this.onChange}>
                </Input >
                <span className='error'>{this.state.errors.description}</span>
            </FormGroup>

            <FormGroup>
                <Button type="submit" color="success" className="mr-2">Register</Button>
            </FormGroup>
        </div>
        return(
            <div>
               <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Register Complaint</h3>
                        {!this.state.loading ? formData : <Spinner />}

                    </Form>
                    <Modal isOpen={this.state.modal} toggle={this.toggles} >
                    <ModalHeader toggle={this.toggle}>Message</ModalHeader>
                    <ModalBody>
                        <h1 style={{display:"block",background: 'black'}}>{this.state.message}</h1> 
                    </ModalBody>
                    </Modal>
                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {
          console.log(state)
    return {
  
        registerComplaintReducer : state.registerComplaintReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ userflatDetails,postRegister,serviceDetails }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(RegisterComplaintTenant));
