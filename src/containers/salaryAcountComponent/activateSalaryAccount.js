import React, { Component } from 'react';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import { viewAccounts, activateAccount, deleteAccount } from '../../actions/salaryAccount'
import { Table, Button } from "reactstrap";
import Spinner from '../../components/spinner/spinner';

class ActivateSalaryAccount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            employeeId: '',
            message: ''
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        let id = localStorage.getItem("employeeId");
        this.setState({ employeeId: id });
        this.props.viewAccounts(id)
            .then(() => this.setState({ loading: false, modalLoading: false, modal: false }))
            .catch(err => {
                this.setState({ loading: false });
            });
    };

    getLinkedAccount = () => {
        this.props.history.push("/superDashboard/getLinkedAccount");
    };

    getAccounts = ({ accountDetails }) => {
        if (accountDetails && accountDetails.accounts) {
            return accountDetails.accounts.map((item, index) => {
                return (<tr key={item.accountId}>
                    <td>{index + 1}</td>
                    <td >{item.bankName
                        ? item.bankName
                        : ""}</td>
                    <td>{item.accountNo}</td>
                    <td>{item.pan}</td>
                    {/* {item.isActive == true ? :''} */}
                    <Button
                        className="mr-2"
                        color="success"
                        disabled={item.isActive}
                        onClick={this.activate.bind(
                            this,
                            item.accountId,
                            item.employeeId
                        )}
                    >
                        Activate
                  </Button>
                    <Button className="mr-2" color="danger"
                        onClick={this.delete.bind(
                            this,
                            item.accountId
                        )} disabled={!item.isActive}>Deactivate</Button>
                </tr >
                )
            })
        }
    }

    activate(id, employeeId) {
        this.setState({ loading: true });
        this.props
            .activateAccount(id, employeeId)
            .then(() => this.refreshData())
        // .catch(err => {
        //     this.setState({ message: err.response.data.message, loading: false });
        // });
    }


    delete(id) {
        this.setState({ loading: true });
        this.props
            .deleteAccount(id)
            .then(() => this.refreshData())
            .catch(err => err);
    }

    close = () => {
        return this.props.history.replace('/superDashBoard/getSalaryAccount');
    }


    render() {
        let tabelData = (
            <Table bordered>
                <thead>
                    <tr>
                        <th style={{ width: "4%" }}>#</th>
                        <th>Bank Name</th>
                        <th>Account Number</th>
                        <th>PAN</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getAccounts(this.props.salaryAccountReducer)}
                </tbody>
            </Table>
        );

        return (
            <UI>
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
                        <h3 align="center"> Activate Account</h3>
                        <Button color="primary" onClick={this.getLinkedAccount}>
                            {" "}
                            Linked Accounts
                         </Button>
                    </div>
                    {this.state.loading ? <Spinner /> : tabelData}
                </div>
            </UI>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        salaryAccountReducer: state.salaryAccountReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ viewAccounts, activateAccount, deleteAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivateSalaryAccount);