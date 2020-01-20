import React, { Component } from "react";
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { bindActionCreators } from 'redux';
import { Table, FormGroup, Button, Label } from "reactstrap";
import { viewAccounts, updateAccount, deleteAccount, deleteSelectedAccount } from '../../actions/salaryAccount'
import Spinner from '../../components/spinner/spinner';
import ModalBox from "../../components/modal/modal";
import InputField from "../../components/reusableComponents/inputs";
import ButtonComponent from "../../components/reusableComponents/button";
import SearchFilter from "../../components/searchFilter/searchFilter";

class GetLinkedAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [{ "bankName": "", "accountNo": "", "pan": "" }],
            errors: {},
            ids: [],
            loading: true,
            isDisabled: true,
            filterName: "bankName",
            editModal: false,
            modalLoading: false,
            modal: false,
            search: ''
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

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName("SelectAll");
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if (ar.length > 0) {
            this.setState({ isDisabled: false });
        }
    };

    unSelectAll = () => {
        let unSelectMultiple = document.getElementsByClassName("SelectAll");
        let allIds = [];
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false;
        }

        this.setState({ ids: [...allIds] });
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }
    };

    deleteSelected(ids) {
        this.setState({ loading: true, isDisabled: true });
        this.props
            .deleteSelectedAccount(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
    }

    getAccounts = ({ accountDetails }) => {
        if (accountDetails && accountDetails.accounts) {
            return accountDetails.accounts.sort((item1, item2) => {
                var items1 = item1.bankName;
                var items2 = item2.bankName;
                var cmprVal =
                    items1 && items2
                        ? items1.localeCompare(
                            items2
                        )
                        : ""
                return this.state.sortVal ? cmprVal : -cmprVal
            }).filter(this.searchFilter(this.state.search))
                .map((item, index) => {
                    return (<tr key={item.accountId}>
                        <td>
                            <input
                                type="checkbox"
                                name="ids"
                                className="SelectAll"
                                value={item.accountId}
                                onChange={e => {
                                    const { accountId } = item;
                                    if (!e.target.checked) {
                                        document.getElementById("allSelect").checked = false;
                                        let indexOfId = this.state.ids.indexOf(
                                            accountId
                                        );
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1);
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true });
                                        }
                                    } else {
                                        this.setState({
                                            ids: [...this.state.ids, accountId]
                                        });
                                        if (this.state.ids.length >= 0) {
                                            this.setState({ isDisabled: false });
                                        }
                                    }
                                }}
                            />
                        </td>
                        <td>{index + 1}</td>
                        <td >{item.bankName
                            ? item.bankName
                            : ""}</td>
                        <td>{item.accountNo}</td>
                        <td>{item.pan}</td>
                        <Button
                            className="mr-2"
                            color="success"
                            onClick={this.edit.bind(
                                this,
                                item.bankName,
                                item.accountNo,
                                item.pan,
                                item.accountId
                            )}
                        >
                            Edit
                  </Button>
                        <Button
                            color="danger"
                            onClick={this.delete.bind(
                                this,
                                item.accountId
                            )}
                        >
                            Delete
                  </Button>
                    </tr >
                    )
                })
        }
    }

    edit = (
        bankName,
        accountNo,
        pan,
        accountId,
    ) => {
        this.setState({
            accountId: accountId,
            bankName: bankName,
            accountNo: accountNo,
            pan: pan,
            editModal: true
        });
    };


    update = () => {
        let {
            accountId,
            bankName,
            accountNo,
            pan
        } = this.state;
        let errors = {};
        // if (this.state.sign === '') {
        //     errors.sign = `This can't be empty.`
        // }
        if (this.state.bankName === "") {
            errors.bankName = `Bank Name can't be empty.`;
        }
        if (this.state.accountNo === "") {
            errors.accountNo = `Account Number can't be empty.`;
        }
        if (this.state.pan === "") {
            errors.pan = `PAN Number can't be empty.`;
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            this.props
                .updateAccount(
                    accountId,
                    bankName,
                    accountNo,
                    pan
                )
                .then(() => {
                    this.refreshData();
                    this.setState({
                        editModal: false,
                    });
                })
                .catch(err => {
                    this.setState({
                        modalLoading: false,
                        message: err.response.data.message
                    });
                });
            this.setState({
                modalLoading: true
            });
        }
    };

    toggleModal = () => {
        this.setState({
            editModal: !this.state.editModal
        });
    };

    delete(id) {
        this.setState({ loading: true });
        this.props
            .deleteAccount(id)
            .then(() => this.refreshData())
            .catch(err => err);
    }

    addSalaryAccount = () => {
        this.props.history.push("/superDashboard/salaryAccount");
    };

    onChangeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    searchOnChange = e => {
        this.setState({ search: e.target.value });
    };

    searchFilter = search => {
        return function (x) {
            return (
                x.bankName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                x.pan
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                !search
            );
        };
    };

    close = () => {
        return this.props.history.replace('/superDashBoard/getSalaryAccount');
    }

    render() {
        let tabelData = (
            <Table bordered>
                <thead>
                    <tr>
                        <th style={{ width: "4%" }}>Select</th>
                        <th style={{ width: "4%" }}>#</th>
                        <th
                            onClick={() => {
                                this.setState(state => {
                                    return {
                                        sortVal: !state.sortVal,
                                        filterName: "bankName"
                                    };
                                });
                            }}
                            style={{ cursor: "pointer" }}>
                            Bank Name
                            <i
                                className="fa fa-arrows-v"
                                id="sortArrow"
                                aria-hidden="true"
                            ></i>
                        </th>
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

        let modalBoxData = (
            <div>
                <FormGroup>
                    <InputField
                        label="Bank Name"
                        name="bankName"
                        type="text"
                        value={this.state.bankName}
                        inputChange={this.onChangeInput}
                        disabled={false}
                        className="error"
                        error={this.state.errors.bankName}
                    />
                    <InputField
                        label="Account Number"
                        name="accountNo"
                        type="text"
                        value={this.state.accountNo}
                        inputChange={this.onChangeInput}
                        disabled={false}
                        className="error"
                        error={this.state.errors.accountNo}
                    />
                    <InputField
                        label="PAN Number"
                        name="pan"
                        type="text"
                        value={this.state.pan}
                        inputChange={this.onChangeInput}
                        disabled={false}
                        className="error"
                        error={this.state.errors.pan}
                    />
                </FormGroup>
                <FormGroup>
                    <ButtonComponent
                        color="primary"
                        className="mr-2"
                        buttonClicked={this.update}
                        title="Save"
                    />

                    <ButtonComponent
                        color="danger"
                        buttonClicked={this.toggleModal.bind(this)}
                        title="Cancel"
                    />
                </FormGroup>
            </div>
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
                        <Button color="primary" onClick={this.addSalaryAccount}>
                            {" "}
                            Add Account Detail
                         </Button>
                    </div>
                    <SearchFilter
                        type="text"
                        value={this.state.search}
                        onChange={this.searchOnChange}
                    />
                    <Button
                        color="danger"
                        disabled={this.state.isDisabled}
                        className="mb-3"
                        onClick={this.deleteSelected.bind(this, this.state.ids)}
                    >
                        Delete Selected
                     </Button>
                    <Label
                        htmlFor="allSelect"
                        style={{
                            alignContent: "baseline",
                            marginLeft: "10px",
                            fontWeight: "700"
                        }}
                    >
                        Select All
                            <input
                            className="ml-2"
                            id="allSelect"
                            type="checkbox"
                            onChange={e => {
                                if (e.target.checked) {
                                    this.selectAll();
                                } else if (!e.target.checked) {
                                    this.unSelectAll();
                                }
                            }}
                        />
                    </Label>
                    <ModalBox
                        openModal={this.state.editModal}
                        toggle={this.toggleModal.bind(this)}
                        title="Edit Account Detail"
                    >
                        <span className="error">{this.state.message}</span>
                        {!this.state.modalLoading ? modalBoxData : <Spinner />}
                    </ModalBox>
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
    return bindActionCreators({ viewAccounts, updateAccount, deleteAccount, deleteSelectedAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GetLinkedAccount);