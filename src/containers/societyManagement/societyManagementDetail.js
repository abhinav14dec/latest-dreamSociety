import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountry, getState, getCity, getLocation, getSociety, detailSociety, deleteSociety, updateSociety,deleteSelectSociety } from './../../actions/societyMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import {Table, Button, Modal, FormGroup, ModalBody, ModalHeader,  Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import _ from 'underscore';
import DefaultSelect from './../../constants/defaultSelect';


class SocietyManagementDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
                countryId: '',
                countryName: '',
                stateName: '',
                stateId: '',
                cityName: '',
                cityId: '',
                locationName: '',
                locationId: '',
                societyId: '',
                societyName: '',
                societyAddress:'',
                bankName:'',
                accountHolderName:'',
                accountNumber:'',
                IFSCCode:'',
                email:'',
                contactNumber:'',
                registrationNumber:'',
                totalBoardMembers:'',
                isActive:false,
                

            
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors:{},
            ids:[],
            isDisabled: true,
            emailValidError:''
            

        };
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

    
    
    emailValid(event) {
        const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    
    emailChange = (e) => {
   
        this.setState({email:e.target.value})
        if(e.target.value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            this.setState({[e.target.name]:e.target.value});
            
            this.setState({emailValidError: ''})
        }
        else{ this.setState({emailValidError: 'Invalid Email.'})}
        
    }

  

  

    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    toggle = (societyId, countryName, stateName, cityName, locationName, societyName, societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber,registrationNumber,totalBoardMembers) => {

        this.setState({
            societyId,
            countryName,
            stateName,
            cityName,
            locationName,
            societyName,
            societyAddress,
            bankName,
            accountHolderName,
            accountNumber,
            IFSCCode,
            email,
            contactNumber,
            registrationNumber,
            totalBoardMembers,
            
            modal: !this.state.modal
        })
    }
    toggleModal = () => {
        this.setState({ modal: !this.state.modal, message: '' })
    }
    componentDidMount() {
        this.refreshData()
      
    }

    refreshData() {
        this.props.detailSociety().then(() => this.setState({loading: false}))
        this.props.getCountry().then(() => this.setState({loading: false}))
        this.props.getState().then(() => this.setState({loading: false}))
        this.props.getCity().then(() => this.setState({loading: false}))
        this.props.getLocation().then(() => this.setState({loading: false}))
        this.props.getSociety().then(() => this.setState({loading: false}))
    }


    editSocietyType = () => {
        const { societyId, countryId, stateId, cityId, locationId, societyName, societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber, registrationNumber,totalBoardMembers } = this.state

        let errors={};

        if(this.state.societyName === ''){
            errors.societyName="Society Name can't be empty"
        }

        else if(this.state.societyAddress === ''){
            errors.societyAddress="Society Address can't be empty"
        }

        
        else if(this.state.bankName === ''){
            errors.bankName="Bank Name can't be empty"
        }
        
        
        else if(this.state.accountHolderName === ''){
            errors.accountHolderName="Account Holder Name can't be empty"
        }
        
        
        else if(this.state.accountNumber.length !== 16){
            errors.accountNumber="Account Number must be 16 digits"
        }
        
        
        else if(this.state.IFSCCode.length !== 11){
            errors.IFSCCode="IFSC Code must be 11 digits"
        }
        
        
        else if(this.state.email === ''){
            errors.email="Email Id can't be empty"
        }


        else if(this.state.contactNumber.length !== 10){
            errors.contactNumber="Contact No. must be 10 digits"
        }
        else if(this.state.registrationNumber === ''){
            errors.registrationNumber="Registration No. can't be empty"
        }

        else if(this.state.totalBoardMembers === ''){
            errors.totalBoardMembers="Total Board Members can't be empty"
        }

        this.setState({errors})

        const isValid= Object.keys(errors).length === 0

        if(isValid && this.state.emailValidError===''){
            this.setState({loading:true})
        this.props.updateSociety(societyId, countryId, stateId, cityId, locationId, societyName,  societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber, registrationNumber,totalBoardMembers)
            .then(() => this.refreshData())
        this.setState({
            editSocietyData: { societyId, countryId, stateId, cityId, locationId, societyName,  societyAddress, bankName, accountHolderName, accountNumber,IFSCCode, email, contactNumber, registrationNumber,totalBoardMembers },
            modal: !this.state.modal
        })
      }
    }

    deleteSocietyName = (societyId) => {
        let {isActive}=this.state
        this.setState({
            loading: true
        })

        
        this.props.deleteSociety(societyId, isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
    
        
    }

    deleteSelected=(ids)=>{
    
        this.setState({loading:true, isDisabled:true});
        
        this.props.deleteSelectSociety(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
        
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

    onChangeCountry= (event)=>{
     
        let selected= event.target.value
        var country = _.find(this.props.societyReducer.countryResult,function(obj){
            return obj.countryName === selected
            })
        
         
            this.props.getState(country.countryId)
            
            this.setState({
                countryName: country.countryName,
                countryId:country.countryId,
                stateName: '',
                cityName: '',
                locationName: ''
            })
          
    }

    
    onChangeState= (event)=>{
       
      
        let selected= event.target.value  
        var data1 = _.find(this.props.societyReducer.stateResult,function(obj){
            return obj.stateName === selected
            })
    
           
        
            this.props.getCity(data1.stateId)

            this.setState({
                stateName: data1.stateName,
                stateId:data1.stateId
            })
            
         
    }

    onChangeCity= (event)=>{
      
        let selected= event.target.value
    
        var data2 = _.find(this.props.societyReducer.cityResult,function(obj){
            return obj.cityName === selected
            })
    
    
        this.props.getLocation(data2.cityId)
        this.setState({
            cityName:data2.cityName,
            cityId:data2.cityId
        })
        

    }

    onChangeLocation= (event)=>{
      
         let selected= event.target.value
        var data3 = _.find(this.props.societyReducer.locationResult,function(obj){
            return obj.locationName === selected
            })
      
            this.props.getSociety(data3.locationId)

            this.setState({
                locationName:data3.locationName,
                locationId:data3.locationId
            })

  
    }






    societyData = ({ detail_Society }) => {
     
        if (detail_Society) {
            return detail_Society.map((item,index) => {
               
                return (
                    <tr key={item.societyId}>
                  
                        <td>{index+1}</td>
                        <td>{item.societyName}</td>
                        <td>{item.country_master?item.country_master.countryName:''}</td>
                        <td>{item.state_master ? item.state_master.stateName:''}</td>
                        <td>{item.city_master ? item.city_master.cityName:''}</td>
                        <td>{item.location_master?item.location_master.locationName:''}</td>
                        <td>{item.societyAddress}</td>
                        <td>{item.bankName}</td>
                        <td>{item.accountHolderName}</td>
                        <td>{item.accountNumber}</td>
                        <td>{item.IFSCCode}</td>
                        <td>{item.email}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.registrationNumber}</td>
                        <td>{item.totalBoardMembers}</td>
                            <td>
                                <Button color="success mr-2" onClick={this.toggle.bind(this, 
                                    item.societyId, 
                                    item.country_master ? item.country_master.countryName:'', 
                                    item.state_master?item.state_master.stateName:'',
                                    item.city_master?item.city_master.cityName:'', 
                                    item.location_master?item.location_master.locationName:'', 
                                    item.societyName,
                                    item.societyAddress,
                                    item.bankName,
                                    item.accountHolderName,
                                    item.accountNumber,
                                    item.IFSCCode,
                                    item.email, 
                                    item.contactNumber,
                                    item.registrationNumber,
                                    item.totalBoardMembers)} >Edit</Button>
                            
                                {/* <Button color="danger" onClick={this.deleteSocietyName.bind(this, item.societyId)} >Delete</Button> */}
                                
                            </td>
                    </tr>
                )
            })
        }
    }

    fetchCountry({ countryResult }) {
        if (countryResult) {
            return (
                countryResult.map((item) => { 
                    return (
                        <option value={item.countryName} key={item.countryId}>
                            {item.countryName}
                        </option>
                    )
                })
            )
        }
    }

    fetchState({ stateResult }) {
        if (stateResult) {

            return (
                stateResult.map((item) => {

                    return (
                        <option value={item.stateName} key={item.stateId}>
                            {item.stateName}
                        </option>
                    )
                })
            )
        }
    }

    fetchCity({ cityResult }) {
        if (cityResult) {

            return (
                cityResult.map((item) => {

                    return (
                        <option value={item.cityName} key={item.cityId}>
                            {item.cityName}
                        </option>
                    )
                })
            )
        }
    }

    fetchLocation({ locationResult }) {
        if (locationResult) {
            return (
                locationResult.map((item) => {
                    return (
                        <option value={item.locationName} key={item.locationId}>
                            {item.locationName}
                        </option>
                    )
                })
            )
        }
    }

    // searchOnChange = (e) => {
    //     this.setState({ search: e.target.value })
    // }
    // searchFilter(search) {
    //     return function (x) {
    //         return x.societyName.toLowerCase().includes(search.toLowerCase()) ||
    //             x.country_master ? x.country_master.countryName.toLowerCase().includes(search.toLowerCase()) : '' ||
    //             x.state_master ? x.state_master.stateName.toLowerCase().includes(search.toLowerCase()) : '' || 
    //             x.city_master ? x.city_master.cityName.toLowerCase().includes(search.toLowerCase()) : '' ||
    //             x.location_master ? x.location_master.locationName.toLowerCase().includes(search.toLowerCase()) : '' ||
    //             x.societyAddress.toLowerCase().includes(search.toLowerCase()) ||
    //             x.bankName.toLowerCase().includes(search.toLowerCase()) ||
    //             x.accountHolderName.toLowerCase().includes(search.toLowerCase()) ||
    //             x.accountNumber.toLowerCase().includes(search.toLowerCase()) ||
    //             x.IFSCCode.toLowerCase().includes(search.toLowerCase()) ||
    //             x.email.toLowerCase().includes(search.toLowerCase()) ||
    //             x.contactNumber.toLowerCase().includes(search.toLowerCase()) ||
    //             x.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
    //             x.totalBoardMembers.toLowerCase().includes(search.toLowerCase()) 
    //             || !search;
    //     }
    // }

    
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    routeToAddNewSociety =() => {
        this.props.history.push('/superDashboard/societyManagement')
    }
    close=()=>{
        return this.props.history.replace('/superDashboard')
    }

    render() {
        let tableData;

        tableData= <div style={{backgroundColor:'lightgray'}}>
        <Table className="table table-bordered">
            <thead>
                <tr>
               
                    <th>#</th>
                    <th>Society Name</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Location</th>
                    <th>Society Address</th>
                    <th>Bank Name</th>
                    <th>Account Holder Name</th>
                    <th>Account Number</th>
                    <th>IFSC Code</th>
                    <th>Email Id</th>
                    <th>ContactNo.</th>
                    <th>RegistrationNo.</th>
                    <th>Total Board Members</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.societyData(this.props.societyReducer)}
            </tbody>
        </Table>
        </div>

        let modalData=<div>
            
            <FormGroup>
                            <Label>Society Name</Label>
                            <Input type="text" id="societyId" name="societyName"  value={this.state.societyName} onKeyPress={this.onKeyPressHandler} maxLength={100} readOnly/>
                            <span className="error">{this.state.errors.societyName}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Country Name</Label>

                            <Input  id="countryId" name="countryName" onChange={this.onChangeCountry}  value={this.state.countryName} readOnly>
                                {/* <option value={this.state.countryId}>{this.state.countryName}</option> */}
                                <DefaultSelect/>
                                {this.fetchCountry(this.props.societyReducer)}
                            </Input>
                            {!this.state.countryName ? <span className="error">{this.state.errors.countryName}</span>: ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>State Name</Label>
                            <Input  id="stateId" name="stateName" onChange={this.onChangeState}  value={this.state.stateName} readOnly>
                            {this.state.stateName ? <option>{this.state.stateName}</option> : <option disabled>--Select--</option>}
                                  {this.state.stateName ? <DefaultSelect />: null}
                                    {this.state.stateName ? null : this.fetchState(this.props.societyReducer)}
                            </Input>
                            {!this.state.stateName ? <span className="error">{this.state.errors.stateName}</span>: ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>City Name</Label>
                            <Input id="cityId" name="cityName" onChange={this.onChangeCity} value={this.state.cityName}  readOnly>
                               {this.state.cityName ? <option>{this.state.cityName}</option> : <option disabled>--Select--</option>}
                                {this.state.cityName ? <DefaultSelect />: null}
                                {this.state.cityName ? null : this.fetchCity(this.props.societyReducer)}
                            </Input>
                            {!this.state.cityName ? <span className="error">{this.state.errors.cityName}</span>: ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Location Name</Label>
                            <Input  id="locationId" name="locationName" onChange={this.onChangeLocation} value={this.state.locationName} readOnly>
                            {this.state.locationName ? <option>{this.state.locationName}</option> : <option disabled>--Select--</option>}
                                 {this.state.locationName ? <DefaultSelect />: null}
                                 {this.state.locationName ? null : this.fetchLocation(this.props.societyReducer)}  
                            </Input>
                            {!this.state.locationName ? <span className="error">{this.state.errors.locationName}</span>: ''}
                        </FormGroup>
                       
                        
                        <FormGroup>
                            <Label>Society Address</Label>
                            <Input   name="societyAddress" onChange={this.onChangeHandler} value={this.state.societyAddress}  maxLength={300} readOnly/>
                            <span className="error">{this.state.errors.societyAddress}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Bank Name</Label>
                            <Input type="text"  name="bankName" onChange={this.onChangeHandler} value={this.state.bankName} onKeyPress={this.onKeyPressHandler} maxLength={50}/>
                            <span className="error">{this.state.errors.bankName}</span> 
                        </FormGroup>

                        
                        <FormGroup>
                            <Label>IFSC Code</Label>
                            <Input type="text"  name="IFSCCode" onChange={this.onChangeHandler} value={this.state.IFSCCode} onKeyPress={(e) => {
                                const pattern = /^[a-zA-Z0-9]+$/;
                                let inputChar = String.fromCharCode(e.charCode);
                                if (!pattern.test(inputChar)) {
                                    e.preventDefault();
                                }
                            }}  maxLength={11} style={{'textTransform':'upperCase'}}/>
                            <span className="error">{this.state.errors.IFSCCode}</span> 
                        </FormGroup>
                        

                        <FormGroup>
                            <Label>Account Holder Name</Label>
                            <Input type="text"  name="accountHolderName" onChange={this.onChangeHandler} value={this.state.accountHolderName} onKeyPress={this.onKeyPressHandler}  maxLength={200}/>
                            <span className="error">{this.state.errors.accountHolderName}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Account Number</Label>
                            <Input type="text"  name="accountNumber" onChange={this.onChangeHandler} value={this.state.accountNumber}  onKeyPress={this.OnKeyPresshandlerPhone} maxLength={16} minLength={16}/>
                            <span className="error">{this.state.errors.accountNumber}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Email Id</Label>
                            <Input type="email"  name="email"   onChange={this.emailChange}     onKeyPress={this.emailValid} value={this.state.email}   maxLength={50}/>
                            {!this.state.email ? <span className="error">{this.state.errors.email}</span> : ''}
                            <span className="error">{this.state.emailValidError}</span>
                             
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input type="text"  name="contactNumber" onChange={this.onChangeHandler} value={this.state.contactNumber}  onKeyPress={this.OnKeyPresshandlerPhone} maxLength={10} minLength={10}/>
                            <span className="error">{this.state.errors.contactNumber}</span> 
                        </FormGroup>
                        <FormGroup>
                            <Label>Registration Number</Label>
                            <Input type="text"  name="registrationNumber" onChange={this.onChangeHandler} value={this.state.registrationNumber}  maxLength={20}/>
                            <span className="error">{this.state.errors.registrationNumber}</span> 
                        </FormGroup>

                        <FormGroup>
                            <Label>Total Board Members</Label>
                            <Input type="text"  name="totalBoardMembers" onChange={this.onChangeHandler} value={this.state.totalBoardMembers}  onKeyPress={this.OnKeyPresshandlerPhone} maxLength={2}/>
                            <span className="error">{this.state.errors.totalBoardMembers}</span> 
                        </FormGroup>
                        <Button color="primary mr-2" onClick={this.editSocietyType}>Save</Button> 
                        <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
        </div>

        return (
            <div>
                <UI onClick={this.logout}  change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                <div className="top-details">
                                <h3>Society Details</h3>
                                {/* <Button onClick={this.routeToAddNewSociety} color="primary">Add Society</Button> */}
                            </div>
                            <div>
                              
                                {/* <SearchFilter type="text" value={this.state.search}
                                    onChange={this.searchOnChange} /> */}
                            </div>
                            {/* <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button> */}
                            {(this.state.loading) ? <Spinner /> : tableData}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                    <ModalBody>
                         {modalData}
                    </ModalBody>
                </Modal>
               </div>
               </UI>
         </div>
        );
    }
}


function mapStatToProps(state) {
    return {
        societyReducer: state.societyReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, getState, getCity, getLocation, getSociety, detailSociety, deleteSociety, updateSociety, deleteSelectSociety }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(SocietyManagementDetail);