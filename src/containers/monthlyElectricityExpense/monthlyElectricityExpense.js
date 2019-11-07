import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import { Col, Row, Form, Button, FormGroup } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import { getTowerName } from '../../actions/flatDetailMasterAction';
import { getfloorsOfTowers, addElectricityExpense } from '../../actions/electricityExpense';
import { getExpenseDetail, calculateCharges, addMonthlyElecCharges } from '../../actions/monthlyElectricityExpense';
import { memberMaxDate } from '../../validation/validation';

class MonthlyElectricityExpense extends Component {
    constructor(props){
        super(props);
        this.state = {
            towerId:'',
            floorId:'',
            flatDetailId:'',
            lastAmountDue:'',
            rate:'',
            rent:'',
            sanctionedLoad:'',
            mdi:'',
            // startDate:'',
            // endDate:'',
            unitConsumed:'',
            lastReading:'',
            currentReading:'',
            monthlyCharges:'',
            electricityConsumerId:'',
            amount:'',
            amountDue:null,
            loading:true,
            errors:{},
            errMessage:''
        }
    }

    componentDidMount() {
        this.props.getTowerName().then(() => this.setState({loading:false}));
        console.log(this.props.getTowerName)
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    towerChangeHandler = (e) => {
        document.getElementById('floorId').value = 'no-value';
        document.getElementById('flatDetailId').value = 'no-value';
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors,errMessage:''
            });
            
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim(),errMessage:'' })
        }
        console.log(this.state.towerId);
        this.props.getfloorsOfTowers(e.target.value)
    }

    getDropdownForTower = ({ name }) => {
        console.log("tower ?", name)
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

    getFloorData = ({ floorDetails }) => {
        console.log(floorDetails)
        if (floorDetails && floorDetails.tower && floorDetails.tower.Floors) {
            console.log(floorDetails)
            return floorDetails.tower.Floors.map((items) => {
                return (
                    <option key={items.floorId} value={items.floorId}>
                        {items.floorName}
                    </option>
                )
            })
        }
    }

    // componentDidUpdate(){
    //     if(getExpenseDetail){
    //         console.log(this.props.monthlyElectricityExpenseReducer.getExpenseDetail)
    //     }
    // }

    startDateChange = (e) => {
        var start = document.getElementById('start');
        var end = document.getElementById('end');

        if (start.value) {
            end.min = start.value;
        }
        if (!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors,subMaintenanceErr:'' });
        }
        else{
            this.setState({[e.target.name]:e.target.value,subMaintenanceErr:''});
        }
    }

    endDateChange = (e) => {
        var start = document.getElementById('start');
        var end = document.getElementById('end');

        if (end.value) {
            start.max = end.value;
        }

        if (!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors,subMaintenanceErr:'' });
        }
        else{
            this.setState({[e.target.name]:e.target.value,subMaintenanceErr:''});
        }
    }

    getFlatData = ({ floorDetails }) => {
        console.log(floorDetails)
        if (floorDetails && floorDetails.flatDetail) {
            console.log(floorDetails)
            return floorDetails.flatDetail.filter((flatRecord) => {
                console.log("***flatREcord ", flatRecord.floorId)
                console.log("***flatREcord ", this.state.floorId)
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
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors,
                errMessage:''
            });
            
        }
        else {
            this.setState({ [e.target.name]: e.target.value ,errMessage:''})
        }
    }

    flatChangeHandler = (e) => {
        
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors,errMessage:''
            });
            
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim(),errMessage:'' })
        }
        this.props.getExpenseDetail(e.target.value)
            .then(() => this.getAllDetail(this.props.monthlyElectricityExpenseReducer));
    }


    rateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value,errMessage:'', monthlyCharges:''});
            console.log(this.state);
        }
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                errors,errMessage:'', monthlyCharges:''
            });
        }
    }

    currentReadingChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ currentReading: e.target.value, monthlyCharges:''
            , unitConsumed:(e.target.value - this.state.lastReading),errMessage:'' });
        }
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                errors,errMessage:'', monthlyCharges:''
            });
        }
    }

    close = () => {
        return this.props.history.push('/superDashBoard');
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};
        console.log(this.state);
        let { towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
            mdi,amountDue, amount, monthlyCharges,electricityConsumerId } = this.state;
        if(!towerId) errors.towerId = `Select tower.`;
        if(!floorId) errors.floorId = `Select floor.`;
        if(!flatDetailId) errors.flatDetailId=`Select flat.`;
        if(currentReading === '') errors.currentReading = `Current reading can't be empty.`;
        if(parseInt(currentReading) <= parseInt(lastReading)) errors.currentReading = `Current Reading can't be less than last reading.`;
        if(rent === '') errors.rent = `Rent can't be empty.`;
        if(mdi === '') errors.mdi = `MDI can't be empty.`;
        if(!monthlyCharges) errors.monthlyCharges = `Please calculate monthly charges.`
        // if(!document.getElementById('monthlyCharges').value) errors.monthlyCharges = `Please calculate monthly charges.`

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            let data = {
                towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
            mdi,amountDue, amount, monthlyCharge:monthlyCharges,electricityConsumerId
            }
            this.setState({loading:true});
            this.props.addMonthlyElecCharges(data)
            .then(() => this.props.history.push('/superDashboard/monthlyElectricityExpenseDetail'))
            .catch(err => {
                err;
                console.log(err.response)
                this.setState({errMessage:err.response.data.message, loading:false});
            })
        }
    }

    getAllDetail({getExpenseDetail}){
        if(getExpenseDetail && getExpenseDetail.electricityConsumer){
            console.log(getExpenseDetail)
            let data = getExpenseDetail.electricityConsumer;
            console.log(data);
            this.setState({sanctionedLoad:data.sanctionedLoad, lastReading:data.lastReading, amount:data.amount, amountDue:data.amountDue,
            rate:data.rate})
        }
    }

    // componentDidUpdate(){
    //     if(this.props.monthlyElectricityExpenseReducer.getExpenseDetail && this.props.monthlyElectricityExpenseReducer.getExpenseDetail.electricityConsumer){
    //         console.log(this.props.monthlyElectricityExpenseReducer.getExpenseDetail)
    //         let data = this.props.monthlyElectricityExpenseReducer.getExpenseDetail.electricityConsumer;
    //         console.log(data);
    //         let { electricityConsumerId, amount, amountDue, lastReading } = data;
    //     }
    // }

    getAllExpenseDetail = (getExpenseDetail) => {
        console.log(getExpenseDetail)
        if(getExpenseDetail){
            console.log(getExpenseDetail)
        }
    }

    calcCharges = (e) => {
        e.preventDefault();
        let errors = {};
        
        let { unitConsumed, sanctionedLoad, amountDue, amount, mdi, rate, rent, currentReading, lastReading } = this.state;
        if(parseInt(currentReading) <= parseInt(lastReading)) errors.currentReading = `Current Reading can't be less than last reading.`;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            let data = { unitConsumed, sanctionedLoad, amountDue, amount, mdi, rate, rent };
            this.props.calculateCharges(data)
            .then(() => this.getMonthlyCharges(this.props.monthlyElectricityExpenseReducer));
        }
    }

    getMonthlyCharges = ({getCharges}) => {
        if(getCharges && getCharges.monthlyCharges){
            console.log(getCharges);
            this.setState({monthlyCharges:getCharges.monthlyCharges})
        }
    }

    routeToDetail = (e) => {
        e.preventDefault()
        this.props.history.push('/superDashboard/monthlyElectricityExpenseDetail');
    }

    render(){
        let { towerId, floorId, flatDetailId, lastReading, currentReading, unitConsumed, lastAmountDue, rate, rent, sanctionedLoad,
        mdi,amountDue, amount, monthlyCharges,startDate, endDate, errors } = this.state;
        let form;
        form = <div>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <label>Tower Name</label>
                        <select required className="form-control" id="towerId" defaultValue='no-value' name="towerId" onChange={this.towerChangeHandler}>
                            <DefaultSelect />
                            {this.getDropdownForTower(this.props.flatDetailMasterReducer)}
                        </select>
                        <span className="error">{errors.towerId}</span>
                    </Col>
                    <Col md={4}>
                        <label>Floor</label>
                        <select className="form-control" id="floorId" defaultValue='no-value' name="floorId" onChange={this.floorChangeHandler}>
                            <DefaultSelect />
                            {this.getFloorData(this.props.electricityExpenseReducer)}
                        </select>
                        <span className="error">{errors.floorId}</span>
                    </Col>
                    <Col md={4}>
                        <label>Flat</label>
                        <select className="form-control" id="flatDetailId" defaultValue='no-value' name="flatDetailId" onChange={this.flatChangeHandler}>
                            <DefaultSelect />
                            {this.getFlatData(this.props.electricityExpenseReducer)}
                        </select>
                        <span className="error">{errors.flatDetailId}</span>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={4}>
                        <label>Last Reading</label>
                        <input className="form-control" placeholder="Last Reading"
                            type="text" name="lastReading"
                            maxLength="16"
                            onChange={this.rateChange}
                            readOnly
                            value={lastReading}/>
                    </Col>
                    <Col md={4}>
                        <label>Current Reading</label>
                        <input className="form-control"
                            placeholder="Current Reading"
                            type="text" name="currentReading"
                            maxLength="10"
                            value={currentReading}
                            onChange={this.currentReadingChange}
                            // value={this.state.currentReading} 
                            />
                        <span className="error">{errors.currentReading}</span>
                    </Col>
                    <Col md={4}>
                        <label>Unit Consumed</label>
                        <input className="form-control"
                            placeholder="Unit Consumed"
                            type="text" name="unitConsumed"
                            maxLength="16"
                            readOnly
                            value={(currentReading && !!lastReading) ? (currentReading - lastReading):''}
                            onChange={this.rateChange}
                            />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={3}>
                        <label>Last Amount Due</label>
                        <input className="form-control"
                            placeholder="Last Amount Due"
                            readOnly
                            type="text" name="lastAmountDue"
                            maxLength="10" onChange={this.rateChange}
                            value={(amountDue == true ? '-' : amountDue == false ? '+':'') + amount}
                            />
                    </Col>
                    <Col md={3}>
                        <label>Rate</label>
                        <input className="form-control"
                            placeholder="Rate"
                            type="text" name="rate"
                            readOnly
                            value={this.state.rate}
                            maxLength="10" onChange={this.rateChange}
                            />
                    </Col>
                    <Col md={3}>
                        <label>Rent</label>
                        <input className="form-control"
                            placeholder="Rent"
                            type="text" name="rent"
                            maxLength="16"
                            onChange={this.rateChange}
                            value={this.state.rent} 
                            />
                        <span className="error">{errors.rent}</span>
                    </Col>
                    <Col md={3}>
                        <label>Sanctioned Load</label>
                        <input className="form-control"
                            placeholder="Sanctioned Load"
                            type="text" name="sanctionedLoad"
                            maxLength="16"
                            readOnly
                            value={sanctionedLoad}
                            onChange={this.rateChange}
                            />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                    <Col md={5}>
                        <label>MDI</label>
                        <input className="form-control"
                            placeholder="MDI"
                            type="text" name="mdi"
                            maxLength="16"
                            onChange={this.rateChange}
                            value={mdi} 
                            />
                        <span className="error">{errors.mdi}</span>
                    </Col>
                    <Col md={4}>
                        <label>Monthly Charges</label>
                        <input className="form-control"
                            placeholder="Monthly Charges"
                            type="text" name="monthlyCharges"
                            maxLength="16"
                            readOnly
                            id="monthlyCharges"
                            value={monthlyCharges}
                            onChange={this.rateChange}
                            />
                        <span className="error">{errors.monthlyCharges}</span>
                    </Col>
                    <Col md={3} style={{textAlign:'center'}}>
                        <Button disabled={(!towerId || !floorId || !flatDetailId || !lastReading || !currentReading || !unitConsumed || !amount || !rate || !rent || !sanctionedLoad ||
                        !mdi)} color="primary" style={{marginTop:'28px'}} onClick={this.calcCharges}>Calculate Charges</Button>
                    </Col>
                </Row>
            </FormGroup>
            {/* <FormGroup>
                <Row md={12}>
                    <Col md={6}>
                        <label>Start Date</label>
                        <input min={memberMaxDate()} className="form-control" type="date" name="startDate" id="start" onChange={this.startDateChange} />
                        <span className="error">{errors.startDate}</span>
                    </Col>
                    <Col md={6}>
                        <label>End Date</label>
                        <input disabled={!startDate} className="form-control" type="date" name="endDate" id="end" onChange={this.endDateChange} />
                        <span className="error">{errors.startDate}</span>
                    </Col>
                </Row>
            </FormGroup> */}
            <FormGroup>
                <Button className="btn btn-success mr-2">Add Expense</Button>
                <Button className="btn btn-danger" onClick={this.routeToDetail}>Cancel</Button>
            </FormGroup>
        </div>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <Form method="POST" onSubmit = {this.submit}>
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Add Monthly Electricity Expense</h3>
                    </div>
                    <div className="error">{this.state.errMessage}</div>
                    {!this.state.loading ? form: <Spinner/>}
                </Form>
            </UI>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        flatDetailMasterReducer: state.flatDetailMasterReducer,
        electricityExpenseReducer: state.electricityExpenseReducer,
        monthlyElectricityExpenseReducer: state.monthlyElectricityExpenseReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getTowerName, getfloorsOfTowers, addElectricityExpense, getExpenseDetail,
         calculateCharges,addMonthlyElecCharges }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyElectricityExpense);