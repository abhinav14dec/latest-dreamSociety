import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRf,removeRf,deleteMultipleRf,updateRF} from '../../actions/rfIdAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Table,FormGroup,Button,Input,Label,ModalBody,ModalHeader,Modal} from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter'

class RFIdDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            rfid:'',
            rfidId:'',
            modal: false,
            loading: true,
            isDisabled: true,
            search: '',
            ids:[],
            errors: {},
            message:''
        }
    }

    componentDidMount(){
        this.props.fetchRf()
        .then(() => this.setState({ loading: false }))
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    changePassword=()=>{
        return this.props.history.replace('/superDashboard/changePassword')
      }

      close=()=>{
        return this.props.history.replace('/superDashBoard')
    }
    toggle = (rfidId,rfid) => {
        this.setState({
            rfidId,
            rfid,
            modal: !this.state.modal
        })
    }
    delete = (rfidId) => {
        this.setState({loading:true})
        if(window.confirm('Are You Sure ?')){
        this.props.removeRf(rfidId)
        .then(() => {this.props.fetchRf()
        .then(()=>this.setState({loading:false}))})
        }
        else{
            this.props.fetchRf()
            .then(()=>this.setState({loading:false}))
        }
    }
    deleteSelected(ids){
        this.setState({loading:true,
            isDisabled:true});
            if(window.confirm('Are You Sure ?')){
        this.props.deleteMultipleRf(ids)
        .then(() => {this.props.fetchRf()
         .then(()=>this.setState({loading:false}))})
         .catch(err => err.response.data.message);
        }
        else{
            this.props.fetchRf()
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
    renderList = ({ rfList }) => {
        if(rfList && rfList.RFIDs){
            return rfList.RFIDs.map((items,index)=>{
                return (

                    <tr key={items.rfidId}>
                      <td style={{textAlign:"center"}}><input type="checkbox" name="ids" value={items.rfidId} className="SelectAll"
                         onChange={(e, i) => {
                            const {rfidId} = items
                            if(!e.target.checked){
                                if(this.state.ids.length>-1){
                                    document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(rfidId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                        }
                            else {
                                this.setState({ids: [...this.state.ids, rfidId]})
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                        } 
                             }}/></td>
                        <td style={{textAlign:"center"}}>{index+1}</td>
                        <td style={{textAlign:"center", textTransform: 'capitalize'}}>{items.rfid}</td>
                        <td style={{textAlign:"center"}}>
                        <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, items.rfidId, items.rfid)} >Edit</button>
                        <button className="btn btn-danger" onClick={this.delete.bind(this, items.rfidId)} >Delete</button>
                        </td>
                    </tr>
                )

            })
        }
    }
    onChangeHandler = (event) => {
        this.setState({ message: '' })
          if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors});
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    editRFID=()=>{
        const { rfid,rfidId} = this.state
        let errors = {};
        if(rfid===''){
            errors.rfid="Rf Id can't be empty"
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.updateRF(this.state.rfidId,this.state.rfid)
            .then(() => this.props.fetchRf().then(()=>{this.setState({loading:false,modal:false})}))
            .catch(err => {
                this.setState({ loading: false, message: err.response.data.message })
            })
        if (this.state.message === '') {
            this.setState({ modal: true })
        }
        else {
            this.setState({ modal: false })
        }

        this.setState({
            loading: true
        })
            // this.setState({ modal: !this.state.modal })
        }
    }
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{width:"4%"}}></th>
                    <th style={{textAlign:"center",width:"4%"}}>#</th>
                    <th style={{textAlign:"center"}}>RF ID</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.rfId)}
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
                            <h3>RF ID Master</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/rfId')} >Add RF ID</Button>
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
                            <ModalHeader toggle={this.toggle}>Edit RF ID </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="AssetName">RF ID</Label>
                                    <Input type="text"  name="rfid" onChange={this.onChangeHandler} value={this.state.rfid}/>
                                    <span className="error">{this.state.errors.rfid}</span>
                                    <span className="error">{this.state.message}</span>
                                </FormGroup>
                            <FormGroup>
                                <Button color="primary mr-2" onClick={this.editRFID}>Save</Button>
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
function mapStateToProps(state){
    return{
        rfId:state.RFIdReducer
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchRf,removeRf,deleteMultipleRf,updateRF},dispatch)
    
}
export default connect(mapStateToProps,mapDispatchToProps)(RFIdDetails);