import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import { PicURN } from '../../actionCreators/index'
import DefaultSelect from '../../constants/defaultSelect';
import Select from 'react-select';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { detailSociety } from '../../actions/societyMasterAction';
import { viewTower } from '../../actions/towerMasterAction';
import { getFlatDetails } from '../../actions/flatDetailMasterAction';
import {getCountry,getState,getCity, getLocation} from '../../actions/societyMasterAction';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Table, Label,Col, Row } from 'reactstrap';
import { getOwnerMember, getOwnerList, multipleDelete, removeOwner, updateFlatOwner,getAllFloor } from '../../actions/flatOwnerAction'
import {getRfId} from '../../actions/rfIdAction';

class FlatOwnerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: "firstName",
            ownerId: '',
            profilePic: '',
            firstName: '',
            lastName:'',
            contact: '',
            dob: '',
            email: '',
            permanentAddress: '',
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            ids: [],
            isDisabled: true,
            societyId: '',
            countryName: '',
            countryId: '',
            stateName: '',
            stateId: '',
            cityName: '',
            cityId: '',
            locationName: '',
            locationId: '',
            towerId: '',
            modalError: false,
            messageError: '',
            Aadhaar:'',
            floorId:'',
            accountNumber:'',
            correspondingAddress:'',
            Male:'male',
            Female:'female',
            Other:'other',
            gender:'',
            readOnlyPermanent: '',
            readOnlyCurrent: '',
            editPermanent: false,
            editCurrent: false,
            userPermanent: false,
            permanentAddressDefault:'',
            currentAddressDefault:'',
            profilePicture:'',
            fileName:'',
            pin1:'',
            editRf:false,
            rfidId:'',
            rfid:'',
            defaultRFID:true,
        }
    }
    toggles = () => {
        this.setState({ modalError: !this.state.modalError })
    }
    rfidChange = (name,selectOption) => {
        
        if(name && selectOption){
            this.setState(function (prevState, props) {
                return {
                    [name]: selectOption.value,
                    errors:''
                }
            }, function () {
                
            });
        }
        
}
    refreshData(){
        this.props.getRfId();
        this.props.getOwnerList();
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getCountry()
        this.props.getState()
        this.props.getCity()
        this.props.getLocation()
        this.props.getFlatDetails()
            .then(() => this.setState({ loading: false }))
    }

    componentDidMount() {
        this.refreshData();
      
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    editRFID = () => {
        if(!!document.getElementById('isRfidChecked').checked){
        this.setState({rfidId: '' , defaultRFID:false, editRFID:true})
        
        
        }
    else{
            this.setState({rfidId:this.state.defRFID, defaultRFID:true, editRFID:false})
        }
    }
    rfidOptions = ({ownerRf}) => {
        if(ownerRf){
            return (
               ownerRf.rfids.map((item)=>{
                   return ({ ...item, label:item.rfid, value:item.rfidId})
               })
            )
        }
        else{
            return [];
        }
    }

    toggle = (ownerId,profilePic, firstName,lastName, dob, gender, contact, email,Aadhaar,permanentAddress,rfidId,rfid) => {
        console.log('jkdfjkdlfjdkljk')
        console.log(ownerId,profilePic, firstName,lastName, dob, gender, contact, email,Aadhaar,permanentAddress,rfidId,rfid)
        this.setState({
            ownerId,
            profilePic,
            firstName,
            lastName,
            dob,
            gender,
            contact,
            email,
            Aadhaar,
            readOnlyPermanent: permanentAddress, 
            rfidId,     
            modal: !this.state.modal,
            rfid,
        })
    }
    delete = (ownerId) => {
        this.setState({ loading: true })
        if (window.confirm('Are You Sure ?')) {
            this.props.removeOwner(ownerId)
                .then(() => {
                    this.props.getOwnerList()
                    .then(()=>this.props.getRfId())
                        .then(() => this.setState({ loading: false }))
                })
        }
        else {
            this.props.getOwnerList()
                .then(() => this.setState({ loading: false }))
        }
    }
    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.firstName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
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
    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        if (window.confirm('Are You Sure ?')) {
            this.props.multipleDelete(ids)
                .then(() => this.props.getOwnerList().then(()=>this.props.getRfId()).then(() => this.setState({ loading: false })))
                .catch(err => err.response.data.message);
        }
        else {
            this.props.getOwnerList()
                .then(() => this.setState({ loading: false }))
        }
    }
    getSociety = ({ detail_Society }) => {
        if (detail_Society) {
            return detail_Society.map((item) => {
                return (
                    { ...item, label: item.societyName, value: item.societyId }
                )
            }
            );
        }
        return [];
    }
    viewMember(id,towerId) {
        localStorage.setItem('ownerId', id)
        localStorage.setItem('towerId',towerId)
        this.props.history.push('/superDashBoard/flatMemberList')

    }
    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }
    societyChangeHandler = (selectOption) => {
        let countryName = selectOption.country_master ? selectOption.country_master.countryName : '';
        let countryId = selectOption.country_master ? selectOption.country_master.countryId : '';
        let stateName = selectOption.state_master ? selectOption.state_master.stateName : '';
        let stateId = selectOption.state_master.stateId;
        let cityName = selectOption.city_master.cityName ? selectOption.city_master.cityName : '';
        let cityId = selectOption.city_master.cityId;
        let locationName = selectOption.location_master.locationName;
        let locationId = selectOption.location_master.locationId;
        this.setState(function (prevState, props) {
            return {
                societyName: selectOption.value,
                countryName,
                stateName,
                cityName,
                locationName,
                locationId,
                cityId,
                stateId,
                countryId,
                currentSociety:selectOption
            }
        }, function () {
        });
    }
    viewSlots(id) {

        localStorage.setItem('flatDetailId', id)
        this.props.history.push('/superDashboard/parkingSlotList')

    }
    addFlat(ownerId){

        localStorage.setItem('ownerId',ownerId)
        this.props.history.push('/superDashboard/viewOwnerFlats')
    }
    renderList = ({ owners  }) => {
        if (owners && owners.getOwners) {
            return owners.getOwners.sort((item1,item2)=>{
                let cmpValue=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal?cmpValue: -cmpValue;}).filter(this.searchFilter(this.state.search)).map((items, index) => {

                return (    
                    <tr key={items.ownerId}>
                        <td><input type="checkbox" name="ids" value={items.ownerId} className="SelectAll"
                            onChange={(e, i) => {
                                const { ownerId } = items
                                if (!e.target.checked) {
                                    if (this.state.ids.length > -1) {
                                        document.getElementById('allSelect').checked = false;
                                        let indexOfId = this.state.ids.indexOf(ownerId);
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1)
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true })
                                        }
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, ownerId] })
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }
                            }} /></td>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ width: "8%", height: "8%" }}> <img style={{ width: "100%", height: "40%" }} src={PicURN + items.picture} alt="Profile Pic">
                        </img></td>
                        <td style={{ textAlign: "center", width: '10px',textTransform: 'capitalize'  }}  >{items.firstName+' '+items.lastName}</td>
                        <td style={{ textAlign: "center" }}>{items.contact}</td>
                        <td style={{ textAlign: "center" }}>{items.permanentAddress}</td>
                        <td><button className="btn btn-success mr-2" onClick={this.viewMember.bind(this, items.ownerId,items.tower_master.towerId)}>View Member</button></td>
                        <td><button className="btn btn-success mr-2" onClick={this.addFlat.bind(this,items.ownerId)}>View Flats</button></td>
                        <td style={{ textAlign: "center" }}>
                            <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, items.ownerId, 
                                PicURN + items.picture,items.firstName, items.lastName,items.dob, items.gender, items.contact, items.email,
                                items.adhaarCardNo, items.permanentAddress,items.rfid_master.rfidId,items.rfid_master.rfid,)}>Edit</button>
                            <button className="btn btn-danger" onClick={this.delete.bind(this, items.ownerId)} >Delete</button>
                        </td>
                    </tr>
                )
            })
        }


    }
    towerChangeHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
        });
        this.props.getAllFloor(selectOption.towerId);
    }
    
    getTower = ({ tower }) => {
        if (tower) {
            return tower.tower.map((item) => {
                return (
                    { ...item, label: item.towerName, value: item.towerId }
                )
            }
            );
        }
        return [];
    }
    getflat = ({ details }) => {
        if (details) {
            return details.flatDetail.map((item) => {
                return (
                    { ...item, label: item.flatNo, value: item.flatDetailId }
                )
            })
        }
    }
    countryName = ({countryResult}) => {
        if(countryResult){
           return( 
            countryResult.map((item) =>{
                   return(
                    { ...item, label: item.countryName, value: item.countryId }
                   )
               })
           )
            
        }
    }
    onChangeCountry = (countryName,countryId,selectOption) => {    
        this.setState({
            countryName: selectOption.countryName,
            countryId:selectOption.countryId, 
        },function(){this.props.getState(selectOption.countryId)})  
    }
    stateName = ({stateResult}) => {
        if(stateResult){
           return( 
            stateResult.map((item) =>{ 
                   return(
                    { ...item, label: item.stateName, value: item.stateId }
                   )
               })
           )
            
        }
    }

    onChangeState = (stateName,stateId,selectOption) => {
        this.setState({
            stateName: selectOption.stateName,
            stateId:selectOption.stateId
        },function (){this.props.getCity(selectOption.stateId);})
        
    }
    cityName=({cityResult})=>{
               
        if(cityResult){
            
           return( 
            cityResult.map((item) =>{ 
                   return(
                    { ...item, label: item.cityName, value: item.cityId }
                   )
               }
               )
           )
            
        }
    }

    onChangeCity = (cityName,cityId,selectOption) => {
        this.setState({
            cityName: selectOption.cityName,
            cityId:selectOption.cityId
        },function(){this.props.getLocation(selectOption.cityId)})
        
    }
    locationName=({locationResult})=>{
        if(locationResult){
             
            return( 
                locationResult.map((item) =>{ 
                    return(
                     { ...item, label: item.locationName, value: item.locationId }
                    )
                }
                )
            )
             
         }
     }

     onChangeLocation = (locationName,locationId,selectOption) => {
         this.setState({
             locationName: selectOption.locationName,
             locationId:selectOption.locationId,
            
         },function(){this.props.getLocation(selectOption.locationId)})
     }
    flatChangeHandler=(name,selectOption)=>{
        this.setState({
            [name]: selectOption.value
        })
        this.props.getAllFloor(selectOption.towerId);
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    errorToggles = () => {
        this.setState({ modalError: !this.state.modalError })
    }
    editFlatOwnerDetails = () => {
        let errors = {};
        const { ownerId, 
            firstName,
            lastName,
            email,
            dob,
            contact,
            permanentAddress,
             gender,
             Aadhaar,
             profilePicture,
             fileName,
             rfidId
            } = this.state
        if (firstName === '') {
            errors.firstName = "Owern Name can't be empty"
        }
        else if (dob === '') {
            errors.DOB = "Date of birth can't be empty"
        }
        else if (contact.length <= 9) {
            errors.number = "Please enter 10 digit number"
        }
        else if (email === '') {
            errors.email = "email can't be empty"
        }

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({ loading: true })
            this.setState({ modal: !this.state.modal })
            this.props.updateFlatOwner(
                ownerId,
                firstName,
                lastName,
                email,
                contact,
                permanentAddress,
                gender,
                Aadhaar,
                profilePicture,
                fileName,
                rfidId
                )
                .then(() => this.props.getOwnerList().then(()=>this.props.getRfId()).then(() => this.setState({ loading: false })))
                .catch(err => {
                    this.setState({ messageError: err.response.data.message, modal: !this.state.modal })
                    this.setState({ modal: !this.state.modal })
                    this.errorToggles()
                })
        }
    }
    getFloor=({floor})=>{
        if(floor){
            return floor.tower.Floors.map((item)=>{
                      
                return {...item ,label: item.floorName, value: item.floorId }
            })
    
        }
        else {
            return []
        }}
        floorChangeHandler=(name,selectOption)=>{
            this.setState({
                [name]: selectOption.value
            })
    
        }
        getFlats=({floor})=>{
            if(floor){
              return  floor.flatDetail.filter((flatRecord)=>{
                    return flatRecord.floorId===this.state.floorId
                }).map((selectFlat)=>{
                    return {...selectFlat, label:selectFlat.flatNo,value:selectFlat.flatDetailId}
                });
            }
            else {
                return []
              }
        }

        FileChange=(event)=>{
            const files = event.target.files;
            const file = files[0];
            const fileName=file.name
            if (files && file) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload =  () =>{
                  this.setState({
                    profilePicture :
                      reader.result,
                      fileName
                  })
               
              };
            }
           
      }

        editPermanentAddress = () => {
            if (!!document.getElementById('isChecked').checked) {
                this.setState({ editPermanent: true, permanentAddress: '', userPermanent: true, countryId:'',stateId:'',
            cityId:'', locationId:'' })
            }
            else {
                this.setState({ editPermanent: false, permanentAddress: this.state.readOnlyPermanent, userPermanent: false,
                countryId:this.state.readOnlyCountryId, stateId:this.state.readOnlyStateId, cityId:this.state.readOnlyCityId,
            locationId: this.state.readOnlyLocationId })
            }
        }

        editRfId=()=>{
            if(!!document.getElementById('isRfIdChecked').checked){
            this.setState({editRf:true, rfidId:''})
            }
            else{
                this.setState({rfidId:this.state.rfidId})
            }
        }
    
        permanentAddressChange = (e) => {
            if (!!this.state.errors[e.target.name]) {
                let errors = Object.assign({}, this.state.errors);
                delete errors[e.target.name];
                this.setState({ permanentAddressDefault: e.target.value, permanentAddress: e.target.value  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + 'Pin/Zip code: ' + this.state.pin1 , errors });
            }
            else {
                this.setState({permanentAddressDefault: e.target.value, permanentAddress: e.target.value  + (this.state.locationName ? (', ' + this.state.locationName + ', ') : ', ') +
                this.state.cityName + ', ' + this.state.stateName + ', ' + this.state.countryName + ', ' + '  ' + this.state.pin1})
            }
        }
        pinChange1 = (e) => {

            if (!!this.state.errors[e.target.name]) {
                let errors = Object.assign({}, this.state.errors);
                delete errors[e.target.name];
                this.setState({ pin1: e.target.value, errors });
            }
            else {
                this.setState({pin1: e.target.value});
            }
        }

        OnKeyPresshandlerPhone = (event) => {
            const pattern = /^[0-9]$/;
            let inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        } 

        RfID=({ownerRf})=>{
            if(ownerRf && ownerRf.rfids){
                return (
                   ownerRf.rfids.map((item)=>{
                       return ({ ...item, label:item.rfid, value:item.rfidId})
                   })
                )
            }
            else{
                return [];
            }
        }
        rfIdChangeHandler=(selectOption)=>{
            this.setState({
                rfidId:selectOption.rfidId
            })
    
        }
          

    close = () => {
        return this.props.history.replace('/superDashBoard')
    }
    changePassword=()=>{
          
        return this.props.history.replace('/superDashboard/changePassword')
      }
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{ width: "4%" }}></th>
                    <th style={{ textAlign: "center", width: "4%" }}>#</th>
                    <th style={{ textAlign: "center", width: "12%" }}>Profile Pic</th>
                    <th style={{ textAlign: "center", width: "12%" }} onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'firstName'
                                }
                            });
                        }}>Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th style={{ textAlign: "center" }}>Contact No.</th>
                    {/* <th style={{ textAlign: "center", width: "16%" }}>Correspondance Address</th> */}
                    <th style={{ textAlign: "center", width: "16%" }}>Permanent Address</th>
                    <th style={{ textAlign: "center", width: "8%" }}>View Member</th>
                    {/* <th style={{ textAlign: "center", width: "8%" }}>View Parking</th> */}
                    <th style={{ textAlign: "center", width: "8%" }}>View Flats</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.Owner)}
            </tbody>
        </Table>
        let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
            onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;

        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details">
                            <h3>Flat Owner List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/flatOwnerDetail')} id="addOwner" >Add Owner</Button>
                        </div>
                        <div>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {deleteSelectedButton}
                            <Label htmlFor="allSelect" style={{ alignContent: 'baseline', marginLeft: "10px", fontWeight: "700" }}>Select All<input
                                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                                    if (e.target.checked) {
                                        this.selectAll();
                                    }
                                    else if (!e.target.checked) {
                                        this.unSelectAll();
                                    }
                                }
                                } /></Label>
                            {!this.state.loading ? tableData : <Spinner />}
                            <Modal isOpen={this.state.modal} toggle={this.toggles} style={{width:"100% !important"}}>
                                <ModalHeader toggle={this.toggle}>Edit Flat Owner</ModalHeader>
                                <ModalBody>
                                <FormGroup>
                            <Label>Upload Profile Pic</Label>                               
                                <Input accept='image/*' style={{display:'inline-block'}} type="file" name ="profilePic" onChange={this.FileChange} />
                                <div>
                                 <img src={this.state.profilePic} height='100px' width='100px' />
                                 </div>
                            </FormGroup>
                                <FormGroup>
                                <Label>First Name</Label>
                                <Input  style={{'textTransform': 'capitalize' }} placeholder="First Name" maxLength={50} name='firstName' onChange={this.onChangeHandler} value={this.state.firstName} />
                                <span className="error">{this.state.errors.ownerName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input  style={{'textTransform': 'capitalize' }} placeholder="Last Name" maxLength={50} name='lastName' onChange={this.onChangeHandler} value={this.state.lastName}/>
                                <span className="error">{this.state.errors.ownerName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Date Of Birth</Label>
                                <Input  type='date' max={this.maxDate()} name='dob' onChange={this.onChangeHandler} value={this.state.dob}/>
                                <span className="error">{this.state.errors.DOB}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender:</Label>
                                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                                <span><Input type="radio" id="Gender1" name="gender" onChange={this.onChangeHandler} value={this.state.Male} checked={this.state.Male===this.state.gender ? true : false}/></span>
                                
                                
                                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                                <span><Input type="radio" id="Gender2" name="gender" onChange={this.onChangeHandler} value={this.state.Female} checked={this.state.Female===this.state.gender ? true : false}/></span>
                               
                               
                                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                                <span><Input type="radio" id="Gender3" name="gender" onChange={this.onChangeHandler} value={this.state.Other} checked={this.state.Other===this.state.gender ? true : false}/></span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input placeholder="Contact Number" onKeyPress={this.OnKeyPresshandlerPhone} type="text" maxLength={10} value={this.state.contact} onChange={this.onChangeHandler} name="contact" />
                                <span className="error">{this.state.errors.number}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email </Label>
                                <Input placeholder="Email" type='email' name='email' 
                                onChange={this.onChangeHandler} 
                                onBlur={this.OnKeyPresshandlerEmail}
                                onKeyPress={this.OnKeyPresshandlerEmail}
                                value={this.state.email} />
                                <span className="error">{this.state.errors.email}</span>
                                <span style={{display:this.state.emailError?'block':'none',color:'red'}}>email is not valid</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Aadhaar Number</Label>
                                <Input placeholder='Aadhaar Number' onChange={this.onChangeHandler} name='Aadhaar' onKeyPress={this.OnKeyPresshandlerPhone} type="text" value={this.state.Aadhaar} maxLength={12}/>
                                <span className="error">{this.state.errors.Aadhaar}</span>
                            </FormGroup>
                                    <FormGroup>
                <Row md={12}>
                    {!this.state.editPermanent ? <Col md={6}>
                        <Label>Permanent Address</Label>
                        <Input type="textarea"
                            value={this.state.readOnlyPermanent}
                            placeholder="Permanent Address"
                            name="readOnlyPermanent" disabled
                            onChange={this.onChange}
                            maxLength='250' />
                    </Col> : ''}
                    {this.state.editPermanent ? <Col md={12} style={{ textAlign: 'center' }}><span style={{ fontWeight: '600' }}>Do you want to edit permanent address?</span><Input type="checkbox" onChange={this.editPermanentAddress} name="isChecked" id="isChecked" className="ml-3" /></Col> :
                        <Col md={6} style={{ paddingTop: '44px' }}><span style={{ fontWeight: '600' }}>Do you want to edit permanent<br /> address?</span><Input type="checkbox" onChange={this.editPermanentAddress} name="isChecked" id="isChecked" className="ml-3" /></Col>}
                </Row>
            </FormGroup>
            {/* <span style={{ fontWeight: '600' }}>Do you want to edit RF ID?</span><Input type="checkbox" onChange={this.editRfId} name="editRf" id="isRfIdChecked" className="ml-3" />
            {this.state.editRf  ?  <Col md={6}>
                    <Label>RF ID</Label>
                    <Input value={this.state.rfidId} onChange={this.onChange} readOnly />

                                {/* <Select  options={this.RfID(this.props.rfId)} name='rfidId' onChange={this.rfIdChangeHandler.bind(this)}/> */}
                                {/* </Col> :'' }                 */} 

             {this.state.userPermanent ? <div>
                <h4 style={{textAlign:'center', fontWeight:'600', textDecoration: 'underline'}}>Edit Permanent Address</h4>
                <FormGroup>
                    <Row md={12}>
                        <Col md={3}>
                            <Label>Country</Label>
                            <Select placeholder={<DefaultSelect />} options={this.countryName(this.props.societyName)} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
                        </Col>
                        <Col md={3}>
                            <Label>State</Label>
                            <Select placeholder={<DefaultSelect />} options={this.stateName(this.props.societyName)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')} />
                        </Col>
                        <Col md={3}>
                            <Label>City</Label>
                            <Select placeholder={<DefaultSelect />} options={this.cityName(this.props.societyName)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                        </Col>
                        <Col md={3}>
                            <Label>Location</Label>
                            <Select placeholder={<DefaultSelect />} options={this.locationName(this.props.societyName)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row md={12}>
                        <Col md={4}>
                            <Label>Pin/Zip Code</Label>
                            <Input type="text" onChange={this.pinChange1}
                                maxLength="6" minLength="5" onKeyPress={this.OnKeyPresshandlerPhone}
                                name="pin1" placeholder="Pin/Zip Code" />
                            <span className="error">{this.state.errors.pin1}</span>
                        </Col>
                        <Col md={8}>
                            <Label>Address</Label>
                            <Input id="currentAddress"
                                disabled={!(this.state.countryId && this.state.stateId
                                    && this.state.cityId)}
                                type="textarea"
                                placeholder="Permanent Address"
                                name="permanentAddressDefault"
                                onChange={this.permanentAddressChange}
                                maxLength='250' />
                            {<span className="error">{this.state.errors.permanentAddressDefault}</span>}
                        </Col>
                    </Row>
                </FormGroup>
            </div> : ''}
            <FormGroup>
                <Row md={12}>
                {this.state.defaultRFID ? 
                    <Col md={6}>
                        <Label>RFID</Label>
                        <Input value={this.state.rfid} onChange={this.onChange} readOnly />
                    </Col> : ''}
                    {this.state.defaultRFID ? <Col md={6}>
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
                        options={this.RfID(this.props.rfId)}
                        onChange={this.rfidChange.bind(this, 'rfidId')} />
                    {!this.state.rfidId ? <span className="error">{this.state.errors.rfidId}</span>:''}
                </FormGroup> : ''}
                                    <FormGroup>
                                        <Button color="primary mr-2" onClick={this.editFlatOwnerDetails}>Save</Button>
                                        <Button color="danger" onClick={this.toggles}>Cancel</Button>
                                    </FormGroup>
                                </ModalBody>
                            </Modal>
                            <Modal isOpen={this.state.modalError} toggle={this.errorToggles}>
                                <ModalHeader toggle={this.toggle}>Edit Flat Owner</ModalHeader>
                                <ModalBody>
                                    <h1 style={{ display: "block", background: 'black' }}>{this.state.messageError}</h1>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </UI>
            </div>
        );
    }
}
function mapStateToProps(state) {

    console.log(state)
    return {
        societyName: state.societyReducer,
        Owner: state.FlatOwnerReducer,
        towerList: state.TowerDetails,
        towerFloor:state.FlatOwnerReducer,
        rfId:state.RFIdReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOwnerList, multipleDelete, removeOwner, detailSociety, getFlatDetails, viewTower, updateFlatOwner, getOwnerMember,getAllFloor,getCountry,getState,getCity, getLocation,getRfId }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FlatOwnerList);