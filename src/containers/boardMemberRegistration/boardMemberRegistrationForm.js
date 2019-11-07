import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity, getLocation} from '../../actions/societyMasterAction';
import {addMemberDetails, getMemberDesignation, getMemberDetails,getSocietyId} from '../../actions/boardMemberRegistrationAction';
import { Form, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import Spinner from '../../components/spinner/spinner';

class BoardMemberRegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            societyId:'',
            firstName:'',
            lastName:'',
            designationName:'',
            designationId:'',
            cityName:'',
            countryName:'',
            stateName:'',
            email:'',
            optionalMail:'',
            accountHolderName: '',
            bankName:'',
            locationId:'',
            locationName:'',
            currentAddress:'',
            permanentAddress:'',
            accountNumber:'',
            countryId:'',
            contactNumber:'',
            IFSCCode:'',
            panCardNumber:'',
            emailValidError:'',
            optionalContactNumber: '',
            stateId:'',
            cityId:'',
            dob:'',
            loading: true,
            errors: {},
            emailServerError:'',
            userNameServerError:'',
            contactServerError:'',
            currentAddressDefault:'',
            currentState:'',
            currentStateId:'',
            currentCity:'',
            currentCityId:'',
            currentState:'',
            currentStateId:'',
            currentLocation:'',
            permanentLocationId:'',
            currentAddressVisible:false,
            readOnly:'',
            permanentAddressDefault:'',
            editCurrent:true,
            pin:'',
            pin1:'',
            gender:'',
            pinCode:'',
            pinCode1:'',
            defaultCurrentAddress:''
        }

        this.cityName=this.cityName.bind(this);
    }

    componentDidMount=()=>{
        this.props.getCountry().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getState().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getCity().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getMemberDetails().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getMemberDesignation().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getSocietyId().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getLocation().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));  
        let societyId = localStorage.getItem('societyId')
        console.log(societyId);
        this.setState({societyId})
        console.log(this.state.societyId)
        this.setState({societyId: localStorage.getItem('societyId')})
        console.log(this.state.societyId)           
 }



 countryName = ({countryResult}) => {
    if(countryResult){
      
       return( 
        countryResult.map((item) =>{
               return(
                { ...item, label: item.countryName, value: item.countryId }
               )
           })
       )
        
    }
}
countryName1 = ({countryResult}) => {
    if(countryResult){
      
       return( 
        countryResult.map((item) =>{
               return(
                { ...item, label: item.countryName, value: item.countryId }
               )
           })
       )
        
    }
}

onChangeCountry = (countryId, countryName, selectOption) => {
    console.log(countryId, countryName, selectOption)

    this.setState({
        countryName: selectOption.countryName,
        countryId:selectOption.countryId, 
    })
    
    this.props.getState(selectOption.countryId)
    this.updatePermanentAddressonCountry(selectOption.countryName)
}


updatePermanentAddressonCountry = (countryName) => {
    console.log(countryName)
    this.setState({countryName})
    this.setState({permanentAddress: this.state.permanentAddressDefault  + ', ' + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') + ', ' +
    this.state.cityName + ', ' + this.state.stateName + ', ' + countryName + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('updatePermanentAddress', this.state.permanentAddress)
}

stateName = ({stateResult}) => {
    if(stateResult){
      console.log(stateResult)
       return( 
        stateResult.map((item) =>{ 
               return(
                { ...item, label: item.stateName, value: item.stateId }
               )
           })
       )
        
    }
}

stateName1 = ({stateResult}) => {
    if(stateResult){
      console.log(stateResult)
       return( 
        stateResult.map((item) =>{ 
               return(
                { ...item, label: item.stateName, value: item.stateId }
               )
           })
       )
        
    }
}

onChangeState = (stateName, stateId, selectOption) => {
    console.log(stateName, stateId, selectOption)
    this.setState({
        stateName: selectOption.stateName,
        stateId:selectOption.stateId
    })
    this.props.getCity(selectOption.stateId);
    this.updatePermanentAddressonState(selectOption.stateName)
}

updatePermanentAddressonState = (stateName) => {
    console.log(stateName)
    this.setState({stateName})
    this.setState({permanentAddress: this.state.permanentAddressDefault  + ', ' + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') + ', ' +
    this.state.cityName + ', ' + stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('updatePermanentAddress', this.state.permanentAddress)
}

cityName=({cityResult})=>{
   
    if(cityResult){
        
       return( 
        cityResult.map((item) =>{ 
               return(
                { ...item, label: item.cityName, value: item.cityId }
               )
           }
           )
       )
        
    }
}

cityName1=({cityResult})=>{
   
    if(cityResult){
        
       return( 
        cityResult.map((item) =>{ 
               return(
                { ...item, label: item.cityName, value: item.cityId }
               )
           }
           )
       )
        
    }
}

onChangeCity = (cityName, cityId, selectOption) => {
    console.log(cityName, cityId, selectOption)
    this.setState({
        cityName: selectOption.cityName,
        cityId:selectOption.cityId
    })
    this.props.getLocation(selectOption.cityId)
}

updatePermanentAddressonCity = (cityName) => {
    console.log(cityName)
    this.setState({cityName})
    this.setState({permanentAddress: this.state.permanentAddressDefault  + ', ' + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') + ', ' +
    cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('updatePermanentAddress', this.state.permanentAddress)
}


locationName=({locationResult})=>{
   if(locationResult){
        
       return( 
           locationResult.map((item) =>{ 
               return(
                { ...item, label: item.locationName, value: item.locationId }
               )
           }
           )
       )
        
    }
}

locationName1=({locationResult})=>{
    if(locationResult){
         
        return( 
            locationResult.map((item) =>{ 
                return(
                 { ...item, label: item.locationName, value: item.locationId }
                )
            }
            )
        )
         
     }
 }

onChangeLocation = (locationName, locationId, selectOption) => {
    console.log(locationName, locationId, selectOption)
    this.setState({
        locationName: selectOption.locationName,
        locationId:selectOption.locationId,
        
    })
    this.updatePermanentAddress1(selectOption.locationName)
}

updatePermanentAddress1 = (location) => {
    console.log(location)
    this.setState({location})
    this.setState({permanentAddress: this.state.permanentAddressDefault  + ', ' + location + ', ' +
    this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('updatePermanentAddress', this.state.permanentAddress)
}


countryChange = (currentCountryId, currentCountry, selectOption) => {
    console.log(currentCountryId, currentCountry, selectOption)

    this.setState({
        currentCountry: selectOption.countryName,
        currentCountryId:selectOption.countryId, 
    })
    
    this.props.getState(selectOption.countryId)
    this.updateCurrentAddressonCountry(selectOption.countryName)
}

updateCurrentAddressonCountry = (currentCountry) => {
    console.log(currentCountry)
    this.setState({currentCountry})
    this.setState({currentAddress: this.state.currentAddressDefault  + ', ' + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
    this.state.currentCity + ', ' + this.state.currentState + ', ' + currentCountry + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('currentAddress', this.state.currentAddress)
}


stateChange = (currentState, currentStateId, selectOption) => {
    console.log(currentState, currentStateId, selectOption)
    this.setState({
        currentState: selectOption.stateName,
        currentStateId:selectOption.stateId
    })
    this.props.getCity(selectOption.stateId);
}

updateCurrentAddressonState = (currentState) => {
    console.log(currentState)
    this.setState({currentState})
    this.setState({currentAddress: this.state.currentAddressDefault  + ', ' + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
    this.state.currentCity + ', ' + currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('currentAddress', this.state.currentAddress)
}

cityChange = (currentCity, currentCityId, selectOption) => {
    console.log(currentCity, currentCityId, selectOption)
    this.setState({
        currentCity: selectOption.cityName,
        currentCityId:selectOption.cityId
    })
    this.props.getLocation(selectOption.cityId)
}

updateCurrentAddressonCity = (currentCity) => {
    console.log(currentCity)
    this.setState({currentCity})
    this.setState({currentAddress: this.state.currentAddressDefault  + ', ' + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
    currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('currentAddress', this.state.currentAddress)
}


locationChange = (currentLocation, currentLocationId, selectOption) => {
    console.log(currentLocation, currentLocationId, selectOption)
    this.setState({
        currentLocation: selectOption.locationName,
        currentLocationId:selectOption.locationId,
        
    })
    this.updateCurrentAddress1(selectOption.locationName)
}

updateCurrentAddress1 = (location) => {
    console.log(location)
    this.setState({location})
    this.setState({currentAddress: this.state.currentAddressDefault  + ', ' + location + ', ' +
    this.state.currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip Code: ' + this.state.pin})
    console.log('currentAddress', this.state.currentAddress)
}

 close=()=>{
    return this.props.history.replace('/superDashBoard')
}

logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/');
}

defaultPermanentAddressChange = (e) =>{
    this.setState({defaultCurrentAddress: this.state.correspondenceAddress ,permanentAddress: e.target.value})
}

onChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value.trim(), errors });
    }
    else {
        this.setState({ [e.target.name]: e.target.value.trim() });
    }
    
}

fetchDesignation = ({designation}) => {
    console.log(designation)
    if(designation && designation.designation){
       return designation.designation.map((item) => {
            return (
                <option key={item.designationId} value={item.designationId}>{item.designationName}</option>
            )
        })
    }
}

// sameAddress = (e) => {
//     if(!!document.getElementById('isChecked').checked){
//         console.log('is checked')
//        this.setState({permanentAddress: this.state.currentAddress.trim()})
//        document.getElementById('currenttaddr').disabled = true;
//     }
//    else{
//         this.setState({permanentAddress: ''})
//         document.getElementById('currenttaddr').disabled = false;
//     }
// }
sameAddress = () => {
    console.log(this.state)
    if(!!document.getElementById('isChecked').checked){
        console.log('is checked')
       this.setState({currentAddress: this.state.permanentAddress, currentAddressVisible:true, editCurrent:false})
    }
   else{
        this.setState({currentAddress: '' , currentAddressVisible:false, editCurrent:true})
    }
}

keyPress = (event) => {
    const pattern = /^[a-zA-Z0-9_, ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
    // else{    
    //     document.getElementById('isChecked').checked = false;
    //     document.getElementById('currenttaddr').disabled = false;
    //     this.setState({permanentAddress: ''});
    // }
    
}

submit = (e) => {
    e.preventDefault()
    console.log(this.state)       
    let errors = {};
        if(this.state.firstName === ''){
            errors.firstName = `First Name can't be empty.`
        }
        if(this.state.gender === '') errors.gender = `Gender can't be empty`
        if(this.state.lastName === ''){
            errors.lastName = `Last Name can't be empty.`
        }
        if(!this.state.designationId){
            errors.designationId = `Designation can't be empty.`
        }
        if(document.getElementById('isChecked').checked === false){
            if(this.state.pin === '') {
                errors.pin = `Please enter Pin/Zip Code.`}
        }
        
        if(this.state.pin1 === '') {
            errors.pin1 = `Please enter Pin/Zip Code.`}
        if(document.getElementById('isChecked').checked === false){
            if(this.state.currentAddressDefault === '') errors.currentAddressDefault = `Current Address can't be empty.`;
        }
        if(this.state.permanentAddressDefault === '') errors.permanentAddressDefault = `Permanent Address can't be empty.`;
        if(this.state.contactNumber === '') errors.contactNumber = `Contact can't be empty.`;
        else if(this.state.contactNumber.length !== 10) errors.contactNumber = "Contact length should be of 10."
        if(this.state.email === '') errors.email = `Email can't be empty.`;
        if(this.state.bankName === '') errors.bankName = `Bank Name can't be empty.`;
        if(this.state.accountHolderName === '') errors.accountHolderName = `Account Holder Name can't be empty.`;
        if(this.state.accountNumber === '') errors.accountNumber = `Account number can't be empty.`;
        if(this.state.panCardNumber === '') errors.panCardNumber = `Pan card number can't be empty.`;
        if(this.state.IFSCCode === '') errors.IFSCCode = `IFSC code can't be empty.`;
        if(this.state.dob === '') errors.dob = `Date of birth can't be empty.`;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid && this.state.emailValidError===''){
            this.setState({loading: true});
            console.log(this.state)
            this.props.addMemberDetails(this.state)
            .then(() => this.props.history.push('/superDashboard/boardMemberDetails'))
            .catch(err => {
                err.response.data;
                console.log(err.response.data)
                this.setState({emailServerError: err.response.data.messageEmailErr, userNameServerError:err.response.data.messageUsernameErr,
                    contactServerError: err.response.data.messageContactErr,loading: false})
            });
            
        }
        
}

OnKeyPresshandlerPhone(event) {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

OnKeyPressUserhandler(event) {
    const pattern = /^[a-zA-Z ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

fNameKeyPress(event){
    const pattern = /^[a-zA-Z]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

bankValidation(e){
    const pattern = /^[a-zA-Z0-9_, ]+$/;
    let inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
        e.preventDefault();
    }
}

emailValid(event) {
    const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

emailChange = (e) => {
    console.log(this.state.email)
    this.setState({errors:{email: ''}})
    this.setState({email:e.target.value, emailServerError:''})
    if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
        this.setState({[e.target.name]:e.target.value.trim()});
        console.log(this.state.email)
        this.setState({emailValidError: ''})
    }
    else{ this.setState({emailValidError: 'Invalid Email.'})}
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        console.log(this.state.email)
        this.setState({ [e.target.name]: e.target.value.trim(), errors });
    }
    else {
        this.setState({email:e.target.value});
    }
    
}

fetchSocietyId = ({boardId}) => {
    if(boardId){
        return boardId.map((item) => {
            return (
                <option value={item.societyId} key={item.societyId}>{item.societyName}</option>
            )
        })
    }
}
route =() =>{
    this.props.history.push('/superDashboard/boardMemberDetails');
}

maxDate = () => {
    var d = new Date();
    d.setFullYear(d.getFullYear()-18, d.getMonth());
    return d.toISOString().split('T')[0];
}

changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
 }

ifscChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value.toUpperCase().trim(), errors });
    }
    else {
        this.setState({[e.target.name]:e.target.value.toUpperCase().trim()});
    }
    
}

panChange = (e) => {
    console.log(this.state.panCardNumber)
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value.toUpperCase(), errors });
    }
    else {
        this.setState({panCardNumber:e.target.value.toUpperCase()})
    }
    
}

permanentAddressChange = (e) => {
    console.log(this.state)
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ permanentAddressDefault: e.target.value, permanentAddress: e.target.value  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
        this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1 , errors });
    }
    else {
        this.setState({permanentAddressDefault: e.target.value, permanentAddress: e.target.value  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
        this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1})
    }
    if(!!document.getElementById('isChecked').checked){
        this.setState({currentAddress: e.target.value + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
        this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1})
    }
}

currentAddressChange = (e) => {
    console.log(this.state)
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ currentAddressDefault: e.target.value, currentAddress: e.target.value  + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
        this.state.currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip code: ' + this.state.pin , errors });
    }
    else {
        this.setState({currentAddressDefault: e.target.value, currentAddress: e.target.value  + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
        this.state.currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip code: ' + this.state.pin})
    }
}

pinChange = (e) => {
    
    console.log(this.state)
    if (!!this.state.errors[e.target.name]) {
        
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value, errors });
    }
    else {
        
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state)
        
    }
    this.updateCurrentAddress(e.target.value)
    
}

updateCurrentAddress = (pin) => {
    console.log(pin)
    this.setState({pin})
    this.setState({currentAddress: this.state.currentAddressDefault  + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
    this.state.currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip Code: ' + pin})
    console.log('currentAddress', this.state.currentAddress)
}

pinChange1 = (e) => {
    console.log(this.state)
    
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value, errors });
        
    }
    else {
        
        this.setState({[e.target.name]: e.target.value});
        
    }
    this.updatePermanentAddress(e.target.value)
    
}

updatePermanentAddress = (pin1) => {
    console.log(pin1)
    this.setState({pin1})
    this.setState({permanentAddress: this.state.permanentAddressDefault  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
    this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + pin1})
    console.log('updatePermanentAddress', this.state.permanentAddress)
}

    render(){
        let formData = <div style={{marginBottom:'20px'}}>
            {/* <FormGroup>
                        <Label>Society Name</Label>
                        <Input type="select"
                        name="societyId"
                        onChange={this.onChange}
                        defaultValue="no-value"
                         >
                            <DefaultSelect />
                            {this.fetchSocietyId(this.props.boardMemberReducer)}
                        </Input>
                        {!this.state.societyId ? <span className="error">{this.state.errors.societyId}</span>: ''}
                    </FormGroup> */}
                    <FormGroup>
                        <Row md={12}>
                            <Col md={3}>
                                <Label>First Name</Label>
                                <Input type='text'
                                placeholder="First Name"
                                name='firstName' 
                                onChange={this.onChange}
                                maxLength="70"
                                onKeyPress={this.fNameKeyPress} />
                                {<span className="error">{this.state.errors.firstName}</span>}
                            </Col>
                            <Col md={3}>
                                <Label>Last Name</Label>
                                <Input type='text'
                                placeholder="Last Name"
                                name='lastName' 
                                onChange={this.onChange}
                                maxLength="70"
                                onKeyPress={this.fNameKeyPress} />
                                {<span className="error">{this.state.errors.lastName}</span>}
                            </Col>
                            <Col md={3}>
                                <Label>Date of Birth</Label>
                                <Input type="date" max={this.maxDate()} name="dob" onChange={this.onChange} />
                                {<span className="error">{this.state.errors.dob}</span>}
                            </Col>
                            <Col md={3}>
                                <Label>Designation</Label>
                                <Input type='select'
                                defaultValue='no-value' 
                                name='designationId' 
                                onChange={this.onChange} >
                                    <DefaultSelect />
                                    {this.fetchDesignation(this.props.boardMemberReducer)}
                                </Input>
                                {<span className="error">{this.state.errors.designationId}</span>}
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <div>
                            <Label>Gender:</Label>
                            <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                            <span><Input type="radio" id="Gender1" name="gender" onChange={this.onChange} value="Male"/></span>
                            
                            
                            <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                            <span><Input type="radio" id="Gender2" name="gender" onChange={this.onChange} value="Female"/></span>
                            
                            
                            <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                            <span><Input type="radio" id="Gender3" name="gender" onChange={this.onChange} value="Other"/></span>
                        </div>
                        <div>
                            {<span className="error">{this.state.errors.gender}</span>}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Row md={12}>
                            <Col md={6}>
                                <Label>Contact Number</Label>
                                <Input placeholder="Contact Number"
                                type="text"
                                name="contactNumber" 
                                onChange={this.onChange}
                                onKeyPress={this.OnKeyPresshandlerPhone}
                                maxLength='10'
                                minLength='10' />
                                {this.state.contactServerError ? <span className='error'>{this.state.contactServerError}</span> : null}
                                {<span className="error">{this.state.errors.contactNumber}</span> }
                            </Col>
                            <Col md={6}>
                                <Label>Optional Contact Number</Label>
                                <Input 
                                placeholder="Optional Contact Number" 
                                type="text" 
                                name="optionalContactNumber" 
                                onChange={this.onChange}
                                onKeyPress={this.OnKeyPresshandlerPhone}
                                maxLength='10'
                                minLength='10' />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row md={12}>
                            <Col md={6}>
                                <Label>Email</Label>
                                <Input 
                                placeholder="Email" 
                                type="email" 
                                name="email" 
                                maxLength="70"
                                onChange={this.emailChange}
                                onKeyPress={this.emailValid} />
                                {this.state.emailServerError ? <span className="error">{this.state.emailServerError}</span> : null}
                                <span><br/></span>
                                {<span className="error">{this.state.errors.email}</span>}
                                {<span className="error">{this.state.emailValidError}</span>}
                            </Col>
                            <Col md={6}>
                                <Label>Optional Mail</Label>
                                <Input 
                                placeholder="Optional Mail" 
                                type="email" 
                                name="optionalMail" 
                                onChange={this.onChange} />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup style={{paddingTop:'20px'}}>
                        <h4 style={{textAlign:'center', fontWeight:'600', marginBottom:'20px'}}>Permanent Address</h4>
                        <FormGroup>
                            <Row md={12}>
                                <Col md={3}>
                                    <Label>Country</Label>
                                    <Select placeholder={<DefaultSelect/>} options={this.countryName(this.props.societyReducer)} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
                                </Col>
                                <Col md={3}>
                                    <Label>State</Label>
                                    <Select placeholder={<DefaultSelect/>} options={this.stateName(this.props.societyReducer)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
                                </Col>
                                <Col md={3}>
                                    <Label>City</Label>
                                    <Select placeholder={<DefaultSelect/>} options={this.cityName(this.props.societyReducer)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                                </Col>
                                <Col md={3}>
                                    <Label>Location</Label>
                                    <Select placeholder={<DefaultSelect/>} options={this.locationName(this.props.societyReducer)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
                                </Col>
                            </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row md={12}>
                            <Col md={4}>
                                <Label>Pin/Zip Code</Label>
                                <Input type="text" onChange={this.pinChange1}
                                maxLength="6" minLength="5" onKeyPress={this.OnKeyPresshandlerPhone}
                                    name="pin1" placeholder="Pin/Zip Code" />
                                    <span className="error">{this.state.errors.pin1}</span>
                            </Col>                        
                            <Col md={8}>
                                <Label>Address</Label>
                                <Input id="currentAddress" 
                                disabled={!(this.state.countryId && this.state.stateId
                                    && this.state.cityId)}
                                type="textarea" 
                                placeholder="Permanent Address" 
                                name="permanentAddressDefault" 
                                onChange={this.permanentAddressChange}
                                maxLength='250' />
                                { <span className="error">{this.state.errors.permanentAddressDefault}</span> }
                            </Col>
                        </Row>
                </FormGroup>
                    </FormGroup>
                    
                    <FormGroup style={{paddingTop:'20px'}}>
                        <h4 style={{textAlign:'center', fontWeight:'600', marginBottom:'20px'}}>Current Address</h4>
                        <FormGroup>
                            <span style={{fontWeight:'600'}}>Is Your Current address same as above?</span><Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
                        </FormGroup>
                        {this.state.currentAddressVisible ? <FormGroup>
                            <Label>Current Address</Label>
                            <Input type="textarea" id="currenttaddr" disabled maxLength="500" value={this.state.permanentAddress} name="defaultCurrentAddress" onChange={this.defaultCurrentAddress} />
                        </FormGroup> : ''}
                        {this.state.editCurrent ? <div>
                            <FormGroup>
                                <Row md={12}>
                                    <Col md={3}>
                                        <Label>Country</Label>
                                        <Select placeholder={<DefaultSelect/>} options={this.countryName1(this.props.societyReducer)} onChange={this.countryChange.bind(this, 'currentCountry', 'currentCountryId')} />
                                    </Col>
                                    <Col md={3}>
                                        <Label>State</Label>
                                        <Select placeholder={<DefaultSelect/>} options={this.stateName1(this.props.societyReducer)} onChange={this.stateChange.bind(this, 'currentState', 'currentStateId')} />
                                    </Col>
                                    <Col md={3}>
                                        <Label>City</Label>
                                        <Select placeholder={<DefaultSelect/>} options={this.cityName1(this.props.societyReducer)} onChange={this.cityChange.bind(this, 'currentCity', 'currentCityId')} />
                                    </Col>
                                    <Col md={3}>
                                        <Label>Location</Label>
                                        <Select placeholder={<DefaultSelect/>} options={this.locationName1(this.props.societyReducer)} onChange={this.locationChange.bind(this, 'currentLocation', 'currentLocationId')} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            
                            <FormGroup>
                                <Row md={12}>
                                    <Col md={4}>
                                        <Label>Pin/Zip Code</Label>
                                        <Input type="text" onChange={this.pinChange}
                                        maxLength="6" minLength="5" onKeyPress={this.OnKeyPresshandlerPhone}
                                            name="pin" placeholder="Pin/Zip Code" />
                                        {<span className="error">{this.state.errors.pin}</span>}
                                    </Col>
                                    <Col md={8}>
                                        <Label>Address</Label>
                                        <Input id="currenttaddr"
                                        type="textarea"
                                        disabled={!(this.state.currentCountryId && this.state.currentStateId && this.state.currentCityId)} 
                                        placeholder="Current Address" 
                                        name="currentAddressDefault" 
                                        onChange={this.currentAddressChange}
                                        maxLength='250' />
                                        {<span className="error">{this.state.errors.currentAddressDefault}</span> }
                                    </Col>
                                </Row>
                            </FormGroup>
                        </div> : ''}
                    </FormGroup>
                    <FormGroup style={{margin:'20px auto'}}>
                        <h4 style={{textAlign:'center', fontWeight:'600', marginBottom:'20px'}}>Bank Details</h4>
                    </FormGroup>
                    <FormGroup>

                        <Row md={12}>
                            <Col md={3}>
                                <Label>Bank Name</Label>
                                <Input 
                                placeholder="Bank Name" 
                                type="text" 
                                name="bankName" 
                                onChange={this.onChange}
                                maxLength="70"
                                onKeyPress={this.bankValidation} />
                                {<span className="error">{this.state.errors.bankName}</span>}
                            </Col>
                            <Col md={3}>
                                <Label>IFSC Code</Label>
                                <Input
                                placeholder="IFSC Code"
                                type="text" 
                                name="IFSCCode" 
                                value={this.state.IFSCCode.toUpperCase()}
                                onChange={this.ifscChange}
                                onKeyPress={(e) => {
                                    const pattern = /^[a-zA-Z0-9]+$/;
                                    let inputChar = String.fromCharCode(e.charCode);
                                    if (!pattern.test(inputChar)) {
                                        e.preventDefault();
                                    }
                                }} 
                                minLength='11'
                                maxLength='11' />
                                {<span className="error">{this.state.errors.IFSCCode}</span>}
                            </Col>
                            <Col md={3}>
                                <Label>Account Holder Name</Label>
                                <Input placeholder="Account Holder Name"
                                type="text"
                                name="accountHolderName"
                                maxLength="70" 
                                onChange={this.onChange}
                                onKeyPress={this.OnKeyPressUserhandler} />
                                {<span className="error">{this.state.errors.accountHolderName}</span>}
                            </Col>
                            <Col md={3}>
                                <Label>Account Number</Label>
                                <Input
                                placeholder="Account Number" 
                                type="text" 
                                name="accountNumber" 
                                onChange={this.onChange}
                                maxLength='18'
                                onKeyPress={this.OnKeyPresshandlerPhone} />
                                {<span className="error">{this.state.errors.accountNumber}</span>}
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row md={12}>
                            <Col md={6}>
                                <Label>Pan Card Number</Label>
                                <Input 
                                placeholder="Pan Card Number"
                                type="text"
                                value={this.state.panCardNumber.toUpperCase()} 
                                name="panCardNumber"
                                minLength='10'
                                maxLength='10'
                                onKeyPress={(e) => {
                                    const pattern = /^[a-zA-Z0-9]+$/;
                                    let inputChar = String.fromCharCode(e.charCode);
                                    if (!pattern.test(inputChar)) {
                                        e.preventDefault();
                                    }
                                }} 
                                onChange={this.panChange} />
                                {<span className="error">{this.state.errors.panCardNumber}</span>}
                            </Col>
                            <Col md={6}>
                            
                            </Col>
                        </Row>
                    </FormGroup>
                    <Button color="success" className="mr-2">Add Member</Button>
                    <Button color="danger" onClick={this.route}>Cancel</Button>
            </div>
        return(
            <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.submit} method="POST">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Board Member Details</h3></div>
                    {!this.state.loading ? formData : <Spinner />}
                </Form>
            </UI>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        societyReducer: state.societyReducer,
        boardMemberReducer: state.boardMemberReducer    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity,addMemberDetails,
        getMemberDesignation, getMemberDetails, getSocietyId, getLocation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardMemberRegistrationForm);