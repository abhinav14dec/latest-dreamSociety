import React, { Component } from 'react';
import { getUsers, getRoles, addUser, updateUser, deleteUser, deleteSelectedUsers } from '../../actions/superAdminMasterAction';
import { bindActionCreators } from 'redux';
import { viewTower } from '../../actions/towerMasterAction';
import { connect } from 'react-redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Table, Button, Label } from 'reactstrap';
import '../../r-css/w3.css';
import EditUserModal from './editUserModal';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class userDetails extends Component {
    constructor(props){
            super(props);
            this.state = {
                userId: "",
                ids: [],
                roleName: "",
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                towerName:"",
                towerId:"",
                contact: "",
                errors:{},
                isDisabled: true,
                isActive: false,
                editUserModal: false,
                loading:true,
                dropdownOpen: false,
                emailValidError:'',
                search:'',
                filterName:'firstName',
                modalLoading: false,
                emailServerError:'',
                userNameServerError:'',
                contactServerError:''
        }
        this.OnKeyPresshandlerPhone = this.OnKeyPresshandlerPhone.bind(this);
        this.OnKeyPressUserhandler = this.OnKeyPressUserhandler.bind(this);
        this.emailValid = this.emailValid.bind(this);
    }


    componentDidMount() {
        this.refreshData();
    }
    componentWillMount(){
        window.scrollTo(0, 0);
    }

    toggle() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
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

    emailValid(event) {
        const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    refreshData() {
        this.props.getUsers().then(() => this.setState({loading:false}));
        this.props.getRoles().then(() => this.setState({loading:false}));
        this.props.viewTower().then(() => this.setState({loading:false}));
    }

    toggleEditUserModal() {
        this.setState({
            errors:{},
            editUserModal: !this.state.editUserModal,
            emailServerError:'',
            userNameServerError:'',
            contactServerError:''
        });
    }

    parkingAndFloorKeyPress(event){
        const pattern = /^[a-zA-Z0-9 ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    refreshDataAfterUpdate = () => {
        this.props.getUsers()
        .then(() => this.setState({editUserModal: false, modalLoading: false}))
    }

    updateUser = (e) => {
            this.setState({message: '', emailServerError:'', userNameServerError:'', contactServerError:''})
            e.preventDefault();
            let { userId, roleName, firstName, lastName, userName, email,towerName, floor, contact,towerId } = this.state;
            let errors = {};
            if(!this.state.towerName){
                errors.towerName = "Tower can't be empty. Please select."
            }

            if (firstName === '') errors.firstName = "First Name can't be empty.";

            if (lastName === '') errors.lastName = "Last Name can't be empty.";

            if (userName === '') errors.userName = "User Name can't be empty.";
            if (email === '') errors.email = "Email can't be empty.";
            if (contact === '') errors.contact = "Contact can't be empty.";
            else if(contact.length !== 10) errors.contact = "Contact length should be of 10."
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0;
            if (isValid && this.state.emailValidError==='') {
                this.props.updateUser(userId, roleName, firstName, lastName, userName, email,towerName, contact,towerId)
                .then(() => {
                    this.refreshDataAfterUpdate()
                })
                .catch(err => { 
                    console.log(err.response.data);
                    this.setState({emailServerError: err.response.data.messageEmailErr, userNameServerError:err.response.data.messageUsernameErr,
                    contactServerError: err.response.data.messageContactErr, modalLoading: false})})
                this.setState({
                    modalLoading:true,errors:{}, emailServerError: '', userNameServerError:'', contactServerError:''
                });
            }
    }

    editUser(userId, roleName, firstName, lastName, userName, email,towerId, contact, towerName) {
        this.setState({
             userId, roleName, firstName, lastName, userName, email,towerId, contact , towerName, editUserModal: !this.state.editUserModal
        });
        console.log(towerName);
    }

    deleteUser(userId) {
        this.setState({loading:true, isDisabled:true})
        let { isActive } = this.state;
        this.props.deleteUser(userId, isActive)
        .then(() => this.refreshData())
        .then(() => this.setState({isActive: false}))
    }

    deleteSelected(ids){
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedUsers(ids)
        
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

    searchFilter(search){
        return function(x){
                return x.roles.map((i) => i.roleName).toString().toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                (x.firstName + ' ' + x.lastName).toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                x.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                !search;
        }
    }

    fetchTowers({tower}) {
        if(tower){
            console.log(tower)
            return (
                tower.tower.map((item) => {
                    if(item){
                        return (
                            <option value={item.towerId} key={item.towerId}>
                                {item.towerName}
                            </option>
                        )
                    }
                })
            )
        }
    }


    fetchUsers({ user }) {
        if(user) {
            console.log(user)
            let currentRole;
            return user.sort((item1,item2)=>{
                if(item1 && item2){
                    console.log(item1, item2)
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                if(item && item.tower_master){
                    console.log(item.tower_master.towerName)
                    let currentTower = item.tower_master.towerName;
                    let currentTowerId = item.towerId
                    return (
                        <tr key={item.userId}>
                            <td><input type="checkbox" name="ids" className="SelectAll" value={item.userId}
                             onChange={(e) => {
                                const {userId} = item
                                if(!e.target.checked){
                                    document.getElementById('allSelect').checked=false;
                                    let indexOfId = this.state.ids.indexOf(userId);
                                    if(indexOfId > -1){
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if(this.state.ids.length === 0){
                                        this.setState({isDisabled: true});
                                    }
                                }
                                else {
                                    this.setState({ids: [...this.state.ids, userId]});
                                    if(this.state.ids.length >= 0){
                                        this.setState({isDisabled: false})
                                    }
                                }
                                    
                                 }}/></td>
                            <td>{index + 1}</td>
                            <td>{item.roles.map((i) => {
                                if(i){
                                    currentRole = i.roleName
                                    return currentRole
                                }
                            }).join(' , ')}</td>
                            <td>{item.firstName}{`  `}{item.lastName} </td>
                            <td>{item.userName}</td>
                            <td>{item.email}</td>
                            <td>{currentTower}</td>
                            <td>{item.contact}</td>
                            <td>
                                <div>
                                <Button color="success" className="mr-2" onClick={this.editUser.bind(this, item.userId, currentRole, item.firstName, item.lastName, item.userName, item.email,
                                    currentTowerId, item.contact, currentTower)}>Edit</Button>
                                <Button color="danger" onClick={this.deleteUser.bind(this, item.userId)} >Delete</Button>
                                </div>
                            </td>
                        </tr>
                    )
                }
                
                
            })
        }
    }

    onChange = (e) => {
        this.setState({userNameServerError: '', contactServerError:''})
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors });
            console.log(this.state);
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim() });
            console.log(this.state);
        }
    }

    fetchRoles({ userRole }) {
        if(userRole) {
            console.log(userRole)
            return (
               userRole.map((item) => {
                    return (
                        <option value={item.roleId} key={item.id}>
                            {item.roleName}
                        </option>
                    )
                })
            )
        }
    }

    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/registration')
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    windowScroll = () => {
        let x = document.getElementById('sidebar');
        x.style.position = 'fixed';
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar =[];
            for(var i = 0; i < selectMultiple.length; i++){
                    ar.push(parseInt(selectMultiple[i].value));
                    selectMultiple[i].checked = true;
            }
            this.setState({ids: ar});
            if(ar.length > 0){
                this.setState({isDisabled: false});
            }
    }

    unSelectAll = () =>{
        
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for(var i = 0; i < unSelectMultiple.length; i++){
                unSelectMultiple[i].checked = false
        }
        
        this.setState({ids: [ ...allIds]});
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
        
    }

    emailChange = (e) => {
        console.log(this.state.email)
        this.setState({email:e.target.value, emailServerError:''})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            console.log(this.state.email)
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    render() {

        let tableData;
        tableData = <Table className="table table-bordered">

            <thead>
                <tr>
                    <th></th>
                    <th>#</th>
                    <th>Roles</th>
                    <th style={{cursor:'pointer'}} onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'firstName'}});
                        }}>Name<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Tower Name</th>
                    <th>Contact No.</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.fetchUsers(this.props.userDetail)}
            </tbody>
        </Table>

        let deleteSelectedButton = <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>

        let modalData = <EditUserModal isOpen={this.state.editUserModal}
                                toggle={this.toggleEditUserModal.bind(this)}
                                // roleNameValue = {this.state.roleName}
                                // roleInputName = "roleName"
                                // roleNameChange = {this.onChange}
                                // selectedRoleNameValue = {this.state.roleName}
                                // selectedRoleName = {this.state.roleName}
                                // fetchRoles = {this.fetchRoles(this.props.userDetail)}
                                firstNameInputName="firstName"
                                firstNameValue = {this.state.firstName}
                                firstNameValueChange = {this.onChange}
                                lastNameInputName = "lastName"
                                lastNameValue = {this.state.lastName}
                                firstNameError = {this.state.errors.firstName}
                                NameKeyPress = {this.OnKeyPressUserhandler}
                                lastNameValueChange = {this.onChange}
                                lastNameError = {this.state.errors.lastName}
                                userNameInputName = "userName"
                                userNameValue = {this.state.userName}
                                userNameServerError={this.state.userNameServerError}
                                userNameValueChange = {this.onChange}
                                userNameError = {this.state.errors.userName}
                                emailInputName= "email"
                                emailServerError={this.state.emailServerError}
                                emailValue = {this.state.email}
                                emailError = {this.state.errors.email}
                                emailKeyPress={this.emailValid}
                                emailValueChange = {this.emailChange}
                                towerInputName = "towerId"
                                fetchingTower={this.fetchTowers(this.props.TowerDetails)}
                                towerValue={this.state.towerId}
                                towerChange={this.onChange}
                                contactInputName = "contact"
                                contactValue = {this.state.contact}
                                contactServerError={this.state.contactServerError}
                                contactError = {this.state.errors.contact}
                                contactValidation = {this.OnKeyPresshandlerPhone}
                                contactValueChange = {this.onChange}
                                updateUserClick={this.updateUser}
                                inValidEmailFormatError={this.state.emailValidError}
                                modalLoading={this.state.modalLoading}
                                 />

        return (

            <div>
                <UI onClick={this.logout}  change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>

                            <div className="top-details">
                                <h3>User Master Details</h3>
                                <Button color="primary" onClick={this.routeToAddNewUser} color="primary">Add Users</Button>
                            </div>
                            {modalData}
                            

                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                                {deleteSelectedButton}
                                <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input className="ml-2"
                                id="allSelect"
                                type="checkbox" onChange={(e) => {
                                        if(e.target.checked) {
                                            this.selectAll();
                                        }
                                        else if(!e.target.checked){
                                            this.unSelectAll();
                                        } 
                                    }  
                                }/></Label>
                            {!this.state.loading ? tableData : <Spinner />}
                        </div>
                        </UI>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail,
        TowerDetails: state.TowerDetails
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers,
        getRoles,
        addUser,
        updateUser,
        viewTower,
        deleteUser,
        deleteSelectedUsers
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(userDetails)