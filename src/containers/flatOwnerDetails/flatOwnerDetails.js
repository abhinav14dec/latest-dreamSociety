import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Form,Modal,ModalBody,ModalHeader, FormGroup, Input, Button, Label, Col, Row } from 'reactstrap';
import Select from 'react-select';
import { PlaceHolder } from '../../actionCreators/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { detailSociety } from '../../actions/societyMasterAction';
import { viewTower } from '../../actions/towerMasterAction';
import { getRelation } from './../../actions/relationMasterAction';
import {getFlatDetails,getSlots} from '../../actions/flatDetailMasterAction';
import {addFlatOwner,getAllFloor} from '../../actions/flatOwnerAction';
import {Link} from 'react-router-dom';
import {getCountry,getState,getCity, getLocation} from '../../actions/societyMasterAction';
import {getRfId} from '../../actions/rfIdAction';

class FlatOwnerDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            tab: "none",
            step: 1,
            societyId: '',
            countryName: '',
            countryId:'',
            stateName: '',
            stateId:'',
            cityName: '',
            cityId:'',
            locationName: '',
            locationId:'',
            number: '',
            firstName: '',
            lastName:'',
            DOB: '',
            email: '',
            tower: '',
            errors: {},
            societyName: '',
            flatNO:'',
            flatDetailIds:[],
            profilePicture:'',
            currentAddress:'',
            permanentAddress:'',
            familyMember:'',
            member:[],
            ownerGender:'',
            message:'',
            emailError:false,
            modal: false,
            loading: true,
            Aadhaar:'',
            floorId:'',
            society:'',
            towerName:'',
            floorName:'',
            defaultPermanent: false,
            permanentAddrDefault:true,
            permanentAddressUser:'',
            pinCode:'',
            flat:'flatNo.',
            permanentPinCode:'',
            pin:'',
            documentOne:'',
            towerId1:'',
            floorId1:'',
            towerName1:'',
            floorName1:'',
            fingerPrint:'',
            rfidId:'',

        }
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentDidMount() {
        this.props.detailSociety();
        this.props.viewTower();
        this.props.getRelation();
        this.props.getFlatDetails();
        this.props.getCountry()
        this.props.getState()
        this.props.getCity()
        this.props.getLocation()
        this.props.getRfId()
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close = () => {
        return this.props.history.replace('/superDashBoard')
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
    getTower = ({ tower }) => {
        if (tower && tower.tower) {
            return tower.tower.map((item) => {
                return (
                    { ...item, label: item.towerName, value: item.towerId }
                )
            }
            );
        }
        return [];
    }
    getflat=({details})=>{
    if(details && details.flatDetail){
        return details.flatDetail.map((item)=>{
            return (
                {...item,label:item.flatNo,value:item.flatDetailId}
            )
        })
   }
    }
    societyChangeHandler = (selectOption) => {
        let countryName = selectOption.country_master?selectOption.country_master.countryName:'';
        let countryId= selectOption.country_master?selectOption.country_master.countryId:'';
        let stateName = selectOption.state_master?selectOption.state_master.stateName:'';
        let stateId = selectOption.state_master.stateId;
        let cityName = selectOption.city_master.cityName?selectOption.city_master.cityName:'';
        let cityId = selectOption.city_master.cityId;
        let locationName = selectOption.location_master.locationName;
        let locationId = selectOption.location_master.locationId;
        this.setState(function (prevState, props) {
            return {
                'societyName': selectOption.value,
                countryName,
                stateName,
                cityName,
                locationName,
                locationId,
                cityId,
                stateId,
                countryId,
                society:selectOption.label,
                currentAddress:selectOption.label+','+locationName+','+cityName+','+stateName+' '+','+countryName
            }
        }, function () {
        });
    }
    towerChangeHandler = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value,
                towerName:selectOption.label
            }
        }, function () {
        });
        this.props.getAllFloor(selectOption.towerId);
    }
    towerChangeHandler1 = (name, selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value,
                towerName1:selectOption.label
            }
        }, function () {
        });
        this.props.getAllFloor(selectOption.towerId1);
    }
    flatChangeHandler=(name,selectOption)=>{
        let flatName=selectOption.label
        this.setState({
            [name]: selectOption.value,
            currentAddress:this.state.flat+flatName+','+this.state.floorName+','+this.state.towerName+','+this.state.currentAddress+' '+this.state.pinCode
        },function (){
            this.props.getSlots(this.state.flatDetailIds)
            .then(()=>{this.getParking(this.props.flatDetailMasterReducer)})
        })
    }
    flatChangeHandler1=(name,selectOption)=>{
        this.setState({
            [name]: selectOption.push(selectOption.value),
        })
    }
    floorChangeHandler=(name,selectOption)=>{
        this.setState({
            [name]: selectOption.value,
            floorName:selectOption.label
        })

    }
    floorChangeHandler1=(name,selectOption)=>{
        this.setState({
            [name]: selectOption.value,
            floorName1:selectOption.label
        })

    }
    relationHandler = (name,selectOption) => {
        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value
            }
        }, function () {
            
        })
    }
    memberRfIdChangeHandler=(name,selectOption)=>{
        this.setState({
            [name]: selectOption.value
        })
    }
    maxDateMember = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    maxDate = () => {
        var d = new Date();
        d.setFullYear(d.getFullYear()-18, d.getMonth());
        return d.toISOString().split('T')[0];
    }
    nextPrev = () => {
        let errors = {};
        const { societyName,pin, number, firstName,lastName, ownerGender,permanentAddressUser, DOB, email, towerId, flatDetailIds,Aadhaar, floorId } = this.state
        if (this.state.step === 1) {
            if (firstName === '') {
                errors.firstName = "First Name can't be empty"
            }
           else if (lastName === '') {
                errors.lastName = "Last Name can't be empty"
            }
            else if (DOB === '') {
                errors.DOB = "Date of birth can't be empty"
            }
            else if (ownerGender === '') {
                errors.ownerGender = "Gender can't be empty"
            }
            else if (number.length <= 9) {
                errors.number = "Please enter 10 digit number"
            }
            else if (email === '') {
                errors.email = "email can't be empty"
            }
            if(Aadhaar === '') errors.Aadhaar=`Aadhaar Number can't be empty.`
            else if (societyName === '') {
                errors.societyName = "society name can't be empty"
            }
            else if (towerId === '') {
                errors.towerId = "tower can't be empty"
            }
            else if(floorId===''){
                errors.floorId="floor can't be empty"
            }
            else if (flatDetailIds.length===0) {
                errors.flatNO = "flat number can't be empty"
            }

            else if(Aadhaar.length !== 12) errors.Aadhaar=`Aadhaar Number should be of 12 digit.`
            if(document.getElementById('isChecked').checked === false){
                if(pin === '') errors.pin = `Pin/Zip code can't be empty.`
                if(permanentAddressUser === '') errors.permanentAddressUser = `Permanent Address can't be empty.`;
            }
            const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }
        }
        const isValid = Object.keys(errors).length === 0
            this.setState({ errors });
            if (isValid) {
                this.setState({ step: this.state.step + 1 })
            }

    }
    onChangeHandler = (event) => {
        this.setState({message:''})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }

    }
    getRelationList = ({ relationResult }) => {
        if (relationResult) {
            return relationResult.relation.map((item) => {
                return (
                    { ...item, label: item.relationName, value: item.relationId }
                )
            }
            );
        }
        return [];

    }
    userMemberHandler = (e) => {
        if (e.target.value != '') {
            this.setState({
                familyMember: e.target.value
            });
        }
    }
    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
OnKeyPresshandlerEmail=(event)=> {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    let inputChar = event.target.value;
    if (!pattern.test(inputChar)) {
        this.setState({
            emailError:true
        })
    }
    else{
        this.setState({
            emailError:false
        })
    }
}
    onSubmit=(e)=>{
        e.preventDefault();
        const {          
            number,
            firstName,
            lastName,
            DOB,
            email,
            towerId,
            flatDetailIds,
            familyMember,
            profilePicture,
            societyName,
            permanentAddress,
            countryName,
            stateName,
            cityName,
            countryId,
            stateId,
            cityId,
            locationId,
            locationName,
            member,
            fileName,
            ownerGender,Aadhaar,floorId,rfidId} = this.state
            const d = new FormData()
            d.append('profilePicture',this.state.profilePicture)
            let data;        
            for(let i = 0; i < this.state.familyMember; i++){
                 data={
                    memberFirstName: this.state['memberFirstName'+i],
                    memberLastName: this.state['memberLastName'+i],
                    memberDob: this.state['memberDOB'+i],
                    relationId: this.state['relationName'+i],
                    gender:this.state['gender'+i],
                    memberRfId:this.state['memberRfId'+i],
                    memberContact:this.state['memberContact'+i],
                    memberEmail:this.state['memberEmail'+i],
                    flatDetailId:this.state.flatDetailIds
                }
                this.state.member.push(data)
            }
           
            this.setState({loading: true})
            this.props.addFlatOwner(this.state)
            .then(() => this.props.history.push('/superDashBoard/flatOwnerList'))
            .catch(err=>{
                this.setState({message:err.response.data.message})
                this.toggle()
                
            })
        

        }
        toggle = () => {
                    this.setState({
                        modal: !this.state.modal
                    })
                }
                onModalClosed=()=>{
                   this.setState({
                       step:1
                   })
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
 onFileChange=(event)=>{

    const files = event.target.files;
    const file = files[0];
    const fileNamedoc=file.name
    if (files && file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload =  () =>{
          this.setState({
            documentOne :
              reader.result,
              fileNamedoc
          })
       
      };
    }
   
}
  changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
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
    changePassword=()=>{
          
        return this.props.history.replace('/superDashboard/changePassword')
      }
      onCurrentAddressChangeHandler=(event)=>{
          const {countryName,stateName,cityName,locationName,society,pinCode}=this.state
        this.setState({
            currentAddress:event.target.value+', '+society+', '+' '+locationName+', '+cityName+','+stateName+','+countryName+' '+pinCode
        },function(){
        })

      }
      sameAddress = (e) => {
        if(!!document.getElementById('isChecked').checked){
           this.setState({permanentAddress: this.state.currentAddress.trim(), defaultPermanent:true,
        permanentAddrDefault:false})
           
        }
       else{
            this.setState({permanentAddress: '', defaultPermanent:false, permanentAddrDefault:true})
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
        })
        this.props.getState(selectOption.countryId)
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
    onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    onChangeState = ( stateName,stateId,selectOption) => {
        this.setState({
            stateName: selectOption.stateName,
            stateId:selectOption.stateId,
            cityName:'',
            cityId:'',
            locationName:'',
            locationId:''
        })
        this.props.getCity(selectOption.stateId);
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
            cityId:selectOption.cityId,
            locationName:'',
            locationId:''
        })
        this.props.getLocation(selectOption.cityId)
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
     RfID=({ownerRf})=>{
         if(ownerRf && ownerRf.rfids){
             return (
                ownerRf.rfids.map((item)=>{
                    return ({ ...item, label:item.rfid, value:item.rfidId})
                })
             )
         }
     }

     onChangeLocation = (locationName, locationId, selectOption) => {
         this.setState({
             locationName: selectOption.locationName,
             locationId:selectOption.locationId,
            
         })
     }
     permanentAddressChange = (e) => {
        this.setState({[e.target.name]: e.target.value, 
            permanentAddress: this.state.permanentAddressUser + ',' + this.state.locationName + ',' +
        this.state.cityName + ' , ' + this.state.stateName + ',' + this.state.countryName+' '+this.state.pin })
    }
    getParking=({ slots })=>{
this.setState({totalParking:slots.slots?slots.slots.count:'total slot unavailable',parkingName:slots.slots.rows[0].parking_master?slots.slots.rows[0].parking_master.parkingName:'parking is unavailable'})
    }

    rfIdChangeHandler=(selectOption)=>{
        this.setState({
            rfidId:selectOption.rfidId
        })

    }
      
    render() {
            
        let userDatas = [];
        for (let i = 0; i < this.state.familyMember; i++) {
           
            userDatas.push(<FormGroup key={i} >
                <Row form>
                    <Col md={3}>
                        <Label>First Name</Label>
                        <Input placeholder="Enter First Name" name={`memberFirstName${i}`} onChange={this.onChangeHandler} onKeyPress={this.onKeyPressHandler}/>
                    </Col>
                    <Col md={3}>
                        <Label>Last Name</Label>
                        <Input placeholder="Enter Last Name" name={`memberLastName${i}`} onChange={this.onChangeHandler} onKeyPress={this.onKeyPressHandler}/>
                    </Col>
                    <Col md={3}>
                        <Label>Relation With Owner</Label>
                        <Select options={this.getRelationList(this.props.relationList)}
                            onChange={this.relationHandler.bind(this,'relationName'+i )}
                            placeholder={PlaceHolder}
                            name={`relationName${i}`}/>
                    </Col>
                    <Col md={3}>
                                <Label>Date Of Birth</Label>
                                <Input  type='date' max={this.maxDateMember()} name={`memberDOB${i}`} onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.DOB}</span>
                                </Col>
                    <Col md={3}>
                                <Label>Gender</Label>
                                <div>
                                <div>
                                <Label style={{paddingRight:' 55px'}}>Male</Label>
                                <span><Input type="radio" name={'gender'+i} onChange={this.onChangeHandler} value="male"/></span>
                                </div>
                                <div>
                                <Label style={{paddingRight:' 35px'}}>Female</Label>
                                <span><Input type="radio" name={'gender'+i} onChange={this.onChangeHandler} value="female"/></span>
                                </div>
                                <div>
                                <Label style={{paddingRight:' 49px'}}>Other</Label>
                                <span><Input type="radio" name={'gender'+i} onChange={this.onChangeHandler} value="other"/></span>
                                </div>
                                </div>
                                </Col>
                            </Row>
                            <Row>
                            <Col md={6}>
                            <Label>Contact Number</Label>
                                <Input placeholder="Contact Number" onKeyPress={this.OnKeyPresshandlerPhone} type="text" maxLength={10}  onChange={this.onChangeHandler} name={`memberContact${i}`} />   
                             </Col>
                             <Col md={6}>
                             <Label>Email </Label>
                                <Input placeholder="Email" type='email' name={`memberEmail${i}`} 
                                onChange={this.onChangeHandler} 
                                onBlur={this.OnKeyPresshandlerEmail}
                                onKeyPress={this.OnKeyPresshandlerEmail} />
                             </Col>
                             </Row>
                            <FormGroup>
                                <Label>RF ID</Label>
                                <Select placeholder={PlaceHolder} name={'memberRfId'+i} options={this.RfID(this.props.rfId)} onChange={this.memberRfIdChangeHandler.bind(this,'memberRfId'+i )}/>
                            </FormGroup>
            </FormGroup>);
        }
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.onSubmit} style={{width: '769px'}}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div style={{ 'display': this.state.step == 1 ? 'block' : 'none' }}>
                            <h3>Flat Owner Details</h3>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input  style={{'textTransform': 'capitalize' }} placeholder="First Name" onKeyPress={this.onKeyPressHandler} maxLength={50} name='firstName' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.firstName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input  style={{'textTransform': 'capitalize' }} placeholder="Last Name" onKeyPress={this.onKeyPressHandler} maxLength={50} name='lastName' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.lastName}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Date Of Birth</Label>
                                <Input  type='date' max={this.maxDate()} name='DOB' onChange={this.onChangeHandler} />
                                <span className="error">{this.state.errors.DOB}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label style={{paddingRight:'25px'}}>Gender:</Label>
                                <span ><Input type="radio" id="Gender1" name="ownerGender" onChange={this.onChangeHandler} value="male"/></span>
                                <Label htmlFor="Gender1" style={{paddingRight:'35px',paddingLeft:'20px'}}>Male</Label>
                                {/* <span><Input type="radio" id="Gender1" name="ownerGender" onChange={this.onChangeHandler} value="male"/></span> */}
                                
                                <span><Input type="radio" id="Gender2" name="ownerGender" onChange={this.onChangeHandler} value="female"/></span>
                                <Label htmlFor="Gender2" style={{paddingRight:'35px',paddingLeft:'20px'}}>Female</Label>
                                {/* <span><Input type="radio" id="Gender2" name="ownerGender" onChange={this.onChangeHandler} value="female"/></span> */}
                               
                                <span><Input type="radio" id="Gender3" name="ownerGender" onChange={this.onChangeHandler} value="other"/></span>
                                <Label htmlFor="Gender3" style={{paddingRight:'35px',paddingLeft:'20px'}}>Other</Label>
                                {/* <span><Input type="radio" id="Gender3" name="ownerGender" onChange={this.onChangeHandler} value="other"/></span> */}
                                <span className="error">{this.state.errors.ownerGender}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input placeholder="Contact Number" onKeyPress={this.OnKeyPresshandlerPhone} type="text" maxLength={10} value={this.state.number} onChange={this.onChangeHandler} name="number" />
                                <span className="error">{this.state.errors.number}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email </Label>
                                <Input placeholder="Email" type='email' name='email' 
                                onChange={this.onChangeHandler} 
                                onBlur={this.OnKeyPresshandlerEmail}
                                onKeyPress={this.OnKeyPresshandlerEmail} />
                                <span className="error">{this.state.errors.email}</span>
                                <span style={{display:this.state.emailError?'block':'none',color:'red'}}>email is not valid</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Aadhaar Number</Label>
                                <Input placeholder='Aadhaar Number' onChange={this.onChangeHandler} name='Aadhaar' onKeyPress={this.OnKeyPresshandlerPhone} type="text"  maxLength={12}/>
                                <span className="error">{this.state.errors.Aadhaar}</span>
                            </FormGroup>

                            <FormGroup>
                                <Label>Society Name</Label>
                                <Select options={this.getSociety(this.props.societyName)}
                                    onChange={this.societyChangeHandler.bind(this)}
                                    placeholder={PlaceHolder} />
                                    {!this.state.societyName ? <span className="error">{this.state.errors.societyName}</span> : ''}
                                {/* <span className="error">{this.state.errors.societyName}</span> */}
                            </FormGroup>
                            <FormGroup>
                                <Label>Country</Label>
                                <Input readOnly placeholder="Country" type='text' value={this.state.countryName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>State</Label>
                                <Input readOnly type="text" placeholder="State Name" value={this.state.stateName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>City</Label>
                                <Input readOnly type="text" placeholder="City Name" value={this.state.cityName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Location</Label>
                                <Input readOnly type="text" placeholder="Location Name" value={this.state.locationName} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Pin Code</Label>
                                <Input type="text" placeholder="Enter Pin Code " name="pinCode" onChange={this.onChangeHandler} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={6}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tower</Label>
                                <Select options={this.getTower(this.props.towerList)}
                                    onChange={this.towerChangeHandler.bind(this, 'towerId')}
                                    placeholder={PlaceHolder} />
                                <span className="error">{this.state.errors.towerId}</span>
                            </FormGroup >
                            <FormGroup>
                                <Label>Floor</Label>
                                <Select options={this.getFloor(this.props.towerFloor)} 
                                placeholder={PlaceHolder}
                                name="floorId"
                                onChange={this.floorChangeHandler.bind(this,'floorId')}
                                />
                                <span className="error">{this.state.errors.floorId}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Flat Number</Label>
                                <Select options={this.getFlats(this.props.towerFloor)}
                                    placeholder={PlaceHolder} 
                                    name="flatDetailIds"
                                  onChange={this.flatChangeHandler.bind(this,'flatDetailIds')}
                                    />
                                     <span className="error">{this.state.errors.flatNO}</span>
                            </FormGroup >
                            {/* {this.getParking(this.props.flatDetailMasterReducer)} */}
                            <FormGroup>
                                <Label> Parking Name</Label>
                                <Input readOnly type="text"  name="parkingName" value={this.state.parkingName}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Total Parking Available</Label>
                                <Input readOnly type="text"  name="totalParking" value={this.state.totalParking}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Current Address</Label>
                                <Input readOnly type="text" style={{ 'textTransform': 'capitalize' }} maxLength={100} placeholder="Current Address" name="currentAddress" value={this.state.currentAddress}/>
                            </FormGroup >
                            <FormGroup>
                            Is Your permanent address same as current address?<Input type="checkbox" onChange={this.sameAddress} name="isChecked" id="isChecked" className="ml-3" />
                        </FormGroup>
                        <h3 style={{textAlign:'center'}}>Permanent Address</h3>
                        {this.state.defaultPermanent ? <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input id="permanentaddr" disabled type="textarea" onChange={this.onChange}
                            maxLength="250" value={this.state.permanentAddress}
                             name="permanentAddress" placeholder="Permanent Address" />
                             {<span className="error">
                                {this.state.errors.permanentAddress}
                            </span>}
                        </FormGroup> : ''}
                        {this.state.permanentAddrDefault ? <div>
                            <FormGroup>
                            <Label>Country</Label>
                            <Select placeholder={PlaceHolder}  options={this.countryName(this.props.societyName)} onChange={this.onChangeCountry.bind(this, 'countryName', 'countryId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>State</Label>
                            <Select placeholder={PlaceHolder} options={this.stateName(this.props.societyName)} onChange={this.onChangeState.bind(this, 'stateName', 'stateId')}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>City</Label>
                            <Select  placeholder={PlaceHolder} options={this.cityName(this.props.societyName)} onChange={this.onChangeCity.bind(this, 'cityName', 'cityId')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Location</Label>
                            <Select placeholder={PlaceHolder} options={this.locationName(this.props.societyName)} onChange={this.onChangeLocation.bind(this, 'locationName', 'locationId')} />
                        </FormGroup>
                        <FormGroup>
                                <Label>Pin Code</Label>
                                <Input type="text" placeholder="Enter Pin Code " name="pin" onChange={this.onChangeHandler} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={6}/>
                                <span className="error">{this.state.errors.pin}</span>
                            </FormGroup>
                        <FormGroup>
                            <Label>Permanent Address</Label>
                            <Input type="textarea" onChange={this.permanentAddressChange} value={this.state.permanentAddressUser}
                            maxLength={50}
                             name="permanentAddressUser" placeholder="Permanent Address"/>
                             {<span className="error">
                                {this.state.errors.permanentAddressUser}
                            </span>}
                        </FormGroup>
                        </div> : ''}
                        </div>
                        <div style={{ 'display': this.state.step === 2 ? 'block' : 'none' }}>
                            <h3>Owner Member Details</h3>
                            <FormGroup>
                                <Label>Number of Member</Label>
                                <Input placeholder="number of member" type='text' onKeyPress={this.OnKeyPresshandlerPhone} name="familyMember" onChange={this.userMemberHandler} />
                            </FormGroup>
                            {/* <div style={{ 'display': this.state.step == 1 ? 'block' : 'none' }}>
                            <div>Other Flats</div>
                            <FormGroup>
                            <Label>Tower</Label>
                                <Select options={this.getTower(this.props.towerList)}
                                    onChange={this.towerChangeHandler1.bind(this, 'towerId1')}
                                    placeholder={PlaceHolder} />
                                <Label>Floor</Label>
                                <Select options={this.getFloor(this.props.towerFloor)} 
                                placeholder={PlaceHolder}
                                name="floorId1"
                                onChange={this.floorChangeHandler1.bind(this,'floorId1')}
                                />
                               <Label>Flat Number</Label>
                                <Select options={this.getFlats(this.props.towerFloor)}
                                    placeholder={PlaceHolder} 
                                    name="flatDetailIds"
                                  onChange={this.flatChangeHandler1.bind(this,'flatDetailIds')}
                                    />
                            </FormGroup>
                            </div>   */}
                            {userDatas}
                 
                            <FormGroup>
                            <Label>Upload Profile Pic</Label>                               
                                <Input accept='image/*' style={{display:'inline-block'}}type="file" name ="profilePic" onChange={this.FileChange} />
                                <div>
                                 <img src={this.state.profilePicture} height='100px' width='100px' />
                                 </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>RF ID</Label>
                                <Select placeholder={PlaceHolder} options={this.RfID(this.props.rfId)} name='rfidId' onChange={this.rfIdChangeHandler.bind(this)}/>
                            </FormGroup>
                            {/* <Label>upload your ID</Label> 
         <input  accept='.docx ,.doc,application/pdf' type="file"   name ="documentOne" onChange={this.onFileChange}/> */}
                        </div>
                        <div>
                        <Link to='/superDashBoard/flatOwnerList'>
                <Button color="danger" className="mr-2" style={{ display: this.state.step == 1 ? 'inline-block' : 'none', marginLeft: '20px'}} >Cancel</Button>
                              </Link>
                            <Button className="mr-2" color="danger" type="button" id="prevBtn" style={{ display: this.state.step == 1 ? 'none' : 'inline-block' }} disabled={this.state.step == 1} onClick={() => { this.setState({ step: this.state.step - 1 }) }}>Previous</Button>
                            <Button type="button" color="primary" id="nextBtn" style={{ display: this.state.step == 2 ? 'none' : 'inline-block' }} disabled={this.state.step == 3} onClick={this.nextPrev}>Next</Button>
                            <Button type="submit" color="success" style={{ display: this.state.step == 2 ? 'inline-block' : 'none' }}>Submit</Button>

                        </div>
                    </Form>
                    <Modal isOpen={this.state.modal} toggle={this.toggles} onClosed={this.onModalClosed}>
                    <ModalHeader toggle={this.toggle}>Error Message</ModalHeader>
                    <ModalBody>
                        <h1 style={{display:"block",background: 'black'}}>{this.state.message}</h1> 
                    </ModalBody>
                    </Modal>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        societyName: state.societyReducer,
        towerList: state.TowerDetails,
        relationList: state.RelationMasterReducer,
        towerFloor:state.FlatOwnerReducer,
        flatDetailMasterReducer: state.flatDetailMasterReducer,
        rfId:state.RFIdReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({detailSociety, viewTower, getRelation,getFlatDetails,addFlatOwner,getAllFloor,getCountry,getState,getCity, getLocation,getFlatDetails,getSlots,getRfId}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FlatOwnerDetails);

