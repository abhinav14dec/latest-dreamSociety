import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Row, Col,Button,  Modal, FormGroup, ModalBody, ModalHeader, Label, Input} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import {serviceDetails} from '../../actions/registerComplainAction';
import {getVendorData,getVendorBooking} from '../../actions/individualVendorAction';
import Spinner from '../../components/spinner/spinner';

import DefaultSelect from '../../constants/defaultSelect';
import SearchFilter from '../../components/searchFilter/searchFilter';

class IndividualVendorBookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
           filterName:"serviceName",
           
           editEventModal:false,
           modalLoading:false,
           loading:false,
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
            return x.individual_vendor.service_master? x.individual_vendor.service_master.serviceName.toLowerCase().includes(search.toLowerCase()):'' || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }


    refreshData() {
        this.props.getVendorBooking().then(()=> this.setState({loading:false, modalLoading: false, editEventModal:false})).catch((err)=>{

            this.setState({loading:false, modalLoading: false, editEventModal:false})
        });
        this.props.serviceDetails();
        // this.props.GetEventOrganiser();
        // this.props.getEventDetails();
    }   

   

    editEvent(
        individualVendorId,serviceName,firstName,lastName,rateType,rate,startTimeSlotSelected,endTimeSlotSelected,enableSmsNotification,payOnline,enableFingerPrint,serviceId
    ){
      
        this.setState({
            individualVendorId,serviceName,firstName,lastName,rateType,rate,startTimeSlotSelected,endTimeSlotSelected,enableSmsNotification,payOnline,enableFingerPrint,serviceId
            ,editEventModal: !this.state.editEventModal})
    }

    toggleEditEventModal() {
        this.setState({
            editEventModal: !this.state.editEventModal
        });
    }

    deleteEvents(individualVendorId){
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.deleteEvents(individualVendorId,isActive)
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
        let path=this.props.location.pathname;
        switch(path){
            case '/ownerDashboard/individualVendorBooking':
            this.props.history.push('/ownerDashboard/changePasswordOwner');
            break;

            case '/tenantDashboard/individualVendorBooking':
            this.props.history.push('/tenantDashboard/changePasswordTenant');
            // eslint-disable-next-line
            default:
        }
        
    }

    fetchSpace=({space})=>{
        if(space && space.societyMember){
            return space ? space.societyMember.map(item=>{
                return(
                    <option key={item.eventSpaceId} value={item.eventSpaceId}>
                       {item.spaceName}
                    </option>
                )
            }): ''
        }
    }
    
    renderList({vendorBooking  }) {
        if(vendorBooking){
            console.log(vendorBooking,"====getVendorBooking")
        }
        if (vendorBooking && vendorBooking.booking ) {
            return  vendorBooking.booking.sort((item1,item2)=>{
                var cmprVal =  (item1.individual_vendor.service_master[this.state.filterName].localeCompare(item2.individual_vendor.service_master[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index)=>{
                return(
                    <tr key={item.individualVendorId}>
                       <td><input type="checkbox" name="ids" className="SelectAll" value={item.individualVendorId}
                         onChange={(e) => {
                            const {individualVendorId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(individualVendorId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, individualVendorId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                       <td>{index+1}</td>
                       <td>{item.individual_vendor.service_master?item.individual_vendor.service_master.serviceName:''}</td>
                       <td>{item.individual_vendor ? item.individual_vendor.firstName + " " + item.individual_vendor.lastName:''}</td>
                       <td>{item.individual_vendor.rate_master.rateType}</td>
                       <td>{item.individual_vendor.rate}</td>
                       <td>{item ?`${item.startTimeSlotSelected} to ${item.endTimeSlotSelected}` :''}</td>
                       <td>{item.enableSmsNotification===true ? 'Yes' :'No'}</td>
                       <td>{item.payOnline===true ? 'Yes' :'No'}</td>
                       <td>{item.enableFingerPrint===true ? 'Yes' :'No'}</td>
    
                       <td>
                             <Button color="success" className="mr-2" onClick={this.editEvent.bind(this,item.individualVendorId,item.individual_vendor.service_master.serviceName,item.individual_vendor.firstName,item.individual_vendor.lastName,
                                item.individual_vendor.rate_master.rateType,item.individual_vendor.rate,item.startTimeSlotSelected,item.endTimeSlotSelected,item.enableSmsNotification,item.payOnline,item.enableFingerPrint,item.individual_vendor.serviceId)}>Edit</Button>                 
                             <Button color="danger"  onClick={this.deleteEvents.bind(this, item.individualVendorId)}>Delete</Button>
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
 
 

updateEvents(){
    const {individualVendorId,serviceName,firstName,lastName,rateType,rate,startTimeSlotSelected,endTimeSlotSelected,enableSmsNotification,payOnline,enableFingerPrint,serviceId}= this.state; 
    let errors = {};
        if(this.state.serviceId===''){
            errors.serviceId="Service Name can't be empty"
            }
            // else if(this.state.childAbove===''){
            //     errors.childAbove="Child Above can't be empty"
            // }   
            // else if(this.state.charges===''){
            //     errors.charges="Charges can't be empty"
            // }  
            // else if(this.state.startDate > this.state.endDate){
            //     errors.startDate = "Start Date should be less than end date ";
            // }
            
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0
            if (isValid  &&  this.state.message === '') {
             
                this.props.updateSocietyEvents(individualVendorId,serviceName,firstName,lastName,rateType,rate,startTimeSlotSelected,endTimeSlotSelected,enableSmsNotification,payOnline,enableFingerPrint,serviceId)
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
    let path=this.props.location.pathname;
    switch(path){
        case '/ownerDashboard/individualVendorBookingDetails':
            this.props.history.push('/ownerDashboard/individualVendorBooking')
            break;

            case '/tenantDashboard/individualVendorBookingDetails':
            this.props.history.push('/tenantDashboard/individualVendorBooking')
            // eslint-disable-next-line
            default:
    }

}

h=(event)=>{
    this.setState({ [event.target.name]: event.target.checked},function(){console.log(this.state.dJ,this.state.breakfast)})

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
render() { 
    
           let tableData= <Table className="table table-bordered">
        <thead>
            <tr>
                <th style={{width:'4%'}}></th>  
                <th  style={{width:'4%'}}>#</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:"serviceName"}});
                        }}>Service Type  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Vendor Name</th>
                <th>Rate Type</th>
                <th>Rates</th>
                <th>Available Slot Time</th>              
                <th>Get Notification(Arrive or Leave) </th> 
                <th>Pay Online</th>
                <th>Enable fingerprint</th>
                <th style={{width:'14%'}}>Actions</th>                          
            </tr>
            
        
        </thead>

        <tbody>
            {this.renderList(this.props.IndividualVendorReducer)}
        </tbody>
        </Table>
                        
            let modalData =<div>
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
                                       <Input type="radio" name="startTimeSlotSelected"  onChange={this.timeChange.bind(this,this.state.endTime2)}/> {this.state.startTime2} to {this.state.endTime2}   
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
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Individual Vendor Booking Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Add Vendor Booking</Button></div>
                    
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
    return {
        registerComplaintReducer : state.registerComplaintReducer,
        IndividualVendorReducer: state.IndividualVendorReducer
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({serviceDetails,getVendorBooking,getVendorData}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(IndividualVendorBookingDetails);


