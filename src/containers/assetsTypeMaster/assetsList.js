import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssets, updateAssets, removeAssets,deleteMultipleAssets } from '../../actions/assetsAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Table, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class AssetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: "assetName",
            assetId: '',
            assets: '',
            description: '',
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            ids: [],
            isDisabled: true,
        };
    }
    onChangeHandler = (event) => {
        // const { name, value } = event.target;
        // this.setState({ [name]: value });
          if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    toggle = (assetId, assetName, description) => {

        this.setState({
            assetId,
            assets: assetName,
            description,
            modal: !this.state.modal
        })
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentWillMount() {
        this.props.getAssets()
            .then(() => this.setState({ loading: false }))
    }
    editAssets = () => {
        const { assetId, assets, description } = this.state
        let errors = {};
        if(this.state.assets===''){
            errors.assets="Assets can't be empty"
        }
        else if(this.state.description===''){
            errors.description="Description can't be empty"
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.updateAssets(assetId, assets, description)
            .then(() => this.props.getAssets().then(()=>this.setState({loading:false})));
            this.setState({ modal: !this.state.modal })
        }
    }
    delete = (assetId) => {
        this.setState({loading:true})
        if(window.confirm('Are You Sure ?')){
        this.props.removeAssets(assetId)
        .then(() => {this.props.getAssets()
        .then(()=>this.setState({loading:false}))})
        }
        else{
            this.props.getAssets()
            .then(()=>this.setState({loading:false}))
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.assetName.toLowerCase().includes(search.toLowerCase()) ||
                x.description.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    renderList = ({ AssetsList }) => {
        if (AssetsList) {
            return AssetsList.assets.sort((item1,item2)=>{
                let cmpValue=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal?cmpValue: -cmpValue;
            }).filter(this.searchFilter(this.state.search)).map((items,index) => {
                return (

                    <tr key={items.assetId}>
                      <td style={{textAlign:"center"}}><input type="checkbox" name="ids" value={items.assetId} className="SelectAll"
                         onChange={(e, i) => {
                            const {assetId} = items
                            if(!e.target.checked){
                                if(this.state.ids.length>-1){
                                    document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(assetId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                        }
                            else {
                                this.setState({ids: [...this.state.ids, assetId]})
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                        } 
                             }}/></td>
                        <td style={{textAlign:"center"}}>{index+1}</td>
                        <td style={{textAlign:"center", textTransform: 'capitalize'}}>{items.assetName}</td>
                        <td style={{textAlign:"center"}}>{items.description}</td>
                        <td style={{textAlign:"center"}}>
                        <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, items.assetId, items.assetName, items.description)} >Edit</button>
                        <button className="btn btn-danger" onClick={this.delete.bind(this, items.assetId)} >Delete</button>
                        </td>
                    </tr>
                )
            })
        }
    }


    deleteSelected(ids){
        this.setState({loading:true,
            isDisabled:true});
            if(window.confirm('Are You Sure ?')){
        this.props.deleteMultipleAssets(ids)
        .then(() => {this.props.getAssets()
         .then(()=>this.setState({loading:false}))})
         .catch(err => err.response.data.message);
        }
        else{
            this.props.getAssets()
         .then(()=>this.setState({loading:false}))
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
    onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
       changePassword=()=>{
       this.props.history.push('/superDashboard/changePassword')
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
                    <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'assetName'
                                }
                            });
                        }} style={{textAlign:"center"}}>Asset Name  <i class="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                    <th style={{textAlign:"center",width:'40%'}}>Description</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.List)}
            </tbody>
        </Table>
         let deleteSelectedButton = <Button color="danger" className="mb-2"  disabled={this.state.isDisabled} 
         onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                        <div className="top-details">
                            <h3>Assets List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/assetsMaster/assetsList')} id="addAssets" >Add Assets</Button>
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
                            {!this.state.loading ? tableData : <Spinner/>}
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggles}>
                            <ModalHeader toggle={this.toggle}>Edit Assets</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="AssetName">Assets Name</Label>
                                    <Input  style={{'textTransform': 'capitalize' }} maxLength={30} type="text" id="AssetName" name="assets" onChange={this.onChangeHandler} value={this.state.assets} onKeyPress={this.onKeyPressHandler }/>
                                    <div className="error">{this.state.errors.assets}</div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input  style={{'textTransform': 'capitalize' }} maxLength={1000} type="text" id="AssetName" name="description" onChange={this.onChangeHandler} value={this.state.description}/>
                                    <span className="error">{this.state.errors.description}</span>
                                </FormGroup>
                          
                            <FormGroup>
                                <Button color="primary mr-2" onClick={this.editAssets}>Save</Button>
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
    return {
        List: state.AssetsReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAssets, updateAssets, removeAssets,deleteMultipleAssets }, dispatch);
}

export default connect(mapStatToProps, mapDispatchToProps)(AssetList);