import React, {Component} from 'react';
import {viewMember, deleteTenantMember, deleteSelectedTenantMember,editTenantMember,
    addNewTenantDetail,rfid,validOnChangeContact,validOnChangeEmail,getFlats} from '../../actions/tenantMasterAction';
import { connect } from 'react-redux';
import UI from '../../components/newUI/superAdminDashboard';
import { getRelation } from './../../actions/relationMasterAction';
import Select from 'react-select';
import { FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { numberValidation, emailValid, fNameKeyPress } from '../../validation/validation';
import Spinner from '../../components/spinner/spinner';
import ModalBox from '../../components/modal/modal';

class TenantMemberDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            ids:[],
            isDisabled:true,
            addTenantMember:false,
            editTenantMember: false,
            firstName:'',
            memberId:'',
            Male:'Male',
            Female:'Female',
            Other:'Other',
            memberDob:'',
            gender:'',
            relationId:'',
            relationName:'',
            loading:true,
            tenenatId:'',
            loadingAfterAdd:false,
            loadingAfterEdit:false,
            errors:{},
            search:'',
            filterName:'firstName',
            rfid:'',
            rfidId:'',
            defaultRFID:true,
            editRFID:false,
            defRFID:'',
            aadhaarNumber:'',
            email:'',
            contact:'',
            emailChangeErr:'',
            validChangeContactErr:'',
            lastName:'',
            flatDetailId:'',
            successMessage:'',
            memberModal:false,
            flatNo:'',
            defaultFlat:true,
            editFlat:false,
            defFlat:''
        }
    }

    componentDidMount(){
        this.refreshData()
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    close = () => {
        return this.props.history.replace('/superDashBoard/');
    }

    refreshData = () => {
        let id  = localStorage.getItem('tenantId');
        this.setState({tenantId: id})
        this.props.viewMember(id).then(() => this.setState({loading: false})).catch((err) => {err;
            this.setState({loading: false})
        });
        console.log(id);
        this.props.getRelation()
        this.props.rfid()
        this.props.getFlats(id)
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    route = (e) => {
        e.preventDefault()
        return this.props.history.push('/superDashBoard/tenantDetails')
    }

    edit = (fmember, lmember, dob, gen, memEmail,memContact,memAadhaar, relationName, relationId, memberId, rfidId, rfid, flatId, flatNo) => {
        console.log(fmember, lmember, dob, gen, memEmail,memContact,memAadhaar, relationName, relationId, memberId, rfidId, rfid, flatId, flatNo)
        this.setState({firstName:fmember, lastName:lmember, memberDob:dob, gender:gen, email:memEmail, contact: memContact, aadhaarNumber: memAadhaar, relationName, relationId,memberId, rfidId, rfid,defRFID:rfidId,flatDetailId:flatId,defFlat:flatId,flatNo, editTenantMember: !this.state.editTenantMember})
    }

    getRelationList = ({ relationResult }) => {
        console.log(this.state)
        if (relationResult && relationResult.relation) {
            return relationResult.relation.map((item) => {
                return (
                    { ...item, name:"relation", label: item.relationName, value: item.relationId }
                )
            }
            );
        }
        return [];
    }

    searchFilter(search){
        return function(x){
            console.log(x)
            if(x){
                return  (x.firstName + ' ' + x.lastName).toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.memberDob.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.gender.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                x.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                x.contact.toString().indexOf(search.toString()) !== -1 ||
                x.relation_master.relationName.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                !search;
            }
        }
    }

    fetchMemberDetails = ({getMemberDetail}) => {
        console.log(getMemberDetail)
        if(getMemberDetail && getMemberDetail.members){
            return getMemberDetail.members.sort((item1,item2)=>{
                if(item1 && item2){
                    var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }
            }).filter(this.searchFilter(this.state.search))
            .map((item, i) => {
                 if(item){
                    return (
                        <tr key={item.memberId}>
                            <td><input type="checkbox" name="ids" className="SelectAll"  value={item.memberId}
                         onChange={(e) => {
                            let {memberId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(memberId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, memberId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }  
                             }}/></td>
                            <td>{i + 1}</td>
                            <td>{item.firstName}{' '}{item.lastName}</td>
                            <td>{item.memberDob}</td>
                            <td>{item.gender}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{item.relation_master ? item.relation_master.relationName : ''}</td>
                            <td>{item.flat_detail_master ? item.flat_detail_master.flatNo : ''}</td>
                            <td>{item.rfid_master ? item.rfid_master.rfid:''}</td>
                            <td>
                                <Button className="mr-2" color="success" onClick={this.edit.bind(this,item.firstName, item.lastName, item.memberDob,
                                    item.gender, item.email, item.contact, item.aadhaarNumber, item.relation_master.relationName, item.relationId, item.memberId,item.rfid_master ? item.rfid_master.rfidId:'', item.rfid_master ? item.rfid_master.rfid:'',
                                    item.flatDetailId, item.flat_detail_master ? item.flat_detail_master.flatNo : '')}>Edit</Button>
                                <Button color="danger" onClick={this.deleteMemberSelected.bind(this, item.memberId)}>Delete</Button>
                            </td>
                        </tr>
                    )
                 }
            })
        }
    }

    deleteMemberSelected(id){
        this.setState({loading:true})
        console.log(id)
        this.props.deleteTenantMember(id)
        .then(() => this.refreshData())
        .catch(err => err)
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

    toggleTenantMemberForm(){
        this.setState({addTenantMember: !this.state.addTenantMember,state:'', errors:{}})
    }

    toggleEditTenant(){
        this.setState({editTenantMember: !this.state.editTenantMember,emailChangeErr:'', validChangeContactErr:'', errors:{}, editRFID:false, defaultRFID:true, rfidId:'', editFlat:false, defaultFlat:true, flatDetailId:''})
    }

    changeHandler = (e) => {
        console.log(this.state)

        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors });
        }
        else {
            this.setState({[e.target.name]:e.target.value.trim(),message:''});
        }
    }

    addNewMemberChange = (e) => {
        console.log(this.state)

        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors });
        }
        else {
            this.setState({[e.target.name]:e.target.value.trim(),message:''});
        }
    }

    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }

    relationHandler = (name,selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            console.log(selectOption.value)
        });
        console.log(this.state)
    }

    getRelationOption = ({relationResult}) => {
        console.log(relationResult)
        if(relationResult && relationResult.relation){
            return relationResult.relation.map((item) => {
                return (
                    <option value={item.relationId} key={item.relationId}>{item.relationName}</option>
                )
            })
        }
    }

    deleteSelected(ids){
        console.log(ids)
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedTenantMember(ids)
        
        .then(() => {
            this.refreshData()
        })
        .catch(err => err);
    }

    updateTenantMember = (e) => {
        e.preventDefault();
        
        let { firstName, lastName, memberDob, gender,contact,email, aadhaarNumber, relationId, memberId,rfidId,flatDetailId } = this.state;
        console.log(firstName, memberDob, gender, relationId, memberId)
        let errors = {};
        if(firstName === '') errors.firstName = `First Name can't be empty.`;
        if(lastName === '') errors.lastName = `Last Name can't be empty.`;
        if(memberDob === '') errors.memberDob = `Date of Birth can't be empty.`;
        if(gender === '') errors.gender = `Please select any gender.`;
        if(!relationId) errors.relationId = `Select relation with tenant.`;
        if(!!document.getElementById('isRfidChecked').checked){
            if(rfidId === '') errors.rfidId = `Please select RFID.`
        }
        if(contact){
            if(contact.length !== 10) errors.contact= `Contact should be of 10 digits.`;
        }
        if(aadhaarNumber === '') errors.aadhaarNumber=`Aadhaar number can't be empty.`;
        else if(aadhaarNumber.length !== 12) errors.aadhaarNumber=`Aadhaar number should be of 12 digits.`;
        if(flatDetailId === '') errors.flatDetailId = `Please select Flat.`;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid && this.state.emailChangeErr === '' && this.state.validChangeContactErr === ''){
            this.setState({loadingAfterEdit:true})
            this.props.editTenantMember(firstName, lastName, memberDob, gender, email, contact, aadhaarNumber, relationId, memberId,rfidId,flatDetailId)
            .then(() => {
                this.loadDetailAfterEdit()
            })
            .catch(err => {
                err;
                this.setState({loadDetailAfterEdit:false})
            })
        }
        
    }

    addNewTenantMember(fname, lname, dob, gen,memEmail,memContact, memAadhaar, relId, tenId,rfIdId, flatId){
        console.log(fname, lname, dob, gen,memEmail,memContact, memAadhaar, relId, tenId,rfIdId, flatId);
        
        let {firstName, lastName, memberDob, gender, email, contact, aadhaarNumber, relationId, tenantId,rfidId, flatDetailId} = this.state;
        
        this.setState({firstName:fname, lastName:lname, memberDob:dob, gender:gen, email: memEmail, contact: memContact , aadhaarNumber: memAadhaar,
             relationId:relId, tenantId:tenId,rfidId:rfIdId, flatDetailId:flatId})
        let errors = {};
        if(firstName === '') errors.firstName = `Member Name can't be empty.`;

        if(memberDob === '') errors.memberDob = `Date of Birth can't be empty.`;
        if(gender === '') errors.gender = `Please select any gender.`;
        if(!relationId) errors.relationId = `Select relation with tenant.`;
        if(aadhaarNumber === '') errors.aadhaarNumber=`Aadhaar number can't be empty.`;
        else if(aadhaarNumber.length !== 12) errors.aadhaarNumber=`Aadhaar number should be of 12 digits.`;
        if(contact){
            if(contact.length !== 10) errors.contact= `Contact should be of 10 digit.`;
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid && this.state.emailChangeErr === '' && this.state.validChangeContactErr === ''){
            this.setState({loadingAfterAdd:true})
            this.props.addNewTenantDetail({firstName, lastName, memberDob, gender, email, contact,aadhaarNumber, relationId, tenantId, rfidId, flatDetailId})
            .then((res) => {res
                console.log(res)
                this.loadDetailAfterAdd();
                this.setState({successMessage: res.payload.message})
            })
            .catch(err => {
                err;
                this.setState({loadDetailAfterAdd:false})
            })
        }
        
    }

    loadDetailAfterAdd = () => {
        this.props.viewMember(this.state.tenantId).then(() => this.setState({loadingAfterAdd:false,addTenantMember:false}))
        .then(() => this.setState({memberModal:true}))
    }

    loadDetailAfterEdit = () => {
        this.props.viewMember(this.state.tenantId).then(() => this.setState({loadingAfterEdit:false,editTenantMember:false, editRFID:false, defaultRFID:true, rfidId:'', editFlat:false, defaultFlat:true, flatDetailId:''}))
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }
    
     rfidOptions = ({getRFID}) => {
        console.log(getRFID)
        if (getRFID && getRFID.rfids) {
            return getRFID.rfids.map((item) => {
                return (
                    { ...item, name:"rfid", label: item.rfid, value: item.rfidId }
                )
            }
            );
        }
        return [];
    }

    rfidChange = (name,selectOption) => {
        
        if(name && selectOption){
            this.setState(function (prevState, props) {
                return {
                    [name]: selectOption.value,
                    errors:''
                }
            }, function () {
                console.log(selectOption.value)
            });
        }
        console.log(this.state)
    }

    editRFID = () => {
        if(!!document.getElementById('isRfidChecked').checked){
            console.log('is checked')
        this.setState({rfidId: '' , defaultRFID:false, editRFID:true})
        
        
        }
        else{
                this.setState({rfidId:this.state.defRFID, defaultRFID:true, editRFID:false})
            }
        }
    
    editFlat = () => {
        if(!!document.getElementById('isFlatChecked').checked){
            console.log('is checked')
        this.setState({flatDetailId: '' , defaultFlat:false, editFlat:true});
        }
        else{
                this.setState({flatDetailId:this.state.defFlat, defaultFlat:true, editFlat:false})
            }
        }
    

    emailChange = (e) => {
        console.log(this.state)
        this.setState({[e.target.name]:e.target.value,emailChangeErr:''})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value,message:''});
            console.log(this.state)
            this.setState({emailValidError: '',message:''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log(this.state.email)
            this.setState({ [e.target.name]: e.target.value, errors,message:'' });
        }
        else {
            this.setState({[e.target.name]:e.target.value,message:''});
        } 
        this.props.validOnChangeEmail(e.target.value)
        .then(res => console.log(res))
        .catch(err => {
            err;
            this.setState({emailChangeErr: err.response.data.message})
        });
    }

    contactChange = (e) => {
        this.setState({[e.target.name]:e.target.value,message:'',validChangeContactErr:''})
        console.log(this.state);
         

        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors,message:'' });
        }
        else {
            this.setState({[e.target.name]:e.target.value.trim()});
            this.props.validOnChangeContact(e.target.value)
            .then(res => console.log(res))
            .catch(err => {
                err;
                console.log(err.response.data.message)
                this.setState({validChangeContactErr: err.response.data.message})
            })
        }
    }

    flatInputs = ({getTenantFlats}) => {
        if(getTenantFlats && getTenantFlats.flats){
            console.log(getTenantFlats);
            return getTenantFlats.flats.map(item => {
                return <option key={item.flatDetailId} value={item.flatDetailId}>{item.flatNo}</option>
            })
        }
    }

    toggleTenantMemberModal = () => {
        this.setState({memberModal:!this.state.memberModal})
    }

    render(){
        let tableData = <Table className="table table-bordered">
        <thead>
            <tr>
                <th style={{alignContent:'baseline'}}></th>
                <th>#</th>
                <th style={{cursor: 'pointer'}} onClick={()=>{
                                        this.setState((state)=>{return {sortVal:!state.sortVal,
                                        filterName:'firstName'}});
                                    }}>Member Name<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Relation with Tenant</th>
                <th>Flat</th>
                <th>RFID</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {this.fetchMemberDetails(this.props.tenantReducer)}
        </tbody>
    </Table>
    let addForm = <div>
        <FormGroup>
            <Label>First Name</Label>
            <Input name="firstName" onChange={this.addNewMemberChange} onKeyPress={fNameKeyPress} placeholder="First Name" />
            {!this.state.firstName ? <span className="error">{this.state.errors.firstName}</span> : ''}
        </FormGroup>
        <FormGroup>
            <Label>Last Name</Label>
            <Input name="lastName" onChange={this.addNewMemberChange}  onKeyPress={fNameKeyPress} 
            placeholder="Last Name" />
            {!this.state.lastName ? <span className="error">{this.state.errors.lastName}</span> : ''}
        </FormGroup>
        <FormGroup>
            <Label>Date of Birth</Label>
            <Input max={this.maxDate()} type="date" name="memberDob" onChange={this.addNewMemberChange} />
            {!this.state.memberDob ? <span className="error">{this.state.errors.memberDob}</span> : ''}
        </FormGroup>
        <FormGroup>
            <div>
                <Label>Gender:</Label>
                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                <span><Input name="gender"
                        onChange={this.addNewMemberChange} type="radio" value="Male"/></span>
                
                
                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                <span><Input name="gender" onChange={this.addNewMemberChange} type="radio" value="Female" /></span>
                
                
                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                <span><Input name="gender" onChange={this.addNewMemberChange} type="radio"
                        value="Other"/></span>
            </div>
            <div>
                {!this.state.gender ? <span className="error">{this.state.errors.gender}</span> : ''}
            </div>
        </FormGroup>
        <FormGroup>
            <Label>Email</Label>
            <Input name="email" placeholder="Email" onChange={this.emailChange} onKeyPress={emailValid} />
            {this.state.messageEmailErr ? <span className='error'>{this.state.messageEmailErr}</span> : ''}
            {<span className="error">{this.state.emailChangeErr}</span>}
        </FormGroup>
        <FormGroup>
            <Label>Contact</Label>
            <Input placeholder="Contact"
            onKeyPress={numberValidation}
            maxLength="10"
                name = 'contact' onChange={this.contactChange} 
            className="input"  />
            <div>{<span className="error">{this.state.validChangeContactErr}</span>}</div><br/>
            {<span className="error">{this.state.errors.contact}</span>}
        </FormGroup>
        <FormGroup>
            <Label>Aadhaar Number</Label>
            <Input placeholder="Aadhaar number" onChange={this.addNewMemberChange}
            name="aadhaarNumber" onKeyPress={numberValidation} type="text"
            maxLength="12" />
            {<span className="error">
                {this.state.errors.aadhaarNumber}
            </span>}
        </FormGroup>
        <FormGroup>
            <Row md={12}>
                <Col md={6}>
                    <Label>Relation with Tenant</Label>
                    <Select name='relationId' options={this.getRelationList(this.props.relationList)}
                    placeholder={<DefaultSelect />} 
                        onChange={this.relationHandler.bind(this,'relationId' )}  required/>
                    {!this.state.relationId ? <span className="error">{this.state.errors.relationId}</span> : ''}
                </Col>
                <Col md={6}>
                    <Label>RFID</Label>
                    <Select name='rfidId' placeholder={<DefaultSelect />} 
                        options={this.rfidOptions(this.props.tenantReducer)}
                        onChange={this.rfidChange.bind(this, 'rfidId')} />
                </Col>
            </Row>
        </FormGroup>
        <FormGroup>
            <Label>Flats</Label>
            <Input type="select" name="flatDetailId" onChange={this.addNewMemberChange} defaultValue="no-value" >
                <DefaultSelect />
                {this.flatInputs(this.props.tenantReducer)}
            </Input>
        </FormGroup>
        <FormGroup>
            <Button className="mr-2" color="primary" onClick={this.addNewTenantMember.bind(this,
                this.state.firstName,this.state.lastName, this.state.memberDob, this.state.gender,this.state.email,
                this.state.contact, this.state.aadhaarNumber, this.state.relationId,
                this.state.tenantId,this.state.rfidId, this.state.flatDetailId)}>Save</Button>
            <Button color="danger" onClick={this.toggleTenantMemberForm.bind(this)}>Cancel</Button> 
        </FormGroup>
        </div>

        let editForm = <div>
            <FormGroup>
                <Label>First Name</Label>
                <Input name="firstName" value={this.state.firstName} maxLength="70" onChange={this.changeHandler} />
                {!this.state.firstName ? <span className="error">{this.state.errors.firstName}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Label>Last Name</Label>
                <Input name="lastName" value={this.state.lastName} maxLength="70" onChange={this.changeHandler} />
                {!this.state.lastName ? <span className="error">{this.state.errors.lastName}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Label>Date of Birth</Label>
                <Input max={this.maxDate()} type="date" name="memberDob" value={this.state.memberDob} onChange={this.changeHandler} />
                {!this.state.memberDob ? <span className="error">{this.state.errors.memberDob}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Label>Gender:</Label>
                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                <span><Input name="gender"
                        onChange={this.changeHandler} type="radio" value={this.state.Male}
                        checked={this.state.Male===this.state.gender ? true : false}/></span>
                
                
                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                <span><Input name="gender" onChange={this.changeHandler} type="radio"
                        value={this.state.Female} checked={this.state.Female===this.state.gender ? true : false} /></span>
                
                
                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                <span><Input name="gender" onChange={this.changeHandler} type="radio"
                        value={this.state.Other} checked={this.state.Other===this.state.gender ? true : false}/></span>
                {!this.state.gender ? <span className="error">{this.state.errors.gender}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input value={this.state.email} placeholder="Email" name="email" value={this.state.email} onChange={this.emailChange} onKeyPress={emailValid} />
                {<span className="error">{this.state.emailChangeErr}</span>}
                <span><br/></span>
                {<span className="error">{this.state.errors.email}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Contact</Label>
                <Input value={this.state.contact}
                onKeyPress={numberValidation}
                maxLength="10"
                    name = 'contact' onChange={this.contactChange} 
                className="input" placeholder="Contact"  />
                <div>{<span className="error">{this.state.validChangeContactErr}</span>}</div><br/>
                {<span className="error">{this.state.errors.contact}</span>}
            </FormGroup>
            <FormGroup>
                <Label>Aadhaar Number</Label>
                <Input placeholder="Aadhaar number" onChange={this.changeHandler}
                name="aadhaarNumber" onKeyPress={numberValidation} type="text"
                maxLength="12" value={this.state.aadhaarNumber} />
                {<span className="error">
                    {this.state.errors.aadhaarNumber}
                </span>}
            </FormGroup>
            <FormGroup>
                <Label>Relation with Tenant</Label>
                <Input type="select" name='relationId'onChange={this.changeHandler} value={this.state.relationId} >
                <DefaultSelect />
                {this.getRelationOption(this.props.relationList)}
                </Input>
                {!this.state.relationId ? <span className="error">{this.state.errors.relationId}</span> : ''}
            </FormGroup>
            <FormGroup>
                <Row md={12}>
                {this.state.defaultRFID ? 
                    <Col md={6}>
                        <Label>RFID</Label>
                        <Input value={this.state.rfid} onChange={this.onChange} readOnly />
                    </Col> : ''}
                    {this.state.defaultRFID ? <Col md={6} style={{padding:'34px'}}>
                        <span style={{fontWeight:'bold'}}>Do you want to edit your RFID?</span><Input type="checkbox" onChange={this.editRFID} name="isRfidChecked" id="isRfidChecked" className="ml-3" />
                    </Col> : 
                    <Col md={12} style={{textAlign:'center'}}>
                        <span style={{fontWeight:'bold'}}>Do you want to edit your RFID?</span><Input type="checkbox" onChange={this.editRFID} name="isRfidChecked" id="isRfidChecked" className="ml-3" />
                    </Col>}
                </Row>
            </FormGroup>
            {this.state.editRFID ? 
                <FormGroup>
                    <Label>RFID</Label>
                    <Select name='rfidId' placeholder={<DefaultSelect />} 
                        options={this.rfidOptions(this.props.tenantReducer)}
                        onChange={this.rfidChange.bind(this, 'rfidId')} />
                    {!this.state.rfidId ? <span className="error">{this.state.errors.rfidId}</span>:''}
                </FormGroup> : ''}
            <FormGroup>
                <Row md={12}>
                {this.state.defaultFlat ? 
                    <Col md={6}>
                        <Label>Flat</Label>
                        <Input value={this.state.flatNo} onChange={this.onChange} readOnly />
                    </Col> : ''}
                    {this.state.defaultFlat ? <Col md={6} style={{padding:'34px'}}>
                        <span style={{fontWeight:'bold'}}>Do you want to edit your Flat?</span><Input type="checkbox" onChange={this.editFlat} name="isFlatChecked" id="isFlatChecked" className="ml-3" />
                    </Col> : 
                    <Col md={12} style={{textAlign:'center'}}>
                        <span style={{fontWeight:'bold'}}>Do you want to edit your Flat?</span><Input type="checkbox" onChange={this.editFlat} name="isFlatChecked" id="isFlatChecked" className="ml-3" />
                    </Col>}
                </Row>
            </FormGroup>
            {this.state.editFlat ? <FormGroup>
                <Label>Flat</Label>
                <Input type="select" name="flatDetailId" value={this.state.flatDetailId} onChange={this.addNewMemberChange} >
                    <option>--Select--</option>
                    {this.flatInputs(this.props.tenantReducer)}
                </Input>
                <span className="error">{this.state.errors.flatDetailId}</span>
            </FormGroup> : ''}
            <FormGroup>
                <Button className="mr-2" color="primary" onClick={this.updateTenantMember}>Save</Button>
                <Button color="danger" onClick={this.toggleEditTenant.bind(this)}>Cancel</Button> 
            </FormGroup>
        </div>
        return (
            <UI  onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Tenant's Members Detail</h3>
                        <div>
                            <Button className="mr-2" color="primary" onClick={this.toggleTenantMemberForm.bind(this)} color="primary">Add Member Details</Button>
                            <Button color="primary" onClick={this.route} color="primary">View Tenant Detail</Button>
                        </div>
                    </div>
                    <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                    <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
                        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
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
                    <Modal isOpen={this.state.addTenantMember} toggle={this.toggleTenantMemberForm.bind(this)}>
                        <ModalHeader toggle={this.toggleTenantMemberForm.bind(this)}>Add New Members</ModalHeader>
                        <ModalBody>
                            {!this.state.loadingAfterAdd ? addForm : <Spinner />}
                        </ModalBody>
                    </Modal>
                    
                    <Modal isOpen={this.state.editTenantMember} toggle={this.toggleEditTenant.bind(this)}>
                        <ModalHeader toggle={this.toggleEditTenant.bind(this)}>Edit Member Detail</ModalHeader>
                        <ModalBody>
                            {!this.state.loadingAfterEdit ? editForm : <Spinner />}
                        </ModalBody>
                    </Modal>
                    <ModalBox 
                        title="Member Registered"
                        openModal={this.state.memberModal}
                        toggle={this.toggleTenantMemberModal.bind(this)}>
                        <div style={{color:'green',fontSize:'20px', fontWeight:'bold', fontStyle:'italic', textAlign:'center'}}>{this.state.successMessage}</div>
                    </ModalBox>
                    {!this.state.loading ? tableData : <Spinner />}
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        relationList: state.RelationMasterReducer,
        tenantReducer:state.tenantReducer
    }
}

export default connect(mapStateToProps, { viewMember, getRelation, deleteTenantMember,getFlats,
     deleteSelectedTenantMember, editTenantMember, addNewTenantDetail,validOnChangeContact,validOnChangeEmail,rfid})(TenantMemberDetail);