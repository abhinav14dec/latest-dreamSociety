import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCommonArea,updateAreas,deleteCommonArea,deleteSelectedCommonArea} from '../../actions/commonAreaAction';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';


class DisplayCommonArea  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName:"commonArea",
            commonAreaId:'',
            commonArea: '',
            errors:{},
            loading:true,
            modalLoading: false,
            message:'',
            editCommonAreaModal: false,
            ids:[],
            search: '',
            isDisabled:true
           
        }

    }

componentDidMount() {
    this.refreshData() ;
 }
    
refreshData() {
    this.props.getCommonArea().then(()=> this.setState({loading:false, modalLoading: false, editCommonAreaModal:false}));
}

searchFilter(search) {
    return function (x) {
        return x.commonArea.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}


handleChange = (event) => {
    this.setState({message:''});
    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value.trim(''), errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value.trim('') });
    }
}

edit (commonAreaId,commonArea) {console.log(commonArea)
    this.setState({

        commonAreaId,commonArea, editCommonAreaModal: !this.state.editCommonAreaModal
    });

}

toggleCommonModal() {
    this.setState({
        editCommonAreaModal: !this.state.editCommonAreaModal, message:''
    });
}


searchOnChange = (e) => {
    this.setState({ search: e.target.value })
}

logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}

close=()=>{
    return this.props.history.replace('/superDashBoard')
}

updateAreas() {
    const {commonAreaId,commonArea} = this.state;
    let errors={};
    if(this.state.commonArea===''){
        errors.commonArea="Common Area can't be empty";
    }
    this.setState({errors});
    const isValid =Object.keys(errors).length===0;
    if(isValid &&  this.state.message === ''){

        this.props.updateAreas(commonAreaId,commonArea)
        .then(() => this.refreshData())
        .catch(err=>{
            this.setState({modalLoading:false,message: err.response.data.message, loading: false})
            })
            if(this.state.message === ''){
                this.setState({editCommonAreaModal: true})
            }
            else {
                this.setState({editCommonAreaModal: false})
            }       
        this.setState({ modalLoading: true
   })

    }         
}

deleteArea(commonAreaId){console.log(commonAreaId)
    this.setState({loading:true})
    let {isActive } =this.state;  
    this.props.deleteCommonArea(commonAreaId,isActive)
        .then(() => this.refreshData())
        this.setState({isActive:false})
}

    
deleteSelected(ids){
    this.setState({loading:true,
    isDisabled:true});
    this.props.deleteSelectedCommonArea(ids)
    .then(() => this.refreshData())
    .catch(err => err.response.data.message);
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

push=()=>{
    this.props.history.push('/superDashboard/commonAreaMaster')
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


OnKeyPressUserhandler=(event) => {
    const pattern = /^[a-zA-Z ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}


renderList = ({ getAreas }) => {console.log(getAreas)
    if (getAreas && getAreas.commonAreas) {
        return getAreas.commonAreas.sort((item1,item2)=>{
            var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
            return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index)=>{
            return (
            <tr key={item.commonAreaId}>
              <td><input type="checkbox" name="ids" className="SelectAll" value={item.commonAreaId}
                         onChange={(e) => {
                            const {commonAreaId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(commonAreaId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, commonAreaId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
             <td>{index+1}</td>
             <td>{item.commonArea}</td>
             <td>
                <Button color="success" className="mr-2" onClick={this.edit.bind(this,item.commonAreaId,item.commonArea)} >Edit</Button>
                <Button color="danger" onClick={this.deleteArea.bind(this, item.commonAreaId)}>Delete</Button>
             </td>
             </tr>
        )
    })
    }

}
render(){
    let tableData;
        tableData=
        <Table className="table table-bordered">
        <thead>
            <tr>
            <th style={{width:'4%'}}></th>
                <th style={{width:'4%'}}>#</th>
                <th  onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'commonArea'}});
                        }}>Common Area <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Actions</th>        
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.commonAreaReducer)}
        </tbody>
    </Table>
           let modalData =<div>
           <FormGroup>
                        <Label>Common Area</Label>                               
                        <Input type="text" name="commonArea"  maxLength={100} onChange={this.handleChange} onKeyPress={this.OnKeyPressUserhandler} value={this.state.commonArea} ></Input>

                        <span className="error">{this.state.errors.commonArea}</span>
                        <span className="error">{this.state.message}</span>
                    </FormGroup>
                    <FormGroup>
                            <Button color="primary" className="mr-2"  onClick={this.updateAreas.bind(this)}>Save </Button>
                            <Button color="danger" onClick={this.toggleCommonModal.bind(this)} >Cancel</Button>
                        </FormGroup>
          </div>
          
          let deleteSelectedButton = <Button color="danger" className="mb-2"
          onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>

      
    return(
        <div>
             <UI onClick={this.logout} change={this.changePassword}>
                  
                  <div className="w3-container w3-margin-top w3-responsive">
                  <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                  <span aria-hidden="true">&times;</span>
                   </div>
                   <Modal isOpen={this.state.editCommonAreaModal} toggle={this.toggleCommonModal.bind(this)} >
                        <ModalHeader toggle={this.toggleCommonModal.bind(this)}>Edit Common Area</ModalHeader>
                        <ModalBody>
                           {!this.state.modalLoading?modalData:<Spinner/>}
                        </ModalBody>
                    </Modal>
                   <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Common Area Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Add Common Area</Button></div>

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
                        } }/>
                    </Label>

                          {!this.state.loading ? tableData : <Spinner />}
                  </div>
               
             </UI>
        </div>
    )
}
}


function mapStateToProps(state) {
    return {
       commonAreaReducer: state.commonAreaReducer

       }
   }

function mapDispatchToProps(dispatch) {
   return bindActionCreators({getCommonArea,updateAreas,deleteCommonArea,deleteSelectedCommonArea}, dispatch);
   }

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCommonArea);
