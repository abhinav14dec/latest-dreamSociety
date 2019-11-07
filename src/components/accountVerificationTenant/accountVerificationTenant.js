import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import UI from '../newUI/loginDashboard';
import axios from 'axios';
import {URN} from '../../actionCreators/index';
 
export default class AccountVerificationTenant extends Component {
  state={
    otp:'',
    message:'',
    otpVerified:''
  }

  submit=()=>{
    console.log(this.state.otp)
    const data={
      otp:this.state.otp
    }
   axios.post(`${URN}/tenantActivation?${window.location.href.split('?')[1]}`,data)
   .then((response)=>{
     this.setState({
       message:response.data.message,
       otpVerified:response.data.otpVerified
     })
     if(response.data.otpVerified){
       return this.props.history.push('/')
     }
     else{
       
       return this.props.history.push('/login/tokenVerification')
     }
   })
     }

     logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user-type');
      return this.props.history.replace('/');
  }

  changePassword=()=>{ 
      return this.props.history.replace('/superDashboard/changePassword')
   }

   sendLogin=()=>{
    return this.props.history.push('/')
   }
  
  render() {
    return (
      <div>
       
          <UI onClick={this.logout} change={this.changePassword}>
             <h2>Submit OTP</h2> 
             <h2 style={{color:'red'}}>{this.state.message}</h2>
          <OtpInput
          inputStyle={{width: '20px'}}
            onChange={otp => this.setState({otp})}
            numInputs={6}
            separator={<span>-</span>}
          />
        <span><button style={{marginTop:'10px'}} onClick={this.submit}>Submit</button></span>
        <span><button style={{marginTop:'10px', marginLeft:'4px'}}>Resend</button></span>
        <span><button style={{marginTop:'10px', marginLeft:'4px',display:this.state.otpVerified?'block':'none'}} onClick={this.sendLogin}>login</button></span>
        </UI>
      </div>
      
    )
}
}   