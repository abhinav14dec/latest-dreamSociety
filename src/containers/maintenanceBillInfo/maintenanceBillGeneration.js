import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import { getMaintenanceBillInfo } from '../../actions/maintenanceBillAction';
import { viewTower } from '../../actions/towerMasterAction';
import Spinner from '../../components/spinner/spinner';





class MaintenanceBillGeneration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: {},
            message: '',
        }
    }

    componentDidMount() {
        this.props.viewTower().then(() => this.setState({ loading: false })).catch(() => this.setState({ loading: false }));
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



    towerData = ({ tower }) => {
        if (tower && tower.tower) {
            return tower.tower.map((data) => {
                return (
                    <option key={data.towerId} value={data.towerId}>
                        {data.towerName}
                    </option>
                )
            })
        }
    }


    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    
              
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }


    renderMaintenance = ({ getMaintenanceBill }) => {
        if (getMaintenanceBill && getMaintenanceBill.charges) {
            return getMaintenanceBill.charges.map((item, index) => {
                return (
                    <tr key={item.maintenanceChargesId}>
                        <td>{index + 1}</td>
                        <td>{item.maintenance_type_master.maintenance_master.category}</td>
                        <td>{item.to}</td>
                        <td>{item.from}</td>
                        <td>{item.flat_detail_master.floor_master.floorName}</td>
                        <td>{item.flat_detail_master.flatNo}</td>
                        <td>{item.rate ? `${item.rate} INR` : ''}</td>
                        <td>{item.superArea}</td>
                        <td>{item.charges ? `${item.charges} INR` : ''}</td>
                    </tr>
                )
            })
        }
    }

    render() {
        let formData = <div>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label>Tower</Label>
                        <Input type="select" name="towerId" defaultValue='no-value' onChange={this.handleChange}>
                            <DefaultSelect />
                            {this.towerData(this.props.TowerDetails)}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <div style={{ backgroundColor: 'lightgray' }}>
                <Table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Maintenance Type</th>
                            <th>To</th>
                            <th>From</th>
                            <th>Floor No</th>
                            <th>Flat No</th>
                            <th>Rate</th>
                            <th>Super Area</th>
                            <th>Monthly Charges</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderMaintenance(this.props.MaintenanceBillReducer)}
                    </tbody>
                </Table>
            </div>
        </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.onSubmit} >

                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Maintenance Bill Generation</h3></div><br />
                        {!this.state.loading ? formData : <Spinner />}
                    </Form>
                </UI>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        TowerDetails: state.TowerDetails,
        MaintenanceBillReducer: state.MaintenanceBillReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getMaintenanceBillInfo, viewTower }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceBillGeneration);