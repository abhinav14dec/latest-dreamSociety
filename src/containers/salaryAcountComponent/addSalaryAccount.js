import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import { Col, Row, Form, Button, FormGroup } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';
import { ViewEmployee } from '../../actions/employeeMasterAction';
import { addEmployeeAccount } from '../../actions/salaryAccount';


class SalaryAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [{ "bankName": "", "accountNo": "", "pan": "" }],
            employeeId: '',
            errors: {},
        }
    }

    componentDidMount() {
        this.props.ViewEmployee().then(() => this.setState({ loading: false }));
    }


    getDropdownForEmployee = ({ getEmployee }) => {
        if (getEmployee && getEmployee.data && getEmployee.data.employee) {
            return getEmployee.data.employee.map((item) => {
                return (
                    <option key={item.employeeId} value={item.employeeId} >
                        {item.firstName + ' ' + item.middleName + ' ' + item.lastName}
                    </option>
                )
            })
        }
    }

    removeClick(i) {
        let accounts = [...this.state.accounts];
        accounts.splice(i, 1);
        this.setState({ accounts });
    }

    onChange = (e) => {
        this.setState({ message: '' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    handleChange(i, e) {
        const { name, value } = e.target;
        let accounts = [...this.state.accounts];
        this.setState({ message: '' })
        if (!!this.state.errors[name + i]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name + i];
            this.setState({ [name + i]: value.trim(''), errors });
        } else {
            accounts[i] = { ...accounts[i], [name]: value };
            this.setState({ accounts });
        }
    }

    OnKeyPressNumber(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPressString(event) {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    createUI(errors) {
        return this.state.accounts.map((item, index) => {
            return (
                <div key={index}>
                    <FormGroup>
                        <Row md={12}>
                            <Col md={3}>
                                <label>Bank Name</label>
                                <input className="form-control" placeholder="Bank Name"
                                    type="text" name="bankName"
                                    maxLength="16"
                                    onChange={this.handleChange.bind(this, index)}
                                    onKeyPress={this.OnKeyPressString}
                                    value={item.bankName || ''}></input>
                                <span className="error">{errors["bankName" + index]}</span>
                            </Col>
                            <Col md={3}>
                                <label>Account Number</label>
                                <input className="form-control" placeholder="Account Number"
                                    type="text" name="accountNo"
                                    maxLength="16"
                                    onChange={this.handleChange.bind(this, index)}
                                    onKeyPress={this.OnKeyPressNumber}
                                    value={item.accountNo || ''}></input>
                                <span className="error">{errors["accountNo" + index]}</span>
                            </Col>
                            <Col md={3}>
                                <label>PAN</label>
                                <input className="form-control" placeholder="PAN Number"
                                    type="text" name="pan"
                                    maxLength="10"
                                    onChange={this.handleChange.bind(this, index)}
                                    value={item.pan || ''}></input>
                                <span className="error">{errors["pan" + index]}</span>
                            </Col>
                            <Col md={3}>
                                <Button style={{ 'marginTop': '26px' }} className="btn btn-danger mr-2" onClick={this.removeClick.bind(this, index)}>Remove</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </div>
            )
        })
        // })
    }

    addClick() {
        this.setState(prevState => ({
            accounts: [...prevState.accounts, { bankName: "", accountNo: "", pan: "" }]
        }))
    }

    employeeChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword');
    }

    cancel = () => {
        return this.props.history.push('/superDashboard/getSalaryAccount');
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let { employeeId, accounts } = this.state;

        let errors = {};
        if (this.state.employeeId === '') {
            errors.employeeId = `Employee can't be empty.`;
        }
        this.state.accounts.map((item, index) => {
            if (item.bankName === '') {
                console.log("bank name empty")
                errors["bankName" + index] = `Bank Name can't be empty.`;
            }
            if (item.accountNo === '') {
                errors["accountNo" + index] = `Account No can't be empty.`;
            }
            if (item.pan === '') {
                errors["pan" + index] = `PAN Number can't be empty.`;
            }
        })

        this.setState({ errors })
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            this.setState({ loading: true })
            let data = { employeeId, accounts };
            this.props.addEmployeeAccount(data).then(() => { this.props.history.push('/superDashboard/getSalaryAccount') })
                .catch(error => {
                    this.setState({ message: error.response.data.message, loading: false });
                })
        }
    }

    render() {
        let form;
        form = <div>
            <FormGroup>
                <label>Employee Name</label>
                <select required className="form-control" defaultValue='no-value' name="employeeId" onChange={this.onChange}>
                    <DefaultSelect />
                    {this.getDropdownForEmployee(this.props.viewEmployeeDetailsReducer)}
                </select>
                <span className="error">{this.state.errors.employeeId}</span>
            </FormGroup>
            {this.createUI(this.state.errors)}
            <FormGroup>
                <Button className="btn btn-info mr-2" onClick={this.addClick.bind(this)}>Add More Account</Button>
            </FormGroup>
            <FormGroup>
                <Button className="btn btn-success mr-2">Submit</Button>
                <Button className="btn btn-danger" onClick={this.cancel}>Cancel</Button>
            </FormGroup>
        </div>


        return (
            <UI>
                <Form onSubmit={this.handleSubmit} method="POST">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Add Salary Account</h3>
                    </div>
                    {!this.state.loading ? form : <Spinner />}
                </Form>
            </UI>
        )
    }
}

function mapStateToProps(state) {
    return {
        viewEmployeeDetailsReducer: state.EmpDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ViewEmployee, addEmployeeAccount }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SalaryAccount);
