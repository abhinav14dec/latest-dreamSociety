import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from 'react-select';
import {Link} from 'react-router-dom';
import { PlaceHolder } from '../../actionCreators/index';
import UI from '../../components/newUI/superAdminDashboard';
import { getVendorMaster} from '../../actions/vendorMasterAction';
import { Form,FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import { fetchAssets} from '../../actions/assetsSubAction';
import { getServiceType } from '../../actions/serviceMasterAction';
import {addPurchaseOrder,assetTypeId} from '../../actions/purchaseOrderAction';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from './../../constants/defaultSelect';
import {numberValidation} from '../../validation/validation';
import _ from 'underscore';


class PurchaseOrder extends Component {
    constructor(){
        super()
        this.state={
            vendorId:'',
            vendorAddress:'',
            vendorContact:'',
            loading:true,
            asset:false,
            service:false,
            serviceName:'',
            assetName:'',
            assetType:'',
            expDate:'',
            assetAmount0:0,
            assetAmount1:0,
            assetAmount2:0,
            assetRate:0,
            assetQuantity:0,
            serviceRate:'',
            startDate:'',
            person:'',
            serviceAmount0:0,
            serviceAmount1:0,
            serviceAmount2:0,
            endDate:'',
            disable:true,
            purchaseOrderAssetsArray:[],
            purchaseOrderServiceArray:[],
            numberOfAssets:'',
            numberOfServices:'',
            assetData:'',
            errors: {},
            
        }
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    changePassword=()=>{
          
        return this.props.history.replace('/superDashboard/changePassword')
      }
      vendorList=({vendors})=>{
        if(vendors && vendors.vendor){
            return (
                vendors && vendors.vendor.map((item)=>{
                   return ({ ...item, label:item.firstName+" "+item.lastName, value:item.vendorId})
                // return (
                // <option value={item.vendorId} key={item.vendorId} >
                //     {item.firstName+" "+item.lastName}
                // </option>
                // )
               })
            )
        }
      }

    componentDidMount=()=>{
        this.refreshData()     
      }

      refreshData(){
        this.props.getVendorMaster().then(() => this.setState({loading: false}));
        this.props.fetchAssets().then(() => this.setState({loading: false}));
        this.props.getServiceType().then(() => this.setState({loading: false}));

    }
    onVendorChangeHandler=(selectOption)=>{
        this.setState({
            vendorId:selectOption.vendorId,
            vendorAddress:selectOption.permanentAddress,
            vendorContact:selectOption.contact,
            errors:{}
        })   
    }
    userMemberHandler = (e) => {
        if (e.target.value != '') {
            this.setState({
                numberOfAssets: e.target.value
            });
        }
        this.setState({errors:{}})
    }
    
    numberOfServices=(e)=>{
        
        if(e.target.value!=''){
            this.setState({
                numberOfServices:e.target.value
            });
        }
        this.setState({errors:{}})
    }
    // getAsset=({getAssetsType})=>{
    //     if(getAssetsType && getAssetsType.assetsType){
    //         return (
    //           getAssetsType.assetsType.map((item)=>{
    //                 return ({...item, label:item.asset_master.assetName ,value:item.asset_master.assetId})
    //             })
    //         )
    //     }
    // }

    getAsset = ({ getAssetsType }) => {
        
        if (getAssetsType && getAssetsType.assetsType) {
            console.log(getAssetsType)
            return getAssetsType.assetsType.map((item) => {
                    return (
                        <option value={item.asset_master.assetName} key={item.asset_master.assetId} >
                            {item.asset_master.assetName}
                        </option>
                    )
                })
            

        }
    }
    // getAssetType=({getAssetsType})=>{
    //     if(getAssetsType && getAssetsType.assetsType){
    //         return (
    //           getAssetsType.assetsType.map((item)=>{
    //                 return ({...item, label:item.assetType ,value:item.assetId})
    //             })
    //         )
    //     }
    // }

    getAssetType = ({ assetTypeData }) => { 
        if (assetTypeData && assetTypeData.assetsType ) {
            console.log(assetTypeData)
            return (
                assetTypeData.assetsType.map((item) => {
                    return (
                        <option value={item.assetType} key={item.assetTypeId} >
                            {item.assetType}
                        </option>
                    )
                })
            )

        }
    }

    onAssetDataChangeHandler=(i,selectOption)=>{

        this.setState({
            ['assetData'+i]:selectOption.label
        },function(){
            
        })

        let selected=selectOption.target.value
        console.log(selected)

        if (!!this.state.errors[selectOption.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[selectOption.target.name];
            this.setState({ [selectOption.target.name]: selectOption.target.value, errors });
        }
        else {
            this.setState({ [selectOption.target.name]: selectOption.target.value });
        }
       
       

        var data = _.find(this.props.ListOfAssets.getAssetsType.assetsType,function(obj){ console.log(obj)
            return obj.asset_master.assetName === selected
            })
        
            if(data && data.asset_master){
                console.log(data.asset_master)
                this.props.assetTypeId(data.asset_master.assetId)
            }


    }
    onAssetsChangeHandler=(i,selectOption)=>{
        this.setState({
            ['assetName'+i]:selectOption.label
        },function(){
            
        })

        if (!!this.state.errors[selectOption.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[selectOption.target.name];
            this.setState({ [selectOption.target.name]: selectOption.target.value, errors });
        }
        else {
            this.setState({ [selectOption.target.name]: selectOption.target.value });
        }
       
    }
    onServicesChangeHandler=(i,selectOption)=>{
        this.setState({
            ['serviceName'+i]:selectOption.label
        },function(){
            
        })
    }
   
    assetOnChange=(e)=>{
        if(e.target.checked){
        this.setState({
            asset:!this.state.asset
        })}
        else if(!e.target.checked){
            this.setState({
                asset:!this.state.asset
            })
        }
    }
    serviceOnChange=(e)=>{
        if(e.target.checked){
            this.setState({
                service:!this.state.service
            })}
            else if(!e.target.checked){
                this.setState({
                    service:!this.state.service
                })
            }
    }
    getServices=({item})=>{

        if(item){
            return (
                item.map((items)=>{
            
                    return ({...item, label:items.serviceName ,value:items.serviceId})
                })
            )
        }
    }

    onChangeHandlerData = (event) => {
        this.setState({ [event.target.name]: event.target.value, errors:{} });
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
    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value, errors:{} });
        // this.setState({message:''})
        // if (!!this.state.errors[event.target.name]) {
        //     let errors = Object.assign({}, this.state.errors);
        //     delete errors[event.target.name];
        //     this.setState({ [event.target.name]: event.target.value, errors });
        // }
        // else {
        //     this.setState({ [event.target.name]: event.target.value });
        // }

    }

    // OnKeyPresshandlerPhone(event) {
    //     const pattern = /^[0-9]$/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (!pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }

    
    onRateChangeHandler=(i,e)=>{
        var amount=e.target.value*this.state['assetQuantity'+i];
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});  
        this.setState({
            [e.target.name]:e.target.value,
            ['assetAmount'+i]:amount,
            disable:false
        })
    }
}




   
// onRateChangeHandler=(e)=>{
//     var amount=e.target.value*this.state['assetAmount'+i];
//     if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
//         this.setState({[e.target.name]:e.target.value});  
        
//         this.setState({
//             ['assetAmount'+i]:amount,
//             [e.target.name]:e.target.value,
//             disable:false
//         })
//     }}

    onServiceRateChangeHandler=(i,e)=>{
        var amount=e.target.value*this.state['person'+i];
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});  
        this.setState({
            [e.target.name]:e.target.value,
            ['serviceAmount'+i]:amount,
            disable:false
        })
    }
    }
    onQuantityChangeHandler=(i,e)=>{  
    var amount=e.target.value*this.state['assetRate'+i];
        this.setState({
            [e.target.name]:e.target.value,
            ['assetAmount'+i]:amount
        })
    }
    onPersonChangeHandler=(i,e)=>{
        var amount=e.target.value*this.state['serviceRate'+i]
        this.setState({
            [e.target.name]:e.target.value,
            ['serviceAmount'+i]:amount
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        this.setState({purchaseOrderAssetsArray:[], purchaseOrderServiceArray:[]})
        const {vendorId,vendorAddress,vendorContact,expDate,startDate,endDate,purchaseOrderAssetsArray,purchaseOrderServiceArray}=this.state
         
        let errors = {};

        if(this.state.vendorId===''){
            errors.vendorId="vendorName can't be empty"
        }

        else if(this.state.numberOfAssets===''){
            errors.numberOfAssets="Number of Assets can't be empty"
        }
       
        else if(this.state.expDate===''){
            errors.expDate="Expected Date can't be empty"
        }

        
        this.setState({ errors })

        const isValid = Object.keys(errors).length === 0

        

         let data;
         for(let i=0;i<this.state.numberOfAssets;i++){
             data={
                purchaseOrderType:'Assets',
                purchaseOrderSubType:this.state['assetData'+i],
                purchaseOrderName:this.state['assetName'+i],
                rate:this.state['assetRate'+i],
                quantity:this.state['assetQuantity'+i],
                amount:this.state['assetAmount'+i]
             }
             this.state.purchaseOrderAssetsArray.push(data)
         }  
         let service;
         for(let i=0;i<this.state.numberOfServices;i++){
             service={
                purchaseOrderType:"Service",
                purchaseOrderName:this.state['serviceName'+i],
                rate:this.state['serviceRate'+i],
                quantity:this.state['person'+i],
                amount:this.state['serviceAmount'+i],
                serviceStartDate:this.state['startDate'+i],
                serviceEndDate:this.state['endDate'+i]
             }
             this.state.purchaseOrderServiceArray.push(service)
         }
            console.log(this.state.purchaseOrderAssetsArray)
            console.log(vendorId,expDate,purchaseOrderAssetsArray,purchaseOrderServiceArray)
            if(isValid && this.state.message === '') {
                   this.props.addPurchaseOrder(vendorId,expDate,purchaseOrderAssetsArray,purchaseOrderServiceArray)
                   .then(()=>this.props.history.push('/superDashboard/purchaseOrderDetails'))
                   .catch(err=>{
                       this.setState({message: err.response.data.message, loading: false})
                   })
                }
            
    }

    
    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    minEndDate=()=>{
        var d = new Date();
         return d.toISOString().split('T')[0];

    }

    
    

    render() {
        let serviceData=[];
        let userData=[];
        for(let i=0;i<this.state.numberOfServices;i++){
         serviceData.push(
            <FormGroup key={i}>
            <h3>Services</h3>
            <Row>
                <Col md={4}>
         <Label>Services</Label>  
         <Select options={this.getServices(this.props.displayServiceMasterReducer)}
         onChange={this.onServicesChangeHandler.bind(this,i)}
         />
         </Col> 
         <Col md={4}>
         <Label>Rate</Label>  
        <Input type='text' name={`serviceRate${i}`} onChange={this.onServiceRateChangeHandler.bind(this,i)} onKeyPress={numberValidation} maxLength={10} />
         </Col> 
         <Col md={4}>
             <Label>Start Date</Label>
             <Input type='date' min={this.maxDate()} name={`startDate${i}`} onChange={this.onChangeHandler}/>
             </Col>
         </Row>
         <Row>
             <Col md={4}>
             <Label>Person</Label>
             <Input type='text' name={`person${i}`} onChange={this.onPersonChangeHandler.bind(this,i)}  onKeyPress={numberValidation} disabled={this.state.disable}/>
             </Col>
             <Col md={4}>
             <Label>Amount</Label>
             <Input type='text' name={`serviceAmount${i}`} onChange={this.onChangeHandler} value={this.state[`serviceAmount${i}`]} readOnly/>
             </Col>
             <Col md={4}>
             <Label>End Date</Label>
             <Input type='date' min={this.minEndDate()}name={`endDate${i}`} onChange={this.onChangeHandler}/>
             </Col>
         </Row>
        </FormGroup>
         )
        }
        for(let i=0;i<this.state.numberOfAssets;i++){
            userData.push( <FormGroup key={i}>
            <h3>Assets</h3> 
                <Row>
                    <Col md={4}>
             <Label>Asset</Label>  
             {/* <Select options={this.getAsset(this.props.ListOfAssets)}
             onChange={this.onAssetDataChangeHandler.bind(this,i)}
             name={`assetData${i}`}
             
             /> */}
             <Input type="select" name={`assetData${i}`} defaultValue='no-value' onChange={this.onAssetDataChangeHandler.bind(this,i)}>                      
                        {/* <option>{this.state.purchaseOrderSubType}</option> */}
                        <DefaultSelect/>
                        {this.getAsset(this.props.ListOfAssets)}
                        </Input>
             </Col> 
             <Col md={4}>
             <Label>Asset Type</Label>
              
             {/* <Select options={this.getAssetType(this.props.ListOfAssets)}
             onChange={this.onAssetsChangeHandler.bind(this,i)}
             name={`assetName${i}`}
             /> */}
              <Input type="select" name={`assetName${i}`} defaultValue='no-value'  onChange={this.onAssetsChangeHandler.bind(this,i)}>
                        <DefaultSelect/>
                        {this.getAssetType(this.props.purchase)}
                        </Input>
             </Col> 
             <Col md={4}>
             <Label>Rate</Label>  
            <Input type='text' name={`assetRate${i}`} onChange={this.onRateChangeHandler.bind(this,i)}  onKeyPress={numberValidation} maxLength={10}/>
             </Col> 
             </Row>
             <Row>
                 <Col md={4}>
                 <Label >Quantity</Label>
                 <Input type='text' name={`assetQuantity${i}`} onChange={this.onQuantityChangeHandler.bind(this,i)} onKeyPress={numberValidation} disabled={this.state.disable} maxLength={10}/>
                 </Col>
                 <Col md={4}>
                 <Label>Amount</Label>
                 <Input type='text' name={`assetAmount${i}`} readOnly onChange={this.onChangeHandlerData} value={this.state[`assetAmount${i}`]}/>
                 </Col>
             </Row>
            </FormGroup>)
        }


        let data=<div>
           
                            <FormGroup>
                                <Label>Vendor Name</Label>
                              <Select options= {this.vendorList(this.props.vendorMasterReducer)}
                              name="vendorId"
                               onChange={this.onVendorChangeHandler.bind(this)}
                              placeholder={PlaceHolder} />
                              {/* <Input type="select" name="vendorId" defaultValue='no-value'  onChange={this.onVendorChangeHandler.bind(this)}>
                              <DefaultSelect/>
                              {this.vendorList(this.props.vendorMasterReducer)}
                               </Input> */}
                              <span className='error'>{this.state.errors.vendorId}</span>
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                            <FormGroup>
                                <Label>Address</Label>
                                <Input type='textarea' name='vendorAddress' readOnly value={this.state.vendorAddress} onChange={this.onChangeHandler}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Contact Number</Label>
                                <Input type='text' name='vendorContact' readOnly value={this.state.vendorContact} onChange={this.onChangeHandler}/>
                            </FormGroup>
                            </Col>
                            </Row>
                            <FormGroup>
                               <Row> 
                                   <Col md={4}>
                                <Label>Number of Assets</Label>
                                <Input placeholder="number of assets" type='text'  name="numberOfAssets" onKeyPress={numberValidation} onChange={this.userMemberHandler} maxLength={10}/>
                                <span className='error'>{this.state.errors.numberOfAssets}</span>
                                 </Col>
                                <Col md={4}>
                                <Label>Number of service</Label>
                                <Input placeholder="number of services" type='text' name="numberOfServices" onKeyPress={numberValidation} onChange={this.numberOfServices} maxLength={10}/>
                                {/* <span className='error'>{this.state.errors.numberOfServices}</span> */}
                                </Col>
                                <Col md={4}>
                                <Label>Expected Delivery Date</Label>
                                 <Input type='date' min={this.maxDate()} name='expDate' onChange={this.onChangeHandlerData}/>
                                 <span className='error'>{this.state.errors.expDate}</span>
                               
                                 </Col>
                                 </Row> 
                            </FormGroup>
                             {userData}
                            {serviceData}
                    <Button color="success" className="mr-2">Submit</Button>
                    <Link to='/superDashBoard/purchaseOrderDetails'>
                <Button color="danger">Cancel</Button>
                              </Link>
        </div>
        
 
        return (
            <div>
               <UI  onClick={this.logout} change={this.changePassword}>
               <Form onSubmit={this.onSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3>Purchase Order</h3> 
                        {!this.state.loading ? data : <Spinner />}     
                </Form>             
               </UI> 
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state.AssetsTypeReducer)
    return{
        purchase: state.PurchaseOrder,
        ListOfAssets: state.AssetsTypeReducer,
        vendorMasterReducer: state.vendorMasterReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer,
    }
}
function mapDispatchToProps(dispatch){
  return  bindActionCreators({getVendorMaster,fetchAssets,getServiceType,addPurchaseOrder,assetTypeId},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PurchaseOrder);