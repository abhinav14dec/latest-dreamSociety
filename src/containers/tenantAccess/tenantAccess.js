import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {  } from './../../actions/designationMasterAction';
import UI from '../../components/newUI/tenantDashboard';
import { Form, Button, FormGroup, Input, Label, Table } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class TenantAccess extends Component{
    constructor(props){
        super();

        this.state={
            name:'',
            contact:'',
            email:'',
            type:'member',
            modalLoading:false
        }
    }

    activatedChange = async (e)=>{
        let selected=e.target.value;
        console.log(selected)
       await this.setState({
            type:selected
         })
      
    //    this.refreshData()
       this.setState({modalLoading: true})
     }

    handleSubmit=()=>{

    }

    
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }


    changePassword = () => {
        return this.props.history.replace('/tenantDashboard/changePasswordTenant')
    }

    close = () => {
        return this.props.history.replace('/tenantDashBoard')
    }

    render(){
        let tableData = <Table bordered>
        <thead>
            <tr>
                {/* <th style={{ width: '4%' }}></th> */}
                <th style={{ width: '4%' }}>#</th>
                <th>Name</th>
                {/* <th  onClick={()=>{
                         this.setState((state)=>{return {sortVal:!state.sortVal,
                            filterName:'firstName'}});
                    }} >Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th> */}
                {/* <th>Name</th> */}
                <th>Contact</th>
                <th>Email</th>
                <th>Give Access</th>
            </tr>
        </thead>
        <tbody>
            {/* {this.getFingerprintDetail(this.props.fingerprintReducer)} */}
        </tbody>
    </Table>

let radioData=<div>
<Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
        id="member"
        type="radio"
        name="member"
        onChange={this.activatedChange}
        value='member'
        checked={ this.state.type === 'member' ? true : false}
        />{' '}Member</Label>

        <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
        id="tenant"
        type="radio"
        name="tenant"
        onChange={this.activatedChange}
        checked={this.state.type === 'tenant' ? true : false}
        value='tenant'
        />{' '}Tenant</Label>

        <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
        id="vendor"
        type="radio"
        name="vendor"
        onChange={this.activatedChange}
        value='vendor'
        checked={this.state.type === 'vendor' ? true : false}
        />{' '}Vendor</Label>
</div>
        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3 align="center">Access Master</h3>
                        
                    </div>
                    {/* <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} /> */}
                    { radioData }
                    {(this.state.loading) ? <Spinner /> : tableData}
                   
                </div>
            </UI>
            </div>
        )
    }


}

function mapStatToProps(state) {
     console.log(state)
    return {

    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(TenantAccess);