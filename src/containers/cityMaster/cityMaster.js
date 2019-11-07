import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity, addCity,detailCity} from './../../actions/cityMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner'
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import DefaultSelect from './../../constants/defaultSelect';




class CityMaster extends Component {
    constructor(props) {
        super(props);
       

        this.state = {
            cityName:'',
            countryName:'',
            stateName:'',
            countryId:'',
            stateId:'',
            stetName:'',
            loading: true,
            errors: {},
            message:'',
           

            menuVisible: false,
         }

        this.cityName=this.cityName.bind(this);
        


    }


    componentDidMount=()=>{
           this.refreshData()     
    }

    refreshData=()=>{
        this.props.getCountry().then(() => this.setState({loading: false}));
        this.props.getState().then(() => this.setState({loading: false}));
        this.props.getCity().then(() => this.setState({loading: false}));
    }

    onChangeCountry= (event)=>{
     
        this.onChange(event);

        let selected= event.target.value
        var country = _.find(this.props.cityMasterReducer.countryResult,function(obj){
            return obj.countryName === selected
            })
        console.log(country,"===========")
            this.props.getState(country.countryId).then(() => this.setState({countryId: country.countryId,
                countryName: country.countryName, stateName:'', stateId:''}))

    }


    onChangeState= (event)=>{
        this.setState({loading: false})
        this.onChange(event);
        let selected= event.target.value
       
        var data1 = _.find(this.props.cityMasterReducer.stateResult,function(obj){
            return obj.stateName === selected
            })

            this.props.getCity(data1.stateId);

            this.setState({
                stateId: data1.stateId,
                stateName:data1.stateName
            })


    }

    onCityChange=(e)=>{
      this.setState({
          [e.target.name]:e.target.value

      })
    }

    countryName=({countryResult})=>{
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
               }
               ) 
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


    onChange=(e) =>{
        this.setState({message:'' })
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }
    onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        let errors = {};
        if (!this.state.countryName) {
            errors.countryName = "cant be empty"
        }
        else if(this.state.stateName === ''){
            errors.stateName = "cant be empty";
        } 

        else if(this.state.cityName === ''){
            errors.cityName = "cant be empty";
        } 
        
        this.setState({ errors });

  
      


        const isValid = Object.keys(errors).length === 0;

        if(isValid){
           
                    this.setState({loading:true})
                    this.props.addCity(this.state)
                    .then(()=>this.props.history.push('/superDashboard/cityMasterDetail'))
                    .catch(err=>{
                        this.setState({message: err.response.data.message, loading: false})
                    })
                    
                    
                    this.setState({
                        state:{
                          cityName:'',
                          countryId:'',
                          stateId:'',
              
              
                          menuVisible: false,
              
              
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

    cityDetails=()=>{
        this.props.history.push('/superDashboard/cityMasterDetail');
    }
     
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render() {
     
        let formData;
        if(!this.state.loading && this.props.cityMasterReducer.countryResult && this.props.cityMasterReducer.stateResult  &&  this.state.errors){
        formData =<div>
         <FormGroup>
            <Label>Country Name</Label>
            <Input type="select" defaultValue='no-value' name="countryName" onChange={this.onChangeCountry}>
            <DefaultSelect/>
                {this.countryName(this.props.cityMasterReducer)}
            </Input >
            <span className='error'>{this.state.errors.countryName}</span>
        </FormGroup>
        
        <FormGroup>
            <Label>State Name</Label>
            <Input type="select" defaultValue='no-value' name="stateName" onChange={this.onChangeState}>
            <DefaultSelect/>
                {this.stateName(this.props.cityMasterReducer)}
            </Input>
            <span className='error'>{this.state.errors.stateName}</span>
        </FormGroup>

      <FormGroup>
            <Label>City Name</Label>
            <Input  type="text" name="cityName"  onChange={this.onChange}  onKeyPress={this.onKeyPressHandler} placeholder="City Name" maxLength={30}
        minLength={3}/>
            <span className='error'>{this.state.errors.cityName}</span>
            <span className="error">{this.state.message}</span>
        </FormGroup>
         
        <Button color="success" className="mr-2">Submit</Button>
        <Button color="danger" onClick={this.cityDetails}>Cancel</Button>
       
        </div>

        }
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>City Master</h3>
                    {!this.state.loading ? formData : <Spinner />} 
                </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
   
    return {
        cityMasterReducer: state.cityMasterReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity,addCity,detailCity }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(CityMaster));
