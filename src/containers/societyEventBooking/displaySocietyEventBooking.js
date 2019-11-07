import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form,Table, Row, Col,Button,  Modal, FormGroup, ModalBody, ModalHeader, Label, Input} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import {getSocietyEvents,updateSocietyEvents,deleteEvents,deleteSelectedEvent} from '../../actions/societyEventBooking';
import Spinner from '../../components/spinner/spinner';
import {ViewEvent,GetEventOrganiser} from '../../actions/eventMasterAction';
import DefaultSelect from '../../constants/defaultSelect';
import SearchFilter from '../../components/searchFilter/searchFilter';

class DisplaySocietyEventBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
           filterName:"eventName",
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
           editEventModal:false,
           modalLoading:false,
           loading:true,
           isDisabled:true,
           ids:[],
           errors:{},
           message:'',
           search: ''
        }
    }

    componentDidMount(){
        this.refreshData();
    }

    searchFilter(search) {
        return function (x) {
            return x.event_master? x.event_master.eventName.toLowerCase().includes(search.toLowerCase()):'' || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }


    refreshData() {
        this.props.getSocietyEvents().then(()=> this.setState({loading:false, modalLoading: false, editEventModal:false})).catch((err)=>{
            err;
            this.setState({loading:false, modalLoading: false, editEventModal:false})
        });
        this.props.ViewEvent();
        this.props.GetEventOrganiser();
    }   

    perHandleChange=(e)=>{
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});
            
        }}

    editEvent(societyEventBookId,eventId,eventName,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description,breakfast,lunch,eveningSnacks,dinner,dJ,drinks){
      
        this.setState({
            societyEventBookId,eventId,eventName,firstName,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description,breakfast,lunch,eveningSnacks,dinner,dJ,drinks
            ,editEventModal: !this.state.editEventModal})
    }

    toggleEditEventModal() {
        this.setState({
            editEventModal: !this.state.editEventModal
        });
    }

    deleteEvents(societyEventBookId){
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.deleteEvents(societyEventBookId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    }
    
    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedEvent(ids)
        .then(() => this.refreshData())
      
    }
   
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }


    renderList({ societyEvents }) {
        if (societyEvents && societyEvents.eventBookings ) {
            return  societyEvents.eventBookings.sort((item1,item2)=>{
                var cmprVal =  (item1.event_master[this.state.filterName].localeCompare(item2.event_master[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index)=>{
                return(
                    <tr key={item.societyEventBookId}>
                       <td><input type="checkbox" name="ids" className="SelectAll" value={item.societyEventBookId}
                         onChange={(e) => {
                            const {societyEventBookId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(societyEventBookId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, societyEventBookId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                       <td>{index+1}</td>
                       <td>{item.event_master?item.event_master.eventName:''}</td>
                       <td>{item.user_master?item.user_master.firstName + " " + item.user_master.lastName:''}</td>
                       <td>{item.startDate}</td>
                       <td>{item.endDate}</td>
                       <td>{item.startTime}</td>
                       <td>{item.endTime}</td>                       
                       <td>{item.perPersonCharge}</td>
                       <td>{item.childAbove}</td>
                       <td>{item.charges}</td>
                       <td>
                             <Button color="success" className="mr-2" onClick={this.editEvent.bind(this,item.societyEventBookId,item.event_master.eventId,item.event_master?item.event_master.eventName:'',item.user_master?item.user_master.firstName:'',item.startDate,item.endDate,item.startTime,item.endTime,item.perPersonCharge,item.childAbove,item.charges,item.description,item.breakfast,item.lunch,item.eveningSnacks,item.dinner,item.dj,item.drinks)}>Edit</Button>                 
                             <Button color="danger"  onClick={this.deleteEvents.bind(this, item.societyEventBookId)}>Delete</Button>
                        </td>
                   
                    </tr>
                )
            })
        
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
    if(events  && events.event){
        return events.event.map((item) => {
            return (
                <option key={item.userId} value={item.userId}>
                    {item.firstName}</option>
            )
        })
    }
}

minDate = () => {
    var d = new Date();
    return d.toISOString().split('T')[0];
}

updateEvents(){
    const {societyEventBookId,eventId,eventName,organisedBy,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description,breakfast,lunch,eveningSnacks,dinner,dJ,drinks}= this.state; 
    let errors = {};
        if(this.state.perPersonCharge===''){
            errors.perPersonCharge="Person Charges can't be empty"
            }
            else if(this.state.childAbove===''){
                errors.childAbove="Child Above can't be empty"
            }   
            else if(this.state.charges===''){
                errors.charges="Charges can't be empty"
            }  
            else if(this.state.startDate > this.state.endDate){
                errors.startDate = "Start Date should be less than end date ";
            }
            
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0
            if (isValid  &&  this.state.message === '') {
             
                this.props.updateSocietyEvents(societyEventBookId,eventId,eventName,organisedBy,startDate,endDate,startTime,endTime,perPersonCharge,childAbove,charges,description,breakfast,lunch,eveningSnacks,dinner,dJ,drinks)
                .then(()=>this.refreshData())
                .catch(err=>{
                    this.setState({modalLoading:false,message: err.response.data.message, loading: false})
                })
                if(this.state.message === ''){
                    this.setState({editEventModal: true})
                }
                else {
                    this.setState({editEventModal: false})
                }       
            this.setState({ modalLoading: true})
}
console.log("breakfast",breakfast,"lunch",lunch,"eveningSnacks",eveningSnacks,"dinner",dinner,"dJ",dJ,"drinks",drinks)

}


selectAll = () => {
    let selectMultiple = document.getElementsByClassName('SelectAll');
    let ar =[];
        for(var i = 0; i < selectMultiple.length; i++){
                ar.push(parseInt(selectMultiple[i].value));
                selectMultiple[i].checked = true;
        }
        this.setState({ids: ar});
        if(ar.length > 0){
            this.setState({isDisabled: false});
        }
}

unSelectAll = () =>{
    
    let unSelectMultiple = document.getElementsByClassName('SelectAll');
    let allIds = [];
    for(var i = 0; i < unSelectMultiple.length; i++){
            unSelectMultiple[i].checked = false
    }
    
    this.setState({ids: [ ...allIds]});
    if(allIds.length === 0){
        this.setState({isDisabled: true});
    }
    
}

push=()=>{
    this.props.history.push('/superDashBoard/societyeventbooking')
}

h=(event)=>{
    this.setState({ [event.target.name]: event.target.checked},function(){console.log(this.state.dJ,this.state.breakfast)})

}

render() { 
    
           let tableData= <Table className="table table-bordered">
        <thead>
            <tr>
                <th style={{width:'4%'}}></th>  
                <th  style={{width:'4%'}}>#</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:"eventName"}});
                        }}>Event Name  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Oragnised By</th>
                <th>Event Start Date</th>
                <th>Event End Date</th>
                <th>Event Start Time</th>
                <th>Event End Time</th>             
                <th>Per Person Charges</th>
                <th>Child Above</th>
                <th>Charges</th>   
                <th style={{width:'14%'}}>Actions</th>                          
            </tr>
            
        
        </thead>

        <tbody>
            {this.renderList(this.props.societyEventBookingReducer)}
        </tbody>
        </Table>
                        
            let modalData =<div>
                            <FormGroup>
                                <Label >Event Name</Label>
                                <Input type="select" name="eventId" value={this.state.eventId}  onChange={this.handleChange}>
                                <DefaultSelect/>
                                {this.getEventName(this.props.EventDetails)}                  
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label >Oragnised By</Label>
                                <Input type="select" name="organisedBy" value={this.state.organisedBy}  onChange={this.handleChange}>
                                <DefaultSelect/>
                                {this.getEventOrganiser(this.props.EventDetails)}    
                                </Input>                           
                            </FormGroup>   

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
                            </FormGroup>
                            </Col>
                            </Row>             
                        
                            <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event Start Time</Label>
                                <Input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange}/>
                                <span className="error">{this.state.message}</span>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Event End Time</Label>
                                <Input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange}/>
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
                                <Input type="checkbox" name="breakfast" onChange={this.h} 
                                checked={this.state.breakfast=== true ? true : false} />Breakfast
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="lunch" onChange={this.h} 
                                  checked={this.state.lunch=== true ? true : false} />Lunch
                                </Label>
                            </FormGroup>
                            <FormGroup check>                                                                                                                                                                                                                            
                                <Label check>   
                                <Input type="checkbox" name="eveningSnacks"  onChange={this.h}
                                  checked={this.state.eveningSnacks=== true ? true : false} />Evening Snacks
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="dinner" onChange={this.h} 
                                checked={this.state.dinner=== true ? true : false} />Dinner
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="dJ" onChange={this.h}
                                  checked={this.state.dJ=== true ? true : false} />DJ
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>   
                                <Input type="checkbox" name="drinks" onChange={this.h}
                                   checked={this.state.drinks=== true ? true : false}/>Drinks
                                </Label>
                            </FormGroup><br/>

                            <FormGroup>
                                <Label>Per Person Charge</Label>                               
                                <Input type="text" name ="perPersonCharge"  value={this.state.perPersonCharge} maxLength={4}  onChange={this.perHandleChange}/>
                                <div>{!this.state.perPersonCharge ? <span className="error">{this.state.errors.perPersonCharge}</span>: null}</div>
                            </FormGroup>
                               
                            <Row form>
                            <Col md={6}>
                            <FormGroup>                               
                                <Label>Child Above </Label>                               
                                <Input type="text" name ="childAbove"  value={this.state.childAbove} maxLength={8}  onChange={this.handleChange}/>
                                <span className="error">{this.state.errors.childAbove}</span>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Charges </Label>                               
                                <Input type="text" name ="charges" value={this.state.charges} maxLength={4} onChange={this.perHandleChange}/>
                                <div>{!this.state.charges ? <span className="error">{this.state.errors.charges}</span>: null}</div>
                            </FormGroup>
                            </Col>
                            </Row>

                            <FormGroup>
                                <Label>Description</Label>                               
                                <Input type="text" name ="description" value={this.state.description} maxLength={3000} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" className="mr-2"  onClick={this.updateEvents.bind(this)} >Save </Button>
                                <Button color="danger" onClick={this.toggleEditEventModal.bind(this)}>Cancel</Button>
                            </FormGroup>
</div>
         let deleteSelectedButton = <Button color="danger" className="mb-2"
         onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>
  return (

      <div>
          <UI onClick={this.logout} change={this.changePassword}>
            
                
                <div className="w3-container w3-margin-top w3-responsive">
                                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                    <span aria-hidden="true">&times;</span>
                            </div> 
                            
                   
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Society Event Booking Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Book Society Event</Button></div>
                    
             
                    <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />
                    
                    {deleteSelectedButton}
                    <Label style={{padding:'10px'}}><b>Select All</b><input className="ml-2"
                        id="allSelect"
                        type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        } }/>
                    </Label>
                    {!this.state.loading ? tableData : <Spinner />}
                    <Modal isOpen={this.state.editEventModal} toggle={this.toggleEditEventModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditEventModal.bind(this)}>Edit a Event</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                </div>
               
            </UI>
            </div>
        )
    
}

}

function mapStateToProps(state) {
    console.log(state)
    return {
        societyEventBookingReducer: state.societyEventBookingReducer,
        EventDetails: state.EventDetails
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({getSocietyEvents,ViewEvent,GetEventOrganiser,updateSocietyEvents,deleteEvents,deleteSelectedEvent}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplaySocietyEventBooking);


