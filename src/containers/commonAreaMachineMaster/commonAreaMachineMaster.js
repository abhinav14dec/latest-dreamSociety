import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCommonArea,getMachines} from '../../actions/commonAreaAction';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import {addCommonAreaMachine} from '../../actions/commonAreaMachineMasterAction';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'; 
import { PlaceHolder } from '../../actionCreators/index';
import Spinner from '../../components/spinner/spinner';
    

class CommonAreaMachine  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commonAreaId:'',
            commonArea: '',
            machineDetailId:[],
            machines:[],
            machineActualId:'',
            errors:{},
            loading:true,
            message:''
           
        }

    }


componentDidMount() {
    this.refreshData() ;
}

refreshData() {
    this.props.getCommonArea().then(()=> this.setState({loading:false, modalLoading: false, editCommonAreaModal:false}));
    this.props.getMachines().then(()=> this.setState({loading:false, modalLoading: false, editCommonAreaModal:false}));
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


onSubmit = (e) => {console.log(commonAreaId,machineDetailId,machines)
    e.preventDefault();
    const {commonAreaId,machineDetailId,machines} = this.state
    
    let errors = {};
    if(this.state.commonAreaId===''){
        errors.commonAreaId="Common Area can't be empty"
    }
    else  if(this.state.machineDetailId===''){
        errors.machineDetailId="Machine Name can't be empty"
    }

    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0
    if(isValid){           
        this.setState({loading:true});
        this.props.addCommonAreaMachine(commonAreaId,machineDetailId,machines)
        .then(()=>
        this.props.history.push('/superDashboard/displayCommonAreaMachineMaster'))
        .catch(err=>{
            this.setState({message: err.response.data.message, loading: false})                    
        })
        this.setState({
            commonAreaId:'',
            commonArea: '',
            machineDetailId:'',
            machineActualId:''
        })   
        }      
    console.log(commonAreaId,machineDetailId)
}

getCommonArea= ({ getAreas }) => {
    if (getAreas && getAreas.commonAreas) {
        return getAreas.commonAreas.map((item) => {
            return (
                <option key={item.commonAreaId} value={item.commonAreaId}>
                    {item.commonArea}
                </option>
            )
        })
    }

} 

getMachine= ({getMachines}) => {console.log(getMachines)
    if(getMachines && getMachines.machines){
      return getMachines.machines.map((item)=>{  
          console.log(item.machineDetailId)
         return (   {...item,label:item.machineActualId,value:item.machineDetailId}          
        )
    })
}
}
logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}


push=()=>{
this.props.history.push('/superDashboard/displayCommonAreaMachineMaster')
}

close=()=>{
    return this.props.history.replace('/superDashBoard')
}

changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
}

machineChangeHandler=(name,selectOption)=>{
    console.log(selectOption)
    this.setState({
        [name]: selectOption.map((item)=>{return item.machineDetailId}),
        machines:selectOption.map((item)=>{return {machineDetailId:item.machineDetailId}})
    })
}
    

render() {
    let form;
    form=<div>
        <Row>
                        <Col md={6}>
                        <FormGroup >
                            <Label>Common Area</Label>                               
                            <Input  type="select" name="commonAreaId" defaultValue='no-value' onChange={this.handleChange}>                                     
                            <DefaultSelect/>
                            {this.getCommonArea(this.props.commonAreaReducer)}
                            </Input>
                            <span className="error">{this.state.message}</span>
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
                    
                    <Button color="success" className="mr-2">Submit</Button>             
                    <Button color="danger" onClick={this.push}>Cancel</Button>
                    </div>
                 
    return(       
            <div>       
                <UI onClick={this.logout} change={this.changePassword}>

                <Form onSubmit={this.onSubmit} >
                <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Add Common Area Machine</h3></div><br/>
                    
                        {!this.state.loading ? form : <Spinner />}                                                              
                </Form>
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
    return bindActionCreators({getCommonArea,getMachines,addCommonAreaMachine}, dispatch);
    }

export default connect(mapStateToProps, mapDispatchToProps)(CommonAreaMachine);
