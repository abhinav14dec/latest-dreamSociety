import React, { Component } from "react";
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import { ViewEmployee } from '../../actions/employeeMasterAction';
import { Table, Row, Col, FormGroup, Input, Button, Label } from "reactstrap";
import { getEmployeeAccount } from '../../actions/salaryAccount'
import Spinner from '../../components/spinner/spinner';


class GetSalaryAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [{ "bankName": "", "accountNo": "", "pan": "" }],
            employeeId: '',
            firstName: '',
            middleName: '',
            lastName: '',
            errors: {},
            loading: true,
        }
    }
    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        this.props.ViewEmployee().then(() => this.setState({ loading: false }))
    }

    viewLinkedAccounts(id) {
        localStorage.setItem('employeeId', id);
        this.props.history.push('/superDashBoard/getLinkedAccount');
    }

    activateAccount(id) {
        localStorage.setItem('employeeId', id);
        this.props.history.push('/superDashBoard/activateSalaryAccount');
    }


    getEmployee({ getEmployee }) {
        if (getEmployee && getEmployee.data && getEmployee.data.employee) {
            return getEmployee.data.employee.map((item, index) => {
                return (<tr key={item.employeeId}>
                    <td>{index + 1}</td>
                    <td >{item.uniqueId}</td>
                    <td>{item.firstName + ' ' + item.middleName + ' ' + item.lastName}</td>
                    <Button color="success" className="mr-2" onClick={this.viewLinkedAccounts.bind(this, item.employeeId)}>
                        Linked Accounts
                </Button>
                    <Button color="success" className="mr-2" onClick={this.activateAccount.bind(this, item.employeeId)}>
                        Activate Accounts
                    </Button>
                </tr>
                )
            })
        }
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }


    render() {
        let tabelData = (
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Employee Code</th>
                        <th>Employee Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getEmployee(this.props.EmpDetails)}
                </tbody>
            </Table>
        );

        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div
                        style={{ cursor: "pointer" }}
                        className="close"
                        aria-label="Close"
                        onClick={this.close}
                    >
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3 align="center"> Salary Account Detail</h3>
                    </div>
                    {/* <SearchFilter
                        type="text"
                        value={this.state.search}
                        onChange={this.searchOnChange}
                    /> */}
                    {this.state.loading ? <Spinner /> : tabelData}
                </div>
            </UI>
        )
    }
}

function mapStateToProps(state) {
    return {
        EmpDetails: state.EmpDetails
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ViewEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GetSalaryAccount);