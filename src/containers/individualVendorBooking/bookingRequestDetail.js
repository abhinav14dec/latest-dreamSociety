import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table,Button, Label} from 'reactstrap';
import UI from '../../components/newUI/vendorDashboard';
import {getVendorRequest,getVendorConfirmed} from '../../actions/individualVendorAction';
import Spinner from '../../components/spinner/spinner';


class BookingRequestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
           filterName:"firstName",
           type:'notConfirm',
           msg:'',
           editEventModal:false,
           modalLoading:false,
           loading:false,
           isDisabled:true,
           ids:[],
           errors:{},
           message:'',
           search: ''
        }
    }

    componentDidMount(){
        this.refreshData();
    }

    searchFilter(search) {
        return function (x) {
            return x.bookedBy[0] ? x.bookedBy[0].firstName.toLowerCase().includes(search.toLowerCase()):'' || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }


    refreshData() {
        this.props.getVendorRequest().then(()=> this.setState({loading:false, modalLoading: false, editEventModal:false})).catch((err)=>{

            this.setState({loading:false, modalLoading: false, editEventModal:false})
        });
     
    }   


    
    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedEvent(ids)
        .then(() => this.refreshData())
      
    }
   
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/vendorDashboard/changePasswordVendor'); 
    }

    
    activeChange = (id,e) => {
    let selected=e.target.value;
    // this.setState({
    //   type: selected
    // });
    this.props.getVendorConfirmed(selected,id)
    // this.setState({ modalLoading: true });
  };

    renderList({ vendorBookingRequest }) {
            if (vendorBookingRequest && vendorBookingRequest.bookings) {
                
                return  vendorBookingRequest.bookings.sort((item1,item2)=>{ 
                    var cmprVal =  (item1.bookedBy[0][this.state.filterName].localeCompare(item2.bookedBy[0][this.state.filterName]))
                    return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((item,index)=>{
                    let itemData=item.bookedBy[0]
        
                    return(
                        <tr key={item.individualVendorBookingId}>
                           <td><input type="checkbox" name="ids" className="SelectAll" value={item.individualVendorBookingId}
                             onChange={(e) => {
                                const {individualVendorBookingId} = item
                                if(!e.target.checked){
                                    document.getElementById('allSelect').checked=false;
                                    let indexOfId = this.state.ids.indexOf(individualVendorBookingId);
                                    if(indexOfId > -1){
                                        this.state.ids.splice(indexOfId, 1);
                                    }
                                    if(this.state.ids.length === 0){
                                        this.setState({isDisabled: true});
                                    }
                                }
                                else {
                                    this.setState({ids: [...this.state.ids, individualVendorBookingId]});
                                    if(this.state.ids.length >= 0){
                                        this.setState({isDisabled: false})
                                    }
                                }
                                    
                                 }}/></td>
                           <td>{index+1}</td>
                           <td>{`${itemData.firstName} ${itemData.lastName}`}</td>
                           <td>{itemData.flats[0].tower_master.towerName}</td>
                           <td>{itemData.flats[0].floor_master.floorName}</td>
                           <td>{itemData.flats[0].flatNo}</td>
                           <td>{itemData.contact} </td>
                           <td>{item ?`${item.startTimeSlotSelected} to ${item.endTimeSlotSelected}` :''}</td>
                           <td>{item.payOnline===true ? 'Yes' : 'No'}</td>
                          
        
                           <td>
                                 <Button color="success" value='confirm'  className="mr-2" onClick={this.activeChange.bind(this,item.individualVendorBookingId)}>Confirm</Button>                 
                                 <Button color="danger" value='notConfirm'  onClick={this.activeChange.bind(this,item.individualVendorBookingId)}>Not-Confirm</Button>
                            </td> 
                        </tr>
                        
                    )
                })

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



h=(event)=>{
    this.setState({ [event.target.name]: event.target.checked},function(){console.log(this.state.dJ,this.state.breakfast)})

}

render() { 
    
           let tableData= <Table className="table table-bordered">
        <thead>
            <tr>
                <th style={{width:'4%'}}></th>  
                <th  style={{width:'4%'}}>#</th>
                <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:"firstName"}});
                        }}>Person Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Tower Name</th>
                <th>Floor</th>
                <th>Flat No</th>
                <th>Contact No</th>
                <th>Booked Slot Time</th>             
                <th>Pay Online</th>
                <th style={{width:'14%'}}>Actions</th>                          
            </tr>
            
        
        </thead>

        <tbody>
            {this.renderList(this.props.IndividualVendorReducer)}
        </tbody>
        </Table>
                        
         let deleteSelectedButton = <Button color="danger" className="mb-2"
         onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>
  return (

      <div>
          <UI onClick={this.logout} change={this.changePassword}>
            
                
                <div className="w3-container w3-margin-top w3-responsive">
                                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                    <span aria-hidden="true">&times;</span>
                            </div> 
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Vendor Booking Request</h3>
                    </div>
                    
                    {/* <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} /> */}
                    
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
        IndividualVendorReducer: state.IndividualVendorReducer
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({getVendorConfirmed,getVendorRequest}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingRequestDetails);


