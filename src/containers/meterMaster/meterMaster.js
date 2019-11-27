import React, { Component } from 'react';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
// import './countryMaster.css';
import { connect } from 'react-redux';
import { AddMeter } from '../../actions/meterAction';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';

class MeterMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meterName: '',
            initialReading: '',
            // currency: '', 
            // phoneCode: '',
            errors: {},
            message:'',
            isSubmit: false,
            loading:false,
            menuVisible: false
        }
    }

    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        this.setState({loading: false})
    }

    onChange = (e) => {
        this.setState({message: ''})
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        } else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }


    }

    OnKeyPresshandlerPhone = (event) => {
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};

        if (this.state.meterName === '') errors.meterName = "Cant be empty";

        if (this.state.initialReading === '') errors.initialReading = "Cant be empty";
        // else if(this.state.code.length.<98) errors.code ="Country code should be in captital";
        // else if (this.state.code.length !== 3 && this.state.code.length !== 2) errors.code = "Characters should be of length 2 or 3."
        // if (this.state.currency === '') errors.currency = "Cant be empty";

        // if (this.state.phoneCode === '') errors.phoneCode = "Cant be empty";

        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        // let codeChar = this.state.code.toUpperCase();
        if (isValid) {

            this.setState({ loading: true })
            this.props.AddMeter({ ...this.state })
            .then(() => this.props.history.push('/superDashboard/meterMaster/meterMasterDetails'))
            .catch((err)=>{
                this.setState({loading:false, message:err.response.data.message})})

            this.setState({
                countryName: '',    
                code: '',
                currency: '',
                phoneCode: '',
                isSubmit: true
            });
        }
    }

    countryDetails = () => {
        this.props.history.push('/superDashboard/meterMaster/meterMasterdetails');
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressHandle=(event)=> {
        const pattern = /^[0-9+.]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressHandle1=(event)=>{
        const pattern = /^[a-zA-Z$ ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressCode=(event)=>{
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onChangeCountry=(e)=>{
        // let codeDetails= e.target.value.toUpperCase();
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.toUpperCase().trim(''), errors });
        } else {
        this.setState({code:e.target.value.toUpperCase().trim('')});

    }
}
         
    close=()=>{
        return this.props.history.replace('/superDashBoard');
    }
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword');
     }


    render() {
          
          let form;
             form=<div>
            <FormGroup>
                <Label>Meter Id Number</Label>
                <Input
                    type="text"
                    placeholder="Meter Id Number"
                    name="meterName"
                    // onKeyPress={this.onKeyPressHandler}
                    maxLength='14'
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.meterName}</span>
                <span className='error'>{this.state.message}</span>
            </FormGroup>
            {/* <FormGroup>
                <Label>Country Code</Label>
                <Input
                    name="code"
                    type="text"
                    className="TextTransformToCapital"
                    placeholder="Country Code"
                    maxLength='3'
                    // value={this.state.code.toUpperCase()}
                    onKeyPress={this.onKeyPressCode}
                    // value={this.state.code.toUpperCase()}
                    onChange={this.onChangeCountry} />
                <span className='error'>{this.state.errors.code}</span>
            </FormGroup>
            <FormGroup>
                <Label>Currency</Label>
                <Input
                    type="text"
                    name="currency"
                    placeholder="Currency"
                    onKeyPress={this.onKeyPressHandle1}
                    maxLength='40'
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.currency}</span>
            </FormGroup> */}

            <FormGroup>
                <Label>Initial Reading</Label>
                <Input
                    type="text"
                    name="initialReading"
                    placeholder="Initial Reading"
                    maxLength='6'
                    onKeyPress = {this.onKeyPressHandle}
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.initialReading}</span>
            </FormGroup>


            <FormGroup>
                <Button color="success" className="mr-2">Submit</Button>
                    <Button color="danger" onClick={this.countryDetails}>Cancel</Button>
            </FormGroup>
              </div>

        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.submit}>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>

                    <h3 style={{textAlign:'center', marginBottom: '10px'}}> Meter Id Master</h3>
                    {!this.state.loading ? form : <Spinner /> }
                </Form>
                </UI>

            </div>
        )

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddMeter }, dispatch)
}
export default connect(null, mapDispatchToProps)(MeterMaster);