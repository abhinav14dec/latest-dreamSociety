import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Table, Label, Col, Row } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import { getPurchaseOrder, pdf, removePurchaseOrder, deleteMultiple, assetTypeId, updatePurchaseOrderData } from '../../actions/purchaseOrderAction';
import { UR } from '../../actionCreators';
import GoogleDocsViewer from 'react-google-docs-viewer';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { fetchAssets } from '../../actions/assetsSubAction';
import { getServiceType } from '../../actions/serviceMasterAction';
import { getVendorMaster } from '../../actions/vendorMasterAction';
import DefaultSelect from './../../constants/defaultSelect';

class PurchaseOrderDetails extends Component {
    constructor() {
        super()
        this.state = {
            errors: {},
            filterName: "firstName",
            pdfOpen: false,
            pdfPath: '',
            ids: [],
            isDisabled: true,
            loading: true,
            modalLoading:false,
            search: '',
            numberOfAssets: '',
            numberOfServices: '',
            modal: false,
            disable: true,
            asset: '',
            assetType: '',
            assetQuantity: '',
            assetRate: '',
            assetAmount: '',
            serviceRate: '',
            startDate: '',
            person: '',
            serviceAmount: '',
            endDate: '',
            serviceName: '',
            assetId: '',
            assetName: '',
            serviceId: '',
            assetData: [],
            serviceData: [],
            issuedBy: '',
            vendorName: '',
            vendorId: '',
            expDateOfDelievery: '',
            message:'',
            numberOfAssets:'',
            numberOfServices:'',
            data:{
                purchaseOrderType:'',
                purchaseOrderSubType:'',
                purchaseOrderName:'',
                rate:'',
                quantity:'',
                amount:''
            },
            purchaseOrderId:'',
            purchaseOrderType:''
        }
    }
    componentDidMount() {
        this.refreshData();
    }

    refreshData(){
        this.props.getVendorMaster()
        this.props.fetchAssets();
        this.props.getServiceType();
        this.props.getPurchaseOrder().then(() => this.setState({ loading: false, modalLoading: false, modal:false }))
        this.props.assetTypeId()
    }

    onChangeHandler = (event) => {
       
        this.setState({message: ''})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    // onChangeStartDate=(event)={
        
    // }

    minDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }

   
    onAssetDataChangeHandler=(i,e)=>{
        // this.state.assetData.map(item => {
        //     var {purchaseOrderSubType} = item
        //     this.setState({assetData:[...this.state.assetData, assetData:[]]})
        //     purchaseOrderSubType = e.target.value
        // })
        
        document.getElementById(`assetType${i}`).disabled=false;
        var removeElement = document.getElementById(`assetType${i}`);
        removeElement.removeChild(removeElement.childNodes[0]);
        removeElement.value='no-value'
        let value = e.target.value
        this.setState({
            ['assetData'+i]:e.target.value,
            data:{...this.state.data,
             purchaseOrderSubType:value
               
            },
            purchaseOrderType:value
            
        },function(){
            
        })
        // let value = e.target.value
        // this.setState(prevState => ({
        //     data: {
        //         ...prevState.data,
        //         assetName: value
        //     },
        //     assetData:[
        //         ...prevState.assetData,
        //         this.state.data
        //     ]
        // }))
       

        this.props.assetTypeId(e.target.value)
       
       
        
    
       
    }



    onRateChangeHandler = (e) => {
        this.setState({
            data:{...this.state.data,
                rate:e.target.value
            }
        }, function () {

        })
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    changePassword = () => {

        return this.props.history.replace('/superDashboard/changePassword')
    }
    searchFilter(search) {
        return function (x) {
            return x.vendor_master.firstName.toLowerCase().includes(search.toLowerCase()) ||
                   x.issuedBy.toLowerCase().includes(search.toLowerCase()) || 
                   x.purchaseOrderId.toString().includes(search.toLowerCase()) || !search;
        }
    }

    downloadPdf = (purchaseOrderId) => {
     
        this.props.pdf(purchaseOrderId)
            .then((res) => {
                console.log(res.payload.data.message)
                this.setState({
                    pdfPath: res.payload.data.message,
                    pdfOpen: !this.state.pdfOpen,
                })
            })
    }

    delete = (purchaseOrderId) => {
        this.setState({ loading: true })
        if (window.confirm('Are You Sure ?')) {
            this.props.removePurchaseOrder(purchaseOrderId)
                .then(() => {
                    this.props.getPurchaseOrder()
                    .then(() => this.setState({ loading: false }))
                })
        }
        else {
            this.props.getPurchaseOrder()
                .then(() => this.setState({ loading: false }))
        }
    }
    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        if (window.confirm('Are You Sure ?')) {
            this.props.deleteMultiple(ids)
                .then(() => this.props.getPurchaseOrder().then(() => this.setState({ loading: false })))
                .catch(err => err.response.data.message);
        }
        else {
            this.props.getPurchaseOrder()
                .then(() => this.setState({ loading: false }))
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


    updatePurchaseOrder = () => {
        
        let {purchaseOrderId, issuedBy, vendorId,expDateOfDelievery} = this.state
        console.log(purchaseOrderId, issuedBy, vendorId,expDateOfDelievery)
       
       

        let errors = {};

        this.setState({ errors })

        const isValid = Object.keys(errors).length === 0

        if (isValid && this.state.message === '') {
           

            this.props.updatePurchaseOrderData(purchaseOrderId, issuedBy, vendorId,expDateOfDelievery)
                .then(() => this.refreshData())
                .catch(err=>{ console.log(err.response.data.message)
                    this.setState({modalLoading: false, message: err.response.data.message, loading: false, modal:false})
                    })
                    if (this.state.message === '') {
                        this.setState({ modal: true })
                    }
                    else {
                        this.setState({ modal: false })
                    }
        
                    this.setState({
                        modalLoading: true
                        
                        
                    })

        }
    }
    editPurchaseOrder = (purchaseOrderId,issuedBy, vendorName, assetLength, serviceLength, assets, services, vendorId, expDateOfDelievery) => {
        console.log(purchaseOrderId, issuedBy, vendorName, assetLength, serviceLength, assets, services, vendorId, expDateOfDelievery)


        this.setState({assetData:[], serviceData:[],  errors:{} })
        let data;
        for (var i = 0; i < assets.length; i++) {

            this.setState({
                ['asset' + i]: assets[i].purchaseOrderType,
                ['assetName' + i]: assets[i].purchaseOrderSubType,
                ['assetType' + i]: assets[i].purchaseOrderName,
                ['assetRate' + i]: assets[i].rate,
                ['assetQuantity' + i]: assets[i].quantity,
                ['assetAmount' + i]: assets[i].amount,
            })

          
            data = {
                purchaseOrderType: assets[i].purchaseOrderType,
                purchaseOrderSubType: assets[i].purchaseOrderSubType,
                purchaseOrderName: assets[i].purchaseOrderName,
                rate: assets[i].rate,
                quantity: assets[i].quantity,
                amount: assets[i].amount,
            }
            // this.state.assetData.push(data);
            

        }
        
        this.setState({assetData:[data]})
        console.log(this.state.assetData)
      let data1;
        for (var i = 0; i < services.length; i++) {
            this.setState({
                ['serviceName' + i]: services[i].purchaseOrderName,
                ['serviceAmount' + i]: services[i].amount,
                ['serviceRate' + i]: services[i].rate,
                ['person' + i]: services[i].quantity,
                ['startDate' + i]: services[i].serviceStartDate,
                ['endDate' + i]: services[i].serviceEndDate
            })

            
            data1 = {
                purchaseOrderType: services[i].purchaseOrderType,
                purchaseOrderName: services[i].purchaseOrderName,
                rate: services[i].rate,
                quantity: services[i].quantity,
                amount: services[i].amount,
                serviceStartDate: services[i].serviceStartDate,
                serviceEndDate: services[i].serviceEndDate
            }



        }
        this.setState({serviceData:[data1]})
        console.log(this.state.serviceData)

        this.setState({
            purchaseOrderId,
            issuedBy, vendorName,
            modal: !this.state.modal,
            numberOfAssets: assetLength,
            numberOfServices: serviceLength,
            vendorId,
            expDateOfDelievery
        }, function () { console.log(this.state) })
    }

    viewServices=(purchaseOrderId)=>{
        localStorage.setItem('purchaseOrderId', purchaseOrderId)
        this.props.history.push('/superDashBoard/viewServices')
    }

    viewAssets=(purchaseOrderId)=>{
        localStorage.setItem('purchaseOrderId', purchaseOrderId)
        this.props.history.push('/superDashBoard/viewAssets')
    }

    renderList = ({ getpurchaseOrder }) => {
       
        if (getpurchaseOrder && getpurchaseOrder.purchaseOrder) {
            console.log(getPurchaseOrder)
            return getpurchaseOrder.purchaseOrder.sort((item1, item2) => { 
                 let cmpValue=(item1.vendor_master[this.state.filterName].localeCompare(item2.vendor_master[this.state.filterName]))
                 return this.state.sortVal?cmpValue: -cmpValue;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                    
                    return (
                        <tr key={index}>
                            <td><input type="checkbox" name="ids" value={item.purchaseOrderId} className="SelectAll"
                                onChange={(e, i) => {
                                    const { purchaseOrderId } = item
                                    if (!e.target.checked) {
                                        if (this.state.ids.length > -1) {
                                            document.getElementById('allSelect').checked = false;
                                            let indexOfId = this.state.ids.indexOf(purchaseOrderId);
                                            if (indexOfId > -1) {
                                                this.state.ids.splice(indexOfId, 1)
                                            }
                                            if (this.state.ids.length === 0) {
                                                this.setState({ isDisabled: true })
                                            }
                                        }
                                    }
                                    else {
                                        this.setState({ ids: [...this.state.ids, purchaseOrderId] })
                                        if (this.state.ids.length >= 0) {
                                            this.setState({ isDisabled: false })
                                        }
                                    }
                                }} /></td>
                            <td>{index + 1}</td>
                            <td>{item.purchaseOrderId}</td>
                            <td>{item.issuedBy}</td>
                            <td>{item.expDateOfDelievery}</td>
                            <td>{item.vendor_master.firstName + ' ' + item.vendor_master.lastName}</td>
                            <td>{item.vendor_master.contact}</td>
                            <td><button className="btn btn-success mr-2" onClick={this.downloadPdf.bind(this, item.purchaseOrderId)}>View</button></td>     
                            <td style={{ textAlign: "center" }}>
                                <button className="btn btn-success" onClick={this.viewAssets.bind(this,item.purchaseOrderId)} >View</button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button className="btn btn-success" onClick={this.viewServices.bind(this, item.purchaseOrderId)}>View</button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button className="btn btn-success mr-2" onClick={this.editPurchaseOrder.bind(this,item.purchaseOrderId, item.issuedBy, item.vendor_master.firstName + ' ' + item.vendor_master.lastName, item.assets.length, item.services.length, item.assets, item.services, item.vendorId, item.expDateOfDelievery)}>Edit</button>
                                <button className="btn btn-danger" onClick={this.delete.bind(this, item.purchaseOrderId)} >Delete</button>
                            </td>
                        </tr>
                    )
                })
        }
    }

    // onDocumentLoadSuccess = ({ getPdf }) => {
    //    console.log(getPdf)
    //    const pdfBlob=new Blob([getPdf],{type:'application/pdf'})
    //   }
    toggleEmployeeModal = () => {
        this.setState({ pdfOpen: !this.state.pdfOpen })
    }
    editModal = () => {
        this.setState({ modal: !this.state.modal, message:'' })
    }

    toggle() {
        this.setState({ modal: false });
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    minEndDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];

    }
    onPersonChangeHandler = (i, e) => {
        var amount = e.target.value * this.state['serviceRate' + i]
        this.setState({
            [e.target.name]: e.target.value,
            ['serviceAmount' + i]: amount
        })
    }
    onQuantityChangeHandler = (i, e) => {
        var amount = e.target.value * this.state['assetRate' + i];
        this.setState({
            [e.target.name]: e.target.value,
            ['assetAmount' + i]: amount
        })
    }
    getServices = ({ item }) => {
        
        if (item) {
            return (
                item.map((items, index) => {
                    return (
                        <option value={items.serviceId} key={items.serviceId} >
                            {items.serviceName}
                        </option>
                    )
                    //   return ({...item, label:items.serviceName ,value:items.serviceId})
                })
            )
        }
    }
    onServicesChangeHandler = (i, e) => {
        this.setState({
            ['serviceName' + i]: e.target.value
        }, function () {

        })
    }
    getAsset = ({ getAssetsType }) => {
        if (getAssetsType && getAssetsType.assetsType) {
            return (
                getAssetsType.assetsType.map((item) => {
                    return (
                        <option value={item.asset_master.assetId} key={item.asset_master.assetId} >
                            {item.asset_master.assetName}
                        </option>
                    )
                })
            )

        }
    }

    getAssetType = ({ assetTypeData }) => { 
            if (assetTypeData && assetTypeData.assetsType ) {
                
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


    // getAssetType = ({ getAssetsType }) => {
    //     if (getAssetsType && getAssetsType.assetsType) {
    //         console.log(getAssetsType)
    //         return (
    //             getAssetsType.assetsType.map((item) => {
    //                 <option value={item.assetTypeId} key={item.assetTypeId} >
    //                     {item.assetType}
    //                 </option>
    //                 // return ({...item, label:item.assetType ,value:item.assetId})
    //             })
    //         )
    //     }
    // }
    onAssetsChangeHandler1 = (i, selectOption) => {
        this.setState({
            ['assetName' + i]: selectOption.label
        }, function () {

        })
    }

    onAssetsChangeHandler = (i, e) => {
        
        this.setState({
            ['assetType' + i]: e.target.value,
            data:{...this.state.data,
                purchaseOrderName:e.target.value
            }
        }, function () {

        })
    }
    close = () => {
        return this.props.history.push('/superDashBoard')
    }

    onVendorChangeHandler = (selectOption) => {
        this.setState({
            vendorId: selectOption.vendorId,
            // vendorAddress:selectOption.permanentAddress,
            // vendorContact:selectOption.contact
        })
    }

    vendorList = ({ vendors }) => {
        if (vendors && vendors.vendor) {
           
            return vendors.vendor.map((item) => {
                return (
                    <option value={item.vendorId} key={item.vendorId} >
                        {item.firstName + " " + item.lastName}
                    </option>
                )
            })

        }
    }

    

    render() {
      


        let pdfDisplay;
        pdfDisplay = <FormGroup style={{ textAlign: 'center' }}>
            <h4>Purchase Order PDF</h4>
            <GoogleDocsViewer
                width="400px"
                height="600px"
                fileUrl={UR + this.state.pdfPath}
            />
        </FormGroup>



        let serviceData = [];
        let userData = [];
        for (let i = 0; i < this.state.numberOfServices; i++) {
           
            serviceData.push(
                <FormGroup key={i}>
                    <h3>Services</h3>
                    <Row>
                        <Col md={4}>
                            <Label>Services</Label>
                            <Input type="select" name={`serviceName${i}`} onChange={this.onServicesChangeHandler.bind(this, i)}  >
                                <option>{this.state['serviceName' + i]}</option>
                                <DefaultSelect />
                                {this.getServices(this.props.displayServiceMasterReducer)}
                            </Input>

                            {/* <Select options={this.getServices(this.props.displayServiceMasterReducer)}
          name={`serviceName${i}`}
          onChange={this.onServicesChangeHandler.bind(this,i)}
        //   value={this.state['serviceName'+i]}
        value={this.state.serviceData[i].serviceName}
          /> */}
                        </Col>
                        <Col md={4}>
                            <Label>Rate</Label>
                            <Input type='text' name={`serviceRate${i}`} onChange={this.onServiceRateChangeHandler} value={this.state['serviceRate' + i]} />
                        </Col>
                        <Col md={4}>
                            <Label>Start Date</Label>
                            <Input type='date'  min={this.maxDate()} name={`startDate${i}`} onChange={this.onChangeHandler} value={this.state['startDate' + i]} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Label>Person</Label>
                            <Input type='text' name={`person${i}`} onChange={this.onPersonChangeHandler.bind(this, i)} value={this.state['person' + i]} disabled={this.state.disable} />
                        </Col>
                        <Col md={4}>
                            <Label>Amount</Label>
                            <Input type='text' name={`serviceAmount${i}`} onChange={this.onChangeHandler} value={this.state[`serviceAmount${i}`]} readOnly />
                        </Col>
                        <Col md={4}>
                            <Label>End Date</Label>
                            <Input type='date' min={this.minEndDate()} name={`endDate${i}`} onChange={this.onChangeHandler} value={this.state['endDate' + i]} />
                        </Col>
                    </Row>
                </FormGroup>
            )
        }
        for (let i = 0; i < this.state.numberOfAssets; i++) {
            userData.push(<FormGroup key={i}>
                <h3>Assets {i + 1}</h3>

                <Row>
                    <Col md={4}>
                        <Label>Asset</Label>
                         <Input type="select" id={`assetName${i}`} name={`assetName${i}`} onChange={this.onAssetDataChangeHandler.bind(this,i)}>
                            <option>{this.state['assetName' + i]}</option>
                            {console.log(this.state['assetName' + i])}
                            <DefaultSelect />
                            {this.getAsset(this.props.ListOfAssets)}
                        </Input> 
                    
                    </Col>

                    <Col md={6}>
                        <Label>Asset Type</Label>
                        {/* <Select options={this.getAssetType(this.props.ListOfAssets)}
              onChange={this.onAssetsChangeHandler.bind(this,i)}
              value={this.state['assetType'+i]}
              /> */}
                        <Input type="select" name={`assetType${i}`}
                          onChange={this.onAssetsChangeHandler.bind(this, i)}
                          disabled
                          id={`assetType${i}`} >
                            <option>{this.state['assetType' + i]}</option>
                            <DefaultSelect />
                            {this.getAssetType(this.props.purchase)}
                        </Input>
                    </Col>
                    <Col md={6}>
                        <Label>Rate</Label>
                        <Input type='text' name={`assetRate${i}`} onChange={this.onRateChangeHandler} value={this.state['assetRate' + i]} />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Label >Quantity</Label>
                        <Input type='text' name={`assetQuantity${i}`} onChange={this.onQuantityChangeHandler.bind(this, i)} value={this.state['assetQuantity' + i]} />
                    </Col>
                    <Col md={4}>
                        <Label>Amount</Label>
                        <Input type='text' name={`assetAmount${i}`} readOnly onChange={this.onChangeHandler} value={this.state[`assetAmount${i}`]} />
                    </Col>
                </Row>

            </FormGroup>

            )

        }


        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{ width: "4%" }}></th>
                    <th style={{ textAlign: "center", width: "4%" }}>#</th>
                    <th style={{ textAlign: "center", width: "12%" }}>Order Id</th>
                    <th style={{ textAlign: "center", width: "12%" }}>IssuedBy</th>
                    <th style={{ textAlign: "center" }}>Expected Date</th>
                    {/* <th style={{ textAlign: "center", width: "16%" }}>Vendor Name</th> */}
                     <th style={{ textAlign: "center", width: "19%" }} onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:"firstName"}});
                        }}>Vendor Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th style={{ textAlign: "center", width: "8%" }}>Contact</th>
                    <th style={{ textAlign: "center", width: "8%" }}>View Order</th>
                    <th style={{ textAlign: "center" }}>Asset Details</th>
                    <th style={{ textAlign: "center" }}>Service Details</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.purchase)}
            </tbody>
        </Table>

        let purchaseData=<div>
            <FormGroup> <Label>Issued By</Label>
                <Input name="issuedBy" value={this.state.issuedBy} readOnly></Input></FormGroup>
            <FormGroup>
                                    <Row>
                                        <Col md={6}>
                                            <Label>Vendor Name</Label>
                                            <Input type="select" name="vendorId" onChange={this.onChangeHandler.bind(this)} value={this.state.vendorId}>
                                                {/* <option>{this.state.vendorName}</option> */}
                                                <DefaultSelect />
                                                {this.vendorList(this.props.vendorMasterReducer)}
                                            </Input>

                                        </Col>
                                        <Col md={6}>
                                            <Label>Expected Date Of Delievery</Label>
                                            <Input type="date"  name="expDateOfDelievery"  min={this.minDate()} onChange={this.onChangeHandler} value={this.state.expDateOfDelievery}></Input>
                            
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                <Button  color="primary" onClick={this.updatePurchaseOrder} >
                                    Save
                                </Button>
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
                        <div className="top-details">
                            <h3>Purchase Order List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashboard/purchaseOrder')} id="addOwner" >Add Purchase Order</Button>
                        </div>
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
                        <Modal isOpen={this.state.pdfOpen} toggle={this.toggleEmployeeModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEmployeeModal.bind(this)}>Purchase Details</ModalHeader>
                            <ModalBody>
                                {pdfDisplay}
                                <Button color="primary" onClick={this.toggleEmployeeModal.bind(this)}>Cancel</Button>
                            </ModalBody>
                        </Modal>
                        <Modal isOpen={this.state.modal} toggle={this.editModal.bind(this)}>
                        <ModalHeader toggle={this.editModal.bind(this)}>Purchase Order Details</ModalHeader>
                            <ModalBody>
                            {!this.state.modalLoading ? purchaseData:<Spinner/>}
                                {/* {userData}
                                {serviceData} */}
                               
                            </ModalBody>
                        </Modal>
                    </div>

                </UI>

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        purchase: state.PurchaseOrder,
        ListOfAssets: state.AssetsTypeReducer,
        vendorMasterReducer: state.vendorMasterReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPurchaseOrder, pdf, removePurchaseOrder, deleteMultiple, getServiceType, fetchAssets, getVendorMaster, assetTypeId, updatePurchaseOrderData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderDetails);