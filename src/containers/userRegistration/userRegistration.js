import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addUser, getRoles } from '../../actions/superAdminMasterAction';
import { viewTower } from '../../actions/towerMasterAction';
import { withRouter } from 'react-router-dom';
import { Form } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import '../../r-css/w3.css';
import UserRegistrationForm from './userRegistrationForm';
import UI from '../../components/newUI/superAdminDashboard';


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: "",
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            towerId: "",
            contact: "",
            password: "",
            passwordConfirmation: "",
            isSubmit: false,
            menuVisible: false,
            emailServerError:'',
            userNameServerError:'',
            contactServerError:'',
            loading: true,
            emailValidError:'',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.OnKeyPresshandlerPhone = this.OnKeyPresshandlerPhone.bind(this);
        this.OnKeyPressUserhandler = this.OnKeyPressUserhandler.bind(this);
    }
    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    componentDidMount() {
        this.renderRoles()
        this.renderTower()
    }

    renderRoles(){
        this.props.getRoles().then(() => this.setState({loading:false}));
    }

    renderTower(){
        this.props.viewTower().then(() => this.setState({loading:false}))
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    parkingAndFloorKeyPress(event){
        const pattern = /^[a-zA-Z0-9 ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    

    emailValid(event){
        const pattern = /^[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    emailChange = (e) => {
        if(e.target.value !== ''){
            this.state.errors.email === '';
        }
        console.log(this.state.email)
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            console.log(this.state.email)
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        
    }


    submit(e) {
        this.setState({message:''})
        e.preventDefault();
        let errors = {};
        if (!this.state.roles) {
            errors.roles = "User type can't be empty. Please select."
        }
        
        if(!this.state.towerId){
            errors.towerId = "Tower can't be empty. Please select."
        }

        if (this.state.firstName === '') errors.firstName = "First Name can't be empty.";
        else if (this.state.firstName.length < 2) errors.firstName = "First name can't be less than four."
        if (this.state.lastName === '') errors.lastName = "Last name can't be empty";
        else if (this.state.lastName.length < 2) errors.lastName = "Last name can't be less than two.";
        if (this.state.userName === '') errors.userName = "User Name can't be empty.";
        if (this.state.email === '') errors.email = "Email can't be empty.";
        if (this.state.contact === '') errors.contact = "Contact can't be empty.";
        else if(this.state.contact.length !== 10) errors.contact = "Contact length should be of 10."
        if (this.state.password === '') errors.password = "Password can't be empty.";
        else if (this.state.password !== this.state.passwordConfirmation) errors.passwordConfirmation = `Password doesn't match.`

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        // const isValid = this.validate();
        if (isValid && this.state.emailValidError==='') {
            this.setState({loading: true, userName: this.state.userName.toLowerCase()})
            this.props.addUser(this.state).then(() =>{
                    this.props.history.push('/superDashboard/user_details')
                }
                    
            )
            .catch(err => {
                console.log(err.response.data);
                this.setState({emailServerError: err.response.data.messageEmailErr, userNameServerError:err.response.data.messageUsernameErr,
                    contactServerError: err.response.data.messageContactErr, loading: false})
            });
        }
    }

    onChange(e) {
        console.log(this.state)
            this.setState({
                emailServerError:'',
                userNameServerError:'',
                contactServerError:''
            })
        
        
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    fetchRoles({ userRole }) {
        if (userRole) {
            return (
                userRole.map((item) => {
                    return (
                        <option value={item.roleName} key={item.id}>
                            {item.roleName}
                        </option>
                    )
                })
            )
        }
    }

    fetchTowers({tower}){
        if(tower){
            return (
                tower.tower.map((item) => {
                    return (
                        <option value={item.towerId} key={item.towerId}>
                            {item.towerName}
                        </option>
                    )
                })
            )
        }
    }

    routeToUserDetails = () => {
        this.props.history.push('/superDashboard/user_details');
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard');
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    render() {
        let formData;

            formData = <UserRegistrationForm 
                roleInputName="roles"
                roleChange={this.onChange}
                fetchingRole={this.fetchRoles(this.props.userDetail)}
                roleError = {this.state.errors.roles}
                firstNameInputName="firstName"
                firstNameValue={this.state.firstName}
                firstNameChange = {this.onChange}
                NameKeyPress={this.OnKeyPressUserhandler}
                firstNameError={this.state.errors.firstName}
                lastNameInputName="lastName"
                lastNameValue={this.state.lastName}
                lastNameChange = {this.onChange}
                lastNameError={this.state.errors.lastName}
                userNameInputName ="userName"
                userNameValue={this.state.userName}
                userNameChange={this.onChange}
                userNameError = {this.state.errors.userName}
                emailInputName="email"
                emailValue={this.state.email}
                emailChange={this.emailChange}
                emailError={this.state.errors.email}
                emailKeyPress={this.emailValid}
                contactInputName="contact"
                contactValue={this.state.contact}
                contactChange={this.onChange}
                contactError={this.state.contactError}
                towerInputName = "towerId"
                fetchingTower={this.fetchTowers(this.props.TowerDetails)}
                towerValue={this.state.towerId}
                towerChange={this.onChange}
                towerError={this.state.errors.towerId}
                contactError={this.state.errors.contact}
                contactKeyPress={this.OnKeyPresshandlerPhone}
                passwordInputName="password"
                passwordValue={this.state.password}
                passwordChange={this.onChange}
                passwordError={this.state.errors.password}
                passwordConfirmationInputName="passwordConfirmation"
                passwordConfirmationValue={this.state.passwordConfirmation}
                passwordConfirmationChange={this.onChange}
                passwordConfirmationError={this.state.errors.passwordConfirmation}
                routeToUserDetails={this.routeToUserDetails}
                emailServerValidationError={this.state.emailServerError}
                userNameServerValidationError={this.state.userNameServerError}
                contactServerValidationError={this.state.contactServerError}
                
                emailKeyPress={this.emailValid}
                InValidEmailFormatError={this.state.emailValidError}
                />
        
        return (
        <div>
            <UI onClick={this.logout} change={this.changePassword}>
                <div>
                    <Form onSubmit={this.submit} method="POST">
                    <div>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>

                        <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add User</h3></div>
                        {!this.state.loading ? formData: <Spinner />}
                    </div>
                    </Form>
                </div>
            </UI>
        </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        userDetail: state.userDetail,
        TowerDetails: state.TowerDetails
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addUser, getRoles, viewTower }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));

