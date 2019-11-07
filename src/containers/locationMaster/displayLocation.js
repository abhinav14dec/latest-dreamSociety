import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getLocation, getLocationName,updateLocation,deleteLocation,deleteSelectedLocation} from '../../actions/locationMasterAction';
import { bindActionCreators } from 'redux';
import { Button, Row,Col, Modal, FormGroup, ModalBody,Table, ModalHeader, Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';
import _ from 'underscore';
import { getCountry, getState, getCity } from './../../actions/societyMasterAction';

class DisplayLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
                filterName:'locationName',
                countryId: '',
                countryName: '',
                stateName: '',
                stateId: '',
                cityName: '',
                cityId: '',
                locationName: '',
                locationId: '',
                isActive:false,
                ids:[],
                menuVisible: false,
                isDisabled:true,
                search: '',
                errors:{},
                modal: false,
                loading:true,
                message:'',
                modalLoading: false,

            };
    }


componentDidMount(){
    this.refreshData();

}    

refreshData() {
    this.props.getLocation().then(()=> this.setState({modalLoading: false,loading:false, modal:false}));
    this.props.getState().then(()=> this.setState({modalLoading: false,loading:false, modal:false}));
    this.props.getCountry().then(()=> this.setState({modalLoading: false,loading:false, modal:false}));
    this.props.getCity().then(()=> this.setState({modalLoading: false,loading:false, modal:false}));
    this.props.getLocationName().then(()=> this.setState({modalLoading: false,loading:false, modal:false}));
}


onChangeHandler = (event) => {
    this.setState({message:''})
    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value, errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value });
    }
}

onChangeCountry= (event)=>{

     let selected= event.target.value
 
     var country = _.find(this.props.societyReducer.countryResult,function(obj){
         return obj.countryName === selected
         })
     
         this.setState({
             countryName: country.countryName,
             countryId:country.countryId,
             stateName: '',
             cityName: '',
             locationName: ''
         })
         
         this.props.getState(country.countryId)
       
 }

 onChangeState= (event)=>{
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

toggle = (locationId, countryId,stateId,cityId, countryName, stateName, cityName, locationName) => {
console.log("edit",locationId,locationName);
    this.setState({
        locationId,
        countryId,
        stateId,
        cityId, 
        countryName,
        stateName,
        cityName,
        locationName,
        modal: !this.state.modal
    })
    
}

searchFilter(search) {
    return function (x) {
        return x.country_master.countryName.toLowerCase().includes(search.toLowerCase()) ||
         x.state_master.stateName.toLowerCase().includes(search.toLowerCase()) ||
         x.city_master.cityName.toLowerCase().includes(search.toLowerCase()) ||
         x.locationName.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

    
searchOnChange = (e) => {
    this.setState({ search: e.target.value })
}

deleteLocation = (locationId) => {
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.deleteLocation(locationId,isActive)
        .then(() => this.refreshData())
        this.setState({isActive:false})
}

deleteSelected (ids){
    this.setState({loading:true,
    isDisabled:true});
    this.props.deleteSelectedLocation(ids)
    .then(() => this.refreshData())  
    .catch(err => err);
}


toggleModal = () => {
    this.setState({ modal: !this.state.modal, message:'' })
}

renderList=({details})=>{
    if(details){console.log(details)
        return details.sort((item1,item2)=>{
            var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
            return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index)=>{
            return(

                <tr key={item.locationId}>
                <td><input type="checkbox" name="ids" className="SelectAll" value={item.locationId}
                         onChange={(e) => {
                            const {locationId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(locationId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, locationId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                <td>{index+1}</td>
                <td>{item.country_master?item.country_master.countryName:''}</td>
                <td>{item.state_master?item.state_master.stateName:''}</td>
                <td>{item.city_master?item.city_master.cityName:''}</td>
                <td>{item.locationName}</td>
                <td>
                    <Button color="success"  className="mr-2" onClick={this.toggle.bind(this, item.locationId,item.country_master?item.country_master.countryId:'',item.state_master?item.state_master.stateId:'',item.city_master?item.city_master.cityId:'', item.country_master?item.country_master.countryName:'',item.state_master?item.state_master.stateName:'',item.city_master?item.city_master.cityName:'',item.locationName)}> Edit</Button>
               
                    <Button color="danger" onClick={this.deleteLocation.bind(this,item.locationId)}> Delete</Button>
                </td>
                </tr>
                
            )
        })
    }

}


fetchCountry = ({countryResult}) => {
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


stateName = ({stateResult}) => {
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

OnKeyPressUserhandler(event) {
    const pattern = /[a-zA-Z_ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

updateLocation = () => {
    const { locationId, countryId, stateId, cityId,locationName } = this.state;
    let errors={};
        if(this.state.locationName===''){
            errors.locationName="Location Name can't be empty";
        }
        this.setState({errors});

        const isValid =Object.keys(errors).length===0;
        if(isValid &&  this.state.message === ''){

        this.props.updateLocation(locationId, countryId, stateId, cityId,locationName)
        .then(() => this.refreshData())
        .catch(err=>{
            this.setState({modalLoading:false,message: err.response.data.message, loading: false})
            })
            if(this.state.message === ''){
                this.setState({modal: true})
            }
            else {
                this.setState({modal: false})
            } 
        this.setState({ modalLoading: true
    })
        }
        console.log("update",locationId,locationName);
}

push=()=>{
    this.props.history.push('/superDashboard/locationMaster')
}
close=()=>{
    return this.props.history.replace('/superDashBoard')
}

changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
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

logout=()=>{
    localStorage.removeItem('token'); 
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}


render(){
    let tableData;
    tableData=
    <Table className="table table-bordered">
        <thead> 
        <tr>
        <th  style={{width:'4%'}}></th>
            <th  style={{width:'4%'}}>#</th>
            <th>Country Name</th>
            <th>State Name</th>
            <th>City Name</th>
            <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'locationName'}});
                        }}>Location Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
            <th>Actions</th>
        </tr>
        </thead>
        
        <tbody>
        {this.renderList(this.props.locationMasterReducer)}
        </tbody>
    </Table> 
               let modalData=<div>
                <FormGroup>
                   <Row md={12}>
                    <Col md={6}>
                   <Label> Country Name</Label>
                   <Input type="select" name="countryId" value={this.state.countryName} onChange={this.onChangeCountry}>
                   <DefaultSelect />
                              {this.fetchCountry(this.props.societyReducer)}
                  </Input>
                  </Col>     
                    <Col md={6}>  
                   <Label>State Name</Label>          
                   <Input type="select" id="stateId" name="stateId" onChange={this.onChangeState}>
                   {this.state.stateName ? <option>{this.state.stateName}</option> : <option disabled>--Select--</option>}
                            {this.state.stateName ? <DefaultSelect />: null}
                              {this.state.stateName ? null : this.stateName(this.props.societyReducer)}                 
                   </Input>
                   </Col>
                        </Row>
               </FormGroup>
               <FormGroup>
               <Row md={12}>
                    <Col md={6}>
                   <Label>City Name</Label>
                   <Input type="select" id="cityId" name="cityName"   onChange={this.onChangeCity}  >
                         {this.state.cityName ? <option>{this.state.cityName}</option> : <option disabled>--Select--</option>}
                          {this.state.cityName ? <DefaultSelect />: null}
                          {this.state.cityName ? null : this.cityName(this.props.societyReducer)}  
                   </Input>
                   </Col>     
                    <Col md={6}>  
                   <Label>Location Name</Label>
                   <Input type="text" id="locationId" name="locationName" maxLength={80} onChange={this.onChangeHandler} value={this.state.locationName} />
                   <span className="error">{this.state.errors.locationName}</span>
                   <span className="error">{this.state.message}</span>
                   </Col>
                        </Row>
               </FormGroup> 
               <FormGroup> 
                        <Button color="primary" className="mr-2" onClick={this.updateLocation}>Save</Button> 
                        <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
               </FormGroup> 
                 
               </div>    
        let deleteSelectedButton = <Button color="danger" className="mb-2"
        onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>;

    return(
        
        <UI onClick={this.logout} change={this.changePassword}>
        
              
              
        <div className="w3-container w3-margin-top w3-responsive">
        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
        </div>
             <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                 <ModalHeader toggle={this.toggle}> Edit Details</ModalHeader>
                 <ModalBody>
      
                    {!this.state.modalLoading?modalData:<Spinner/>}
                        
                 </ModalBody>
             </Modal> 
             <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Location Details</h3>
             <Button color="primary" type="button" onClick={this.push}> Add Location</Button>
             </div>
             <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />
                        {deleteSelectedButton}
                        <Label style={{padding:'10px'}}><b>Select All</b><input className="ml-2"
                                id="allSelect"
                                type="checkbox" onChange={(e) => {
                                        if(e.target.checked) {
                                            this.selectAll();
                                        }
                                        else if(!e.target.checked){
                                            this.unSelectAll();
                                        } 
                                    }  
                                }/>
                            </Label>
                           {!this.state.loading ? tableData : <Spinner />}
                       
                                
            
                </div>
        </UI>
        
    )
}

}


    function mapStatToProps(state) {
        return {
        locationMasterReducer:state.locationMasterReducer,
        societyReducer: state.societyReducer
        }
    }
    
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({getLocation,getState,getCountry,getCity,getLocationName,deleteSelectedLocation,updateLocation,deleteLocation}, dispatch)
    }
    
    export default connect(mapStatToProps, mapDispatchToProps)(DisplayLocation);


