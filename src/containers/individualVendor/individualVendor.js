import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addVendor} from './../../actions/individualVendorAction';
import {getCountry,getState,getCity, getLocation} from '../../actions/societyMasterAction';
import {getServiceType} from './../../actions/serviceMasterAction';
import {getRateType} from './../../actions/vendorMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label, Row, Col } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from './../../constants/defaultSelect';
import _ from 'underscore';
import Select from 'react-select';
import { PlaceHolder } from '../../actionCreators/index';
import {getRfId} from '../../actions/rfIdAction';


class IndividualVendor extends Component{

    constructor(props){
        super(props);

        this.state={
            firstName:'',
            lastName:'',
            countryName:'',
            stateName:'',
            cityName:'',
            locationName:'',
            countryId:'',
            stateId:'',
            cityId:'',
            locationId:'',
            currentAddress:'',
            currentAddressInfo:'',
            permanentAddress:'',
            permanentPinCode:'',
            email:'',
            contact:'',
            serviceId:'',
            rateId:'',
            rate:'',
            startTime:'',
            endTime:'',
            startTime1:'',
            endTime1:'',
            startTime2:'',
            endTime2:'',
            profilePicture:'',
            documentOne:'',
            documentTwo:'',
            fileName1:'',
            fileName2:'',
            fileName3:'',
            errors:{},
            emailValidError:'',
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
            dailyRoutine:false,
            message:'',
            messageContactErr:'',
            messageEmailErr:'',
            rfidId:'',
           
        }
    }


    componentDidMount=()=>{
        this.refreshData()     
    }

    refreshData=()=>{
         this.props.getCountry().then(() => this.setState({loading: false}));
         this.props.getState().then(() => this.setState({loading: false}));
         this.props.getCity().then(() => this.setState({loading: false}));
         this.props.getLocation().then(() => this.setState({loading: false}));
         this.props.getServiceType().then(() => this.setState({loading: false}));
         this.props.getRateType().then(() => this.setState({loading: false}));
         this.props.getRfId().then(() => this.setState({loading: false}));
    }


    keyPress = (event) => {
        const pattern = /^[a-zA-Z0-9_, -]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
        else{
            document.getElementById('isChecked').checked = false;
            document.getElementById('permanentaddr').disabled = false;
            this.setState({permanentAddress: ''});
        }
        
    }

    
    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    OnKeyPresshandlerPhone1(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    
    onRateChange=(e)=>{
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});
            
        }}


    emailValid(event) {
        const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    
    emailChange = (e) => {
   
        this.setState({email:e.target.value, messageEmailErr:''})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        
    }


    

    FileChange=(event)=>{

        const files = event.target.files;
        const file = files[0];
        const fileName1=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                profilePicture :
                  reader.result,
                  fileName1
              })
           
          };
        }  
    }

    FileChange1=(event)=>{

        const files = event.target.files;
        const file = files[0];
        const fileName2=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                documentOne :
                  reader.result,
                  fileName2
              })
           
          };
        }  
    }

    
    FileChange2=(event)=>{
        // this.setState({ documentTwo : event.target.files[0]})
        const files = event.target.files;
        const file = files[0];
        const fileName3=file.name
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                documentTwo :
                  reader.result,
                  fileName3
              })
           
          };
        }  
    }

    onRateChange=(e)=>{
    //    console.log("=====================", e.target.value)
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            console.log("=====================", e.target.value)
            this.setState({[e.target.name]:e.target.value});
            
        }}

      onChange=(e) =>{
        this.setState({message:'' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors,message:'' });
        }
        else {
            this.setState({[e.target.name]:e.target.value.trim(),message:'',messageContactErr:''});
        }
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

    changeVendor=(event)=>{
       
        this.setState({ [event.target.name]: event.target.checked}, function(){
            console.log(this.state.dailyRoutine)
        })
        
    }


    service({item}){
        if(item){
           return( 
            item.map((item) =>{ 
                   return(
                       <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName}
                       </option>
                   )
               })
           )
            
        }
    }

    rateTypeDetail({rate}){
        if(rate){
            console.log(rate)
          
           return( 
            rate.rate.map((item) =>{ 
                   return(
                       <option key={item.rateId} value={item.rateId}>
                        {item.rateType}
                       </option>
                   )
               })
           )
            
        }
    }


    handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        if(!this.state.firstName) {
            errors.firstName= "cant be empty"
        }
        else if(this.state.lastName ==='') {
          errors.lastName= "cant be empty"
        }

        else if(this.state.permanentAddressDefault===''){
            errors.permanentAddressDefault="Permanent Address can't be empty"
        }
        else if(this.state.pin1===''){
            errors.pin1="Pincode can't be empty"
        }
              
       else if(document.getElementById('isChecked').checked === false){
            if(this.state.currentAddressDefault === '') errors.currentAddressDefault = `Current Address can't be empty.`;
        }
        
        else if(this.state.pin===''){
            errors.pin="Pincode can't be empty"
        } 


        // else if(this.state.countryName ==='') {
        //     errors.countryName = "cant be empty"
        // }
        // else if(this.state.stateName ==='') {
        //     errors.stateName = "cant be empty"
        // }
        // else if(this.state.cityName ==='') {
        //     errors.cityName= "cant be empty"
        // }
        // else if(this.state.locationName ==='') {
        //     errors.locationName = "cant be empty"
        // }

        // else if(this.state.permanentPinCode.length !== 6) {
        //     errors.permanentPinCode = "Pin Code must be 6 digits"
        // }
        // else if(this.state.currentAddressInfo ==='') {
        //     errors.currentAddressInfo = "cant be empty"
        // }
        else if(this.state.permanentAddress ==='') {
            errors.permanentAddress = "cant be empty"
        }
        else if(this.state.email ==='') {
            errors.email = "cant be empty"
        }

        else if(this.state.contact.length !== 10){
            errors.contact="Contact No. must be 10 digits"
        }

        else if(this.state.serviceId ==='') {
            errors.serviceId = "cant be empty"
        }

        else if(this.state.rateId ==='') {
            errors.rateId = "cant be empty"
        }

        else if(this.state.rate ==='') {
            errors.rate = "cant be empty"
        }

        else if(this.state.startTime ==='') {
            errors.startTime = "cant be empty"
        }

        else if(this.state.endTime ==='') {
            errors.endTime= "cant be empty"
        }

        // else if(this.state.rfidId ==='') {
        //     errors.rfidId= "cant be empty"
        // }

        // else if(this.state.profilePicture ==='') {
        //     errors.profilePicture= "cant be empty"
        // }

        else if(this.state.documentOne ==='') {
            errors.documentOne= "cant be empty"
        }

        else if(this.state.documentTwo ==='') {
            errors.documentTwo= "cant be empty"
        }

       
        this.setState({errors})
        
        const isValid= Object.keys(errors).length === 0;

        console.log("submitted-----------------", this.state);
             if(isValid){
                
                this.props.addVendor(this.state).then(()=>this.props.history.push('/superDashboard/individualVendorDetail'))
                .catch((err)=>{ console.log(err.response.data)
                    this.setState({message: err.response.data.message,messageContactErr:err.response.data.messageContactErr,messageEmailErr:err.response.data.messageEmailErr ,loading: false})
                
                }) 
             }
    }

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }


     
    dashbordPage=()=>{
        this.props.history.push('/superDashboard/individualVendorDetail');
    }

    rfidData=({ownerRf})=>{
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

    render(){
          let formData=<div>
            <FormGroup>
                <Label>First Name</Label>
                <Input  type="text" name="firstName" placeholder="firstname" onChange={this.onChange} onKeyPress={this.OnKeyPressUserhandler} maxLength={50}></Input>
                <span className='error'>{this.state.errors.firstName}</span>  
            </FormGroup>
           
            <FormGroup>
                <Label>Last Name</Label>
                <Input  type="text" name="lastName" placeholder="lastname" onChange={this.onChange} onKeyPress={this.OnKeyPressUserhandler} maxLength={50}></Input> 
                <span className='error'>{this.state.errors.lastName}</span> 
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
            <Col md={6}>
            <FormGroup>
                <Label>Email Id</Label>
                <Input placeholder="Email Id" type="email" name="email" maxLength={200} onChange={this.emailChange}
                        onKeyPress={this.emailValid}/>
                     {!this.state.email ? <span className="error">{this.state.errors.email}</span> : ''}
                            <span className="error">{this.state.emailValidError}</span>
                            <span className="error">{this.state.messageEmailErr}</span>
                           
            </FormGroup>
            </Col>


            <Col md={6}>
            <FormGroup>
                <Label>Contact No.</Label>
                {/* <Input placeholder="Contact No." type="text" name="contact" value={this.state.contact} onChange={this.onChange} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={10}/> */}
                <Input placeholder="Contact No." type="text" name="contact"  onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.onChange} maxLength={10}/>
                <span className='error'>{this.state.errors.contact}</span>
                <span className="error">{this.state.messageContactErr}</span>
               
                </FormGroup>
                </Col>
                </Row>

                <FormGroup check> <span style={{fontWeight:'600'}}>Is Your Vendor providing daily routine services?</span><Input type="checkbox" onChange={this.changeVendor} name="dailyRoutine"  className="ml-3" /></FormGroup>
                {/* <FormGroup check>
                    <Label check>   
                        <Input type="checkbox" name="daiilyRoutine" onChange={this.changeVendor} />Is your vendor providing daily routine services?
                    </Label>
                </FormGroup> */}
                <Row form>
                <Col md={5}>
                <FormGroup>
                <Label>Service Type</Label>
                <Input type="select" defaultValue='no-value' name="serviceId" onChange={this.onChange}>
                    <DefaultSelect/>
                    {this.service(this.props.displayServiceMasterReducer)}
                </Input>
                <span className='error'>{this.state.errors.serviceId}</span>
                </FormGroup>
                </Col>
                
                <Col md={4}>
                <FormGroup>
                    <Label>Rate Type</Label>
                    <Input type="select" defaultValue='no-value' name="rateId" onChange={this.onChange}>
                    <DefaultSelect/>
                    {this.rateTypeDetail(this.props.vendorMasterReducer)}
                    </Input>
                    <span className='error'>{this.state.errors.rateId}</span>
                </FormGroup>
                </Col>
                <Col md={3}>
                <FormGroup>
                    <Label>Rate</Label>
                    <Input type="text" name="rate" placeholder="Service Rate"  onChange={this.onRateChange} value={this.state.rate}  maxLength={8}></Input>
                    <span className='error'>{this.state.errors.rate}</span>
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                <Col md={2}>
                <FormGroup>
                    <Label>Slot 1</Label>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Label>From</Label>
                    <Input type="time"  name="startTime" onChange={this.onChange} >
                    <span className='error'>{this.state.errors.startTime}</span>
                    </Input>
                   
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime" onChange={this.onChange}>
                    <span className='error'>{this.state.errors.endTime}</span>
                    </Input>
                    
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                <Col md={2}>
                <FormGroup>
                    <Label>Slot 2</Label>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Label>From</Label>
                    <Input type="time"  name="startTime1" onChange={this.onChange}>
                    </Input>
                    
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime1" onChange={this.onChange}>
                    </Input>
                   
                </FormGroup>
                </Col>
                </Row>

                <Row form>
                <Col md={2}>
                <FormGroup>
                    <Label>Slot 3</Label>
                </FormGroup>
                </Col>
                <Col md={5}>
                <FormGroup>
                    <Label>From</Label>
                    <Input type="time"  name="startTime2" onChange={this.onChange} >
                    </Input>
                   
                </FormGroup>
                </Col>
                
                <Col md={5}>
                <FormGroup>
                    <Label>To</Label>
                    <Input type="time" name="endTime2" onChange={this.onChange} >
                    </Input>
                    
                </FormGroup>
                </Col>
                </Row>

                <FormGroup>
                    <Label>RF ID</Label>
                    <Select placeholder={PlaceHolder} options={this.rfidData(this.props.rfId)} name='rfidId' onChange={this.rfIdChangeHandler.bind(this)}/>
                </FormGroup>

                <FormGroup>
                <Label>Upload Your Picture</Label>
                    <Input type="file" name="profilePicture" accept="image/*" onChange={this.FileChange} />
                    {/* <span className="error">{this.state.errors.profilePicture}</span>      */}
                </FormGroup>

                <FormGroup>
                <Label>Document 1</Label>
                    <Input type="file" name="documentOne" accept="image/*" onChange={this.FileChange1} />
                    <span className="error">{this.state.errors.documentOne}</span>     
                </FormGroup>

                <FormGroup>
                <Label>Document 2</Label>
                    <Input type="file" name="documentTwo" accept="image/*" onChange={this.FileChange2} />
                    <span className="error">{this.state.errors.documentTwo}</span>     
                </FormGroup>
                <FormGroup>
                <span className="error">{this.state.message}</span>
                </FormGroup>

               

                <Button color="success" className="mr-2">Submit</Button>
                <Button color="danger" onClick={this.dashbordPage}>Cancel</Button>
            </div>
        return(
           <div>
               <UI onClick={this.logout}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                  <span aria-hidden="true">&times;</span>
                   </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Individual Vendor</h3>
                   
                    {!this.state.loading ? formData: <Spinner />}
                </Form>
                </UI>
           </div>
        )
    }
}

function mapStateToProps(state) {
   console.log(state)
 return {
    IndividualVendorReducer: state.IndividualVendorReducer,
    societyReducer : state.societyReducer,
    displayServiceMasterReducer :state.displayServiceMasterReducer,
    vendorMasterReducer : state.vendorMasterReducer,
    rfId:state.RFIdReducer
 }

}

function mapDispatchToProps(dispatch) {
 return bindActionCreators({addVendor, getCountry,getState,getCity, getLocation, getServiceType, getRateType, getRfId }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(IndividualVendor));

