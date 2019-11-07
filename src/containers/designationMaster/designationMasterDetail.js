import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDesignation, deleteDesignation, updateDesignation, deleteSelectDesignation } from './../../actions/designationMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner';


class DesignationMasterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: "designationName",
            editDesignationData: {
                designationName: '',
                designationId: '',
                isActive: false,

            },

            message: '',
            menuVisible: false,
            search: '',
            modalLoading: false,
            modal: false,
            loading: true,
            errors: {},
            isDisabled: true,
            ids: [],



        };
    }

    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getDesignation().then(() => this.setState({ loading: false, modalLoading: false, modal: false }))
    }

    onChangeHandler = (event) => {
        this.setState({ message: '' })

        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }


    toggle = (designationId, designationName) => {

        this.setState({
            designationId,
            designationName,
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal, message: '', })
    }




    editdesignationName = (e) => {
        e.preventDefault();

        const { designationId, designationName } = this.state

        let errors = {};
        if (this.state.designationName === '') {
            errors.designationName = "designationName can't be empty"
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        if (isValid && this.state.message === '') {

            this.props.updateDesignation(designationId, designationName)
                .then(() => this.refreshData())
                .catch(err => {
                    console.log(err.response.data.message)
                    this.setState({ modalLoading: false, message: err.response.data.message })
                })
            if (this.state.message === '') {
                this.setState({ modal: true })
            }
            else {
                this.setState({ modal: false })
            }

            this.setState({
                modalLoading: true
            })
        }
    }

    deleteDesignationName = (designationId) => {
        let { isActive } = this.state.editDesignationData
        this.setState({ loading: true })
        this.props.deleteDesignation(designationId, isActive)
            .then(() => this.refreshData())
        this.setState({ editDesignationData: { isActive: false } })

    }



    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {

            return x.designationName.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }

    deleteSelected(ids) {
        this.setState({ loading: true, isDisabled: true });
        this.props.deleteSelectDesignation(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);
    }
   


    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        console.log(this.state.ids,"selectAll==========")
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
        console.log(this.state.ids,"unSelectAll==========")
        if (allIds.length === 0) {
            this.setState({ isDisabled: true });
        }

    }


    renderDesignation = ({ designationResult }) => {
        if (designationResult && designationResult.designation) {

            return designationResult.designation.sort((item1, item2) => {
                var cmprVal = (item1.designationName && item2.designationName) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                console.log(item)

                return (
                    <tr key={item.designationId} >
                        <td><input type="checkbox" name="ids" className="SelectAll" value={item.designationId}
                            onChange={(e) => {
                                const { designationId } = item
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    let indexOfId = this.state.ids.indexOf(designationId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {

                                    this.setState({ ids: [...this.state.ids, designationId] });

                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td >{index + 1}</td>
                        <td>{item.designationName}</td>
                        <td>
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.designationId, item.designationName)} >Edit</Button>
                            <Button color="danger" onClick={this.deleteDesignationName.bind(this, item.designationId)} >Delete</Button>

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

    routeToAddNewDesignation = () => {
        this.props.history.push('/superDashboard/designationMaster')
    }



    onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }

    render() {

        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: "4%" }}></th>
                        <th>#</th>
                        <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'designationName'
                                }
                            });
                        }}>Designation Position
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderDesignation(this.props.DesignationMasterReducer)}
                </tbody>
            </Table></div>
        let deleteSelectButton = <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
        let modalData = <div>
            <FormGroup>
                <Label>Designation Type</Label>
                <Input type="text" id="designationId" name="designationName" onChange={this.onChangeHandler} value={this.state.designationName} maxLength={50} onKeyPress={this.onKeyPressHandler} />
                <span className="error">{this.state.errors.designationName}</span>
                <span className="error">{this.state.message}</span>
            </FormGroup>


            <FormGroup>
                <Button color="primary mr-2" onClick={this.editdesignationName}>Save</Button>

                <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
            </FormGroup>
        </div>
        return (
            <div>

                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>Designation Details</h3>
                            <Button onClick={this.routeToAddNewDesignation} color="primary">Add Designation</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />

                        {deleteSelectButton}
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
                        {(this.state.loading) ? <Spinner /> : tableData}
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                            <ModalBody>
                                {!this.state.modalLoading ? modalData : <Spinner />}
                            </ModalBody>
                        </Modal>


                    </div>
                </UI>

            </div>
        );
    }
}


function mapStatToProps(state) {
    console.log(state)
    return {
        DesignationMasterReducer: state.DesignationMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getDesignation, deleteDesignation, updateDesignation, deleteSelectDesignation }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(DesignationMasterDetail);