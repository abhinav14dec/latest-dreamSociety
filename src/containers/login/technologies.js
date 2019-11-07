import React, { Component } from 'react';
import $ from 'jquery';
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

class Technologies extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', message: '', menuVisible: false, editUserModal: false, loading: false, backside: '' };
        this.toggleEditUserModal = this.toggleEditUserModal.bind(this);
        this.editUser = this.editUser.bind(this);

    }

    componentDidMount() {
        $('.iconBgSquare').map((index,item)=>{
            $(item).hover(() => {
                $(item).addClass("transform");
                setTimeout(() => {
                    this.setState({ backside: index });
                }, 1000);
            }, () => {
                $(item).removeClass("transform");
                setTimeout(() => {
                    this.setState({ backside: '' });
                }, 1000);
            }) 
        })
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

    onIconHover = id => {
        if (id === 0) {
            setTimeout(() => {
                if (this.state.backside === 'react') {
                    this.setState({ backside: '' });
                } else {
                    this.setState({ backside: 'react' });
                }
            }, 500);
        }
    }

    onIconHoverEnd = () => {
        this.setState({ backside: '' });
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
                    <div id="technologies" className="d-flex flex-wrap justify-content-around p-5">
                        <div className="iconBgSquare d-flex justify-content-center align-items-center text-center">{(this.state.backside === 0) ? <span class="react iconLabel">React</span> : <span class="fi fi-react react"></span>}</div>
                        <div className="iconBgSquare d-flex justify-content-center align-items-center text-center">{(this.state.backside === 1) ? <span class="html5 iconLabel">HTML5</span> : <span class="fi fi-html5 html5"></span>}</div>
                        <div className="iconBgSquare d-flex justify-content-center align-items-center text-center" onMouseOverCapture={this.onIconHover}>{(this.state.backside === 2) ? <span class="css3 iconLabel">CSS3</span> : <span class="fi fi-css3 css3"></span>}</div>
                        <div className="iconBgSquare d-flex justify-content-center align-items-center text-center" onMouseOverCapture={this.onIconHover}>{(this.state.backside === 3) ? <span class="node iconLabel">Nodejs</span> : <span class="fi fi-nodejs node"></span>}</div>
                        <div className="iconBgSquare d-flex justify-content-center align-items-center text-center" onMouseOverCapture={this.onIconHover}>{(this.state.backside === 4) ? <span class="redux iconLabel">Redux</span> : <span class="fi fi-redux redux"></span>}</div>
                        <div className="iconBgSquare d-flex justify-content-center align-items-center text-center" onMouseOverCapture={this.onIconHover}>{(this.state.backside === 5) ? <span class="mysql iconLabel">Mysql</span> : <span class="fi fi-mysql mysql"></span>}</div>
                        <div className="iconBgSquare d-flex justify-content-center align-items-center text-center" onMouseOverCapture={this.onIconHover}>{(this.state.backside === 6) ? <span class="aws iconLabelAWS">Amazon Web Services</span> : <span class="fi fi-aws aws"></span>}</div>
                        <div className="iconBgSquare d-flex justify-content-center align-items-center text-center" onMouseOverCapture={this.onIconHover}>{(this.state.backside === 7) ? <span class="git iconLabel">Git</span> : <span class="fi fi-git git"></span>}</div>
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

export default (connect(mapStateToProps, mapDispatchToProps)(Technologies));