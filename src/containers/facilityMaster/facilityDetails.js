import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table, Col, Row } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import {getFacility,updateFacility,deleteSelectedFacility,deleteFacility} from '../../actions/facilityAction';
import {OnKeyPressUserhandler} from '../../validation/validation';

class FacilityDetails extends Component {

    state = {
            filterName:"facilityName",
            facilityId:'',
            facilityName:'',   
            isActive: false,
            ids:[], 
            menuVisible: false,
            editModal: false,
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
     this.props.getFacility().then(()=> this.setState({loading:false, modalLoading: false, editModal:false})).catch((err)=>{
        err;
        this.setState({loading:false, modalLoading: false, editModal:false})
    });
    }   

    deleteFacility(facilityId){
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.deleteFacility(facilityId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    }
    
    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedFacility(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

  
    searchFilter(search) {
        return function (x) {
            return x.facilityName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    push=()=>{
        this.props.history.push('/superDashboard/facilityMaster')
    }

    toggleModal() {
        this.setState({
            editModal: !this.state.editModal, message:''
        });
    }


    updateFacility() {
        const {facilityId,facilityName } = this.state;
        let errors={};
        if(this.state.facilityName===''){
            errors.facilityName="Facility Name can't be empty";
        }
        this.setState({errors});
        const isValid =Object.keys(errors).length===0;
        if(isValid &&  this.state.message === ''){

            this.props.updateFacility(facilityId,facilityName )
            .then(() => this.refreshData())
            .catch(err=>{
                this.setState({modalLoading:false,message: err.response.data.message, loading: false})
                })
                if(this.state.message === ''){
                    this.setState({editModal: true})
                }
                else {
                    this.setState({editModal: false})
                }       
            this.setState({ modalLoading: true
       })

        }         
    }

    editUser(facilityId,facilityName) {
        this.setState({

            facilityId, facilityName, editModal: !this.state.editModal
        });

    }


 

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    renderList = ({ getFacility }) => {
        if (getFacility && getFacility.facilities) {console.log(getFacility)
            
            return getFacility.facilities.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((getFacility,index) => {
                return (
                    
                    <tr key={getFacility.facilityId}>
                          <td><input type="checkbox" name="ids" className="SelectAll" value={getFacility.facilityId}
                         onChange={(e) => {
                            const {facilityId} = getFacility
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(facilityId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, facilityId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                        <td>{index+1}</td>
                        <td>{getFacility.facilityName}</td>
                                                                       
                        <td>
                            <Button color="success" className="mr-2" onClick={this.editUser.bind(this,getFacility.facilityId, getFacility.facilityName)}>Edit</Button>
                        
                            <Button color="danger" onClick={this.deleteFacility.bind(this, getFacility.facilityId,)}>Delete</Button>
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
                                filterName:'facilityName'}});
                        }}>Facility <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Actions</th>
                
             
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.facilityReducer)}
        </tbody>
    </Table>


        let modalData =<div>
                             <FormGroup>
                        <Label>Facilities</Label>
                        <Input type="text" name="facilityName" value={this.state.facilityName} onChange={this.onHandleChange} onKeyPress={OnKeyPressUserhandler}/>
                        <span className="error">{this.state.errors.facilityName}</span>
                        <span className="error">{this.state.message}</span>
                    </FormGroup>                
                        <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateFacility.bind(this)}>Save </Button>
                            <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
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

                    <Modal isOpen={this.state.editModal} toggle={this.toggleModal.bind(this)} >
                        <ModalHeader toggle={this.toggleModal.bind(this)}>Edit a Facility</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Facility Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Add Facility</Button></div>
                
             
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
        facilityReducer: state.facilityReducer,
        
     

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFacility,updateFacility,deleteSelectedFacility,deleteFacility}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FacilityDetails);      