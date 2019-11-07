import React, { Component } from 'react';
import { ViewEvent, GetEventOrganiser, deleteEvent, updateEvent, deleteMultipleEvents } from '../../actions/eventMasterAction';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import DefaultSelect from '../../constants/defaultSelect'
import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
class DisplayEventMaster extends Component {
        state = {
                editEventData: {

                        isActive: false

                },
                eventId: '',
                userId: '',
                userName: '',
                eventType: '',
                eventName: '',
                eventOrganiser: [],
                startDate: Date,
                endDate: Date,
                editEventModal: false,
                menuVisible: false,
                search: '',
                loading: true,
                ids: [],
                isDisabled: true,
                filterName: "eventName",
                errors: {},
                message: '',
                modalLoading: false
        }
        componentDidMount() {
                this.refreshData()
        }


        refreshData() {

                this.props.ViewEvent().then(() => this.setState({ loading: false, modalLoading: false, editEventModal: false }));
                this.props.GetEventOrganiser().then(() => this.setState({ loading: false }));

        }
        toggleEditEventModal() {
                this.setState({
                        editEventModal: !this.state.editEventModal,
                        message: ''
                })
        }

        onChange = (e) => {
                this.setState({ message: '' })
                if (!!this.state.errors[e.target.name]) {
                        let errors = Object.assign({}, this.state.errors);
                        delete errors[e.target.name];
                        this.setState({ [e.target.name]: e.target.value, errors });
                }
                else {
                        this.setState({ [e.target.name]: e.target.value });
                }
        }

        editEvent(eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId, userName) {
                console.log('i m in edit ', eventId, userName, eventOrganiser);
                this.setState({
                        eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId, userName,
                        editEventModal: !this.state.editEventModal
                })
        }

        updateEvent = () => {
                let errors = {};
                let { eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId } = this.state;

                if (!this.state.eventType) {
                        errors.eventType = "Event Type cant be empty please Select"
                }
                if (!this.state.eventName) {
                        errors.eventName = "Event Name cant be empty please Select"
                }
                if (!this.state.userId) {
                        errors.userId = "Event Organiser cant be empty please Select"
                }
               

                this.setState({ errors })
                const isValid = Object.keys(errors).length === 0
                if (isValid) {
                        this.props.updateEvent(eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId).then(() => { this.refreshData() }).catch(err => this.setState({ modalLoading: false, message: err.response.data.message }))



                        if (this.state.message === '') {
                                this.setState({ editEventModal: true })
                        }
                        else {
                                this.setState({ editEventModal: false })
                        }


                        this.setState({
                             modalLoading: true
                        })
                }
        }


        OnKeyPresshandler(event) {
                const pattern = /[a-zA-Z _]/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                        event.preventDefault();
                }
        }
        deleteEvent(eventId) {
                this.setState({ loading: true })

                let { isActive } = this.state.editEventData;


                this.props.deleteEvent(eventId, isActive).then(() => { this.refreshData() })
                this.setState({ editEventData: { isActive: false } })



        }


        searchFilter(search) {
                return function (x) {
                        return x.eventType.toLowerCase().includes(search.toLowerCase()) ||
                        x.eventName.toLowerCase().includes(search.toLowerCase()) ||
                        x.organiser.firstName.toLowerCase().includes(search.toLowerCase()) || 
                        !search;
                }
        }
        getEvent({ events }) {
                console.log("events rocks", events);

                if (events &&  events.event) {
                        return (
                                events.event.map((item) => {
                                        return (
                                                <option key={item.userId} value={item.userId}>
              {item.firstName+" "+item.lastName}
                                                   
                                                </option>
                                        )
                                })
                        )
                }
        }
        searchOnChange = (e) => {
                //  this.setState({})
                this.setState({ search: e.target.value })
        }

        displayEvent({ getEvent }) {
                console.log(getEvent );
                if (getEvent && getEvent.event) {
                        return (
                                getEvent.event.sort((item1, item2) => {
                                        var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                                        return this.state.sortVal ? cmprVal : -cmprVal
                                }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                                        return (
                                                <tr key={item.eventId}>
                                                        <td><input type="checkbox" name="ids" value={item.eventId} className="SelectAll"
                                                                onChange={(e, i) => {
                                                                        const { eventId } = item
                                                                        if (!e.target.checked) {
                                                                                if (this.state.ids.length > -1) {
                                                                                        document.getElementById('allSelect').checked = false;
                                                                                        let indexOfId = this.state.ids.indexOf(eventId);
                                                                                        if (indexOfId > -1) {
                                                                                                this.state.ids.splice(indexOfId, 1)
                                                                                        }
                                                                                        if (this.state.ids.length === 0) {
                                                                                                this.setState({ isDisabled: true })
                                                                                        }
                                                                                }
                                                                        }
                                                                        else {
                                                                                this.setState({ ids: [...this.state.ids, eventId] })
                                                                                if (this.state.ids.length >= 0) {
                                                                                        this.setState({ isDisabled: false })
                                                                                }
                                                                        }
                                                                }} /></td>
                                                        <td> {index + 1}</td>
                                                        <td>{item.eventType}</td>
                                                        <td>{item.eventName}</td>
                                           <td>{item.organiser.firstName+" "+item.organiser.lastName}
          </td>
                                                 



                                                        <td>

                                                                <button className="btn btn-success mr-2" onClick={this.editEvent.bind(this, item.eventId, item.eventType, item.eventName, item.eventOrganiser, item.startDate, item.endDate, item.organiser.userId,item.organiser?item.organiser.userName:'')}> Edit</button>

                                                                <button className="btn btn-danger" onClick={this.deleteEvent.bind(this, item.eventId)}>Delete</button>
                                                        </td>
                                                </tr>
                                        )
                                })
                        )
                }
        }


        addEvent = () => {
                this.props.history.push('/superDashboard/event')

        }

        logout = () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user-type');
                return this.props.history.replace('/')
        }
        changePassword=()=>{ 
                return this.props.history.replace('/superDashboard/changePassword')
             }
        

        close = () => {
                return this.props.history.replace('/superDashBoard')
        }

        selectAll = () => {
                let selectMultiple = document.getElementsByClassName('SelectAll');
                let ar = [];
                for (var i = 0; i < selectMultiple.length; i++) {
                        ar.push(parseInt(selectMultiple[i].value));
                        selectMultiple[i].checked = true;
                }
                this.setState({ ids: ar });
                if (ar.length > 0) {
                        this.setState({ isDisabled: false });
                }
        }
        unSelectAll = () => {
                let allIds = []
                let unSelectMultiple = document.getElementsByClassName('SelectAll');
                for (var i = 0; i < unSelectMultiple.length; i++) {
                        unSelectMultiple[i].checked = false
                }

                this.setState({ ids: [...allIds] });
                if (allIds.length === 0) {
                        this.setState({ isDisabled: true });
                }
        }

        deleteSelected(ids){
                this.setState({loading:true,
                isDisabled:true});
                this.props.deleteMultipleEvents(ids)
                .then(() => this.refreshData())
                .catch(err => err.response.data.message);
            }


        render() {
                let tableData;
                tableData = <Table className="table table-bordered">
                        <thead>
                                <tr>
                                        <th style={{ width: '4px' }}></th>
                                        <th style={{ width: '4px' }}>#</th>
                                        <th>Event Type</th>
                                        <th onClick={() => { this.setState((state) => { return { sortVal: !state.sortVal, filterName: "eventName" } }) }}>Event Name
        <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>

                                        <th>Event Organiser</th>
                                    
                                        <th> Actions  </th>
                                </tr>
                        </thead>
                        <tbody>

                                {this.displayEvent(this.props.EventDetails)}

                        </tbody>
                </Table>
let modalData=<div>        
<FormGroup>
<Label for="eventType"> Event Type</Label>
<Input name="eventType" value={this.state.eventType}
        onChange={this.onChange}


        maxLength={25}
        onKeyPress={this.OnKeyPresshandler}

/>
<span className="error"> {this.state.errors.eventType}</span>
</FormGroup>

<FormGroup>
<Label for="eventName"> Event Name</Label>
<Input name="eventName" value={this.state.eventName} onChange={this.onChange}
        onKeyPress={this.OnKeyPresshandler}
        maxLength={25}
/>
<span className="error"> {this.state.errors.eventName}</span>
<span className="error">{this.state.message} </span>
</FormGroup>
<FormGroup>
<Label >Event Organiser</Label>
<Input type="select" name="eventOrganiser" value={this.state.eventOrganiser} onChange={this.onChange} >

        <option value={this.state.userName}>{this.state.userName}</option>

        <DefaultSelect />

        {this.getEvent(this.props.EventDetails)}
</Input>
<span className="error"> {this.state.errors.userId}</span>
</FormGroup>
<Button color="primary" className="mr-2" onClick={this.updateEvent}>Save</Button>
                                                                <Button color="danger" onClick={this.toggleEditEventModal.bind(this)}>Cancel</Button></div>
                let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
                        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
                return (
                        <div>

                                <UI onClick={this.logout}  change={this.changePassword}>

                                        <div className="w3-container w3-margin-top w3-responsive">
                                                <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                                                        <span aria-hidden="true">&times;</span>
                                                </div>
                                                <div className="top-details">
                                                        <h3 align="center"> Event Details</h3>
                                                        <Button color="primary" onClick={this.addEvent} > Add Event</Button>
                                                </div>
                                                <Modal isOpen={this.state.editEventModal} toggle={this.toggleEditEventModal.bind(this)}>
                                                        <ModalHeader toggle={this.toggleEditEventModal.bind(this)}>Edit  Event Details</ModalHeader>
                                                        <ModalBody>


                                                        {!this.state.modalLoading ? modalData : <Spinner/>}

                                                            

                                                        </ModalBody>
                                                </Modal>
                                                <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />

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
                                    }  
                                }/>
                            </Label>
                                                {!this.state.loading ? tableData : <Spinner />}


                                        </div>
                                </UI>
                        </div>


                )
        }






}


function mapStateToProps(state) {
        return {
                EventDetails: state.EventDetails
        }
}

function mapDispatchToProps(dispatch) {
        return bindActionCreators({ ViewEvent, GetEventOrganiser, deleteEvent, updateEvent, deleteMultipleEvents }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEventMaster)



