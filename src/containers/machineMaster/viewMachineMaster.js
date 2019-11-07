import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Table,Modal,ModalBody,ModalHeader,FormGroup,Input,Label} from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import {getAllFloor} from '../../actions/flatOwnerAction';

import DefaultSelect from './../../constants/defaultSelect';
import { viewTower } from '../../actions/towerMasterAction';


import {viewMachine,updateMachine,deleteMachine,deleteMultipleMachine,getMachine} from '../../actions/machineMasterAction';
import {addNewFlatForTenant, getFlats,getFlatDetailViaTowerId, editFlats, deleteFlat } from '../../actions/tenantMasterAction';
import Select from 'react-select';
import { PlaceHolder } from '../../actionCreators/index';

import Spinner from '../../components/spinner/spinner';
class ViewMachineMaster extends Component {
    state = {
        filterName: 'machineActualId',
        flatDetailId: '',
        flatNo: '',
        flatId: '',
        flatType: '',
        floorId: '',
        floorName: '',
        towerId: '',
        towerName: '',
        isActive: false,
        ids: [],
        menuVisible: false,
        editFlatModal: false,
        isDisabled: true,
        search: '',
        errors: {},
        loading: true,
        message: '',
        modalLoading: false,
        parkingId:'',
        slotId:'',
        modal: false,
        newFlatId:'',
        machineActualId:'',
        machineDetailId:'',
        machineId:'',
        message:'',
        flatDetailIds:''
    }

   
   

    componentDidMount(){
        this.props.viewTower();
            this.props.viewMachine().then(() => this.setState({loading:false,modalLoading:false}))
            this.props.getFlats(this.state.tenantId).then(() => this.setState({loading:false}))
             this.props.getMachine()
            console.log(this.props.viewMachine());
    }

    refreshData=()=>{
        this.props.viewTower();
        this.props.viewMachine().then(()=>this.setState({modalLoading:false,modal:false}))
 
        

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

    push = () => {
        this.props.history.push('/superDashboard/machineMaster')
    }
    delete=(machineId)=>{console.log(machineId)
        this.setState({loading:true})
        let { isActive } = this.state;
        this.props.deleteMachine(machineId,isActive).then(() => this.refreshData())
        this.setState({ isActive: false  })
    
        
    }
   
    toggle = (machineId,machineDetailId, machineActualId,towerName,floorName,flatNo,towerId,floorId) => {
        console.log(machineActualId,towerName,floorName,flatNo,towerId,floorId)
        this.props.getFlatDetailViaTowerId(towerId);

        this.setState({
            machineId,machineDetailId,machineActualId,towerName,floorName,flatNo,towerId,floorId,
            modal: !this.state.modal
            
        })
    }


    



    towerChangeHandler = (e) => {
        console.log(e)
        // var x = document.getElementById('floor');
        // console.log(x)
        // x.remove(x)
        console.log(this.state)
        this.setState({
                towerId: parseInt(e.target.value),
                memberError:'',
                floorId:'',
                floorName:'',
                flatDetailId:'',
                flatNo:'',
                message:''
        });
        this.props.getFlatDetailViaTowerId(e.target.value);
    }

    towerChangeHandler1 = (e) => {
        console.log(e)
        // var x = document.getElementById('floor');
        // console.log(x)
        // x.remove(x)
        console.log(this.state)
        this.setState({
                towerId: parseInt(e.target.value),
                memberError:'',
                floorId:'',
                floorName:'',
                flatDetailId:'',
                flatNo:'',
                message:''
        });
        this.props.getFlatDetailViaTowerId(e.target.value);
    }


    floorChangeHandler=(e)=>{
        console.log(this.state)
        this.setState({
            floorId: parseInt(e.target.value),
            memberError:'',
            flatDetailId:'',
            flatNo:'',
            message:''
        })
        console.log('lllllllll=======',this.state.floorId)
        // this.getFlats(this.props.towerFloor);
    
        }

        flatChangeHandler=(e)=>{
            console.log(this.state.flatDetailId)
            console.log(this.state)
            this.setState({
                flatDetailId: parseInt(e.target.value),
                memberError:'',
                message:''
            })
            this.props.getFlatDetailViaTowerId(this.state.towerId);
        }

    getTower = ({ tower }) => {
        if (tower) {
            return tower.tower.map((item) => {
                return (
                    // { ...item, label: item.towerName, value: item.towerId }
                    <option key={item.towerId} value={item.towerId} >{item.towerName}</option>
                )
            }
            );
        }
        return [];
    }

    getFloor=({getFlatDetail})=>{
        console.log("floor",getFlatDetail)
        if(getFlatDetail && getFlatDetail.tower){
            return getFlatDetail.tower.Floors.map((item)=>{
                      
                // return {...item ,label: item.floorName, value: item.floorId }
                return <option key={item.floorId} value={item.floorId} >{item.floorName}</option>
            })
          //   this.setState({
          //     floorId:item.floorId
          //   })
        }
        else {
            return []
        }}

        getFlats=({getFlatDetail})=>{
            console.log('7777777jjjjjj',getFlatDetail)
            if(getFlatDetail &&  getFlatDetail.flatDetail){
              return  getFlatDetail.flatDetail.map((selectFlat)=>{
                    console.log('bbbbbbbbbbbbbbbbb',selectFlat)
                    // return {...selectFlat, label:selectFlat.flatNo,value:selectFlat.flatDetailId}
                    return <option key={selectFlat.flatDetailId} value={selectFlat.flatDetailId} >{selectFlat.flatNo}</option>
                });
            }
            else {
                return []
              }
        }


        update = (e) => {
        e.preventDefault();

            let errors = {};
            if(!this.state.towerId) errors.towerId = `Please enter tower name.`
            if(!this.state.floorId) errors.floorId = `Please enter floor.`
            if(!this.state.flatDetailIds) errors.flatDetailIds = `Please enter flat.`
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0;
            if(isValid  && this.state.message===''){
                this.setState({modalLoading:true})
            
               
                    let { flatDetailIds,machineDetailId,machineId } = this.state;
           
                    this.props.updateMachine(flatDetailIds,machineDetailId,machineId).then(() => this.refreshData())
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
            if(machine && machine.Machines)
            {
    
                         return machine.Machines.sort((item1,item2) =>{
                            var cmprVal=(item1.machine_detail_master[this.state.filterName].localeCompare(item2.machine_detail_master[this.state.filterName]))
                            return this.state.sortVal ?cmprVal:-cmprVal}).filter(this.searchFilter(this.state.search)).map((item,index)=>{ console.log(item)
                                    
                                    return (
                    
                                        <tr key={item.machineId}>
                                            <td><input type="checkbox" name="ids" value={item.machineId} className="SelectAll"
                                    onChange={(e, i) => {
                                        const { machineId } = item
                                        if (!e.target.checked) {
                                            if (this.state.ids.length > -1) {
                                                document.getElementById('allSelect').checked = false;
                                                let indexOfId = this.state.ids.indexOf(machineId);
                                                if (indexOfId > -1) {
                                                    this.state.ids.splice(indexOfId, 1)
                                                }
                                                if (this.state.ids.length === 0) {
                                                    this.setState({ isDisabled: true })
                                                }
                                            }
                                        }
                                        else {
                                            this.setState({ ids: [...this.state.ids, machineId] })
                                            if (this.state.ids.length >= 0) {
                                                this.setState({ isDisabled: false })
                                            }
                                        }
                                    }} /></td>
                                           
                                            <td>{index + 1}</td>
                                            <td> {item.machine_detail_master.machineActualId}</td>
                                            <td>{item.flat_detail_master.tower_master.towerName}</td>
                                            <td>{item.flat_detail_master.floor_master.floorName}</td>
                                            <td>{item.flat_detail_master.flatNo}</td>
                                          <td style={{ textAlign: "center" }}>
                                 <button className="btn btn-success mr-2" onClick={this.toggle.bind(this,item.machineId, item.machine_detail_master.machineDetailId,item.machine_detail_master.machineActualId,item.flat_detail_master.tower_master.towerName,item.flat_detail_master.floor_master.floorName,item.flat_detail_master.flatNo,item.flat_detail_master.tower_master.towerId,
                                 item.flat_detail_master.floor_master.floorId)}>Edit</button>
                             <button className="btn btn-danger" onClick={this.delete.bind(this,item.machineId)} >Delete</button>
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
            return x.machine_detail_master.machineActualId.toLowerCase().includes(search.toLowerCase()) ||
            x.flat_detail_master.tower_master.towerName.toLowerCase().includes(search.toLowerCase()) ||
            x.flat_detail_master.floor_master.floorName.toLowerCase().includes(search.toLowerCase()) ||
            x.flat_detail_master.flatNo.toLowerCase().includes(search.toLowerCase()) ||
             !search;
        }
    }
    flat =({machine1})=>{
        console.log(machine1);
        if(machine1)
        {

                     return machine1.machinesDetail.map((item)=>{
                                
                                return (
                
                                    <option key={item.machineDetailId} value ={item.machineDetailId}>
                         
                                         {item.machineActualId}
                       

                                        </option>
            )
        })
    }
}

   

    towerChangeHandler=(e)=>{
      this.setState({
          towerId:e.target.value
      },function(){this.props.getAllFloor(this.state.towerId)} )
      
    }
    floorChangeHandler=(e)=>{
        this.setState({
            floorId:e.target.value
        })
    }
    getDropdown1=({flattype})=>{
        if(flattype){
            return flattype.flat.map((items)=>{
                return(
                    <option key={items.flatId} value={items.flatId}>
                    {items.flatType}
                    </option>
                )
            })
        }
    }
    onflatChangeHandler=(e)=>{
        this.setState({
            newFlatId:e.target.value
        },function(){
            console.log(this.state.newFlatId)
        })
    }


    getTower = ({ tower }) => {
        if (tower) {
            return tower.tower.map((item) => {
                return (
                    { ...item, label: item.towerName, value: item.towerId }
                )
            }
            );
        }
        return [];
    }
    towerChangeHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value,
                towerName:selectOption.label
            }
        }, function () {
        });
        this.props.getAllFloor(selectOption.towerId);
    }
    getFloor=({floor})=>{
        if(floor){
            return floor.tower.Floors.map((item)=>{
                      
                return {...item ,label: item.floorName, value: item.floorId }
            })
        }
        else {
            return []
        }}
        floorChangeHandler=(name,selectOption)=>{
            console.log(selectOption)
            this.setState({
                [name]: selectOption.value,
                floorName:selectOption.label
            })
    
        }
        getFlats=({floor})=>{
            if(floor){
              return  floor.flatDetail.filter((flatRecord)=>{
                  console.log('flatRecord',flatRecord)
                    return flatRecord.floorId===this.state.floorId
                }).map((selectFlat)=>{
                    console.log('selectFlat',selectFlat)
                    return {...selectFlat, label:selectFlat.flatNo,value:selectFlat.flatDetailId}
                });
            }
            else {
                return []
              }
        }
        flatChangeHandler=(name,selectOption)=>{
            let flatName=selectOption.label
            this.setState({
                [name]: selectOption.value,
                currentAddress:this.state.flat+flatName+','+this.state.floorName+','+this.state.towerName+','+this.state.currentAddress+' '+this.state.pinCode
            })
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
                     
                   
                        <th>Tower Name</th>
                        <th>Floor</th>
                        <th>Flat Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {this.flatList(this.props.MachineDetails)}
                </tbody>
            </Table>
      let deleteSelectedButton = <Button color="danger" className="mb-2"
      onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>



        let formData =<div>
       
       <FormGroup>
                    <label>Machine Id</label>
                    <select  className="form-control"   value={this.state.machineDetailId} name ="machineDetailId" onChange ={this.onChange}  onKeyPress={this.KeyPress}  maxLength={16}>
                   <DefaultSelect/>
                      
                    {this.flat(this.props.MachineDetails)}
                    
                    </select>
                    <span className="error">{this.state.errors.machineDetailId}</span>
                              <span className="error">{this.state.message}</span>
                    
                </FormGroup >
        
 <FormGroup>
                    <label>Tower</label>
                    <Select options={this.getTower(this.props.towerList)}
                        onChange={this.towerChangeHandler.bind(this, 'towerId')}
                        placeholder={PlaceHolder} />
            {!this.state.towerId ? <span className="error">{this.state.errors.towerId}</span> : ''}
                    
                </FormGroup >
                <FormGroup>
                    <label>Floor</label>
                    <Select options={this.getFloor(this.props.towerFloor)}
                        placeholder={PlaceHolder}
                        name="floorId"
                        onChange={this.floorChangeHandler.bind(this, 'floorId')}
                    />
            {!this.state.floorId ? <span className="error">{this.state.errors.floorId}</span> : ''}
               
                </FormGroup>
                <FormGroup>
                    <label>Flat Number</label>
                    <Select options={this.getFlats(this.props.towerFloor)}
                        placeholder={PlaceHolder}
                        name="flatDetailIds"
                        onChange={this.flatChangeHandler.bind(this, 'flatDetailIds')}
                    />
            {!this.state.flatDetailIds ? <span className="error">{this.state.errors.flatDetailIds}</span> : ''}

                </FormGroup >
                           
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
                         <ModalHeader toggle={this.toggle.bind(this)}>Edit Machine Detail</ModalHeader>
                                
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
    return {
        MachineDetails: state.MachineDetails,
        towerFloor:state.FlatOwnerReducer,
        tenantReducer:state.tenantReducer,
        towerList: state.TowerDetails,
        MachineIdDetails: state.MachineIdDetails


    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({viewTower,getAllFloor,viewMachine,deleteMachine,deleteMultipleMachine, updateMachine,getFlats, addNewFlatForTenant, getFlatDetailViaTowerId, viewTower, editFlats,
        deleteFlat,getMachine}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMachineMaster);