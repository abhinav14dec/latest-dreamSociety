import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Modal, Button, FormGroup, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { getCountry, getState, getCity, getLocation } from './../../actions/societyMasterAction';
import { ViewEmployee, updateEmployee, deleteEmployee, deleteMultipleEmployee } from '../../actions/employeeMasterAction';
import { getEmployee } from '../../actions/employeeTypeMasterAction';

import { bindActionCreators } from 'redux';
import { UR } from '../../actionCreators';
import Spinner from '../../components/spinner/spinner'
import UI from '../../components/newUI/superAdminDashboard'
import SearchFilter from '../../components/searchFilter/searchFilter';
import DefaultSelect from '../../constants/defaultSelect'
import _ from 'underscore';
import './employeeMaster.css'
import GoogleDocsViewer from 'react-google-docs-viewer';

class DisplayEmployeeMaster2 extends Component {

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
            search: '',
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
            salary: '',
            contact: '',
            email: '',
            ids: [],
            isDisabled: true,
            documentOne: '',
            countryName: '',
            stateName: '',
            cityName: '',
            locationName: '',
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
            currentState: '',
            currentStateId: '',
            currentLocation: '',
            permanentLocationId: '',
            readOnlyCountryId: '',
            readOnlyStateId: '',
            readOnlyCityId: '',
            readOnlyLocationId: '',
            userCurrent: false,
            contact: '',
            email: '',
            employeeDetailId: '',
            emailServerError: '',

            contactServerError: '',

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
        this.props.getEmployee().then(() => this.setState({ loading: false }))
        this.props.ViewEmployee().then(() => this.setState({ loading: false, modalLoading: false, editEmployeeModal: false }));
        this.props.getCountry().then(() => this.setState({ loading: false, modalLoading: false }))
        this.props.getState().then(() => this.setState({ loading: false, modalLoading: false }))
        this.props.getCity().then(() => this.setState({ loading: false, modalLoading: false }))
        this.props.getLocation().then(() => this.setState({ loading: false, modalLoading: false }))
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
        console.log(documentOne, "ads")
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
            currentLocationId: '', sameAsPermanent: false
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

    editEmployee(employeeId, picture, firstName, middleName, lastName, salary, contact, email, currentAddress, permanentAddress, documentOne, documentTwo, startDate, employeeDetailId) {

        this.setState({
            editEmployeeData: { employeeId, startDate }, documentOne, documentTwo, picture, firstName, middleName, lastName, salary, contact, email, currentAddress, permanentAddress, employeeDetailId,
            readOnlyPermanent: permanentAddress, readOnlyCurrent: currentAddress, editEmployeeModal: !this.state.editEmployeeModal
        })

    }

    updateEmployee = (employeeId) => {
        console.log('abc', this.state.employeeDetailId)
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

        if (!this.state.email) {
            errors.email = "email can't be empty"
        }
        if (!this.state.salary) {
            errors.salary = "salary can't be empty."
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
            data.append('salary', this.state.salary)
            data.append('email', this.state.email)
            data.append('contact', this.state.contact)
            data.append('employeeDetailId', this.state.employeeDetailId)
            data.append('currentAddress', this.state.currentAddress)
            data.append('permanentAddress', this.state.permanentAddress)

            data.append('startDate', this.state.editEmployeeData.startDate)

            data.append('profilePicture', this.state.profilePicture)

            this.props.updateEmployee(this.state.editEmployeeData.employeeId, data).then(() => this.refreshData()).catch(err => {
                err.response.data.message
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

    deleteEmployee(employeeId) {
        this.setState({ loading: true })

        let { isActive } = this.state.editEmployeeData;

        this.props.deleteEmployee(employeeId, isActive).then(() => this.refreshData())
        this.setState({ editEmployeeData: { isActive: false } })
    }

    searchOnChange = (e) => {

        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.firstName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }


    countryChange = (currentCountryId, currentCountry, selectOption) => {
        console.log(currentCountryId, currentCountry, selectOption)

        this.setState({
            currentCountry: selectOption.countryName,
            currentCountryId: selectOption.countryId,
        })

        this.props.getState(selectOption.countryId)
    }


    stateChange = (currentState, currentStateId, selectOption) => {
        console.log(currentState, currentStateId, selectOption)
        this.setState({
            currentState: selectOption.stateName,
            currentStateId: selectOption.stateId
        })
        this.props.getCity(selectOption.stateId);
    }

    cityChange = (currentCity, currentCityId, selectOption) => {
        console.log(currentCity, currentCityId, selectOption)
        this.setState({
            currentCity: selectOption.cityName,
            currentCityId: selectOption.cityId
        })
        this.props.getLocation(selectOption.cityId)
    }

    locationChange = (currentLocation, currentLocationId, selectOption) => {
        console.log(currentLocation, currentLocationId, selectOption)
        this.setState({
            currentLocation: selectOption.locationName,
            permanentLocationId: selectOption.locationId,

        })
        this.updateCurrentAddress1(selectOption.locationName)
    }

    updateCurrentAddress1 = (location) => {
        console.log(location)
        this.setState({ location })
        this.setState({
            currentAddress: this.state.currentAddressDefault + ', ' + location + ', ' +
                this.state.currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip Code: ' + this.state.pin
        })
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
            this.setState({ [e.target.name]: e.target.value });
            console.log(this.state)
        }
        this.updateCurrentAddress(e.target.value)
    }

    updateCurrentAddress = (pin) => {
        console.log(pin)
        this.setState({ pin })
        this.setState({
            currentAddress: this.state.currentAddressDefault + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
                this.state.currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip Code: ' + pin
        })
        console.log('currentAddress', this.state.currentAddress)
    }

    currentAddressChange = (e) => {
        console.log(this.state)
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                currentAddressDefault: e.target.value, currentAddress: e.target.value + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
                    this.state.currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip code: ' + this.state.pin, errors
            });
        }
        else {
            this.setState({
                currentAddressDefault: e.target.value, currentAddress: e.target.value + (this.state.currentLocation ? (', ' + this.state.currentLocation + ', ') : ', ') +
                    this.state.currentCity + ', ' + this.state.currentState + ', ' + this.state.currentCountry + ', ' + 'Pin/Zip code: ' + this.state.pin
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


    emailValid(event) {
        const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    emailChange = (e) => {
        console.log(this.state.email)
        this.setState({ errors: { email: '' } })
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
            this.setState({ email: e.target.value });
        }

    }


    pushEmployee = () => {

        this.props.history.push('/superDashBoard/displayEmployee');
    }
    getEmployee({ getEmployee }) {
        console.log(getEmployee, "1223");
        if (getEmployee) {
            return (
                getEmployee.data.employee.sort((item1, item2) => {
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).filter(this.searchFilter(this.state.search)).map((item, index) => {

                    return (
                        <tr key={item.employeeId}>
                            <td><input type="checkbox" name="ids" value={item.employeeId} className="SelectAll"
                                onChange={(e, i) => {
                                    const { employeeId } = item
                                    if (!e.target.checked) {
                                        if (this.state.ids.length > -1) {
                                            document.getElementById('allSelect').checked = false;
                                            let indexOfId = this.state.ids.indexOf(employeeId);
                                            if (indexOfId > -1) {
                                                this.state.ids.splice(indexOfId, 1)
                                            }
                                            if (this.state.ids.length === 0) {
                                                this.setState({ isDisabled: true })
                                            }
                                        }
                                    }
                                    else {
                                        this.setState({ ids: [...this.state.ids, employeeId] })
                                        if (this.state.ids.length >= 0) {
                                            this.setState({ isDisabled: false })
                                        }
                                    }
                                }} /></td>
                            <td>{index + 1}</td>
                            <td> <button className="bg-info" onClick={this.pushEmployee}>back</button> </td>
                            <td>{item.contact}</td>
                            <td> {item.email}</td>
                            <td> {item.permanentAddress}</td>
                            <td>{item.currentAddress}</td>

                            <td>
                                <button className="btn btn-light" onClick={this.openModal.bind(this, UR + item.documentOne)}>View Document</button>
                            </td>
                            <td>  <button className="btn btn-light" onClick={this.Modal.bind(this, UR + item.documentTwo)}>View Document </button></td>

                            <td>{item.startDate}</td>


                            <td>
                                <button className="btn btn-success" onClick={this.editEmployee.bind(this, item.employeeId, UR + item.picture, item.firstName, item.middleName, item.lastName, item.salary, item.contact, item.email, item.currentAddress, item.permanentAddress, UR + item.documentOne, UR + item.documentTwo, item.startDate, item.employee_detail_master.employeeDetailId)} >Edit</button>
                                <button className="btn btn-danger" onClick={this.deleteEmployee.bind(this, item.employeeId)}> Delete</button>
                            </td>


                        </tr>
                    )
                })
            )
        }
    }
    close = () => {
        return this.props.history.replace('/superDashBoard/displayemployee');
    }


    getService = ({ getEmployee }) => {
        console.log("abc", getEmployee)
        if (getEmployee) {
            return getEmployee.employeeDetail.map((item) => {
                return (
                    <option key={item.employeeDetailId} value={item.employeeDetailId}>
                        {item.serviceType}-{item.employee_work_type_master.employeeWorkType}-
                                   {item.employee_type_master.employeeType}
                    </option>
                )
            })
        }
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
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }
    }

    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        this.props.deleteMultipleEmployee(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
    }

    addEmployee = () => {

        this.props.history.push('/superDashboard/employee')
    }
    OnKeyPressNumber(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }



    onChangeCountry = (countryId, countryName, selectOption) => {
        console.log(countryId, countryName, selectOption)

        this.setState({
            countryName: selectOption.countryName,
            countryId: selectOption.countryId,
        })

        this.props.getState(selectOption.countryId)
    }


    onChangeState = (stateName, stateId, selectOption) => {
        console.log(stateName, stateId, selectOption)
        this.setState({
            stateName: selectOption.stateName,
            stateId: selectOption.stateId
        })
        this.props.getCity(selectOption.stateId);
    }

    onChangeCity = (cityName, cityId, selectOption) => {
        console.log(cityName, cityId, selectOption)
        this.setState({
            cityName: selectOption.cityName,
            cityId: selectOption.cityId
        })
        this.props.getLocation(selectOption.cityId)
    }

    onChangeLocation = (locationName, locationId, selectOption) => {
        console.log(locationName, locationId, selectOption)
        this.setState({
            locationName: selectOption.locationName,
            locationId: selectOption.locationId,

        })
        this.updatePermanentAddress1(selectOption.locationName)
    }

    updatePermanentAddress1 = (location) => {
        console.log(location)
        this.setState({ location })
        this.setState({
            permanentAddress: this.state.permanentAddressDefault + ', ' + location + ', ' +
                this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + this.state.pin
        })
        console.log('updatePermanentAddress', this.state.permanentAddress)
    }


    //  countryName = ({countryResult}) => {
    //      if(countryResult){

    //         return( 
    //          countryResult.map((item) =>{
    //                 return(
    //                     <option key={item.countryId} value={item.countryName}>
    //                      {item.countryName}
    //                     </option>
    //                 )
    //             })
    //         )

    //      }
    //  }


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
            console.log(stateResult)
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
            console.log('is checked')
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

    pinChange1 = (e) => {
        console.log(this.state)
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
        console.log(pin1)
        this.setState({ pin1 })
        this.setState({
            permanentAddress: this.state.permanentAddressDefault + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + pin1
        })
        console.log('updatePermanentAddress', this.state.permanentAddress)
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
            console.log(stateResult)
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
        console.log(this.state)
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                permanentAddressDefault: e.target.value, permanentAddress: e.target.value + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                    this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1, errors
            });
        }
        else {
            this.setState({
                permanentAddressDefault: e.target.value, permanentAddress: e.target.value + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                    this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1
            })
        }
        // if(!!document.getElementById('isChecked1').checked){
        //     this.setState({currentAddress: e.target.value + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
        //     this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1})
        // }
    }


    render() {
        let tableData;

        tableData =
            <Table >
                <thead>
                    <tr>
                        <th style={{ width: "4px" }}></th>
                        <th style={{ width: "4px" }}>#</th>
                        <th> </th>
                        <th>Contact Number</th>
                        <th> Email</th>
                        <th> Permanent Address</th>
                        <th> Current Address</th>
                        <th>ID</th>
                        <th>ID2</th>
                        <th> Employment  Date</th>
                        <th> Actions  </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getEmployee(this.props.EmpDetails)}
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
                            <img id="target" src={this.state.picture} height='100px' width='100px' />
                        </div>
                    </Col>

                </Row>


            </FormGroup>


            <FormGroup>
                <Label > First Name</Label>
                <Input name="firstName" value={this.state.firstName}
                    onChange={this.onChange}

                    maxLength={25}
                    onKeyPress={this.OnKeyPresshandler}

                />
                <span className="error">{this.state.errors.firstName}</span>
            </FormGroup>

            <FormGroup>
                <Label > Last Name</Label>
                <Input name="lastName" value={this.state.lastName}
                    onChange={this.onChange}

                    maxLength={25}
                    onKeyPress={this.OnKeyPresshandler}

                />
                <span className="error">{this.state.errors.lastName}</span>
            </FormGroup>
            <FormGroup>
                <Label > Salary</Label>
                <Input name="salary" value={this.state.salary}
                    onChange={this.onChange}
                    maxLength={20}
                    onKeyPress={this.OnKeyPressNumber}

                />
                <span className="error" >{this.state.errors.salary}</span>
            </FormGroup>

            <FormGroup>
                <Label > Email Address</Label>
                <Input name="email" value={this.state.email}
                    onChange={this.emailChange}
                    onKeyPress={this.emailValid}


                />
                {this.state.emailServerError ? <span className="error">{this.state.emailServerError}</span> : null}

                <span className="error" >{this.state.errors.email}</span>
            </FormGroup>
            <FormGroup>
                <Label > Contact Number</Label>
                <Input name="contact" value={this.state.contact}
                    onChange={this.onChange}
                    maxLength={20}
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
                            name="readOnlyCurrent"
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



        </div>


        let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details" >
                            <h3 align="center"> Employee Details</h3>
                            <Button color="primary" onClick={this.addEmployee} > Add Employee</Button>
                        </div>
                        <Modal isOpen={this.state.editEmployeeModal} toggle={this.toggleEditEmployeeModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditEmployeeModal.bind(this)}>Edit  Employee Details</ModalHeader>
                            <ModalBody>
                                {!this.state.modalLoading ? modalData : <Spinner />}

                                <Button color="primary" className="mr-2" onClick={this.updateEmployee}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditEmployeeModal.bind(this)}>Cancel</Button>

                            </ModalBody>
                        </Modal>
                        <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />

                        {deleteSelectedButton}
                        <label><b> Select All</b><input
                            type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                                if (e.target.checked) {
                                    this.selectAll();
                                }
                                else if (!e.target.checked) {
                                    this.unSelectAll();
                                }
                            }
                            } /></label>
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
    return {
        EmpDetails: state.EmpDetails,
        locationMasterReducer: state.locationMasterReducer,
        societyReducer: state.societyReducer,
        employeeDetails: state.employeeDetails


    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ViewEmployee, getCountry, getState, getCity, getLocation, updateEmployee, deleteEmployee, deleteMultipleEmployee, getEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEmployeeMaster2)