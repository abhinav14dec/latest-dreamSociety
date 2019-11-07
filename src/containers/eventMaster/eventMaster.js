import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddEvent, GetEventOrganiser } from '../../actions/eventMasterAction';
import { bindActionCreators } from 'redux';
import { Input } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect'
import Spinner from '../../components/spinner/spinner';
import './event.css';



class EventMaster extends Component {
  constructor(props) {
    super(props)

  }

  state = {
    eventType: '',
    eventName: '',
    eventOrganiser: [],
    startDate: '',
    endDate: '',
    menuVisible: false,
    loading:true,
    errors: {},
    userId:'',
    message:''

  }

  OnKeyPresshandler(event) {
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}
  componentDidMount() {
    this.props.GetEventOrganiser().then(()=> this.setState({loading:false}))
    
    console.log("hieee", this.props.GetEventOrganiser)
  }

  onChange =(event)=> {
    this.setState({message:'' })
    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value, errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value});
    }
  }


  submit = (e) => {
    e.preventDefault()
    let errors = {};
    const { eventType,
    eventName,
    eventOrganiser,
    } = this.state
    
    if(!this.state.eventType){
        errors.eventType = "Event Type can't be empty. Please select."
    }
    if(!this.state.eventName){
      errors.eventName = "Event Name can't be empty. Please select."
  }
  if(!this.state.userId){
    errors.userId = "Event Organiser can't be empty. Please select."
}


    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
        this.setState({loading: true})
      
            this.props.AddEvent(eventType,eventName, eventOrganiser).then(()=> this.props.history.push('/superDashboard/display-event')).catch((err)=>this.setState({message: err.response.data.message, loading: false}))
        
            
        
   
}
  }

  getEvent({ events }) {
    if (events) {
      console.log(events)
      return (
        events.event.map((item) => {
          return (
            <option key={item.userId} value={item.userId}>
              {item.firstName+" "+item.lastName}
            </option>
          )
        })
      )
    }
  }
  logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}

  event=()=>{
    this.props.history.push('/superDashboard/display-event')
  }
  
  close=()=>{
    return this.props.history.replace('/superDashBoard')
}

changePassword=()=>{ 
  return this.props.history.replace('/superDashboard/changePassword')
}

  
  render() {

    let 
    form1=
    <div >
     
      <form onSubmit={this.submit}>
    
     
        <div className="form-group">
          <label >Event Type</label>
          <input
            type="text"
            className="form-control"
            placeholder="eventType"
            onKeyPress={this.OnKeyPresshandler}
            name="eventType"
            onChange={this.onChange}
             maxLength ={25}
        
          />
             <span className="error">{this.state.errors.eventType}</span>
        </div>
      
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="eventName"
            onKeyPress={this.OnKeyPresshandler}
            name="eventName"
            onChange={this.onChange}
            maxLength ={25}

          />
             <span className="error">{this.state.errors.eventName}</span>
             <span className="error">{this.state.message}</span>   
        </div>
     
        <div className="form-group">
          <label >Event Organiser</label>
          <select
            className="form-control"  
            name="userId"
            onChange={this.onChange}
            defaultValue='no-value'>
          <DefaultSelect/>
           {this.getEvent(this.props.EventDetails)}

        
          </select>
          <span className="error">{this.state.errors.userId}</span>
        </div>
  
        
  
        <button
          className="btn btn-success mr-2"
        > Submit</button>
    <button  onClick={this.event}  className="btn btn-danger">  Cancel</button>
      </form>
    </div>
 
    return (
      <div>
    <UI onClick={this.logout} change={this.changePassword}>
  
    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
            
                        <h3 align="center"> Add Event </h3>

{!this.state.loading ?form1:<Spinner/>}
              </div>
        
       </UI>
             
              </div>
    )
  }


}




function mapStateToProps(state) {
  console.log(state);
  return {
    EventDetails: state.EventDetails
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AddEvent, GetEventOrganiser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMaster)





