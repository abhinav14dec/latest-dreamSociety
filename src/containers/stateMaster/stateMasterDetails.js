import React, { Component } from 'react';
import { getDetails,getCountry,updateDetails,deleteDetails,deleteSelectedStateMasterDetail} from '../../actions/countryAction';

import { bindActionCreators } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Button, Modal,FormGroup, ModalBody, ModalHeader, Label,Input } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
class flatMasterDetails extends Component {

   constructor(props){
      super(props);
    this.state = {
            ids:[],
            stateId:'',
            countryId:'',
            countryName:'',
            stateName:'',
            coverArea:'',
            message:'',
            isDisabled:true,
            loading:true,
            modalLoading: false,
           
            isActive:false,
            editUserModal: false,
            menuVisible: false,
            filterName:"stateName",
            search:'',
            errors:{}
      }
   }

    componentDidMount(){
        
        this.refreshData();
        
    }

    refreshData=()=>{
        console.log('data is refreshed')
        this.props.getDetails().then(() => this.setState({loading:false ,modalLoading: false, editUserModal: false}));
        this.props.getCountry().then(() => this.setState({loading:false, modalLoading: false, editUserModal: false}));
        
    }

    toggleEditUserModal() {
        this.setState({
          editUserModal: ! this.state.editUserModal,
          message: '',
          errors:{}
        });
      }
    
      onCountryChange=(e)=>{
          e.preventDefault();
          this.setState({[e.target.name]:e.target.value})
      }
      updateBook=(e)=> {
        e.preventDefault();
        let{ stateId,countryId,countryName,stateName} =this.state;

        let errors = {};
        // if (!countryId) {
        //     errors.countryId = " select countryName again"
        // }
        if (stateName === '') errors.stateName = "Cant be empty";
    
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        if(isValid && this.state.message === ''){
         
         this.props.updateDetails(stateId,countryId,countryName,stateName).then(() => this.refreshData())
         .catch((err)=>{console.log(err.response.data.message)
            this.setState({modalLoading:false, message:err.response.data.message})});;
            if(this.state.message === ''){
                this.setState({editUserModal: true})
            }
            else {
                this.setState({editUserModal: false})
            }
         this.setState({

           modalLoading:true
         })
        }
    
    }
    onChange=(e)=>{
        this.setState({message: ''})
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value, errors });
        } else {
            console.log('hii');
            this.setState( {[e.target.name]: [e.target.value]});
         }

        console.log(this.state)
    }


    searchFilter(search) {
        return function (x) {
            return x.country_master.countryName.toLowerCase().includes(search.toLowerCase()) ||
                x.stateName.toLowerCase().includes(search.toLowerCase()) ||!search;
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    //   stateName =(e) =>{
         
    //     let{ editUserData } = this.state;

    //     editUserData.stateName = e.target.value;

    //     this.setState({editUserData})
    //     console.log(this.state.editUserData.stateName)
          
    //   }
      

    //   countryName = (e) => {
    //          let{ editUserData }= this.state
    //          editUserData.countryId = e.target.value
    //          this.setState({editUserData})
    //          console.log(this.state.editUserData.countryId)
        
    //   }
      
      editBook(stateId,countryId,countryName,stateName) {
          this.setState({
              stateId,countryId,countryName,stateName, editUserModal: ! this.state.editUserModal
          })    
      }

        deleteUser(stateId){
            this.setState({loading: true})
            let { isActive } = this.state
            this.props.deleteDetails(stateId,isActive).then(()=>this.refreshData())
            // axios.put(`${URN}/state/delete/` + stateId, { isActive }, { headers: authHeader() })
            // .then(() => this.refreshData())
            .then(() => this.setState({isActive:false}));
            // this.setState({ editUserData: { isActive: false }})
            // .then(()=>{console.log('ereeere')
            //     this.props.getDetails()})    
    }

    fetchDetails=({country3})=> {
        console.log(country3)
        if(country3){
          
            return country3.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index) => {
                let countryName= item.country_master.countryName;
                
                return (
                    <tr key={item.stateId}>
                     <td><input type="checkbox" name="ids" className="SelectAll"  value={item.stateId}
                         onChange={(e) => {
                            let {stateId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(stateId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, stateId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                            
                                
                             }}/></td>
                             <td>{index+1}</td>
                        <td>{countryName}</td>
                        <td>{item.stateName}</td>
                        
                        <td>
                            <Button color="success" size="sm" className="mr-2" 
                            onClick={this.editBook.bind(this, item.stateId,item.countryId,countryName, 
                            item.stateName)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.stateId)}>Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }
    fetchDrop({country1}){
        console.log(country1)
        if(country1){
            
           return( 
            country1.map((item) =>{
                   return(
                       <option key={item.countryId} value={item.countryId}>
                        {item.countryName}
                       </option>
                   )
               })
           )
            
        }
    }

    deleteSelectedSubMaintenance(ids){
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedStateMasterDetail(ids)
        .then(() => this.refreshData())
        .catch(err => err.response);
    }
    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/statemaster')
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

    onStateChange=(event)=>{
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar =[];
            for(var i = 0; i < selectMultiple.length; i++){
                    ar.push(parseInt(selectMultiple[i].value,10));
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

    




    render() {
        let tableData;
        tableData=<Table className="table table-bordered">
        
        <thead>
            <tr>
            <th style={{width: "4%"}}></th>
                        <th>#</th>
                <th>Country Name</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'stateName'}});
                        }}>State Name 
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Actions</th>

            </tr>
        </thead>
        <tbody>
            {this.fetchDetails(this.props.countryDetails)}
        </tbody>
       </Table>
       
       let deleteSelectedButton = <Button
     disabled={this.state.isDisabled}
     color="danger"
    className="mb-3"
    onClick={this.deleteSelectedSubMaintenance.bind(this, this.state.ids)}>Delete Selected</Button>

    let modalData = <div>
                 <FormGroup>
                                    <Label for="roles">Country Name</Label>
                                    <Input type="select"
                                    name="countryId"
                                    value={this.state.countryId}
                                     onChange={this.onCountryChange}>
                                        {/* <option>{this.state.countryName}</option> */}
                                        <option disabled>Select</option>

                                        {this.fetchDrop(this.props.countryDetails)}/>
                                        </Input>
                                        {/* <span  className='error'>{this.state.errors.countryId}</span> */}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">State Name</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter state name"
                                        name="stateName"
                                        value={this.state.stateName}
                                        onChange={this.onChange}
                                        maxLength='50'
                                        onKeyPress={this.onStateChange} />
                                        <span  className='error'>{this.state.errors.stateName}</span>
                                        <span className='error'>{this.state.message}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary" className="mr-2" onClick={this.updateBook} >Save</Button>
                                    <Button color="danger" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                </FormGroup>

    </div>
    
        return (
            <div>  
                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top  w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

                        <div className="top-details">
                                <h3>State Master Details</h3>
                                <Button onClick={this.routeToAddNewUser} color="primary">Add State</Button>
                            </div>
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit Details</ModalHeader>
                            <ModalBody>
                            {!this.state.modalLoading  ? modalData : <Spinner />}

                            </ModalBody>
                            
                            
                        </Modal>
                        <SearchFilter
                         type="text" 
                         value={this.state.search}
                         
                         onChange={this.searchOnChange} 
                        />
                        {deleteSelectedButton}
                        <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:'10px',fontWeight:'700'}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                    if(e.target.checked) {
                        this.selectAll();
                    }
                    else if(!e.target.checked){
                        this.unSelectAll();
                    } 
                }
                    
                }  /></Label>
                               {(this.state.loading) ? <Spinner /> : tableData}
                       
                    </div>
                </UI>
                
                 
            </div>
        )
    }
}

function mapStateToProps(state) {
   
    return {
        countryDetails: state.countryDetails
        
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDetails,
    
        getCountry,
        updateDetails,
        deleteDetails,
        deleteSelectedStateMasterDetail
        // AddDetails,
        // getDrop,
        // getSizeDrop
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(flatMasterDetails)
