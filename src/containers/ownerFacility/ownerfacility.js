import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addUserFacility, getUserFacility, notInFacility, updateUserFacility, updateFacility } from './../../actions/userFacilityAction';
import { bindActionCreators } from 'redux';

import UI from '../../components/newUI/ownerDashboard';
import { Table, Button, Modal, FormGroup, Form, ModalBody, ModalHeader, Input, Label, Row, Col } from 'reactstrap';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';
import { stat } from 'fs';
import $ from 'jquery';
import moment from 'moment'




class OwnerFacility extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            selected: '',
            type: 'activated',
            isActive: false,
            ids: [],
            facilityDetailId: '',
            duration: '',
            facilities: [],
            facilitiesUser: [],
            errors: {},
            message: '',
            endDate: '',
            arrData: false



        }
    }

    componentDidMount() {
        this.refreshData()
    }

    refreshData() {

        this.props.getUserFacility().then(() => this.setState({ loading: false }));
        this.props.notInFacility().then(() => this.setState({ loading: false }));


    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    changePassword = () => {
        return this.props.history.replace('/ownerDashboard/changePasswordOwner')
    }

    activatedChange = async (e) => {
        let selected = e.target.value;

        await this.setState({
            type: selected
        })

        this.refreshData()
        this.setState({ loading: true })
    }


    onChangeHandler = (facilityDetailId, e) => {

        let duration = e.target.value
        this.setState({ duration })

        this.state.facilities.forEach(item => {

            if (item.facilityDetailId === facilityDetailId) {
                item.duration = e.target.value;

            }
        })


        this.setState({ [e.target.name]: e.target.value, errors: {} });
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }


    }

    submitFacilityData = (facilities) => {
        this.setState({ loading: true })

        this.props.addUserFacility(facilities);
        this.refreshData()
    }





    facilityDisabled = (facilityDetailId) => {

        $(function () {
            $("input[type='checkbox']").on('change', function () {
                $(this).closest("tr").find("select[name=duration]").prop("disabled", !this.checked)
            });
        });
    }

    onChange = (facilityDetailId, e) => {

        this.state.facilitiesUser.forEach(item => {
            if (item.facilityDetailId === facilityDetailId) {
                item.endDate = e.target.value
            }
        })

    }


    inUseSubmit = (facilitiesUser) => {
        this.setState({ loading: true })

        this.props.updateUserFacility(facilitiesUser).then(() => {
            this.refreshData();
        })

    }

    getDataUser = (userFacilty) => {

        this.setState({ arrData: true })
        userFacilty.data.facilitiesInUse.map((item) => {


            let facilityDetailId = item.facilityDetailId;

            let endDate = item.endDate
            this.state.facilitiesUser.push({ facilityDetailId, endDate, isActive: true })
        })
    }

    
    close = () => {
        return this.props.history.replace('/ownerDashboard')
    }



    getActivatedData = ({ userFacilty }) => {


        if (userFacilty && userFacilty.data) {
            if (this.state.arrData === false) {
                this.getDataUser(userFacilty);
            }


            return userFacilty.data.facilitiesInUse.map((item) => {

                return (

                    <tr key={item.facilityDetailId} >
                        <td scope="row" ><Input type="checkbox" name="facilitiesUser" defaultChecked className="SelectAll" value={this.state.facilityDetailId} style={{ marginLeft: '1px' }}
                            onChange={(e) => {

                                const { facilityDetailId, endDate } = item


                                if (!e.target.checked) {
                                    let indexToBeFound;
                                    this.state.facilitiesUser.map((item, index) => {
                                        if (item.facilityDetailId === facilityDetailId) {
                                            item.isActive = false;
                                        }
                                    })
                                }
                                else {

                                    this.state.facilitiesUser.map((item, index) => {
                                        if (item.facilityDetailId === facilityDetailId) {
                                            item.isActive = true;
                                        }
                                    })
                                }

                            }
                            }
                        ></Input></td>
                       
                        <td>{item.facilities_details_master.facilities_master.facilityName}</td>
                        <td>{item.facilities_details_master.monthlyRate ? item.facilities_details_master.monthlyRate + " Per Monthly Rate" : item.facilities_details_master.unitRate + " Per Unit Rate"}</td>
                        <td>{(moment(item.startDate).format('MM/DD/YYYY'))}</td>
                        <td><Input type="date" name="endDate" defaultValue={item.endDate} onChange={this.onChange.bind(this, item.facilityDetailId)} />
                        </td>
                    </tr>


                )
            })
        }

    }



    getUserData = ({ getFacilityUser }) => {
        if (getFacilityUser && getFacilityUser.data) {

            return getFacilityUser.data.facilitiesNotInUse.map((item) => {

                return (
                    <tr key={item.facilityDetailId}>
                        <td scope="row" ><Input type="checkbox" name="facilities" disabled={this.facilityDisabled(item.facilityDetailId)} className="SelectAll" value={this.state.facilityDetailId} style={{ marginLeft: '1px' }}
                            onChange={(e) => {

                                const { facilityDetailId } = item



                                if (!e.target.checked) {
                                    let indexToBeFound;
                                    this.state.facilities.map((item, index) => {
                                        if (item.facilityDetailId === facilityDetailId) {
                                            indexToBeFound = index;
                                        }
                                    })

                                    this.state.facilities.splice(indexToBeFound, 1)


                                }
                                else {


                                    this.state.facilities.push({ facilityDetailId, duration: '' })
                                }
                                this.facilityDisabled(facilityDetailId)
                            }
                            }
                        ></Input></td>
                        <td>{item.facilities_master.facilityName}</td>
                        <td>{item.monthlyRate ? item.monthlyRate + " Per Monthly Rate" : item.unitRate + " Per Unit Rate"}</td>
                        <td> <Input type="select" defaultValue='no-value' name="duration" onChange={this.onChangeHandler.bind(this, item.facilityDetailId)} disabled>
                            <DefaultSelect selected disabled />
                            <option>1 Month</option>
                            <option>2 Months</option>
                            <option>Quarterly</option>
                            <option>Half Yearly</option>
                            <option>Yearly</option>
                        </Input >
                        </td>
                    </tr>
                   
                )
            })
        }
    }

    render() {

        let radioData = <div>
            <Label style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}><input className="ml-2"
                id="activated"
                type="radio"
                name="activated"
                onChange={this.activatedChange}
                value='activated'
                checked={this.state.type === 'activated' ? true : false}
            />{' '}In Use</Label>

            <Label style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}><input className="ml-2"
                id="deActivated"
                type="radio"
                name="deactivated"
                onChange={this.activatedChange}
                checked={this.state.type === 'deactivated' ? true : false}
                value='deactivated'
            />{' '}Not In Use</Label>

            {/* <Label style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}><input className="ml-2"
                id="all"
                type="radio"
                name="all"
                onChange={this.activatedChange}
                value='all'
                checked={this.state.type === 'all' ? true : false}
            />{' '}All</Label> */}
        </div>
          let table= <div>
            {this.state.type === 'deactivated' ?<div> <Table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Facility Name</th>
                            <th>Rate/Type</th>
                            <th>Duration</th>
                        </tr>

                    </thead>

                    <tbody>
                        {this.getUserData(this.props.userFacilityReducer)}
                    </tbody>
                    <FormGroup>
                    <td><Button color="success" onClick={this.submitFacilityData.bind(this, this.state.facilities)}>Submit</Button></td>
                    </FormGroup>

                </Table> </div> : <div> <Table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Facility Name</th>
                                <th>Rate/Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>

                        </thead>

                        <tbody>
                            {this.getActivatedData(this.props.userFacilityReducer)}
                        </tbody>

                        <FormGroup>
                        <td><Button color="success" onClick={this.inUseSubmit.bind(this, this.state.facilitiesUser)}>Submit</Button></td>
                        </FormGroup>
                    </Table></div>}
                    </div>
        

        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Owner Facility</h3>
                        {radioData}
                        {!this.state.loading ? table : <Spinner />}

                   </div>
                </UI>
            </div>
        )
    }
}

function mapStatToProps(state) {

    return {

        userFacilityReducer: state.userFacilityReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ notInFacility, addUserFacility, getUserFacility, updateUserFacility }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(OwnerFacility);