import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addMaintenance} from './../../actions/maintenanceMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';



class MaintenanceMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maintenanceId:'',
            category:'',
            errors: {},
            message:'',
           

            menuVisible: false,
         }

       

    }

    onMaintenanceChange=(e)=> {
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
        if (this.state.category ==='') {
            errors.category = "cant be empty"
        }
        this.setState({errors})
        const isValid = Object.keys(errors).length === 0
    
        if (isValid) {
        this.setState({loading:true})

        this.props.addMaintenance(this.state)
        .then(()=>this.props.history.push('/superDashboard/maintenanceMasterDetail'))
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
            
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }    
                   
    maintenanceDetails=()=>{
        this.props.history.push('/superDashboard/maintenanceMasterDetail');
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render() {
        let formData;
        
        formData =<div>
      <FormGroup>
            <Label>Maintenance Category</Label>
            <Input  type="text" name="category" value={this.state.category}  onChange={this.onMaintenanceChange} onKeyPress={this.OnKeyPressUserhandler}  placeholder="Maintenance Category" maxLength={50}
        minLength={3}/>
          <span className="error">{this.state.message}</span>
          <span className="error">{this.state.errors.category}</span>
                     
        </FormGroup>
         
        <Button color="success" className="mr-2">Submit</Button>
        <Button color="danger" onClick={this.maintenanceDetails}>Cancel</Button>
        </div>

       
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Maintenance Master</h3>
                   
                    {!this.state.loading ? formData: <Spinner />}
                </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        MaintenanceMasterReducer: state.MaintenanceMasterReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addMaintenance }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(MaintenanceMaster));
