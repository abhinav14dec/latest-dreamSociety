import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addSocietyMemberEvents} from '../../actions/societyMemberEventAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';



class SocietyMemberEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            societyMemberEventId:'',
            societyMemberEventName:'',
            errors: {},
            message:'',
           

            menuVisible: false,
         }

       

    }

    onMemberEventChange=(e)=> {
            this.setState({
                message:''
            })
          
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }


 

    
      OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let errors = {};
        
        if (this.state.societyMemberEventName ==='') {
            errors.societyMemberEventName = "cant be empty"
        }

        this.setState({errors})

        const isValid = Object.keys(errors).length === 0
    
        if (isValid) {
        this.setState({loading:true})

        this.props.addSocietyMemberEvents(this.state)
        .then(()=>this.props.history.push('/superDashboard/memberEventsDetail'))
        .catch(err => {
            this.setState({message: err.response.data.message, loading: false})
        })
    }
  
    
    }

    logout=()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('user-type');
                return this.props.history.replace('/') 
            }

    memberEventDetails=()=>{
        this.props.history.push('/superDashboard/memberEventsDetail');
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render() {
        let formData;
        if(!this.state.loading && this.props.societyMemberEventReducer  &&  this.state.errors){
        formData =<div>
      <FormGroup>
            <Label>Member Event Type</Label>
            <Input  type="text" name="societyMemberEventName" value={this.state.societyMemberEventName}   onChange={this.onMemberEventChange} onKeyPress={this.OnKeyPressUserhandler}  placeholder="Member Event Type" maxLength={50}
        minLength={3}/>
        <span className="error">{this.state.errors.societyMemberEventName}</span>
          <span className="error">{this.state.message}</span>
                     
        </FormGroup>
         
        <Button color="success" className="mr-2">Submit</Button>
        <Button color="danger" onClick={this.memberEventDetails}>Cancel</Button>
        </div>

        }
        return (
            <div>
                <UI onClick={this.logout}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Society Member Events</h3>
                   
                    {!this.state.loading ? formData: <Spinner />}
                </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("========", state)
    return {
        societyMemberEventReducer: state.societyMemberEventReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({addSocietyMemberEvents }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(SocietyMemberEvent));
