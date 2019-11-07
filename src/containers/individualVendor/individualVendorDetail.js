import React, { Component } from 'react';
import { getIndividualVendor, deleteIndividualVendor, deleteSelectVendor, updateIndividualVendor } from './../../actions/individualVendorAction';
import { getCountry, getState, getCity, getLocation } from '../../actions/societyMasterAction';
import { getServiceType } from './../../actions/serviceMasterAction';
import { getRateType } from './../../actions/vendorMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { DocURN, PicURN } from '../../actionCreators/index'
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import GoogleDocsViewer from 'react-google-docs-viewer';
import Select from 'react-select';
import {getRfId} from '../../actions/rfIdAction';


class IndividualVendorDetail extends Component {

    state = {
        filterName: "firstName",
        individualVendorId: '',
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        currentAddress: '',
        permanentAddress: '',
        documentOne: null,
        documentTwo: '',
        profilePicture: '',
        isActive: false,
        menuVisible: false,
        editVendorModal: false,
        loading: true,
        search: '',
        modal: false,
        modalIsOpen: false,
        ids: [],
        isDisabled: true,
        errors: {},
        message: '',
        modalLoading: false,
        countryId: '',
        stateId: '',
        cityId: '',
        locationId: '',
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
        fileName1: '',
        fileName2: '',
        fileName3: '',
        startTime: '',
        endTime: '',
        startTime1: '',
        endTime1: '',
        startTime2: '',
        endTime2: '',
        serviceId: '',
        rateId: '',
        rate:'',
        userCurrent: false,
        emailError: false,
        rfidId:'',
        rfid:''
        
    }

    componentDidMount() {
        this.refreshData();
    }

    onHandleChange = (e) => {
        this.setState({ message: '' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors)
            delete errors[e.target.name]
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    searchFilter(search) {
        return function (x) {
            return x.firstName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    refreshData() {
        this.props.getIndividualVendor().then(() => this.setState({ loading: false, modalLoading: false, editVendorModal: false, }))
        this.props.getCountry().then(() => this.setState({ loading: false }))
        this.props.getState().then(() => this.setState({ loading: false }))
        this.props.getCity().then(() => this.setState({ loading: false }))
        this.props.getServiceType().then(() => this.setState({ loading: false }))
        this.props.getRateType().then(() => this.setState({ loading: false }))
        this.props.getRfId().then(() => this.setState({ loading: false }))
    }

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


    editUser(individualVendorId, firstName, lastName, currentAddress, permanentAddress, contact, email,rfid, documentOne, documentTwo, rate, profilePicture, countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2,rfidId) {

        this.setState({
            individualVendorId, firstName, lastName, currentAddress, permanentAddress, contact, email,rfid, documentOne, documentTwo, rate, profilePicture
            , countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2,rfidId, editVendorModal: !this.state.editVendorModal,
            readOnlyPermanent: permanentAddress, readOnlyCurrent: currentAddress, readOnlyCountryId: countryId,
            readOnlyStateId: stateId, readOnlyCityId: cityId, readOnlyLocationId: locationId,
        })
        console.log(this.state)

    }


    FileChange1 = (event) => {

        const files = event.target.files;
        const file = files[0];
        const fileName1 = file.name
        if (files && file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.setState({
                    profilePicture:
                        reader.result,
                    fileName1
                })

            };
        }
    }
    FileChange2 = (event) => {

        const files = event.target.files;
        const file = files[0];
        const fileName2 = file.name
        if (files && file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.setState({
                    documentOne:
                        reader.result,
                    fileName2
                })

            };
        }
    }

    FileChange3 = (event) => {

        const files = event.target.files;
        const file = files[0];
        const fileName3 = file.name
        if (files && file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.setState({
                    documentTwo:
                        reader.result,
                    fileName3
                })

            };
        }
    }

    rfIdChangeHandler=(selectOption)=>{
        this.setState({
            rfidId:selectOption.rfidId
        })

    }

    toggleEditVendorModal() {
        this.setState({
            editVendorModal: !this.state.editVendorModal, message: ''
        });
    }
    toggleModal() {
        this.setState({ modalIsOpen: false });
    }
    toggle() {
        this.setState({ modal: false });
    }

    toggleDocumentModal() {
        this.setState({ modalIsOpen: false });
    }


    searchFilter(search) {
        return function (x) {
            return x.firstName.toLowerCase().includes(search.toLowerCase()) ||
                x.lastName.toLowerCase().includes(search.toLowerCase()) ||
                x.contact.toLowerCase().includes(search.toLowerCase()) ||
                x.rfid_master.rfid.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
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


    delete(individualVendorId) {
        this.setState({ loading: true })
        let { isActive } = this.state;
        this.props.deleteIndividualVendor(individualVendorId, isActive)
            .then(() => this.refreshData())
        this.setState({ isActive: false })

    }

    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        this.props.deleteSelectVendor(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
    }

    viewServices(individualVendorId) {
        console.log(individualVendorId)
        localStorage.setItem('individualVendorId', individualVendorId)
        this.props.history.push('/superDashBoard/vendorServiceDetail')
    }


    updateVendor = () => {

        let errors = {};

        const { individualVendorId, firstName, lastName, currentAddress, permanentAddress, contact, email, documentOne, documentTwo, rate, profilePicture, countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2, rfidId, fileName1, fileName2, fileName3 } = this.state
        console.log(individualVendorId, firstName, lastName, currentAddress, permanentAddress, contact, email, documentOne, documentTwo, rate, profilePicture, countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2, rfidId, fileName1, fileName2, fileName3)
        if (this.state.firstName === '') {
            errors.firstName = "First Name can't be empty"
        }
        else if (this.state.lastName === '') {
            errors.lastName = "Last Name can't be empty"
        }
        else if (this.state.currentAddress === '') {
            errors.currentAddress = "Current Address can't be empty"
        }
        else if (this.state.permanentAddress === '') {
            errors.permanentAddress = "Permanent Address can't be empty"
        }
        else if (this.state.contact.length !== 10) {
            errors.contact = "Contact No. must be 10 digits"
        }
        else if (this.state.email === '') {
            errors.email = "Email can't be empty"
        }
        else if (this.state.rate === '') {
            errors.rate = "Rate can't be empty"
        }

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid && this.state.message === '') {


            this.props.updateIndividualVendor(individualVendorId, firstName, lastName, currentAddress, permanentAddress, contact, email, documentOne, documentTwo, rate, profilePicture, countryId, stateId, cityId, locationId, serviceId, rateId, startTime, endTime, startTime1, endTime1, startTime2, endTime2,rfidId, fileName1, fileName2, fileName3)
                .then(() => this.refreshData())
                .catch(err => {
                    this.setState({ modalLoading: false, message: err.response.data.message, loading: false })

                })
            if (this.state.message === '') {
                this.setState({ editVendorModal: true })

            }
            else {
                this.setState({ editVendorModal: false })
            }
            this.setState({
                modalLoading: true
            })
        }
    }

    service({ item }) {
        if (item) {
            return (
                item.map((item) => {
                    return (
                        <option key={item.serviceId} value={item.serviceId}>
                            {item.serviceName}
                        </option>
                    )
                })
            )

        }
    }

    rateTypeDetail({ rate }) {
        if (rate && rate.rate) {
            console.log(rate)

            return (
                rate.rate.map((item) => {
                    return (
                        <option key={item.rateId} value={item.rateId}>
                            {item.rateType}
                        </option>
                    )
                })
            )

        }
    }



    renderList = ({ getVendor }) => {

        if (getVendor && getVendor.vendors) {
            return getVendor.vendors.sort((item1, item2) => {
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((vendors, index) => {
                console.log(vendors)

                return (

                    <tr key={vendors.individualVendorId}>
                        <td><input type="checkbox" name="ids" className="SelectAll" value={vendors.individualVendorId}
                            onChange={(e) => {
                                const { individualVendorId } = vendors;
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    let indexOfId = this.state.ids.indexOf(individualVendorId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, individualVendorId] });
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td>{index + 1}</td>
                        <td>{vendors.firstName}</td>
                        <td>{vendors.lastName}</td>
                        <td>{vendors.currentAddress}</td>
                        <td>{vendors.permanentAddress}</td>
                        <td>{vendors.contact}</td>
                        <td>{vendors.email}</td>
                        <td>{vendors.rfid_master ? vendors.rfid_master.rfid : ''}</td>
                        {/* <td><button className="btn btn-light" onClick={this.openModal.bind(this, vendors.documentOne)}>View Document</button></td>
                        <td><button className="btn btn-light" onClick={this.Modal.bind(this, vendors.documentTwo)}>View Document </button></td> */}
                        <td><button className="btn btn-light" onClick={this.openModal.bind(this, vendors.documentOne)}>View Document</button></td>
                        <td><button className="btn btn-light" onClick={this.Modal.bind(this, vendors.documentTwo)}>View Document </button></td>
                        {/* <td><img style={{maxWidth: "100%",height: "auto",width: "auto\9"}} src={ vendors.profilePicture}></img></td> */}
                        <td> <img style={{ maxWidth: "100%", height: "auto", width: "auto\9" }} src={PicURN + vendors.profilePicture} alt="Profile Pic"></img></td>
                        <td><button className="btn btn-success mr-2" onClick={this.viewServices.bind(this, vendors.individualVendorId)}>View Services</button></td>
                        <td>
                            <Button color="success" className="mr-2" onClick={this.editUser.bind(this, vendors.individualVendorId, vendors.firstName, vendors.lastName, vendors.currentAddress, vendors.permanentAddress, vendors.contact, vendors.email,vendors.rfid_master ? vendors.rfid_master.rfid : '', vendors.documentOne, vendors.documentTwo, vendors.rate, PicURN + vendors.profilePicture, vendors.country_master ? vendors.country_master.countryId : '', vendors.state_master ? vendors.state_master.stateId : '', vendors.city_master ? vendors.city_master.cityId : '', vendors.location_master ? vendors.location_master.locationId : '', vendors.serviceId, vendors.rateId, vendors.startTime, vendors.endTime, vendors.startTime1, vendors.endTime1, vendors.startTime2, vendors.endTime2,vendors.rfid_master ?vendors.rfid_master.rfidId : '')}>Edit</Button>

                            <Button color="danger" onClick={this.delete.bind(this, vendors.individualVendorId)} >Delete</Button>
                        </td>
                    </tr>

                )
            })
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
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
        console.log(this.state)
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



    push = () => {
        this.props.history.push('/superDashboard/individualVendor')
    }

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
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


    onRateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value });

        }
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

    onChangeCountry = (countryId, countryName, selectOption) => {
        console.log(countryId, countryName, selectOption)

        this.setState({
            countryName: selectOption.countryName,
            countryId: selectOption.countryId,
        })

        this.props.getState(selectOption.countryId)
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

    onChangeState = (stateName, stateId, selectOption) => {
        console.log(stateName, stateId, selectOption)
        this.setState({
            stateName: selectOption.stateName,
            stateId: selectOption.stateId
        })
        this.props.getCity(selectOption.stateId);
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

    onChangeCity = (cityName, cityId, selectOption) => {
        console.log(cityName, cityId, selectOption)
        this.setState({
            cityName: selectOption.cityName,
            cityId: selectOption.cityId
        })
        this.props.getLocation(selectOption.cityId)
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

    updatePermanentAddress = (pin) => {
        console.log(pin)
        this.setState({ pin })
        this.setState({
            permanentAddress: this.state.permanentAddressDefault + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip Code: ' + pin
        })
        console.log('updatePermanentAddress', this.state.permanentAddress)
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


    OnKeyPresshandlerEmail = (event) => {
        const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        let inputChar = event.target.value;
        if (!pattern.test(inputChar)) {
            this.setState({
                emailError: true
            })
        }
        else {
            this.setState({
                emailError: false
            })
        }
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

    // rfidData=({ownerRf})=>{
    //     if(ownerRf && ownerRf.rfids){
    //         return (
    //            ownerRf.rfids.map((item)=>{
    //                return ({ ...item, label:item.rfid, value:item.rfidId})
    //            })
    //         )
    //     }
    // }

    rfidData=({ ownerRf })=> {
        console.log(ownerRf)
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

    


    render() {

        console.log(this.state.profilePicture)
        let tableData;
        tableData =
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: '4%' }}></th>
                        <th style={{ width: '4%' }}>#</th>
                        <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: "firstName"
                                }
                            });
                        }}>first Name  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Last Name</th>
                        <th>Current Address</th>
                        <th style={{ textAlign: "center", width: "16%" }}>Permanent Address</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>RFID</th>
                        <th>Document 1</th>
                        <th>Document 2</th>
                        <th>Profile Picture</th>
                        <th>View Services</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>
                    {this.renderList(this.props.IndividualVendorReducer)}
                </tbody>
            </Table>
        let modalData = <div>
            <FormGroup>
                <Label> First Name</Label>
                <Input name="firstName" value={this.state.firstName} onKeyPress={this.OnKeyPressUserhandler} maxLength={20} onChange={this.onHandleChange}>
                </Input>
                <span className="error">{this.state.errors.firstName}</span>
            </FormGroup>
            <FormGroup>
                <Label> Last Name</Label>
                <Input name="lastName" value={this.state.lastName} onKeyPress={this.OnKeyPressUserhandler} maxLength={20} onChange={this.onHandleChange}>
                </Input>
                <span className="error">{this.state.errors.lastName}</span>
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
                <Label>Contact</Label>
                <Input name="contact" value={this.state.contact} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={10} onChange={this.onHandleChange}>
                </Input>
                <span className="error">{this.state.errors.contact}</span>
                <span className="error">{this.state.message}</span>
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" value={this.state.email} maxLength={80} onKeyPress={this.OnKeyPresshandlerEmail} onBlur={this.OnKeyPresshandlerEmail} onChange={this.onHandleChange}>
                </Input>
                <span className="error">{this.state.errors.email}</span>
                <span style={{ display: this.state.emailError ? 'block' : 'none', color: 'red' }}>email is not valid</span>

            </FormGroup>


            <FormGroup>
                <Label>Service Type</Label>
                <Input type="select" name="serviceId" onChange={this.onHandleChange} value={this.state.serviceId} >
                    <DefaultSelect />
                    {this.service(this.props.displayServiceMasterReducer)}
                </Input>
                <span className="error">{this.state.errors.serviceId}</span>
            </FormGroup>


            <FormGroup>
                <Label>Rate Type</Label>
                <Input type="select" defaultValue='no-value' name="rateId" onChange={this.onHandleChange} value={this.state.rateId}>
                    <DefaultSelect />
                    {this.rateTypeDetail(this.props.vendorMasterReducer)}
                </Input>
                <span className='error'>{this.state.errors.rateId}</span>
            </FormGroup>

            <FormGroup>
                <Label>Rate</Label>
                <Input  placeholder="rate" maxLength={5} name='rate' onKeyPress={this.onRateChange} onChange={this.onHandleChange} value={this.state.rate} />
                <span className="error">{this.state.errors.rate}</span>
            </FormGroup>

            <Row form>
                <Col md={2}>
                    <FormGroup>
                        <Label>Slot 1:</Label>
                    </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup>
                        <Label>From</Label>
                        <Input type="time" name="startTime" onChange={this.onHandleChange} value={this.state.startTime} >
                            <span className='error'>{this.state.errors.startTime}</span>
                        </Input>

                    </FormGroup>
                </Col>

                <Col md={5}>
                    <FormGroup>
                        <Label>To</Label>
                        <Input type="time" name="endTime" onChange={this.onHandleChange} value={this.state.endTime}>
                            <span className='error'>{this.state.errors.endTime}</span>
                        </Input>

                    </FormGroup>
                </Col>
            </Row>

            <Row form>
                <Col md={2}>
                    <FormGroup>
                        <Label>Slot 2:</Label>
                    </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup>
                        <Label>From</Label>
                        <Input type="time" name="startTime1" onChange={this.onHandleChange} value={this.state.startTime1}>
                        </Input>

                    </FormGroup>
                </Col>

                <Col md={5}>
                    <FormGroup>
                        <Label>To</Label>
                        <Input type="time" name="endTime1" onChange={this.onHandleChange} value={this.state.endTime1}>
                        </Input>

                    </FormGroup>
                </Col>
            </Row>

            <Row form>
                <Col md={2}>
                    <FormGroup>
                        <Label>Slot 3:</Label>
                    </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup>
                        <Label>From</Label>
                        <Input type="time" name="startTime2" onChange={this.onHandleChange} value={this.state.startTime2}>
                        </Input>

                    </FormGroup>
                </Col>

                <Col md={5}>
                    <FormGroup>
                        <Label>To</Label>
                        <Input type="time" name="endTime2" onChange={this.onHandleChange} value={this.state.endTime2} >
                        </Input>

                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label>RFID</Label>
                <Input type="select" name="rfidId" onChange={this.rfIdChangeHandler}  >
                <option value={this.state.rfid}>{this.state.rfid}</option>
                    {/* <DefaultSelect /> */}
                    {this.rfidData(this.props.rfId)}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label> Document One</Label>
                <GoogleDocsViewer
                    width="400px"
                    height="700px"
                    fileUrl={DocURN + this.state.documentOne} />
            </FormGroup>
            <FormGroup>
                <Label>Upload Your Id</Label>
                <Input type="file" name="documentOne" accept='.docx ,.doc,application/pdf' onChange={this.FileChange2} required />
            </FormGroup>

            <FormGroup>
                <Label> Document Two</Label>
                <GoogleDocsViewer
                    width="400px"
                    height="700px"
                    fileUrl={DocURN + this.state.documentTwo} />
            </FormGroup>
            <FormGroup>
                <Label>Upload Another Id</Label>
                <Input type="file" name="documentTwo" accept='.docx ,.doc,application/pdf' onChange={this.FileChange3} required />

            </FormGroup>
            <FormGroup>
                <Label> Profile Picture</Label>
                <img id="target" style={{ width: "30%", height: "35%" }} src={this.state.profilePicture} />
                <Input type="file" name="profilePicture" accept="image/*" onChange={this.FileChange1} required />

            </FormGroup>

            <FormGroup>
                <Button color="primary" className="mr-2" onClick={this.updateVendor}>Save </Button>
                <Button color="danger" onClick={this.toggleEditVendorModal.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>

        let deleteSelectedButton = <Button color="danger" className="mb-2"
            onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>;
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>

                        <Modal isOpen={this.state.editVendorModal} toggle={this.toggleEditVendorModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditVendorModal.bind(this)}> Edit Vendor</ModalHeader>
                            <ModalBody>
                                {!this.state.modalLoading ? modalData : <Spinner />}
                            </ModalBody>
                        </Modal>
                        <div className="top-details" style={{ fontWeight: 'bold' }}><h3>Individual Vendor Details</h3>
                            <Button color="primary" type="button" onClick={this.push}>Add Vendor</Button></div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />

                        {deleteSelectedButton}
                        <Label style={{ padding: '10px' }}><b>Select All</b><input className="ml-2"
                            id="allSelect"
                            type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    this.selectAll();
                                }
                                else if (!e.target.checked) {
                                    this.unSelectAll();
                                }
                            }} />
                        </Label>
                        {!this.state.loading ? tableData : <Spinner />}
                    </div>

                    <Modal
                        isOpen={this.state.modalIsOpen} >
                        <ModalHeader toggle={this.toggleModal.bind(this)} />
                        <ModalBody style={{ paddingLeft: "45px", paddingRight: "2px" }}>
                            <GoogleDocsViewer
                                width="400px"
                                height="700px"
                                fileUrl={DocURN + this.state.documentOne} />

                        </ModalBody>
                    </Modal>

                    <Modal
                        isOpen={this.state.modal} >
                        <ModalHeader toggle={this.toggle.bind(this)} />
                        <ModalBody style={{ paddingLeft: "45px", paddingRight: "2px" }}>

                            <GoogleDocsViewer
                                width="400px"
                                height="700px"
                                fileUrl={DocURN + this.state.documentTwo} />

                        </ModalBody>
                    </Modal>
                </UI>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state, "=============individual vendor")
    return {

        IndividualVendorReducer: state.IndividualVendorReducer,
        societyReducer: state.societyReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        vendorMasterReducer: state.vendorMasterReducer,
        rfId:state.RFIdReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getIndividualVendor, getCountry, getState, getCity, getLocation, getServiceType, getRateType, deleteIndividualVendor, deleteSelectVendor, updateIndividualVendor, getRfId }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualVendorDetail);
