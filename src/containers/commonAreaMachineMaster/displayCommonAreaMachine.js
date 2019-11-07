import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCommonAreaMachine,updateMachineAreas,deleteCommonAreaMachine,deleteSelectedCommonAreaMachine} from '../../actions/commonAreaMachineMasterAction';
import { Button,Col,Row, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import DefaultSelect from '../../constants/defaultSelect';
import {getCommonArea,getMachines} from '../../actions/commonAreaAction';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'; 
import { PlaceHolder } from '../../actionCreators/index';
    


class DisplayCommonAreaMachine  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName:"commonArea",
            commonAreaDetailId:'',
            commonAreaId:'',
            commonArea: '',
            machineDetailId:[],
            machines:[],
            machineActualId:'',
            errors:{},  
            loading:true,
            modalLoading: false,
            message:'',
            editCommonAreaModal: false,
            ids:[],
            search: '',
            isDisabled:true,
            selectedFloor:[]
           
        }

    }

componentDidMount() {
    this.refreshData() ;
 }
    
refreshData() {
    this.props.getCommonAreaMachine().then(()=> this.setState({loading:false, modalLoading: false, editCommonAreaModal:false}));
    this.props.getCommonArea().then(()=> this.setState({loading:false, modalLoading: false, editCommonAreaModal:false}));
    this.props.getMachines().then(()=> this.setState({loading:false, modalLoading: false, editCommonAreaModal:false}));
}


searchFilter(search) {
    return function (x) {
        return x.common_area_master.commonArea.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}


handleChange = (event) => {
    this.setState({message:''});
    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value.trim(''), errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value.trim('') });
    }
}

logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}

close=()=>{
    return this.props.history.replace('/superDashBoard')
}

changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
}

edit (commonAreaDetailId,commonAreaId,commonArea,machine) {
    console.log(commonAreaDetailId,commonAreaId,commonArea,machine);
    this.setState({
        machines:machine
      })
  const selectedFloor=machine.map(item=>item.machineDetailId)  
    this.setState({

        commonAreaDetailId,commonAreaId,selectedFloor, editCommonAreaModal: !this.state.editCommonAreaModal
    });

}

toggleCommonModal() {
    this.setState({
        editCommonAreaModal: !this.state.editCommonAreaModal, message:''
    });
}
  
searchOnChange = (e) => {
    this.setState({ search: e.target.value })
}
        
updateAreas() {
    const {commonAreaDetailId,commonAreaId,machines} = this.state;  
        this.props.updateMachineAreas(commonAreaDetailId,commonAreaId,machines)
        .then(() => this.refreshData())
        .catch(err=>{
            this.setState({modalLoading:false,message: err.response.data.message, loading: false})
                })
                if(this.state.message === ''){
                    this.setState({editCommonAreaModal: true})
                }
                else {
                    this.setState({editCommonAreaModal: false})
                }       
            this.setState({ modalLoading: true
       })       
       console.log(commonAreaId)
    }
    

deleteArea(commonAreaDetailId){
    this.setState({loading:true})
    let {isActive } =this.state;  
    this.props.deleteCommonAreaMachine(commonAreaDetailId,isActive)
        .then(() => this.refreshData())
        this.setState({isActive:false})
}

    
deleteSelected(ids){
    this.setState({loading:true,
    isDisabled:true});
    this.props.deleteSelectedCommonAreaMachine(ids)
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


machineChangeHandler=(name,selectOption)=>{
    console.log(selectOption)
    this.setState({
        [name]: selectOption.map((item)=>{return item.machineDetailId}),
        machines:selectOption.map((item)=>{return {machineDetailId:item.machineDetailId}})
    })
}
     

getCommonArea= ({ getAreas }) => {
    if (getAreas &&  getAreas.commonAreas) {
        return getAreas.commonAreas.map((item) => {
            return (
                <option key={item.commonAreaId} value={item.commonAreaId}>
                    {item.commonArea}
                </option>
            )
        })
    }

} 
getMachine= ({getMachines}) => {
    if(getMachines && getMachines.machines){
      return getMachines.machines.map((item)=>{  
         return (   {...item,label:item.machineActualId,value:item.machineDetailId}          
        )
    })
}
}

push=()=>{
    this.props.history.push('/superDashboard/commonAreaMachineMaster')
}


logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}


renderList = ({ getMachineAreas }) => { console.log(getMachineAreas)
    if (getMachineAreas && getMachineAreas.commonAreaDetail) {
        return getMachineAreas.commonAreaDetail.sort((item1,item2)=>{
            var cmprVal = (item1.common_area_master[this.state.filterName].localeCompare(item2.common_area_master[this.state.filterName]))
            return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index)=>{
                console.log(item.Machine)
            return (
            <tr key={item.commonAreaDetailId}>
              <td><input type="checkbox" name="ids" className="SelectAll" value={item.commonAreaDetailId}
                         onChange={(e) => {
                            const {commonAreaDetailId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(commonAreaDetailId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, commonAreaDetailId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
             <td>{index+1}</td>
             <td>{item.common_area_master?item.common_area_master.commonArea:''}</td>
             <td>{item.Machine.map((item)=>{return item.machineActualId}).join(" , ")}</td>
             <td>
                <Button color="success" className="mr-2" onClick={this.edit.bind(this,item.commonAreaDetailId,item.commonAreaId,item.common_area_master?item.common_area_master.commonArea:'',item.Machine)} >Edit</Button>
                <Button color="danger" onClick={this.deleteArea.bind(this, item.commonAreaDetailId)}>Delete</Button>
             </td>
             </tr>
        )
    })
    }

}
render(){
    let tableData;
        tableData=
        <Table className="table table-bordered">
        <thead>
            <tr>
            <th style={{width:'4%'}}></th>
                <th style={{width:'4%'}}>#</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'commonArea'}});
                        }}>Common Area <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th  style={{width:'12%'}}>View Machines</th>
                <th>Actions</th>        
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.commonAreaMachineReducer)}
        </tbody>
    </Table>
           let modalData =<div>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label>Common Area</Label>                               
                        <Input  type="select" name="commonAreaId" value={this.state.commonAreaId} onChange={this.handleChange}>                                     
                        <DefaultSelect/>
                            {this.getCommonArea(this.props.commonAreaReducer)}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Machine Name</Label>   
                        <ReactMultiSelectCheckboxes
                         options= {this.getMachine(this.props.commonAreaReducer)}
                         name="machineDetailId" 
                         placeholderButtonLabel={PlaceHolder}
                         onChange={this.machineChangeHandler.bind(this,'machineDetailId')}/>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                            <Button color="primary" className="mr-2"  onClick={this.updateAreas.bind(this)}>Save </Button>
                            <Button color="danger" onClick={this.toggleCommonModal.bind(this)} >Cancel</Button>
                        </FormGroup>
          </div>
          
          let deleteSelectedButton = <Button color="danger" className="mb-2"
          onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>

      
    return(
        <div>
             <UI onClick={this.logout} change={this.changePassword}>
                  
                  <div className="w3-container w3-margin-top w3-responsive">
                  <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                  <span aria-hidden="true">&times;</span>
                   </div>
                   <Modal isOpen={this.state.editCommonAreaModal} toggle={this.toggleCommonModal.bind(this)} >
                        <ModalHeader toggle={this.toggleCommonModal.bind(this)}>Edit Common Area Machine</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                   <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Common Area Machine Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Add Common Area Machine</Button></div>

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
       commonAreaReducer: state.commonAreaReducer,
       commonAreaMachineReducer:state.commonAreaMachineReducer


       }
   }

function mapDispatchToProps(dispatch) {
   return bindActionCreators({getCommonAreaMachine,updateMachineAreas,deleteCommonAreaMachine,getCommonArea,getMachines,deleteSelectedCommonAreaMachine}, dispatch);
   }

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCommonAreaMachine);
