import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { connect } from 'react-redux';
import _ from 'underscore';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { getCountry, getState, getCity, getLocation } from '../../actions/societyMasterAction';
import Select from 'react-select';
import {
    getMemberDetails, getSocietyId, getMemberDesignation, updateSocietyMemberDetails
    , deleteSocietyMemberDetail, deleteMultipleSocietyMemberDetail
} from '../../actions/boardMemberRegistrationAction';
import Spinner from '../../components/spinner/spinner';


class BoardMemberDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: 'firstName',
            societyId: '',
            societyBoardMemberId: '',
            societyName: '',
            firstName: '',
            lastName: '',
            designationName: '',
            countryName: '',
            stateName: '',
            cityName: '',
            locationName: '',
            currentAddress: '',
            panCardNumber: '',
            permanentAddress: '',
            contactNumber: '',
            email: '',
            gender: '',
            Male: 'Male',
            Female: 'Female',
            Other: 'Other',
            bankName: '',
            IFSCCode: '',
            accountNumber: '',
            dob: '',
            designationId: '',
            countryId: '',
            stateId: '',
            cityId: '',
            locationId: '',
            ids: [],
            isDisabled: true,
            errors: {},
            loading: true,
            editSocietyMember: false,
            emailValidError: '',
            search: '',
            modalLoading: false,
            emailServerError: '',
            userNameServerError: '',
            contactServerError: '',
            readOnlyPermanent: '',
            readOnlyCurrent: '',
            editPermanent: false,
            editCurrent: false,
            userPermanent: false,
            permanentAddressDefault:'',
            currentAddressDefault:'',
            pin1:'',
            pin:'',
            currentState:'',
            currentCountry:'',
            currentCountryId:'',
            currentStateId:'',
            currentCity:'',
            currentCityId:'',
            currentState:'',
            currentStateId:'',
            currentLocation:'',
            permanentLocationId:'',
            readOnlyCountryId:'',
            readOnlyStateId:'',
            readOnlyCityId:'',
            readOnlyLocationId:'',
            userCurrent:false,
            viewSocietyMember: false
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    toggleViewtSocietyMember(){
        this.setState({viewSocietyMember: !this.state.viewSocietyMember})
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    refreshData() {
        this.props.getSocietyId().then(() => {}).catch(() => this.setState({ loading: false }));
        this.props.getMemberDetails().then(() => this.setState({ loading: false })).catch(() => this.setState({ loading: false }));
        this.props.getMemberDesignation().then(() => {}).catch(() => this.setState({ loading: false }));
        this.props.getCountry().then(() => {}).catch(() => this.setState({ loading: false }));
        this.props.getState().then(() => {}).catch(() => this.setState({ loading: false }));
        this.props.getCity().then(() => {}).catch(() => this.setState({ loading: false }));
        this.props.getLocation().then(() => {}).catch(() => this.setState({ loading: false }));
    }

    viewMember(firstName, lastName, designationName, gender, currentAddress, permanentAddress,
        contactNumber, email, bankName,
        accountNumber, panCardNumber, dob, IFSCCode, accountHolderName){
            this.setState({
                firstName, lastName, designationName, gender, currentAddress, permanentAddress,
                contactNumber, email, bankName,
                accountNumber, panCardNumber, dob, IFSCCode, accountHolderName, viewSocietyMember: !this.state.viewSocietyMember,
                readOnlyPermanent: permanentAddress, readOnlyCurrent: currentAddress
            });
        }

    editMember(societyId, societyBoardMemberId, firstName, lastName, designationName, gender, currentAddress, permanentAddress,
        contactNumber, email, bankName,
        accountNumber, panCardNumber, dob, IFSCCode, accountHolderName, designationId) {
        this.setState({
            societyId, societyBoardMemberId, firstName, lastName, designationName, gender, currentAddress, permanentAddress,
            contactNumber, email, bankName,
            accountNumber, panCardNumber, dob, IFSCCode, accountHolderName, designationId, editSocietyMember: !this.state.editSocietyMember,
            readOnlyPermanent: permanentAddress, readOnlyCurrent: currentAddress
        });
    }

    searchFilter(search) {
        console.log(search)
        return function (x) {
            if (x) {
                return (x.firstName + ' ' + x.lastName).toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    x.designation_master.designationName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    x.currentAddress.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    x.permanentAddress.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    x.contactNumber.toString().indexOf(search.toString()) !== -1 ||
                    x.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    x.bankName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    x.accountNumber.toString().indexOf(search.toString()) !== -1 ||
                    x.panCardNumber.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    x.dob.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    !search;
            }
        }
    }

    fetchMemberDetails = ({ memberDetails }) => {
        if (memberDetails && memberDetails.societyBoardMember) {
            return memberDetails.societyBoardMember.sort((item1, item2) => {
                if (item1 && item2) {
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                if (item) {
                    return (
                        <tr key={item.societyBoardMemberId}>
                            <td><input type="checkbox" name="ids" className="SelectAll" value={item.societyBoardMemberId}
                                onChange={(e) => {
                                    let { societyBoardMemberId } = item
                                    if (!e.target.checked) {
                                        document.getElementById('allSelect').checked = false;
                                        let indexOfId = this.state.ids.indexOf(societyBoardMemberId);
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1)
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true })
                                        }
                                    }
                                    else {
                                        this.setState({ ids: [...this.state.ids, societyBoardMemberId] });
                                        if (this.state.ids.length >= 0) {
                                            this.setState({ isDisabled: false })
                                        }
                                    }
                                }} /></td>
                            <td>{index + 1}</td>
                            <td>{item.firstName}{' '}{item.lastName}</td>
                            <td>{item.designation_master.designationName}</td>
                            <td>{item.contactNumber}</td>
                            <td>{item.email}</td>
                            <td>
                                <Button color="success" className="mr-2" onClick={this.viewMember.bind(this,
                                   item.firstName, item.lastName, item.designation_master.designationName,
                                    item.gender, item.currentAddress,
                                    item.permanentAddress,
                                    item.contactNumber,
                                    item.email, item.bankName, item.accountNumber, item.panCardNumber, item.dob,
                                    item.IFSCCode,item.accountHolderName
                                )} >View</Button>
                                
                            </td>
                            <td>
                                <Button color="success" className="mr-2" onClick={this.editMember.bind(this,
                                    item.societyId,
                                    item.societyBoardMemberId, item.firstName, item.lastName, item.designation_master.designationName,
                                    item.gender, item.currentAddress,
                                    item.permanentAddress,
                                    item.contactNumber,
                                    item.email, item.bankName, item.accountNumber, item.panCardNumber, item.dob,
                                    item.IFSCCode,item.accountHolderName,
                                    item.designation_master.designationId,
                                )} >Edit</Button>
                                <Button color="danger" onClick={this.deleteSocietyMember.bind(this, item.societyBoardMemberId)}>Delete</Button>
                            </td>
                        </tr>
                    )
                }
            })
        }
    }

    deleteSocietyMember(societyBoardMemberId) {
        this.setState({ loading: true, isDisabled: true })
        this.props.deleteSocietyMemberDetail(societyBoardMemberId)
            .then(() => this.refreshData())
    }

    route = () => {
        return this.props.history.replace('/superDashboard/boardMemberRegistartionForm');
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if (ar.length > 0) {
            this.setState({ isDisabled: false });
        }
    }

    unSelectAll = () => {

        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }

    }

    deleteSelected = ids => e => {
        e.preventDefault()
        this.setState({ loading: true, isDisabled: true })
        console.log(ids);
        this.props.deleteMultipleSocietyMemberDetail(ids)
            .then(() => this.refreshData())
    }

    panChange = (e) => {
        console.log(this.state.panCardNumber)
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.toUpperCase(), errors });
        }
        else {
            this.setState({ panCardNumber: e.target.value.toUpperCase() })
        }

    }

    toggleEditSocietyMember() {
        this.setState({
            editSocietyMember: !this.state.editSocietyMember, emailServerError: '', userNameServerError: '',
            contactServerError: '', errors: {}, userPermanent:false,editPermanent:false,countryId:'',
            stateId:'', cityId:'', locationId:'', permanentAddress: this.state.readOnlyPermanent,
            editCurrent:false, userCurrent:false, currentCountryId:'', currentStateId:'',currentCityId:'',
            currentLocationId:'', sameAsPermanent:false
        });
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

    contactChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors, contactServerError: '' });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim(), contactServerError: '' })
        }

    }

    fetchDesignation = ({ designation }) => {
        if (designation && designation.designation) {
            return designation.designation.map((item) => {
                return (
                    <option key={item.designationId} value={item.designationId}>{item.designationName}</option>
                );
            })
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
        this.updateCountryAddress(selectOption.countryName)
    }

    updateCountryAddress = (countryName) => {
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
        this.updateStateAddress(selectOption.stateName)
    }

    updateStateAddress = (stateName) => {
        console.log(stateName)
        this.setState({stateName})
        this.setState({permanentAddress: this.state.permanentAddressDefault  + ', ' + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
        this.state.cityName + ', ' + stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + this.state.pin})
        console.log('updatePermanentAddress', this.state.permanentAddress)
    }
    
    cityName=({cityResult})=>{
       
        if(cityResult){
            
           return( 
            cityResult.map((item) =>{ 
                   if(item){
                    return(
                        { ...item, label: item.cityName, value: item.cityId }
                       )
                   }
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
        this.updateCityAddress(selectOption.cityName)
    }

    updateCityAddress = (cityName) => {
        console.log(cityName)
        this.setState({cityName})
        this.setState({permanentAddress: this.state.permanentAddressDefault  + ', ' + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
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

    bankValidation(e) {
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
        this.setState({ email: e.target.value, emailServerError: '' })
        if (e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
            this.setState({ [e.target.name]: e.target.value.trim() });
            console.log(this.state.email)
            this.setState({ emailValidError: '' })
        }
        else { this.setState({ emailValidError: 'Invalid Email.' }) }
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log(this.state.email)
            this.setState({ [e.target.name]: e.target.value.trim(), errors });
        }
        else {
            this.setState({ email: e.target.value.trim() });
        }

    }

    loadingInactive = () => {
        this.setState({ modalLoading: false, editSocietyMember: !this.state.editSocietyMember,userPermanent:false,editPermanent:false,
            countryId:'',stateId:'', cityId:'', locationId:'',
            editCurrent:false, userCurrent:false, currentCountryId:'', currentStateId:'',currentCityId:'',
            currentLocationId:'' })
    }

    update = (e) => {
        console.log('hello')
        e.preventDefault();
        let { societyId, firstName,lastName, designationId,gender, countryId, stateId, cityId,
            locationId, currentAddress, permanentAddress,pin1,accountHolderName,
            contactNumber, email, bankName,IFSCCode,
            accountNumber, panCardNumber, dob, societyBoardMemberId, pin } = this.state;
        let errors = {};
        if (firstName === '') errors.firstName = `First Name can't be empty.`
        if(lastName === '') errors.lastName = `Last Name can't be empty.`
        if(!gender) errors.gender = `Please select gender.`
        if(IFSCCode === '') errors.IFSCCode=`IFSC code can't be empty.`
        else if(IFSCCode.length !== 11) errors.IFSCCode=`IFSC code should be of 11 digits.`
        if (currentAddress === '') { errors.currentAddress = `Current Address can't be empty.` }
        if(!!document.getElementById('isChecked').checked){
            if(this.state.permanentAddressDefault === '') errors.permanentAddressDefault = `Permanent Address can't be empty.`;
        }
        if(!!document.getElementById('isCurrentChecked').checked){
            if(this.state.currentAddressDefault === '') errors.currentAddressDefault = `Current Address can't be empty.`;
        }
        if (permanentAddress === '') { errors.permanentAddress = `Permanent Address can't be empty.` }
        if (contactNumber === '') { errors.contactNumber = `Contact can't be empty.` }
        else if (contactNumber.length !== 10) errors.contactNumber = "Contact length should be of 10."
        if (email === '') { errors.email = `Email can't be empty.` }
        if (bankName === '') { errors.bankName = `Bank Name can't be empty.` }
        
        if (accountHolderName === '') { errors.accountHolderName = `Account Holder Name can't be empty.` }
        if (accountNumber === '') { errors.accountNumber = `Account Number can't be empty.` }
        if (panCardNumber === '') { errors.panCardNumber = `Pan Card Number can't be empty.` }
        else if (panCardNumber.length !== 10) { errors.panCardNumber = `Pan length should be of 10.` }
        if (dob === '') { errors.dob = `Date of birth can't be empty.` };
        if(!!document.getElementById('isChecked').checked){
            if(pin1 === '') errors.pin1 = `Pin/Zip code can't be empty.`
            else if(pin1.length < 5) errors.pin1 = `Pin/Zip code should be of 5 digits atleast.`
        }
        if(!!document.getElementById('isCurrentChecked').checked){
            if(pin === '') errors.pin = `Pin/Zip code can't be empty.`
            else if(pin.length < 5) errors.pin = `Pin/Zip code should be of 5 digits atleast.`
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid && this.state.emailValidError === '') {
            console.log('hello1')
            this.setState({ modalLoading: true })

            this.props.updateSocietyMemberDetails(societyId, firstName,lastName, designationId,gender,
                countryId, stateId, cityId,
                locationId, currentAddress, permanentAddress,
                contactNumber, email, bankName,
                accountNumber, panCardNumber, dob, IFSCCode, accountHolderName, societyBoardMemberId)
                .then(() => this.loadingInactive())
                .catch(err => {
                    err.response.data.message
                    this.setState({
                        modalLoading: false,  contactServerError: err.response.data.messageContactErr,
                        emailServerError: err.response.data.messageEmailErr
                    })
                })
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    maxDate = () => {
        var d = new Date();
        d.setFullYear(d.getFullYear() - 18, d.getMonth());
        return d.toISOString().split('T')[0];
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }

    editPermanentAddress = () => {
        if (!!document.getElementById('isChecked').checked) {
            console.log('is checked')
            //    this.setState({permanentAddress: this.state.currentAddress, permanentAddressVisible:true, editPermanent:false})
            this.setState({ editPermanent: true, permanentAddress: '', userPermanent: true, countryId:'',stateId:'',
        cityId:'', locationId:'' })
        }
        else {
            // this.setState({permanentAddress: '' , permanentAddressVisible:false, editPermanent:true})
            this.setState({ editPermanent: false, permanentAddress: this.state.readOnlyPermanent, userPermanent: false,
            countryId:this.state.readOnlyCountryId, stateId:this.state.readOnlyStateId, cityId:this.state.readOnlyCityId,
        locationId: this.state.readOnlyLocationId })
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
    // if(!!document.getElementById('isChecked1').checked){
    //     this.setState({currentAddress: e.target.value + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
    //     this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1})
    // }
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

updatePermanentAddress = (pin1) => {
    this.setState({pin1})
    this.setState({permanentAddress: this.state.permanentAddressDefault  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
    this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + pin1})
}

countryChange = (currentCountryId, currentCountry, selectOption) => {
    this.setState({
        currentCountry: selectOption.countryName,
        currentCountryId:selectOption.countryId, 
    })
    
    this.props.getState(selectOption.countryId)
    this.updateCountryCurrent(selectOption.countryName)
}

updateCountryCurrent = (currentCountry) => {
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
    this.updateStateCurrent(selectOption.stateName)
}

updateStateCurrent = (currentState) => {
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
    this.updateCityCurrent(selectOption.cityName)
}

updateCityCurrent = (currentCity) => {
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
        permanentLocationId:selectOption.locationId,
        
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

currentAddressIsChecked = () => {
    if(!!document.getElementById('isCurrentChecked').checked){
        this.setState({editCurrent:true, currentAddress:'', userCurrent:true})
    }
    else{
        this.setState({editCurrent:false, currentAddress: this.state.readOnlyCurrent, userCurrent:false})
    }
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

    render() {
        console.log(this.props.societyReducer.countryResult)
        let tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{ alignContent: 'baseline' }}></th>
                    <th>#</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => {
                        this.setState((state) => {
                            return {
                                sortVal: !state.sortVal,
                                filterName: 'firstName'
                            }
                        });
                    }}>Member Name<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th>Designation</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>View Member Detail</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.fetchMemberDetails(this.props.boardMemberReducer)}
            </tbody>
        </Table>

        let modalData = <div>
            <FormGroup>
                <Row md={12}>
                    <Col md={3}>
                        <Label>First Name</Label>
                        <Input name="firstName" type="text" value={this.state.firstName}
                            onChange={this.onChange} maxLength='40' />
                        {!this.state.firstName ? <span className="error">{this.state.errors.firstName}</span> : ''}
                    </Col>
                    <Col md={3}>
                        <Label>Last Name</Label>
                        <Input name="lastName" type="text" value={this.state.lastName}
                            onChange={this.onChange} maxLength='40' />
                        {!this.state.lastName ? <span className="error">{this.state.errors.lastName}</span> : ''}
                    </Col>
                    <Col md={3}>
                        <Label>Date of Birth</Label>
                        <Input type="date" max={this.maxDate()} name="dob" value={this.state.dob} onChange={this.onChange} />
                        {<span className="error">{this.state.errors.dob}</span>}
                    </Col>
                    <Col md={3}>
                        <Label>Designation</Label>
                        <Input name="designationId" type="select" onChange={this.onChange} value={this.state.designationId}>
                            <DefaultSelect />
                            {this.fetchDesignation(this.props.boardMemberReducer)}
                        </Input>
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <Label>Gender:</Label>
                <Label htmlFor="Gender1" style={{ paddingRight: '35px', paddingLeft: '20px' }}>Male</Label>
                <span><Input name="gender"
                    onChange={this.onChange} type="radio" value={this.state.Male}
                    checked={this.state.Male === this.state.gender ? true : false} /></span>


                <Label htmlFor="Gender2" style={{ paddingRight: '35px', paddingLeft: '20px' }}>Female</Label>
                <span><Input name="gender" onChange={this.onChange} type="radio"
                    value={this.state.Female} checked={this.state.Female === this.state.gender ? true : false} /></span>


                <Label htmlFor="Gender3" style={{ paddingRight: '35px', paddingLeft: '20px' }}>Other</Label>
                <span><Input name="gender" onChange={this.onChange} type="radio"
                    value={this.state.Other} checked={this.state.Other === this.state.gender ? true : false} /></span>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Contact Number</Label>
                        <Input placeholder="Contact Number"
                            type="text"
                            name="contactNumber"
                            onChange={this.contactChange}
                            value={this.state.contactNumber}
                            maxLength="10"
                            onKeyPress={this.OnKeyPresshandlerPhone} />
                        {<span className="error">{this.state.errors.contactNumber}</span>}
                        {this.state.contactServerError ? <span className="error">{this.state.contactServerError}</span> : null}
                    </Col>
                    <Col md={6}>
                        <Label>Email</Label>
                        <Input
                            placeholder="Email"
                            type="email"
                            value={this.state.email}
                            name="email"
                            onChange={this.emailChange}
                            maxLength="70"
                            onKeyPress={this.emailValid} />
                        {this.state.emailServerError ? <span className="error">{this.state.emailServerError}</span> : null}
                        <span><br /></span>
                        {<span className="error">{this.state.errors.email}</span>}
                        {<span className="error">{this.state.emailValidError}</span>}
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row md={12}>
                    {!this.state.editPermanent ? <Col md={6}>
                        <Label>Permanent Address</Label>
                        <Input type="textarea"
                            value={this.state.readOnlyPermanent}
                            placeholder="Permanent Address"
                            name="readOnlyPermanent" disabled
                            onChange={this.onChange}
                            maxLength='250' />
                        {/* {!this.state.permanentAddress ? <span className="error">{this.state.errors.permanentAddress}</span>: ''} */}
                    </Col> : ''}
                    {this.state.editPermanent ? <Col md={12} style={{ textAlign: 'center' }}><span style={{ fontWeight: '600' }}>Do you want to edit permanent address?</span><Input type="checkbox" onChange={this.editPermanentAddress} name="isChecked" id="isChecked" className="ml-3" /></Col> :
                        <Col md={6} style={{ paddingTop: '44px' }}><span style={{ fontWeight: '600' }}>Do you want to edit permanent<br /> address?</span><Input type="checkbox" onChange={this.editPermanentAddress} name="isChecked" id="isChecked" className="ml-3" /></Col>}
                </Row>
            </FormGroup>
            {this.state.userPermanent ? <div>
                <h4 style={{textAlign:'center', fontWeight:'600', textDecoration: 'underline'}}>Edit Permanent Address</h4>
                <FormGroup>
                    <Row md={12}>
                        <Col md={3}>
                            <Label>Country</Label>
                            <Select placeholder={<DefaultSelect />} options={this.countryName(this.props.societyReducer)} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
                        </Col>
                        <Col md={3}>
                            <Label>State</Label>
                            <Select placeholder={<DefaultSelect />} options={this.stateName(this.props.societyReducer)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
                        </Col>
                        <Col md={3}>
                            <Label>City</Label>
                            <Select placeholder={<DefaultSelect />} options={this.cityName(this.props.societyReducer)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                        </Col>
                        <Col md={3}>
                            <Label>Location</Label>
                            <Select placeholder={<DefaultSelect />} options={this.locationName(this.props.societyReducer)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
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
                            {<span className="error">{this.state.errors.permanentAddressDefault}</span>}
                        </Col>
                    </Row>
                </FormGroup>
            </div> : ''}
            <FormGroup>
                <Row md={12}>
                    {!this.state.editCurrent ? <Col md={6}>
                        <Label>Current Address</Label>
                        <Input onKeyPress={this.keyPress}
                            name="readOnlyCurrent"
                            value={this.state.currentAddress}
                            type="textarea" disabled
                            placeholder="Current Address"
                            name="readOnlyCurrent"
                            onChange={this.onChange}
                            maxLength='250' />
                        {/* {!this.state.permanentAddress ? <span className="error">{this.state.errors.permanentAddress}</span>: ''} */}
                    </Col>:''}
                    {!this.state.editCurrent ? <Col md={6} style={{ paddingTop: '44px' }}>
                        <span style={{ fontWeight: '600' }}>Do you want to edit current address?</span>
                        <Input type="checkbox" name="isCurrentChecked" id="isCurrentChecked" onChange={this.currentAddressIsChecked} className="ml-3" />
                    </Col>: 
                        <Col md={12} style={{ textAlign:'center' }}>
                            <span style={{ fontWeight: '600' }}>Do you want to edit current address?</span>
                            <Input type="checkbox" name="isCurrentChecked" id="isCurrentChecked" onChange={this.currentAddressIsChecked} className="ml-3" />
                        </Col>}

                    </Row>
            </FormGroup>
            
            {this.state.userCurrent ? 
                <div>
                   <h4 style={{textAlign:'center', fontWeight:'600', textDecoration: 'underline'}}>Edit Current Address</h4>
                    
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
                </div>:''}
            <FormGroup style={{margin:'20px auto'}}>
                <h4 style={{textAlign:'center', fontWeight:'600', marginBottom:'20px'}}>Bank Details</h4>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Bank Name</Label>
                        <Input
                        placeholder="Bank Name"
                        type="text"
                        maxLength="70"
                        name="bankName"
                        onChange={this.onChange}
                        value={this.state.bankName}
                        onKeyPress={this.bankValidation} />
                     {<span className="error">{this.state.errors.bankName}</span>}
                    </Col>
                    <Col md={6}>
                        <Label>IFSC Code</Label>
                        <Input value={this.state.IFSCCode} onChange={this.ifscChange}
                        placeholder="IFSC Code"
                        type="text" 
                        name="IFSCCode" 
                        value={this.state.IFSCCode.toUpperCase()}
                        onKeyPress={(e) => {
                            const pattern = /^[a-zA-Z0-9]+$/;
                            let inputChar = String.fromCharCode(e.charCode);
                            if (!pattern.test(inputChar)) {
                                e.preventDefault();
                            }
                        }}
                        maxLength="11" />
                        {<span className="error">{this.state.errors.IFSCCode}</span>}
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Account Holder Name</Label>
                            <Input placeholder="Account Holder Name"
                            type="text"
                            name="accountHolderName"
                            maxLength="70" 
                            value={this.state.accountHolderName}
                            onChange={this.onChange}
                            onKeyPress={this.OnKeyPressUserhandler} />
                            {<span className="error">{this.state.errors.accountHolderName}</span>}
                    </Col>
                    <Col md={6}>
                        <Label>Account Number</Label>
                        <Input
                            placeholder="Account Number"
                            type="text"
                            name="accountNumber"
                            value={this.state.accountNumber}
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
                            name="panCardNumber"
                            value={this.state.panCardNumber.toUpperCase()}
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

            <FormGroup>
                <Button type="submit" color="primary" onClick={this.update}>Save</Button>{' '}
                <Button color="danger" onClick={this.toggleEditSocietyMember.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>

        let deleteSelectedButton = <Button
            disabled={this.state.isDisabled}
            color="danger"
            className="mb-3"
            onClick={this.deleteSelected(this.state.ids)}>Delete Selected</Button>

        let memberData = <div>
            <FormGroup>
                <Row md={12}>
                    <Col md={3}>
                        <Label>First Name</Label>
                        <Input name="firstName" type="text" readOnly value={this.state.firstName}
                            onChange={this.onChange} maxLength='40' />
                    </Col>
                    <Col md={3}>
                        <Label>Last Name</Label>
                        <Input name="lastName" type="text" value={this.state.lastName}  readOnly
                            onChange={this.onChange} maxLength='40' />
                    </Col>
                    <Col md={3}>
                        <Label>Date of Birth</Label>
                        <Input readOnly type="date" max={this.maxDate()} name="dob" value={this.state.dob} onChange={this.onChange} />
                    </Col>
                    <Col md={3}>
                        <Label>Designation</Label>
                        <Input  readOnly name="designationId" type="text" onChange={this.onChange} value={this.state.designationName} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <Label>Gender:</Label>
                        <Input value={this.state.gender} readOnly onChange={this.onChange} />
                    </Col>
                    <Col md={4}>
                        <Label>Contact Number</Label>
                        <Input placeholder="Contact Number"
                            type="text"
                            name="contactNumber"
                            onChange={this.contactChange}
                            readOnly
                            value={this.state.contactNumber} />
                    </Col>
                    <Col md={4}>
                        <Label>Email</Label>
                        <Input
                            placeholder="Email"
                            type="email"
                            readOnly
                            value={this.state.email}
                            name="email"
                            onChange={this.emailChange}
                            maxLength="70"
                            onKeyPress={this.emailValid} />
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Permanent Address</Label>
                        <Input type='textarea' value={this.state.permanentAddress} onChange={this.permanentAddressChange} readOnly />
                    </Col>
                    <Col md={6}>
                        <Label>Current Address</Label>
                        <Input type='textarea' value={this.state.currentAddress} onChange={this.currentAddressChange}  readOnly />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <h4 style={{textAlign:'center', marginTop:'20px', fontWeight:'600'}}>Bank Details</h4>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Bank Name</Label>
                        <Input value={this.state.bankName} readOnly onChange={this.onChange} />
                    </Col>
                    <Col md={6}>
                        <Label>IFSC Code</Label>
                        <Input value={this.state.IFSCCode} readOnly onChange={this.onChange} />
                    </Col>
                </Row>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Account Holder Name</Label>
                        <Input value={this.state.accountHolderName} readOnly onChange={this.onChange} />
                    </Col>
                    <Col md={6}>
                        <Label>Account Number</Label>
                        <Input value={this.state.accountNumber} readOnly onChange={this.onChange} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Pan Number</Label>
                        <Input value={this.state.panCardNumber} onChange={this.panChange} readOnly />
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Button color="primary" onClick={this.toggleViewtSocietyMember.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>
            
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Board Member Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Board Member</Button>
                    </div>
                    <Modal isOpen={this.state.editSocietyMember} toggle={this.toggleEditSocietyMember.bind(this)}>
                        <ModalHeader toggle={this.toggleEditSocietyMember.bind(this)}>Edit Board Member Details</ModalHeader>
                        <ModalBody>
                            {!this.state.modalLoading ? modalData : <Spinner />}
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.viewSocietyMember} toggle={this.toggleViewtSocietyMember.bind(this)}>
                        <ModalHeader toggle={this.toggleViewtSocietyMember.bind(this)}> Board Member Details</ModalHeader>
                        <ModalBody>
                            {memberData}
                        </ModalBody>
                    </Modal>
                    <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />
                    {deleteSelectedButton}
                    <Label htmlFor="allSelect" style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}>Select All<input className="ml-2"
                        id="allSelect"
                        type="checkbox" onChange={(e) => {
                            if (e.target.checked) {
                                this.selectAll();
                            }
                            else if (!e.target.checked) {
                                this.unSelectAll();
                            }
                        }
                        } /></Label>
                    {!this.state.loading ? tableData : <Spinner />}
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(this.state)
    return {
        societyReducer: state.societyReducer,
        boardMemberReducer: state.boardMemberReducer
    }
}

export default connect(mapStateToProps, {
    getMemberDetails, getSocietyId, getMemberDesignation,
    getCountry, getState, getCity, getLocation, updateSocietyMemberDetails, deleteSocietyMemberDetail,
    deleteMultipleSocietyMemberDetail
})(BoardMemberDetails);