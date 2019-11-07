import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { connect } from 'react-redux';
import { login } from '../../actions/loginAction';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Button, Label, } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import UI from '../../components/newUI/loginDashboard';
import Spinner from '../../components/spinner/spinner';

class Features extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', message: '', menuVisible: false, editUserModal: false, loading: false, };
        this.toggleEditUserModal = this.toggleEditUserModal.bind(this);
        this.editUser = this.editUser.bind(this);

    }
    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    editUser() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    submit = (e) => {
        this.setState({
            loading: true
        })
        e.preventDefault();
        const { username, password } = this.state
        if (username !== null && password !== null) {
            this.props.login(username, password)
                .then((loginData) => {
                    if (loginData.payload.data.status === 200) {
                        this.setState({
                            message: loginData.payload.data.message
                        })
                        localStorage.setItem('token', loginData.payload.data.accessToken);
                        localStorage.setItem('user-type', loginData.payload.data.userType);
                        localStorage.setItem('firstName', loginData.payload.data.user.firstName);
                        localStorage.setItem('societyId', loginData.payload.data.society.societyId);
                        localStorage.setItem('societyName', loginData.payload.data.society.societyName)
                        localStorage.setItem('countryName', loginData.payload.data.society.country_master.countryName)
                        localStorage.setItem('stateName', loginData.payload.data.society.state_master.stateName)
                        localStorage.setItem('cityName', loginData.payload.data.society.city_master.cityName)
                        localStorage.setItem('locationName', loginData.payload.data.society.location_master.locationName)
                        localStorage.setItem('userId', loginData.payload.data.user.userId)
                        localStorage.setItem('role', loginData.payload.data.user.roles[0].roleName)
                        console.log(loginData.payload.data.user.roles[0].roleName)
                        console.log(loginData.payload.data.society.country_master.countryName)
                        switch (loginData.payload.data.user.roles[0].roleName) {
                            case 'SUPER ADMIN':
                                return this.props.history.push('/superDashboard');
                            case 'ADMIN':
                                return this.props.history.push('/adminDashboard');
                            case 'SOCIETY MEMBER OWNER':
                                return this.props.history.push('/ownerDashboard');
                            case 'SOCIETY MEMBER TENANT':
                                return this.props.history.push('/tenantDashboard');
                            case 'VENDOR':
                                return this.props.history.push('/vendorDashboard');
                            case 'EMPLOYEE':
                                return this.props.history.push('/employeeDashboard')
                            default:
                                return null;
                        }
                    }
                    else if (loginData.payload.data.status === 401) {
                        this.setState({
                            loading: false,
                            message: loginData.payload.data.message
                        })
                    }
                })

        }
    }

    onChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (this.state.message.length > 0) {
            this.setState({
                message: ''
            })
        }
    }

    handleResponse = (response) => {
        if (response.payload.data.status === 200) {
            var data = {
                accessToken: response.payload.data.accessToken,
                userType: response.payload.data.user.roles[0].roleName,
                auth: response.payload.data.auth,
                status: response.payload.data.status,
                firstName: response.payload.data.user.firstName
            }
        }
        else if (response.payload.data.status === 401) {
            data = {
                error: response.data.message
            }
            return <Redirect to='/'></Redirect>
        }
        return data;

    }


    message = () => {
        if (this.state.message.length < 0) {
            this.setState({
                message: ''
            })
        }
        else {
            this.setState({
                message: ''
            })
        }
    }

    render() {
        let loginForm;
        loginForm =
            <div>
                <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>User Login</ModalHeader>
                <ModalBody>
                    <div style={{ 'color': 'red' }}>{this.state.message}</div>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input name="username" type="text" value={this.state.username} onChange={this.onChangeHandler}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input name="password" type="password" value={this.state.password} onChange={this.onChangeHandler}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={this.submit} color="primary" >Login</Button>{' '}
                    </FormGroup>
                    <a style={{ color: 'blue' }} href="/forgetPassword">Forget Password ?</a>
                    {/* <Link to ="/forgetPassword">Forget Password ?</Link> */}

                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </div>
        return (
            <div>
                <UI onClick={this.editUser}>
                    <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                        {!this.state.loading ? loginForm : <Spinner />}
                    </Modal>
                    <div id="aboutUs">
                        <div className="contentHead skyBlue"><h2>FEATURES</h2></div>
                        <div className="contentBox">
                            <p>Application is designed and developed to handle the various features of society. Software
                                for Apartment Management, Communication, Event Management(both personal and society events),
                                Owner & Tenant Management, Vendor Management, Parking Manager, Staff Attendance Tracker,
                                Visitors Tracking, Complaint Registration and Management, Accounting & Billing, User Management,etc.
                                This is a must-have Software Application for apartment which help all to come
together as a community.</p>
                            <br />
                            <h4>Services</h4>
                            <ul>
                                <li>Housing Society Management</li>
                                <li>Complete Apartment Accounting</li>
                                <li>Apartment Communication</li>
                                <li>Apartment Billing & Online Collection</li>
                                <li>HelpDesk & Facility Management</li>
                                <li>Visitor Management & Security</li>
                                <li>Private and Group Chat</li>
                            </ul>
                        </div>
                    </div>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginReducer: state.loginReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Features));