import React, { Component } from 'react';
// import OtpInput from 'react-otp-input';
import UI from '../components/newUI/loginDashboard';
// import axios from 'axios';
// import { URN } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { giveToken  } from '../actions/token';
 class token extends Component {

    state={
        otp:''
    }

    componentDidMount(){
        const url=window.location.href.split('?')[1];
        localStorage.setItem('url', url)
        console.log("fhcbdhbdhc",url);
        this.props.giveToken(url)
        .then((response)=>{
          this.props.history.push('/submitotp?'+ url)
        })
        .catch(err=>console.log(err));

    }

    // submit=(e)=>{
    //     e.preventDefault();
    //     console.log(this.state.otp);
    //     const url=window.location.href.split('?')[1]
    //      let {otp} = this.state
    //     axios.post(`${URN}/otpVerify`,{url,otp})
    //     .then((response)=>{
    //       console.log(response.data)
    //       localStorage.setItem('url', url)
    //       this.props.history.push('/resetpassword')
    //     })
    //     .catch(err=>console.log(err.response.data.messageErr));
  

    // }


  render() {
    return (
      <div>
       
          <UI>
             <h2>Token</h2> 
        {/* <OtpInput
        inputStyle={{width: '20px'}}
          onChange={otp => this.setState({otp})}
          numInputs={6}
          separator={<span>-</span>}
        />
        <span><button onClick={this.submit} style={{marginTop:'10px'}}>Submit</button></span> */}
        {/* <span><button style={{marginTop:'10px', marginLeft:'4px'}}>Resend</button></span> */}
        </UI>
      </div>
      
    )
}


}   
function  mapDispatchToProps(dispatch){
    return bindActionCreators({
        giveToken

    },dispatch)

}

export default connect(null,mapDispatchToProps)(token)