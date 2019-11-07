import React, { Component } from 'react';
import { getServiceType, getServiceDetail,deleteSelectedService,deleteService,updateServices } from '../../../actions/serviceMasterAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table, Col, Row } from 'reactstrap';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/superAdminDashboard';
import Spinner from '../../../components/spinner/spinner';
import DefaultSelect from '../../../constants/defaultSelect';

class DisplayServices extends Component {

    state = {
            filterName:"serviceName",
            serviceId: '',
            serviceName: '',
            service_detail: '',
            serviceDetailId: '',           
            isActive: false,
            ids:[], 
            menuVisible: false,
            editServiceModal: false,
            isDisabled:true, 
            search: '',
            errors:{},
            loading:true,
            modalLoading: false,
            message:''

    }


    componentDidMount() {
        this.refreshData();
   
    }

    onHandleChange=(event)=>{
        this.setState({message:''})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }


    refreshData() {
        this.props.getServiceType().then(()=> this.setState({loading:false, modalLoading: false, editServiceModal:false}));
        this.props.getServiceDetail().then(()=> this.setState({loading:false}));
    }   

    deleteService(serviceId){console.log(serviceId)
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.deleteService(serviceId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    }
    
    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedService(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

  
    searchFilter(search) {
        return function (x) {
            return x.serviceName.toLowerCase().includes(search.toLowerCase()) ||
            x.service_detail_master.service_detail.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    push=()=>{
        this.props.history.push('/superDashboard/ServiceMaster')
    }

    toggleEditServiceModal() {
        this.setState({
            editServiceModal: !this.state.editServiceModal, message:''
        });
    }


    updateServices() {
        const {serviceId, serviceName, service_detail, serviceDetailId } = this.state;
        let errors={};
        if(this.state.serviceName===''){
            errors.serviceName="Service Name can't be empty";
        }
        this.setState({errors});
        const isValid =Object.keys(errors).length===0;
        if(isValid &&  this.state.message === ''){

            this.props.updateServices(serviceId,serviceName, service_detail, serviceDetailId)
            .then(() => this.refreshData())
            .catch(err=>{
                this.setState({modalLoading:false,message: err.response.data.message, loading: false})
                })
                if(this.state.message === ''){
                    this.setState({editServiceModal: true})
                }
                else {
                    this.setState({editServiceModal: false})
                }       
            this.setState({ modalLoading: true
       })

        }         
    }

    editUser(serviceId, serviceName, service_detail, serviceDetailId) {
        this.setState({

             serviceId, serviceName, service_detail, serviceDetailId , editServiceModal: !this.state.editServiceModal
        });

    }


    getDropdown1 = ({ detail }) => {
        if (detail &&  detail.service) {
            return detail.service.map((item) => {
                return (
                    <option key={item.serviceDetailId} value={item.serviceDetailId}>
                        {item.service_detail}</option>
                )

            })



        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    renderList = ({ item }) => {
        if (item) {
            
            return item.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((item,index) => {
                return (
                    
                    <tr key={item.serviceId}>
                          <td><input type="checkbox" name="ids" className="SelectAll" value={item.serviceId}
                         onChange={(e) => {
                            const {serviceId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(serviceId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, serviceId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                        <td>{index+1}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.service_detail_master?item.service_detail_master.service_detail:''}</td>                                                
                        <td>
                            <Button color="success" className="mr-2" onClick={this.editUser.bind(this, item.serviceId, item.serviceName, item.service_detail_master?item.service_detail_master.service_detail:'', item.serviceDetailId)}>Edit</Button>
                        
                            <Button color="danger" onClick={this.deleteService.bind(this, item.serviceId)}>Delete</Button>
                        </td>
                        
                    </tr>
                    

                )
            })
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

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    
    render() {
        
        let tableData;
        tableData=
        <Table className="table table-bordered">
        <thead>
            <tr>
            <th style={{width:'4%'}}></th>
                <th style={{width:'4%'}}>#</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'serviceName'}});
                        }}>Service Type <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Service Details</th>
                <th>Actions</th>
                
             
            </tr>
        </thead> 

        <tbody>
            {this.renderList(this.props.displayServiceMasterReducer)}
        </tbody>
    </Table>


        let modalData =<div>
                             <FormGroup>
                             <Row md={12}>
                             <Col md={6}>
                                <Label for="serviceName">Service Type</Label>
                                <Input type="text" value={this.state.serviceName} name="serviceName" onKeyPress={this.OnKeyPressUserhandler} maxLength={20} onChange={this.onHandleChange}  />
                                <span className="error">{this.state.errors.serviceName}</span>
                                <span className="error">{this.state.message}</span>
                                </Col>     
                                <Col md={6}>
                                <Label for="service_detail">Service Details</Label>
                                <Input type="select" name="serviceDetailId" value={this.state.serviceDetailId} onChange={this.onHandleChange}> 
                                    <DefaultSelect/>
                                    {this.getDropdown1(this.props.serviceMasterReducer)}
                                </Input>
                             
                                </Col>
                                </Row>
                            </FormGroup>                    

                        <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateServices.bind(this)}>Save </Button>
                            <Button color="danger" onClick={this.toggleEditServiceModal.bind(this)}>Cancel</Button>
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

                    <Modal isOpen={this.state.editServiceModal} toggle={this.toggleEditServiceModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditServiceModal.bind(this)}>Edit a Service</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Service Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Add Services</Button></div>
                
             
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
                 
                     
                    
                    </div>
                </UI>
               

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        serviceMasterReducer: state.serviceMasterReducer

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getServiceType, getServiceDetail,deleteSelectedService,deleteService,updateServices}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayServices);      