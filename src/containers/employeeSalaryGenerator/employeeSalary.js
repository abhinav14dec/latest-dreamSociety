import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Modal, Button, FormGroup, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { getCountry, getState, getCity, getLocation } from './../../actions/societyMasterAction';
import { ViewEmployee, updateEmployee, deleteEmployee, deleteMultipleEmployee } from '../../actions/employeeMasterAction';
import { getEmployee } from '../../actions/employeeTypeMasterAction';
import { getRfId } from '../../actions/rfIdAction';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard'
import DefaultSelect from '../../constants/defaultSelect';
import { emailValid } from '../../validation/validation';

class EmployeeSalaryGenerator extends Component {
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
            editEventModal: false,
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
            hra: '',
            basic: '',
            travelAllowance: '',
            pf: '',
            esi: '',
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
            rfidId: '',
            rfid: '',
            attendenceInDays: '',
            bank: '',
            accountNo: '',
            bankLocation: '',
            pan: '',
            lwp: '',
            plBalance: '',
            clBalance: '',
            salaryAccountNo: '',
            variableComponent: '',
            selfDevelopmentAllowance: '',
            canteenAllowance: '',
            medicalReimbursement: '',
            nightAllowance: '',
            specialAllowance: '',
            pfNo: '',
            tds: '',
            netSalary: '',
            adjustments: '',
            adjustmentAdditions: '',
            adjustmentDeductions: '',
            annualBonus: '',
            totalPayment: ''
        }
    }

    componentDidMount() {
        this.refreshData()
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
        this.props.getRfId().then(() => this.setState({ loading: false, modalLoading: false }))
        this.setState({
            userPermanent: false, editPermanent: false,
            countryId: '', stateId: '', cityId: '', locationId: '',
            editCurrent: false, userCurrent: false, currentCountryId: '', currentStateId: '', currentCityId: '',
            currentLocationId: ''
        })
    }

    toggleEditEmployeeModal() {
        this.setState({
            editEmployeeModal: !this.state.editEmployeeModal, emailServerError: '', contactServerError: '', errors: {}, userPermanent: false, editPermanent: false, countryId: '',
            stateId: '', cityId: '', locationId: '', permanentAddress: this.state.readOnlyPermanent,
            editCurrent: false, userCurrent: false, currentCountryId: '', currentStateId: '', currentCityId: '',
            currentLocationId: '', sameAsPermanent: false, rfid: '', rfidId: '', attendenceInDays: '', bank: '',
            bankLocation: '', pan: '', lwp: '', plBalance: '', clBalance: '', salaryAccountNo: '', variableComponent: '', selfDevelopmentAllowance: '',
            canteenAllowance: '', medicalReimbursement: '', nightAllowance: '', specialAllowance: '', pfNo: '', tds: '',
            netSalary: '', adjustments: '', adjustmentAdditions: '', adjustmentDeductions: '',
            annualBonus: '', totalPayment: ''
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
            errors.contact = "Contact can't be empty"
        }
        if (!this.state.employeeDetailId) {
            errors.employeeDetailId = "Service Type can't be empty"
        }

        if (!this.state.email) {
            errors.email = "Email can't be empty"
        }
        if (!this.state.basic) {
            errors.basic = "Basic can't be empty."
        }
        if (!this.state.attendenceInDays) {
            errors.attendenceInDays = "Attendence in days can't be empty."
        }
        if (!this.state.bank) {
            errors.bank = "Bank name  can't be empty."
        }
        if (!this.state.salaryAccountNo) {
            errors.salaryAccountNo = "Salary account number can't be empty."
        }
        if (!this.state.bankLocation) {
            errors.bankLocation = "Bank location can't be empty."
        }
        if (!this.state.pan) {
            errors.pan = "Pan can't be empty."
        }
        if (!this.state.plBalance) {
            errors.plBalance = "PL balance can't be empty."
        }
        if (!this.state.clBalance) {
            errors.clBalance = "CL balance can't be empty."
        }
        if (!this.state.variableComponent) {
            errors.variableComponent = "Variable component can't be empty."
        }
        if (!this.state.selfDevelopmentAllowance) {
            errors.selfDevelopmentAllowance = "Self development allowance can't be empty."
        }
        if (!this.state.canteenAllowance) {
            errors.canteenAllowance = "Canteen allowance can't be empty."
        }
        if (!this.state.nightAllowance) {
            errors.nightAllowance = "Night allowance can't be empty."
        }
        if (!this.state.specialAllowance) {
            errors.specialAllowance = "Special allowance can't be empty."
        }
        if (!this.state.pfNo) {
            errors.pfNo = "PF No can't be empty."
        }
        if (!this.state.tds) {
            errors.tds = "TDS can't be empty."
        }

        if (!this.state.netSalary) {
            errors.netSalary = "Net Salary can't be empty."
        }
        if (!this.state.adjustments) {
            errors.adjustments = "Adjustments can't be empty."
        }
        if (!this.state.adjustmentAdditions) {
            errors.adjustmentAdditions = "Adjustments additions can't be empty."
        }
        if (!this.state.adjustmentDeductions) {
            errors.adjustmentDeductions = "Adjustments deduction can't be empty."
        }
        if (!this.state.annualBonus) {
            errors.annualBonus = "Annual Bonus can't be empty."
        }
        if (!this.state.totalPayment) {
            errors.adjustmentDeductions = "Total Payment can't be empty."
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
            data.append('firstName', this.state.firstName)
            data.append('middleName', this.state.middleName)
            data.append('lastName', this.state.lastName)
            data.append('basic', this.state.basic)
            data.append('hra', this.state.hra)
            data.append('travelAllowance', this.state.travelAllowance)
            data.append('pf', this.state.pf)
            data.append('esi', this.state.esi)
            data.append('email', this.state.email)
            data.append('contact', this.state.contact)
            data.append('employeeDetailId', this.state.employeeDetailId)
            data.append('currentAddress', this.state.currentAddress)
            data.append('permanentAddress', this.state.permanentAddress)
            data.append('startDate', this.state.editEmployeeData.startDate)
            data.append('attendenceInDays', this.state.attendenceInDays)
            data.append('bank', this.state.bank)
            data.append('bankLocation', this.state.bankLocation)
            data.append('pan', this.state.pan)
            data.append('plBalance', this.state.plBalance)
            data.append('clBalance', this.state.clBalance)
            data.append('salaryAccountNo', this.state.salaryAccountNo)
            data.append('variableComponent', this.state.variableComponent)
            data.append('selfDevelopmentAllowance', this.state.selfDevelopmentAllowance)
            data.append('canteenAllowance', this.state.canteenAllowance)
            data.append('medicalReimbursement', this.state.medicalReimbursement)
            data.append('specialAllowance', this.state.specialAllowance)
            data.append('nightAllowance', this.state.nightAllowance)
            data.append('pfNo', this.state.pfNo)
            data.append('tds', this.state.tds)
            data.append('total', this.state.total)
            data.append('netSalary', this.state.netSalary)
            data.append('adjustments', this.state.adjustments)
            data.append('adjustmentAdditions', this.state.adjustmentAdditions);
            data.append('annualBonus', this.state.annualBonus);
            data.append('totalPayment', this.state.totalPayment);
            this.props.updateEmployee(this.state.editEmployeeData.employeeId, data).then(() => this.refreshData()).catch(err => {

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
            return x.firstName.toLowerCase().includes(search.toLowerCase()) ||
                x.lastName.toLowerCase().includes(search.toLowerCase()) ||
                x.basic.toLowerCase().includes(search.toLowerCase()) ||
                x.employee_detail_master.serviceType.toLowerCase().includes(search.toLowerCase()) ||
                !search;
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

    editEmployeeResult(employeeId, firstName, middleName, lastName, basic, hra, travelAllowance, pf, esi, contact, email, currentAddress, permanentAddress, startDate, employeeDetailId, rfid, rfidId, attendenceInDays, bank,
        bankLocation, pan, lwp, plBalance, clBalance, salaryAccountNo, variableComponent, selfDevelopmentAllowance,
        canteenAllowance, medicalReimbursement, nightAllowance, specialAllowance, pfNo, tds, netSalary,
        adjustments, annualBonus, totalPayment) {
        console.log(employeeId, firstName, middleName, lastName, basic, hra, travelAllowance, pf, esi, contact, email, currentAddress, permanentAddress, startDate, employeeDetailId, rfid, rfidId, "========viewedit")
        this.setState({
            editEmployeeData: { employeeId, startDate },
            firstName, middleName, lastName, basic, hra, travelAllowance, pf, esi, contact, email,
            currentAddress, permanentAddress, employeeDetailId, rfid, rfidId,
            readOnlyPermanent: permanentAddress, readOnlyCurrent: currentAddress, editEmployeeModal: !this.state.editEmployeeModal,
            attendenceInDays, bank,
            bankLocation, pan, lwp, plBalance, clBalance, salaryAccountNo, variableComponent, selfDevelopmentAllowance,
            canteenAllowance, medicalReimbursement, nightAllowance, specialAllowance, pfNo, tds, netSalary,
            adjustments, annualBonus, totalPayment
        })
    }

    toggleEditEventModal() {
        this.setState({
            editEventModal: !this.state.editEventModal
        });
    }


    getEmployee({ getEmployee }) {
        if (getEmployee && getEmployee.data && getEmployee.data.employee) {
            return (
                getEmployee.data.employee.sort((item1, item2) => {
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((item, index) => {
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
                            <td >{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.employee_detail_master ? item.employee_detail_master.serviceType : ''}-
                            {item.employee_detail_master ? item.employee_detail_master.employee_work_type_master.employeeWorkType : ''}
                                -{item.employee_detail_master ? item.employee_detail_master.employee_type_master.employeeType : ''}</td>
                            <td>{item.basic}</td>
                            <td>{item.hra}</td>
                            <td>{item.travelAllowance}</td>
                            <td>{item.pf}</td>
                            <td>{item.esi}</td>
                            <td>{item.rfid_master ? item.rfid_master.rfid : ''}</td>
                            <td> <button className="btn btn-success" onClick={this.viewData.bind(this, item.firstName, item.middleName, item.lastName, item.basic, item.hra, item.travelAllowance, item.pf, item.esi, item.contact, item.email, item.currentAddress, item.permanentAddress, item.startDate, item.employee_detail_master.serviceType, item.employee_detail_master.employee_work_type_master.employeeWorkType, item.employee_detail_master.employee_type_master.employeeType, item.rfid_master ? item.rfid_master.rfid : '', item.rfid_master ? item.rfid_master.rfidId : '')}>View</button></td>
                            <td>
                                <button className="btn btn-success mr-2" onClick={this.editEmployeeResult.bind(this, item.employeeId, item.firstName, item.middleName, item.lastName, item.basic, item.hra, item.travelAllowance, item.pf, item.esi, item.contact, item.email, item.currentAddress, item.permanentAddress, item.startDate, item.employee_detail_master.employeeDetailId, item.rfid_master ? item.rfid_master.rfid : '', item.rfid_master ? item.rfid_master.rfidId : '', item.bank,
                                    item.accountNo, item.bankLocation, item.pan, item.lwp, item.plBalance, item.clBalance, item.salaryAccountNo, item.variableComponent, item.selfDevelopmentAllowance,
                                    item.canteenAllowance, item.medicalReimbursement, item.nightAllowance, item.specialAllowance, item.pfNo, item.tds, item.netSalary,
                                    item.adjustments, item.adjustmentAdditions, item.adjustmentDeductions, item.annualBonus, item.totalPayment)} >Edit</button>
                                {/* <button className="btn btn-danger" onClick={this.deleteEmployee.bind(this, item.employeeId)}> Delete</button> */}
                            </td>
                        </tr >
                    )
                })
            )
        }
    }


    viewData(picture, firstName, middleName, lastName, basic, hra, travelAllowance, pf, esi, contact, email, currentAddress, permanentAddress, doc1, doc2, startDate, serviceType, employeeWorkType,
        employeeType, rfid, rfidId) {
        console.log(picture, firstName, middleName, lastName, basic, hra, travelAllowance, pf, esi, contact, email, currentAddress, permanentAddress, doc1, doc2, startDate, serviceType, employeeWorkType,
            employeeType, rfid, rfidId)
        this.setState({
            picture, firstName, middleName, lastName, basic, hra, travelAllowance, pf, esi, contact, email, currentAddress, permanentAddress, doc1, doc2, startDate, serviceType, employeeWorkType,
            employeeType, rfid, rfidId, displayEmployee: true
        })
    }


    close = () => {
        return this.props.history.replace('/superDashBoard/displayemployee');
    }

    rfidData = ({ ownerRf }) => {
        if (ownerRf && ownerRf.rfids) {
            return (
                ownerRf.rfids.map((item) => {
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

    rfIdChangeHandler = (e) => {
        console.log(e.target.value, "======rfid------")
        this.setState({
            rfidId: e.target.value
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
    onRateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    render() {
        let { basic, hra, travelAllowance, esi, pf, variableComponent, nightAllowance, specialAllowance, canteenAllowance
            , medicalReimbursement, mobileReimbursement, selfDevelopmentAllowance, adjustmentDeductions, adjustmentAdditions,
            annualBonus
        } = this.state;

        let tableData;
        tableData =
            <Table bordered>
                <thead>
                    <tr>
                        <th style={{ width: "4px" }}></th>
                        <th style={{ width: "4px" }}>#</th>
                        <th
                        // onClick={() => {
                        //     this.setState((state) => {
                        //         return {
                        //             sortVal: !state.sortVal,
                        //             filterName: 'firstName'
                        //         }
                        //     })
                        // }}
                        >First Name      <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th> Last Name</th>
                        <th>Service Type</th>
                        <th>Basic Salary</th>
                        <th>HRA</th>
                        <th>Travel Allowance</th>
                        <th>PF</th>
                        <th>ESI</th>
                        <th>RF ID</th>
                        <th>Employee Detail </th>
                        <th> Actions  </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getEmployee(this.props.EmpDetails)}
                </tbody>
            </Table>


        let modalData = <div>
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
                        <Label>HRA</Label>
                        <Input placeholder="HRA" name="hra" value={this.state.hra} maxLength={15} onChange={this.onRateChange}></Input>
                    </Col>
                    <Col md={6}>
                        <Label>Travel Allowance</Label>
                        <Input placeholder="Travel Allowance" name="travelAllowance" value={this.state.travelAllowance} onChange={this.onRateChange} maxLength={15}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <Label>PF</Label>
                        <Input placeholder="PF" name="pf" value={this.state.pf} onChange={this.onRateChange} maxLength={15}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>PF No.</Label>
                        <Input placeholder="PF No." name="pfNo" value={this.state.pfNo} onChange={this.onRateChange} maxLength={15}></Input>
                    </Col>
                    <Col md={4}>
                        <Label>ESI</Label>
                        <Input placeholder="ESI" name="esi" value={this.state.esi} onChange={this.onRateChange} maxLength={15}></Input>
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
                <Input name="rfidId" onChange={this.onChange} value={this.state.rfid} readOnly>
                    <DefaultSelect />
                    {this.rfidData(this.props.rfId)}
                </Input>
            </FormGroup>

            <FormGroup>
                <Row>
                    <Col md={6}>
                        <Label > Employment Date</Label>
                        <Input type="date" value={this.state.editEmployeeData.startDate}
                            onChange={(e) => {
                                let { editEmployeeData } = this.state;
                                editEmployeeData.startDate = e.target.value;
                                this.setState({ editEmployeeData });
                            }} required onKeyPress={this.OnKeyPresshandler}
                        />
                    </Col>
                    <Col md={6}>
                        <Label> Attendence in days</Label>
                        <Input name="attendenceInDays" value={this.state.attendenceInDays}
                            onChange={this.onRateChange}
                            maxLength={20}
                        />
                        <span className="error" >{this.state.errors.attendenceInDays}</span>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label >Bank</Label>
                        <Input placeholder="Bank Name" name="bank" value={this.state.bank}
                            onChange={this.onChange}
                            maxLength={25}
                            onKeyPress={this.fNameKeyPress}
                        />
                        <span className="error" >{this.state.errors.bank}</span>
                    </Col>
                    <Col md={6}>
                        <Label > Salary A/C No </Label>
                        <Input placeholder="Salary A/C No" name="salaryAccountNo"
                            value={this.state.salaryAccountNo}
                            onKeyPress={this.OnKeyPressNumber}
                            maxLength={20}
                        />
                        <span className="error" >{this.state.errors.salaryAccountNo}</span>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label > PAN </Label>
                        <Input placeholder="PAN" name="pan" value={this.state.pan}
                            maxLength={20}
                        />
                        <span className="error" >{this.state.errors.pan}</span>
                    </Col>
                    <Col md={6}>
                        <Label>Leave Without Pay(LWP)</Label>
                        <Input placeholder="Leave Without Pay" name="lwp" value={this.state.lwp} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>PL Balance as on</Label>
                        <Input placeholder="PL Balance as on" name="plBalance" value={this.state.plBalance} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                    <Col md={6}>
                        <Label>CL Balance as on</Label>
                        <Input placeholder="CL Balance as on" name="clBalance" value={this.state.clBalance} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Variable Component</Label>
                        <Input placeholder="Variable Component" name="variableComponent"
                            value={this.state.variableComponent}
                            onChange={this.onChange}
                            onKeyPress={this.OnKeyPressNumber}
                            maxLength={25}
                        ></Input>
                    </Col>
                    <Col md={6}>
                        <Label>Self Development Allowance</Label>
                        <Input placeholder="Self Development Allowance" name="selfDevelopmentAllowance" value={this.state.selfDevelopmentAllowance}
                            onChange={this.onChange}
                            onKeyPress={this.OnKeyPressNumber}
                            maxLength={4}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Canteen Allowance</Label>
                        <Input placeholder="Canteen Allowance" name="canteenAllowance" value={this.state.canteenAllowance} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                    <Col md={6}>
                        <Label>Medical Reimbursement</Label>
                        <Input placeholder="Medical Reimbursement" name="medicalReimbursement" value={this.state.medicalReimbursement} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Night Allowance</Label>
                        <Input placeholder="Night Allowance" name="nightAllowance" value={this.state.nightAllowance} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                    <Col md={6}>
                        <Label>Special Allowance</Label>
                        <Input placeholder="Special Allowance" name="specialAllowance" value={this.state.specialAllowance} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>TDS</Label>
                        <Input placeholder="TDS" name="tds" value={this.state.tds} onKeyPress={this.OnKeyPressNumber} onChange={this.onRateChange} maxLength={2}></Input>
                    </Col>
                    <Col md={6}>
                        <Label>Mobile Reimbursement</Label>
                        <Input placeholder="Mobile Reimbursement" name="mobileReimbursement" value={this.state.mobileReimbursement} onKeyPress={this.OnKeyPressNumber} onChange={this.onRateChange} maxLength={2}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <Label>Adjustment Additions</Label>
                        <Input placeholder="Adjustment Additions" name="adjustmentAdditions" value={this.state.adjustmentAdditions} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                    <Col md={6}>
                        <Label>Adjustment Deductions</Label>
                        <Input placeholder="Adjustment Deductions" name="adjustmentDeductions" value={this.state.adjustmentDeductions} onChange={this.onRateChange} onKeyPress={this.OnKeyPressNumber} maxLength={2}></Input>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Label>Annual Bonus</Label>
                <Input placeholder="Annual Bonus" name="annualBonus" value={this.state.annualBonus} onChange={this.onRateChange} maxLength={3}></Input>
            </FormGroup>
            <FormGroup>
                <Label>Total Payment</Label>
                <Input placeholder="Total Payment" name="totalPayment" value={this.state.totalPayment} onChange={this.onRateChange} maxLength={10} disabled></Input>
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
                            {!this.state.loading ? tableData : <Spinner />}
                        </div>
                    </div>
                    <Modal isOpen={this.state.editEmployeeModal} toggle={this.toggleEmployeeModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEmployeeModal.bind(this)}>Edit  Employee Details</ModalHeader>
                        <ModalBody>
                            {!this.state.modalLoading ? modalData : <Spinner />}
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
        employeeDetails: state.employeeDetails,
        rfId: state.RFIdReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ViewEmployee, getCountry, getState, getCity, getLocation, updateEmployee, deleteEmployee, deleteMultipleEmployee, getEmployee, getRfId }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSalaryGenerator);

