import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMaintenance, deleteMaintenance, updateMaintenance,deleteSelectMaintenance } from './../../actions/maintenanceMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class MaintenanceMasterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMaintenanceData: {
                category: '',
                maintenanceId: '',
                
                isActive: false,

            },
            filterName:'category',
            menuVisible: false,
            modalLoading:false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            isDisabled: true,
            ids: [],
            message:''

        };
    }

    onChangeHandler = (event) => {
        this.setState({message:'' })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }


    toggle = (maintenanceId,category) => {

        this.setState({
            maintenanceId,
            category,
           
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal, message:'' })
    }


    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getMaintenance().then(() => this.setState({ loading: false,modalLoading:false, modal:false }))
       
    }


    editcategory = (e) => {
        e.preventDefault();
        const { maintenanceId, category } = this.state
        
        let errors = {};
        if(this.state.category===''){
            errors.category="category can't be empty"
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0
        
        if (isValid && this.state.message==='') {
           
        this.props.updateMaintenance(maintenanceId, category)
            .then(() => this.refreshData())
            .catch(err=>{ console.log(err.response.data.message)
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

      deleteMaintenanceName = (maintenanceId) => {
        let { isActive } = this.state.editMaintenanceData

      
        this.setState({ loading: true })
        this.props.deleteMaintenance(maintenanceId, isActive)
            .then(() => this.refreshData())
        this.setState({editMaintenanceData: { isActive: false } })
     
       
      }



    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
         
            return x.category.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }

    deleteSelected(ids){
        this.setState({loading:true,  isDisabled:true});
        this.props.deleteSelectMaintenance(ids)
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

   


    renderMaintenance = ({ maintenanceResult }) => {
       
        if (maintenanceResult) {
            return maintenanceResult.maintenance.sort((item1,item2)=>{
                var cmprVal = (item1.category && item2.category) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).filter(this.searchFilter(this.state.search)).map((item, index) => {

                return (
                    <tr key={item.maintenanceId}>
                     <td><input type="checkbox" name="ids" className="SelectAll" value={item.maintenanceId}
                         onChange={(e) => {
                            const {maintenanceId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(maintenanceId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                      
                                this.setState({ids: [...this.state.ids, maintenanceId]});
                                
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                      
                        <td>{index+1}</td>
                        <td>{item.category}</td>
                        <td> 
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.maintenanceId, item.category)} >Edit</Button>
                            <Button color="danger" onClick={this.deleteMaintenanceName.bind(this, item.maintenanceId)} >Delete</Button>

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
        return this.props.history.replace('/superDashboard/changePassword')
    }

    routeToAddNewMaintence = () => {
        this.props.history.push('/superDashboard/maintenanceMaster')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
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
                                filterName:'category'}});
                        }}>Maintenance Category 
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderMaintenance(this.props.MaintenanceMasterReducer)}
                </tbody>
            </Table></div>

             let modalData=<div>
                  <FormGroup>
                                    <Label>Category Type</Label>
                                    <Input type="text" id="maintenanceId" name="category" onChange={this.onChangeHandler} value={this.state.category} maxLength={50} onKeyPress={this.OnKeyPressUserhandler} />
                                    <span className="error">{this.state.errors.category}</span>
                                    <span className="error">{this.state.message}</span>
                                </FormGroup>


                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editcategory}>Save</Button>

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
                            <h3>Maintenance Category</h3>
                            <Button onClick={this.routeToAddNewMaintence} color="primary">Add Category</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                             <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
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
        MaintenanceMasterReducer: state.MaintenanceMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getMaintenance,deleteMaintenance, updateMaintenance, deleteSelectMaintenance }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(MaintenanceMasterDetail);