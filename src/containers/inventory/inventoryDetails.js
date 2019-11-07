import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssets } from '../../actions/assetsAction';
import { fetchAssets } from '../../actions/assetsSubAction'
import { getInventory, updateInventory, removeInventory, multipleDelete } from '../../actions/inventoryAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Table, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class InventoryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryId: '',
            assetId: '',
            assetName: '',
            assetSubType: '',
            assetTypeId: '',
            numberOfInventory: '',
            ratePerInventory: '',
            serialNumber: '',
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            multiDelete: [],
            ids: [],
            isDisabled: true,
            formModal: false,
            TotalInventory:'',
            TotalPrice:'',

        };
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggle = (inventoryId, assetName,assetSubType,assetId,assetTypeId) => {
        this.setState({
            inventoryId, assetName,assetSubType,assetId,assetTypeId,
            modal: !this.state.modal
        })
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentWillMount() {
        
        this.props.getAssets()
        this.props.fetchAssets();
        this.props.getInventory()
            .then(() => this.setState({ loading: false }))
    }
    editAssets = () => {

        const { assetId, inventoryId,assetTypeId, } = this.state
        let errors = {};
        if (this.state.assetId === '') {
            errors.assetId = "Assets can't be empty"
        }

        else if (this.state.assetTypeId === '') {
            errors.assetTypeId = "Asset Type Name can't be empty"
        }
   
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({ loading: true })
            this.props.updateInventory(assetId, inventoryId,  assetTypeId, )
                .then(() => this.props.getInventory().then(() => this.setState({ loading: false })));
            this.setState({ modal: !this.state.modal })
        }
    }
    delete = (inventoryId) => {
        this.setState({ loading: true })
        if(window.confirm('Are You Sure ?')){
        this.props.removeInventory(inventoryId)
            .then(() => {
                this.props.getInventory()
                    .then(() => this.setState({ loading: false }))
            })
        }
        else{
            this.props.getInventory()
            .then(() => this.setState({ loading: false }))
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
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
    deleteSelected(ids) {
        this.setState({ loading: true,
         isDisabled:true });
         if(window.confirm('Are You Sure ?')){
        this.props.multipleDelete(ids)
            .then(() => this.props.getInventory().then(() => this.setState({ loading: false })))
            .catch(err => err.response.data.message);
         }
         else{
            this.props.getInventory()
            .then(() => this.setState({ loading: false }))
         }
    }
    totalInventory=({getInventory})=>{
        let numInventory=[];
        let sumInventory=[];
        getInventory.inventory.map((item)=>{
             numInventory.push(item.count);
             sumInventory.push(item.sum)
            return (
                this.setState({
                    TotalInventory:numInventory.reduce(function(total, amount){
                        return total + amount
                      }),
                      TotalPrice:sumInventory.reduce(function(total, amount){
                        return total + amount
                      })
                })
            )
        })
    }
    searchFilter(search) {
        return function (x) {
            return x.asset_master.assetName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }
    renderList = ({ getInventory }) => {
        if (getInventory) {
            return getInventory.inventory.filter(this.searchFilter(this.state.search)).map((items, index) => {
                return (
                    <tr key={items.inventoryId}>
                        <td><input type="checkbox" name="ids" value={items.inventoryId} className="SelectAll"
                            onChange={(e, i) => {
                                const { inventoryId } = items
                                if (!e.target.checked) {
                                    if(this.state.ids.length>-1){
                                        document.getElementById('allSelect').checked=false;
                                    let indexOfId = this.state.ids.indexOf(inventoryId);
                                    if (indexOfId > -1) {
                                        this.state.ids.splice(indexOfId, 1)
                                    }
                                    if(this.state.ids.length === 0){
                                        this.setState({isDisabled: true})
                                    }
                                }
                                }
                                else{
                                    this.setState({ids: [...this.state.ids, inventoryId]});
                                    if(this.state.ids.length >= 0){
                                        this.setState({isDisabled: false})
                                    }
                                }
                            }} /></td>

                        <td style={{textAlign:"center"}}>{index + 1}</td>
                        <td style={{textAlign:"center"}}>{items.asset_master.assetName}</td>
                        <td style={{textAlign:"center"}}>{items.asset_type_master.assetType}</td>
                        <td style={{textAlign:"center"}}>{items.count}</td>
                        <td style={{textAlign:"center"}}>{items.sum}</td>
                        <td style={{textAlign:"center"}}>{items.avgRate.toFixed(2)}</td>
                        <td><button className="btn btn-success mr-2" onClick={this.viewInventoryDetails.bind(this, items.asset_master.assetId)}>Details</button></td>
      
                    </tr>
                )
            })
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close = () => {
        return this.props.history.replace('/superDashBoard')
    }
    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if(ar.length > 0){
            this.setState({isDisabled: false});
        }
    }
    unSelectAll = () => {
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }
      
        this.setState({ ids: [...allIds] });
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
    }
    changePassword=()=>{
          
        return this.props.history.replace('/superDashboard/changePassword')
      }
      viewInventoryDetails(id) {
        localStorage.setItem('assetId', id)
        this.props.history.push('/superDashboard/inventoryList')

    }
    toggles1 = () => {
        this.totalInventory(this.props.inventory)
        this.setState({ formModal: !this.state.formModal })
    }

    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{width:"4%"}}></th>
                    <th style={{textAlign:"center",width:"4%"}}>#</th>
                    <th style={{textAlign:"center"}}>Asset Type</th>
                    <th style={{textAlign:"center"}}>Asset Sub Type</th>
                    <th style={{width:"10%"}}>Number Of Inventory</th>
                    <th style={{width:"10%"}}>Total Price</th>
                    <th style={{width:"10%"}}>Average Price</th>
                    <th style={{width:"10%"}}>Details</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.inventory)}
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
                            <h3 style={{marginRight:'50%'}}>Inventory Details</h3>
                            <Button color="primary" onClick={this.toggles1} style={{float:'right'}} >Check Total</Button>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/inventory')} id="addAssets" >Add Inventory</Button>
                        </div>
                        <div>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {deleteSelectedButton}
                                 <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input
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
                                <FormGroup>
                                    <Label>Asset Type</Label>
                                    <Input maxLength={30} type="select" id="assetId" name="assetId" onChange={this.onChangeHandler} value={this.state.assetId}>
                                        {this.assetsName(this.props.AssetName)}
                                    </Input>
                                    <div className="error">{this.state.errors.assetId}</div>
                                    <Label>Asset Sub Type</Label>
                                    <Input maxLength={30} type="select" id="assetTypeId" name="assetTypeId" onChange={this.onChangeHandler} value={this.state.assetTypeId}>
                                        {this.assetsType(this.props.AssetType)}
                                    </Input>
                                    <div className="error">{this.state.errors.assetTypeId}</div>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editAssets}>Save</Button>
                                    <Button color="danger" onClick={this.toggles}>Cancel</Button>
                                </FormGroup>
                            </ModalBody>
                        </Modal>

                        <Modal isOpen={this.state.formModal} toggle={this.toggles1}>
                                <ModalHeader>Add Member</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Total Number Of Inventory</Label>
                                        <Input readOnly type="text" name="TotalInventory" value={this.state.TotalInventory} />
                                       
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Total Price Of All Inventory</Label>
                                        <Input readOnly type='text' name="TotalPrice"  value={this.state.TotalPrice} />
                                        
                                    </FormGroup>
                                   
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
        inventory: state.Inventory,
        AssetName: state.AssetsReducer,
        AssetType: state.AssetsTypeReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getInventory, getAssets, fetchAssets, updateInventory, removeInventory, multipleDelete }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetails);