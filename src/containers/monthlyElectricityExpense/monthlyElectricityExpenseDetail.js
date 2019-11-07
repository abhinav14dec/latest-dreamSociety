import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import ModalBox from '../../components/modal/modal';
import InputField from '../../components/reusableComponents/inputs';
import ButtonComponent from '../../components/reusableComponents/button';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { getMonthlyElecExpense,calculateCharges, updateElecExpense,filterViaDate } from '../../actions/monthlyElectricityExpense';
import { deleteElectricityExpense,deleteSelectedElectricityExpense } from '../../actions/electricityExpense';
import { Table, Row, Col, FormGroup, Label } from 'reactstrap';
import SearchImg from '../../components/searchImg/searchImg';
import search from '../../appImages/search.png';
import restore from '../../appImages/restore.png';

class MonthlyElectricityExpenseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            towerName: '',
            floorName: '',
            flatNo: '',
            lastReading: '',
            currentReading: '',
            monthlyCharge: '',
            mdi: '',
            sanctionedLoad: '',
            rate: '',
            rent: '',
            amount: '',
            amountDue: null,
            electricityConsumerId: '',
            towerId: '',
            floorId: '',
            flatDetailId: '',
            editModal: false,
            unitConsumed: '',
            errors: '',
            errMessage: '',
            modalLoading: false,
            loading: true,
            ids: [],
            isDisabled: true,
            filterName: 'flatNo',
            startDate: '',
            endDate: '',
            defaultList: true,
            filterdList: false,
            filterLoading: false,
            search: ''
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    refreshData() {
        this.props.getMonthlyElecExpense().then(() => this.setState({ loading: false }));
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    addExpense = () => {
        this.props.history.push('/superDashboard/addMonthlyElectricityExpenseDetail');
    }

    searchFilter = (search) => {
        return function (x) {

            return x.flat_detail_master.tower_master.towerName.toLowerCase().includes(search.toLowerCase()) ||
                x.flat_detail_master.floor_master.floorName.toLowerCase().includes(search.toLowerCase()) ||
                x.flat_detail_master.flatNo.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }

    getFilterdExpenseList = ({ filtered }) => {
        if (filtered && filtered.electricityConsumer) {
            console.log(filtered);
            return filtered.electricityConsumer.sort((item1, item2) => {
                var items1 = item1.flat_detail_master
                var items2 = item2.flat_detail_master
                var cmprVal = (items1 && items2) ? (items1[this.state.filterName].localeCompare(items2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                if (item && item.flat_detail_master) {
                    return (
                        <tr key={item.electricityConsumerId}>
                            <td><input type="checkbox" name="ids" className="SelectAll" value={item.electricityConsumerId}
                                onChange={(e) => {
                                    const { electricityConsumerId } = item
                                    if (!e.target.checked) {
                                        document.getElementById('allSelect').checked = false;
                                        let indexOfId = this.state.ids.indexOf(electricityConsumerId);
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1);
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true });
                                        }
                                    }
                                    else {
                                        this.setState({ ids: [...this.state.ids, electricityConsumerId] });
                                        if (this.state.ids.length >= 0) {
                                            this.setState({ isDisabled: false })
                                        }
                                    }

                                }} /></td>
                            <td>{index + 1}</td>
                            <td>{item.flat_detail_master.tower_master.towerName}</td>
                            <td>{item.flat_detail_master.floor_master.floorName}</td>
                            <td>{item.flat_detail_master.flatNo}</td>
                            <td>{item.lastReading}</td>
                            <td>{item.currentReading}</td>
                            <td>{item.monthlyCharge}</td>
                            <td>
                                <ButtonComponent color="success" title="Edit" className="mr-2" buttonClicked={this.edit.bind(this, item.flat_detail_master.tower_master.towerName,
                                    item.flat_detail_master.floor_master.floorName, item.flat_detail_master.flatNo, item.lastReading, item.currentReading, item.unitConsumed,
                                    item.monthlyCharge, item.mdi, item.sanctionedLoad, item.rate, item.rent, item.amount, item.amountDue
                                    , item.electricityConsumerId, item.flat_detail_master.tower_master.towerId, item.flat_detail_master.floor_master.floorId,
                                    item.flat_detail_master.flatDetailId)} />
                                <ButtonComponent color="danger" title="Delete" buttonClicked={this.delete.bind(this, item.electricityConsumerId)} />
                            </td>
                        </tr>
                    );
                }
            })
        }
    }

    getElectricityExpense = ({ getMonthlyElectricityExpense }) => {
        if (getMonthlyElectricityExpense && getMonthlyElectricityExpense.electricityConsumer) {
            console.log(getMonthlyElectricityExpense && getMonthlyElectricityExpense.electricityConsumer)
            return getMonthlyElectricityExpense.electricityConsumer.sort((item1, item2) => {
                var items1 = item1.flat_detail_master
                var items2 = item2.flat_detail_master
                var cmprVal = (items1 && items2) ? (items1[this.state.filterName].localeCompare(items2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                if (item && item.flat_detail_master) {
                    return (
                        <tr key={item.electricityConsumerId}>
                            <td><input type="checkbox" name="ids" className="SelectAll" value={item.electricityConsumerId}
                                onChange={(e) => {
                                    const { electricityConsumerId } = item
                                    if (!e.target.checked) {
                                        document.getElementById('allSelect').checked = false;
                                        let indexOfId = this.state.ids.indexOf(electricityConsumerId);
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1);
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true });
                                        }
                                    }
                                    else {
                                        this.setState({ ids: [...this.state.ids, electricityConsumerId] });
                                        if (this.state.ids.length >= 0) {
                                            this.setState({ isDisabled: false })
                                        }
                                    }

                                }} /></td>
                            <td>{index + 1}</td>
                            <td>{item.flat_detail_master.tower_master.towerName}</td>
                            <td>{item.flat_detail_master.floor_master.floorName}</td>
                            <td>{item.flat_detail_master.flatNo}</td>
                            <td>{item.lastReading}</td>
                            <td>{item.currentReading}</td>
                            <td>{item.monthlyCharge}</td>
                            <td>
                                <ButtonComponent color="success" title="Edit" className="mr-2" buttonClicked={this.edit.bind(this, item.flat_detail_master.tower_master.towerName,
                                    item.flat_detail_master.floor_master.floorName, item.flat_detail_master.flatNo, item.lastReading, item.currentReading, item.unitConsumed,
                                    item.monthlyCharge, item.mdi, item.sanctionedLoad, item.rate, item.rent, item.amount, item.amountDue
                                    , item.electricityConsumerId, item.flat_detail_master.tower_master.towerId, item.flat_detail_master.floor_master.floorId,
                                    item.flat_detail_master.flatDetailId)} />
                                <ButtonComponent color="danger" title="Delete" buttonClicked={this.delete.bind(this, item.electricityConsumerId)} />
                            </td>
                        </tr>
                    );
                }
            })
        }
    }

    delete(electricityConsumerId) {
        this.setState({ loading: true, isDisabled: true })
        this.props.deleteElectricityExpense(electricityConsumerId)
            .then(() => this.refreshData())
            .catch(() => this.setState({ loading: false }))
    }

    edit = (towerName, floorName, flatNo, lastReading, currentReading, unitConsumed, monthlyCharge, mdi, sanctionedLoad, rate, rent, amount, amountDue, electricityConsumerId, towerId, floorId, flatDetailId) => {
        console.log(towerName, floorName, flatNo, lastReading, currentReading, unitConsumed, monthlyCharge, mdi, sanctionedLoad, rate, rent, amount, amountDue,
            electricityConsumerId, towerId, floorId, flatDetailId);
        this.setState({
            towerName, floorName, flatNo, lastReading, currentReading, unitConsumed, monthlyCharges: monthlyCharge, mdi, sanctionedLoad, rate, rent, amount, amountDue,
            electricityConsumerId, towerId, floorId, flatDetailId, editModal: true
        })
    }

    editExpenseModal = () => {
        this.setState({ editModal: !this.state.editModal, errors: {} })
    }

    currentReadingChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({
                currentReading: e.target.value, monthlyCharges: ''
                , unitConsumed: (e.target.value - this.state.lastReading), errMessage: ''
            });
        }
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                errors, errMessage: '', monthlyCharges: ''
            });
        }
    }

    rateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value, errMessage: '', monthlyCharges: '' });
            console.log(this.state);
        }
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                errors, errMessage: '', monthlyCharges: ''
            });
        }
    }

    calcCharges = (e) => {
        e.preventDefault();
        let errors = {};

        let { unitConsumed, sanctionedLoad, amountDue, amount, mdi, rate, rent, currentReading, lastReading } = this.state;
        if (parseInt(currentReading) <= parseInt(lastReading)) errors.currentReading = `Current Reading can't be less than last reading.`;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            let data = { unitConsumed, sanctionedLoad, amountDue, amount, mdi, rate, rent };
            this.props.calculateCharges(data)
                .then(() => this.getMonthlyCharges(this.props.monthlyElectricityExpenseReducer));
        }
    }

    getMonthlyCharges = ({ getCharges }) => {
        if (getCharges && getCharges.monthlyCharges) {
            console.log(getCharges);
            this.setState({ monthlyCharges: getCharges.monthlyCharges })
        }
    }

    update = (e) => {
        e.preventDefault();
        let errors = {}
        let { towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
            mdi, amountDue, amount, monthlyCharges, towerName, floorName, flatNo, electricityConsumerId } = this.state;

        let data = {
            towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
            mdi, amountDue, amount, monthlyCharge: monthlyCharges, towerName, floorName, flatNo, electricityConsumerId
        }

        console.log(electricityConsumerId);

        let monthlyCharge = data.monthlyCharge;

        if (currentReading === '') {
            errors.currentReading = `Current Reading can't be empty.`;
        }
        if (parseInt(currentReading) <= parseInt(lastReading)) errors.currentReading = `Current Reading can't be less than last reading.`;
        if (rent === '') {
            errors.rent = `Rent can't be empty.`;
        }
        if (mdi === '') {
            errors.mdi = `MDI can't be empty.`;
        }
        if (!monthlyCharges) errors.monthlyCharges = `Please calculate monthly charges.`;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            this.setState({ modalLoading: true })
            this.props.updateElecExpense(electricityConsumerId, towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
                mdi, amountDue, amount, monthlyCharge, towerName, floorName, flatNo)
                .then(() => this.updatedData())
                .catch(() => this.setState({ loading: false }));
        }
    }

    updatedData = () => {
        this.props.getMonthlyElecExpense().then(() => this.setState({ modalLoading: false, editModal: false }))
    }

    deleteSelected(ids) {
        this.setState({ loading: true, isDisabled: true });
        this.props.deleteSelectedElectricityExpense(ids)
            .then(() => this.refreshData())
            .catch(err => err);
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        console.log("ids-->", this.state.ids)
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

    startDateChange = (e) => {
        var start = document.getElementById('start');
        var end = document.getElementById('end');

        if (start.value) {
            end.min = start.value;
        }
        this.setState({ [e.target.name]: e.target.value, subMaintenanceErr: '' });
    }

    endDateChange = (e) => {
        var start = document.getElementById('start');
        var end = document.getElementById('end');

        if (end.value) {
            start.max = end.value;
        }
        this.setState({ [e.target.name]: e.target.value, subMaintenanceErr: '' });
    }

    filter = (e) => {
        e.preventDefault();
        var start = document.getElementById('start');
        start.max = '';
        this.setState({ defaultList: false, filterdList: true, loading: true })
        let { startDate, endDate } = this.state;
        this.props.filterViaDate(startDate, endDate)
            .then(() => this.setState({ loading: false }))
    }

    default = (e) => {
        e.preventDefault();
        var start = document.getElementById('start');
        start.max = '';

        this.setState({ defaultList: true, filterdList: false, startDate: '', endDate: '' });
        this.refreshData();
    }

    render() {
        let { towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
            mdi, amountDue, amount, monthlyCharges, errors, towerName, floorName, flatNo, startDate, endDate } = this.state;
        let tableData = <Table bordered>
            <thead>
                <tr>
                    <th style={{ width: '4%' }}></th>
                    <th style={{ width: '4%' }}>#</th>
                    <th>Tower</th>
                    <th>Floor</th>
                    <th onClick={() => {
                        this.setState((state) => {
                            return {
                                sortVal: !state.sortVal,
                                filterName: 'flatNo'
                            }
                        });
                    }} style={{ cursor: 'pointer' }}>Flat No<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th>Last Reading</th>
                    <th>Current Reading</th>
                    <th>Monthly Electricity Charges</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.state.defaultList ? this.getElectricityExpense(this.props.monthlyElectricityExpenseReducer) :
                    this.state.filterdList ? this.getFilterdExpenseList(this.props.monthlyElectricityExpenseReducer) : ''}
            </tbody>
        </Table>

        let editInputs = <div>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <InputField label="Tower"
                            name="towerName"
                            type="text"
                            value={towerName}
                            disabled={true} />
                    </Col>
                    <Col md={4}>
                        <InputField label="Floor"
                            name="floorName"
                            type="text"
                            value={floorName}
                            disabled={true} />
                    </Col>
                    <Col md={4}>
                        <InputField label="Flat No."
                            name="flatNo"
                            type="text"
                            value={flatNo}
                            disabled={true} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <InputField label="Last Reading"
                            name="lastReading"
                            type="text"
                            value={lastReading}
                            disabled={true} />
                    </Col>
                    <Col md={4}>
                        <InputField label="Current Reading"
                            name="currentReading"
                            type="text"
                            value={currentReading}
                            inputChange={this.currentReadingChange} />
                        <span className="error">{errors.currentReading}</span>
                    </Col>
                    <Col md={4}>
                        <InputField label="Unit Consumed"
                            name="unitConsumed"
                            type="text"
                            value={unitConsumed}
                            disabled={true} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={3}>
                        <InputField label="Last Amount Due"
                            name="lastAmountDue"
                            type="text"
                            value={(amountDue == true ? '-' : amountDue == false ? '+' : '') + amount}
                            disabled={true} />
                    </Col>
                    <Col md={3}>
                        <InputField label="Rate"
                            name="rate"
                            type="text"
                            value={rate}
                            disabled={true}
                            inputChange={this.currentReadingChange} />
                    </Col>
                    <Col md={3}>
                        <InputField label="Rent"
                            name="rent"
                            type="text"
                            value={rent}
                            inputChange={this.rateChange} />
                        <span className="error">{errors.rent}</span>
                    </Col>
                    <Col md={3}>
                        <InputField label="Sanctioned Load"
                            name="sanctionedLoad"
                            type="text"
                            value={sanctionedLoad}
                            disabled={true} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <InputField label="MDI"
                            name="mdi"
                            type="text"
                            value={mdi}
                            inputChange={this.rateChange} />
                        <span className="error">{errors.mdi}</span>
                    </Col>
                    <Col md={4}>
                        <InputField label="Monthly Charges"
                            name="monthlyCharges"
                            type="text"
                            value={monthlyCharges}
                            disabled={true}
                            inputChange={this.rateChange} />
                        <span className="error">{errors.monthlyCharges}</span>
                    </Col>
                    <Col md={4}>
                        <ButtonComponent
                            title="Calculate Charges"
                            disabled={(!towerId || !floorId || !flatDetailId || !lastReading || !currentReading || !unitConsumed || !amount || !rate || !rent || !sanctionedLoad ||
                                !mdi)}
                            color="primary"
                            style={{ marginTop: '28px' }}
                            buttonClicked={this.calcCharges} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <ButtonComponent
                    title="Save"
                    className="mr-2"
                    color="primary"
                    buttonClicked={this.update} />
                <ButtonComponent
                    title="Cancel"
                    className="mr-2"
                    color="danger"
                    buttonClicked={this.editExpenseModal.bind(this)} />
            </FormGroup>
        </div>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details" >
                        <h3 align="center"> Monthly Electricity Expense Detail</h3>
                        <ButtonComponent title="Add Expense" color="primary" buttonClicked={this.addExpense} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <ButtonComponent color="danger" disabled={this.state.isDisabled} className="mb-3"
                                buttonClicked={this.deleteSelected.bind(this, this.state.ids)} title="Delete Selected" />
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
                        </div>
                        <div>
                            <SearchFilter value={this.state.search} onChange={this.searchOnChange} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <FormGroup className="mr-2" style={{ display: 'flex' }}>
                                <label style={{ alignSelf: 'center', marginRight: '3px' }}>From</label>
                                <input className="form-control" type="date" name="startDate" id="start" value={startDate} onChange={this.startDateChange} />
                            </FormGroup>
                            <FormGroup style={{ display: 'flex' }}>
                                <label style={{ alignSelf: 'center', marginRight: '3px' }}>To</label>
                                <input disabled={!startDate} className="form-control" type="date" name="endDate" value={endDate} id="end" onChange={this.endDateChange} />
                            </FormGroup>
                            <SearchImg MarginLeft="mr-2 ml-1" type="image" style={{ border: '1px solid #333', background: 'lightgray' }} id="search" src={search} onClick={this.filter} disabled={(!startDate || !endDate)} />
                            <SearchImg type="image" style={{ border: '1px solid #333', background: 'lightgray' }} id="default" src={restore} onClick={this.default} disabled={(!startDate || !endDate)} />
                        </div>
                    </div>
                    <ModalBox openModal={this.state.editModal}
                        toggle={this.editExpenseModal.bind(this)}
                        title="Monthly Electricity Expense">
                        {!this.state.modalLoading ? editInputs : <Spinner />}
                    </ModalBox>
                    {!this.state.loading ? tableData : <Spinner />}
                </div>
            </UI>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        flatDetailMasterReducer: state.flatDetailMasterReducer,
        electricityExpenseReducer: state.electricityExpenseReducer,
        monthlyElectricityExpenseReducer: state.monthlyElectricityExpenseReducer
    }
}

export default connect(mapStateToProps, {
    getMonthlyElecExpense, calculateCharges, updateElecExpense,
    deleteElectricityExpense, deleteSelectedElectricityExpense, filterViaDate
})(MonthlyElectricityExpenseDetail);
