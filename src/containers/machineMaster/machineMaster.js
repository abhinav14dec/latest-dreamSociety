import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Label,FormGroup } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';
import Select from 'react-select';
import { PlaceHolder } from '../../actionCreators/index';
import {getAllFloor,addAnotherFlats} from '../../actions/flatOwnerAction';
import { viewTower } from '../../actions/towerMasterAction';
import {addMachine} from '../../actions/machineMasterAction';
import {Link} from 'react-router-dom';
import {getFlatDetails} from '../../actions/flatDetailMasterAction';
import {viewMachine} from '../../actions/machineIdMasterAction';
import DefaultSelect from '../../constants/defaultSelect';

class MachineMaster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            machineDetailId:'',
            towerId:'',
            floorId:'',
            flatDetailIds:'',
            loading: true,
            errors: {},
            message:'',
        }
    }
    componentDidMount(){
        this.props.viewTower().then(()=>this.setState({loading:false}))
        this.props.getFlatDetails().then(()=>this.setState({loading:false}))
       this.props.viewMachine().then(()=>this.setState({loading:false}))
    }



    flatList =({machine})=>{
        console.log(machine);
        if(machine &&  machine.machinesDetail)
        {

                     return machine.machinesDetail.map((item)=>{
                                
                                return (
                
                                    <option key={item.machineDetailId} value ={item.machineDetailId}>
                         
                                         {item.machineActualId}
                       

                                        </option>
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

    onChange = (event) => {
      
        this.setState({
            message:''
        })
      
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    getTower = ({ tower }) => {
        if (tower && tower.tower) {
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
        if(floor && floor.tower.Floors){
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
            if(floor && floor.flatDetail){
              return  floor.flatDetail.filter((flatRecord)=>{
                    return flatRecord.floorId===this.state.floorId
                }).map((selectFlat)=>{
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

  

        push=()=>{
        this.props.history.push('/superDashboard/viewMachineMaster')
        }

 onSubmit=(e)=>{
    e.preventDefault();
    let errors = {};
    if(!this.state.machineDetailId){
        errors.machineDetailId="Machine Id can't be empty"
       }
    if(this.state.towerId===''){
        errors.towerId="Tower can't be empty"
    }
    else if(this.state.floorId===''){
        errors.floorId="floor can't be empty"
    }
    else if(this.state.flatDetailIds==='')
    {
        errors.flatDetailIds="flat can't be empty"
    }
    this.setState({errors});
    const isValid=Object.keys(errors).length === 0;
    
    if(isValid){
    
        this.setState({loading:true})
  
    this.props.addMachine(this.state.machineDetailId, this.state.flatDetailIds).then(()=> this.props.history.push('/superDashboard/viewMachineMaster')).catch(err => {
        this.setState({message: err.response.data.message, loading: false})
    })
}
        }
    render() {
        let formData;
        formData =
            <div>
                    <FormGroup>
                    <Label>Machine Id</Label>
                    <select  className="form-control"   defaultValue='no-value'  name ="machineDetailId" onChange ={this.onChange}  onKeyPress={this.KeyPress}  maxLength={16}>
                   <DefaultSelect/>
                    
                    {this.flatList(this.props.MachineIdDetails)}
                    
                    </select>
                    <span className="error">{this.state.errors.machineDetailId}</span>
                              <span className="error">{this.state.message}</span>
                    
                </FormGroup >

                <FormGroup>
                    <Label>Tower</Label>
                    <Select options={this.getTower(this.props.towerList)}
                        onChange={this.towerChangeHandler.bind(this, 'towerId')}
                        placeholder={PlaceHolder} />
            {!this.state.towerId ? <span className="error">{this.state.errors.towerId}</span> : ''}
                   
                </FormGroup >
                <FormGroup>
                    <Label>Floor</Label>
                    <Select options={this.getFloor(this.props.towerFloor)}
                        placeholder={PlaceHolder}
                        name="floorId"
                        onChange={this.floorChangeHandler.bind(this, 'floorId')}
                    />
            {!this.state.floorId ? <span className="error">{this.state.errors.floorId}</span> : ''}
                    </FormGroup>
                <FormGroup>
                    <Label>Flat Number</Label>
                    <Select options={this.getFlats(this.props.towerFloor)}
                        placeholder={PlaceHolder}
                        name="flatDetailIds"
                        onChange={this.flatChangeHandler.bind(this, 'flatDetailIds')}
                    />
            {!this.state.flatDetailIds ? <span className="error">{this.state.errors.flatDetailIds}</span> : ''}
                   
                </FormGroup >
                <Button className="btn btn-success mr-2" >Add Machine</Button>
                <Link to='/superDashBoard/viewMachineMaster'>
                <Button color="danger" id="addAssets" >Cancel</Button>
            </Link>
            </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div>
                        <Form onSubmit={this.onSubmit}>
                            <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                            <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Add Machine Details</h3></div>
                            {!this.state.loading ? formData : <Spinner />}
                        </Form>
                    </div>
                </UI>
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log(state.FlatOwnerReducer)
    return {
        towerFloor:state.FlatOwnerReducer,
        towerList: state.TowerDetails,
        MachineIdDetails: state.MachineIdDetails,

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAllFloor,viewTower,addAnotherFlats,getFlatDetails,addMachine,viewMachine}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(MachineMaster);