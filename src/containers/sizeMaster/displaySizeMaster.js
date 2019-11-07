import React, { Component } from 'react';
import { displaySize,deleteSize,updateSize,deleteMultipleSize} from '../../actions/sizeMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Table,Button, Modal, FormGroup, ModalBody, ModalHeader,  Input, Label } from 'reactstrap';

import UI  from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Spinner from '../../components/spinner/spinner';
class DisplaySizeMaster extends Component {
  state = {
    
    editSizeData: {

      id: "",
      sizeId: [],
 
      isActive:false
    },
    errors: {},
    editSizeModal: false,
    menuVisible: false,
    search:'',
    loading:true,
    ids: [],
    isDisabled: true,
    sizeType: [],
    filterName:"sizeType",
    message:'',
    modalLoading:false
  }

  componentDidMount() {

    this.refreshData()

  }

  refreshData() {
    this.props.displaySize().then(() =>this.setState({loading:false,modalLoading: false, editSizeModal:false}));
  }

   
  searchOnChange = (e) => {
    this.setState({search:e.target.value})
}


  OnKeyPresshandle(event) {
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }

  onChange=(e)=> {

      this.setState({message:''})
  if (!!this.state.errors[e.target.name]) {
    let errors = Object.assign({}, this.state.errors);
    delete errors[e.target.name];
    this.setState({ [e.target.name]: e.target.value, errors });
}
else {
    this.setState({ [e.target.name]: e.target.value });
}
 
} 


  toggleEditSizeModal() {
    this.setState({
      editSizeModal: !this.state.editSizeModal,message:''
    })
  }
  updateSize(){

    let errors = {};
    const { sizeId,sizeType} = this.state
    
    if(!this.state.sizeType){
        errors.sizeType = "Size Type can't be empty. Please select."
    }
    

    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    // const isValid = this.validate();
    if (isValid  &&  this.state.message === '') {
    this.props.updateSize(sizeId,sizeType).then(()=>{this.refreshData()}).catch(err=>this.setState({ modalLoading:false,message:err.response.data.message,loading:false}))
 
      if(this.state.message === ''){
          this.setState({editSizeModal: true})
      }
      else {
          this.setState({editSizeModal: false})
      }
    
      this.setState({
        modalLoading: true
      })
  }
}


  editSize(id, sizeId, sizeType) {
    console.log('ghrehj');

    this.setState({
           id, sizeId, sizeType , editSizeModal: !this.state.editSizeModal
    })
    return <div> loading</div>
  }



  deleteSize(sizeId) {
             this.setState({loading:true})
        let {isActive } =this.state.editSizeData;    
       this.props.deleteSize(sizeId,isActive).then(()=>{this.refreshData()})
      this.setState({editSizeData:{isActive:false}})
  
      
  }
  
  searchFilter(search){
    return function(x){
        return x.sizeType.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

  TowerMasterDetails({ getSize }) {
    console.log("getSize ", getSize);
    if (getSize) {


      return getSize.sort((item1,item2) =>{
       var cmprVal=(item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
       return this.state.sortVal ?cmprVal:-cmprVal}).filter(this.searchFilter(this.state.search)).map((item,index) => {
        return (

          <tr key={item.sizeId}>
                          <td><input type="checkbox" name="ids" className="SelectAll" value={item.sizeId}
                         onChange={(e) => {
                            const {sizeId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(sizeId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, sizeId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
           <td>{index+1}</td>

            <td>{item.sizeType}</td>
  
            <td>
            <div>
              <button className="btn btn-success mr-2"  onClick={this.editSize.bind(this, item.id, item.sizeId, item.sizeType)}> Edit</button>

              <button className="btn btn-danger" onClick={this.deleteSize.bind(this, item.sizeId)}>Delete</button>
              </div>
            </td>
          </tr>
        )
      })
    }
    
  }


  
  addSize =() =>{
    this.props.history.push('/superDashboard/sizemaster')

}

changePassword=()=>{ 
  return this.props.history.replace('/superDashboard/changePassword')
}


  logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}
close=()=>{
  return this.props.history.replace('/superDashBoard')
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

deleteSelected(ids){
     this.setState({loading:true,
     isDisabled:true});
     this.props.deleteMultipleSize(ids)
     .then(() => this.refreshData())
     .catch(err => err.response.data.message);
    }


  render() {
    let tableData;
    tableData=  <Table  className ="table table-bordered" >

    <thead>
      <tr>
      <th style={{width:"4%"}}></th>
        <th>#</th>
        <th onClick={()=>{this.setState((state)=>{return{sortVal:!state.sortVal,filterName:"sizeType"}})}}>Size Details
        <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>

        <th> Actions  </th>
      </tr>
    </thead>
    <tbody>

       {this.TowerMasterDetails(this.props.SizeDetails)}

    </tbody>

  </Table>

  let modalData =<div>
        <FormGroup>
                  <Label for="lastName"> Size Type</Label>
                  <Input id="sizeType" name ="sizeType" value={this.state.sizeType} onChange={this.onChange}
                  
                  onKeyPress ={ this.OnKeyPresshandle}   maxLength={30}
                   />
                     <span className="error">{this.state.errors.sizeType}</span> 
                     <span className="error">{this.state.message} </span>  
                </FormGroup>
    
                <Button color="primary"   className="mr-2" onClick={this.updateSize.bind(this)}>Save</Button>
                <Button color="danger" onClick={this.toggleEditSizeModal.bind(this)}>Cancel</Button>
  </div>
   if(!this.props.SizeDetails.getSize){
    tableData=<div style={{textAlign:'center',fontSize:'20px'}}><Spinner>....Fetching details</Spinner></div>
  }

  let deleteSelectedButton = <Button color="danger" className="mb-2"  
  onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled} >Delete Selected</Button>

    return (
     

      <div>
        <UI onClick={this.logout} change ={this.changePassword}>

          
          <div className ="w3-container w3-margin-top w3-responsive">
          <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                                        <div  className ="top-details" >
            <h3 align="center"> Size List</h3>
            <button  className="btn btn-primary" onClick ={this.addSize} > Add Size master</button>
            </div>
            <Modal isOpen={this.state.editSizeModal} toggle={this.toggleEditSizeModal.bind(this)}>
              <ModalHeader toggle={this.toggleEditSizeModal.bind(this)}>Edit  Size Details</ModalHeader>
              <ModalBody>


            {!this.state.modalLoading?modalData:<Spinner/>}

             
            
                </ModalBody>
            </Modal>
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
         {!this.state.loading?tableData:<Spinner/>}
          </div>
        </UI>
      </div>

    );
  }
}

function mapStateToProps(state) {

  return {
    SizeDetails: state.SizeDetails,


  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displaySize,deleteSize,updateSize,deleteMultipleSize}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySizeMaster)
