import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFacilitySubMaster, deleteSelectSubFacility, deleteFacilityRate, updateSubFacilty } from './../../actions/facilitySubMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner';
import { getFacility } from '../../actions/facilityAction';
import DefaultSelect from '../../constants/defaultSelect';


class FacilitySubMasterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            facilityDetailId: '',
            filterName: 'facilityName',
            facilityId: '',
            monthlyRate: '',
            unitRate: '',
            modalLoading: false,
            modal: false,
            monthlyRateType: false,
            rateType: false,
            loading: true,
            ids: [],
            errors: {}



        };
    }

    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getFacilitySubMaster().then(() => this.setState({ loading: false, modalLoading: false, modal: false }));
        this.props.getFacility().then(() => this.setState({ loading: false, modalLoading: false, editModal: false }));
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {

            return x.facilities_master.facilityName.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }


    onChange = (e) => {

        let selected = e.target.value
        console.log(selected, "facilityName===========")

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

    onRateChange = (e) => {
        this.setState({ message: '' })
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState({ [e.target.name]: e.target.value });
        }
    }



    deleteFacilityName = (facilityDetailId) => {
        console.log(facilityDetailId)
        let { isActive } = this.state
        this.setState({ loading: true })
        this.props.deleteFacilityRate(facilityDetailId, isActive)
            .then(() => this.refreshData())
        this.setState({ isActive: false })

    }



    deleteSelected(ids) {
        this.setState({ loading: true, isDisabled: true });
        this.props.deleteSelectSubFacility(ids)
            .then(() => this.refreshData())
            .catch(err => err.response.data.message);


    }

    toggle = (facilityDetailId, facilityId, monthlyRate, unitRate) => {
        this.setState({
            facilityDetailId,
            facilityId,
            monthlyRate,
            unitRate,
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal, message: '', })
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

    editSubFacility = (e) => {
        e.preventDefault();
        const { facilityDetailId, facilityId, monthlyRate, unitRate } = this.state

        let errors = {};



        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        if (isValid && this.state.message === '') {


            this.props.updateSubFacilty(facilityDetailId, facilityId, monthlyRate, unitRate)
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



    renderFacility = ({ getSubFacility }) => {
        if (getSubFacility && getSubFacility.facilities) {
            console.log(getSubFacility.facilities)
            return getSubFacility.facilities.sort((item1, item2) => {
                console.log(item1)
                var cmprVal = (item1.facilities_master[this.state.filterName].localeCompare(item2.facilities_master[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                console.log(item)
                console.log(item)

                return (
                    <tr key={item.facilityDetailId} >
                        <td><input type="checkbox" name="ids" className="SelectAll" value={item.facilityDetailId}
                            onChange={(e) => {
                                const { facilityDetailId } = item
                                if (!e.target.checked) {
                                    document.getElementById('allSelect').checked = false;
                                    let indexOfId = this.state.ids.indexOf(facilityDetailId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if (this.state.ids.length === 0) {
                                        this.setState({ isDisabled: true });
                                    }
                                }
                                else {

                                    this.setState({ ids: [...this.state.ids, facilityDetailId] });

                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }

                            }} /></td>
                        <td >{index + 1}</td>
                        <td>{item.facilities_master ? item.facilities_master.facilityName : ''}</td>
                        {<td>{item.monthlyRate ? item.monthlyRate + " Per Monthly Rate" : item.unitRate + " Per Unit Rate"}</td>}

                        <td>

                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.facilityDetailId, item.facilityId, item.monthlyRate, item.unitRate)} >Edit</Button>
                            <Button color="danger" onClick={this.deleteFacilityName.bind(this, item.facilityDetailId)} >Delete</Button>

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

    routeToAddRate = () => {
        this.props.history.push('/superDashboard/facilitySubMaster')
    }

    getFacilityData = ({ getFacility }) => {
        if (getFacility && getFacility.facilities) {
            console.log("facility==========", getFacility)
            return getFacility.facilities.map((item) => {
                return (
                    <option key={item.facilityId} value={item.facilityId}>
                        {item.facilityName}
                    </option>
                )

            })


        }
    }

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }




    render() {

        let modalData = <div>
            <FormGroup>
                <Label>Facility Sub Master</Label>
                <Input type="select" name="facilityId" onChange={this.onChange} value={this.state.facilityId}>
                    <DefaultSelect />
                    {this.getFacilityData(this.props.facilityReducer)}
                </Input>
            </FormGroup>

            {(this.state.unitRate === null) ? <FormGroup>
                <Label>Monthly Rate</Label>
                <Input type="text" placeholder="Monthly Rate" value={this.state.monthlyRate} name="monthlyRate" onChange={this.onRateChange} maxLength={10}>
                </Input>
            </FormGroup>
                :
                <FormGroup>
                    <Label>Per Unit Rate</Label>
                    <Input type="text" placeholder="Per Unit Rate" name="unitRate" value={this.state.unitRate} onChange={this.onRateChange} maxLength={3}>

                    </Input>
                </FormGroup>}



            <Button color="success" onClick={this.editSubFacility} className="mr-2">Save</Button>
            <Button color="danger" onClick={this.toggleModal.bind(this)} >Cancel</Button>
        </div>

        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: "4%" }}></th>
                        <th>#</th>
                        {/* <th>Facility Name</th> */}

                        <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'facilityName'
                                }
                            });
                        }}>Facility Name
                 <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Rate / Type </th>
                        {/* <th>Per Unit Rate</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderFacility(this.props.FacilitySubMasterReducer)}
                </tbody>
            </Table></div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>Facility Sub Master</h3>
                            <Button color="primary" onClick={this.routeToAddRate}>Add Facility Rate</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                        <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
                            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>

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
        )
    }

}

function mapStatToProps(state) {

    return {
        FacilitySubMasterReducer: state.FacilitySubMasterReducer,
        facilityReducer: state.facilityReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFacilitySubMaster, getFacility, deleteSelectSubFacility, deleteFacilityRate, updateSubFacilty }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(FacilitySubMasterDetails);