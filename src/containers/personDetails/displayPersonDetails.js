import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DefaultSelect from '../../constants/defaultSelect'

import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { viewPerson, getFlat, getTower, getRoles, updatePerson, deletePerson, deleteMultiplePerson } from '../../actions/personDetailsMasterAction';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';

import Spinner from '../../components/spinner/spinner';
class displayPersonDetails extends Component {


        constructor(props) {
                super(props)
                this.state = {
                        editPersonData: {

                                isActive: false
                        },
                        editPersonModal: false,
                        loading: true,
                        search: '',
                        ids: [],
                        isDisabled: true,
                        userName: '',
                        email: '',

                        towerId: [],
                        roleName: '',
                        flatDetailId: '',
                        roles: [],
                        id: '',
                        roleId: '',
                        familyMember: '',
                        parking: '',
                        errors: {},
                        filterName: "userName",
                        usernameMessage: '',
                        emailMessage:'',
                        modalLoading: false
                }
        }
        componentDidMount() {
                this.refreshData()

        }

        onChange = (e) => {
                this.setState({ usernameMessage: '',emailMessage:'' })
                if (!!this.state.errors[e.target.name]) {
                        let errors = Object.assign({}, this.state.errors)
                        delete errors[e.target.name]
                        this.setState({ [e.target.name]: e.target.value, errors });
                }
                else {
                        this.setState({ [e.target.name]: e.target.value });
                }
        }

        OnKeyPresshandler(event) {
                const pattern = /[a-zA-Z _]/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                        event.preventDefault();
                }
        }


        OnKeyPressmail(event) {
                const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                        event.preventDefault();
                }
        }


        OnKeyPressNumber(event) {
                const pattern = /^[0-9]$/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                        event.preventDefault();
                }
        }


        getRole({ roles }) {
                console.log(roles, 'sdfasfsdf')
                if (roles) {
                        return (
                                roles.map((item) => {
                                        return (
                                                <option key={item.id} value={item.roleName}>{item.roleName} </option>
                                        )
                                })
                        )
                }

        }
        refreshData() {

                this.props.viewPerson().then(() => this.setState({ loading: false, modalLoading: false, editPersonModal: false }));
                this.props.getTower().then(() => this.setState({ loading: false }));
                this.props.getRoles().then(() => this.setState({ loading: false }));

        }
        toggleEditPersonModal() {

                this.setState({
                        editPersonModal: !this.state.editPersonModal, message: ''
                })
        }
        editPerson(userId, userName, roleName, email, towerId, id, roles, flatDetailId) {
                console.log('i m in edit ', userName, email, towerId, id, roles);
                this.setState({
                        userId, userName, email, towerId, id,  roleName, flatDetailId,
                        editPersonModal: !this.state.editPersonModal
                })
        }
        // loadingInactive = () => {
        //         this.setState({modalLoading: false,editPersonModal: !this.state.editPersonModal})
        //     }
       
        updatePerson = () => {
                let errors = {};

              
                let { userId, userName, email, towerId, roleName} = this.state
                if (!this.state.userName) {
                        errors.userName = "  Username can't be empty. Please select."
                }
                if (!this.state.email) {
                        errors.email = "  Email can't be empty. Please select."
                }
                if (!this.state.towerId) {
                        errors.towerId = "  Tower Name can't be empty. Please select."
                }
                
                if (!this.state.roleName) {
                        errors.roleName = " Roles can't be empty. Please select."
                }
               
                
                this.setState({ errors });
                const isValid = Object.keys(errors).length === 0
                if (isValid) {

                        this.setState({modalLoading:true})
                        this.props.updatePerson(userId, userName, email, towerId, roleName).then(() =>  this.refreshData()).catch(err => {
                                console.log(err.response)
                                this.setState({
                                        modalLoading: false,
                                        emailMessage: err.response.data.messageEmailErr, usernameMessage: err.response.data.messageUsernameErr
                                })
                        })


                        if (this.state.usernameMessage === ''&& this.state.emailMessage==='') {
                                this.setState({ editPersonModal: true })
                        }
                        else {
                                this.setState({ editPersonModal: false })
                        }


                        this.setState({
                                 modalLoading: true
                        })
                }
        }







        deletePerson(userId) {
                this.setState({ loading: true })

                let { isActive } = this.state.editPersonData;

                this.props.deletePerson(userId, isActive).then(() => { this.refreshData() })

                this.setState({ editPersonData: { isActive: false } })

        }
        searchFilter(search) {
                return function (x) {
                        return x.userName.toLowerCase().includes(search.toLowerCase()) || !search;
                }
        }

        searchOnChange = (e) => {
                this.setState({ search: e.target.value })
        }

        getTower({ get }) {
                console.log('abcd', get)
                if (get) {
                        return (
                                get.map((item) => {
                                        return (

                                                <option key={item.towerId} value={item.towerId}> {item.towerName} </option>
                                        )
                                })
                        )
                }
        }
        person({ person1 }) {
                console.log(person1);

                if (person1) {
                        console.log("xyz", person1)
                        let currentRole;
                        return (
                                person1.sort((item1, item2) => {
                                        var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                                        return this.state.sortVal ? cmprVal : -cmprVal
                                }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                                        console.log(item.roles, "ancdd")

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
                                                        <td>{item.userName}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.tower_master?item.tower_master.towerName:''}</td>

                                                        <td>{item.roles?item.roles.map((i) => {
                                                                currentRole = i.roleName
                                                                return currentRole
                                                        }):''}</td>
                                                        {/* <td>{item.flatName}</td> */}
                                                   
                                                      

                                                        <td>

                                                                <button className="btn btn-success mr-2" onClick={this.editPerson.bind(this, item.userId, item.userName, currentRole, item.email, item.towerId, item.flatDetailId, item.roles, item.familyMember)}> Edit</button>

                                                                <button className="btn btn-danger" onClick={this.deletePerson.bind(this, item.userId)}>Delete</button>
                                                        </td>
                                                </tr>

                                        )
                                })
                        )
                }
        }
        Addperson = () => {
                this.props.history.push('/superDashboard/persondetails')
        }
        logout = () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user-type');
                return this.props.history.replace('/')
        }
        changePassword=()=>{ 
                return this.props.history.replace('/superDashboard/changePassword')
             }
        
        close = () => {
                return this.props.history.replace('/superDashBoard')
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
                let allIds = []
                let unSelectMultiple = document.getElementsByClassName('SelectAll');
                for (var i = 0; i < unSelectMultiple.length; i++) {
                        unSelectMultiple[i].checked = false
                }

                this.setState({ ids: [...allIds] });
                if (allIds.length === 0) {
                        this.setState({ isDisabled: true });
                }
        }


        deleteSelected(ids){
                this.setState({loading:true,
                isDisabled:true});
                this.props.deleteMultiplePerson(ids)
                .then(() => this.refreshData())
                .catch(err => err.response.data.message);
            }

        render() {
                let tableData;
                tableData = <Table className="table table-bordered">
                        <thead>
                                <tr>
                                        <th style={{ width: '4px' }}></th>
                                        <th>#</th>
                                        <th onClick={() => { this.setState((state) => { return { sortVal: !state.sortVal, filterName: "userName" } }) }}>userName
        <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                                        <th>Email</th>
                                        <th>Tower Name </th>
                                        <th>Roles</th>
                                     
                                        
                                        <th> Actions  </th>
                                </tr>
                        </thead>
                        <tbody>

                                {this.person(this.props.personDetails)}

                        </tbody>
                </Table>


   let modalData =<div>
<FormGroup>
<Label>User Name</Label>
<Input type="text" name="userName" value={this.state.userName} onChange={this.onChange}
        maxLength={30} required
/>
<span className="error"> {this.state.errors.userName}</span>
<span className="error">{this.state.usernameMessage}</span>
</FormGroup>
<FormGroup>             
<Label> Email</Label>
<Input type="text" name="email" value={this.state.email} onChange={this.onChange}

        onKeyPress={this.OnKeyPressmail} maxLength={40} required
/>
<span className="error"> {this.state.errors.email}</span>
<span className="error">{this.state.emailMessage}</span>

</FormGroup>

<FormGroup>
<Label> Tower Name</Label>
<Input type="select" id="towerId" value={this.state.towerId} onChange={this.onChange}

>

        <DefaultSelect />
        {this.getTower(this.props.personDetails)}
</Input>
</FormGroup>



<FormGroup>
<Label> Roles</Label>

<Input type="select" value={this.state.roleName} onChange={this.onChange}



>
        <option      >{this.state.roleName}</option>
        <DefaultSelect />
        {this.getRole(this.props.personDetails)}

</Input>
</FormGroup>



</div>
                let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
                        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
                return (
                        <div>
                                <UI onClick={this.logout} change={this.changePassword}>
                                        <div className="w3-container w3-margin-top w3-responsive">
                                                <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                                                        <span aria-hidden="true">&times;</span>
                                                </div>

                                                <Modal isOpen={this.state.editPersonModal} toggle={this.toggleEditPersonModal.bind(this)}>
                                                        <ModalHeader toggle={this.toggleEditPersonModal.bind(this)}>Edit  Person Details</ModalHeader>
                                                        <ModalBody>

                                                        {!this.state.modalLoading ? modalData : <Spinner/>}

                                                                <Button color="primary" onClick={this.updatePerson} className="mr-2" >Save</Button>
                                                                <Button color="danger" onClick={this.toggleEditPersonModal.bind(this)}>Cancel</Button>
                                                        </ModalBody>
                                                </Modal>
                                                <div className="top-details" >
                                                        <h3 align="center"> Person Details</h3>
                                                        <button className="btn btn-primary" onClick={this.Addperson}> Add person</button>
                                                </div>
                                                <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />


                                                {deleteSelectedButton}
                                                <label><b> Select All</b><input
                                                        type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                                                                if (e.target.checked) {
                                                                        this.selectAll();
                                                                }
                                                                else if (!e.target.checked) {
                                                                        this.unSelectAll();
                                                                }
                                                        }
                                                        } /></label>
                                                {!this.state.loading ? tableData : <Spinner />}

                                        </div>
                                </UI>

                        </div>


                )
        }


}


function mapStateToProps(state) {

        console.log(state, "state")
        return {
                personDetails: state.personDetails,
                role: state.role
        }

}

function mapDispatchToProps(dispatch) {
        return bindActionCreators({ viewPerson, getFlat, getRoles, getTower, updatePerson, deletePerson, deleteMultiplePerson }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(displayPersonDetails)