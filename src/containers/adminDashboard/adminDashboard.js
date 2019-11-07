import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userLogout} from '../../actions/loginAction';
import UI from '../../components/newUI/adminDashboard';

class AdminDashboard extends Component {
    logout=()=>{
        console.log('hiiii')
        this.props.userLogout();   
      }
      changePassword=()=>{
          
        return this.props.history.replace('/adminDashboard/changePasswordAdmin')
      }
    render() {
        return (
            <div>
             <UI onClick={this.logout} change={this.changePassword} changeDashboard={this.changeDashboard}>
     
      </UI>
      </div>
     
   
        )
 
    }}
function mapDispatchToProps(dispatch){
    return bindActionCreators({userLogout},dispatch);
    }

export default connect(null, mapDispatchToProps)(AdminDashboard);
