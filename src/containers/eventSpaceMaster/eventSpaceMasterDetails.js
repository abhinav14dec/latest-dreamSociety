import React, { Component } from 'react';
import {  AddDetails, getDrop, getSizeDrop,getPageDetails,noOfCount } from '../../actions/flatMasterAction';
import {getEventDetails,deleteSelectedEventSpaceMasterDetail,updateEventSpace} from '../../actions/eventSpaceMasterAction';
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

class eventSpaceMasterDetails extends Component {
   constructor(props){
       super(props);
         this.state = {
            ids:[],
            eventSpaceId:'',
            spaceName: '',
            capacity: '',
            spaceType:'',
            sizeId: '',
            price:'',
            from:'',
            to:'',
            open:'open',
            close:'close',
            area:'',
            description:'',  
            filterName:"spaceName",
                  
        isDisabled: true,
        loading:true,
        modalLoading: false,
        isActive: false,
        editUserModal: false,
        menuVisible: false,
        search: '',
        errors:{},
        // activePage: '1',
        // limit:'5',
        // // itemsCountPerPage :1,
        // totalItemsCount:'15'
        }

   } 

    componentDidMount() {

        this.refreshData()

    }



    refreshData() {
      console.log('reaching');
        this.props.getEventDetails().then(() => this.setState({loading:false, modalLoading: false,editUserModal: false}));
      
        this.props.getSizeDrop().then(() => this.setState({loading:false, modalLoading: false,editUserModal: false}));

    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal,
            message: '',
            errors :{}
        });
    }
    onChangeSizeType=(e)=>{
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }

    updateBook = (e) => {
        e.preventDefault();
        let { eventSpaceId, spaceName, capacity, spaceType, sizeId, area,from, to , price, description} = this.state
     

        let errors = {};
        
        if (spaceName === '') errors.spaceName = "Cant be empty";
       
        if (capacity === '') errors.capacity = "Cant be empty";

        if (area === '') errors.area = "Cant be empty";

        if (this.state.price === '') errors.price = "Cant be empty";
        if (this.state.from === '') errors.from = "Please enter date";
        if (this.state.to === '') errors.to = "Please enter date";
        else if (this.state.from >this.state.to) errors.to=
        "From date cannot be ahead then To date";
        
        if (description === '') errors.description = "Cant be empty";
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        if(isValid && this.state.message === ''){

            this.props.updateEventSpace(eventSpaceId, spaceName, capacity, spaceType, sizeId, area,from,to,price, description).then(() => this.refreshData())
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
            const capacity = x.capacity.toString();
            const area = x.area.toString();
            const to = x.to.toString();
            const from = x.from.toString();
            const price = x.price.toString();
            return x.spaceName.toLowerCase().includes(search.toLowerCase()) ||
                capacity.toLowerCase().includes(search.toLowerCase()) ||
                x.spaceType.toLowerCase().includes(search.toLowerCase()) ||
                x.size_master.sizeType.toLowerCase().includes(search.toLowerCase()) ||
                area.toLowerCase().includes(search.toLowerCase()) ||
                to.toLowerCase().includes(search.toLowerCase()) ||
                from.toLowerCase().includes(search.toLowerCase()) ||
                price.toLowerCase().includes(search.toLowerCase()) ||
                x.description.toLowerCase().includes(search.toLowerCase()) ||
                !search;
            
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }


    editBook( eventSpaceId, spaceName,capacity, spaceType,sizeId,sizeType,area,from,to,price,description) {
        console.log(spaceType,"space")
        this.setState({
            eventSpaceId, spaceName,capacity ,spaceType, sizeId, sizeType ,area,from,to,price, description, editUserModal: !this.state.editUserModal
        })
    }

    deleteUser(eventSpaceId) {
        let { isActive } = this.state
        axios.put(`${URN}/eventSpaceMaster/delete/` + eventSpaceId, { isActive }, { headers: authHeader() }).then((response) => {
            this.refreshData()
            this.setState({ isActive: false ,loading:true })

        })
    }

    fetchUsers({ space }) {
        console.log(space);
        
        if (space) {
            // console.log(list1);
            return space.societyMember.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index) => {
                console.log(item);
              
                let sizeType= item.size_master.sizeType
        
                     
                return ( 
                    
                    
                    <tr key={item.eventSpaceId}>
                      <td><input type="checkbox" name="ids" className="SelectAll"  value={item.eventSpaceId}
                         onChange={(e) => {
                            let {eventSpaceId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(eventSpaceId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, eventSpaceId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                            
                                
                             }}/></td>
                         <td>{index+1}</td>
                        <td>{item.spaceName}</td>
                        <td>{item.capacity}</td>
                        <td>{item.spaceType}</td>
                        <td>{sizeType}</td>
                        <td>{item.area}</td>
                        <td>{item.from}</td>
                        <td> {item.to} </td>
                        <td> {item.price}</td>
                        <td>{item.description}</td>
                        <td>
                            <Button color="success" size="sm" className="mr-2"
                                onClick={this.editBook.bind(this, item.eventSpaceId,item.spaceName,
                                    item.capacity,item.spaceType, item.sizeId,sizeType, item.area,item.from,item.to,item.price,item.description)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.eventSpaceId)} >Delete</Button>
                        </td>
                    </tr>
                )
        
            })
        }
    }

    fetchSizeDrop({ list3 }) {
        console.log(list3)
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
        this.props.deleteSelectedEventSpaceMasterDetail(ids)
        .then(() => this.refreshData())
        .catch(err => err.response);
    }
    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/eventSpaceMaster')
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
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
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


    render() {
        let tableData;
       
        
        tableData= 
        <Table className="table table-bordered">
        <thead>
           
            <tr>  
            <th style={{width: "4%"}}></th>
                        <th>#</th>
                        <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'spaceName'}});
                        }}>Space Name 
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Capacity </th>
                <th>Space Type </th>
                <th>SizeType</th>
                <th> Area</th>
                <th> From </th>
                <th> To </th>
                <th> Price </th>
                <th>Desciption</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {this.fetchUsers(this.props.eventSpaceMasterReducer)}
        </tbody>
        {/* <Pagination/> */}
       
    </Table>
    let deleteSelectedButton = <Button
     disabled={this.state.isDisabled}
     color="danger"
    className="mb-3"
    onClick={this.deleteSelectedSubMaintenance.bind(this, this.state.ids)}>Delete Selected</Button>

    let modalData = <div>
                  <FormGroup>
                                    <Label for="roles">Space Name</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter space name"
                                        name="spaceName"
                                        value={this.state.spaceName}
                                        onKeyPress={this.onKeyPressHandler}
                                        onChange={this.onChange} 
                                        maxLength='50'/>
                                        <span  className='error'>{this.state.errors.spaceName}</span>  
                                         <span className='error'>{this.state.message}</span>

                                        
                                </FormGroup>
                                <FormGroup>
                                    <Label for="firstName">Capacity</Label>
                                    <Input
                                        type="textbox"
                                        placeholder=" enter capacity"
                                        name="capacity"
                                        value={this.state.capacity}
                                        onKeyPress = {this.OnKeyPresshandlerPhone}
                                        onChange={this.onChange}
                                        onKeyPress={this.OnKeyPresshandlerPhone}
                                        maxLength='4' />
                                        <span  className='error'>{this.state.errors.capacity}</span>
                                </FormGroup>
                                <FormGroup>
                    <Label>Space Type</Label><br/>
                    <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <label>Open :</label>
                    <input className="ml-2"
                        type="radio"
                        name="spaceType"  
                       
                        value={this.state.open}
                        checked={this.state.open=== this.state.spaceType ? true: false}
                        required
                    
                        
                        onChange={this.onChange} />
                
                        <div className="ml-2" style={{alignItems: 'baseline'}}>
                            <label>Close :</label>
                            <input
                            className="ml-2"
                            type="radio"
                            name="spaceType"  
                            checked={this.state.close=== this.state.spaceType  ? true : false}
                            value={this.state.close}
                        
                           
                         
                            onChange={this.onChange} />
                        </div>
                    </div>
                   
                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">sizeType</Label>
                                    <Input type="select" 
                                    value={this.state.sizeId} 
                                    name="sizeId"
                                    onChange={this.onChangeSizeType}>
                                       
                                        <option disabled>Select</option>
                                        {this.fetchSizeDrop(this.props.flats)}
                                    </Input>
                                    <span  className='error'>{this.state.errors.sizeId}</span>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Area</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter cover area"
                                        name="area"
                                        value={this.state.area}
                                        onKeyPress = {this.OnKeyPresshandlerPhone}
                                        onChange={this.onChange}
                                        onKeyPress={this.OnKeyPresshandlerPhone}
                                        maxLength='4' />
                                        <span  className='error'>{this.state.errors.area}</span>

                                </FormGroup>

                                <FormGroup>
                                        <Label>From</Label>
                                        <Input
                                        type="date"
                                        name="from"
                                        value={this.state.from}
                                        // placeholder="enter price"
                                        // maxLength='8'
                                        // onKeyPress = {this.OnKeyPressPrice}
                                        // value={this.state.area}
                                        onChange={this.onChange} />
                    
                                        <span className='error'>{this.state.errors.from}</span>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>To</Label>
                                        <Input
                                            type="date"
                                            name="to"
                                            value={this.state.to}
                                            // placeholder="enter price"
                                            // maxLength='8'
                                            // onKeyPress = {this.OnKeyPressPrice}
                                            // value={this.state.area}
                                            onChange={this.onChange} />
                                            
                                        <span className='error'>{this.state.errors.to}</span>
                                    </FormGroup> 

                                    <FormGroup>
                                            <Label>Price</Label>
                                            <Input
                                                type="text"
                                                name="price"
                                                value={this.state.price}
                                                placeholder="enter price"
                                                maxLength='8'
                                                onKeyPress = {this.OnKeyPressPrice}
                                                // value={this.state.area}
                                                onChange={this.onChange} />
                                                
                                            <span className='error'>{this.state.errors.price}</span>
                                        </FormGroup> 

                                <FormGroup>
                                     <Label>Description</Label>
                                     <Input
                                        type="textarea"
                                        name="description"
                                        placeholder="enter description"
                                        maxLength='500'
                                        value={this.state.description}
                                        onChange={this.onChange} />
                                        
                                    <span className='error'>{this.state.errors.description}</span>
                               </FormGroup>

                                <FormGroup>
                                <Button color="primary mr-2" onClick={this.updateBook}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                </FormGroup>

                          </div>
    
    
        
        return (
            <div>
                <UI onClick={this.logout}  change={this.changePassword}>
                        <div className="w3-container w3-margin-top  w3-responsive">
                        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                            <div className="top-details">                               
                             <h3>Event Space Master Details</h3>
                                <Button onClick={this.routeToAddNewUser} color="primary">Add Space</Button>
                                </div>

                            
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit SpaceName</ModalHeader>
                            <ModalBody>
                               
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
                 
                                       {(this.state.loading) ? <Spinner /> : tableData}
                           
                            {/* <Pagination 
                            // hideDisabled
                            
                             activePage={this.state.activePage}
                             itemsCountPerPage={this.state.limit}
                             totalItemsCount={this.state.totalItemsCount}
                            //  pageRangeDisplayed={5}
                             onChange={this.handlePageChange}
                             itemClass='page-item'
                             linkClasss='page-link'   />       */}
                          
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
        eventSpaceMasterReducer: state.eventSpaceMasterReducer,
        flats:state.flats

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getEventDetails,
        AddDetails,
        updateEventSpace,
        getDrop,
        getSizeDrop,
        getPageDetails,
        noOfCount,
        deleteSelectedEventSpaceMasterDetail
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(eventSpaceMasterDetails)
