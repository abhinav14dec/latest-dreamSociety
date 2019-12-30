import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Form, Row, Col, FormGroup, Label, Input,Button } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import { getElectricityBillInfo,getElectricityBillUpdate} from '../../actions/maintenanceBillAction';
import { viewTower } from '../../actions/towerMasterAction';
import Spinner from '../../components/spinner/spinner';





class ElectricityBillGeneration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            towerId:'',
            entryDate:'',
            currentReading:'',
            unitConsumed:[],
            unitConsumeIndex:[],
            monthlyCharges:'',
            loading: false,
            errors: {},
            message: '',
            ids:[],
        }
    }

    componentDidMount() {
        this.props.viewTower().then(() => this.setState({ loading: false })).catch(() => this.setState({ loading: false }));
    }


    handleChange = (event) => {
        let towerId = event.target.value
        this.setState({ message: '' })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
         this.props.getElectricityBillInfo(towerId).then(res=>{
             if(res){
                 this.setState({ids:res.payload.electricityCharges})
             }
         });
    }

    dateChange=(event)=>{
       let selected=event.target.value
       this.setState({entryDate:selected})
    }

    onChangeUnit=(initialReading,value,index,event)=>{
        this.setState({[event.target.name]:event.target.value})
       console.log('index...', this.state.ids)
       let units=event.target.value-initialReading
       let unitConsumed=this.state.unitConsumed
       let ids=this.state.ids?this.state.ids.map(item=>{
           return item.electricityChargesId
       }):''
       if(ids.includes(value)){
           unitConsumed[index]=units
       }
       else{
           unitConsumed[index]=0
       }
       this.setState({unitConsumed})
    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    
              
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

     minDate=()=>{
        var d =new Date();
        return d.toISOString().split('T')[0];
    }

    submitHandle=(id,monthlyCharges)=>{
        const {entryDate,currentReading,unitConsumed}=this.state
        console.log('Final value....',unitConsumed )
        let payload={
               entryDate:entryDate,
               currentReading:Number(currentReading),
               monthlyCharges:monthlyCharges,
               unitConsumed:unitConsumed[0]
        }
        
        this.props.getElectricityBillUpdate(id,payload);

        this.setState({
            entryDate:'',currentReading:'',monthlyCharges:'',unitConsumed:''
        })
    }


    renderElectricity = ({ getElectricityBill }) => {
        if (getElectricityBill && getElectricityBill.electricityCharges) {
            return getElectricityBill.electricityCharges.map((item, index) => {
                let rate=Number(item.maintenance_type_master.rate)
                
                return (
                    <tr key={item.electricityChargesId}>
                        <td>{index + 1}</td>
                        <td>{item.flat_detail_master.floor_master.floorName}</td>
                        <td>{item.flat_detail_master.flatNo}</td>
                        <td>{item.lastReadingDate ? item.lastReadingDate : ''}</td>
                        <td><Input type="date" min={this.minDate()} onChange={this.dateChange}/></td>
                        <td>{item.initialReading}</td>
                        <td><Input type="text" name= "currentReading"placeholder="unit" onChange={this.onChangeUnit.bind(this,item.initialReading,item.electricityChargesId,index)}/></td>
                        <td>{this.state.unitConsumed[index]}</td>
                        <td>{ this.state.unitConsumed[index]? rate*this.state.unitConsumed[index]:''}</td>
                        <td><Button color="success" onClick={()=>this.submitHandle(item.electricityChargesId,rate*this.state.unitConsumed[index])}>Submit</Button></td>
                    </tr>
                )
            })
        }
    }

    towerData = ({ tower }) => {
        if (tower && tower.tower) {
            return tower.tower.map((data) => {
                return (
                    <option key={data.towerId} value={data.towerId}>
                        {data.towerName}
                    </option>
                )
            })
        }
    }


    render() {
        let formData = <div>
             <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label>Tower</Label>
                        <Input type="select" name="towerId" defaultValue='no-value' onChange={this.handleChange}>
                            <DefaultSelect />
                            {this.towerData(this.props.TowerDetails)}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <div style={{ backgroundColor: 'lightgray' }}>
                <Table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Floor No</th>
                            <th>Flat No</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Initial Reading</th>
                            <th>Current Reading</th>
                            <th>Unit Consume</th>
                            <th>Monthly Charges</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderElectricity(this.props.MaintenanceBillReducer)}
                    </tbody>
                </Table>
            </div>
        </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.onSubmit} >

                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Electricity Bill Generation</h3></div><br />
                        {!this.state.loading ? formData : <Spinner />}
                    </Form>
                </UI>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        MaintenanceBillReducer: state.MaintenanceBillReducer,
        TowerDetails: state.TowerDetails
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getElectricityBillInfo,viewTower,getElectricityBillUpdate }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ElectricityBillGeneration);