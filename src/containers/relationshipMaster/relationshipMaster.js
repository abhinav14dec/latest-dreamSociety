import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addRelation} from './../../actions/relationMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class RelationshipMaster extends Component{

    constructor(props) {
        super(props);
        this.state = {
            relationId:'',
            relationName:'',
            errors: {},
            message:'',
           

            menuVisible: false,
         }
    }
    
    onRelationChange=(e)=> {
        this.setState({message:'' })
    if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({ [e.target.name]: e.target.value.trim(''), errors });
    }
    else {
        this.setState({ [e.target.name]: e.target.value.trim('') });
    }
}

      
  
    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z -]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        
        if (this.state.relationName ==='') {
            errors.relationName = "cant be empty"
        }
        this.setState({errors})
        const isValid=Object.keys(errors).length === 0

        if(isValid){
            this.setState({loading:true})

            this.props.addRelation
            (this.state)
            .then(()=>this.props.history.push('/superDashboard/relationshipMasterDetail'))
            .catch(err=>{
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

    relationDetails=()=>{
    this.props.history.push('/superDashboard/relationshipMasterDetail');
    }

    close=()=>{
    return this.props.history.replace('/superDashBoard')
    }
    render(){
        let formData;
        formData =<div>
        <FormGroup>
            <Label>Relation Name</Label>
            <Input  type="text" name="relationName"  onChange={this.onRelationChange} onKeyPress={this.OnKeyPressUserhandler}  placeholder="Relation Name" maxLength={50}
        minLength={3}/>
        <span className="error">{this.state.errors.relationName}</span>   
        <span className="error">{this.state.message}</span>          
        </FormGroup>
        
        <Button color="success" className="mr-2">Submit</Button>
        <Button color="danger"  onClick={this.relationDetails} >Cancel</Button>
        </div>
        return(
            <div>
                  <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                 <span aria-hidden="true">&times;</span>
                   </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Relation Master</h3>
                   
                    {!this.state.loading ? formData: <Spinner />}
                </Form>
                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        relationMasterReducer: state.relationMasterReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addRelation }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(RelationshipMaster));