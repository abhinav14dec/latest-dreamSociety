import React, { Component } from 'react';
import { getComplaints,rejectComplaint,acceptComplaint,sendConfirmations,complaintCompleted,deleteSelectedComplaints,getFeedback} from '../../../actions/viewComplaintsAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table} from 'reactstrap';
import UI from '../../../components/newUI/superAdminDashboard';
import Spinner from '../../../components/spinner/spinner';
import DefaultSelect from '../../../constants/defaultSelect';

var Id;
class ViewVendorFeedback extends Component {
constructor(){
    super()
   this.state = {
            filterName:"slotTime1",
            complaintId:'',
            feedbackId:'',      
            isActive: false,
            ids:[], 
            menuVisible: false,
            editModal: false,
            isDisabled:true, 
            search: '',
            errors:{},
            loading:true,
            modalLoading: false,
            message:'',
            accept:'',
       

    }
}
componentWillMount(){
    Id=localStorage.getItem('complaintId')
}

    componentDidMount() {
        this.refreshData();
        
    }

  

    onHandleChange=(event)=>{
                
        this.setState({updatedSlots:event.target.value})
        if (!!this.state.errors[event.target.updatedSlots]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.updatedSlots];
            this.setState({ updatedSlots:event.target.value.trim(''), errors });
        }
        else {
            this.setState({ errors:event.target.value.trim('') });
        }
    }


    refreshData() {
        this.props.getComplaints().then(()=> this.setState({loading:false, modalLoading: false, editModal:false}))
        this.props.getFeedback(Id);
    }   



      renderList = ({feedbackResult}) => {  console.log(feedbackResult)
    
        if (feedbackResult && feedbackResult.feedback) {
            const item=feedbackResult.feedback
            console.log(item)
                return (
                    
                    <tr key={item.feedbackId}>
                        <td>{item.feedback}</td>
                        <td>{item.rating}</td>
                                                         
                       
                    </tr>
                    

                )         
             
        }
    }

    
    

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }

  

  
    
    render() {
        
        let tableData;
        tableData=
        <Table className="table table-bordered">
        <thead>
            <tr>
                <th>Feedback</th>
                <th>Rating</th>         
             
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.viewComplaintsReducer)}    
        </tbody>
    </Table>
     
        return (

            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                  
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                    <span aria-hidden="true">&times;</span>
                     </div>

                  
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>View Feedback</h3>
                    </div>             
                   
                           {!this.state.loading ? tableData : <Spinner />}
                                   
                    </div>
                </UI>
               

            </div>
        )
    }
}

function mapStateToProps(state) {console.log(state);

    return {
        viewComplaintsReducer:state.viewComplaintsReducer
        

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getComplaints,rejectComplaint,acceptComplaint,sendConfirmations,complaintCompleted,deleteSelectedComplaints,getFeedback}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewVendorFeedback);      