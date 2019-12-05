import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form, Row, Col,Button, FormGroup, Label, Input} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import {serviceDetails} from '../../actions/registerComplainAction';
import {getVendorData,addVendorBooking} from '../../actions/individualVendorAction';
import Spinner from '../../components/spinner/spinner';
import _ from 'underscore';




class IndividualVendorBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
           serviceId:'',
           individualVendorId:'',
           rateType:'',
           rate:'',
           startTime:'',
           startTime1:'',
           startTime2:'',
           endTime:'',
           endTime1:'',
           endTime2:'',
           startTimeSlotSelected:'',
           endTimeSlotSelected:'',
           enableFingerprint:false,
           enableSmsNotification :false,
           payOnline:false,
           loading:false,
           errors:{},
           message:'',
        }
    }

    componentDidMount(){
        this.props.serviceDetails().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));;
        // this.props.getVendorBooking().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        // this.props.getEventDetails().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    serviceChange=(event)=>{
        this.setState({loading: false})
        this.handleChange(event);
        let selected= event.target.value
        this.props.getVendorData(selected);
       
    
            // this.setState({
            //     stateId: data1.stateId,
            //     stateName:data1.stateName
            // })
    }

    vendorChange=(event)=>{
        this.setState({message:''})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }

        let selected=event.target.value;

        var result = _.find(this.props.IndividualVendorReducer.getVendorBooking.vendors,function(obj){ 
            // eslint-disable-next-line
        return obj.individualVendorId == selected
        })


        this.setState({
            rate:result.rate,
            rateType:result.rate_master.rateType,
            startTime:result.startTime ? result.startTime : '',
            startTime1:result.startTim1 ? result.startTim1 : '',
            startTime2:result.startTim2 ? result.startTim2 : '',
            endTime:result.endTime ? result.endTime :'',
            endTime1:result.endTime1 ? result.endTime1 :'',
            endTime2:result.endTime2 ? result.endTime2 :'',

        })
    
    }
    
    timeChange=(endTime,event)=> {
        console.log(endTime,event,"endTime,event")
        this.setState({message:'',endTimeSlotSelected:endTime})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
    }
    
    handleChange=(event)=> {

        this.setState({message:''})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
    }

    h=(event)=>{
        this.setState({ [event.target.name]: event.target.checked},function(){
        })
      
    }

    

    getService({item}){
        if(item){
            return item.map((data) => {
                return (
                    <option key={data.serviceId} value={data.serviceId}>
                        {data.serviceName}
                    </option>
                )
            })
        }
         else return '';
    }
    
    getVendorDetails=({getVendorBooking})=>{
        if(getVendorBooking && getVendorBooking.vendors){
            return getVendorBooking.vendors.map(item=>{
                return(
                    <option key={item.individualVendorId} value={item.individualVendorId}>
                         {`${item.firstName} ${item.lastName}`}
                    </option>
                )
            })
        }

    }
    
    
    toggleChange = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
      }

    onSubmit=(event)=>{
        event.preventDefault();
        const {startTimeSlotSelected,endTimeSlotSelected,individualVendorId,enableSmsNotification,payOnline,enableFingerprint}= this.state;
        let errors = {};
        if(this.state.serviceId===''){
            errors.serviceId="Service Name can't be empty"
        }     
        else if(this.state.individualVendorId===''){
            errors.individualVendorId="Individual Vendor Name can't be empty"
        }  
        
        const vendorData={
            startTimeSlotSelected,endTimeSlotSelected,individualVendorId,enableSmsNotification,payOnline,enableFingerprint
        }

        console.log(vendorData,"===")
                  
       
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
    //     if (isValid) {
    //         this.setState({loading: true});
    //         this.props.addVendorBooking(vendorData)
    //         .then(()=>this.push())
    //         .catch((err)=>{
    //             this.setState({message: err.response.data.message,loading:false})})

    //         this.setState({
    //             startTimeSlotSelected:'',
    //             endTimeSlotSelected:'',
    //             individualVendorId:'',
    //             enableSmsNotification:false,
    //             payOnline:false,
    //             enableFingerPrint:false
    //         });
    // }
}
    push=()=>{
        let path=this.props.location.pathname;
        switch(path){
            case '/ownerDashboard/individualVendorBooking':
                this.props.history.push('/ownerDashboard/individualVendorBookingDetails')
                break;

                case '/tenantDashboard/individualVendorBooking':
                this.props.history.push('/tenantDashboard/individualVendorBookingDetails')
                // eslint-disable-next-line
                default:
        }

    }    

  

    logout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user-type');
            return this.props.history.replace('/')
        }
    
    changePassword=()=>{ 
        let path=this.props.location.pathname;
        switch(path){
            case '/ownerDashboard/individualVendorBooking':
            this.props.history.push('/ownerDashboard/changePasswordOwner')
            break;

            case '/tenantDashboard/individualVendorBooking':
            this.props.history.push('/tenantDashboard/changePasswordTenant')
            // eslint-disable-next-line
            default:
        }
        
    }
    
    
    render(){
        let  formData =<div>
                <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Service Type</Label>
                                <Input type="select" name="serviceId" defaultValue='no-value' onChange={this.serviceChange}>
                                <DefaultSelect/>
                                {this.getService(this.props.registerComplaintReducer)}                  
                                </Input>
                                <span className="error">{this.state.errors.serviceId}</span>
                            </FormGroup>
                            </Col>

                            <Col md={6}>
                            <FormGroup>
                            <Label>List of vendor</Label>
                            <Input type="select" name="individualVendorId" defaultValue='no-value' onChange={this.vendorChange}>
                            <DefaultSelect/>
                            {this.getVendorDetails(this.props.IndividualVendorReducer)}                  
                            </Input>
                            <span className="error">{this.state.errors.individualVendorId}</span>
                            </FormGroup>
                            </Col>
                        </Row>
                       
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Rate Type</Label>
                                <Input type="text" name="rateType"  value={this.state.rateType} readOnly/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Rates</Label>
                                <Input type="text" name="rate" value={this.state.rate} readOnly/>
                            </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup> 
                                <Row md={12}>
                                    <Col md={2}>
                                       <Label><b>Slot Time : </b></Label>  
                                    </Col>
                                    {this.state.startTime ?
                                    <Col md={2}>
                                       <Input type="radio" name="startTimeSlotSelected"  onChange={this.timeChange.bind(this,this.state.endTime)}/> {this.state.startTime} to {this.state.endTime}  
                                    </Col> : ''
                                    }
                                    {this.state.startTime1 ?
                                    <Col md={2}>
                                       <Input type="radio" name="startTimeSlotSelected"   onChange={this.timeChange.bind(this,this.state.endTime1)}/> {this.state.startTime1} to {this.state.endTime1}   
                                    </Col> :''
                                    }
                                    {this.state.startTime2 ?<Col md={2}>
                                       <Input type="radio" name="startTimeSlotSelected"   onChange={this.timeChange.bind(this,this.state.endTime2)}/> {this.state.startTime2} to {this.state.endTime2}   
                                    </Col> :''
                                    }
                                </Row>
                        </FormGroup>
     
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="enableFingerprint" onChange={this.h} /> Do you want enable fingerprint
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="enableSmsNotification " onChange={this.h} /> Do you want get SMS notification when she/he arrives or leaves
                                </Label>
                            </FormGroup>
                            <FormGroup check>                                                                                                                                                                                                                            
                                <Label check>   
                                <Input type="checkbox" name="payOnline"  onChange={this.h}/> Do you want to pay online
                                </Label>
                            </FormGroup>
                            
                    
                            <Button color="success" className="mr-2">Submit</Button>             
                            <Button color="danger" onClick={this.push} >Cancel</Button>
        </div>
        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <Form onSubmit={this.onSubmit} >

                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Individual Vendor Booking </h3></div><br/>
                        {!this.state.loading ? formData : <Spinner />}
                    </Form>
                </UI>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        registerComplaintReducer : state.registerComplaintReducer,
        IndividualVendorReducer: state.IndividualVendorReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({serviceDetails,getVendorData,addVendorBooking}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(IndividualVendorBooking);