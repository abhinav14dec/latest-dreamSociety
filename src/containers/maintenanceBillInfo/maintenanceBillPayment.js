import  React, {Component} from 'react';  
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table,Form} from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';





class MaintenanceBillPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
           loading:false,
           errors:{},
           message:'',
        }
    }

    componentDidMount(){
        // this.props.getMaintenance().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));;
        // this.props.viewTower().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
    }

    
    onSubmit=(event)=>{
        event.preventDefault();
    //     const {startTimeSlotSelected,endTimeSlotSelected,individualVendorId,enableSmsNotification,payOnline,enableFingerprint}= this.state;
    //     let errors = {};
    //     if(this.state.serviceId===''){
    //         errors.serviceId="Event Name can't be empty"
    //     }     
    //     else if(this.state.individualVendorId===''){
    //         errors.individualVendorId="Organiser Name can't be empty"
    //     }  
        
    //     const vendorData={
    //         startTimeSlotSelected,endTimeSlotSelected,individualVendorId,enableSmsNotification,payOnline,enableFingerprint
    //     }

    //     console.log(vendorData,"vendorData=========")
                  
       
    //     this.setState({ errors });
    //     const isValid = Object.keys(errors).length === 0
    //     if (isValid) {
    //         this.setState({loading: true});
    //         this.props.addVendorBooking(vendorData)
    //         .then(()=>this.push())
    //         .catch((err)=>{
    //             this.setState({message: err.response.data.message,loading:false})})

    //         this.setState({
    //             startTimeSlotSelected:'',
    //             endTimeSlotSelected:'',
    //             individualVendorId:'',
    //             enableSmsNotification:false,
    //             payOnline:false,
    //             enableFingerPrint:false
    //         });
    // }
}

    push=()=>{
        // this.props.history.push('/superDashboard/cityMasterDetail');
    }    

  

    logout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user-type');
            return this.props.history.replace('/')
        }
    
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }
    
    
    render(){
        let  formData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Maintenance Type</th>
                        <th>To</th>
                        <th>From</th>
                        <th>Flat No</th>
                        <th>Rate</th>
                        <th>Super Area</th>
                        <th>Monthly Charges</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {this.renderMaintenance(this.props.MaintenanceMasterReducer)} */}
                </tbody>
            </Table>
        </div>
    
        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <Form onSubmit={this.onSubmit} >

                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Maintenance Bill Generation</h3></div><br/>
                        {!this.state.loading ? formData : <Spinner />}
                    </Form>
                </UI>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state)
    return {
       
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceBillPayment);