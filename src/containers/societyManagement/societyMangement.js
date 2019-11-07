import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity,getLocation,postSociety,getSociety} from '../../actions/societyMasterAction';
import _ from 'underscore';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label, Row, Col } from 'reactstrap';
import Spinner from '../../components/spinner/spinner'
import DefaultSelect from '../../constants/defaultSelect';




class SocietyMangement extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            countryName:'',
            stateName:'',
            cityName:'',
            locationName:'',
            countryId:'',
            stateId:'',
            cityId:'',
            locationId:'',
            societyName:'',
            societyAddress:'',
            bankName:'',
            accountHolderName:'',
            accountNumber:'',
            IFSCCode:'',
            email:'',
            contactNumber:'',
            registrationNumber:'',
            totalBoardMembers:'',
            errors: {},
            loading:true,
         
            menuVisible: false,
            
           
        }
      
        this.cityName=this.cityName.bind(this);

        
    }

  
    componentDidMount=()=>{
           this.props.getCountry().then(()=> this.setState({loading:false}))
           this.props.getState()
           this.props.getCity()
           this.props.getLocation()
           this.props.getSociety()              
    }

    refreshData=()=>{
        this.props.postSociety()
    }

    onChangeCountry= (event)=>{
        this.onChange(event);
        let selected= event.target.value
        var country = _.find(this.props.societyReducer.countryResult,function(obj){
            return obj.countryName === selected
            })
        
            this.setState({
                countryName: country.countryName,
                countryId:country.countryId
            })
            
            this.props.getState(country.countryId)
          
    }

    
    onChangeState= (event)=>{
        this.onChange(event);
      
        let selected= event.target.value  
        var data1 = _.find(this.props.societyReducer.stateResult,function(obj){
            return obj.stateName === selected
            })
    
            this.setState({
                stateName: data1.stateName,
                stateId:data1.stateId
            })
        
            this.props.getCity(data1.stateId);
            
         
    }

    onChangeCity= (event)=>{
        this.onChange(event);
        let selected= event.target.value
    
        var data2 = _.find(this.props.societyReducer.cityResult,function(obj){
            return obj.cityName === selected
            })
    
    
            this.setState({
                cityName:data2.cityName,
                cityId:data2.cityId
            })
            
        this.props.getLocation(data2.cityId)

    }

    onChangeLocation= (event)=>{
        this.onChange(event);
         let selected= event.target.value
        var data3 = _.find(this.props.societyReducer.locationResult,function(obj){
            return obj.locationName === selected
            })

            this.setState({
                locationName:data3.locationName,
                locationId:data3.locationId
            })

            this.props.getSociety(data3.locationId)
  
    }



    
    countryName({countryResult}){
        if(countryResult){
          
           return( 
            countryResult.map((item) =>{
                   return(
                       <option key={item.countryId} value={item.countryName}>
                        {item.countryName}
                       </option>
                   )
               })
           )
            
        }
    }

    stateName({stateResult}){
        if(stateResult){
          
           return( 
            stateResult.map((item) =>{ 
                   return(
                       <option key={item.stateId} value={item.stateName}>
                        {item.stateName}
                       </option>
                   )
               })
           )
            
        }
    }

    cityName=({cityResult})=>{
       
        if(cityResult){
           return( 
            cityResult.map((item) =>{ 
                   return(
                       <option key={item.cityId} value={item.cityName}>
                        {item.cityName}
                       </option>
                   )
               }
               )
           )
            
        }
    }

    locationName({locationResult}){
        if(locationResult){
          
           return( 
            locationResult.map((item) =>{ 
                   return(
                       <option key={item.locationId} value={item.locationName}>
                        {item.locationName}
                       </option>
                   )
               })
           )
            
        }
    }

    
    
    onChange=(e) =>{
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

   

    handleSubmit=(e)=>{
        e.preventDefault();

        let errors = {};
        if (!this.state.countryName) {
            errors.countryName = "cant be empty"
        }
        if (this.state.stateName === '') errors.stateName = "cant be empty";
        this.setState({ errors });

        if (this.state.cityName === '') errors.cityName = "cant be empty";
        this.setState({ errors });

        if (this.state.locationName === '') errors.locationName = "cant be empty";
        this.setState({ errors });

        if (this.state.societyName === '') errors.societyName = "cant be empty";
        this.setState({ errors });

        if (this.state.societyAddress === '') errors.societyAddress = "cant be empty";
        this.setState({ errors });

        if (this.state.bankName === '') errors.bankName = "cant be empty";
        this.setState({ errors });

        if (this.state.accountHolderName === '') errors.accountHolderName = "cant be empty";
        this.setState({ errors });

        if (this.state.accountNumber === '') errors.accountNumber = "cant be empty";
        this.setState({ errors });

        if (this.state.IFSCCode === '') errors.IFSCCode = "cant be empty";
        this.setState({ errors });

        if (this.state.email === '') errors.email = "cant be empty";
        this.setState({ errors });

        if (this.state.contactNumber === '') errors.contactNumber = "cant be empty";
        this.setState({ errors });

        if (this.state.registrationNumber === '') errors.registrationNumber = "cant be empty";
        this.setState({ errors });

        if (this.state.totalBoardMembers === '') errors.totalBoardMembers = "cant be empty";
        this.setState({ errors });



        const isValid = Object.keys(errors).length === 0;
        
        if(isValid) {
        
         this.setState({loading:true})
        this.props.postSociety(this.state)
        .then(() => this.props.history.push('/superDashboard/societyManagementDetail'))

        this.setState({
          state:{
            countryName:'',
            stateName:'',
            cityName:'',
            locationName:'',
            countryId:'',
            stateId:'',
            cityId:'',
            locationId:'',
            societyName:'',
            societyAddress:'',
            bankName:'',
            accountHolderName:'',
            accountNumber:'',
            IFSCCode:'',
            email:'',
            contactNumber:'',
            registrationNumber:'',
            totalBoardMembers:'',

            
           
          }
        });
      }
    }


    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }

    societyDetails=()=>{
        this.props.history.push('/superDashboard/societyManagementDetail');
    }

    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    onKeyPressSociety=(event)=> {
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

       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }



    render() {
        // console.clear();
        let form;
        if(!this.state.loading && this.props.societyReducer.countryResult && this.props.societyReducer.stateResult && this.props.societyReducer.cityResult && this.props.societyReducer.locationResult && this.state.errors){
            form= <div>
            
            <FormGroup>
            <Label>Society Name</Label>
            <Input placeholder="Society Name" type="text" name="societyName" onChange={this.onChange} onKeyPress={this.onKeyPressSociety} maxLength={100}/>
             <span className='error'>{this.state.errors.societyName}</span>
           </FormGroup>
           
           <Row form>
            <Col md={6}>
            <FormGroup>
            <Label>Country Name</Label>
            <Input type="select" defaultValue='no-value' name="countryName"  onChange={this.onChangeCountry} >
                <DefaultSelect/>
                {this.countryName(this.props.societyReducer)}
            </Input>
            <span className='error'>{this.state.errors.countryName}</span>
        </FormGroup>
        </Col>
        
            <Col md={6}>
        <FormGroup>
            <Label>State Name</Label>
            <Input type="select" defaultValue='no-value' name="stateName"   onChange={this.onChangeState} >
           <DefaultSelect/>
                {this.stateName(this.props.societyReducer)}
            </Input>
             <span className='error'>{this.state.errors.stateName}</span>
        </FormGroup>
        </Col>
        </Row>
         
        <Row form>
            <Col md={6}>
        <FormGroup>
            <Label>City Name</Label>
            <Input type="select" defaultValue='no-value' name="cityName"  onChange={this.onChangeCity}>
           <DefaultSelect/>
                {this.cityName(this.props.societyReducer)}  
            </Input>
            <span className='error'>{this.state.errors.cityName}</span>
        </FormGroup>
        </Col>
        
        <Col md={6}>
        <FormGroup>
            <Label>Location Name</Label>
            <Input type="select" defaultValue='no-value' name="locationName"  onChange={this.onChangeLocation}>
               <DefaultSelect/>
                {this.locationName(this.props.societyReducer)}
            </Input>
            <span className='error'>{this.state.errors.locationName}</span>
        </FormGroup>
        </Col>
        </Row>

        <FormGroup>
            <Label>Society Address</Label>
            <Input placeholder="Society Address" type="textarea" name="societyAddress"  onChange={this.onChange}  onKeyPress={this.onKeyPressHandler} maxLength={300}/>
             <span className='error'>{this.state.errors.societyAddress}</span>
        </FormGroup>
        
        <Row form>
            <Col md={6}>
        <FormGroup>
            <Label>Bank Name</Label>
            <Input placeholder="Bank Name" type="text" name="bankName"  onChange={this.onChange}  onKeyPress={this.onKeyPressHandler} maxLength={50}/>
             <span className='error'>{this.state.errors.bankName}</span>
        </FormGroup>
        </Col>
        
        <Col md={6}>
        <FormGroup>
            <Label>IFSC Code</Label>
            <Input placeholder="IFSC Code" type="text" name="IFSCCode"  onChange={this.onChange}   maxLength={20}/>
             <span className='error'>{this.state.errors.IFSCCode}</span>
        </FormGroup>
        </Col>
        </Row>
        
        
        
        <FormGroup>
            <Label>Account Holder Name</Label>
            <Input placeholder="Account Holder Name" type="text" name="accountHolderName"  onChange={this.onChange}  onKeyPress={this.onKeyPressHandler} maxLength={200}/>
             <span className='error'>{this.state.errors.accountHolderName}</span>
        </FormGroup>

        <FormGroup>
            <Label>Account Number</Label>
            <Input placeholder="Account Number" type="text" name="accountNumber"  onChange={this.onChange}  onKeyPress={this.OnKeyPresshandlerPhone} maxLength={20}/>
             <span className='error'>{this.state.errors.accountNumber}</span>
        </FormGroup>

       
         
        <Row form>
            <Col md={6}>
        <FormGroup>
            <Label>Email Id</Label>
            <Input placeholder="Email Id" type="email" name="email"  onChange={this.onChange}  maxLength={200} required/>
             <span className='error'>{this.state.errors.email}</span>
        </FormGroup>
        </Col>


        <Col md={6}>
        <FormGroup>
            <Label>Contact No.</Label>
            <Input placeholder="Contact No." type="text" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={10}/>
             <span className='error'>{this.state.errors.contactNumber}</span>
        </FormGroup>
        </Col>
        </Row>
        

        <Row form>
            <Col md={6}>
        <FormGroup>
            <Label>Registration No.</Label>
            <Input placeholder="Society Registration No." type="text" name="registrationNumber" value={this.state.registrationNumber} onChange={this.onChange}  maxLength={50}/>
             <span className='error'>{this.state.errors.registrationNumber}</span>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
            <Label>Total Board Members</Label>
            <Input placeholder="Total Board Members" type="text" name="totalBoardMembers" value={this.state.totalBoardMembers} onChange={this.onChange} onKeyPress={this.OnKeyPresshandlerPhone} maxLength={3}/>
             <span className='error'>{this.state.errors.totalBoardMembers}</span>
        </FormGroup>
        </Col>
        </Row>

    
      
          <Button color="success" className="mr-2">Submit</Button>
          <Button color="danger" onClick={this.societyDetails}>Cancel</Button>
          </div>
   
        }
        return (
           <div>
               <UI onClick={this.logout} chnage={this.changePassword}>
               <Form  onSubmit={this.handleSubmit}>
               <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                 <h3 style={{textAlign:'center', marginBottom: '10px'}}>Society Master</h3>
                 {!this.state.loading ? form : <Spinner />}
                </Form>
               </UI>
            </div> 
        );
    }
}

function mapStateToProps(state) {
   

    return {
        societyReducer: state.societyReducer    
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity,getLocation,postSociety, getSociety}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(SocietyMangement));