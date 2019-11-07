import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader,Table, Input, Label } from 'reactstrap';
import {getServicesId,getPurchaseOrder,updateServiceDetails,deletePurchaseDetails,deleteAllDetails } from '../../actions/purchaseOrderAction';
import { getServiceType } from '../../actions/serviceMasterAction';
import DefaultSelect from '../../constants/defaultSelect';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import {memberMaxDate} from '../../validation/validation';

class ViewServices extends Component {

    state = {
            filterName:"purchaseOrderName",
            purchaseOrderId:'',
            purchaseOrderDetailId:'',
            purchaseOrderType:'',
            purchaseOrderName:'',
            rate:'',
            quantity:'',
            amount :'',
            serviceStartDate:'',
            serviceEndDate:'' ,       
            isActive: false,
            menuVisible: false,
            editVendorModal: false,
            loading:true,
            search: '',
            modalIsOpen: false, 
            ids:[],
            isDisabled:true,    
            errors:{},
            modalLoading:false,
            message:''
        }

    componentDidMount() {
        var purchaseOrderId=localStorage.getItem("purchaseOrderId");
        this.refreshData(purchaseOrderId);
        this.setState({purchaseOrderId})
    }
     
    
    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onQuantityChangeHandler=(e)=>{  
        var amount=e.target.value*this.state.rate;
            this.setState({
                amount,
                [e.target.name]:e.target.value
            })
        }
    
        

    onHandleChange=(e)=>{
        // document.getElementById('purchaseOrderName').value=""
        // document.getElementById('purchaseOrderName').removeChild(document.getElementById('purchaseOrderName').childNodes[0]);
        // this.setState({purchaseOrderName:''})
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
            return x.purchaseOrderName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    refreshData(purchaseOrderId) {
        console.log(purchaseOrderId)
        this.props.getPurchaseOrder(purchaseOrderId).then(()=> this.setState({loading:false, modalLoading: false, editVendorModal:false}));
        this.props.getServiceType(purchaseOrderId)
        this.props.getServicesId(purchaseOrderId).then(()=> this.setState({loading:false, modalLoading: false, editVendorModal:false}));
     
        
    }

    
    getServices = ({ item }) => {
        
        if (item) {
            return (
                item.map((items, index) => {
                    return (
                        <option value={items.serviceName} key={items.serviceId} >
                            {items.serviceName}
                        </option>
                    )
                })
            )
        }
    }

  

    delete(purchaseOrderDetailId){ 
       
        this.setState({loading:true})
        let{isActive}=this.state;
        this.props.deletePurchaseDetails(purchaseOrderDetailId,isActive)
        .then(()=>this.refreshData(this.state.purchaseOrderId))
        this.setState({isActive:false})

    }

    deleteSelected(ids){
     
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteAllDetails(ids)
        .then(() => this.refreshData(this.state.purchaseOrderId))
        .catch(err => err.response.data.message);
    }


    startDateChange = (e) => {
        var start = document.getElementById('start');
        var end = document.getElementById('end');

        if (start.value) {
            end.min = start.value;
        }
        if (!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors,subMaintenanceErr:'' });
        }
        else{
            this.setState({[e.target.name]:e.target.value,subMaintenanceErr:''});
        }
    }

    endDateChange = (e) => {
        var start = document.getElementById('start');
        var end = document.getElementById('end');

        if (end.value) {
            start.max = end.value;
        }

        if (!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors,subMaintenanceErr:'' });
        }
        else{
            this.setState({[e.target.name]:e.target.value,subMaintenanceErr:''});
        }
    }

   

editUser(purchaseOrderDetailId,purchaseOrderId,purchaseOrderType,purchaseOrderName,rate,quantity,amount,serviceStartDate,serviceEndDate){
   
    this.setState({
        purchaseOrderDetailId, purchaseOrderId,purchaseOrderType,purchaseOrderName,rate,quantity,amount,serviceStartDate,serviceEndDate
            ,editVendorModal: !this.state.editServiceModal, errors:{}})
            
            
    }

toggleEditVendorModal() {
        this.setState({
            editVendorModal: !this.state.editVendorModal, message:''
        });
    }

toggle() {
        this.setState({ modal: false });
    }


renderList = ({ getServiceDetails }) => {
       
    if (getServiceDetails && getServiceDetails.assets ) {
        
        return getServiceDetails.assets.sort((item1, item2) => {

            let cmpValue=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
             return this.state.sortVal?cmpValue: -cmpValue;
        }).filter(this.searchFilter(this.state.search)).map((item, index) => {
               
                return (
                    <tr key={index}>
                        {/* <td><input type="checkbox" name="ids" value={item.purchaseOrderId} className="SelectAll"
                            onChange={(e, i) => {
                                const { purchaseOrderId } = item
                                if (!e.target.checked) {
                                    if (this.state.ids.length > -1) {
                                        document.getElementById('allSelect').checked = false;
                                        let indexOfId = this.state.ids.indexOf(purchaseOrderId);
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1)
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true })
                                        }
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, purchaseOrderId] })
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }
                            }} /></td> */}
                        <td>{index + 1}</td>
                        <td>{item.purchaseOrderName}</td>
                        <td>{item.rate}</td>
                        <td>{item.quantity}</td>
                        <td>{item.amount}</td> 
                        <td>{item.serviceStartDate}</td> 
                        <td>{item.serviceEndDate}</td>   
                        <td>
                            <button className="btn btn-success mr-2" onClick={this.editUser.bind(this,item.purchaseOrderDetailId, item.purchaseOrderId,item.purchaseOrderType,item.purchaseOrderName,item.rate,item.quantity,item.amount, item.serviceStartDate, item.serviceEndDate )} >Edit</button>
                            <Button color="danger"onClick={this.delete.bind(this,item.purchaseOrderDetailId)} >Delete</Button>

                        </td>
                    </tr>
                )
            })
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
        var amount=e.target.value*this.state.quantity;
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});  
            
            this.setState({
                amount,
                [e.target.name]:e.target.value
            })
        }}
    
    push=()=>{
            this.props.history.push('/superDashboard/purchaseOrderDetails')
        }
    
        updateAssets = () => { 
            let {purchaseOrderDetailId, purchaseOrderId,purchaseOrderType,purchaseOrderName,rate,quantity,amount,serviceStartDate, serviceEndDate} = this.state
            let errors = {};
                    if(this.state.rate===''){
                        errors.rate="Rate can't be empty"
                    }
                    
                    else if(this.state.serviceStartDate===''){
                        errors.serviceStartDate="Start Date can't be empty"
                    }
                  
            
                    else if(this.state.serviceEndDate===''){
                        errors.startEndDate="End Date can't be empty"
                    }
                   
                   
                    this.setState({ errors });
                    
                    const isValid =Object.keys(errors).length===0;
                    if(isValid && this.state.message === ''){           
                        this.props.updateServiceDetails(purchaseOrderDetailId, purchaseOrderId,purchaseOrderType,purchaseOrderName,rate,quantity,amount,serviceStartDate, serviceEndDate)
                            .then(() => this.refreshData(purchaseOrderId))
                            .catch(err=>{
                                this.setState({modalLoading:false, message: err.response.data.message, loading: false, editVendorModal:false})
                                })
                                if(this.state.message === ''){
                                    this.setState({editVendorModal: true})
                                }
                                else {
                                    this.setState({editVendorModal: false})
                                }       
                            this.setState({ modalLoading: true
                       })
                      
            }   
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
                                filterName:"purchaseOrderName"}});
                        }}>Service Name  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                  
                <th>Rates</th>  
                <th>Quantity</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              
            </tr>
         
        </thead>

        <tbody>
            {this.renderList(this.props.purchase)}
        </tbody>
    </Table>
    let modalData=<div>
             <FormGroup>
                        <Label>Service Name</Label>
                        <Input type="select" name="purchaseOrderName" value={this.state.purchaseOrderName} onChange={this.onHandleChange}>                      
                        {/* <option>{this.state.purchaseOrderSubType}</option> */}
                        <DefaultSelect/>
                        {this.getServices(this.props.displayServiceMasterReducer)}
                        </Input>
                        <span className="error">{this.state.message}</span>
                    </FormGroup>

                
                    
                    <FormGroup>
                        <Label> Rate</Label>
                        <Input type="text" name="rate" value={this.state.rate} maxLength={10} onChange={this.onRateChange}>
                        </Input>
                        <div>{!this.state.rate ? <span className="error">{this.state.errors.rate}</span>: null}</div>
                    </FormGroup>

                    <FormGroup>
                        <Label>Quantity</Label>
                        <Input type="text" name="quantity" value={this.state.quantity}  onChange={this.onQuantityChangeHandler} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={10}>
                
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Amount</Label>
                        <Input type="text" name="amount" value={this.state.amount}  onChange={this.onHandleChange} readOnly>
                        
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Service Start Date</Label>
                        <Input type="date" name="serviceStartDate"  value={this.state.serviceStartDate} id="start" min={memberMaxDate()}  onChange={this.startDateChange}>
                        </Input>
                        <span className="error">{this.state.errors.serviceStartDate}</span>
                    </FormGroup>

                    <FormGroup>
                        <Label>Service End Date</Label>
                        <Input type="date" name="serviceEndDate" id="end" value={this.state.serviceEndDate} min={memberMaxDate()} onChange={this.endDateChange}>  
                        </Input>
                        <span className="error">{this.state.errors.serviceEndDate}</span>
                    </FormGroup>
                              
                    <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateAssets}>Save </Button>
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
                <ModalHeader toggle={this.toggleEditVendorModal.bind(this)}> Edit Services</ModalHeader>
                <ModalBody>                    
                    {!this.state.modalLoading ? modalData: <Spinner/>}
                </ModalBody>
            </Modal>
            <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Service Details</h3>
            <Button color="primary" type="button" onClick={this.push}>Purchase Order Details</Button></div>
            <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />

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
        purchase: state.PurchaseOrder,
        ListOfAssets: state.AssetsTypeReducer,
        vendorMasterReducer: state.vendorMasterReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getServicesId,getPurchaseOrder,updateServiceDetails,getServiceType,deletePurchaseDetails,deleteAllDetails}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewServices);
    