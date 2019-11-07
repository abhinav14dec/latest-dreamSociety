import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getServiceType } from '../../../actions/serviceMasterAction';
import { addVendorMaster, getRateType,getVendorMaster } from '../../../actions/vendorMasterAction';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import UI from '../../../components/newUI/superAdminDashboard';
import {getCountry,getState,getCity, getLocation} from '../../../actions/societyMasterAction';
import DefaultSelect from '../../../constants/defaultSelect';
import Spinner from '../../../components/spinner/spinner';
import { PlaceHolder } from '../../../actionCreators/index';
import {getRfId} from '../../../actions/rfIdAction';

class vendorMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            contact: '',
            email:'',
            currentAddress: '',
            permanentAddress: '',
            serviceId1: {
                serviceId: '',
            },
            serviceId2: {
                serviceId: ''
            },
            serviceId3: {
                serviceId: ''
            },
            rateId1: {
                rateId: ''
            },
            rateId2: {
                rateId: ''
            },
            rateId3: {
                rateId: ''
            },
            rate1: '',
            rate2: '',
            rate3: '',
            dailyServices1:false,
            dailyServices2:false,
            dailyServices3:false,
            documentOne: '',
            documentTwo:'', 
            profilePicture: '',
            loading:true,
            menuVisible: false,
            errors:{},
            message:'',
            defaultCurrentAddress:'',
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
            emailError:false,
            rfidId:''
            
        }
        this.handleChange = this.handleChange.bind(this);

    }

    OnKeyPressUserhandler=(event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
      


    handleChange(e) {
        this.setState({message:''})
        if(!!this.state.errors[e.target.name]){ 
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({[e.target.name]:e.target.value});
            }
    }

    dailyServicesOnChange=(event)=>{
        this.setState({ [event.target.name]: event.target.checked},function(){
            console.log(this.state.dailyServices1)}
        )
    }

    onRateChange=(e)=>{
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});    
        }
    } 

    onServiceChange1 =(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ serviceId1: { serviceId: e.target.value } })
        }
    }

    onServiceChange2 =(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ serviceId2: { serviceId: e.target.value } })
        }
    }

    onServiceChange3 =(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ serviceId3: { serviceId: e.target.value } })
        }
    }

    onRateChange1=(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ rateId1: { rateId: e.target.value } })
        }
    }

    onRateChange2=(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value,errors});
        }
        else{
            this.setState({ rateId2: { rateId: e.target.value } })
        }
    }

    onRateChange3=(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.value.errors});
        }
        else{
            this.setState({ rateId3: { rateId: e.target.value } })
        }
    }


    selectImages = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.files[0],errors});
        }
        else{
        this.setState({
            profilePicture: e.target.files[0]
        })
    }
    }

    selectImage = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.files[0],errors});
        }
        else{
        this.setState({
            documentOne: e.target.files[0]
        })
    }
    }
     
    selectImage2=(e)=>{
        if(!!this.state.errors[e.target.name]){
            let errors =Object.assign({},this.state.errors)
            delete  errors[e.target.name]
            this.setState({[e.target.name]:e.target.files[0],errors});
        }
        else{
        this.setState({
            documentTwo: e.target.files[0]
        })
    }
    }

    componentDidMount() {
        this.refreshData();
    }
    
    refreshData=()=>{
        this.props.getRfId();
        this.props.getVendorMaster();
        this.props.getServiceType();
        this.props.getRateType();
        this.props.getCountry().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getState().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getCity().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
        this.props.getLocation().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
    }

    push=()=>{
        this.props.history.push('/superDashboard/displayVendorMaster');
     
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    

    getDropDown = ({ item }) => {
        if (item) {
            return item.map((item) => {
                return (
                    <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName + " | " + item.service_detail_master.service_detail}
                    </option>
                )
            })
        }

    }

    getRate = ({ rate }) => {
        if (rate && rate.rate) {
            return rate.rate.map((item) => {
                return (
                    <option key={item.rateId} value={item.rateId}>
                        {item.rateType}
                    </option>
                )
            })
        }

    } 

    onSubmit = (event) => {
        event.preventDefault();
        let errors = {};
        if(this.state.firstName===''){
            errors.firstName="First Name can't be empty"
        }
              
            else if(this.state.permanentAddressDefault===''){
                errors.permanentAddressDefault="Permanent Address can't be empty"
            }
            else if(this.state.pin1===''){
                errors.pin1="Pincode can't be empty"
            }

            if(this.state.pin===''){
                errors.pin="Pincode can't be empty"
            }    
            else if(document.getElementById('isChecked').checked === false){
                if(this.state.currentAddressDefault === '') errors.currentAddressDefault = `Current Address can't be empty.`;
            }
            
          
            if(this.state.contact === '') errors.contact= `Contact can't be empty.`;
            else if(this.state.contact.length !== 10) errors.contact= `Contact should be of 10 digit.`;

            else if(this.state.email===''){
                errors.email="Email can't be empty"                
            }
            else if(this.state.rfidId===''){
                errors.rfidId="Email can't be empty"                
            }
            else if(this.state.serviceId1.serviceId===''){
                errors.serviceId1="Service Id1 can't be empty"
            }      
            else if(this.state.rateId1.rateId===''){
                errors.rateId1="Rate Id1 can't be empty"
            }       
            else if(this.state.rate1===''){
                errors.rate1="Rate1 can't be empty"
            }
            else if(this.state.documentOne===''){
                errors.documentOne="Document One can't be empty"
            }
            else if(this.state.documentTwo===''){
                errors.documentTwo="Document Two can't be empty"
            }
            else if(this.state.profilePicture===''){
                errors.profilePicture="Picture can't be empty"
            }
        const formData=new FormData();
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
        this.setState({loading: true})
        
        formData.append('firstName',this.state.firstName)
        formData.append('lastName',this.state.lastName)
        formData.append('contact',this.state.contact)
        formData.append('email',this.state.email)
        formData.append('currentAddress',this.state.currentAddress)
        formData.append('permanentAddress',this.state.permanentAddress)
        formData.append('serviceId1',this.state.serviceId1.serviceId)
        formData.append('serviceId2',this.state.serviceId2.serviceId)
        formData.append('serviceId3',this.state.serviceId3.serviceId)
        formData.append('rateId1',this.state.rateId1.rateId)
        formData.append('rateId2',this.state.rateId2.rateId)
        formData.append('rateId3',this.state.rateId3.rateId)
        formData.append('rate1',this.state.rate1)
        formData.append('rate2',this.state.rate2)
        formData.append('rate3',this.state.rate3)
        formData.append('dailyServices1',this.state.dailyServices1)
        formData.append('dailyServices2',this.state.dailyServices2)
        formData.append('dailyServices3',this.state.dailyServices3)
        formData.append('profilePicture',this.state.profilePicture,this.state.profilePicture.name)
        formData.append('documentOne',this.state.documentOne,this.state.documentOne.name)
        formData.append('documentTwo',this.state.documentTwo,this.state.documentTwo.name)     
        formData.append('rfidId',this.state.rfidId)
        this.props.addVendorMaster(formData).then(()=>this.push()) 
        .catch((err)=>{
            this.setState({message: err.response.data.message, loading: false})
        
        }) 
       
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    
    close = () => {
        return this.props.history.replace('/superDashBoard')
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
    }
    
    
    stateChange = (currentState, currentStateId, selectOption) => {
        console.log(currentState, currentStateId, selectOption)
        this.setState({
            currentState: selectOption.stateName,
            currentStateId:selectOption.stateId
        })
        this.props.getCity(selectOption.stateId);
    }
    
    cityChange = (currentCity, currentCityId, selectOption) => {
        console.log(currentCity, currentCityId, selectOption)
        this.setState({
            currentCity: selectOption.cityName,
            currentCityId:selectOption.cityId
        })
        this.props.getLocation(selectOption.cityId)
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

    defaultPermanentAddressChange = (e) =>{
        this.setState({defaultCurrentAddress: this.state.correspondenceAddress ,permanentAddress: e.target.value})
    }

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
            this.setState({ pin: e.target.value, errors });
        }
        else {
            this.setState({pin: e.target.value});
        }
        this.updatePermanentAddress(e.target.value)
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
            this.setState({ pin1: e.target.value, errors });
        }
        else {
            this.setState({pin1: e.target.value});
        }
        this.updatePermanentAddress(e.target.value)
    }
    
    updatePermanentAddress = (pin) => {
        console.log(pin)
        this.setState({pin})
        this.setState({permanentAddress: this.state.permanentAddressDefault  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
        this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + pin})
        console.log('updatePermanentAddress', this.state.permanentAddress)
    }

    OnKeyPresshandlerEmail=(event)=> {
        const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        let inputChar = event.target.value;
        if (!pattern.test(inputChar)) {
            this.setState({
                emailError:true
            })
        }
        else{
            this.setState({
                emailError:false
            })
        }
    }

    RfID=({ownerRf})=>{console.log(ownerRf)
        if(ownerRf && ownerRf.rfids){
            return (
               ownerRf.rfids.map((item)=>{
                   return ({ ...item, label:item.rfid, value:item.rfidId})
               })
            )
        }
    }

    rfIdChangeHandler=(selectOption)=>{
        this.setState({
            rfidId:selectOption.rfidId
        })

    }

    render() {
      let  formData =<div>
        <FormGroup>
            <Row md={12}>
            <Col md={6}>
            <Label>First Name</Label>
            <Input type="text" placeholder="First Name" name="firstName" maxLength={20} value={this.state.firstName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  />
            <span className="error">{this.state.errors.firstName}</span>
            </Col>     
            <Col md={6}>
      
            <Label>Last Name</Label>
            <Input type="text" placeholder="Last Name" name="lastName" maxLength={20} value={this.state.lastName} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  />
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
                    <Input type="text"   name="pin1" onChange={this.pinChange1}
                    maxLength="6" minLength="5" onKeyPress={this.OnKeyPresshandlerPhone}
                       placeholder="Pin/Zip Code" />
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
                        <Input type="text" name="pin" onChange={this.pinChange}
                        maxLength="6" minLength="5" onKeyPress={this.OnKeyPresshandlerPhone}
                         placeholder="Pin/Zip Code" />
                        <span className="error">{this.state.errors.pin}</span>
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
    </FormGroup>
        <Row form>
            <Col md={4}>
            <FormGroup>
                <Label>Contact Number</Label>
                <Input type="text" placeholder="Contact Number" name="contact" maxLength={10} onKeyPress={this.OnKeyPresshandlerPhone} value={this.state.contact} onChange={this.handleChange} />
                <span className="error">{this.state.errors.contact}</span>
            </FormGroup>
            </Col>
            <Col md={4}>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" placeholder="Email" name="email" maxLength={80}  value={this.state.email} onKeyPress={this.OnKeyPresshandlerEmail} onBlur={this.OnKeyPresshandlerEmail} onChange={this.handleChange}/>
                <span className="error">{this.state.errors.email}</span>
                <span className="error">{this.state.message}</span>
                <span style={{display:this.state.emailError?'block':'none',color:'red'}}>email is not valid</span>
            </FormGroup>
            </Col>
            <Col md={4}>
            <Label>RF ID</Label>
            <Select placeholder={PlaceHolder} options={this.RfID(this.props.rfId)} name='rfidId' onChange={this.rfIdChangeHandler.bind(this)}/>
            <span className="error">{this.state.errors.rfidId}</span>
            </Col>
        </Row>
        <Row form>
            <Col md={6}>
                <FormGroup>
                    <Label> Service Type 1</Label>
                    <Input type="select" name="serviceId1" defaultValue='no-value' onChange={this.onServiceChange1}>
                        <DefaultSelect/>
                        {this.getDropDown(this.props.displayServiceMasterReducer)}                                    
                    </Input>
                    <span className="error">{this.state.errors.serviceId1}</span>
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                    <Label> Rate Type 1</Label>
                    <Input type="select" name="rateId1" defaultValue='no-value' onChange={this.onRateChange1}>                                     
                         <DefaultSelect/>
                        {this.getRate(this.props.vendorMasterReducer)}
                    </Input>
                    <span className="error">{this.state.errors.rateId1}</span>
                </FormGroup>
            </Col>
            <Col md={2}>
                <FormGroup>
                    <Label> Rate 1</Label>
                    <Input type="text" placeholder="Rate" name="rate1" maxLength={6}  value={this.state.rate1} onChange={this.onRateChange}/>
                    <div>{!this.state.rate1 ? <span className="error">{this.state.errors.rate1}</span>: null}</div>
                </FormGroup>
            </Col>
        </Row>
                <FormGroup>
                    <Label style={{fontWeight:"600"}}>
                        Is Vendor providing services on daily basis ? 
                    </Label>                            
                <FormGroup check>
                    <Label check>   
                    <Input  type="checkbox" name="dailyServices1" onChange={this.dailyServicesOnChange} />Daily Routine
                    </Label>
                </FormGroup>
                </FormGroup>
        <Row form>
            <Col md={6}>
                <FormGroup>
                    <Label> Service Type 2</Label>
                    <Input type="select" name="serviceId2" defaultValue='no-value'onChange={this.onServiceChange2} >
                        <DefaultSelect/>
                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                    </Input>                                  
                </FormGroup>
            </Col>

            <Col md={4}>
                <FormGroup>
                    <Label> Rate Type 2</Label>
                    <Input type="select" name="rateId2" defaultValue='no-value'  onChange={this.onRateChange2}>
                         <DefaultSelect/>
                        {this.getRate(this.props.vendorMasterReducer)}
                    </Input>                             
                </FormGroup>
            </Col>
            <Col md={2}>
                <FormGroup>
                    <Label> Rate 2</Label>
                    <Input type="text" placeholder="Rate" name="rate2" maxLength={6} value={this.state.rate2}onChange={this.onRateChange}/>              
                </FormGroup>
            </Col>
        </Row>
                <FormGroup>
                    <Label style={{fontWeight:"600"}}>
                        Is Vendor providing services on daily basis ? 
                    </Label>                            
                <FormGroup check>
                    <Label check>   
                    <Input  type="checkbox" name="dailyServices2" onChange={this.dailyServicesOnChange} />Daily Routine
                    </Label>
                </FormGroup>
                </FormGroup>
        <Row form>
            <Col md={6}>
                <FormGroup>
                    <Label> Service Type 3</Label>
                    <Input type="select" name="serviceId3" defaultValue='no-value' onChange={this.onServiceChange3} >
                        <DefaultSelect/>
                        {this.getDropDown(this.props.displayServiceMasterReducer)}
                    </Input>             
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                    <Label> Rate Type 3</Label>
                    <Input type="select" name="rateId3" defaultValue='no-value' onChange={this.onRateChange3}>
                         <DefaultSelect/>
                        {this.getRate(this.props.vendorMasterReducer)}
                    </Input>                              
                </FormGroup>
            </Col>
            <Col md={2}>
                <FormGroup>
                    <Label> Rate 3</Label>
                    <Input type="text" placeholder="Rate" name="rate3"  maxLength={6} value={this.state.rate3} onChange={this.onRateChange}/>                  
                </FormGroup>
            </Col>
        </Row>
                <FormGroup>
                    <Label style={{fontWeight:"600"}}>
                        Is Vendor providing services on daily basis ? 
                    </Label>                            
                <FormGroup check>
                    <Label check>   
                    <Input  type="checkbox" name="dailyServices3" onChange={this.dailyServicesOnChange} />Daily Routine
                    </Label>
                </FormGroup>
                </FormGroup>
        <Row>
            <Col md={4}>
                <FormGroup>
                    <Label>Upload Your Id</Label>
                    <Input type="file" name="documentOne"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage}/>
                    <span className="error">{this.state.errors.documentOne}</span>
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                    <Label>Upload Another Id</Label>
                    <Input type="file" name="documentTwo"  accept='.docx ,.doc,application/pdf' onChange={this.selectImage2}/>
                    <span className="error">{this.state.errors.documentTwo}</span>
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                    <Label>Upload Your Picture</Label>
                    <Input type="file" name="profilePicture" accept="image/*" onChange={this.selectImages} />
                    <span className="error">{this.state.errors.profilePicture}</span>
                </FormGroup>
            </Col>
        </Row>
                            <Button color="success" className="mr-2">Submit</Button>             
                            <Button color="danger" onClick={this.push}>Cancel</Button>
    </div>
    
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <Form onSubmit={this.onSubmit} >

                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Add Vendor</h3></div>
                        {!this.state.loading ? formData : <Spinner />}
                           
                    </Form>
                </UI>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        vendorMasterReducer: state.vendorMasterReducer,
        societyReducer: state.societyReducer,
        rfId:state.RFIdReducer
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ getServiceType, addVendorMaster, getRateType ,getVendorMaster,getRfId,
        getCountry,getState,getCity, getLocation}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(vendorMaster);

