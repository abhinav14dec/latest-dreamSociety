import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getEventBooking,getMemberEvent,getEventDetails, deleteEventBooking, updateEventBooking, deleteSelectEventBooking } from '../../actions/personalEventsBookingAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/tenantDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';


class TennatMemberEventsBookingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            societyMemberEventBookingId:'',
            societyMemberEventName:'',
            societyMemberEventId: '',
            startDate:'',
            endDate:'',
            numberOfGuestExpected:'',
            eventSpaceId:'',
            spaceName:'',
            isActive: false,
            filterName:'societyMemberEventName',
            modalLoading: false,
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            isDisabled: true,
            ids: [],
            message:''

        };
    }

    onChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onChangeHandler = (event) => {
       
        this.setState({message: ''})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }

        
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    toggle = (societyMemberEventName, startDate,endDate,numberOfGuestExpected,spaceName, societyMemberEventBookingId, eventSpaceId, societyMemberEventId) => {
      
        this.setState({
            societyMemberEventName,
            startDate,
            endDate,
            numberOfGuestExpected,
            spaceName,
            societyMemberEventBookingId, eventSpaceId, societyMemberEventId,   
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal,  message: '' })
    }


    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getEventBooking().then(() => this.setState({ loading: false,  modalLoading: false, modal:false  }))
        this.props.getMemberEvent().then(() => this.setState({loading: false,modalLoading:false}))
        this.props.getEventDetails().then(() => this.setState({loading: false,modalLoading:false}))
       
    }


    editsocietyMemberEventName = (e) => {
        e.preventDefault();
      
        const {societyMemberEventBookingId, societyMemberEventId,startDate,endDate,numberOfGuestExpected, eventSpaceId } = this.state
        console.log(societyMemberEventBookingId, societyMemberEventId,startDate,endDate,numberOfGuestExpected, eventSpaceId);
      
        let errors = {};
       
        if(this.state.startDate===''){
            errors.startDate="Start Date can't be empty"
        }
      

        else if(this.state.endDate===''){
            errors.startDate="End Date can't be empty"
        }
       
        else if(this.state.startDate > this.state.endDate){
            errors.startDate = "Start Date should be less than end date ";
        }

        else if(this.state.numberOfGuestExpected===''){
            errors.numberOfGuestExpected="Number of Guest can't be empty"
        }
        this.setState({errors});
        
       

        const isValid = Object.keys(errors).length === 0
        
        if (isValid && this.state.message === '') {
           
        this.props.updateEventBooking(societyMemberEventBookingId,societyMemberEventId, startDate, endDate,numberOfGuestExpected, eventSpaceId)
            .then(() => this.refreshData())
            .catch(err=>{ 
                this.setState({modalLoading:false,message: err.response.data.message})
                })
                if(this.state.message === ''){
                    this.setState({modal: true})
                }
                else {
                    this.setState({modal: false})
                }
                this.setState({
                    modalLoading: true
                })
    }
    }

      deleteMemberEventName = (societyMemberEventBookingId) => {
        let { isActive } = this.state
        this.setState({ loading: true })
        this.props.deleteEventBooking(societyMemberEventBookingId, isActive)
            .then(() => this.refreshData())
        this.setState({ isActive: false })
      
      }



    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
           
            return x.society_member_event_master.societyMemberEventName.toLowerCase().includes(search.toLowerCase())  ||
                   x.startDate.toLowerCase().includes(search.toLowerCase())  ||
                   x.endDate.toLowerCase().includes(search.toLowerCase())  ||
                   x.numberOfGuestExpected.toLowerCase().includes(search.toLowerCase())  ||
                   x.event_space_master.spaceName.toLowerCase().includes(search.toLowerCase())  ||
                 !search;
        }
    }

    deleteSelected(ids){
        this.setState({loading:true,  isDisabled:true});

        this.props.deleteSelectEventBooking(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
        
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

    fetchEventName=({ eventsResult })=> {
     
        if (eventsResult && eventsResult.event) {
            console.log(eventsResult)
            return (
                eventsResult.event.map((item) => {
                    return (
                        <option value={item.societyMemberEventName} key={item.societyMemberEventId}>
                            {item.societyMemberEventName}
                        </option>
                    )
                })
            )
        }
    }

    fetchSpaceName=({ space })=> {
     
        if ( space && space.societyMember) {
            return (
                space.societyMember.map((item) => {
                    return (
                        <option value={item.eventSpaceId} key={item.eventSpaceId}>
                            {item.spaceName}
                        </option>
                    )
                })
            )
        }
    }



   


    renderBookingEvent = ({ memberEventsResult }) => {
        if (memberEventsResult && memberEventsResult.events){
            console.log(memberEventsResult )
            return memberEventsResult.events.sort((item1,item2)=>{ 
                var cmprVal = (item1.society_member_event_master && item2.society_member_event_master) ? (item1.society_member_event_master[this.state.filterName].localeCompare(item2.society_member_event_master[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).filter(this.searchFilter(this.state.search)).map((item, index) => {

                return (
                    <tr key={item.societyMemberEventBookingId}>
                     <td><input type="checkbox" name="ids" className="SelectAll" value={item.societyMemberEventBookingId}
                         onChange={(e) => {
                            const {societyMemberEventBookingId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(societyMemberEventBookingId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                      
                                this.setState({ids: [...this.state.ids, societyMemberEventBookingId]});
                                
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                      
                        <td>{index+1}</td>
                        <td>{item.society_member_event_master?item.society_member_event_master.societyMemberEventName:''}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.numberOfGuestExpected}</td>
                        <td>{item.event_space_master ? item.event_space_master.spaceName:''}</td>
                        <td>{item.event_space_master ? item.event_space_master.description:''}</td>
                        <td>{item.event_space_master ? item.event_space_master.capacity:''}</td>
                        <td>{item.event_space_master ? item.event_space_master.price:''}</td>
                        <td>{item.event_space_master ? item.event_space_master.spaceType:''}</td>
                        <td> 
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.society_member_event_master?item.society_member_event_master.societyMemberEventName:'',item.startDate,item.endDate,item.numberOfGuestExpected, 
                            item.event_space_master ?item.event_space_master.spaceName:'',item.societyMemberEventBookingId, item.event_space_master.eventSpaceId, item.societyMemberEventId)}>Edit</Button>
                            <Button color="danger" onClick={this.deleteMemberEventName.bind(this, item.societyMemberEventBookingId)}>Delete</Button>

                        </td>
                    </tr>

                )
            })
        }
    }



    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/tenantDashboard/changePasswordTenant')
    }

    routeToAddNewBookingEvent = () => {
        this.props.history.push('/tenantDashboard/tenantEventsBooking')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    close=()=>{
        return this.props.history.replace('/tenantDashBoard')
    }

    minDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }

    render() {
        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                    <th style={{width:'4%'}}></th>
                        <th>#</th>
                        <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'societyMemberEventName'}});
                        }}>Events Type 
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th style={{'width':'4%'}}>number Of Guest Expected</th>
                        <th>Space Name</th>
                        <th>Description</th>
                        <th>Total Capacity</th>
                        <th>Price</th>
                        <th>Space Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderBookingEvent(this.props.PersonalEventBookingReducer)}
                </tbody>
            </Table></div>
              let deleteSelectButton=<Button color="danger" disabled={this.state.isDisabled} className="mb-3"
              onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
            let modalData=<div>
                 <FormGroup>
                                    <Label>Event Type</Label>
                                    <Input type="select"  name="societyMemberEventName"  onChange={this.onChangeHandler} value={this.state.societyMemberEventName} maxLength={50} onKeyPress={this.OnKeyPressUserhandler}>
                                   
                                    <DefaultSelect/>
                                     {this.fetchEventName(this.props.PersonalEventBookingReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.societyMemberEventId}</span>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Start Date</Label>
                                    <Input type="date"  name="startDate" min={this.minDate()} onChange={this.onChangeHandler} value={this.state.startDate} >
                                    </Input>
                                    <span className="error">{this.state.errors.startDate}</span>
                                    <span className="error">{this.state.message}</span>
                                </FormGroup>

                                <FormGroup>
                                    <Label>End Date</Label>
                                    <Input type="date"  name="endDate" min={this.minDate()} onChange={this.onChangeHandler} value={this.state.endDate} >
                                    </Input>
                                    <span className="error">{this.state.errors.endDate}</span>
                                    <span className="error">{this.state.message}</span>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Number Of Guest Expected</Label>
                                    <Input type="text"  name="numberOfGuestExpected"  onChange={this.onChangeHandler} onKeyPress={this.OnKeyPresshandlerPhone} value={this.state.numberOfGuestExpected} maxLength={4}>
                                    </Input>
                                    <span className="error">{this.state.errors.numberOfGuestExpected}</span>
                                  
                                </FormGroup>


                                <FormGroup>
                                    <Label>Space Name</Label>
                                    <Input type="select"  name="eventSpaceId"  onChange={this.onChangeHandler} value={this.state.eventSpaceId} maxLength={50} onKeyPress={this.OnKeyPressUserhandler}>
                                    <DefaultSelect/>
                                     {this.fetchSpaceName(this.props.PersonalEventBookingReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.eventSpaceId}</span>
                                    <span className="error">{this.state.message}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editsocietyMemberEventName}>Save</Button>
                                    <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                                </FormGroup>
                                
            </div>
        return (
            <div>

                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                        <div className="top-details">
                            <h3>Personal Event Booking Detail</h3>
                            <Button onClick={this.routeToAddNewBookingEvent} color="primary">Add Booking</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                             {deleteSelectButton}

         <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></Label>

                        {(this.state.loading) ? <Spinner /> : tableData}
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                            <ModalBody>
                            {!this.state.modalLoading  ? modalData : <Spinner />}
                            </ModalBody>
                        </Modal>


                    </div>
                </UI>

            </div>
        );
    }
}


function mapStatToProps(state) {

    return {
        PersonalEventBookingReducer : state.PersonalEventBookingReducer 
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getEventBooking, deleteEventBooking, updateEventBooking, deleteSelectEventBooking,getMemberEvent, getEventDetails }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(TennatMemberEventsBookingDetail);