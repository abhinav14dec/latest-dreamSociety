import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postFacilitySubMaster } from './../../actions/facilitySubMasterAction';
import {getFacility} from '../../actions/facilityAction';
import UI from '../../components/newUI/superAdminDashboard';
import { Form, Button, FormGroup, Input, Label, Row , Col } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';
import {onRateChange}  from '../../validation/validation';



class FacilitySubMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            facilityId:'',
            monthlyRateType:false,
            rateType:false,
            monthlyRate:'',
            unitRate:'',
            errors: {},
            message: '',
            loading:true,


            menuVisible: false,
        }
    }
    

    componentDidMount() {
        this.refreshData();
   
    }

    
    refreshData() {
        this.props.getFacility().then(()=> this.setState({loading:false, modalLoading: false, editModal:false}));;
       }  


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }


    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }

    subMasterDetails = () => {
        this.props.history.push('/superDashboard/facilitySubMasterDetails');
    }

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }

    monthlyRateChange = (e) => {
        let selected =e.target.value
        console.log(selected,"monthlyrate===========")
      
        if(!!document.getElementById('isCheckedMonthly').checked){
            console.log('is checked')
           this.setState({monthlyRate: this.state.monthlyRate, monthlyRateType:true,rateType:false})
        }
       else{
            this.setState({monthlyRate: '',unitRate: '' , monthlyRateType:false})
        }
    }

    rateChange = (e) => {
        let selected =e.target.value
        console.log(selected,"rate===========")
        if(!!document.getElementById('isCheckedRate').checked){
            console.log('is checked')
           this.setState({unitRate: this.state.unitRate, rateType:true, monthlyRateType:false})
        }
       else{
            this.setState({unitRate: '',monthlyRate: '' , rateType:false})
        }
    }

    onChange = (e) => {
        let selected =e.target.value
        console.log(selected,"facilityId===========")
        
        this.setState({facilityId: selected, message: '' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    onRateChange=(e)=>{
    
        //    console.log("=====================", e.target.value)
            if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
                console.log("=====================", e.target.value)
                this.setState({[e.target.name]:e.target.value});
                
            }}

            handleSubmit = (e) => {

                e.preventDefault();
                const {facilityId,monthlyRate, unitRate, monthlyRateType,rateType}= this.state
                
                let errors = {};
                if (this.state.facilityId === '') {
                    errors.facilityId = "cant be empty";
                }
                this.setState({ errors })
                const isValid = Object.keys(errors).length === 0
                if (isValid) {
                    this.setState({ loading: true })
                     console.log(this.state)
                    this.props.postFacilitySubMaster(facilityId, monthlyRate, unitRate,monthlyRateType,rateType)
                        .then(() => this.props.history.push('/superDashboard/facilitySubMasterDetails'))
                        .catch(err => {
                            this.setState({ message: err.response.data.message, loading: false })
                        })
                }
            }

            getFacilityData=({getFacility})=>{
                if(getFacility && getFacility.facilities){
                     console.log("facility==========",getFacility )  
                     return getFacility.facilities.map((item)=>{
                         return (
                            <option key={item.facilityId} value={item.facilityId}>
                            {item.facilityName}
                            </option>
                         )
                         
                     })
                 
                 
                }
          }

    render() {


        let formData;
        formData = <div>

            <FormGroup>
                <Label>Facility Sub Master</Label>
                <Input type="select" defaultValue='no-value' name="facilityId" onChange={this.onChange} >
                    <DefaultSelect />
                    {this.getFacilityData(this.props.facilityReducer)}
                </Input>
                <span className="error">{this.state.errors.facilityId}</span>
            </FormGroup>

            <FormGroup check>
              <Label >
                <Input type="radio" name="isChecked1" id="isCheckedMonthly" onChange={this.monthlyRateChange} checked={this.state.monthlyRateType===true ? true: false}/>{' '}
                Monthly Rate
              </Label>
            
            </FormGroup>


            { this.state.monthlyRateType ?
            <FormGroup>
                <Label>Monthly Rate</Label>
                <Input type="text" placeholder="Monthly Rate" value={this.state.monthlyRate} name="monthlyRate"   onChange={this.onRateChange} maxLength={10}>
                    
                </Input>
            </FormGroup>: '' }

            <FormGroup check>
              <Label>
                <Input type="radio" name="isChecked2" id="isCheckedRate" onChange={this.rateChange} checked={this.state.rateType===true ? true: false}/>{' '}
                Unit Per Rate
              </Label>
            </FormGroup>
            
            { this.state.rateType ?
            <FormGroup>
                <Label>Unit Per Rate</Label>
                <Input type="text" placeholder="unit rate" name="unitRate" value={this.state.unitRate} onChange={this.onRateChange} maxLength={10}>
                   
                </Input>
            </FormGroup>: '' }

            <Button color="success" className="mr-2">Submit</Button>
            <Button color="danger" onClick={this.subMasterDetails} >Cancel</Button>
          
        </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Facility Sub Master</h3>

                        {!this.state.loading ? formData : <Spinner />}
                    </Form>

                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state,"facilityReducer===========")
    return {
        facilityReducer: state.facilityReducer,
        FacilitySubMasterReducer:state.FacilitySubMasterReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({postFacilitySubMaster,getFacility}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(FacilitySubMaster));