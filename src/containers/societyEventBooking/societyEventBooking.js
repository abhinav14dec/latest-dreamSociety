import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form, Row, Col,Button, FormGroup, Label, Input} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import {ViewEvent,GetEventOrganiser} from '../../actions/eventMasterAction';
import {addSocietyEvents} from '../../actions/societyEventBooking';
import Spinner from '../../components/spinner/spinner';


class SocietyEventBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
           eventId:'', 
           organisedBy:'',
           startDate:'',
           endDate:'',
           startTime:'',
           endTime:'',         
           breakfast:false,
           lunch:false,
           eveningSnacks:false,
           dinner:false,
           dJ:false,
           drinks:false,
           invitationCardPicture:'',
           perPersonCharge:'',
           childAbove:'',
           charges:'',
           description:'',
           loading:true,
           errors:{},
           message:'',
        }
    }

    componentDidMount(){
        this.props.ViewEvent().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));;
        this.props.GetEventOrganiser().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));;
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
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
            console.log(this.state.breakfast)
        })
      
    }

    FileChange=(event)=>{

        const files = event.target.files;
        const file = files[0];
        const fileName=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                invitationCardPicture :
                  reader.result,
                  fileName
              })          
          }
        }     
  }

    getEventName({getEvent}){
        if(getEvent &&  getEvent.event){
            return getEvent.event.map((item) => {
                return (
                    <option key={item.eventId} value={item.eventId}>
                        {item.eventName}
                    </option>
                )
            })
        }
    }

    getEventOrganiser({events}){
        if(events && events.event){
            return events.event.map((item) => {
                return (
                    <option key={item.userId} value={item.userId}>
                        {item.firstName}</option>
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
        const Events= this.state;
        let errors = {};
        if(this.state.eventId===''){
            errors.eventId="Event Name can't be empty"
        }     
        else if(this.state.organisedBy===''){
            errors.organisedBy="Organiser Name can't be empty"
        }           
        else if(this.state.startDate===''){
            errors.startDate="Start Date can't be empty"
        }          
        else if(this.state.endDate===''){
            errors.endDate="End Date can't be empty"
        }       
        else if(this.state.startDate > this.state.endDate){
            errors.startDate = "Start Date should be less than end date ";
        }
        else if(this.state.startTime===''){
            errors.startTime="Start Time can't be empty"
        }
        else if(this.state.endTime===''){
            errors.endTime="End Time can't be empty"
        }   
        else if(this.state.perPersonCharge===''){
            errors.perPersonCharge="Person Charges can't be empty"
        }
        else if(this.state.childAbove===''){
            errors.childAbove="Child Above can't be empty"
        }   
        else if(this.state.charges===''){
            errors.charges="Charges can't be empty"
        }  
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true});
            this.props.addSocietyEvents(Events)
            .then(()=>this.props.history.push('/superDashboard/DisplaySocietyEventBooking'))
            .catch((err)=>{
                this.setState({message: err.response.data.message,loading:false})})

            this.setState({
                eventId:'', 
                organisedBy:'',
                startDate:'',
                endDate:'',
                startTime:'',
                endTime:'',         
                breakfast:false,
                lunch:false,
                eveningSnacks:false,
                dinner:false,
                dJ:false,
                drinks:false,
                invitationCardPicture:'',
                perPersonCharge:'',
                childAbove:'',
                charges:'',
                description:''
            });
    }
}
    push=()=>{
        this.props.history.push('/superDashBoard/displaySocietyeventbooking')
    }    

  
    perHandleChange=(e)=>{
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});
            
        }}

    logout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user-type');
            return this.props.history.replace('/')
        }
    
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    
    minDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    
    render(){
        let  formData =<div>
                <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event Name</Label>
                                <Input type="select" name="eventId" defaultValue='no-value' onChange={this.handleChange}>
                                <DefaultSelect/>
                                {this.getEventName(this.props.EventDetails)}                  
                                </Input>
                                <span className="error">{this.state.errors.eventId}</span>
                            </FormGroup>
                            </Col>

                            <Col md={6}>
                            <FormGroup>
                            <Label>Event Organised By</Label>
                            <Input type="select" name="organisedBy" defaultValue='no-value' onChange={this.handleChange}>
                            <DefaultSelect/>
                            {this.getEventOrganiser(this.props.EventDetails)}                  
                            </Input>
                            <span className="error">{this.state.errors.organisedBy}</span>
                            </FormGroup>
                            </Col>
                        </Row>
                       
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event Start Date</Label>
                                <Input type="date" name="startDate" min={this.minDate()} value={this.state.startDate} onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.startDate}</span>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event End Date</Label>
                                <Input type="date" name="endDate" min={this.minDate()} value={this.state.endDate} onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.endDate}</span>
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event Start Time</Label>
                                <Input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.startTime}</span>
                                <span className="error">{this.state.message}</span>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event End Time</Label>
                                <Input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.endTime}</span>
                        </FormGroup>
                            </Col>
                        </Row>
                        
                            <FormGroup>
                                <Label>
                            Select your options  
                                </Label>
                            </FormGroup>
                            
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="breakfast" onChange={this.h} />Breakfast
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="lunch" onChange={this.h} />Lunch
                                </Label>
                            </FormGroup>
                            <FormGroup check>                                                                                                                                                                                                                            
                                <Label check>   
                                <Input type="checkbox" name="eveningSnacks"  onChange={this.h}/>Evening Snacks
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="dinner" onChange={this.h}/>Dinner
                                </Label>
                            </FormGroup>                      
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="dJ" onChange={this.h}/>DJ
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="drinks" onChange={this.h}/>Drinks
                                </Label>
                            </FormGroup>

                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Upload Your Invitation Card</Label>                               
                                <Input accept='image/*' style={{display:'inline-block'}}type="file" name ="invitationCardPicture" onChange={this.FileChange} />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Per Person Charge</Label>                               
                                <Input type="text" name ="perPersonCharge"  placeholder="Enter Price" value={this.state.perPersonCharge} maxLength={4} onChange={this.perHandleChange}/>
                                <div>{!this.state.perPersonCharge ? <span className="error">{this.state.errors.perPersonCharge}</span>: null}</div>
                            </FormGroup>
                            </Col> 
                        </Row>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>                               
                                <Label>Child Above </Label>                               
                                <Input type="text" name ="childAbove"  placeholder="Example 12 years"maxLength={8}   onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.childAbove}</span>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Charges </Label>                               
                                <Input type="text" name ="charges" placeholder="Enter Price" maxLength={4}  value={this.state.charges} onChange={this.perHandleChange}/>
                                <div>{!this.state.charges ? <span className="error">{this.state.errors.charges}</span>: null}</div>
                            </FormGroup>
                            </Col>
                        </Row>
                            <FormGroup>
                                <Label>Description</Label>                               
                                <Input type="text" name ="description" placeholder="Description"  maxLength={3000} onChange={this.handleChange}/>
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
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Book Society Events </h3></div><br/>
                        {!this.state.loading ? formData : <Spinner />}
                          

                    </Form>
                </UI>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        EventDetails: state.EventDetails,
        societyEventBookingReducer: state.societyEventBookingReducer
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ViewEvent,GetEventOrganiser,addSocietyEvents}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SocietyEventBooking);