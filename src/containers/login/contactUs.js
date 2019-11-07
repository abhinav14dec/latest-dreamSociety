import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { connect } from 'react-redux';
import { login } from '../../actions/loginAction';
import { contactUsPost } from '../../actions/contactUsAction';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Button, Label, Form } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import UI from '../../components/newUI/loginDashboard';
import Spinner from '../../components/spinner/spinner';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', message: '', menuVisible: false, editUserModal: false, loading: false, email: '', name: '', messageEmail: '', messageErr:'',messageColor:'' };
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

    submitForm = (e) => {
        this.setState({
            loading: true
        })
        e.preventDefault();
        const { email, name, messageEmail } = this.state;

        if (email === '' || name === '' || messageEmail === '') {
            this.setState({messageErr: 'All fields are mandatory', messageColor: 'text-danger'});
        }

        if (email !== '' && name !== '' && messageEmail !== '') {
            this.props.contactUsPost(email, name, messageEmail)
                .then(res => { 
                    this.setState({
                        messageErr: res.payload.message,
                        messageColor: 'text-success',
                        email: '',
                        name: '',
                        messageEmail: ''
                    })
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

    onChangeContactUs = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value, messageErr: '' });
        console.log(name, '--->', this.state[name]);
    }

    resetForm = () => {
        this.setState({ name: '', email: '', messageEmail: '' });
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
                    <div id="contactUs">
                        <Form className="contactUsForm">
                            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Contact Us</h3>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" name="email" placeholder="Email" onChange={this.onChangeContactUs} value={this.state.email} required></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input type="text" name="name" placeholder="Name" onChange={this.onChangeContactUs} value={this.state.name} required></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Message</Label>
                                <Input type="textarea" name="messageEmail" placeholder="Message" onChange={this.onChangeContactUs} value={this.state.messageEmail} required></Input>
                            </FormGroup>
                            <span className={this.state.messageColor}>{this.state.messageErr}</span>
                            <br /><br />
                            <Button color="success" className="mr-2" onClick={this.submitForm}>Submit</Button>
                            <Button color="danger" onClick={this.resetForm}>Reset</Button>
                        </Form>
                    </div>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginReducer: state.loginReducer,
        contactUsReducer: state.contactUsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login, contactUsPost }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(ContactUs));