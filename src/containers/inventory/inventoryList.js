import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Table, Label } from 'reactstrap';
import { getInventoryList,removeInventory,multipleDelete,updateInventory } from '../../actions/inventoryAction';
import { getAssets } from '../../actions/assetsAction';
import { fetchAssets } from '../../actions/assetsSubAction'
import SearchFilter from '../../components/searchFilter/searchFilter'
var id;
class InventoryList extends Component {
    constructor(props){
        super(props)
        this.state={
            filterName: "dateOfPurchase",
            loading: true,
            errors: {},
            multiDelete: [],
            ids: [],
            isDisabled: true,
            modal: false,
            assetId: '',
            assetName:'',
            assetTypeId: '',
            serialNumber: '',
            dateOfPurchase:'',
            ratePerInventory:'',
            search: '',
            asset:''
        }
    }
    close = () => {
        return this.props.history.replace('/superDashBoard')
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
    
        return function (x) {
      console.log(x)
            return (
                
                 x.asset_master.assetName.toLowerCase().includes(search.toLowerCase()) ||
                 x.rate.toString().includes(search.toLowerCase())||
                 x.asset_type_master.assetType.toLowerCase().includes(search.toLowerCase()) ||!search
            )
        }
    }
    componentWillMount(){
        id = localStorage.getItem('assetId')
    }
    componentDidMount() {
        this.props.getAssets()
        this.props.fetchAssets();
        this.props.getInventoryList(id)
            .then(() => this.setState({ loading: false }))
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    delete = (inventoryId) => {
        this.setState({ loading: true })
        if(window.confirm('Are You Sure ?')){
        this.props.removeInventory(inventoryId)
            .then(() => {
                this.props.getInventoryList(id)
                    .then(() => this.setState({ loading: false }))
            })
        }
        else{
            this.props.getInventoryList(id)
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
    toggle = (inventoryId, assetName, assetType,dateOfPurchase,ratePerInventory, serialNumber,assetId,assetTypeId) => {
        console.log(assetId)
        this.setState({
            inventoryId,
            assetName,
            dateOfPurchase,
            assetType,
            serialNumber,
            ratePerInventory,
            assetId,
            assetTypeId,
            modal: !this.state.modal
        },function(){
        })
    }
    renderList=({inventoryList})=>{
        if (inventoryList) {
            return inventoryList.inventory.sort((item1,item2)=>{
                let cmpValue=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal?cmpValue: -cmpValue;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                return (
                    <tr key={item.inventoryId}>
                        <td><input type="checkbox" name="ids" value={item.inventoryId} className="SelectAll"
                            onChange={(e, i) => {
                                const { inventoryId } = item
                                if (!e.target.checked) {
                                    if (this.state.ids.length > -1) {
                                        document.getElementById('allSelect').checked = false;
                                        let indexOfId = this.state.ids.indexOf(inventoryId);
                                        if (indexOfId > -1) {
                                            this.state.ids.splice(indexOfId, 1)
                                        }
                                        if (this.state.ids.length === 0) {
                                            this.setState({ isDisabled: true })
                                        }
                                    }
                                }
                                else {
                                    this.setState({ ids: [...this.state.ids, inventoryId] })
                                    if (this.state.ids.length >= 0) {
                                        this.setState({ isDisabled: false })
                                    }
                                }
                            }} /></td>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.asset_master.assetName}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.asset_type_master.assetType}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.dateOfPurchase}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.rate}</td>
                        <td style={{ textAlign: "center", width: '10px' }}>{item.serialNumber}</td>
                        <td style={{ textAlign: "center" }}>
                            <button className="btn btn-success mr-2" onClick={this.toggle.bind(this,item.inventoryId,item.asset_master.assetName,item.asset_type_master.assetType,item.dateOfPurchase,item.rate,item.serialNumber,item.assetId,item.assetTypeId)} >Edit</button>
                            <button className="btn btn-danger" onClick={this.delete.bind(this, item.inventoryId)} >Delete</button>
                        </td>

                    </tr>
                )
            })
        }
    }
    deleteSelected(ids) {
        this.setState({
            loading: true,
            isDisabled: true
        });
        if (window.confirm('Are You Sure ?')) {
            this.props.multipleDelete(ids)
                .then(() => this.props.getInventoryList(id).then(() => this.setState({ loading: false })))
                .catch(err => err.response.data.message);
        }
        else {
            this.props.getInventoryList(id)
                .then(() => this.setState({ loading: false }))
        }
    }
    assetsName = ({ AssetsList }) => {
        if (AssetsList) {
            return AssetsList.assets.map((item) => {
                return (
                    <option key={item.assetId} value={item.assetId}>{item.assetName}</option>
                )
            })
        }

    }
    assetsType = ({ getAssetsType }) => {
        if (getAssetsType) {
            return getAssetsType.assetsType.map((item) => {
                return (
                    <option key={item.assetTypeId} value={item.assetTypeId}>{item.assetType}</option>
                )
            })
        }

    }
    maxDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }
    onChangeHandler = (event) => {
       console.log(event.target.value)
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

    editInventory = () => {

        const {
            inventoryId,
            dateOfPurchase,
            serialNumber,
            ratePerInventory,
            assetId,
            assetTypeId, } = this.state
            console.log('assetName',assetId,"assetTypeId",assetTypeId )
        let errors = {};
        if(this.state.assetId===''){
            errors.assetId="Asset Id can't be empty"
        }
        else if(this.state.assetTypeId===''){
            errors.assetTypeId="Asset Id can't be empty"
        }
        else if(this.state.dateOfPurchase===''){
            errors.dateOfPurchase="date can't be empty" 
        }
        else if(this.state.ratePerInventory===''){
            errors.ratePerInventory="rate can't be empty" 
        }
        else if(this.state.serialNumber===''){
            errors.serialNumber="serial no. can't be empty" 
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        
        if (isValid) {
            this.setState({ loading: true })
            this.props.updateInventory(
                inventoryId,
                dateOfPurchase,
                serialNumber,
                ratePerInventory,
                assetId,
                assetTypeId, )
                .then(() => this.props.getInventoryList(id).then(() => this.setState({ loading: false })));
            this.setState({ modal: !this.state.modal })
        }
    }
   
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{ width: "4%" }}></th>
                    <th style={{ textAlign: "center", width: "4%" }}>#</th>
                    <th style={{ textAlign: "center", width: "16%" }}>Asset Name</th>
                    <th style={{ textAlign: "center", width: "16%" }}>Asset Type</th>
                    <th  onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'dateOfPurchase'
                                }
                            });
                        }} style={{ textAlign: "center" }}>Date of Purchase <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th style={{ textAlign: "center" }}>Rate</th>
                    <th style={{ textAlign: "center" }}>Serial Number</th>
                    <th style={{ textAlign: "center", width: '15%' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.inventory)}
            </tbody>
        </Table>
        let modalData=<div>
            <FormGroup>                                <FormGroup>
                                    <Label>Asset Type</Label>
                                    <Input  type="select" id="assetId" name="assetId" onChange={this.onChangeHandler} value={this.state.assetId}>
                                        {this.assetsName(this.props.AssetName)}
                                    </Input>
                                    <div className="error">{this.state.errors.assetId}</div>
                                    <Label>Asset Sub Type</Label>
                                    <Input type="select" id="assetTypeId" name="assetTypeId" onChange={this.onChangeHandler} value={this.state.assetTypeId}>
                                        {this.assetsType(this.props.AssetType)}
                                    </Input>
                                    <div className="error">{this.state.errors.assetTypeId}</div>
                                </FormGroup>

                                    <div>
                                    <Label>Purchase Date</Label>
                                    <Input type="date" max={this.maxDate()} name="dateOfPurchase" onChange={this.onChangeHandler} value={this.state.dateOfPurchase}/>
                                     </div> 
                                    <div className="error">{this.state.errors.numberOfInventory}</div>
                                    <Label>Rate</Label>
                                    <Input maxLength={30} type="text" id="ratePerInventory" name="ratePerInventory" onChange={this.onChangeHandler} value={this.state.ratePerInventory} />
                                    <div className="error">{this.state.errors.ratePerInventory}</div>
                                    <Label>Serial Number</Label>
                                    <Input maxLength={30} type="text" id="serialNumber" name="serialNumber" onChange={this.onChangeHandler} value={this.state.serialNumber} />
                                    <div className="error">{this.state.errors.serialNumber}</div>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editInventory}>Save</Button>
                                    <Button color="danger" onClick={this.toggles}>Cancel</Button>
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
                            <h3>Inventory List</h3>
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
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggles}>
                            <ModalHeader toggle={this.toggle}>Edit Inventory</ModalHeader>
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

function mapStateToProps(state){
    return{
        inventory: state.Inventory,
        AssetName: state.AssetsReducer,
        AssetType: state.AssetsTypeReducer
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({getInventoryList,removeInventory,multipleDelete,getAssets,fetchAssets,updateInventory},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(InventoryList);