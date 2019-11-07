import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssets, updateAssetsSub, removeAssetsSub,deleteMultiple } from '../../actions/assetsSubAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, Table, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from './../../constants/defaultSelect';
import { getAssets} from '../../actions/assetsSubAction';
class AssetsTypeSubList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets:'',
            assetId:'',
            filterName: "assetType",
            pageData: [],
            activePage: 0,
            assetTypeId: '',
            assetType: '',
            description: '',
            modal: false,
            menuVisible: false,
            search: '',
            pageCount: 1,
            activePage: 1,
            loading: true,
            errors: {},
            ids: [],
            isDisabled: true,
        };
    }
    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value});
        }
         
    }

    toggle = (assetTypeId, assetId,assets,assetType, description) => {
console.log(assetTypeId, assetId,assets,assetType, description)
        this.setState({
            assetId,
            assetTypeId,
            assets,
            assetType,
            description,
            menuVisible: false,
            search: '',
            modal: !this.state.modal
        })
        console.log(this.state.assets)
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentWillMount() {
        this.props.getAssets()
        this.props.fetchAssets().then(() => this.setState({ loading: false }))
    }


    editAssetsSubType = () => {
        const {assetId,assetTypeId, assetType, description } = this.state
        console.log(assetTypeId, assetType, description )
        let errors = {};
        if(this.state.assetType===''){
            errors.assetType="Assets type can't be empty"
        }
        else if(this.state.description===''){
            errors.description="Description can't be empty"
        }
        else if(assetId===""){
            errors.assetId="Assets Name can't be empty"
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.updateAssetsSub(assetTypeId,assetId, assetType, description)
            .then(() => this.props.fetchAssets().then(()=>this.setState({loading:false})))
            this.setState({ modal: !this.state.modal })
        }


    }
    delete = (assetTypeId) => {
        this.setState({loading:true})
        if(window.confirm('Are You Sure ?')){
        this.props.removeAssetsSub(assetTypeId)
            .then(() => this.props.fetchAssets().then(()=>this.setState({loading:false})))
        }
        else{
             this.props.fetchAssets()
             .then(()=>this.setState({loading:false}))
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter(search) {
        return function (x) {
            return (
                x.asset_master.assetName.toLowerCase().includes(search.toLowerCase()) ||
                x.assetType.toLowerCase().includes(search.toUpperCase()) ||
                x.description.toLowerCase().includes(search.toLowerCase()) || !search);
        }
    }

    renderListAssets = ({ getAssetsType }) => {

        if (getAssetsType) {
            return getAssetsType.assetsType.sort((item1,item2)=>{
                let cmpValue=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal?cmpValue: -cmpValue;
            }).filter(this.searchFilter(this.state.search)).map((item,index) => {
                {
                    return (
                        <tr key={item.assetTypeId}>
                         <td><input type="checkbox" name="ids" value={item.assetTypeId} className="SelectAll"
                         onChange={(e, i) => {
                            const {assetTypeId} = item
                            if(!e.target.checked){
                                if(this.state.ids.length>-1){
                                    document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(assetTypeId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, assetTypeId]})
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                        } 
                             }}/></td>
                            <td style={{textAlign:"center"}}>{index+1}</td>
                            <td style={{textAlign:"center",textTransform: 'capitalize'}}>{item.asset_master.assetName}</td>
                            <td style={{textAlign:"center",textTransform: 'capitalize'}}>{item.assetType}</td>
                            <td style={{textAlign:"center"}}>{item.description}</td>
                            <td style={{textAlign:"center"}}>
                             <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, item.assetTypeId, item.asset_master.assetId,item.asset_master.assetName, item.assetType, item.description)} >Edit</button>
                             <button className="btn btn-danger" onClick={this.delete.bind(this, item.assetTypeId)} >Delete</button>
                            </td>
                        </tr>
                    )
                }
            })
        }

    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        if(window.confirm('Are You Sure ?')){
        this.props.deleteMultiple(ids)
        .then(() => this.props.fetchAssets().then(()=>this.setState({loading:false})))
        .catch(err => err.response.data.message);
        }
        else{
            this.props.fetchAssets()
            .then(()=>this.setState({loading:false}))
        }
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
            let allIds = []
            let unSelectMultiple = document.getElementsByClassName('SelectAll');
            for(var i = 0; i < unSelectMultiple.length; i++){
                    unSelectMultiple[i].checked = false
            }
            
                this.setState({ids: [ ...allIds]});
                if(allIds.length === 0){
                    this.setState({isDisabled: true});
                }
        }
        getAssetsName = ({ AssetsList }) => {
            if (AssetsList) {
                return AssetsList.assets.map((item) => {
                    return (
                        <option key={item.assetId} value={item.assetId}>{item.assetName}</option>
                    )
                })
            }
    
        }
        changePassword=()=>{
          
            return this.props.history.replace('/superDashboard/changePassword')
          }

    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr> 
                {/* <th style={{alignContent:'baseline'}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th> */}
                    <th style={{width:"4%"}}></th>
                    <th style={{textAlign:"center",width:"4%"}}>#</th>
                    <th  style={{textAlign:"center"}}>Asset Name  </th>
                    <th  onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'assetType'
                                }
                            });
                        }} style={{textAlign:"center"}}>Assets Sub Type Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th style={{textAlign:"center", width:'40%'}}>Description</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderListAssets(this.props.ListOfAssets)}
            </tbody>
        </Table>
          let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
          onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                            <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                        <div className="top-details">
                            <h3>Assets Sub Type List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/assetsTypeSubMaster/assetsTypeSubList')} id="addAssets" >Add Assets Sub Type</Button>

                        </div>

                        <div>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                                 {deleteSelectedButton}
                                 <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></Label>
                            {!this.state.loading ? tableData : <Spinner />}
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggles}>
                            <ModalHeader toggle={this.toggle}>Edit Assets Sub Type</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                            <Label>Assets Type</Label>
                    <Input type="select" defaultValue='no-value'  value={this.state.assetId} onChange={this.onChangeHandler} name="assetId">
                    <DefaultSelect/>
                        {this.getAssetsName(this.props.assetsName)}
                    </Input>
                    <span className="error">{this.state.errors.assetId}</span>
                    </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="assetType">Assets Sub Type Name</Label>
                                    <Input  style={{'textTransform': 'capitalize' }} maxLength={30} type="text" id="AssetName" name="assetType" onChange={this.onChangeHandler} value={this.state.assetType} />
                                    <div className="error">{this.state.errors.assetType}</div>
                                    <Label htmlFor="description">Description</Label>
                                    <textarea type="text" style={{ 'textTransform': 'capitalize' ,'height':"100px"}} maxLength={3000} id="AssetName" placeholder="Enter Description..." onChange={this.onChangeHandler} className="form-control" value={this.state.description} height='25%' name='description' />
                                    {/* <textarea  style={{'textTransform': 'capitalize' }} maxLength={1000} type="text" id="AssetName" name="description" onChange={this.onChangeHandler} value={this.state.description} /> */}
                                    <span className="error">{this.state.errors.description}</span>
                                </FormGroup>
                           
                            <FormGroup>  
                                <Button color="primary mr-2" onClick={this.editAssetsSubType}>Save</Button>
                                <Button color="danger" onClick={this.toggles}>Cancel</Button>
                            </FormGroup>
                            </ModalBody>
                        </Modal>
                    </div>
                </UI>
            </div>
        );
    }
}


function mapStatToProps(state) {
    console.log('dflkjdklfjkkkkkkkkkk',state.AssetsTypeReducer)
    return {
        ListOfAssets: state.AssetsTypeReducer,
        assetsName: state.AssetsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchAssets, updateAssetsSub, removeAssetsSub,deleteMultiple,getAssets }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(AssetsTypeSubList);
