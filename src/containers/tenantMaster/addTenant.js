import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Form, FormGroup, Input, Button, Label, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import DefaultSelect from '../../constants/defaultSelect';
import { detailSociety } from '../../actions/societyMasterAction';
import { viewTower } from '../../actions/towerMasterAction';
import {getCountry,getState,getCity, getLocation} from '../../actions/societyMasterAction';
import { getRelation } from '../../actions/relationMasterAction';
import Spinner from '../../components/spinner/spinner';
import { numberValidation, maxDate, emailValid, panCardValidation, fNameKeyPress, OnKeyPressUserhandler, memberMaxDate } from '../../validation/validation';
import { getOwnerDetailViaFlatId, getFlatDetailViaTowerId, addTenantDetail, rfid,validOnChangeEmail,validOnChangeContact } from '../../actions/tenantMasterAction';

class AddTenant extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            tab: "none",
            lastName:'',
            step: 1,
            firstName:'',
            tenantId:'',
            dob:'',
            gender:'',
            email:'',
            contact:'',
            profilePicture:'',
            permanentAddress:'',
            correspondenceAddress:'',
            bankName:'',
            accountHolderName:'',
            accountNumber:'',
            aadhaarNumber:'',
            panCardNumber:'',
            IFSCCode:'',
            noOfMembers:'',
            flatNo: '',
            floorId:'',
            floorName:'',
            flatDetailId: '',
            societyName : '',
            societyId: '',
            member:[],
            towerId:'',
            towerName:'',
            fileName: '',
            imageSizeError:'',
            errors:{},
            loading: false,
            messageContactErr:'',
            defaultPermanent: false,
            messageEmailErr:'',
            countryId:'',
            countryName:'',
            cityName:'',
            cityId:'',
            stateName:'',
            stateId:'',
            locationName:'',
            locationId:'',
            permanentAddrDefault:true,
            permanentAddressUser:'',
            societyCountry:'',
            societyState:'',
            societyCity:'',
            societyLocation:"",
            defaultPermanentAddress:'',
            pin:'',
            pinCode:'',
            message:'',
            refidId:'',
            memberContactError:'',
            emailChangeErr:'',
            validChangeContactErr:''
        }
    }


    componentDidMount() {
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getRelation();
        this.props.getCountry();
        this.props.getState();
        this.props.getCity();
        this.props.getLocation();
        this.props.rfid();
        let societyId = localStorage.getItem('societyId')
        this.setState({societyId})
        this.setState({societyId: localStorage.getItem('societyId')})
        this.setState({societyName: localStorage.getItem('societyName')})
        this.setState({societyCountry: localStorage.getItem('countryName')})
        this.setState({societyState: localStorage.getItem('stateName')})
        this.setState({societyCity: localStorage.getItem('cityName')})
        this.setState({societyLocation: localStorage.getItem('locationName')})
    }

    

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors,message:'' });
        }
        else {
            this.setState({[e.target.name]:e.target.value.trim(),message:'',messageContactErr:''});
        }
    }

    correspondenceAddressChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors,message:'', defaultPermanentAddress: e.target.value,
             });
        }
        else {
            this.setState({[e.target.name]:e.target.value.trim(),message:'',messageContactErr:'', defaultPermanentAddress: e.target.value,
            });
        }

        if(!!document.getElementById('isChecked').checked){
            this.setState({permanentAddress: e.target.value})
        }
    }



    panChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.toUpperCase(), errors,message:'' });
        }
        else {
            this.setState({panCardNumber:e.target.value.toUpperCase(),message:''});
        }
    }

    ifscChange = (e) => {
        
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.toUpperCase(), errors,message:'' });
        }
        else {
            this.setState({IFSCCode:e.target.value.toUpperCase(),message:''});
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

    getSociety = ({detail_Society}) => {
        if (detail_Society) {
            return detail_Society.map((item1) => {
                return (
                    { ...item1, label: item1.societyName, value: item1.societyId }
                )
            }
            );
        }
        return [];
    }

    societyChangeHandler = (selectOption) => {
        let societyId = selectOption.societyId;

        this.setState(function (prevState, props) {
            return {
                'societyName': selectOption.value,
                societyId,
                message:''
            }
        }, function () {
        });
    }





    getRelationList = ({ relationResult }) => {
        if (relationResult && relationResult.relation) {
            return relationResult.relation.map((item) => {
                return (
                    { ...item, name:"relation", label: item.relationName, value: item.relationId }
                )
            }
            );
        }
        return [];
    }

    userMemberHandler = (e) => {
        if (e.target.value !== '') {
            this.setState({
                noOfMembers: e.target.value,
                errors:{},
                message:''
            });
        }
    }

    memberDetailChange = (e) => {
        this.setState({[e.target.name]:e.target.value,errors:'',message:''})  
    }

    contactChange = (e) => {
        this.setState({[e.target.name]:e.target.value,errors:'',message:'',validChangeContactErr:''})
        this.props.validOnChangeContact(e.target.value)
        .then(res => res.data)
        .catch(err => {
            if(err.response.data.message){
                this.setState({validChangeContactErr: err.response.data.message});
            }
        }) 
    }

    onSubmit = (e) => {
        this.setState({loading: true})
        e.preventDefault()
        let { firstName,lastName, dob, gender, email, contact, profilePicture, aadhaarNumber, permanentAddress, correspondenceAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, 
            societyName, member, fileName, societyId, towerName, towerId, floorId, countryId, stateId, cityId, locationId, rfidId } = this.state;
  

        const data1 = {firstName,lastName, dob, gender,aadhaarNumber, email, contact, profilePicture, correspondenceAddress, permanentAddress, bankName, 
            accountHolderName, accountNumber, panCardNumber, IFSCCode, noOfMembers, flatDetailId, societyName, societyId, member, towerName, fileName, towerId, floorId, countryId, stateId, cityId, locationId,
            rfidId }

        if(this.state.imageSizeError === '' && this.state.messageContactErr==='' && this.state.messageEmailErr===''){
            this.props.addTenantDetail(data1)
                .then(() => this.props.history.push('/superDashboard/tenantDetails'))
                .catch(err => {
                    this.setState({message:err.response.data.message ,messageContactErr:err.response.data.messageContactErr,messageEmailErr:err.response.data.messageEmailErr,
                         loading:false, defaultPermanent:false, permanentAddrDefault:true})
                });
        }
    }

    routeToDetail = () => {
        this.props.history.push('/superDashboard/tenantDetails')
    }

    relationHandler = (name,selectOption) => {
        
            this.setState(function (prevState, props) {
                return {
                    [name]: selectOption.value,
                    errors:''
                }
            });
    }

    imageChangeHandler = (event) => {
        const files = event.target.files
        const file = files[0];
        let fileName = file.name;
        if (files && file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () =>{
              this.setState({
                profilePicture :  reader.result,
                fileName,
                imageSizeError:'',
                message:''
              })
          };
        }
        else {
            this.setState({imageSizeError:'Image size should not be more than 4 MB.',message:''});
        }
    }

    nextPrev = (e) => {
        let errors = {};
        const {firstName, lastName, dob, gender,permanentAddressUser, panCardNumber, contact, email, aadhaarNumber} = this.state;
        if(this.state.step === 1){
            if(firstName === '') errors.firstName = `First Name can't be empty.`;
            if(lastName === '') errors.lastName = `Last Name can't be empty.`;
            if(dob === '') errors.dob = `Date of Birth can't be empty.`;
            
            if(gender === '') errors.gender = `Gender can't be empty`;
            if(contact === '') errors.contact= `Contact can't be empty.`;
            else if(contact.length !== 10) errors.contact= `Contact should be of 10 digit.`;
            if(email === '') errors.email = `Email can't be empty.`;
            if(aadhaarNumber === '') errors.aadhaarNumber=`Aadhaar Number can't be empty.`
            else if(aadhaarNumber.length !== 12) errors.aadhaarNumber=`Aadhaar Number should be of 12 digit.`
            if(panCardNumber === '') errors.panCardNumber = `Pan Card number can't be empty.`;
            else if(panCardNumber.length !== 10) errors.panCardNumber = `Pan Card number should be of 10 digit.`;
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid && this.state.emailChangeErr === '' && this.state.validChangeContactErr === '' && this.state.emailValidError === '') {
                this.setState({ step: this.state.step + 1 })
            }
        }
        if(this.state.step === 2){
            let data = {};
            this.state.member.splice(0, this.state.member.length)
            for(let i = 0; i < this.state.noOfMembers; i++){
               if(this.state.noOfMembers !== 0 || this.state.noOfMembers){
                if(!this.state[`firstName` + i] || !this.state[`lastName` + i] || !this.state[`lastName` + i] || !this.state[`memberDob` + i] || 
                !this.state[`relationId` + i] || !this.state[`gender` + i] || !this.state[`aadhaarNumber` + i] ) errors.memberError  = `Please fill all member details`;
                if(this.state[`contact` + i]){
                    if(this.state[`contact` + i].length !== 10) errors.memberContactError = `Contact should be of 10 digit.`
                }
                if(this.state[`aadhaarNumber` + i]){
                    if(this.state[`aadhaarNumber` + i].length !== 12) errors.memberContactError = `Aadhaar number should be of 12 digit.`
                }
                
               }
           
                data = {
                    firstName: this.state['firstName'+i],
                    lastName: this.state['lastName'+i],
                    email: this.state['email'+i],
                    contact: this.state['contact'+i],
                    memberDob: this.state['memberDob'+i],
                    relationId: this.state['relationId'+i],
                    gender:this.state['gender'+i],
                    rfidId:this.state[`rfidId` + i],
                    aadhaarNumber:this.state[`aadhaarNumber` + i]
                }
                    this.state.member.push(data)
                    this.setState({memberError1:this.state['firstName'+i] + this.state['lastName'+i]})
            }
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid && this.state.emailChangeErr === '' && this.state.validChangeContactErr === '' && this.state.emailValidError === '') {
                this.setState({ step: this.state.step + 1 })
            }
        }
        
        const { towerId, floorId, flatDetailId, pin } = this.state;
        if(this.state.step === 3){
            if(towerId === '') errors.towerId = `Please select Tower.`;
            if(floorId === '') errors.floorId = `Please select a Floor.`;
            if(document.getElementById('isChecked').checked === false){
                if(pin === '') errors.pin = `Pin/Zip code can't be empty.`
                if(permanentAddressUser === '') errors.permanentAddressUser = `Permanent Address can't be empty.`;
            }
            
            if(flatDetailId === '') errors.flatDetailId = `Please select a Flat.`;
           
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }
        }
        
        if(this.state.step === 4){
                this.setState({ step: this.state.step + 1 })
        }
    }

    emailChange = (e) => {
        this.setState({[e.target.name]:e.target.value, messageEmailErr:'',emailChangeErr:''})
        // eslint-disable-next-line
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value,message:''});
            this.setState({emailValidError: '',message:''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors,message:'' });
        }
        else {
            this.setState({[e.target.name]:e.target.value,message:''});
        } 
        this.props.validOnChangeEmail(e.target.value)
        .then(res => (res))
        .catch(err => {
            if(err.response.data.message){
                this.setState({emailChangeErr: err.response.data.message})
            }
            
        });
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }
    
    

    getFloor=({getFlatDetail})=>{
        if(getFlatDetail && getFlatDetail.tower){
            return getFlatDetail.tower.Floors.map((item)=>{
                      
                return {...item ,label: item.floorName, value: item.floorId }
            })
          //   this.setState({
          //     floorId:item.floorId
          //   })
        }
        else {
            return []
        }}

        getFlats=({getFlatDetail})=>{
            if(getFlatDetail && getFlatDetail.flatDetail){
              return  getFlatDetail.flatDetail.filter((flatRecord)=>{
                    return flatRecord.floorId===this.state.floorId
                }).map((selectFlat)=>{
                    return {...selectFlat, label:selectFlat.flatNo,value:selectFlat.flatDetailId}
                });
            }
            else {
                return []
              }
        }

        

        

        towerChangeHandler = (towerId,towerName,selectOption) => {
            this.setState({correspondenceAddress:''})
            this.setState(function () {
                return {
                    towerId: selectOption.towerId,
                    towerName: selectOption.towerName,
                    message:'',
                    correspondenceAddress: 'Tower : ' + selectOption.towerName
                }
            });
            this.props.getFlatDetailViaTowerId(selectOption.towerId);
        }

    
        floorChangeHandler=(floorName,floorId,selectOption)=>{
            this.setState({
                floorName: selectOption.floorName,
                floorId: selectOption.floorId,
                message:'',
                correspondenceAddress: 'Floor : ' + selectOption.floorName + ' , ' + this.state.correspondenceAddress
                
            })
            
            }

            flatChangeHandler=(flatNo,flatDetailId,selectOption)=>{
                this.setState({
                    flatNo: selectOption.flatNo,
                    flatDetailId: selectOption.flatDetailId,
                    message:'',
                    correspondenceAddress: ('Flat Number : ' + selectOption.flatNo  + ' , ' + this.state.correspondenceAddress) + 
                    ' , ' +this.state.societyName + ' , ' +this.state.societyLocation + ' , ' + this.state.societyCity +
                    ' , ' + this.state.societyState + ' , ' + this.state.societyCountry
                })
                this.props.getFlatDetailViaTowerId(selectOption.towerId);
            }

            flatChangeHandler1=(name ,selectOption)=>{
                this.setState({
                    [name]: selectOption.value,
                    message:''
                })
                this.props.getFlatDetailViaTowerId(selectOption.towerId);
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

            onChangeCountry = (countryName,countryId,selectOption) => {
                this.setState({
                    countryName: selectOption.countryName,
                    countryId:selectOption.countryId,
                    message:''
                })
                this.props.getState(selectOption.countryId)
                this.updatePermanentAddress4(selectOption.countryName)
            }

            updatePermanentAddress4 = (countryName) => {
                this.setState({countryName})
                this.setState({permanentAddress: this.state.permanentAddressUser  + ', ' + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                `${this.state.cityName}, ${this.state.stateName}, ${countryName}, Pin/Zip Code: ${this.state.pin}`})
            }
           
            stateName = ({stateResult}) => {
                if(stateResult){
                   return( 
                    stateResult.map((item) =>{ 
                           return(
                            { ...item, label: item.stateName, value: item.stateId }
                           )
                       })
                   )
                    
                }
            }

            onChangeState = (stateName, stateId,selectOption) => {
                this.setState({
                    stateName: selectOption.stateName,
                    stateId:selectOption.stateId,
                    message:''
                })
                this.props.getCity(selectOption.stateId);
                this.updatePermanentAddress3(selectOption.stateName)
            }

            updatePermanentAddress3 = (stateName) => {
                this.setState({stateName})
                this.setState({permanentAddress: this.state.permanentAddressUser  + ', ' + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                `${this.state.cityName}, ${stateName}, ${this.state.countryName}, Pin/Zip Code: ${this.state.pin}`})
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

            onChangeCity = (cityName,cityId,selectOption) => {
                this.setState({
                    cityName: selectOption.cityName,
                    cityId:selectOption.cityId,
                    message:''
                })
                this.props.getLocation(selectOption.cityId)
                this.updatePermanentAddress2(selectOption.cityName)
            }

            updatePermanentAddress2 = (cityName) => {
                this.setState({cityName})
                this.setState({permanentAddress: this.state.permanentAddressUser  + ', ' + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ')  +
                `${cityName}, ${this.state.stateName}, ${this.state.countryName}, Pin/Zip Code: ${this.state.pin}`})
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

            onChangeLocation = (locationName,locationId,selectOption) => {
                this.setState({
                    locationName: selectOption.locationName,
                    locationId:selectOption.locationId,
                    message:''
                })
                this.updatePermanentAddress1(selectOption.locationName)
            }

            updatePermanentAddress1 = (location) => {
                this.setState({location})
                this.setState({permanentAddress: this.state.permanentAddressUser  + ', ' + location + ', ' +
                `${this.state.cityName}, ${this.state.stateName}, ${this.state.countryName}, Pin/Zip Code:  ${this.state.pin}`})
            }

    
            sameAddress = (e) => {
                if(!!document.getElementById('isChecked').checked){
                   this.setState({permanentAddress: this.state.correspondenceAddress.trim(), defaultPermanent:true,
                permanentAddrDefault:false})
                   
                }
               else{
                    this.setState({permanentAddress: '', defaultPermanent:false, permanentAddrDefault:true})
                }
            }

            

            permanentAddressChange = (e) => {
                if (!!this.state.errors[e.target.name]) {
                    let errors = Object.assign({}, this.state.errors);
                    delete errors[e.target.name];
                    this.setState({permanentAddressUser:e.target.value, permanentAddress: e.target.value  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                    `${this.state.cityName}, ${this.state.stateName}, ${this.state.countryName}, Pin/Zip code: ${this.state.pin}` , errors, message:'' })
                }
                else {
                    this.setState({permanentAddressUser:e.target.value, permanentAddress: e.target.value  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                    `${this.state.cityName}, ${this.state.stateName}, ${this.state.countryName}, 'Pin/Zip code: ${this.state.pin}`, message:'' })
                }
        }
            
    defaultPermanentAddressChange = (e) =>{
        this.setState({defaultPermanentAddress: this.state.correspondenceAddress ,permanentAddress: e.target.value,message:''})
    }

    

    pinChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ pin: e.target.value, errors,message:'' });
        }
        else {
            this.setState({pin: e.target.value,message:''});
        }
        this.updatePermanentAddress(e.target.value)
    }

    updatePermanentAddress = (pin) => {
        this.setState({pin})
        this.setState({permanentAddress: this.state.permanentAddressUser  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
        `${this.state.cityName}, ${this.state.stateName}, ${this.state.countryName}, Pin/Zip Code: ${pin}`})
    }

    rfidOptions = ({getRFID}) => {
        if (getRFID && getRFID.rfids) {
            return getRFID.rfids.map((item) => {
                return (
                    { ...item, name:"rfid", label: item.rfid, value: item.rfidId }
                )
            }
            );
        }
        return [];
    }

    rfidChange = (name,selectOption) => {
        
        if(name && selectOption){
            this.setState(function (prevState, props) {
                return {
                    [name]: selectOption.value,
                    errors:''
                }
            });
        }
}

    render(){        
        let userDatas = [];
        for (let i = 0; i < this.state.noOfMembers; i++) {
            
            userDatas.push(<FormGroup key={i}>
                <FormGroup>
                    <Row md={12}>
                        <Col md={4}>
                            <Label>First Name</Label>
                            <Input placeholder="First Name"
                            onKeyPress={fNameKeyPress}
                            name = {`firstName${i}`} onChange={this.memberDetailChange} 
                            className="input"  />
                        </Col>
                        <Col md={4}>
                            <Label>Last Name</Label>
                            <Input placeholder="Last Name"
                            onKeyPress={fNameKeyPress}
                            name = {`lastName${i}`} onChange={this.memberDetailChange} 
                            className="input"  />
                        </Col>
                        <Col md={4}>
                            <Label>Email</Label>
                            <Input placeholder="Email"
                            onKeyPress={emailValid}
                            name = {`email${i}`} onChange={this.emailChange}
                            maxLength="70" 
                            className="input"  />
                            
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row md={12}>
                        <Col md={4}>
                            <Label>Contact</Label>
                            <Input placeholder="Contact"
                            onKeyPress={numberValidation}
                            maxLength="10"
                            name = {`contact${i}`} onChange={this.contactChange} 
                            className="input"  />
                            <div>{<span className="error">{this.state.validChangeContactErr}</span>}</div>
                        </Col>
                        <Col md={4}>
                            <Label>Relation With Tenant</Label>
                            <Select name={`relationId${i}`} options={this.getRelationList(this.props.relationList)} 
                            onChange={this.relationHandler.bind(this,'relationId'+i )} placeholder={<DefaultSelect/>}  />
                        </Col>
                        <Col md={4}>
                            <Label>Date of Birth</Label>
                            <Input type="date"  max={memberMaxDate()}  name={`memberDob${i}`} onChange={this.memberDetailChange} />
                        </Col>
                    </Row>
                </FormGroup>
                <Col md={12} style={{marginTop:'20px', marginBottom:'20px'}}>
                    <Label>Gender:</Label>
                    <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                    <span><Input name={`gender${i}`} onChange={this.memberDetailChange}
                                    type="radio" value="Male" /></span>
                    
                    
                    <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                    <span><Input name={`gender${i}`} onChange={this.memberDetailChange}
                                    type="radio" value="Female"/></span>
                    
                    
                    <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                    <span><Input type="radio" onKeyPress={OnKeyPressUserhandler} value="Other"
                                name = {`memberName${i}`} onChange={this.memberDetailChange} 
                                className="input"/></span>
                </Col>
                <FormGroup>
                    <Row md={12}>
                        <Col md={6}>
                            <Label>RFID</Label>
                            <Select name={`rfidId${i}`} placeholder={<DefaultSelect />} 
                            options={this.rfidOptions(this.props.tenantReducer)}
                            onChange={this.rfidChange.bind(this, 'rfidId'+i)} />
                        </Col>
                        <Col md={6}>
                            <Label>Aadhaar Number</Label>
                            <Input type="text" name={`aadhaarNumber${i}`} placeholder="Aadhar Number"
                                onChange={this.memberDetailChange} onKeyPress={numberValidation} maxLength="12" />
                        </Col>
                    </Row>
                </FormGroup>
            </FormGroup>

            );
        }

        let formData = <div>
            <div style={{ 'display': this.state.step === 1 ? 'block' : 'none' }}>
                        <h3>Tenant Details</h3>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input type="text" placeholder="First Name"  onKeyPress={fNameKeyPress}
                            onChange={this.onChange} 
                            maxLength={100} name='firstName' />
                            {<span className="error">{this.state.errors.firstName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input type="text" placeholder="Last Name"  onKeyPress={fNameKeyPress} 
                            onChange={this.onChange} 
                            maxLength={100} name='lastName' />
                            {<span className="error">{this.state.errors.lastName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Input type="date" onChange={this.onChange} name="dob"
                             max={maxDate()} />
                             {<span className="error">{this.state.errors.dob}</span>}
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
                            <Label>Contact Number</Label>
                            <Input onKeyPress={numberValidation} onChange={this.contactChange}
                             name="contact" placeholder="Contact Number" type="text" maxLength="10" />
                             <div>{<span className="error">{this.state.validChangeContactErr}</span>}</div>
                             {<span className="error">
                                {this.state.errors.contact}
                            </span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="Email" onChange={this.emailChange}
                            onKeyPress={emailValid} name="email" type="email" maxLength="70" />
                            {<span className="error">{this.state.emailChangeErr}</span>}
                            {<span className="error">{this.state.emailValidError}</span>}
                            <span><br/></span>
                            {<span className="error">{this.state.errors.email}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Aadhaar Number</Label>
                            <Input placeholder="Aadhaar Number" onChange={this.onChange}
                            name="aadhaarNumber" onKeyPress={numberValidation} type="text"
                            maxLength="12" />
                            {<span className="error">
                                {this.state.errors.aadhaarNumber}
                            </span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>PAN Card Number</Label>
                            <Input placeholder="Pan Number" onChange={this.panChange}
                            value={this.state.panCardNumber.toUpperCase()}
                             type='text' name="panCardNumber"
                             maxLength='10' onKeyPress={panCardValidation}  />
                             {<span className="error">{this.state.errors.panCardNumber}</span>}
                        </FormGroup>
                    </div>
            
                    <div style={{ 'display': this.state.step === 2 ? 'block' : 'none' }}>
                        <h3>Tenant Member Details</h3>
                        <div style={{textAlign:'right'}}><span className="error">{this.state.errors.memberError}</span></div>
                        <div style={{textAlign:'right'}}><span className="error">{this.state.errors.memberContactError}</span></div>
                        <div style={{textAlign:'right'}}>{<span className="error">{this.state.emailChangeErr}</span>}</div>
                        <div style={{textAlign:'right'}}>{<span className="error">{this.state.validChangeContactErr}</span>}</div>
                        <div style={{textAlign:'right'}}>{<span className="error">{this.state.emailValidError}</span>}</div>
                        <FormGroup>
                            <Label>Number of Member</Label>
                            <Input onKeyPress={numberValidation} placeholder="number of member"
                             onChange={this.userMemberHandler} type='text' 
                             className="quantity" name="noOfMembers" />
                        </FormGroup>
                        
                        {userDatas}
                    </div>
                    <div style={{ 'display': this.state.step === 3 ? 'block' : 'none' }}>
                        <h3>Corresponding Address</h3>
                        <FormGroup>
                            <Label>Tower</Label>
                            <Select onChange={this.towerChangeHandler.bind(this, 'towerId', 'towerName')} placeholder={<DefaultSelect/>} name="towerId"
                            options={this.getTower(this.props.towerList)} id="tower" />
                            {!this.state.towerId ? <span className="error">{this.state.errors.towerId}</span> : ''}
                        </FormGroup >
                        <FormGroup>
                            <Label>Floor</Label>
                            <Select options={this.getFloor(this.props.tenantReducer)}
                            placeholder={<DefaultSelect/>}
                            name="floorId" id="floor"
                            onChange={this.floorChangeHandler.bind(this,'floorName','floorId')}
                            />
                            {!this.state.floorId ? <span className="error">{this.state.errors.floorId}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Flat Number</Label>
                            <Select options={this.getFlats(this.props.tenantReducer)} name="flatDetailId"
                                onChange={this.flatChangeHandler.bind(this, 'flatNo' , 'flatDetailId')}
                                placeholder={<DefaultSelect/>} id="flat"
                                />
                            {!this.state.flatDetailId ? <span className="error">{this.state.errors.flatDetailId}</span> : ''}
                        </FormGroup >
                        {/* <FormGroup>
                            <Label>Corresponding Address</Label>
                            <Input type="textarea" value={this.state.correspondenceAddress} onChange={this.correspondenceAddressChange} maxLength="250"
                             name="correspondenceAddress" placeholder="Corresponding Address" />
                             {!this.state.towerId ?<span className="error">
                                {this.state.errors.correspondenceAddress}
                            </span>:''}
                        </FormGroup > */}
                        
                        <FormGroup>
                           <span style={{fontWeight:'bold'}}>Is Your permanent address same as correspondence address?</span><Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
                        </FormGroup>
                        <h3 style={{textAlign:'center'}}>Permanent Address</h3>
                        {this.state.defaultPermanent ? <FormGroup>
                            <Label>Permanent Address</Label>

                            <Input id="permanentaddr" readOnly type="textarea" onChange={this.defaultPermanentAddressChange}
                            maxLength="250" value={this.state.defaultPermanentAddress} 
                             // eslint-disable-next-line
                            value={this.state.correspondenceAddress}
                             name="defaultPermanentAddress" placeholder="Permanent Address" />
                        </FormGroup> : ''}
                        {this.state.permanentAddrDefault ? <div>
                        <FormGroup>
                            <Row md={12}>
                                <Col md={6}>
                                    <Label>Country</Label>
                                    <Select placeholder={<DefaultSelect/>} options={this.countryName(this.props.societyReducer)} label={this.state.countryName} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
                                </Col>
                                <Col md={6}>
                                    <Label>State</Label>
                                    <Select placeholder={<DefaultSelect/>} options={this.stateName(this.props.societyReducer)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row md={12}>
                                <Col md={6}>
                                    <Label>City</Label>
                                    <Select placeholder={<DefaultSelect/>} options={this.cityName(this.props.societyReducer)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                                </Col>
                                <Col md={6}>
                                    <Label>Location</Label>
                                    <Select placeholder={<DefaultSelect/>} options={this.locationName(this.props.societyReducer)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Label>Pin/Zip Code</Label>
                            <Input type="text" onChange={this.pinChange}
                            maxLength="6" onKeyPress={numberValidation}
                                name="pin" placeholder="Pin/Zip Code" />
                                <span className="error">{this.state.errors.pin}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="textarea" disabled={!(this.state.countryId && this.state.stateId
                            && this.state.cityId) ? true : false} onChange={this.permanentAddressChange}
                            maxLength="250"
                                name="permanentAddressUser" placeholder="Permanent Address" />
                                {<span className="error">
                                {this.state.errors.permanentAddressUser}
                            </span>}
                        </FormGroup>
                        </div> : ''}
                        {/* <FormGroup>
                            <Label>Floor</Label>
                            <Input defaultValue="no-value"
                            type='select' name="floorId" onChange = {this.floorChange}  >
                            <DefaultSelect />
                            {this.fetchFloorDetail(this.props.tenantReducer)}
                            </Input>
                            {!this.state.floorId ? <span className="error">{this.state.errors.floorId}</span> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Flat No.</Label>
                            <Input onKeyPress={numberValidation} onChange={this.flatChangeHandler}
                             placeholder="Flat No." defaultValue="no-value"
                            type='select' name="flatDetailId" >
                            <DefaultSelect />
                            {this.fetchFlatDetail(this.props.tenantReducer)}
                            </Input>
                            {!this.state.flatDetailId ? <span className="error">{this.state.errors.flatDetailId}</span> : ''}
                        </FormGroup> */}
                    </div>
                    <div style={{ 'display': this.state.step === 4 ? 'block' : 'none' }}>
                        <h3>Upload Your Image</h3>
                        <FormGroup>
                            <Label>Image</Label>
                            <Input accept='image/*' onChange={this.imageChangeHandler}
                             type='file' name="profilePicture" />
                        </FormGroup>
                        <span className="error">{this.state.imageSizeError}</span>
                        <FormGroup>
                            <Label>RFID</Label>
                            <Select name='rfidId' placeholder={<DefaultSelect />} 
                                options={this.rfidOptions(this.props.tenantReducer)}
                                onChange={this.rfidChange.bind(this, 'rfidId')} />
                        </FormGroup>
                    </div>
                    <div>
                        {this.state.message ? <span className="error">{this.state.message}</span>:''}<br/>
                        {this.state.messageEmailErr ? <span className="error">{this.state.messageEmailErr}</span>:''}<br/>
                        {this.state.messageContactErr ? <span className="error">{this.state.messageContactErr}</span>:''}
                    </div>
                    <div>
                        <Button color="primary" className="mr-2" id="prevBtn" style={{ display: this.state.step === 1 ? 'none' : 'inline-block' }} disabled={this.state.step === 1} onClick={() => { this.setState({ step: this.state.step - 1 }) }}>Previous</Button>
                        <Button color="primary"className="mr-2" id="nextBtn" style={{ display: this.state.step === 4 ? 'none' : 'inline-block' }} disabled={this.state.step === 4} onClick={this.nextPrev}>Next</Button>
                        <Button color="success" className="mr-2" style={{ display: this.state.step === 4 ? 'inline-block' : 'none' }}>Submit</Button>
                        <Button color="danger" onClick={this.routeToDetail}>Cancel</Button>
                    </div>
        </div>

        return(
            <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.onSubmit} method="post">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    {!this.state.loading ? formData : <Spinner />}
                </Form>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        societyReducer: state.societyReducer,
        towerList: state.TowerDetails,
        towerFloor:state.FlatOwnerReducer,
        relationList: state.RelationMasterReducer,
        flatList:state.flatDetailMasterReducer,
        tenantReducer:state.tenantReducer,
        
    }
}

export default connect(mapStateToProps, {detailSociety, viewTower, getRelation,getFlatDetailViaTowerId,rfid,
    getOwnerDetailViaFlatId, addTenantDetail, getCountry,getState,getCity, getLocation,validOnChangeEmail,validOnChangeContact})(AddTenant);