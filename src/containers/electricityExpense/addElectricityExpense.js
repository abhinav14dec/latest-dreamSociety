import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import { Col, Row, Form, Button, FormGroup } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { getTowerName } from '../../actions/flatDetailMasterAction';
import { getfloorsOfTowers, addElectricityExpense, getRateForElectricityExpense } from '../../actions/electricityExpense';
import { memberMaxDate } from '../../validation/validation';

class AddElectricityExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            towerId: '',
            floorId: '',
            flatId: '',
            lastReading: '',
            sign: '',
            amountDue: true,
            amount: '',
            sanctionedLoad: '',
            lastReadingDate: '',
            rate: '',
            errors: {},
            message: '',
            loading: false
            // unitConsumed: '',
            // currentReading: '',
            // startDate: '',
            // endDate: ''
        }
    }

    componentDidMount() {
        this.props.getTowerName().then(() => this.setState({ loading: false }));
        this.props.getRateForElectricityExpense().then(() => this.setState({ loading: false }));
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    towerChangeHandler = (event) => {
        document.getElementById('floorId').value = 'no-value';
        document.getElementById('flatDetailId').value = 'no-value';
        this.setState({
            [event.target.name]: event.target.value
        })
        this.props.getfloorsOfTowers(event.target.value)
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    cancel = () => {
        return this.props.history.push('/superDashboard/electricityExpenseDetail');
    }

    onSignChange = (event) => {
        this.setState({ sign: event.target.value });
        this.setState({ amountDue: event.target.value });
    }

    onKeyPressHandler = (event) => {
        const pattern = /^[0-9 ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    getDropdownForTower = ({ name }) => {
        if (name) {
            return name.map((item) => {
                return (
                    <option key={item.towerId} value={item.towerId} >
                        {item.towerName}
                    </option>
                )
            })
        }
    }

    getDropdownForRate = ({ rate }) => {
        if (rate && rate.maintenanceType) {
            return rate.maintenanceType.map((item) => {
                return (
                    <option key={item.maintenanceTypeId} value={item.rate} >
                        {item.rate}
                    </option>
                )
            })
        }
    }

    getFloorData = ({ floorDetails }) => {
        if (floorDetails && floorDetails.tower && floorDetails.tower.Floors) {
            return floorDetails.tower.Floors.map((items) => {
                return (
                    <option key={items.floorId} value={items.floorId}>
                        {items.floorName}
                    </option>
                )
            })
        }
    }


    getFlatData = ({ floorDetails }) => {
        if (floorDetails && floorDetails.flatDetail) {
            return floorDetails.flatDetail.filter((flatRecord) => {
                return flatRecord.floorId == this.state.floorId
            }).map((items) => {
                return (
                    <option key={items.flatDetailId} value={items.flatDetailId}>
                        {items.flatNo}
                    </option>
                )
            })
        }
    }

    floorChangeHandler = (e) => {
        document.getElementById('flatDetailId').value = 'no-value';
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    flatChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    rateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value });
        }
    }


    submit = (e) => {
        e.preventDefault();
        let { towerId, floorId, flatDetailId, lastReading, amount, sign, rate, lastReadingDate, sanctionedLoad, amountDue } = this.state;
        console.log("flat in submit", this.state.towerId)
        let errors = {};
        if (this.state.towerId === '') {
            errors.towerId = `Tower can't be empty.`;
        }
        if (this.state.floorId === '') {
            errors.floorId = `Floor can't be empty.`
        }
        if (this.state.flatDetailId === '' || this.state.flatDetailId === undefined) {
            errors.flatDetailId = `Flat can't be empty.`
        }
        if (this.state.sign === '') {
            errors.sign = `This can't be empty.`
        }
        if (this.state.rate === '') {
            errors.rate = `Rate can't be empty.`
        }
        if (this.state.lastReadingDate === '') {
            errors.lastReadingDate = `Last Reading Date can't be empty.`
        }
        if (this.state.lastReading === '') {
            errors.lastReading = `Last Reading can't be empty.`
        }
        // else if (this.state.lastReading.length !== 16) {
        //     errors.lastReading = `Last Reading can't be more than 16.`
        // }
        if (this.state.amount === '') {
            errors.amount = `Amount can't be empty.`
        }
        //  else if (this.state.amount.length !== 10) {
        //     errors.amount = `Amount can't be more than 10.`
        // }
        if (this.state.sanctionedLoad === '') {
            errors.sanctionedLoad = `Sanctioned Load can't be empty.`
        }
        // else if (this.state.sanctionedLoad.length !== 16) {
        //     errors.sanctionedLoad = `Sanctioned Load can't be more than 16.`
        // }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            this.setState({ loading: true })
            let data = { towerId, floorId, flatDetailId, lastReading, amount, sign, rate, lastReadingDate, sanctionedLoad, amountDue };
            this.props.addElectricityExpense(data).then(() => { this.props.history.push('/superDashboard/electricityExpenseDetail') })
                .catch(error => {
                    this.setState({ message: error.response.data.message, loading: false });
                })
        }
    }

    startDateChange = (e) => {
        var start = document.getElementById('start');
        var end = document.getElementById('end');
        if (start.value) {
            end.min = start.value;
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    endDateChange = (e) => {
        // var start = document.getElementById('start');
        // var end = document.getElementById('end');

        // if (end.value) {
        //     start.max = end.value;
        // }

        this.setState({ [e.target.name]: e.target.value });
    }

    close = () => {
        return this.props.history.push('/superDashBoard');
    }

    render() {
        // return <div>Electricity Expense</div>
        let form;
        form = <div>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}><span className="error">{this.state.message}</span></Col>
                </Row>
                <Row md={12}>
                    <Col md={4}>
                        <label>Tower Name</label>
                        <select required className="form-control" defaultValue='no-value' name="towerId" onChange={this.towerChangeHandler}>
                            <DefaultSelect />
                            {this.getDropdownForTower(this.props.flatDetailMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.towerId}</span>
                    </Col>
                    <Col md={4}>
                        <label>Floor</label>
                        <select className="form-control" id="floorId" defaultValue='no-value' name="floorId" onChange={this.floorChangeHandler}>
                            <DefaultSelect />
                            {this.getFloorData(this.props.electricityExpenseReducer)}
                        </select>
                        <span className="error">{this.state.errors.floorId}</span>
                    </Col>
                    <Col md={4}>
                        <label>Flats</label>
                        <select className="form-control" id="flatDetailId" defaultValue='no-value' name="flatDetailId" onChange={this.flatChangeHandler}>
                            <DefaultSelect />
                            {this.getFlatData(this.props.electricityExpenseReducer)}
                        </select>
                        <span className="error">{this.state.errors.flatDetailId}</span>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={5}>
                        <label>Last Reading</label>
                        <input className="form-control" placeholder="Last Reading"
                            type="text" name="lastReading"
                            maxLength="16"
                            onChange={this.rateChange}
                            value={this.state.lastReading}></input>
                        <span className="error">{this.state.errors.lastReading}</span>
                    </Col>
                    <Col md={3}>
                        <label><br /></label>
                        <select required className="form-control" defaultValue='no-value' name="sign" onChange={this.onSignChange}>
                            <DefaultSelect />
                            <option value="false" >+</option>
                            <option value="true">-</option>
                            {/* {this.getDropdownForTower(this.props.flatDetailMasterReducer)} */}
                        </select>
                        <span className="error">{this.state.errors.sign}</span>
                    </Col>
                    <Col md={4}>
                        <label>Amount</label>
                        <input className="form-control"
                            placeholder="Amount"
                            type="text" name="amount"
                            maxLength="10"
                            onChange={this.rateChange}
                            onKeyPress={this.onKeyPressHandler}
                        // value={this.state.currentReading} 
                        />
                        <span className="error">{this.state.errors.amount}</span>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <label>Rate Per Unit</label>
                        <select required className="form-control" defaultValue='no-value' name="rate" onChange={this.flatChangeHandler}>
                            <DefaultSelect />
                            {this.getDropdownForRate(this.props.electricityExpenseReducer)}
                        </select>
                        <span className="error">{this.state.errors.rate}</span>
                    </Col>
                    <Col md={4}>
                        <label>Sanctioned Load</label>
                        <input className="form-control"
                            placeholder="Sanctioned Load"
                            type="text" name="sanctionedLoad"
                            maxLength="16"
                            onChange={this.rateChange}
                            value={this.state.sanctionedLoad}
                        // onKeyPress={this.onKeyPressHandler}
                        // value={this.state.currentReading}
                        />
                        <span className="error">{this.state.errors.sanctionedLoad}</span>
                    </Col>
                    <Col md={4}>
                        <label>Last Reading Date</label>
                        <input className="form-control" max={memberMaxDate()} type="date" name="lastReadingDate" id="end" onChange={this.endDateChange} />
                        <span className="error">{this.state.errors.lastReadingDate}</span>
                    </Col>
                    {/* <Col md={4}>
                        <label>Unit Consumed</label>
                        <input className="form-control"
                            placeholder="Unit Consumed"
                            type="text"
                            name="unitConsumed"
                            maxLength="16"
                            onChange={this.rateChange}
                            value={this.state.unitConsumed} />
                    </Col> */}
                </Row>
            </FormGroup>
            {/* <FormGroup>
                <Row md={12}> }
                    <Col md={6}>
                        <label>Start Date</label>
                        <input min={memberMaxDate()} className="form-control" type="date" name="startDate" id="start" onChange={this.startDateChange} />
                    </Col>
                    <Col md={6}>
                        <label>Last Reading Date</label>
                        <input className="form-control" type="date" name="end
                        " id="end" onChange={this.endDateChange} />
                    </Col>
                 </Row>
            </FormGroup> */}
            <FormGroup>
                <Button className="btn btn-success mr-2">Submit</Button>
                <Button className="btn btn-danger" onClick={this.cancel}>Cancel</Button>
            </FormGroup>
        </div>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.submit} method="POST">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Add Electricity Expense</h3>
                    </div>
                    {!this.state.loading ? form : <Spinner />}
                </Form>
            </UI>
        )
    }
}

function mapStateToProps(state) {
    return {
        flatDetailMasterReducer: state.flatDetailMasterReducer,
        electricityExpenseReducer: state.electricityExpenseReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getTowerName, getfloorsOfTowers, getRateForElectricityExpense, addElectricityExpense }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddElectricityExpense);


