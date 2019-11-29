import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table,Button, Label} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
// import {getVendorBooking} from '../../actions/individualVendorAction';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';

class BookingRequestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //    filterName:"eventName",
           
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

    // searchFilter(search) {
    //     return function (x) {
    //         return x.event_master? x.event_master.eventName.toLowerCase().includes(search.toLowerCase()):'' || !search;
    //     }
    // }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }


    refreshData() {
        // this.props.getVendorBooking().then(()=> this.setState({loading:false, modalLoading: false, editEventModal:false})).catch((err)=>{

        //     this.setState({loading:false, modalLoading: false, editEventModal:false})
        // });
     
    }   




    deleteEvents(societyEventBookId){
        this.setState({loading:true})
        let {isActive } =this.state;  
        this.props.deleteEvents(societyEventBookId,isActive)
            .then(() => this.refreshData())
            this.setState({isActive:false})
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
        let path=this.props.location.pathname;
        switch(path){
            case '/ownerDashboard/individualVendorBooking':
            this.props.history.push('/ownerDashboard/changePasswordOwner')
            break;

            case '/tenantDashboard/individualVendorBooking':
            this.props.history.push('/tenantDashboard/changePasswordTenant')
            // eslint-disable-next-line
            default:
        }
        
    }

    renderList({ getVendorBooking }) {
        if(getVendorBooking){
            console.log(getVendorBooking,"====getVendorBooking")
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
                                filterName:"eventName"}});
                        }}>Tower Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Floor</th>
                <th>Flat</th>
                <th>Person Name</th>
                <th>Booked Slot Time</th>              
                <th>Pay Online</th>
                <th style={{width:'14%'}}>Actions</th>                          
            </tr>
            
        
        </thead>

        <tbody>
            {/* {this.renderList(this.props.IndividualVendorReducer)} */}
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
        registerComplaintReducer : state.registerComplaintReducer,
        IndividualVendorReducer: state.IndividualVendorReducer
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingRequestDetails);


