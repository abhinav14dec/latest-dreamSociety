import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Table,Modal,ModalBody,ModalHeader,FormGroup,Input,Label} from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';


import {viewMachine,updateMachine,deleteMachine,deleteMultipleMachine} from '../../actions/machineIdMasterAction';


import Spinner from '../../components/spinner/spinner';
class DisplayMachineIdMaster extends Component {
    state = {
        filterName: 'machineActualId',
            isActive: false,
        ids: [],
        menuVisible: false,
        isDisabled: true,
        search: '',
        errors: {},
        loading: true,
        message: '',
        modalLoading: false,
        modal: false,
        machineDetailId:'',
        machineActualId:'',
        machineId:'',
        message:'',
       
    }

   
   

    componentDidMount(){
        this.props.viewMachine().then(()=>this.setState({modalLoading:false, loading:false,modal:false}))
        
    }

    refreshData=()=>{
    
        this.props.viewMachine().then(()=>this.setState({modalLoading:false, loading:false,modal:false}))


    }


    onChange = (event) => {
        this.setState({ message: '' })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    keyPress=(event)=>{
        const pattern = /[a-zA-Z 0-9 _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    push = () => {
        this.props.history.push('/superDashboard/machineIdMaster')
    }
    delete=(machineDetailId)=>{
        this.setState({loading:true})
        let { isActive } = this.state;
        this.props.deleteMachine(machineDetailId,isActive).then(() => this.refreshData())
        this.setState({ isActive: false  })
    }
   
    toggle = (machineDetailId,machineActualId) => {
        console.log(machineActualId,)
       
        this.setState({
            machineDetailId,machineActualId,
            modal: !this.state.modal
            
        })
    }


    

        update = (e) => {
        e.preventDefault();

            let errors = {};
            if(!this.state.machineActualId){
                errors.machineActualId="Machine Id can't be empty"
               }
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0;
            if(isValid  && this.state.message===''){
                this.setState({modalLoading:true})
            
               
                    let { machineActualId,machineDetailId} = this.state;
                    
                    this.props.updateMachine(machineActualId,machineDetailId).then(() => this.refreshData())
    
                .catch(err=>{ console.log(err.response.data.message)
                    this.setState({modalLoading:false,message: err.response.data.message})
                    })
                    if(this.state.message === ''){
                        this.setState({modal: true})
                    }
                    else {
                        this.setState({modal: false})
                    }
            
            // this.setState({
            //     modalLoading: true
            // })
                
            }
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
        deleteSelected=(ids)=>{
            this.setState({loading:true,isDisabled:true});
            this.props.deleteMultipleMachine(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
        }
        
        




        flatList =({machine})=>{
            console.log(machine);
            if(machine)
            {
    
                         return machine.machinesDetail.sort((item1,item2) =>{
                            var cmprVal=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                            return this.state.sortVal ?cmprVal:-cmprVal}).filter(this.searchFilter(this.state.search)).map((item,index)=>{
                                    
                                    return (
                    
                                        <tr key={item.machineDetailId}>
                                            <td><input type="checkbox" name="ids" value={item.machineDetailId} className="SelectAll"
                                    onChange={(e, i) => {
                                        const { machineDetailId } = item
                                        if (!e.target.checked) {
                                            if (this.state.ids.length > -1) {
                                                document.getElementById('allSelect').checked = false;
                                                let indexOfId = this.state.ids.indexOf(machineDetailId);
                                                if (indexOfId > -1) {
                                                    this.state.ids.splice(indexOfId, 1)
                                                }
                                                if (this.state.ids.length === 0) {
                                                    this.setState({ isDisabled: true })
                                                }
                                            }
                                        }
                                        else {
                                            this.setState({ ids: [...this.state.ids, machineDetailId] })
                                            if (this.state.ids.length >= 0) {
                                                this.setState({ isDisabled: false })
                                            }
                                        }
                                    }} /></td>
                                           
                                            <td>{index + 1}</td>
                                            <td> {item.machineActualId}</td>
                                          <td style={{ textAlign: "center" }}>
                                 <button className="btn btn-success mr-2" onClick={this.toggle.bind(this,item.machineDetailId,item.machineActualId)}>Edit</button>
                             <button className="btn btn-danger" onClick={this.delete.bind(this,item.machineDetailId)} >Delete</button>
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

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }


    close = () => {
        return this.props.history.replace('/superDashBoard/flatOwnerList')
    }
    searchOnChange = (e) => {
        //  this.setState({})
        this.setState({ search: e.target.value });
}
    searchFilter=(search) =>{
        return function (x) {
            return x.machineActualId.toLowerCase().includes(search.toLowerCase()) ||
             !search;
        }
    }
  
    
    render() {
        let tableData;
        tableData =
            <Table className="table table-bordered">
                <thead>               
                    <tr>
                    <th style={{ width: '4%' }}></th>

                        <th style={{ width: '4%' }}>#</th>
                        <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'machineActualId'
                                }
                            });
                        }}>Machine ID  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                     
                   
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {this.flatList(this.props.MachineIdDetails)}
                </tbody>
            </Table>
      let deleteSelectedButton = <Button color="danger" className="mb-2"
      onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>



        let formData =<div>
       
        <FormGroup>
 <label> Machine Id</label>
 <Input type="text" name="machineActualId" value={this.state.machineActualId} onChange={this.onChange}   onKeyPress={this.keyPress}
         maxLength={50} required
 />
                    <span className="error">{this.state.errors.machineActualId}</span>

 <span className="error">{this.state.message}</span>
 
 </FormGroup>
 
        
                           
                                   <FormGroup>
         <Button onClick={this.update} className="mr-2" color="success">Save</Button>
         <Button color="danger" onClick={this.toggle.bind(this)}>Cancel</Button>
     </FormGroup>
     </div>  
         return (
             <div>
                 <UI onClick={this.logout} change={this.changePassword}>
 
                     <div className="w3-container w3-margin-top w3-responsive">
                         <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                             <span aria-hidden="true">&times;</span>
                         </div>
                         <div className="top-details" style={{ fontWeight: 'bold' }}><h3>Machine  Details</h3>
                             <Button color="primary" type="button" onClick={this.push}> Add Machine</Button>
                         </div>
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
                        {(this.state.loading) ? <Spinner /> : tableData}
                     
                         
                         
                         <Modal isOpen={this.state.modal} toggle={this.toggles} style={{width:"100% !important"}}>
                         <ModalHeader toggle={this.toggle.bind(this)}>Edit Machine  Id Detail</ModalHeader>
                                
                                 <ModalBody>
                                 {!this.state.modalLoading?formData:<Spinner />}
                                 </ModalBody>
                         </Modal>
 
 
 
                     </div>
                 </UI>
             </div>
         )
     }
 
 }
 
 
function mapStateToProps(state) {
    console.log(state.MachineIdDetails);
    
    return {
        MachineIdDetails: state.MachineIdDetails,
        

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({viewMachine,deleteMachine,deleteMultipleMachine, updateMachine}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMachineIdMaster);