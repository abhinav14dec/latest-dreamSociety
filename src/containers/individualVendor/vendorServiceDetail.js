import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UI from '../../components/newUI/superAdminDashboard';

import DefaultSelect from '../../constants/defaultSelect';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { getIndividualVendor, getServiceVendor } from './../../actions/individualVendorAction';

import { getServiceType } from './../../actions/serviceMasterAction';
import { getRateType } from './../../actions/vendorMasterAction';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Table, Label,} from 'reactstrap';
import _ from 'underscore';

let individualVendorId;


class VendorServiceDetail extends Component {



    state = {
            filterName:"serviceName",
            vendorServiceId:'',         
            serviceId: '',
            serviceName: '',
            rateId: '',
            rateType:'',
            rate:'',          
            isActive: false,
            menuVisible: false,
            editVendorModal: false,
            loading:true,
            search: '',
            modalIsOpen: false,
            search: '', 
            ids:[],
            isDisabled:true,    
            errors:{},
            modalLoading:false,
            message:''
        }

    componentDidMount() {
        individualVendorId=localStorage.getItem("individualVendorId")
       this.refreshData(individualVendorId);
    }

    onHandleChange=(e)=>{
        this.setState({message:''})
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({[e.target.name]:e.target.value});
            }
    }

    searchFilter(search) {
        return function (x) {
            return x.service_master ? x.service_master.serviceName.toLowerCase().includes(search.toLowerCase()) : '' || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    refreshData(individualVendorId) {
        this.props.getServiceVendor(individualVendorId).then(()=> this.setState({loading:false, modalLoading: false, editVendorModal:false}));
        this.props.getServiceType().then(()=> this.setState({loading:false, modalLoading: false}));
        this.props.getRateType().then(()=> this.setState({loading:false, modalLoading: false}));
    }

    
    getDropDown = ({item}) => {
        if (item) {
            return item.map((item) => {
                return (
                    <option key={item.serviceId} value={item.serviceId}>
                       {item.serviceName + " | " + item.service_detail_master.service_detail}
                    </option>
                )
            })
        }
    }

    getDropDown1 = ({rate}) => {
        if (rate && rate.rate) {
            return rate.rate.map((item) => {
                return (
                    <option key={item.rateId} value={item.rateId}>
                        {item.rateType}
                    </option>
                )
            })
        }

    }


    delete(vendorServiceId){ 
        this.setState({loading:true})
        let{isActive}=this.state;
        this.props.deleteVendorServices(vendorServiceId,isActive)
        .then(()=>this.refreshData())
        this.setState({isActive:false})

    }

    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedVendorServices(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

   

editUser(vendorServiceId,vendorId,serviceId,rateId,serviceName,rateType,rate){
    this.setState({
        vendorServiceId,vendorId,serviceId,rateId,serviceName,rateType,rate
            ,editVendorModal: !this.state.editServiceModal})
            
    }

toggleEditVendorModal() {
        this.setState({
            editVendorModal: !this.state.editVendorModal,message:''
        });
    }

toggle() {
        this.setState({ modal: false });
    }

updateServices = () => { 
    const {vendorServiceId,vendorId,serviceId,rateId,rate} = this.state
    let errors = {};
            if(this.state.rate===''){
                errors.rate="Rate can't be empty"
            }
            this.setState({ errors });
            
            const isValid =Object.keys(errors).length===0;
            if(isValid && this.state.message === ''){           
                this.props.updateVendorServices(vendorServiceId,vendorId,serviceId,rateId,rate)
                    .then(() => this.refreshData())
                    .catch(err=>{
                        this.setState({modalLoading:false,message: err.response.data.message, loading: false})
                        })
                        if(this.state.message === ''){
                            this.setState({editVendorModal: true})
                        }
                        else {
                            this.setState({editVendorModal: false})
                        }       
                    this.setState({ modalLoading: true
               })
               console.log(serviceId,rateId)
    }   
}

    renderList = ({ getServiceVendor }) => {  

        if (getServiceVendor && getServiceVendor.vendor ) {
            console.log(getServiceVendor)
            let item=getServiceVendor.vendor
             
                   return (

                    <tr key={item.individualVendorId}>
                        {/* <td><input type="checkbox" name="ids" className="SelectAll" value={item.individualVendorId}
                            onChange={(e) => {
                                const {individualVendorId} = item;
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
                                
                                 }}/></td> */}
                        <td>{"1"}</td>
                        <td>{item.service_master ? item.service_master.serviceName : ''}</td>
                        <td>{item.rate_master.rateType}</td>
                        <td>{item.rate}</td>
                        <td>{item.startTime} - {item.endTime}</td> 
                        <td>{item.startTime1} - {item.endTime1}</td> 
                        <td>{item.startTime2} - {item.endTime2}</td> 
                        {/* <td>
                                <Button color="success" className="mr-2" onClick={this.editUser.bind(this,item.vendorId,item.individualVendorId,item.service_master.serviceId,item.rate_master.rateId,item.service_master?item.service_master.serviceName:'',item.rate_master?item.rate_master.rateType:'',item.rate)}>Edit</Button> 
                                <Button color="danger" onClick={this.delete.bind(this,item.individualVendorId)}>Delete</Button>
                        </td> */}

                    </tr>

                )
           
        }
        }



    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    
    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
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
            console.log(this.state)
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

       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    
    onRateChange=(e)=>{
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});          
        }}
    
    push=()=>{
            this.props.history.push('/superDashboard/individualVendor')
        }
    
    push1=()=>{
            this.props.history.push('/superDashboard/individualVendorDetail')
        }
           

    render() {   
            let tableData;
            tableData=
            <Table className="table table-bordered">
        <thead>
            <tr>
                {/* <th  style={{width:'4%'}}></th> */}
                <th  style={{width:'4%'}}>#</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:"serviceName"}});
                        }}>Services  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
        
                <th>Rate Types </th>
                <th>Rates</th> 
                <th>Slot Time 1 </th> 
                <th>Slot Time 2</th> 
                <th>Slot Time 3</th>                        
                {/* <th>Actions</th> */}
              
            </tr>
         
        </thead>

        <tbody>
            {this.renderList(this.props.IndividualVendorReducer)}
        </tbody>
    </Table>
    let modalData=<div>
             <FormGroup>
                        <Label>Service Types</Label>
                        <Input type="select" name="serviceId" value={this.state.serviceId}  onChange={this.onHandleChange}>                      
                        <option>{this.state.serviceName}</option>
                        <DefaultSelect/>
                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                        </Input>
                        <span className="error">{this.state.message}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label>Rate Types</Label>
                        <Input type="select" name="rateId" value={this.state.rateId}  onChange={this.onHandleChange}>
                        <option>{this.state.rateType}</option>
                        <DefaultSelect/>
                        {this.getDropDown1(this.props.vendorMasterReducer)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label> Rates</Label>
                        <Input name="rate" value={this.state.rate} maxLength={6} onChange={this.onRateChange}>
                        </Input>
                        <div>{!this.state.rate ? <span className="error">{this.state.errors.rate}</span>: null}</div>
                    </FormGroup>
                              
                    <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateServices}>Save </Button>
                            <Button color="danger" onClick={this.toggleEditVendorModal.bind(this)}>Cancel</Button>
                        </FormGroup> 
    </div>
        // let deleteSelectedButton = <Button color="danger" className="mb-2"
        // onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>;
            return(
            <div>
                 <UI onClick={this.logout} change={this.changePassword}>

                <div className="w3-container w3-margin-top w3-responsive">
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                    <span aria-hidden="true">&times;</span>
            </div>
           
            <Modal isOpen={this.state.editVendorModal} toggle={this.toggleEditVendorModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditVendorModal.bind(this)}> Edit Vendor Services</ModalHeader>
                <ModalBody>                    
                    {!this.state.modalLoading?modalData:<Spinner/>}
                </ModalBody>
            </Modal>
            <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Vendor Services Detail</h3>
            <div>
            <Button className="mr-2" color="primary" type="button" onClick={this.push1}>Vendor Details</Button>
            <Button color="primary" type="button" onClick={this.push}>Add Vendor</Button>
            </div>
            </div>
          
            {/* <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} /> */}

                     {/* {deleteSelectedButton} */}
                     {/* <Label style={{padding:'10px'}}><b>Select All</b><input className="ml-2"
                        id="allSelect"
                        type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        } }/>
                    </Label> */}
                         {!this.state.loading ? tableData : <Spinner />}
            </div>

              

               
                </UI>            
            </div>
         )
    }
}


function mapStateToProps(state) {

    return {
        IndividualVendorReducer: state.IndividualVendorReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        vendorMasterReducer: state.vendorMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getIndividualVendor, getServiceType, getRateType, getServiceVendor}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorServiceDetail);
    