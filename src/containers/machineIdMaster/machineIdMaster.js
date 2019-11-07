import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { bindActionCreators } from 'redux';
import {addMachine} from '../../actions/machineIdMasterAction';
import { connect } from 'react-redux';


class MachineIdMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            machineActualId: '',
            menuVisible: false,
            loading:true,
            errors: {},
            message:''
        }


    }
 componentDidMount(){
    this.setState({loading:false})
 }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
       
    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }
 
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

   displayMachine=() => {
       return this.props.history.push('/superDashBoard/displayMachineIdMaster');
   }   

   keyPress=(event)=>{
    const pattern = /[a-zA-Z 0-9 _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}


   submit = (e) => {
       e.preventDefault()
       let errors = {};
       
       const {machineActualId} = this.state;

        
       if(!this.state.machineActualId){
        errors.machineActualId = "Machine Actual ID can't be empty. Please select."
    }
    this.setState({errors});
    const isValid=Object.keys(errors).length === 0;
    
    if(isValid){
    
       this.props.addMachine(machineActualId).then(()=> this.props.history.push('/superDashboard/displayMachineIdMaster')).catch(err => {
        this.setState({message: err.response.data.message, loading: false})
    })
}
   }
   onChange =(event) =>{
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
    render() {

        let 
        form1=
        <div>
        <Form onSubmit={this.submit}>
  
      
            <FormGroup>
                <Label> Machine Id</Label>
                <Input type="text" className="form-control" placeholder="Machine Id" name="machineActualId" onChange={this.onChange}  onKeyPress={this.keyPress} maxLength ={30} />
                <span className="error">{this.state.errors.machineActualId}</span>
                <span className="error">{this.state.message}</span>


            </FormGroup>
            <FormGroup>
                <Button type="submit" color="success mr-2">Submit</Button>
                <button className=" btn btn-danger" onClick ={this.displayMachine}>Cancel</button>
            </FormGroup>
        </Form>
    </div>  
       

        return (
            <div>
                <UI  onClick ={this.logout}  change ={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
            
                        <h3 align="center"> Add Machine</h3>

{!this.state.loading?form1:<Spinner/>}
              </div>
   
                    </UI>
            </div>
        );
    }
}

function mapStateToProps(state)  {
    return {
        machineIdDetails:state.machineIdDetails
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({addMachine},dispatch)
}




export default connect(mapStateToProps, mapDispatchToProps)(MachineIdMaster)
