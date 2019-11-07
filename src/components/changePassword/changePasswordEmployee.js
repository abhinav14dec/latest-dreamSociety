import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {changePassword} from '../../actions/changePasswordAction';
import UI from '../../components/newUI/employeeDashboard';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';

let user;
class ChangePasswordEmployee extends Component{

    constructor(props){
        super(props);

        this.state={
            type:'password',
            type1:'password',
            type2:'password',
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            userId:'',
            errors: {},
            message:'',
            menuVisible: false,
        }

    }

    
    componentDidMount=()=>{
      
          user=localStorage.getItem('userId')      
    }

    // refreshData=()=>{
    //   this.props.postSociety()
    // }


    passwordOnChange=(e)=> {
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

    showHide=(e)=>{
        this.setState({
          type: this.state.type === 'password' ? 'input' : 'password',
        })  
      }

      showHide1=(e)=>{
        this.setState({
        
          type1: this.state.type1 === 'password' ? 'input' : 'password',
          
        })  
      }
      
      showHide2=(e)=>{
        this.setState({
          type2: this.state.type2 === 'password' ? 'input' : 'password'
        })  
      }

      handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        if(this.state.oldPassword ==='') {
            errors.oldPassword = "cant be empty"
        }
        else if(this.state.newPassword ==='') {
          errors.newPassword = "cant be empty"
        }

        else if(this.state.confirmPassword ==='') {
          errors.confirmPassword = "cant be empty"
        }

        else if(this.state.newPassword !== this.state.confirmPassword){
          errors.confirmPassword="password doesn't match"
        }
        this.setState({errors})

        console.log("submitted-----------------");
        const isValid=Object.keys(errors).length === 0
        if(isValid){
            this.setState({loading:true, user})
          

            this.props.changePassword(this.state,this.state.userId=user)
            .then(()=>this.props.history.push('/employeeDashboard'))
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


  close=()=>{
  return this.props.history.replace('/employeeDashBoard')
  }
      

    

    dashbordPage=()=>{
        this.props.history.push('/employeeDashboard');
    }

        render(){

            let show = (<i className="fa fa-eye" style={{'position': 'absolute', 'right': '15px', 'top': '40px'}}></i>);
            let hide = (<i className="fa fa-eye-slash" style={{'position': 'absolute', 'right': '15px', 'top': '40px'}}></i>);

            let formData;
            // if(!this.state.loading && this.props.societyMemberEventReducer  &&  this.state.errors){
            formData =<div>
          <FormGroup>
                <Label>Old Password</Label>
                <Input  type="password" name="oldPassword"  type={this.state.type} placeholder="old password" onChange={this.passwordOnChange} maxLength={128} minLength={6} ></Input> 
                <span className="oldPassword" onClick={this.showHide}>{this.state.type === 'password' ? hide: show}</span>
                <span className="error">{this.state.errors.oldPassword}</span>
                <span className="error">{this.state.message}</span>  
          </FormGroup>


            <FormGroup>
                <Label>New Password</Label>
                <Input  type="password" name="newPassword"  type={this.state.type1} placeholder="new password" onChange={this.passwordOnChange}  maxLength={128} minLength={6}/>
                <span className="newPassword" onClick={this.showHide1}>{this.state.type1 === 'password' ? hide: show}</span>  
                <span className="error">{this.state.errors.newPassword}</span>          
            </FormGroup>

            <FormGroup>
                <Label>Confirm New Password</Label>
                <Input  type="password" name="confirmPassword"  type={this.state.type2} placeholder="confirm new password" onChange={this.passwordOnChange}  maxLength={128} minLength={6}/>
                <span className="confirmPassword" onClick={this.showHide2}>{this.state.type2 === 'password' ? hide: show}</span>
                <span className="error">{this.state.errors.confirmPassword}</span>            
            </FormGroup>
             
             
            <Button color="success" className="mr-2">Change Password</Button>
            <Button color="danger" onClick={this.dashbordPage}>Cancel</Button>
            </div>
            // }
            return(
              <div>
                  <div>
                <UI onClick={this.logout}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Reset Password</h3>
                   
                    {!this.state.loading ? formData: <Spinner />}
                </Form>
                </UI>

            </div>
              </div>
            )
        
    }
}

function mapStateToProps(state) {
  
    return {
        changePasswordReducer: state.changePasswordReducer
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changePassword }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(ChangePasswordEmployee));