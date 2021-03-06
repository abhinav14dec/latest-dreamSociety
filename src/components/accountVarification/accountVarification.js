import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import UI from '../newUI/loginDashboard';
import axios from 'axios';
import {URN} from '../../actionCreators/index';
 
export default class AccountVarification extends Component {
  state={
    otp:'',
    message:'',
    otpVerified:''
  }

  submit=()=>{
    const data={
      otp:this.state.otp
    }
   axios.post(`${URN}/ownerActivation?${window.location.href.split('?')[1]}`,data)
   .then((response)=>{
     this.setState({
       message:response.data.message,
       otpVerified:response.data.otpVerified
     })
     if(response.data.otpVerified){
      //  return this.props.history.push('/')
     }
     else{
      //  return this.props.history.push('/login/tokenVerification')
     }
   })
     }
     sendLogin=()=>{
      return this.props.history.push('/')
     }
     resend=()=>{
      axios.post(`${URN}/checkToken?${window.location.href.split('?')[1]}`)
     }
  
  render() {
    return (
      <div >
       
          <UI>
            <div style={{margin:"15% 0 0 30%"}}>
             <h2>Submit OTP</h2> 
             <h2 style={{color:'#28a745'}}>{this.state.message}</h2>
        <OtpInput
        inputStyle={{width: '20px'}}
          onChange={otp => this.setState({otp})}
          numInputs={6}
          separator={<span>-</span>}
        />
        <span><button style={{marginTop:'10px'}} onClick={this.submit}>Submit</button></span>
        <span><button style={{marginTop:'10px', marginLeft:'4px'}} onClick={this.resend}>Resend</button></span>
        <span><button style={{marginTop:'10px', marginLeft:'4px',display:this.state.otpVerified?'block':'none'}} onClick={this.sendLogin}>login</button></span>
        </div>
        </UI>
      </div>
      
    )
}
}   