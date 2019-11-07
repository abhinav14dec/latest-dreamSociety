import React, { Component } from 'react';
import { getDetails, AddDetails, getDrop, getSizeDrop,getPageDetails,noOfCount,
    deleteSelectedFlatMasterDetail,
    getTotalItems } from '../../actions/flatMasterAction';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { authHeader } from '../../helper/authHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Label,Input } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';
import { URN } from '../../actionCreators/index'
import Pagination from "react-js-pagination";   

class flatMasterDetails extends Component {
   constructor(props){
       super(props);
         this.state = {
            ids:[],
        flatId: '',
        societyId: '',
        societyName: '',
        flatType: '',
        flatSuperArea: '',
        sizeId: '',
        sizeType: '',
        sizeType1: '',
        coverArea: '',
        filterName:"flatType",
        isDisabled: true,
        loading:true,
        modalLoading: false,
        isActive: false,
        editUserModal: false,
        menuVisible: false,
        search: '',
        errors:{},
        activePage: '1',
        limit:'5',
        // itemsCountPerPage :1,
        totalItemsCount:''
        }

   } 
  


    componentDidMount() {

       console.log(localStorage.getItem('societyId'));
       this.setState({societyId: localStorage.getItem('societyId')})
        this.totalCount()
        this.refreshData()

    }



    refreshData() {
       console.log('done')
        const defaultPage=this.state.activePage;
        this.props.getDetails(defaultPage).then(() => this.setState({loading:false, modalLoading: false,editUserModal: false}));
        this.props.getDrop().then(() => this.setState({loading:false, modalLoading: false,editUserModal: false}));
       
        this.props.getSizeDrop().then(() => this.setState({loading:false, modalLoading: false,editUserModal: false}));

    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal,
            errors:{}
        });
    }

    sizeChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    societyChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    updateBook = (e) => {
        e.preventDefault();
    
       
        let { flatId, 
            // societyId,societyName,
             flatType, flatSuperArea,sizeId, coverArea } = this.state
       
        // console.log(flatId, societyId,societyName, flatType, flatSuperArea,sizeId, coverArea);
        let errors = {};
       
        if (flatType === '') errors.flatType = "Cant be empty";
        else if (flatType.length < 3) errors.flatType = "Characters should be less than four"
        if (flatSuperArea === '') errors.flatSuperArea = "Cant be empty";

        
        if (coverArea === '') errors.coverArea = "Cant be empty";
        else if (parseInt(coverArea,10) >parseInt(flatSuperArea,10)) errors.coverArea= "Cover Area cannot be greater then Flat Super Area";
        
        else if (parseInt(this.state.coverArea) == parseInt(this.state.flatSuperArea)) errors.coverArea=
        "Cover Area cannot be equal to Flat Super Area";
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        if(isValid){
        
        axios.put(`${URN}/flat/` + flatId, {
            // societyName,societyId,
             flatType, flatSuperArea,sizeId,
             coverArea   
        }, { headers: authHeader() }).then((response) => {
            this.refreshData();
        })
        this.setState({
          modalLoading:false
        })
        this.setState({
            modalLoading:true
        })
    }
        
    }
    onChange=(e)=>{
        console.log(this.state);
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
            const flatSuperArea = x.flatSuperArea.toString();
            const coverArea = x.coverArea.toString()
            return x.flatType.toLowerCase().includes(search.toLowerCase()) ||
                flatSuperArea.toLowerCase().includes(search.toLowerCase()) ||
                x.size_master.sizeType.toLowerCase().includes(search.toLowerCase()) ||
                coverArea.toLowerCase().includes(search.toLowerCase()) ||
                !search;
            
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }


    editBook(flatId, 
        // societyId,societyName,
         flatType, flatSuperArea, sizeId,sizeType, coverArea) {
        this.setState({
            flatId,
            //  societyId,societyName,
              flatType, flatSuperArea, sizeId,sizeType, coverArea , editUserModal: !this.state.editUserModal
        })
    }

    deleteUser(flatId) {
        let { isActive } = this.state
        axios.put(`${URN}/flat/delete/` + flatId, { isActive }, { headers: authHeader() }).then((response) => {
            this.refreshData()
            // .this.getItems(this.props.flats)
            this.setState({ isActive: false ,loading:true })

        }).then(()=>this.totalCount())
    }

    fetchUsers({ list1 }) {
        
        if (list1) {
            console.log("hiiiiiiiiiiiii",list1);
            return list1.flat.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index) => {
                // let societyName = item.society_master.societyName;
                let sizeType= item.size_master.sizeType;
        
                     
                return (
                    
                    
                    <tr key={item.flatId}>
                      <td><input type="checkbox" name="ids" className="SelectAll"  value={item.flatId}
                         onChange={(e) => {
                            let {flatId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(flatId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, flatId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                            
                                
                             }}/></td>
                        <td>{index + 1}</td>
                        {/* <td>{societyName}</td> */}
                        <td>{item.flatType}</td>
                        <td>{item.flatSuperArea}</td>
                        <td>{sizeType}</td>
                        <td>{item.coverArea}</td>
                        <td>
                            <Button color="success" size="sm" className="mr-2"
                                onClick={this.editBook.bind(this, item.flatId,
                                    // item.societyId, societyName
                                    
                                    item.flatType, item.flatSuperArea,item.sizeId, sizeType, item.coverArea)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.flatId)} >Delete</Button>
                        </td>
                    </tr>
                )
        
            })
        }
    }
    fetchDrop({ list2 }) {
        // console.log(list2);

        if (list2) {

            return (
                list2.map((item) => {
                    return (
                        <option key={item.societyId} value={item.societyId}>
                            {item.societyName}
                        </option>
                    )
                })
            )

        }
    }

    fetchSizeDrop({ list3 }) {
        if (list3) {

            return (
                list3.map((item) => {
                    return (
                        <option key={item.sizeId} value={item.sizeId}>
                            {item.sizeType}
                        </option>
                    )
                })
            )

        }
    }
    deleteSelectedSubMaintenance(ids){
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedFlatMasterDetail(ids)
        .then(() => this.refreshData()).then(()=>this.totalCount())
        .catch(err => err.response);
    }
    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/flatmaster')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    OnKeyPresshandlerPhone=(event)=>{
        const pattern = /^[0-9+ ]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    handlePageChange=(pageNumber)=> {
        console.log(`active page is ${pageNumber}`);
        // this.setState({activePage: pageNumber}) ;
        // this.state.activePage=pageNumber;        
        // const activePage=this.state.activePage;
        
            this.props.getPageDetails(pageNumber);
        
        
      
      }

    //   countPerPage=(e)=>{
    //        e.preventDefault();
    //   }

    onChange1=(e)=>{
        e.preventDefault();
        console.log('hii');
        // this.setState({itemsCountPerPage:e.target.value})
        const activePage=this.state.activePage;
        // this.state.limit=`${e.target.value}`;   
        console.log(this.state.limit,activePage)
        // console.log(countPerPage);
        this.props.noOfCount({limit: parseInt(e.target.value,10)},activePage).then(this.fetchUsers(this.props.flats))
        .then(() => this.refreshData());
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

    getItems=({totalItems})=>{
        console.log('textbox wrkign');

        if(totalItems){
            
        console.log("get total items in db",totalItems.data.count);
        // this.state.totalItemsCount=totalItems.data.count;
      
        this.setState({totalItemsCount:totalItems.data.count})

        }
       
        // console.log('got total items');
    }

    New=()=>{
        console.log('dahcfdsghc dsdvcdvcjdgsv cjdgtfdhcgvchgtvdc');
    }

    totalCount=(e)=>{
        console.log('hii');
        this.props.getTotalItems().then(()=> this.getItems(this.props.flats));
      
       
    
        // this.setState({totalItemsCount:'15'})

    }


    render() {
        let tableData;
       
        
        tableData= 
        <Table className="table table-bordered">
        <thead>
           
            <tr>
            
                
            <th style={{width: "4%"}}></th>
                        <th>#</th>
                {/* <th>Society Name</th> */}
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'flatType'}});
                        }}>Flat Type 
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Flat SuperArea</th>
                <th >Size Type</th>
                <th>Cover Area</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
      
      
            {this.fetchUsers(this.props.flats)}
            
           
        </tbody>
        {/* <Pagination/> */}
       
    </Table>
    let deleteSelectedButton = <Button
     disabled={this.state.isDisabled}
     color="danger"
    className="mb-3"
    onClick={this.deleteSelectedSubMaintenance.bind(this, this.state.ids)}>Delete Selected</Button>

    let modalData=<div>
                         <FormGroup>
                                    <Label for="roles">Flat Type</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter  flat type"
                                        name="flatType"
                                        value={this.state.flatType}
                                        onChange={this.onChange} 
                                        maxLength='4'/>
                                        <span  className='error'>{this.state.errors.flatType}</span>
                                        
                                </FormGroup>
                                <FormGroup>
                                    <Label for="firstName">Flat Super Area</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter flat super area"
                                        name="flatSuperArea"
                                        value={this.state.flatSuperArea}
                                        onChange={this.onChange}
                                        onKeyPress={this.OnKeyPresshandlerPhone}
                                        maxLength='4' />
                                        <span  className='error'>{this.state.errors.flatSuperArea}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">Size Type</Label>
                                    <Input type="select" 
                                    value={this.state.sizeId} 
                                    name="sizeId"
                                    onChange={this.sizeChange}>
                                       
                                        <option disabled>Select</option>
                                        {this.fetchSizeDrop(this.props.flats)}
                                    </Input>
                                    {/* <span  className='error'>{this.state.errors.sizeId}</span> */}

                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Cover Area</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter cover area"
                                        name="coverArea"
                                        value={this.state.coverArea}
                                        onChange={this.onChange}
                                        onKeyPress={this.OnKeyPresshandlerPhone}
                                        maxLength='4' />
                                        <span  className='error'>{this.state.errors.coverArea}</span>

                                </FormGroup>
                                <FormGroup>
                                <Button color="primary mr-2" onClick={this.updateBook}>Save</Button>
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
                             <h3>Flat Master Details</h3>
                                <Button onClick={this.routeToAddNewUser} color="primary">Add Flats</Button>
                                </div>

                            
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a flat</ModalHeader>
                            <ModalBody>
                                {/* <FormGroup>
                                    <Label for="roles">SocietyName</Label>
                                    <Input type="select" 
                                    name="societyId"
                                            value={this.state.societyId} 
                                            onChange={this.societyChange} >
                                            
                                            <option disabled>Select</option>
                                            
                                            {this.fetchDrop(this.props.flats)}     
                                        </Input>
                                        <span  className='error'>{this.state.errors.societyId}</span>
                                </FormGroup> */}
                                 {!this.state.modalLoading  ? modalData : <Spinner />}
                               
                            </ModalBody>
                            
                        </Modal>
                        <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                                 {/* <input type="number"
                                 placeholder="enter no of entries to display"
                                 onChange={this.onChange1}/> */}
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
                            {!this.state.loading ? tableData : <Spinner />}
                           
                            <Pagination className=""
                            // hideDisabled
                            
                             activePage={this.state.activePage}
                             itemsCountPerPage={this.state.limit}
                             totalItemsCount={this.state.totalItemsCount}
                            //  pageRangeDisplayed={5}
                             onChange={this.handlePageChange}
                             itemClass='page-item'
                             linkClasss='page-link'   />      
                          
                    </div>
                
                    
                </UI>
           
                <div>
        
      </div>
                
            </div>
           
        )
        
    }
   
}

function mapStateToProps(state) {

    return {
        flats: state.flats

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDrop,
        AddDetails,
        getDetails,
        getTotalItems,
        getSizeDrop,
        getPageDetails,
        noOfCount,
        deleteSelectedFlatMasterDetail
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(flatMasterDetails)
