import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getRegisterDetail, userCancelled, complaintFeedback, complaintAllDeleted} from '../../actions/registerComplainAction';
import UI from '../../components/newUI/ownerDashboard';
import {Table,Button, Input,FormGroup, Modal, ModalBody, ModalHeader,Label, Row, Col } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';
import ReactStars from 'react-stars';



class ComplaintOwnerDetails extends Component{
       constructor(props){
        super(props);
           this.state={
               filterName:"serviceName",
               search:'',
               loading: true,
               isDisabled: true,
               modal: false,
               modalLoading:false,
               feedback:'',
               rating:0,
               status:'',
               complaintId:'',
               vendorId:'',
               errors:{},
               ids: [],
               date:'',
               slotTime1:'',
               slotTime2:'',
               slotTime3:'',
               message:''
           }
       }

    componentWillMount() {
        this.refreshData()

    }

    refreshData=()=>{
        this.props.getRegisterDetail().then(() => this.setState({ loading: false,modalLoading: false, modal: false }))
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) { console.log(x)
            return x.service_master.serviceName.toLowerCase().includes(search.toLowerCase())  
              ||!search;
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword=()=>{ 
        console.log("password")
        return this.props.history.replace('/ownerDashboard/changePasswordOwner')
    }

    close = () => {
        return this.props.history.replace('/ownerDashboard')
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

        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }

    }

    deleteSelected = (ids) => {
        this.setState({ loading: true, isDisabled: true });

       
        this.props.complaintAllDeleted(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
        
 }


    
    renderComplaint = ({ getComplaints }) => {

        if (getComplaints && getComplaints.complaints) {

       return getComplaints.complaints.sort((item1,item2)=>{
        var cmprVal =  (item1.service_master[this.state.filterName].localeCompare(item2.service_master[this.state.filterName])) 
        return this.state.sortVal ? cmprVal : -cmprVal;
        }).filter(this.searchFilter(this.state.search)).map((item, index) => {  console.log(item)
           
                return (
                    <tr key={item.complaintId}  >
                     <td><input type="checkbox" className="SelectAll" name="ids" value={item.complaintId}
                            onChange={(e, i) => {
                                const { complaintId } = item
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    this.setState({ isChecked: false });
                                    let indexOfId = this.state.ids.indexOf(complaintId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1)
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, complaintId] });
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td>{index + 1}</td>
                        <td>{item.service_master ? item.service_master.serviceName: ''}</td>
                        <td>{item.date.split('T')[0]}</td>
                        <td>{item.vendor_master ? item.vendor_master.firstName : ''}</td>
                        <td>{item.vendor_master ? item.vendor_master.contact : ''}</td>
                        <td>{item.selectedSlot}</td>
                        <td><strong>{item.complaint_status_master ? item.complaint_status_master.statusType : ''}</strong></td>
                        
                        <td><Button color="danger" disabled={(item.complaint_status_master.statusType==='CANCELED' || item.complaint_status_master.statusType==='COMPLETED')} onClick={this.cancelComplaints.bind(this, item.complaintId)} >Cancel</Button></td>
                        <td><Button color="success" disabled={!!(item.complaint_status_master.statusType==='TO DO' || item.complaint_status_master.statusType==='IN PROGRESS' || item.complaint_status_master.statusType==='ACCEPTED'
                         || item.complaint_status_master.statusType==='CANCELED' || item.feedbackDisable === true)}  onClick={this.toggle.bind(this, item.complaintId, item.vendor_master ? item.vendor_master.vendorId : '')}>Feedback</Button></td>
                         
                    </tr>

                )

            })
        }
    }

    cancelComplaints = (complaintId) => {
       this.setState({loading: true})
        this.props.userCancelled(complaintId)
        .then(() => this.refreshData())
        .catch(()=> this.setState({loading: false}))
            
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    
    toggle = (complaintId, vendorId) => {

        this.setState({
            complaintId,
            vendorId,
            modal: !this.state.modal
        })
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

    minDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }

    ratingChanged = (rating) => {
       console.log(rating)
       this.setState({rating})
       
      }


      submitFeedback = () => {
         
        
        const { complaintId, date, slotTime1,slotTime2,slotTime3, rating, status, feedback, vendorId } = this.state
        console.log(complaintId, date, slotTime1,slotTime2,slotTime3, rating, status, feedback, vendorId);

        let errors = {};

        // if (this.state.rating === '') { errors.rating = " rating can't be empty" }
        // this.setState({ errors })
        

        const isValid = Object.keys(errors).length === 0

        if (isValid ) {
           

            this.props.complaintFeedback(complaintId, date, slotTime1,slotTime2,slotTime3, rating, status, feedback, vendorId)
            .then((res)=>{
                this.setState({
                    message:res.payload.data.message
                })
            })
                .then(() => this.refreshData())
                this.setState({ modalLoading: true, rating: 0 }) 


        }
    }

    render(){
        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                    <th style={{width:'4%'}}></th>
                        <th>#</th>
                        <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'serviceName'}});
                        }} >Service Type <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Date</th>
                        {/* <th>Selected Time</th> */}
                        <th>Vendor name</th>
                        <th>Contact no</th>
                        <th>Selected Slot</th>
                        <th>View Status</th>
                        <th>Action</th>
                        <th>Feedback Details</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderComplaint(this.props.registerComplaintReducer)}
                </tbody>
            </Table></div>

let modalData=<div>
         
             <FormGroup>
             <Label>Status</Label>
             <Input type="select" defaultValue='no-value' name="status"  onChange={this.onChange}>
                    <DefaultSelect />
                    <option>Completed</option>
                    <option>Reopen</option>
                </Input >
             </FormGroup>
              <div style={{display:this.state.status=='Completed'?'none':'block'}}>         
             <FormGroup>
             <Label>Date</Label>
                <Input type="date" min={this.minDate()} name="date"  onChange={this.onChange}>
                    <DefaultSelect />
                    {/* {this.service(this.props.displayServiceMasterReducer)} */}
                </Input >
                <span className='error'>{this.state.errors.date}</span>
            </FormGroup>

            <FormGroup>
            <Row md={12}>
                <Col md={4}>
                    <Label>Slot Time 1</Label>
                    <Input type="time"  name="slotTime1" onChange={this.onChange} >
                    <span className='error'>{this.state.errors.startTime1}</span>
                    </Input>
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
            </div> 
             <div>
             <h5 style={{marginBottom: '0px'}}>Rating</h5>
             <ReactStars
                name="rating"
                count={5}
                onChange={this.ratingChanged}
                size={24}
                color2={'#ffd700'}
                value={this.state.rating} />
            </div>
             <FormGroup>
                <Label>Feedback</Label>
                <Input type="textarea"  name="feedback"  maxLength={500} onChange={this.onChange}/>
             </FormGroup>

             <FormGroup>
                    <Button color="primary mr-2" onClick={this.submitFeedback} >Send</Button>
            </FormGroup>

</div>

        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                </div>
                <div className="top-details">
                            <h3>Complaint Details</h3>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Feedback</ModalHeader>
                            <ModalBody>
                            {!this.state.modalLoading  ? modalData : <Spinner />}
                            </ModalBody>
                        </Modal>
                <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                <Button color="danger" className="mb-3" onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled} >Delete Selected</Button>
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
                </div>
                </UI>
            </div> 
        )
    }
}

function mapStateToProps(state) {
      
return {

    registerComplaintReducer : state.registerComplaintReducer  
}



}
function mapDispatchToProps(dispatch) {
return bindActionCreators({ getRegisterDetail, userCancelled ,complaintFeedback,complaintAllDeleted }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(ComplaintOwnerDetails));