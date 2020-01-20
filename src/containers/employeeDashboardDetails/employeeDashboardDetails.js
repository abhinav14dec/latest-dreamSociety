import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Modal, Button, FormGroup, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { getCountry, getState, getCity, getLocation } from './../../actions/societyMasterAction';
import { getDashboardEmployee, updateDashboardEmployee } from '../../actions/employeeMasterAction';
import {getEmployee} from '../../actions/employeeTypeMasterAction';
import { bindActionCreators } from 'redux';
import { UR } from '../../actionCreators';
import Spinner from '../../components/spinner/spinner'
import UI from '../../components/newUI/superAdminDashboard'
import DefaultSelect from '../../constants/defaultSelect'
import GoogleDocsViewer from 'react-google-docs-viewer';
import {getRfId} from '../../actions/rfIdAction';
import {emailValid} from '../../validation/validation';

class EmployeeDashboardDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editEmployeeData: {
                employeeId: '',


                startDate: '',
                endDate: '',

                selectedDocumentUrl: null,


                modal: false,
                modalIsOpen: false,
                isActive: false
            },
            picture: '',
            profilePicture: '',
            editEmployeeModal: false,
            loading: true,
            countryId: '',
            countryName: '',
            stateName: '',
            stateId: '',
            cityName: '',
            cityId: '',
            locationName: '',
            locationId: '',
            firstName: '',
            middleName: '',
            lastName: '',
            hra:'',
            basic:'',
            travelAllowance:'',
            pf:'',
            esi:'',
            contact: '',
            ids: [],
            isDisabled: true,
            documentOne: '',
            currentAddress: '',
            panCardNumber: '',
            permanentAddress: '',
            contactNumber: '',
            documentTwo: '',
            errors: {},
            filterName: "firstName",
            modalLoading: false,
            readOnlyPermanent: '',
            readOnlyCurrent: '',
            editPermanent: false,
            editCurrent: false,
            userPermanent: false,
            permanentAddressDefault: '',
            currentAddressDefault: '',
            pin1: '',
            pin: '',
            currentState: '',
            currentCountry: '',
            currentCountryId: '',
            currentStateId: '',
            currentCity: '',
            currentCityId: '',
            currentLocation: '',
            permanentLocationId: '',
            readOnlyCountryId: '',
            readOnlyStateId: '',
            readOnlyCityId: '',
            readOnlyLocationId: '',
            userCurrent: false,
            email: '',
            employeeDetailId: '',
            emailServerError: '',

            contactServerError: '',
            displayEmployee: false,
            serviceType: '',
            employeeWorkType: '',
            employeeType: '',
            doc1: '',
            doc2: '',
            rfidId:'',
            rfid:''
        }
    }

    componentDidMount() {
        this.refreshData()
    }


    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    refreshData() {
        const userId=localStorage.getItem('userId')      
        console.log(userId,"userId");
        this.props.getDashboardEmployee(userId).then(() => this.setState({ loading: false, modalLoading: false, editEmployeeModal: false }));
        this.props.getEmployee().then(() => this.setState({ loading: false, modalLoading: false }))
        this.props.getCountry().then(() => this.setState({ loading: false, modalLoading: false }))
        this.props.getState().then(() => this.setState({ loading: false, modalLoading: false }))
        this.props.getCity().then(() => this.setState({ loading: false, modalLoading: false }))
        this.props.getLocation().then(() => this.setState({ loading: false, modalLoading: false }))
        this.props.getRfId().then(() => this.setState({ loading: false,modalLoading: false }))
        this.setState({
            userPermanent: false, editPermanent: false,
            countryId: '', stateId: '', cityId: '', locationId: '',
            editCurrent: false, userCurrent: false, currentCountryId: '', currentStateId: '', currentCityId: '',
            currentLocationId: ''
        })
    }

    onChange = (e) => {


        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }

    }
    openModal = (documentOne) => {

        this.setState({
            documentOne
        })
        this.setState({ modalIsOpen: true });

    }

    Modal = (documentTwo) => {

        this.setState({
            documentTwo
        })

        this.setState({ modal: true });

    }

    toggleModal() {
        this.setState({ modalIsOpen: false });
    }
    toggle() {
        this.setState({ modal: false });
    }

    toggleEditEmployeeModal() {
        this.setState({
            editEmployeeModal: !this.state.editEmployeeModal, emailServerError: '', contactServerError: '', errors: {}, userPermanent: false, editPermanent: false, countryId: '',
            stateId: '', cityId: '', locationId: '', permanentAddress: this.state.readOnlyPermanent,
            editCurrent: false, userCurrent: false, currentCountryId: '', currentStateId: '', currentCityId: '',
            currentLocationId: '', sameAsPermanent: false, rfid:'', rfidId:''
        })
    }
    onPicChange = (event) => {
        if (!!this.state.errors[event.target.name]) {

            let errors = Object.assign({}, this.state.errors)
            delete errors[event.target.name]
            this.setState({ [event.target.name]: event.target.files, errors });
        }
        else {
            this.setState({ profilePicture: event.target.files[0] })

        }

    }

    // onImageChange = (event) => {
    //     if(!!this.state.errors[event.target.name]){

    //         let errors =Object.assign({},this.state.errors)
    //         delete  errors[event.target.name]
    //         this.setState({[event.target.name]:event.target.files,errors});
    //     }
    //     else{
    ImageChange = (event) => {
        if (!!this.state.errors[event.target.name]) {

            let errors = Object.assign({}, this.state.errors)
            delete errors[event.target.name]
            this.setState({ [event.target.name]: event.target.files, errors });
        }
        else {
            if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.setState({ picture: reader.result });
                };

                reader.readAsDataURL(event.target.files[0]);
                this.setState({ profilePicture: event.target.files[0] })
            }
        }
    }

    onFileChange = (event) => {
        if (!!this.state.errors[event.target.name]) {

            let errors = Object.assign({}, this.state.errors)
            delete errors[event.target.name]
            this.setState({ [event.target.name]: event.target.files, errors });
        }
        else {
            this.setState({ documentOne: event.target.files[0] })

        }
    }


    FileChange = (event) => {
        if (!!this.state.errors[event.target.name]) {

            let errors = Object.assign({}, this.state.errors)
            delete errors[event.target.name]
            this.setState({ [event.target.name]: event.target.files, errors });
        }
        else {
            this.setState({ documentTwo: event.target.files[0] })

        }
    }

    editEmployeeResult(employeeId, picture, firstName, middleName, lastName, basic,hra,travelAllowance,pf,esi, contact, email, currentAddress, permanentAddress, documentOne, documentTwo, startDate,  employeeDetailId, rfid, rfidId,serviceType,employeeWorkType,employeeType) {
        console.log(employeeId, picture, firstName, middleName, lastName, basic,hra,travelAllowance,pf,esi, contact, email, currentAddress, permanentAddress, documentOne, documentTwo, startDate,  employeeDetailId, rfid, rfidId,serviceType,employeeWorkType,employeeType,"========viewedit")
        this.setState({
            editEmployeeData: { employeeId, startDate },
            documentOne, documentTwo, picture, firstName, middleName, lastName, basic,hra,travelAllowance,pf,esi, contact, email,
            currentAddress, permanentAddress, employeeDetailId,rfid, rfidId,
            readOnlyPermanent: permanentAddress, readOnlyCurrent: currentAddress, editEmployeeModal: !this.state.editEmployeeModal,serviceType,employeeWorkType,employeeType
        })

    }

    updateEmployee = (employeeId) => {
        let errors = {};

        if (!this.state.firstName) {
            errors.firstName = "First Name can't be empty. "
        }

        if (!this.state.lastName) {
            errors.lastName = "Last Name can't be empty."
        }
        if (!this.state.contact) {
            errors.contact = "contact can't be empty"
        }
        if (!this.state.employeeDetailId) {
            errors.employeeDetailId = "service Type can't be empty"
        }


        if (!this.state.email) {
            errors.email = "email can't be empty"
        }
        if (!this.state.basic) {
            errors.basic = "basic can't be empty."
        }
        if (!!document.getElementById('isChecked').checked) {
            if (this.state.permanentAddressDefault === '') errors.permanentAddressDefault = `Permanent Address can't be empty.`;
        }
        if (!!document.getElementById('isCurrentChecked').checked) {
            if (this.state.currentAddressDefault === '') errors.currentAddressDefault = `Current Address can't be empty.`;
        }
        if (!!document.getElementById('isChecked').checked) {
            if (this.state.pin1 === '') errors.pin1 = `Pin/Zip code can't be empty.`
            else if (this.state.pin1.length < 5) errors.pin1 = `Pin/Zip code should be of 5 digits atleast.`
        }
        if (!!document.getElementById('isCurrentChecked').checked) {
            if (this.state.pin === '') errors.pin = `Pin/Zip code can't be empty.`
            else if (this.state.pin.length < 5) errors.pin = `Pin/Zip code should be of 5 digits atleast.`
        }
        if (!this.state.editEmployeeData.startDate) {
            errors.startDate = " Start Date can't be empty ."
        }



        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {

            const data = new FormData()
            data.append('documentOne', this.state.documentOne)
            data.append('documentTwo', this.state.documentTwo)
            data.append('firstName', this.state.firstName)
            data.append('middleName', this.state.middleName)
            data.append('lastName', this.state.lastName)
            data.append('basic', this.state.basic)
            data.append('hra',this.state.hra)
            data.append('travelAllowance',this.state.travelAllowance)
            data.append('pf',this.state.pf)
            data.append('esi',this.state.esi)
            data.append('email', this.state.email)
            data.append('contact', this.state.contact)
            data.append('employeeDetailId', this.state.employeeDetailId)
            data.append('currentAddress', this.state.currentAddress)
            data.append('permanentAddress', this.state.permanentAddress)

            data.append('startDate', this.state.editEmployeeData.startDate)

            data.append('profilePicture', this.state.profilePicture)
            data.append('rfidId', this.state.rfidId)

            this.props.updateDashboardEmployee(this.state.editEmployeeData.employeeId, data).then(() => this.refreshData()).catch(err => {
                
                this.setState({
                    modalLoading: false, contactServerError: err.response.data.messageContactErr,
                    emailServerError: err.response.data.messageEmailErr
                })
            })

            this.setState({
                modalLoading: true

            })

        }
    }

   

    countryChange = (currentCountryId, currentCountry, selectOption) => {

        this.setState({
            currentCountry: selectOption.countryName,
            currentCountryId: selectOption.countryId,
        })

        this.props.getState(selectOption.countryId)
    }


    stateChange = (currentState, currentStateId, selectOption) => {
        this.setState({
            currentState: selectOption.stateName,
            currentStateId: selectOption.stateId
        })
        this.props.getCity(selectOption.stateId);
    }

    cityChange = (currentCity, currentCityId, selectOption) => {
        this.setState({
            currentCity: selectOption.cityName,
            currentCityId: selectOption.cityId
        })
        this.props.getLocation(selectOption.cityId)
    }

    locationChange = (currentLocation, currentLocationId, selectOption) => {
        this.setState({
            currentLocation: selectOption.locationName,
            permanentLocationId: selectOption.locationId,

        })
        this.updateCurrentAddress1(selectOption.locationName)
    }

    updateCurrentAddress1 = (location) => {
        this.setState({ location })
        this.setState({
            currentAddress: `${this.state.currentAddressDefault}, ${location}, 
                ${this.state.currentCity}, ${this.state.currentState},  ${this.state.currentCountry}, Pin/Zip Code: ${this.state.pin}`
        })
    }

    pinChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
        this.updateCurrentAddress(e.target.value)
    }

    updateCurrentAddress = (pin) => {
        this.setState({ pin })
        this.setState({
            currentAddress: this.state.currentAddressDefault + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
                `${this.state.currentCity}, ${this.state.currentState}, ${this.state.currentCountry}, Pin/Zip Code: ${pin}`
        })
    }

    currentAddressChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                currentAddressDefault: e.target.value, currentAddress: e.target.value + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
                    `${this.state.currentCity}, ${this.state.currentState}, ${this.state.currentCountry}, Pin/Zip code: ${this.state.pin}`, errors
            });
        }
        else {
            this.setState({
                currentAddressDefault: e.target.value, currentAddress: e.target.value + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
                `${this.state.currentCity}, ${this.state.currentState}, ${this.state.currentCountry}, Pin/Zip code: ${this.state.pin}`
            })
        }
    }

    currentAddressIsChecked = () => {
        if (!!document.getElementById('isCurrentChecked').checked) {
            this.setState({ editCurrent: true, currentAddress: '', userCurrent: true })
        }
        else {
            this.setState({ editCurrent: false, currentAddress: this.state.readOnlyCurrent, userCurrent: false })
        }
    }
   
    emailChange = (e) => {
        this.setState({ errors: { email: '' } })
        this.setState({ email: e.target.value, emailServerError: '' })
        // eslint-disable-next-line
        if (e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
            this.setState({ [e.target.name]: e.target.value.trim() });
            this.setState({ emailValidError: '' })
        }
        else { this.setState({ emailValidError: 'Invalid Email.' }) }
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors });
        }
        else {
            this.setState({ email: e.target.value });
        }

    }



    getEmployeeResult({ getDashboardEmployee }) {
        if (getDashboardEmployee && getDashboardEmployee.data && getDashboardEmployee.data.employee) {
                    let item=getDashboardEmployee.data.employee;
                    console.log(item,"=====")
                    return (
                        <tr key={item.employeeId}>
                            <td style={{ width: '4%' }}><img style={{ width: "100px", height: "100px" }} src={UR + item.picture} alt="Profile Pic" /></td>
                            <td >{`${item.firstName} ${item.lastName}`}</td>
                            <td>{item.employee_detail_master ? item.employee_detail_master.serviceType : ''}-
                            {item.employee_detail_master ? item.employee_detail_master.employee_work_type_master.employeeWorkType : ''}
                                -{item.employee_detail_master ? item.employee_detail_master.employee_type_master.employeeType : ''}</td>
                            <td>{item.basic}</td>
                            <td>{item.hra}</td>
                            <td>{item.travelAllowance}</td>
                            <td>{item.pf}</td>
                            <td>{item.esi}</td>
                            <td>{item.rfid_master ? item.rfid_master.rfid : ''}</td>

                            <td> <button className="btn btn-success" onClick={this.viewData.bind(this, UR + item.picture, item.firstName, item.middleName, item.lastName, item.basic,item.hra,item.travelAllowance,item.pf,item.esi, item.contact, item.email, item.currentAddress, item.permanentAddress, UR + item.documentOne, UR + item.documentTwo, item.startDate,
                                 item.employee_detail_master.serviceType, item.employee_detail_master.employee_work_type_master.employeeWorkType, item.employee_detail_master.employee_type_master.employeeType, item.rfid_master ? item.rfid_master.rfid :'' , item.rfid_master ? item.rfid_master.rfidId: '')}>View</button></td>

                            <td>
                                <button className="btn btn-success mr-2" onClick={this.editEmployeeResult.bind(this, item.employeeId, UR + item.picture, item.firstName, item.middleName, item.lastName, item.basic,item.hra,item.travelAllowance,item.pf,item.esi, item.contact, item.email, item.currentAddress, item.permanentAddress, UR + item.documentOne, UR + item.documentTwo, item.startDate, item.employee_detail_master.employeeDetailId,  item.rfid_master ? item.rfid_master.rfid : '', item.rfid_master ? item.rfid_master.rfidId : '',item.employee_detail_master.serviceType, item.employee_detail_master.employee_work_type_master.employeeWorkType, item.employee_detail_master.employee_type_master.employeeType)} >Edit</button>

                            </td>


                        </tr>
                    )
                
        }
    }

    viewData(picture, firstName, middleName, lastName, basic,hra,travelAllowance,pf,esi, contact, email, currentAddress, permanentAddress, doc1, doc2, startDate, serviceType, employeeWorkType,
        employeeType, rfid, rfidId) {
            console.log(picture, firstName, middleName, lastName, basic,hra,travelAllowance,pf,esi, contact, email, currentAddress, permanentAddress, doc1, doc2, startDate, serviceType, employeeWorkType,
                employeeType, rfid, rfidId)
        this.setState({
            picture, firstName, middleName, lastName, basic,hra,travelAllowance,pf,esi, contact, email, currentAddress, permanentAddress, doc1, doc2, startDate, serviceType, employeeWorkType,
            employeeType,rfid, rfidId, displayEmployee: true
        })
    }

    close = () => {
        return this.props.history.replace('/superDashBoard/displayemployee');
    }
    
    rfidData=({ ownerRf })=> {
        if(ownerRf && ownerRf.rfids){
            return (
                ownerRf.rfids.map((item)=>{ 
                    return (
                        <option key={item.rfidId} value={item.rfidId}>
                            {item.rfid}
                        </option>
                    )
                })
            )

        }
    }

    getService = ({ getEmployee }) => {
        if (getEmployee && getEmployee.employeeDetail) {
            return getEmployee.employeeDetail.map((item) => { console.log(item,"=======i")
                return (
                    <option key={item.employeeDetailId} value={item.employeeDetailId}>
                        {item.serviceType}-{item.employee_work_type_master.employeeWorkType}-
                                   {item.employee_type_master.employeeType}
                    </option>
                )
            })
        }
    }


  

    onChangeCountry = (countryId, countryName, selectOption) => {

        this.setState({
            countryName: selectOption.countryName,
            countryId: selectOption.countryId,
        })

        this.props.getState(selectOption.countryId)
    }


    onChangeState = (stateName, stateId, selectOption) => {
        this.setState({
            stateName: selectOption.stateName,
            stateId: selectOption.stateId
        })
        this.props.getCity(selectOption.stateId);
    }

    onChangeCity = (cityName, cityId, selectOption) => {
        this.setState({
            cityName: selectOption.cityName,
            cityId: selectOption.cityId
        })
        this.props.getLocation(selectOption.cityId)
    }

    onChangeLocation = (locationName, locationId, selectOption) => {
        this.setState({
            locationName: selectOption.locationName,
            locationId: selectOption.locationId,

        })
        this.updatePermanentAddress1(selectOption.locationName)
    }

    updatePermanentAddress1 = (location) => {
        this.setState({ location })
        this.setState({
            permanentAddress: `${this.state.permanentAddressDefault}, ${location} ,
            ${this.state.cityName},  ${this.state.stateName},  ${this.state.countryName} , Pin/Zip Code: ${this.state.pin}`
        })
    }




    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }

    countryName1 = ({ countryResult }) => {
        if (countryResult) {

            return (
                countryResult.map((item) => {
                    return (
                        { ...item, label: item.countryName, value: item.countryId }
                    )
                })
            )

        }
    }

    stateName1 = ({ stateResult }) => {
        if (stateResult) {
            return (
                stateResult.map((item) => {
                    return (
                        { ...item, label: item.stateName, value: item.stateId }
                    )
                })
            )

        }
    }

    cityName1 = ({ cityResult }) => {

        if (cityResult) {

            return (
                cityResult.map((item) => {
                    return (
                        { ...item, label: item.cityName, value: item.cityId }
                    )
                }
                )
            )

        }
    }

    locationName1 = ({ locationResult }) => {
        if (locationResult) {

            return (
                locationResult.map((item) => {
                    return (
                        { ...item, label: item.locationName, value: item.locationId }
                    )
                }
                )
            )

        }
    }

    editPermanentAddress = () => {
        if (!!document.getElementById('isChecked').checked) {
            //    this.setState({permanentAddress: this.state.currentAddress, permanentAddressVisible:true, editPermanent:false})
            this.setState({
                editPermanent: true, permanentAddress: '', userPermanent: true, countryId: '', stateId: '',
                cityId: '', locationId: ''
            })
        }
        else {
            // this.setState({permanentAddress: '' , permanentAddressVisible:false, editPermanent:true})
            this.setState({
                editPermanent: false, permanentAddress: this.state.readOnlyPermanent, userPermanent: false,
                countryId: this.state.readOnlyCountryId, stateId: this.state.readOnlyStateId, cityId: this.state.readOnlyCityId,
                locationId: this.state.readOnlyLocationId
            })
        }
    }
    OnKeyPressNumber(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    rfIdChangeHandler=(e)=>{
           console.log(e.target.value,"======rfid------")
        this.setState({
            rfidId:e.target.value
        })

    }


    pinChange1 = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ pin1: e.target.value, errors });
        }
        else {
            this.setState({ pin1: e.target.value });
        }
        this.updatePermanentAddress(e.target.value)
    }

    updatePermanentAddress = (pin1) => {
        this.setState({ pin1 })
        this.setState({
            permanentAddress: this.state.permanentAddressDefault + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                `${this.state.cityName}, ${this.state.stateName}, ${this.state.countryName}, Pin/Zip Code: ${pin1}`
        })
    }

    countryName = ({ countryResult }) => {
        if (countryResult) {

            return (
                countryResult.map((item) => {
                    return (
                        { ...item, label: item.countryName, value: item.countryId }
                    )
                })
            )

        }
    }

    stateName = ({ stateResult }) => {
        if (stateResult) {
            return (
                stateResult.map((item) => {
                    return (
                        { ...item, label: item.stateName, value: item.stateId }
                    )
                })
            )

        }
    }

    cityName = ({ cityResult }) => {

        if (cityResult) {

            return (
                cityResult.map((item) => {
                    return (
                        { ...item, label: item.cityName, value: item.cityId }
                    )
                }
                )
            )

        }
    }

    locationName = ({ locationResult }) => {
        if (locationResult) {

            return (
                locationResult.map((item) => {
                    return (
                        { ...item, label: item.locationName, value: item.locationId }
                    )
                }
                )
            )

        }
    }

    permanentAddressChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                permanentAddressDefault: e.target.value, permanentAddress: e.target.value + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                    `${this.state.cityName}, ${this.state.stateName}, ${this.state.countryName}, Pin/Zip code: ${this.state.pin1}`, errors
            });
        }
        else {
            this.setState({
                permanentAddressDefault: e.target.value, permanentAddress: e.target.value + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                    `${this.state.cityName}, ${this.state.stateName}, ${this.state.countryName}, Pin/Zip code: ${this.state.pin1}`
            })
        }

    }

    toggleEmployeeModal = () => {
        this.setState({ displayEmployee: !this.state.displayEmployee })
    }

    fNameKeyPress(event) {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onRateChange=(e)=>{
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});          
        }}


    render() {
        console.log("rfid", this.state.rfid,this.state.rfidId,this.state.doc1)
        
        let employeeData = <div>
            <FormGroup>
                <div style={{ border: '1px solid black', textAlign: 'center', width: '100px', height: '100px', margin: '0 auto' }}>
                    <img src={this.state.picture} height='100px' width='100px' alt="profile pic"/>
                </div>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>First Name</Label>
                        <Input value={this.state.firstName} onChange={this.onChange} readOnly />
                    </Col>
                    <Col md={6}>
                        <Label>Last Name</Label>
                        <Input value={this.state.lastName} onChange={this.onChange} readOnly />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Email</Label>
                        <Input value={this.state.email} onChange={this.onChange} readOnly />
                    </Col>
                    <Col md={6}>
                        <Label>Contact</Label>
                        <Input value={this.state.contact} onChange={this.onChange} readOnly />
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row md={12}>
                <Col md={6}>
                        <Label>Service Type</Label>
                        <Input value={this.state.serviceType + ' - ' + this.state.employeeWorkType + ' - ' + this.state.employeeType} onChange={this.onChange} readOnly />
                    </Col>
                    <Col md={6}>
                        <Label>basic</Label>
                        <Input value={this.state.basic} readOnly />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
        <Row md={12}>
           <Col md={6}>
               <Input placeholder="HRA" value={this.state.hra} readOnly></Input>
           </Col>
           <Col md={6}>
           <Input placeholder="Travel Allowance" value={this.state.travelAllowance} readOnly></Input>
           </Col>
        </Row>
    </FormGroup>
    <FormGroup>
        <Row md={12}>
           <Col md={6}>
               <Input placeholder="PF"  value={this.state.pf}  readOnly></Input>
           </Col>
           <Col md={6}>
           <Input placeholder="ESI"  value={this.state.esi}  readOnly></Input>
           </Col>
        </Row>
    </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Permanent Address</Label>
                        <Input type="textarea" value={this.state.permanentAddress} onChange={this.onChange} readOnly />
                    </Col>
                    <Col md={6}>
                        <Label>Current Address</Label>
                        <Input type="textarea" value={this.state.currentAddress} onChange={this.onChange} readOnly />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Start Date</Label>
                        <Input readOnly value={this.state.startDate} onChange={this.onChange} />
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </FormGroup>
            <FormGroup style={{ textAlign: 'center' }}>
                <h4>Document One</h4>
                <GoogleDocsViewer
                    width="400px"
                    height="600px"
                    fileUrl={this.state.doc1}
                />
            </FormGroup>

            <FormGroup style={{ textAlign: 'center' }}>
                <h4>Document Two</h4>
                <GoogleDocsViewer
                    width="400px"
                    height="600px"
                    fileUrl={this.state.doc2}
                />
            </FormGroup>
            <FormGroup>
                <Label>RF ID</Label>
                <Input  name="rfidId" onChange={this.onChange} value={this.state.rfid} readOnly>
                    <DefaultSelect />
                    {this.rfidData(this.props.rfId)}
                </Input>
            </FormGroup>
        </div>

        let tableData;

        tableData =
            <Table bordered>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center", width: "12%" }}>Profile Picture</th>
                        <th>Name</th>
                        <th>Service Type</th>
                        <th>Basic Salary</th>
                        <th>HRA</th>
                        <th>Travel Allowance</th>
                        <th>PF</th>
                        <th>ESI</th>
                        <th>RF ID</th>
                        <th>Employee Detail </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getEmployeeResult(this.props.EmpDetails)}
                </tbody>
            </Table>

        let modalData = <div>


            <FormGroup>

                <Row>
                    <Col md={8}>
                        <label>update your Photo</label>
                        <input accept='image/*' type="file" name="profilePicture" onChange={this.ImageChange} />


                    </Col>
                    <Col md={4}>
                        <div style={{ textAlign: 'center' }}>
                            <img id="target" src={this.state.picture} height='100px' width='100px' alt="profile pic" />
                        </div>
                    </Col>

                </Row>


            </FormGroup>


            <FormGroup>
                <Label > First Name</Label>
                <Input name="firstName" value={this.state.firstName}
                    onChange={this.onChange}

                    maxLength={25}
                    onKeyPress={this.fNameKeyPress}

                />
                <span className="error">{this.state.errors.firstName}</span>
            </FormGroup>

            <FormGroup>
                <Label > Last Name</Label>
                <Input name="lastName" value={this.state.lastName}
                    onChange={this.onChange}

                    maxLength={25}
                    onKeyPress={this.fNameKeyPress}

                />
                <span className="error">{this.state.errors.lastName}</span>
            </FormGroup>
            <FormGroup>
                <Label >Salary</Label>
                <Input name="basic" value={this.state.basic}
                    onChange={this.onRateChange}
                    maxLength={20}
                />
                <span className="error" >{this.state.errors.basic}</span>
            </FormGroup>

            <FormGroup>
        <Row md={12}>
           <Col md={6}>
           <Input placeholder="HRA"  name="hra" value={this.state.hra} maxLength={15} onChange={this.onRateChange}></Input>
           </Col>
           <Col md={6}>
           <Input placeholder="Travel Allowance"  name ="travelAllowance"  value={this.state.travelAllowance} onChange ={this.onRateChange}  maxLength={15}></Input>
           </Col>
        </Row>
    </FormGroup>
    <FormGroup>
        <Row md={12}>
           <Col md={6}>
               <Input placeholder="PF"  name ="pf"  value={this.state.pf} onChange={this.onRateChange} maxLength={15}></Input>
           </Col>
           <Col md={6}>
           <Input placeholder="ESI" name ="esi"  value={this.state.esi} onChange={this.onRateChange}  maxLength={15}></Input>
           </Col>
        </Row>
    </FormGroup>

            <FormGroup>
                <Label > Email Address</Label>
                <Input value={this.state.email} name="email" onChange={this.emailChange} onKeyPress={emailValid} />
                {this.state.messageEmailErr ? <span className='error'>{this.state.messageEmailErr}</span> : ''}
                {<span className="error">{this.state.emailValidError}</span>}
                <span><br /></span>
                {<span className="error">{this.state.errors.email}</span>}
            </FormGroup>
            <FormGroup>
                <Label > Contact Number</Label>
                <Input name="contact" value={this.state.contact}
                    onChange={this.onChange}
                    maxLength={10}

                    onKeyPress={this.OnKeyPressNumber}
                />
                {this.state.contactServerError ? <span className='error'>{this.state.contactServerError}</span> : null}
                <span className="error" >{this.state.errors.contact}</span>
            </FormGroup>
            <FormGroup>
                <Label>serviceType</Label>
                <Input type="select" className="form-control" name="employeeDetailId" value={this.state.employeeDetailId} onChange={this.onChange} >
                    <DefaultSelect />
                    {this.getService(this.props.employeeDetails)}
                </Input>
                <span className="error">{this.state.errors.employeeDetailId}</span>

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
                <h4 style={{ textAlign: 'center', fontWeight: '600', textDecoration: 'underline' }}>Edit Permanent Address</h4>
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
                            onChange={this.onChange}
                            maxLength='250' />
                        {/* {!this.state.permanentAddress ? <span className="error">{this.state.errors.permanentAddress}</span>: ''} */}
                    </Col> : ''}
                    {!this.state.editCurrent ? <Col md={6} style={{ paddingTop: '44px' }}>
                        <span style={{ fontWeight: '600' }}>Do you want to edit current address?</span>
                        <Input type="checkbox" name="isCurrentChecked" id="isCurrentChecked" onChange={this.currentAddressIsChecked} className="ml-3" />
                    </Col> :
                        <Col md={12} style={{ textAlign: 'center' }}>
                            <span style={{ fontWeight: '600' }}>Do you want to edit current address?</span>
                            <Input type="checkbox" name="isCurrentChecked" id="isCurrentChecked" onChange={this.currentAddressIsChecked} className="ml-3" />
                        </Col>}

                </Row>
            </FormGroup>

            {this.state.userCurrent ?
                <div>
                    <h4 style={{ textAlign: 'center', fontWeight: '600', textDecoration: 'underline' }}>Edit Current Address</h4>

                    <FormGroup>
                        <Row md={12}>
                            <Col md={3}>
                                <Label>Country</Label>
                                <Select placeholder={<DefaultSelect />} options={this.countryName1(this.props.societyReducer)} onChange={this.countryChange.bind(this, 'currentCountry', 'currentCountryId')} />
                            </Col>
                            <Col md={3}>
                                <Label>State</Label>
                                <Select placeholder={<DefaultSelect />} options={this.stateName1(this.props.societyReducer)} onChange={this.stateChange.bind(this, 'currentState', 'currentStateId')} />
                            </Col>
                            <Col md={3}>
                                <Label>City</Label>
                                <Select placeholder={<DefaultSelect />} options={this.cityName1(this.props.societyReducer)} onChange={this.cityChange.bind(this, 'currentCity', 'currentCityId')} />
                            </Col>
                            <Col md={3}>
                                <Label>Location</Label>
                                <Select placeholder={<DefaultSelect />} options={this.locationName1(this.props.societyReducer)} onChange={this.locationChange.bind(this, 'currentLocation', 'currentLocationId')} />
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
                                {<span className="error">{this.state.errors.currentAddressDefault}</span>}
                            </Col>
                        </Row>
                    </FormGroup>
                </div> : ''}

                <FormGroup>
                <Label>RF ID</Label>
                <Input type="select" name="rfidId" onChange={this.rfIdChangeHandler} >
                    <option value={this.state.rfid}>{this.state.rfid}</option>
                    {/* <DefaultSelect /> */}
                    {this.rfidData(this.props.rfId)}
                </Input>
               </FormGroup>


            <FormGroup>

                <Label > Document One</Label>

                <GoogleDocsViewer
                    width="400px"
                    height="600px"
                    fileUrl={this.state.documentOne}
                />


                <Label> Update your Id</Label>
                <input accept='.docx ,.doc,application/pdf' type="file" name="documentOne" onChange={this.onFileChange} />

            </FormGroup>

            <FormGroup>
                <Label > Document Two</Label>

                <GoogleDocsViewer
                    width="400px"
                    height="600px"
                    fileUrl={this.state.documentTwo}
                />

            </FormGroup>

            <FormGroup>
                <div className="input-contain">
                    <Label> Update your Id</Label>
                    <input accept='.docx,application/pdf' type="file" name="documentTwo" onChange={this.FileChange} />
                </div>
            </FormGroup>

            <FormGroup>
                <Label > Employment Date</Label>
                <Input type="date" value={this.state.editEmployeeData.startDate}


                    onChange={(e) => {
                        let { editEmployeeData } = this.state;

                        editEmployeeData.startDate = e.target.value;

                        this.setState({ editEmployeeData });
                    }}
                    required

                    onKeyPress={this.OnKeyPresshandler}

                />
            </FormGroup>

            <Button color="primary" className="mr-2" onClick={this.updateEmployee}>Save</Button>
            <Button color="danger" onClick={this.toggleEditEmployeeModal.bind(this)}>Cancel</Button>


        </div>

        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details" >
                            <h3 align="center">Personal Details</h3>
                        </div>
                        <Modal isOpen={this.state.editEmployeeModal} toggle={this.toggleEditEmployeeModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditEmployeeModal.bind(this)}>Edit  Employee Details</ModalHeader>
                            <ModalBody>
                                {!this.state.modalLoading ? modalData : <Spinner />}



                            </ModalBody>
                        </Modal>
                        <Modal isOpen={this.state.displayEmployee} toggle={this.toggleEmployeeModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEmployeeModal.bind(this)}>Employee Details</ModalHeader>
                            <ModalBody>
                                {employeeData}
                                <Button color="primary" onClick={this.toggleEmployeeModal.bind(this)}>Cancel</Button>
                            </ModalBody>
                        </Modal>


                        {!this.state.loading ? tableData : <Spinner />}
                    </div>


                    <Modal
                        isOpen={this.state.modalIsOpen} >
                        <ModalHeader toggle={this.toggleModal.bind(this)}></ModalHeader>
                        <ModalBody>

                            <GoogleDocsViewer
                                width="400px"
                                height="780px"
                                fileUrl={this.state.documentOne}
                            />

                        </ModalBody>

                    </Modal>
                    <Modal
                        isOpen={this.state.modal} >
                        <ModalHeader toggle={this.toggle.bind(this)}></ModalHeader>
                        <ModalBody>

                            <GoogleDocsViewer
                                width="400px"
                                height="780px"
                                fileUrl={this.state.documentTwo}
                            />
                        </ModalBody>

                    </Modal>
                </UI>

            </div>
        )
    }

}


function mapStateToProps(state) {
     console.log(state,"=======");
    return {
        EmpDetails: state.EmpDetails,
        locationMasterReducer: state.locationMasterReducer,
        societyReducer: state.societyReducer,
        employeeDetails: state.employeeDetails,
        rfId:state.RFIdReducer


    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getDashboardEmployee,getEmployee, getCountry, getState, getCity, getLocation, updateDashboardEmployee, getRfId }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboardDetails)