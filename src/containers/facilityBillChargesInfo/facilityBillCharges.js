import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Form } from 'reactstrap';
import UI from '../../components/newUI/ownerDashboard';
import TenantUI from "../../components/newUI/tenantDashboard";
import { getFacilityCharges } from '../../actions/facilityAction';
import Spinner from '../../components/spinner/spinner';





class FacilityBillGeneration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: {},
            message: '',
        }
    }

    componentDidMount() {
        this.props.getFacilityCharges().then(() => this.setState({ loading: false })).catch(() => this.setState({ loading: false }));
       
    }


    handleChange = (event) => {
        let towerId = event.target.value
        this.setState({ message: '' })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
        this.props.getMaintenanceBillInfo(towerId)
    }




    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }
    
              
    changePassword = () => {
        let path = this.props.location.pathname;
        switch (path) {
            case '/ownerDashboard/facilityBillGeneration':
                this.props.history.push('/ownerDashboard/changePasswordOwner')
                break;

            case '/tenantDashboard/facilityBillGeneration':
                this.props.history.push('/tenantDashboard/changePasswordTenant')
            // eslint-disable-next-line
            default:
        }

    }
    
               
    close = () => {
        let path = this.props.location.pathname;
        switch (path) {
            case '/ownerDashboard/facilityBillGeneration':
                this.props.history.push('/ownerDashboard')
                break;

            case '/tenantDashboard/facilityBillGeneration':
                this.props.history.push('/tenantDashboard')
            // eslint-disable-next-line
            default:
        }

    }

    renderFacility = ({ facilityCharges }) => {
        if (facilityCharges && facilityCharges.facilityCharges) {
            return facilityCharges.facilityCharges.map((item, index) => { 
                return (
                    <tr key={item.facilityChargesId}>
                        <td>{index + 1}</td>
                        <td>{item.facilities_details_master.facilities_master.facilityName}</td>
                        <td>{item.from}</td>
                        <td>{item.to}</td>
                        <td>{item.monthlyCharges ? `${item.monthlyCharges } INR` : ''}</td>
                    </tr>
                )
            })
        }
    }
    

    render() {
        let formData = <div>
    
            <div style={{ backgroundColor: 'lightgray' }}>
                <Table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Facility Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Monthly Charges</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderFacility(this.props.facilityReducer)}
                    </tbody>
                </Table>
            </div>
        </div>
        let displayData= <Form onSubmit={this.onSubmit} >

        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
            <span aria-hidden="true">&times;</span>
        </div>
        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Facility Bill Charges</h3></div><br />
        {!this.state.loading ? formData : <Spinner />}
    </Form>
        return (
            <div>
                {this.props.location.pathname==='/ownerDashboard/facilityBillGeneration' ?
                    <UI onClick={this.logout} change={this.changePassword}>
                        {displayData}
                    </UI> : <TenantUI onClick={this.logout} change={this.changePassword}>
                        {displayData}
                    </TenantUI>}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        facilityReducer: state.facilityReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getFacilityCharges}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FacilityBillGeneration);